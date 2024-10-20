import Web3 from 'web3';
import { abi } from '../../../artifacts/contracts/SongNFT.sol/SongNFT.json';

let web3;
let contract;

const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // Replace with your contract address
const ABI = abi;

const connectMetaMask = async () => {
    if (window.ethereum) {
        try {
            // Request account access
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            web3 = new Web3(window.ethereum);

            // Get the user's accounts
            const accounts = await web3.eth.getAccounts();
            const userAddress = accounts[0]; // Get the first account

            // Create contract instance
            contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

            console.log('MetaMask connected:', userAddress);
            return { web3, userAddress, contract }; // Return web3 instance, user address, and contract
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
            return { web3: null, userAddress: null, contract: null }; // Return nulls if connection fails
        }
    } else {
        console.error('MetaMask is not installed. Please install it to use this app.');
        return { web3: null, userAddress: null, contract: null }; // Return nulls if MetaMask is not installed
    }
};

export { connectMetaMask };
