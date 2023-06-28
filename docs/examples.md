# Examples

Click the links below and learn from community-built example projects

## [Bitcoin Core payjoin-cli extension](https://github.com/payjoin/rust-payjoin/tree/master/payjoin-cli)

The sample serves as a complete reference for sending and receiving Payjoin with
the PDK. This is a good starting point if you want a self-guided tour. `payjoin-cli` uses the blocking version of the `reqwest` crate for networking, so it's as simple as it gets.

## [LND nolooking Payjoin extension](https://github.com/chaincase-app/nolooking)

Send and receive Payjoin from LND. Batch lightning channel open transactions in payjoins with a web UI. Nolooking makes use of `async` and `tokio`. If your project uses an asynchronous runtime, this is the reference for you.

## [BitMask Beta](https://beta.bitmask.app)

Payjoin in a bitcoin webapp. Written in Rust and compiled to WASM. BitMask supports bitcoin, lightning, and RGB protocol assets. It uses the asynchronus `reqwest` client.
