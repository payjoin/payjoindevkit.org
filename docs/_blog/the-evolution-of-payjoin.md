---
title: "The Evolution of Payjoin: From Two-Party Protocol to Multiparty Framework"
description: "Learn how Payjoin is evolving from a simple two-party protocol into a sophisticated multiparty transaction framework"
date: "2025-03-18"
authors:
  - Conor Okus
tags:
  - V3
---

Payjoin is a transformative protocol that enables wallets to communicate and create collaborative, smarter, and more efficient Bitcoin transactions. It offers payment batching technology that exchanges and payment processors can use to [save on fees](https://payjoin.org/docs/how-payjoin-saves) and protect their own and their users' financial [privacy](https://payjoin.org/docs/why-payjoin/privacy) while [scaling](https://payjoin.org/docs/why-payjoin/scaling) Bitcoin.

BTCPayServer already supports PayJoin and in 2024, the project made significant progress with the implementation of [Async Payjoin in the Bull Bitcoin Mobile Wallet](https://www.bullbitcoin.com/blog/bull-bitcoin-wallet-payjoin) and ongoing development work in [Cake Wallet](https://github.com/cake-tech/cake_wallet/pull/1889).

# The Evolution of Payjoin

## Pay-to-Endpoint (P2EP) & Bustapay (BIP 79): Laying the Groundwork

Early efforts to improve Bitcoin payments explored ways for senders and receivers to construct transactions together. Pay-to-Endpoint (P2EP) introduced the idea of receivers contributing inputs, making payments more efficient and indistinguishable from standard transactions. This approach helped consolidate funds and optimise blockchain usage.

Building on this, Bustapay (BIP 79) provided a practical method for merchants to adopt batched transactions. By embedding a payment request URL, receivers could signal their ability to merge inputs with the sender’s. While adoption remained limited, these ideas laid the foundation for Payjoin by showing that payments could be interactive rather than one-directional.

## Payjoin V1 (BIP 78): The Foundation

Building on Bustapay, [Payjoin V1 (BIP 78)](https://payjoin.org/docs/how-it-works/payjoin-v1-bip-78) refined sender-receiver transaction collaboration into a more practical and extensible protocol. It allowed both parties to contribute inputs, enabling UTXO consolidation, efficient fund transfers, and breaking the [common-input-ownership heuristic](https://en.bitcoin.it/wiki/Common-input-ownership_heuristic) used in blockchain analysis. By standardizing wallet communication through a URI parameter and leveraging [Partially Signed Bitcoin Transactions](https://en.bitcoin.it/wiki/BIP_0174) (PSBT), BIP 78 made adopting [the Payjoin experience](https://bitcoin.design/guide/case-studies/payjoin/) easier across different wallets and hardware devices.

However, Payjoin V1 has limitations. It requires both sender and receiver to be online simultaneously (synchronous communication), and the receiver needs to host a server to facilitate coordination. Despite these challenges, real-world implementations of Payjoin in payment processing software demonstrate its viability, laying the groundwork for future improvements in multiparty transaction batching.

## Payjoin V2 (BIP 77): Asynchronous Communication

[Payjoin V2 (BIP 77)](https://payjoin.org/docs/how-it-works/payjoin-v2-bip-77) improves upon the limitations of V1 by introducing asynchronous communication, removing the need for both parties to be online at the same time. Instead of direct interaction, a designated server temporarily stores pending transactions, allowing the sender to submit a Payjoin request and the receiver to complete it later when they come online. Importantly, this server is blinded, meaning it cannot see the details of the transactions it's facilitating, and can be used anonymously, providing an additional layer of privacy protection.

This change makes Payjoin more practical for everyday use, especially for merchants and services that can’t maintain real-time connections with senders. By enabling transactions to be completed more flexibly, Payjoin V2 expands the scope of batched transactions while preserving efficiency and privacy.

# Looking to the Future: Payjoin V3

The next evolution in the Payjoin ecosystem aims to move beyond the two-party model to enable true multiparty batched transactions.

## The Limitations of Two-Party Payjoins

Current Payjoin versions face inherent limitations when extended to more complex payment scenarios. For example, when multiple people want to pay the same recipient, or one person wishes to pay multiple recipients in a single transaction, the current protocols cannot handle these scenarios because they're designed around a strict sender-receiver model.

Furthermore, two-party Payjoin faces a significant privacy limitation: because only two peers interact, they still each know each other's inputs and outputs. This means that while Payjoin provides privacy benefits against third-party observers, the participants themselves have complete visibility into each other's transaction details.

Multi-party Payjoin solves this "second-party privacy" issue inherent in the two-party model. By involving multiple participants, no single party has complete knowledge of all inputs and outputs, thereby enhancing privacy not just against blockchain observers but between the transaction participants themselves.

## The Multiparty Solution

Payjoin V3 will solve these limitations by introducing a collaborative model where multiple parties can contribute to a single transaction. This creates a flexible network of participants all working together to build more efficient transactions.

Unlike previous versions where transactions followed a rigid proposal-response pattern, V3 allows transactions to be built collaboratively with multiple participants adding their inputs and outputs to create truly optimized Bitcoin transactions. This approach effectively enables [Greg Maxwell's transaction cut-through concept](https://bitcointalk.org/index.php?topic=281848.0) originally proposed in 2013, which suggested that Bitcoin transactions could be combined to improve privacy and efficiency on the network.

**It's important to note that the real benefits of this approach will initially be realized within single products** — such as exchanges or self-custodial wallets with large user bases. These efficiency and privacy gains will first emerge in closed ecosystems where a single entity can coordinate multiple users' transactions.

By implementing this collaborative framework, Payjoin V3 brings to life a long-standing idea in the Bitcoin ecosystem that has significant implications for both transaction efficiency and privacy.

# Implementation Roadmap

The development team has outlined a four-phase approach to implementing Payjoin V3:

## Phase 0: Multi Sender, Single Receiver Payjoin (Current Phase)

In this initial phase, the goal is to validate the core multiparty concept through experimentation and testing. The team has developed a prototype demonstrating a 5-party transaction (4 senders and 1 receiver) and documenting tradeoffs and challenges. A multiparty Payjoin implementation is planned for [experimental release](https://github.com/payjoin/rust-payjoin/pull/434).

## Phase 1: Multi-Sender, Multi-Receiver Payjoin

Expanding on the previous phase, this stage introduces transactions where multiple receivers participate alongside multiple senders. This enhancement increases flexibility for batched transactions and improves UTXO management efficiency.

## Phase 2: Privacy Optimization

The team will implement privacy metrics by creating a formal framework that analyzes transaction privacy, building analysis tools to evaluate different scenarios, optimizing transaction patterns for maximum privacy benefits, and documenting findings to guide implementation decisions.

## Phase 3: Decentralized Market Mechanisms

The final phase focuses on developing a coalition formation protocol that enables unconnected Bitcoin users to discover and collaborate on batched transactions. This system will include a decentralized discovery protocol that matches compatible transaction partners while preserving privacy, sustainable economic incentive structures, cryptographic mechanisms that minimize required trust between participants, and optimized scaling strategies to support larger transaction coalitions.

# Looking Ahead

Payjoin is evolving from a simple two-party protocol into a sophisticated multiparty transaction framework that has the potential to transform how Bitcoin transactions are constructed and processed. The roadmap spans from experimental 5-party transactions to a full-fledged decentralized pseudo-mempool where transactions can wait for consolidation opportunities, building toward a more private, efficient, and scalable Bitcoin network.

In future posts, the team will make the case for services such as exchanges and e-cash mints with Lightning Network integration to leverage Payjoin in several scenarios, including:

- Efficient funding of single Lightning channels.
- Optimized batched opening and closing of multiple channels.
- Preserved customer privacy and efficiency when funding single splice-in/out operations.
- Coordinated funding of multiple splice operations across different channels.
- Cluster prevention makes it harder to identify mint interactions through channel opens/closes, while also reducing transaction fees through more efficient consolidation.

Additional benefits that will be explored include fee savings through opportunistic UTXO consolidation, reduced costs via transaction [cut-through for batches](https://payjoin.org/docs/how-payjoin-saves#payjoin-payment-batching) and enhanced [Lightning Network efficiency](https://payjoin.org/docs/why-payjoin/lightning) through specialized Payjoin implementations for channel management. These innovations represent not just incremental improvements but foundational changes to how Bitcoin can function without protocol changes at scale while preserving user privacy.
