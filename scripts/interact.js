const {Web3} = require("web3");
const { abi } = require("../artifacts/contracts/SongNFT.sol/SongNFT.json");

async function main() {
    const web3 = new Web3("http://localhost:8545"); // Connect to local Hardhat network

    const accounts = await web3.eth.getAccounts();
    const deployer = accounts[0];

    const contractAddress = "DEPLOYED_CONTRACT_ADDRESS"; // Replace with your deployed contract address
    const songNFT = new web3.eth.Contract(abi, contractAddress);

    // Mint an NFT
    const mintTx = await songNFT.methods.mintNFT(deployer, "YOUR_TOKEN_URI").send({ from: deployer });
    console.log("Minted NFT!");

    // Get NFTs owned by the deployer
    const ownerNFTs = await songNFT.methods.getOwnerNFT(deployer).call();
    console.log("Owner NFTs:", ownerNFTs);

    // Transfer an NFT (if applicable)
    if (ownerNFTs.length > 0) {
        const transferTx = await songNFT.methods.transfer(ownerNFTs[0]).send({ from: deployer, to: accounts[1] }); // Transfer to the second account
        console.log(`Transferred NFT ${ownerNFTs[0]} to ${accounts[1]}`);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
