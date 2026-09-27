# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.x     | :white_check_mark: |

## Reporting a Vulnerability

DevToolbox runs entirely in the browser and does not send your data to any server. That said, security issues in the client code (XSS, unsafe parsing, dependency issues) still matter.

**Please do not open a public GitHub issue for security vulnerabilities.**

Instead, report privately by emailing the maintainer via the contact method listed on the [GitHub profile](https://github.com/Daannnyyyy), or open a private security advisory on the repository if available.

Include:

- A clear description of the issue
- Steps to reproduce
- Potential impact
- Any suggested fix (optional)

We aim to acknowledge reports within **7 days** and keep you updated until a fix is released or the report is closed.

## Scope

In scope:

- Cross-site scripting or injection via tool inputs
- Supply-chain / dependency vulnerabilities that affect the published app
- Accidental data leakage introduced by future features

Out of scope:

- Issues that require a compromised local machine
- Social engineering
- Denial of service against a user's own browser tab
