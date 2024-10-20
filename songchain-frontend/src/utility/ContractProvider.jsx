import React, { createContext, useContext, useEffect, useState } from 'react';
import Web3 from 'web3';
import { abi } from "../../../artifacts/contracts/SongNFT.sol/SongNFT.json"; // Adjust the path as necessary

const ContractContext = createContext();

export const ContractProvider = ({ children }) => {
    const [contract, setContract] = useState(null);
    const [web3, setWeb3] = useState(null);
    const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // Replace with your contract address

    useEffect(() => {
        const initWeb3AndContract = async () => {
            if (window.ethereum) {
                const web3Instance = new Web3(window.ethereum);
                const accounts = await web3Instance.eth.getAccounts();
                const contractInstance = new web3Instance.eth.Contract(abi, CONTRACT_ADDRESS);
                
                setWeb3(web3Instance);
                setContract(contractInstance);
            } else {
                console.error('MetaMask is not installed. Please install it to use this app.');
            }
        };

        const handleAccountChange = async (accounts) => {
            const web3Instance = new Web3(window.ethereum);
            const contractInstance = new web3Instance.eth.Contract(abi, CONTRACT_ADDRESS);
            setWeb3(web3Instance);
            setContract(contractInstance);
        };

        initWeb3AndContract();

        // Handle account changes
        window.ethereum.on('accountsChanged', handleAccountChange);

        // Cleanup the event listener on unmount
        return () => {
            window.ethereum.removeListener('accountsChanged', handleAccountChange);
        };
    }, []);

    return (
        <ContractContext.Provider value={{ contract, web3 }}>
            {children}
        </ContractContext.Provider>
    );
};

export const useContract = () => {
    return useContext(ContractContext);
};