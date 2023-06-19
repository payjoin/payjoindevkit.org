---
title: "PDK: A Payjoin SDK"
description: "Learn how PDK makes it easy to support Payjoin and the direction it will develop in our newly launched blog."
date: "2023-06-20"
authors:
  - Dan Gould
tags:
  - Bitcoin
  - PDK
---  
I am jazzed to release our first blog post. I cover the history of PDK, why you should consider using it to add Payjoin to your stack, and some of our priorities moving forward. We’ll be updating this blog with development updates, new features and the details of new releases.
  
## What is PDK?

<!-- If you’re reading this, you probably know something about the Lightning Development Kit, the easy-to-use open-source tool that simplifies how developers add highly secure, privacy-preserving Lightning functionality to bitcoin applications. What you might not know is how it got started.  -->

PDK began as a side project developed by Martin Habovštiak [@Kixunil](https://github.com/kixunil) in [2021](https://github.com/payjoin/rust-payjoin/commit/d70c447af622e2b9db34b833fe22a80ff3b2d223). One of Martin's early rust payjoin applications, [loptos](https://github.com/Kixunil/loptos), receives Payjoin  to open batches of lightning channels from an external Payjoin sender, reducing fees and eliminating a transaction from typical channel funding flow. Payjoin had been cast as a merchant / client privacy tool, but Martin saw payjoin as an interactive transaction coordinator early on. I now view Payjoin as the simplest way to deploy Greg Maxwell's 2013 transaction cut-through idea to scale bitcoin.

A couple months later, Alex Gladstein announced Human Rights Foundation [support](https://twitter.com/gladstein/status/1437796214376845315) of my work to make Payjoin mobile friendly in iOS. In my Payjoin deep dive, I realized that while mobile payjoin was possible, the dependencies it needed (like Tor 👀) would not suit many Bitcoin apps. On the path to a new version capable of universal support, I found Martin's rust payjoin to be a worthy foundation on which to build. The success of [BDK](https://bitcoindevkit.org/) and [LDK](https://lightningdevkit.org) inspired me. A Rust Payjoin dev kit could be flexible and safe enough to run everywhere.

In the fall of 2022, Evan Lin, Nick Farrow, Armin Sabouri and I upgraded loptos with a web interface, documentation, and demos into into [nolooking](https://github.com/chaincase-app/nolooking). While it only batched channels at first, nolooking now leverages PDK to make canonical payjoin transactions. The Payjoin transaction structure can preserve Bitcoin network privacy for all, too.

The demand from the launch of nolooking inspired me to reach out to more wallet projects which may have interest in using Payjoin. In particular, Michael from Boltz Exchange and Hugo Nguyen from Nunchuk both expressed early interest, but their projects use languages that are not rust. Matthias from Trident Wallet and Thunderbiscuit on the BDK team have volunteered their time exporing binding options. WizardSardine's Liana can make use of it too.

Conor Okus saw potential for payjoin and suggested a website to explain how it works and how to progress. That idea became [payjoin.org](https://payjoin.org) and newfound interest in its potential integrations. He pointed me to engage with the Bitcoin Design Community, where Stephen DeLorme and Christoph Ono helped me to issue a design challenge which [Yashraj](https://twitter.com/Yashraj__) accepted, went on to develop [The Payjoin Experience Case Study](https://bitcoin.design/guide/case-studies/payjoin/) in collaboration with Mogashni Naidoo, and present his findings at the Canadian Bitcoin Conference.

Hunter Beast took a risk on an early alpha of PDK, adding it to the Bitcoin, Lightning, and RGB web wallet BitMask. Steve Meyers of BDK mentors Will Owens as a Summer of Bitcoin intern to support payjoin in the BDK-CLI tool. Francis Pouliot engages closely with PDK to fulfil his [vow](https://twitter.com/francispouliot_/status/1138131827258986499) that Bull Bitcoin will be "the first Bitcoin company in the world to integrate pay-to-endpoint Bitcoin deposits and withdrawals." Now that the sturdy base of PDK exists, Payjoin stands a chance to evolve into every Bitcoin product.

A phalanx of even more unnamed supporters continue to raise this open-source groundwork with funding, infrastructure, integrations, bindings, design, protcol development, advice, documentation and more. Thank you all for your continued support. Follow along on [Twitter](), join the conversation on [Discord](), and get involved. If you are a developer, read on to understand why PDK exists and how you can make use of it today.

## What advantages does PDK offer developers?

<!-- Before committing to LDK, we spoke with over 50 wallet developers to learn what challenges they faced. We learned that developing Lightning apps was a universally bad experience, especially in mobile environments, and that a small team of experienced engineers could take up to two years to build a basic Lightning application. So… not great. 

LDK is a flexible Lightning implementation that focuses on running the Lightning node on a mobile phone in a non-custodial manner, which has significant privacy and sovereignty benefits. While this presents some technical challenges, non-custodial mobile apps are where LDK specializes, whether someone is building a wallet from scratch or integrating LDK into one that already exists.

Before LDK, if your team wanted to add Lightning functionality to a mobile app, you most likely had to modify and customize an existing implementation like LND to make it suitable for mobile devices. Core Lightning is also hard to run on iPhones. Both of these implementations are out-of-the-box node solutions that provide solid RPC and HTTP interfaces, but are targeted for server environments or simply aren’t suited to mobile. 

Furthermore, if you want to turn your on-chain wallet into a unified wallet experience or source chain data from a third-party server using the Electrum protocol for resource-constrained devices, it’s complex, time-consuming, and a huge engineering undertaking.

Maintaining an LN implementation that you can trust with real money is challenging, and different needs exist for routing nodes and mobile nodes. Maintenance costs also increase over time due to ageing codebases, interactions with other layers, and new use cases with different performance and security trade-offs. We see this with [Breez](https://github.com/breez/breezmobile) forking [LND](https://github.com/breez/lnd) to make it suitable for mobile and ACINQ doing something similar with [Phoenix](https://github.com/ACINQ/phoenix) wallet and [lightning-kmp](https://github.com/ACINQ/lightning-kmp).  

We created LDK in multiple languages with an API-first approach designed to run at the application layer, like Rust’s [Persist](https://docs.rs/lightning/latest/lightning/chain/chainmonitor/trait.Persist.html) trait. Persist defines behaviour for persisting channel states but lets you specify whether you write this data to disk or another backup mechanism, such as the cloud. You don’t need to write an LN implementation from scratch or modify an existing one to use LN functionality. Just call our APIs from your app.

Finally (for this section), LDK’s flexibility enables several different architectures without sacrificing security. Its lightweight design can be optimized to run on embedded devices or HSMs (hardware security modules) and it doesn’t make system calls, so it can run in almost any OS environment. For example, you can opt to run some Lightning logic, such as signing transactions and updating channel states on an HSM that has specific [spending policies](https://gitlab.com/lightning-signer/docs/-/blob/master/README.md) and manages private keys. Then you connect it to a server with its own TCP/IP stack using a serial communication method such as USB. 

Check out this [presentation](https://www.youtube.com/watch?v=9-81tobFSKg) at btc++ by [Jeff Czyz](https://twitter.com/jkczyz) and [Arik Sosman](https://twitter.com/arikaleph) to learn more about LDK [use cases](https://lightningdevkit.org/introduction/use_cases/). -->

## Who uses PDK?

PDK supports hot wallet applications, mobile and web environments, [Lightning Payjoin](https://chaincase.app/words/lightning-payjoin) channel opening, interesting miniscript optimizations, enterprise batching, and more. The following are a few examples you can try in the wild.

## [Bitcoin Core payjoin-cli extension](https://github.com/payjoin/rust-payjoin/tree/master/payjoin-cli)

The sample serves as a complete reference for sending and receiving Payjoin with
the PDK. This is a good starting point if you want a self-guided tour. `payjoin-cli` uses the blocking version of the `reqwest` crate for networking, so it's as simple as it gets.

## [LND nolooking payjoin extension](https://github.com/chaincase-app/nolooking)

Send and receive payjoin from LND. Batch lightning channel open transactions in payjoins with a web UI. Nolooking makes use of `async` and `tokio`. If your project uses an asynchronous runtime, this is the reference for you.

## [BitMask Beta](https://beta.bitmask.app)

Payjoin in a bitcoin webapp. Written in Rust and compiled to WASM. BitMask supports bitcoin, lightning, and RGB protocol assets. It uses the asynchronus `reqwest` client.

We’re also talking to dozens of open source projects, developers, and businesses, some of whom we expect to adopt PDK soon.

## What are PDK’s engineering priorities?

### A Robust Interface

Before PDK, a Payjoin implementations existed that were tightly coupled to their wallet logic. We want to build a sane inteface with comprehensive error handling. Being a privacy tool, getting the interface right and removing places where users can make errors is a critical goal. At the time of writing, the Payjoin `send` feature is beta quality while the `receiver` is in late alpha.

### Serverless, Asynchronous Payjoin

Payjoin v1 wallets can't receive unless the app is open, online, and hosting a public HTTP endpoint. We’re developing solutions in conjunction with the Bitcoin developer community at large that will let offline wallets receive Payjoin without hosting a public server. I have a [pull request](https://github.com/payjoin/rust-payjoin/pull/21) open that proposes a protocol to fix this exact problem. It includes his original post to the bitcoin-dev mailing list which is a [detailed technical](https://lists.linuxfoundation.org/pipermail/bitcoin-dev/2023-January/021364.html) read on this issue.

### Language Bindings

We’re making existing language integrations feel more native. We currently support Rust, but bindings are an active area of development. Bindings are in the proof of concept stage and [the approach](https://deploy-preview-144--awesome-golick-685c88.netlify.app/blog/bindings-scope/) is being defined in collaboration with BDK and LDK. We prioritize fixing bugs for early adopters. Express your support for C/C++, C#, Flutter/Dart, Kotlin/JVM, Python, Swift, WASM to get the ball rolling.

### Design Guidance

The payjoin protocol was designed to fit in the universal bitcoin URI and QR standard. Most of the user decisions regarding transaction construction, coin selection, and fees can be automated. We want to make it as easy as possible for developers to go from the decision that they'll support payjoin to a production deployment, and that includes front end components and communication with users

## Wrapping up

[Know someone supporting Payjoin or related application?](https://github.com/orgs/lightningdevkit/discussions/1554) Point them in [@bitgould’s](https://twitter.com/bitgould) direction. If you’re already using PDK and have questions, hop into our [Discord](https://discord.gg/xaYE3pDQpm) or checkout GitHub [Discussions](https://github.com/orgs/payjoin/discussions)