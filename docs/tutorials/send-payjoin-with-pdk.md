# Privacy First: Send Payjoin Transactions with Payjoin Dev Kit

Want to enhance your Bitcoin transactions with enhanced privacy and
reduced fees? Look no further than Payjoin and the powerful `payjoin`
crate! Payjoin allows you to combine your transaction with others,
minimizing individual footprints and potentially saving on network
fees.

This tutorial will guide you through the exciting world of Payjoin
using Rust.  We'll delve into the `payjoin` crate, providing
step-by-step instructions on crafting and sending your very own
Payjoin transactions. Moreover, We'll guide you through setting up
payjoin-cli, and use it as the receiver side in the payjoin
transaction.

The `payjoin` crate provides an API to construct a Payjoin Proposal
PSBT, send it to the receiver and then process the response. The
sender can then sign and finalize the transaction and broadcast it to
the bitcoin network.

While this tutorial centers on the sender perspective, remember that
the payjoin crate also empowers you to act as a receiver, providing
greater flexibility. We encourage you to delve into its full potential
to unlock the comprehensive Payjoin experience.

By following this hands-on guide, you'll gain the knowledge and skills
to harness the power of Payjoin for your Bitcoin transactions,
enhancing both privacy and potentially reducing fees. Are you ready to
embark on this journey? Let's begin!

## 1. Bitcoin Node & Wallets

