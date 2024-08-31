---
home: true
heroText: Payjoin Dev Kit
tagline: Scale Bitcoin, save fees, and preserve privacy with one tiny library
actionText: Get started
actionLink: /introduction/
features:
- title: "Scale Bitcoin and Save Money"
  details: "Payjoin batches multiple transactions together, packing more activity into less block space and saving you money in transaction fees. Any Bitcoin settlement can use Payjoin."
  image: "customizable"
- title: "Just Payjoin"
  details: "PDK focuses on doing Payjoin right. You choose your wallet, networking IO, and application integration with our toolkit of best practices. We'll handle correctness, you handle experience."
  image: "focus"
- title: "Preserve Privacy"
  details: "Payjoins look like normal transaction activity while breaking the basis of Bitcoin surveillance. They protect everyone’s privacy, even those who don’t Payjoin."
  image: "mobile"
---

<div class="intro">
<h2>Why PDK?</h2>
<p>Dependable, lightweight, and flexible Payjoin for any Bitcoin wallet or service</p>
</div>

<div class="features">
<div class="feature">
<h3>PSBT Purity</h3>

Standard Partially Signed Bitcoin Transaction support and an internet connection is all you need to Payjoin. No fancy transaction parsing or pigeon-holed wallet architecture required.

</div>
<div class="feature">
<h3>Sans IO</h3>

The library is perfectly IO-agnostic—in fact, it does no IO. The primary goal of such design is to be easy to unit test. As a bonus, it can run almost anywhere.

</div>
<div class="feature">
<h3>Run Anywhere</h3>

We don't force you to use `async`, blocking, `tokio`, `sync-std`, `hyper`, `actix` or any specific runtime. Use what you're already comfortable with. See [examples](/examples/) for a variety of reference implementations.

</div>

<div class="feature">
<h3>Multi-Language Support</h3>

We are building native APIs for Rust, C, Python, Swift, JavaScript, Java & Kotlin, and WASM so you can build Payjoin applications in your preferred programming language.

</div>
</div>
