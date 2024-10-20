import React, { useState } from 'react';
import axios from 'axios';
import { useContract } from '../utility/ContractProvider';

const Upload = () => {
    const [file, setFile] = useState(null);
    const [response, setResponse] = useState(null);
    const { contract, web3 } = useContract(); // Access contract and web3

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async (event) => {
        event.preventDefault();
        if (!file || !contract) return; // Ensure contract is available
    
        const formData = new FormData();
        formData.append('file', file);
    
        try {
            // Step 1: Upload file to IPFS and get CID
            const uploadRes = await axios.post('http://localhost:3000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            // Step 2: Check the response and construct the tokenURI
            const { data: { data: { IpfsHash } } } = uploadRes;
            if (!IpfsHash) {
                throw new Error('IPFS upload failed');
            }
    
            const tokenURI = `https://gateway.pinata.cloud/ipfs/${IpfsHash}`; // Construct the token URI
    
            // Step 3: Prompt MetaMask to connect if not already connected
            if (window.ethereum) {
                try {
                    // Request accounts from MetaMask
                    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const userAddress = accounts[0]; // Use the first account
                    if (!userAddress) {
                        throw new Error('No account found');
                    }
    
                    // Step 4: Call the mintNFT function
                    const tx = await contract.methods.mintNFT(userAddress, tokenURI).send({ from: userAddress });
    
                    // Log the transaction hash for debugging
                    console.log('NFT minted:', tx);
    
                    // Store the response and transaction details
                    setResponse(uploadRes.data);
                } catch (error) {
                    console.error('Error fetching MetaMask accounts:', error);
                }
            } else {
                throw new Error('MetaMask is not installed');
            }
        } catch (error) {
            console.error('Error during upload or minting:', error);
            // Handle error (e.g., display a message to the user)
        }
    }; 

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl font-bold mb-4">Upload a File to Pinata</h1>
            <form onSubmit={handleUpload} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <input 
                        type="file" 
                        onChange={handleFileChange} 
                        required 
                        className="border border-gray-300 rounded p-2 w-full"
                    />
                </div>
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                >
                    Upload
                </button>
            </form>
            {response && (
                <pre className="bg-gray-200 p-4 rounded mb-4">{JSON.stringify(response, null, 2)}</pre>
            )}
            <div>
                <a href="http://localhost:5173">
                    <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 transition duration-300">
                        Back to Home
                    </button>
                </a>
            </div>
        </div>
    );
};

export default Upload;