In order to perform a payjoin transaction, you need to have two wallets. 
lets use [regtest-util](https://github.com/jbesraa/regtest-util) to
set up the bitcoin wallets.

**You need to have Docker running and Cargo installed**

```shell
cargo install regtest-util
```

Be sure to add the `.cargo/bin` folder to your PATH to be able to run
the installed binaries.

```shell
regtest-util
```

After running the above commands, you will have two wallets, `sender`
and `receiver` running on `localhost:18443/sender` and `localhost:18443/receiver`
respectively.

## 2. Project Setup

Lets set up a new rust project and name it `payjoin-tutorial`

```shell
cargo new payjoin-tutorial
```

Add required dependencies to `Cargo.toml` so it includes the
following:

```toml
[dependencies]
bitcoincore-rpc = "0.17.0" 
payjoin = { version = "0.13.0", features = ["send", "base64"]  }
reqwest = {version = "0.11.24", features = ["rustls-tls", "blocking"]}
tokio = {version = "1.36.0", features = ["full"]}
```

## 3. Sender

In order to send a payjoin transaction, the sender needs to complete two steps.

First, the sender obtains the receiver [BIP21 Bitcoin URI](https://github.com/bitcoin/bips/blob/master/bip-0021.mediawiki) (often via QR code) and constructs a PSBT
based on parameters specified in the URI, like address, payjoin endpoint (`pj`) and amount.

Second, the sender constructs an HTTPs request, with the PSBT attached to the
body. After sending the request, the sender waits for the response and when it
arrives, verifies that the response follows the payjoin checklist, and signs and broadcasts the resulting payjoin to the bitcoin blockchain.

Lets start implementing the sender functionality inside
`payjoin-tutorial/src/main.rs`

##### 3.1 Add `Sender` module

```rust
// payjoin--tutorial/src/main.rs
mod sender {
    use bitcoincore_rpc::RpcApi;
    use payjoin::bitcoin::address::NetworkChecked;
    use std::collections::HashMap;
    use std::str::FromStr;

    use bitcoincore_rpc::bitcoin::psbt::Psbt;
    use bitcoincore_rpc::bitcoin::Txid;
    use payjoin::base64;
    use payjoin::send::RequestBuilder;

    fn get_sender_wallet() -> bitcoincore_rpc::Client {  }
    fn https_agent() -> reqwest::blocking::Client { }
    pub fn try_payjoin(pj_uri: payjoin::Uri<'static, NetworkChecked>) -> Txid { }
}
```

##### 3.2 Implement `get_sender_wallet` function inside `sender` module.

Write a utility function to get the sender wallet, using `bitcoincore_rpc` to
connect to the wallet. The `Auth` struct is used to authenticate the
connection, and the `Client` struct is used to connect to the wallet.

```rust
// payjoin--tutorial/src/main.rs
// mod sender {
    fn get_sender_wallet() -> bitcoincore_rpc::Client {
        let auth = bitcoincore_rpc::Auth::UserPass(
            "foo".to_string(),
            "qDDZdeQ5vw9XXFeVnXT4PZ--tGN2xNjjR4nrtyszZx0=".to_string(),
        );
        bitcoincore_rpc::Client::new("http://localhost:18443/wallet/sender", auth).unwrap()
    }
    // ..
// }
```

##### 3.3 Implement `https_agent` function inside `sender` module.

The `https_agent` function is used in order to make https requests.
The sender will use this function to send the payjoin request to the
receiver.

Here, we are using `danger_accept_invalid_certs` as we run this
locally. In production this should be initiated with valid
certificates only.

[Why to use HTTPS in production](https://www.cloudflare.com/learning/ssl/why-is-http-not-secure/)

For Payjoin, it is important to use HTTPS to ensure the privacy of the
transaction and to prevent potential loss of funds.  Without
authenticated communications, an attacker could spoof the payjoin
endpoint and steal funds. Without encrypted communications, anyone on
the network can see the contents of the payjoin and foil privacy.

```rust
// payjoin--tutorial/src/main.rs
// mod sender {
    // ..
    fn https_agent() -> reqwest::blocking::Client {
        let https = reqwest::blocking::Client::builder()
            .danger_accept_invalid_certs(true)
            .build()
            .expect("failed to build https client");
        https
    }
    // ..
// }
```

In the next few steps, we will add the core implementation for the
sender inside the `try_payjoin` function.

##### 3.4 Extract the parameters from the payjoin URI

Payjoin requires messages to be sent between sender and receiver. The
receiver hosts an HTTP endpoint to receive these messages. To make a
request, we need the receiver payjoin Uri. 

The Uri contains the amount the receiver is requesting and the address
they wish to receive to. Moreover, the Uri also includes the endpoint
we will make the request to, and that is extracted in the
`RequestContext::from_psbt_and_uri`.

```rust
// mod sender {
    // ..
    pub fn try_payjoin(pj_uri: payjoin::Uri<'static, NetworkChecked>) -> Txid {
        let sender_wallet = get_sender_wallet();
        let amount_to_send = pj_uri.amount.unwrap();
        let receiver_address = pj_uri.address.clone();
    }
// }
```

##### 3.4 Construct an "Original PSBT" 

First we add the receiver address to the outputs list along side the
requested amount. Then we create a funded PSBT with options set to
specify `fee_rate` and other parameters.

```rust
// ...
// pub fn try_payjoin(pj_uri: payjoin::Uri<'static, NetworkChecked>) -> Txid {
    // ...
    let mut outputs = HashMap::with_capacity(1);
    outputs.insert(receiver_address.to_string(), amount_to_send);
    let options = bitcoincore_rpc::json::WalletCreateFundedPsbtOptions {
                lock_unspent: Some(false),
                fee_rate: Some(bitcoincore_rpc::bitcoin::Amount::from_sat(10000)),
                ..Default::default()
    };
    let sender_psbt = sender_wallet
        .wallet_create_funded_psbt(
                &[], // inputs
                &outputs,
                None, // locktime
                Some(options),
                None,
                )
        .unwrap();
    let psbt = sender_wallet
        .wallet_process_psbt(&sender_psbt.psbt, None, None, None)
        .unwrap()
        .psbt;
    let psbt = Psbt::from_str(&psbt).unwrap();
// }
```

##### 3.5 Construct the HTTPS request

Prepare the request we want to send and also get the context back so
we can handle the response when it's received.

```rust
// ...
// pub fn try_payjoin(pj_uri: payjoin::Uri<'static, NetworkChecked>) -> Txid {
    // ...
        let (req, ctx) = RequestBuilder::from_psbt_and_uri(psbt, pj_uri)
        .unwrap()
        .build_with_additional_fee(
                bitcoincore_rpc::bitcoin::Amount::from_sat(1),
                None,
                bitcoincore_rpc::bitcoin::FeeRate::MIN,
                true,
                )
        .unwrap()
        .extract_v1()
        .unwrap();
// }
```

##### 3.6 Send the request 

```rust
// ...
// pub fn try_payjoin(pj_uri: payjoin::Uri<'static, NetworkChecked>) -> Txid {
    // ...
    let res = https_agent()
        .post(req.url) // pj_uri.endpoint
        .header("Content-Type", "text/plain")
        .body(req.body)
        .send()
        .unwrap();
    let res = res.text().unwrap();
// }
```

##### 3.7 Process the response

Validate PSBT inputs, outputs and fees as it may have been altered by
the receiver.

```rust
// ...
// pub fn try_payjoin(pj_uri: payjoin::Uri<'static, NetworkChecked>) -> Txid {
    // ...
    let psbt = ctx.process_response(&mut res.as_bytes()).unwrap();

// }
```

##### 3.8 Sign and finalize the Payjoin Proposal PSBT

In the previous step we validated the PSBT and now it's time finish
the transaction, sign the PSBT and broadcast it.

```rust
// ...
// pub fn try_payjoin(pj_uri: payjoin::Uri<'static, NetworkChecked>) -> Txid {
    // ...
        let psbt = sender_wallet
        .wallet_process_psbt(&psbt.to_string(), None, None, None)
        .unwrap()
        .psbt;
    let tx = sender_wallet
        .finalize_psbt(&psbt, Some(true))
        .unwrap()
        .hex
        .unwrap();
    let txid = sender_wallet.send_raw_transaction(&tx).unwrap();
    txid
// }
```

##### 3.9 And lets call the sender functions in the `main`.

Back to the `main` function, we will read the payjoin uri from the
command line arguments and utilize `payjoin::Uri` to parse it.
After that, we will call the `try_payjoin` function and print the
transaction id.

```rust
fn main() {
    let args: Vec<String> = std::env::args().collect();
    let payjoin_uri: String = args[1].parse().unwrap();
    let payjoin_uri = payjoin::Uri::try_from(payjoin_uri)
        .unwrap()
        .assume_checked();
    let txid = sender::try_payjoin(payjoin_uri);
    dbg!(&txid);
}
```

## 4. Receiver

To set up the receiver, we will use `payjoin-cli` a cli payjoin
implementation developed by the `rust-payjoin` team. We will setup
this receiver, generate BIP21 URI and go back to the `sender` we
implemented and give it the URI.

Open your terminal, and:

#### 4.1 Install `payjoin-cli`

```shell
cargo install payjoin-cli --version 0.0.4-alpha --features danger-local-https
```

#### 4.2 Run `payjoin-cli` as the receiver

```rust
payjoin-cli -r http://localhost:18443/wallet/receiver --rpcuser foo --rpcpass qDDZdeQ5vw9XXFeVnXT4PZ--tGN2xNjjR4nrtyszZx0= receive --endpoint https://localhost:3000 1230000000
```

Once you run the the above command, an https server will start and a
payjoin URI will be printed, and will look like this:

```shell
bitcoin:bcrt1qstujjzput7eznwv27e7qh7lpkgz33fh39g2gpt?amount=12.3&pj=https://localhost:3000/&pjos=0
```

Copy the payjoin uri as we will need it in the next (final) step.

## 5. Run

Lets navigate back to the `payjoin-tutorial` folder and let the sender
make a request to the payjoin uri generated by the receiver in the
previous step.

Replace `payjoin-uri` with the uri you copied in the previous step.

```shell
cargo run -- "payjoin-uri"
```

```shell
### cargo run -- "bitcoin:bcrt1qstujjzput7eznwv27e7qh7lpkgz33fh39g2gpt?amount=12.3&pj=https://localhost:3000/&pjos=0"
```

## Conclusion

We just demonstrated how to integrate `rust-payjoin` with a bitcoin
wallet, using only the [`send` feature
module](https://docs.rs/payjoin/latest/payjoin/send/index.html). You
could enable other features like
[`receive`](https://docs.rs/payjoin/latest/payjoin/receive/index.html)
and `v2` to build more functionality.  We also used the `payjoin-cli`
to perform as a receiver, while we could also utilize it to be a
sender.

Thanks for following along.

