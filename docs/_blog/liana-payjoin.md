---
title: "Automatically Refresh Inheritance Timelocks with Payjoin"
description: "Liana combines Payjoin and time locked inheritance to help you keep your Bitcoin private now and safe for those who’ll need it later."
date: "2025-04-10"
authors:
  - Armin Sabouri
tags:
  - privacy
  - integrations
  - cut-through
---

[Liana](https://wizardsardine.com/liana/) is a Bitcoin desktop wallet that enables users to set up inheritance policies, ensuring their funds can be passed on to loved ones only after a predefined delay called a "timelock". To prevent unintentional activation of the inheritance policy, these time locked coins require periodic refreshing. Liana’s Payjoin integration enables users to refresh timelocks as they receive payments, boosting privacy and cutting costs.

## Privacy Leak Explained

Inheritance planning is a crucial yet often overlooked part of Bitcoin self-custody. While Bitcoin offers unmatched financial sovereignty, it introduces [unique challenges](https://wizardsardine.com/blog/the-state-of-bitcoin-inheritance-planning/) when it comes to passing on funds to future generations. Liana addresses this with inheritance policies that activate only after a timelock. For example, a user might control a primary key for daily use, while a recovery key held by a beneficiary is time locked for future access.

However, there's a catch: most users do not frequently spend their Bitcoin. A [2024 study](https://www.sciencedirect.com/science/article/pii/S0378437124008045) found that the age of unspent coins follows a power-law distribution (see Figure 3). In practice, this means coins are typically either spent soon after receipt or held for long periods. [Data also suggests](https://charts.bitbo.io/hodl-waves/) that most coins remain unspent for months or years. To avoid unintentionally triggering a recovery path, users often resort to reconciliation of their coins to reset timelocks.

<img alt="Liana time locked coins" src="../assets/liana-coins.png" />

But this reconciliation comes at a cost to privacy. These transactions create an identifiable on-chain footprint, making it easier for on-chain surveillance to estimate a user's balance and transaction history. This is primarily due to the [common input ownership heuristic](https://en.bitcoin.it/wiki/Common-input-ownership_heuristic), which assumes all inputs in a transaction belong to the same entity. Combined with unique transaction patterns that act like fingerprints, these heuristics allow on-chain analysts to cluster a user's addresses and glean sensitive information.

## Payjoin as a Privacy-Preserving Refresh

This is where Payjoin shines. It allows Liana users to refresh near-expiry coins during normal payments. For example, when a user receives a payment via Payjoin, they can opportunistically include expiring coins to refresh their timelocks. This same logic can apply to self-spends&mdash;users can initiate a Payjoin when sending a transaction, embedding refresh into routine activity.

Whether as sender or receiver, users benefit from lower fees, improved privacy, and preservation of their inheritance policies.

<img alt="Liana Payjoin" src="../assets/liana-batch-payment.svg" />

## Caveats

It's worth noting that the common-input heuristic is not defeated when using Payjoin with [P2WSH](https://river.com/learn/terms/p/p2wsh/) inputs&mdash;unless both participants share identical or structurally similar wallet policies. This is because the spending script is revealed on-chain, allowing fingerprinting based on script templates. Liana uses P2WSH by default to maintain compatibility with hardware wallets, which currently have limited support for [Taproot miniscript descriptors aka MiniTapscript](https://github.com/bitcoin/bitcoin/pull/27255).

However, [Taproot inputs](https://thebitcoinmanual.com/articles/pay-to-taproot-p2tr), a newer input type, do not suffer from this issue. With Taproot's key-path spending, the recovery script remains hidden unless explicitly revealed. This makes it possible to conduct Payjoin transactions between users with different wallet policies while breaking the common-input heuristic.

## Proof of Concept and Next Steps

During the MIT Bitcoin Hackathon, the Payjoin team developed a working proof of concept for both the Payjoin receiver and sender integrated with Liana. You can view the prototype [here](https://github.com/0xBEEFCAF3/liana/tree/payjoin-hackathon). In just 30 hours, the team successfully implemented the core functionality.

Looking ahead, we’re coordinating closely with the Liana engineering team to bring this integration to production. This involves rigorous testing, refining the transaction construction logic, and ensuring compatibility with Liana’s policy enforcement mechanisms. Together, we’ll work toward a robust, production-ready release that empowers users with a privacy-preserving, fee-efficient way to manage their recovery paths.

This integration brings privacy and practicality to Bitcoin inheritance, showing how simple batching protocols like Payjoin can improve user experience without compromising privacy.
