# Send and Receive Test Payjoins

Let's make our first payjoins. We'll ensure we have a compatible Rust toolchain installed, setup Bitcoin Core to create a local bitcoin wallets and then start send a payjoin from one to the other.

::: tip Not recommended for production use!
This guide is a quick start to get you up and running with PDK payjoins. This configuration serves as a playground and a foundation to build upon and is NOT recommended for production environments.
:::

## Install Rust

If you already have a working installation of the latest Rust compiler, feel free to skip to the next section.

To install the latest version of Rust, we recommend using `rustup`. Install `rustup` by following the instructions on [its website](https://rustup.rs/). Once `rustup` is installed, ensure the latest toolchain is installed by running the command:

```
rustup default stable
```

## Set up Bitcoin Core

Next, let's setup Bitcoin regtest, a local bitcoin network developers spin up on their local computers.

Bitcoin Core can be [downloaded](https://bitcoincore.org/) for MacOS, Linux, and Windows. The source code is hosted [on Github](https://github.com/bitcoin/bitcoin/releases/).

After downloading and installing, create two wallets `send` and `receive`. Fund them both with regtest coins.

## Run the PDK sample payjoin-cli

Start by cloning the payjoin-cli from GitHub and changing into the new directory

```console
git clone https://github.com/payjoin/rust-payjoin.git
cd payjoin-cli
mkdir receive
mkdir send
```

## Run the Payjoin reciever

Receiving a payjoin involves hosting an HTTP that the sender can reach. First, configure the receiver to connect to bitcoind.

```console
cd receive
touch config.toml
```

Edit the configuration file according to [your operating system's bitcoin data directory](https://en.bitcoin.it/wiki/Data_directory):

This sample is valid for a default datadir on MacOS:

```toml
# receive/config.toml
bitcoind_cookie = "~/Library/Application Support/Bitcoin/regtest/.cookie"
bitcoind_rpchost = "http://localhost:18443/wallet/receive"
```

Now, run the following command:

```
cargo run -- receive 10000
```

This will generate a universal bitcoin URI with payjoin enabled similar to the following:

```console
BITCOIN:BCRT1QCJ4X75DUNY4X5NAWLM3CR8MALM9YAUYWWEWKWL?amount=0.00010&pj=https://localhost:3010
```

### Proxy HTTPS

The default `payjoin-cli` configuration listens for requests at `http://localhost:3000`, so requests to `https://localhost:3010` must be proxied there.

Payjoin `&pj=` must be either `https` or `.onion` secure endpoints. Therefore, one must host a proxy from the `https` endpoint to the local unsecured `http` server. One option to proxy is with [local-ssl-proxy](https://github.com/cameronhunter/local-ssl-proxy).

Once installed, **in a new terminal window**, one may run the following command to run such a proxy:

```console
local-ssl-proxy --source 3010 --target 3000
```

At this point `payjoin-cli` is ready to receive payjoin to Bitcoin Core's `receive` regtest wallet.

## Send Payjoin

**Return to the `payjoin-cli` directory**. From there, navigate to the previously initialized `send` directory.

```console
cd send
touch config.toml
```

Edit the configuration file according to [your operating system's bitcoin data directory](https://en.bitcoin.it/wiki/Data_directory):

```toml
# send/config.toml
bitcoind_cookie = "~/Library/Application Support/Bitcoin/regtest/.cookie"
bitcoind_rpchost = "http://localhost:18443/wallet/send"
danger_accept_invalid_certs = true
```

After configuration, assuming funded `send` and `receive` wallets in Bitcoin Core, running the following command **with your previous receiver genrated bitcoin URI** will send a payjoin from `send` to `receive`.

```console
cargo run -- send $RECEIVE_URI --fee-rate 1
```

Make sure you replace `$RECEIVE_URI` with the bitcoin URI pasted from the receiver console.

You should see the payjoin transaction ID in the console. Congrats, you just Payjoined 🎉.
