# Use Cases for PDK

Payjoin uses interaction to improve blockspace efficiency and preserve privacy.
Here's some other use cases that PDK supports.

## Bitcoin Core Extension

Payjoin CLI uses Bitcoin Core's `bitcoind` JSON-RPC to send and receive payjoin.
This enables payjoin functionality for existing bitcoin deployments.
[Test send and receive Payjoin](../test-send-receive-payjoin.md) documents how this works.

## Commercial Bitcoin Exchange

Bitcoin businesses can use payjoin to do more than just send and receive simple
payments. Payjoin can be used to combine payment forwarding and payment batching
as transaction cut-through to reduce what would be at least two transactions into
one, saving considerable blockspace ([Bitcoin Optech Newsletter #251/Advanced payjoin applications](https://bitcoinops.org/en/newsletters/2023/05/17/)).
Doing so can save a business fees, increase the speed of service, and serve more
customers when compared to traditional batching techniques.

## Lightning Nodes

Lightning nodes using payjoin can batch channel funding transactions from the
first transaction they receive. The [nolooking](https://github.com/chaincase-app/nolooking)
project demonstrates this capability with an LND Extension and web interface.
Check out these [video demos](https://twitter.com/utxoclub/status/1592460852690419712)
to see it in action. Interaction allows the receiver to prepare just-in-time
channel funding outputs from a queue when a payjoin is incoming.
Find it on the [Umbrel App Store](https://apps.umbrel.com/app/nolooking)

## Web Apps

The PDK can be compiled to WASM to run in web browsers. [BitMask Beta](https://beta.bitmask.app/)
uses PDK to send payjoins whenever bitcoin URIs support them.
