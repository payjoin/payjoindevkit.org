# Introduction

Payjoin Development Kit (PDK) is a full and completely standalone Payjoin implementation with supporting modules enabling greater flexibility.

You can support Payjoin without needing to worry about getting all of the Payjoin state machine, coin selection, and attack prevention code (and other privacy preserving details) exactly correct. PDK tends to be suitable for use cases where a degree of customization is desired, e.g. your own chain sync, your own key management and/or your own storage/backup logic.

The [payjoin-cli sample](https://github.com/payjoin/rust-payjoin/tree/master/payjoin-cli) showcases how PDK can be customised. It fetches blockchain data and transacts on-chain via Bitcoin Core RPC/REST. The individual components of the sample are composable. For example, the sample writes counterparty state to the local filesystem, but this component could be replaced with one that writes this data to the cloud or to multiple locations. You can pick the off-the-shelf parts you want and replace the rest.

## To jump into integrating PDK with your application

* [Click here for Rust](../tutorials/use_payjoin_in_rust.md)

## References

### [Rust Documentation](https://docs.rs/payjoin)

These provide the most searchable and comprehensive documentation on PDK.
If you're using Java and want more information on any method/struct/etc., searching
the Rust docs for the Rust version of that struct/method is your best bet.

### [Rust Payjoin CLI Implementation](https://github.com/payjoin/rust-payjoin/tree/master/payjoin-cli)

The sample serves as a complete reference for sending and reciving Payjoin with
the PDK and Bitcoin Core from the command line. Check it out to take a self-guided tour.
