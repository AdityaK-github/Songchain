const { Web3 } = require('web3');
const { abi, bytecode } = require('../artifacts/contracts/SongNFT.sol/SongNFT.json'); // Adjust the path as necessary

async function main() {
    const web3 = new Web3('http://localhost:8545');

    // Get accounts from the Hardhat node
    const accounts = await web3.eth.getAccounts();
    const initialOwner = '0xB679bdD31332b13A203aAeEDcc17f4caF63BBf6F'

    // Create a contract instance
    const SongNFTContract = new web3.eth.Contract(abi);

    // Deploy the contract
    const songNFTInstance = await SongNFTContract.deploy({
        data: bytecode, // Use bytecode directly
        arguments: [initialOwner] // Pass the initial owner address
    })
    .send({ from: initialOwner, gas: 3000000 });

    console.log("SongNFT deployed to:", songNFTInstance.options.address);
}

// Execute the deployment script
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
