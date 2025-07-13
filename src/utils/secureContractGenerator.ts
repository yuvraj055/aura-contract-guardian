
export interface ContractTemplate {
  name: string;
  category: string;
  description: string;
  securityFeatures: string[];
  template: string;
}

export class SecureContractGenerator {
  private templates: ContractTemplate[] = [
    {
      name: 'ERC20 Token (Secure)',
      category: 'Token',
      description: 'Secure ERC20 token with comprehensive security features',
      securityFeatures: [
        'Reentrancy Protection',
        'Integer Overflow Protection',
        'Access Control',
        'Pausable Functionality',
        'Event Logging'
      ],
      template: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SecureToken
 * @dev Secure ERC20 token implementation with comprehensive security features
 */
contract SecureToken is ERC20, ReentrancyGuard, Pausable, Ownable {
    uint256 private constant MAX_SUPPLY = 1000000 * 10**18;
    
    event TokensMinted(address indexed to, uint256 amount);
    event TokensBurned(address indexed from, uint256 amount);
    
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) ERC20(name, symbol) {
        require(initialSupply <= MAX_SUPPLY, "Initial supply exceeds maximum");
        _mint(msg.sender, initialSupply);
    }
    
    function mint(address to, uint256 amount) 
        external 
        onlyOwner 
        nonReentrant 
        whenNotPaused 
    {
        require(to != address(0), "Cannot mint to zero address");
        require(totalSupply() + amount <= MAX_SUPPLY, "Would exceed max supply");
        
        _mint(to, amount);
        emit TokensMinted(to, amount);
    }
    
    function burn(uint256 amount) external nonReentrant whenNotPaused {
        require(amount > 0, "Amount must be greater than 0");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        
        _burn(msg.sender, amount);
        emit TokensBurned(msg.sender, amount);
    }
    
    function transfer(address to, uint256 amount) 
        public 
        override 
        nonReentrant 
        whenNotPaused 
        returns (bool) 
    {
        require(to != address(0), "Cannot transfer to zero address");
        return super.transfer(to, amount);
    }
    
    function transferFrom(address from, address to, uint256 amount) 
        public 
        override 
        nonReentrant 
        whenNotPaused 
        returns (bool) 
    {
        require(from != address(0), "Cannot transfer from zero address");
        require(to != address(0), "Cannot transfer to zero address");
        return super.transferFrom(from, to, amount);
    }
    
    function pause() external onlyOwner {
        _pause();
    }
    
    function unpause() external onlyOwner {
        _unpause();
    }
}`
    },
    {
      name: 'Multi-Signature Wallet',
      category: 'Wallet',
      description: 'Secure multi-signature wallet with time locks and daily limits',
      securityFeatures: [
        'Multi-Signature Approval',
        'Time Lock Mechanism',
        'Daily Transaction Limits',
        'Emergency Pause',
        'Role-Based Access'
      ],
      template: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title SecureMultiSigWallet
 * @dev Secure multi-signature wallet with enhanced security features
 */
contract SecureMultiSigWallet is ReentrancyGuard, Pausable {
    uint256 public constant MAX_OWNERS = 10;
    uint256 public constant TIME_LOCK_DURATION = 24 hours;
    uint256 public constant DAILY_LIMIT = 10 ether;
    
    struct Transaction {
        address to;
        uint256 value;
        bytes data;
        bool executed;
        uint256 confirmations;
        uint256 timelock;
        mapping(address => bool) isConfirmed;
    }
    
    address[] public owners;
    mapping(address => bool) public isOwner;
    uint256 public required;
    uint256 public transactionCount;
    uint256 public dailySpent;
    uint256 public lastResetTime;
    
    mapping(uint256 => Transaction) public transactions;
    
    event OwnerAdded(address indexed owner);
    event OwnerRemoved(address indexed owner);
    event RequirementChanged(uint256 required);
    event TransactionSubmitted(uint256 indexed transactionId);
    event TransactionConfirmed(uint256 indexed transactionId, address indexed owner);
    event TransactionExecuted(uint256 indexed transactionId);
    event DailyLimitExceeded(uint256 amount, uint256 limit);
    
    modifier onlyOwner() {
        require(isOwner[msg.sender], "Not an owner");
        _;
    }
    
    modifier transactionExists(uint256 transactionId) {
        require(transactionId < transactionCount, "Transaction does not exist");
        _;
    }
    
    modifier notExecuted(uint256 transactionId) {
        require(!transactions[transactionId].executed, "Transaction already executed");
        _;
    }
    
    constructor(address[] memory _owners, uint256 _required) {
        require(_owners.length > 0, "Owners required");
        require(_required > 0 && _required <= _owners.length, "Invalid requirement");
        require(_owners.length <= MAX_OWNERS, "Too many owners");
        
        for (uint256 i = 0; i < _owners.length; i++) {
            address owner = _owners[i];
            require(owner != address(0), "Invalid owner");
            require(!isOwner[owner], "Owner not unique");
            
            isOwner[owner] = true;
            owners.push(owner);
        }
        
        required = _required;
        lastResetTime = block.timestamp;
    }
    
    function submitTransaction(address to, uint256 value, bytes memory data) 
        external 
        onlyOwner 
        nonReentrant 
        whenNotPaused 
        returns (uint256) 
    {
        require(to != address(0), "Invalid destination");
        
        uint256 transactionId = transactionCount;
        transactions[transactionId].to = to;
        transactions[transactionId].value = value;
        transactions[transactionId].data = data;
        transactions[transactionId].timelock = block.timestamp + TIME_LOCK_DURATION;
        
        transactionCount++;
        
        emit TransactionSubmitted(transactionId);
        confirmTransaction(transactionId);
        
        return transactionId;
    }
    
    function confirmTransaction(uint256 transactionId) 
        public 
        onlyOwner 
        transactionExists(transactionId) 
        notExecuted(transactionId) 
    {
        require(!transactions[transactionId].isConfirmed[msg.sender], "Already confirmed");
        
        transactions[transactionId].isConfirmed[msg.sender] = true;
        transactions[transactionId].confirmations++;
        
        emit TransactionConfirmed(transactionId, msg.sender);
        
        if (isConfirmed(transactionId)) {
            executeTransaction(transactionId);
        }
    }
    
    function executeTransaction(uint256 transactionId) 
        public 
        nonReentrant 
        transactionExists(transactionId) 
        notExecuted(transactionId) 
    {
        require(isConfirmed(transactionId), "Transaction not confirmed");
        require(block.timestamp >= transactions[transactionId].timelock, "Time lock active");
        
        Transaction storage txn = transactions[transactionId];
        
        // Check daily limit
        if (block.timestamp > lastResetTime + 1 days) {
            dailySpent = 0;
            lastResetTime = block.timestamp;
        }
        
        if (dailySpent + txn.value > DAILY_LIMIT) {
            emit DailyLimitExceeded(txn.value, DAILY_LIMIT);
            return;
        }
        
        txn.executed = true;
        dailySpent += txn.value;
        
        (bool success,) = txn.to.call{value: txn.value}(txn.data);
        require(success, "Transaction failed");
        
        emit TransactionExecuted(transactionId);
    }
    
    function isConfirmed(uint256 transactionId) public view returns (bool) {
        return transactions[transactionId].confirmations >= required;
    }
    
    function pause() external onlyOwner {
        _pause();
    }
    
    function unpause() external onlyOwner {
        _unpause();
    }
    
    receive() external payable {}
}`
    }
  ];

  generateSecureContract(category: string, customParams?: Record<string, any>): string {
    const template = this.templates.find(t => t.category.toLowerCase() === category.toLowerCase());
    
    if (!template) {
      return this.generateBasicSecureContract(customParams);
    }
    
    let contract = template.template;
    
    // Apply custom parameters if provided
    if (customParams) {
      Object.entries(customParams).forEach(([key, value]) => {
        const placeholder = `{{${key}}}`;
        contract = contract.replace(new RegExp(placeholder, 'g'), value.toString());
      });
    }
    
    return contract;
  }
  
  private generateBasicSecureContract(params?: Record<string, any>): string {
    return `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title SecureContract
 * @dev A secure smart contract template with comprehensive security features
 */
contract SecureContract is ReentrancyGuard, Ownable, Pausable {
    
    // State variables
    mapping(address => uint256) private balances;
    uint256 private totalBalance;
    
    // Events for transparency
    event BalanceUpdated(address indexed user, uint256 newBalance);
    event Withdrawal(address indexed user, uint256 amount);
    event Deposit(address indexed user, uint256 amount);
    
    // Modifiers for additional security
    modifier validAddress(address _addr) {
        require(_addr != address(0), "Invalid address");
        _;
    }
    
    modifier validAmount(uint256 _amount) {
        require(_amount > 0, "Amount must be greater than 0");
        _;
    }
    
    constructor() {
        // Initialize contract
    }
    
    /**
     * @dev Secure deposit function with reentrancy protection
     */
    function deposit() 
        external 
        payable 
        nonReentrant 
        whenNotPaused 
        validAmount(msg.value) 
    {
        balances[msg.sender] += msg.value;
        totalBalance += msg.value;
        
        emit Deposit(msg.sender, msg.value);
        emit BalanceUpdated(msg.sender, balances[msg.sender]);
    }
    
    /**
     * @dev Secure withdrawal function following CEI pattern
     */
    function withdraw(uint256 amount) 
        external 
        nonReentrant 
        whenNotPaused 
        validAmount(amount) 
    {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        
        // Effects before interactions (CEI pattern)
        balances[msg.sender] -= amount;
        totalBalance -= amount;
        
        emit Withdrawal(msg.sender, amount);
        emit BalanceUpdated(msg.sender, balances[msg.sender]);
        
        // Interaction last
        (bool success,) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");
    }
    
    /**
     * @dev Get balance of user
     */
    function getBalance(address user) external view returns (uint256) {
        return balances[user];
    }
    
    /**
     * @dev Emergency pause function
     */
    function pause() external onlyOwner {
        _pause();
    }
    
    /**
     * @dev Unpause function
     */
    function unpause() external onlyOwner {
        _unpause();
    }
    
    /**
     * @dev Emergency withdrawal function (owner only)
     */
    function emergencyWithdraw() external onlyOwner nonReentrant {
        require(paused(), "Contract must be paused");
        
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        
        (bool success,) = payable(owner()).call{value: balance}("");
        require(success, "Emergency withdrawal failed");
    }
}`;
  }
  
  getAvailableTemplates(): ContractTemplate[] {
    return this.templates;
  }
}
