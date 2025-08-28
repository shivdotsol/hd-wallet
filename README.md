# Crypto HD Wallet Generator (BTC, ETH, SOL)

A basic Vite + React application that generates **Hierarchical Deterministic (HD) wallets** for Bitcoin, Ethereum, and Solana using a mnemonic phrase.

## Features
- Generate a 12-word mnemonic phrase (BIP39 standard).
- Create HD wallets for:
  - **Bitcoin (BTC)**
  - **Ethereum (ETH)**
  - **Solana (SOL)**
- Derive addresses from a chosen wallet index.
- Copy addresses and private keys to clipboard.

## Tech Stack
- **Vite + React** (Frontend)
- **TypeScript** (Type safety)
- **Ethers.js** (Ethereum support)
- **BitcoinJS** (Bitcoin support)
- **@solana/web3.js** (Solana support)
- **BIP39 & BIP32** (Mnemonic & HD wallet derivation)

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/hd-wallet-generator.git
cd hd-wallet-generator
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the app
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```