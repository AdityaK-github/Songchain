import React, { useState, useEffect } from "react";
import { useContract } from "../utility/ContractProvider";

const MyNFTs = () => {
    const { contract, web3 } = useContract();
    const [nfts, setNFTs] = useState([]);

    useEffect(() => {
        const fetchNFTs = async () => {
            if (contract) {
                const accounts = await web3.eth.getAccounts();
                const userAddress = accounts[0];
                const ownedNFTs = await contract.methods.getOwnerNFT(userAddress).call();
                setNFTs(ownedNFTs);
            }
        };
        fetchNFTs();
    }, [contract, web3]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl font-bold mb-4">Your NFTs</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-6xl">
                {nfts.map(tokenId => (
                    <NFTCard key={tokenId} tokenId={tokenId} />
                ))}
            </div>
        </div>
    );
};

export default MyNFTs;

const NFTCard = ({ tokenId }) => {
    const { contract } = useContract();
    const [metadata, setMetadata] = useState(null);

    useEffect(() => {
        const fetchMetadata = async () => {
            const uri = await contract.methods.tokenURI(tokenId).call();
            const response = await fetch(uri);
            const data = await response.json();
            setMetadata(data);
        };
        fetchMetadata();
    }, [contract, tokenId]);

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transition transform hover:scale-105">
            {metadata && (
                <img 
                    src={metadata.image} 
                    alt={metadata.name} 
                    className="w-full h-48 object-cover"
                />
            )}
            <div className="p-4">
                <h3 className="text-lg font-semibold">{metadata?.name}</h3>
                <p className="text-gray-600">{metadata?.description}</p>
            </div>
        </div>
    );
};
