// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract PremiumPurchase {
    enum PremiumType { Developer, Enterprise }

    struct Transaction {
        address buyer;
        uint256 userId;
        PremiumType premiumType;
        uint256 amountPaid;
        uint256 timestamp;
    }

    address public owner;
    uint256 public developerPrice;
    uint256 public enterprisePrice;

    mapping(address => Transaction) public transactions;
    event PremiumPurchased(address indexed buyer, uint256 userId, PremiumType premiumType, uint256 amountPaid, uint256 timestamp);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    constructor(uint256 _developerPrice, uint256 _enterprisePrice) {
        owner = msg.sender;
        developerPrice = _developerPrice;
        enterprisePrice = _enterprisePrice;
    }

    function buyPremium(uint256 _userId, PremiumType _premiumType) public payable {
        require(_premiumType == PremiumType.Developer || _premiumType == PremiumType.Enterprise, "Invalid premium type");
        
        uint256 price = _premiumType == PremiumType.Developer ? developerPrice : enterprisePrice;
        require(msg.value >= price, "Insufficient payment");

        transactions[msg.sender] = Transaction(msg.sender, _userId, _premiumType, msg.value, block.timestamp);
        
        emit PremiumPurchased(msg.sender, _userId, _premiumType, msg.value, block.timestamp);
    }

    function withdraw() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    function updatePrices(uint256 _developerPrice, uint256 _enterprisePrice) public onlyOwner {
        developerPrice = _developerPrice;
        enterprisePrice = _enterprisePrice;
    }

    function getUserId(address _user) public view returns (uint256) {
        return transactions[_user].userId;
    }
}
