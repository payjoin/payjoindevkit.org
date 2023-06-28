# Getting started

Welcome to the Payjoin Development Kit documentation.

If you have any questions about anything related to PDK, feel free to ask our community on [GitHub Discussions](https://github.com/orgs/payjoin/discussions). 

## System Requirements

MacOS, Windows and Linux are supported.
## Installation

To add PDK to a project, run:

<CodeSwitcher :languages="{rust:'Rust'}">
  <template v-slot:rust>
 
  ```toml
    # Add the following dependencies to your cargo.toml and replace {VERSION} with the version number you want to use.

    [dependencies]
    payjoin = { version = {VERSION}, features = ["send", "receive"] }
  ```
  </template>
</CodeSwitcher>

Example usage after installation is complete:

<CodeSwitcher :languages="{rust:'Rust'}">
  <template v-slot:rust>

  ```rust
  use payjoin::send::Configuration;
  ```

  </template>
</CodeSwitcher>
