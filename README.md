# Songchain 🎶

**Songchain** is a decentralized platform for minting and managing songs as NFTs, allowing artists to tokenize their music, ensuring clear ownership, and automating royalty distribution. This project empowers independent artists, enhances fan engagement, and secures intellectual property using blockchain technology.

## Features
- **Mint Songs as NFTs**: Artists can create unique digital assets representing their music.
- **Ownership & Royalties**: Smart contracts ensure transparent ownership and royalty management.
- **Marketplace**: A decentralized marketplace for buying and selling song NFTs.
- **Fan Engagement**: Fans can own, trade, and enjoy exclusive content via NFT ownership.
- **Secure & Immutable**: Protects intellectual property with blockchain's immutable records.

## Tech Stack
- **Smart Contracts**: Solidity (deployed on Ethereum)
- **Frontend**: React (with Vite) + Web3.js
- **Backend**: Hardhat for contract deployment and testing
- **Storage**: IPFS with Pinata for decentralized file storage
- **Blockchain**: Ethereum for NFTs and transactions

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/AdityaK-github/Songchain.git

2. **Navigate to the Project Directory**:
   ```bash
   cd Songchain  

3. **Install Dependencies**:
   ```bash
   npm install

4. **Compile Smart Contracts**:
   ```bash
   npx hardhat compile

5. **Run the local blockchain**:
   ```bash
   npx hardhat node

6. **Deploy the contract to the blockchain**:
   ```bash
   npx npx hardhat run scripts/deploy.js --network localhost

8. **Run the Development Server**:
   ```bash
   cd songchain-frontend
   npm run dev

## Usage

1. **Minting NFTs**: Upload your song files (audio) and metadata (e.g., title, artist name) via the platform's UI. Mint and deploy the song as an NFT on the blockchain.

2. **Purchasing NFTs**: Explore the marketplace and purchase song NFTs using your web3 wallet.

3. **Viewing NFT Collection**: Fans and artists can view their owned song NFTs via their profile.

