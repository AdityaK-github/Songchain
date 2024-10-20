// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SongNFT is ERC721URIStorage, Ownable {
    event NFTMinted(
        address indexed owner,
        uint256 indexed tokenId,
        string tokenURI
    );
    event NFTTransferred(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId
    );

 
    mapping(address => uint[]) private ownerToTokens;

    uint256 public nextTokenId = 0;

    constructor(
        address initialOwner
    ) ERC721("SongNFT", "SNFT") Ownable(initialOwner) {}

    function mintNFT(address _to, string memory _tokenURI) external onlyOwner {
        _safeMint(_to, nextTokenId);
        _setTokenURI(nextTokenId, _tokenURI);
        emit NFTMinted(_to, nextTokenId, _tokenURI);
        nextTokenId++;
    }


    function getOwnerNFT(address _owner) public view returns (uint[] memory) {
        return ownerToTokens[_owner];
    }

    function transfer(address _to, uint _tokenId) external {
        require(ownerOf(_tokenId) == msg.sender, "You do not own this token");
        require(_to != address(0), "Cannot transfer to the zero address");

        _safeTransfer(msg.sender, _to, _tokenId, "");
        emit NFTTransferred(msg.sender, _to, _tokenId);
    }
}
