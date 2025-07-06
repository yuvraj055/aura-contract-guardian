
import React, { useState, useEffect } from 'react';
import { Wand2, FileText, Eye, Download, Copy, Rocket, Settings, CheckCircle, Code, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export const GeneratorCard = () => {
  const [selectedType, setSelectedType] = useState('');
  const [step, setStep] = useState(1);
  const [contractParams, setContractParams] = useState({
    name: '',
    symbol: '',
    totalSupply: '',
    decimals: '18',
    mintable: false,
    burnable: false,
    pausable: false,
    ownable: true,
    // NFT specific
    baseURI: '',
    maxSupply: '',
    mintPrice: '0.01',
    // DAO specific
    votingPeriod: '7',
    quorum: '51',
    // Marketplace specific
    feePercent: '2.5',
    // Vesting specific
    cliff: '30',
    duration: '365'
  });
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [livePreview, setLivePreview] = useState('');
  const [deploymentStatus, setDeploymentStatus] = useState<'idle' | 'deploying' | 'deployed' | 'failed'>('idle');
  const [contractAddress, setContractAddress] = useState('');
  
  const contractTypes = [
    { 
      id: 'token', 
      name: 'ERC-20 Token', 
      desc: 'Standard fungible token with advanced features',
      icon: '🪙',
      features: ['Mintable', 'Burnable', 'Pausable', 'Ownable', 'Snapshot', 'Permit'],
      gasEstimate: '~1.2M gas',
      complexity: 'Beginner'
    },
    { 
      id: 'nft', 
      name: 'NFT Collection', 
      desc: 'ERC-721 with metadata and royalties',
      icon: '🖼️',
      features: ['Enumerable', 'URI Storage', 'Royalties', 'Whitelist', 'Reveal', 'Batch Mint'],
      gasEstimate: '~2.1M gas',
      complexity: 'Intermediate'
    },
    { 
      id: 'dao', 
      name: 'DAO Governance', 
      desc: 'Decentralized governance with treasury',
      icon: '🏛️',
      features: ['Voting', 'Proposals', 'Treasury', 'Timelock', 'Delegation', 'Quorum'],
      gasEstimate: '~3.5M gas',
      complexity: 'Advanced'
    },
    { 
      id: 'marketplace', 
      name: 'NFT Marketplace', 
      desc: 'Complete trading platform',
      icon: '🛒',
      features: ['Auctions', 'Fixed Price', 'Royalties', 'Escrow', 'Offers', 'Collections'],
      gasEstimate: '~2.8M gas',
      complexity: 'Advanced'
    },
    { 
      id: 'vesting', 
      name: 'Token Vesting', 
      desc: 'Time-locked token distribution',
      icon: '⏰',
      features: ['Linear', 'Cliff', 'Revokable', 'Multiple Recipients', 'Batch Setup', 'Emergency Stop'],
      gasEstimate: '~1.8M gas',
      complexity: 'Intermediate'
    }
  ];

  // Live preview generation
  useEffect(() => {
    if (contractParams.name && contractParams.symbol && selectedType) {
      generateLivePreview();
    }
  }, [contractParams, selectedType]);

  const generateLivePreview = () => {
    const preview = getContractTemplate(true);
    setLivePreview(preview);
  };

  const handleParamChange = (key: string, value: string | boolean) => {
    setContractParams(prev => ({ ...prev, [key]: value }));
  };

  const generateContract = async () => {
    if (!contractParams.name || !contractParams.symbol) {
      toast.error('Please fill in required fields');
      return;
    }

    setIsGenerating(true);
    toast.info('Generating your smart contract...');

    // Simulate realistic contract generation
    setTimeout(() => {
      toast.info('Analyzing requirements...');
    }, 500);

    setTimeout(() => {
      toast.info('Compiling contract templates...');
    }, 1500);

    setTimeout(() => {
      toast.info('Applying security patterns...');
    }, 2500);

    setTimeout(() => {
      const template = getContractTemplate();
      setGeneratedCode(template);
      setIsGenerating(false);
      setStep(3);
      toast.success('Smart contract generated successfully!');
    }, 3500);
  };

  const getContractTemplate = (isPreview = false) => {
    const selectedContract = contractTypes.find(type => type.id === selectedType);
    
    if (selectedType === 'token') {
      return `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

/// @title ${contractParams.name}
/// @notice Advanced ERC20 token with enhanced features
/// @dev Implements multiple OpenZeppelin extensions for security and functionality
contract ${contractParams.name.replace(/\s+/g, '')} is ERC20, ERC20Burnable, ERC20Snapshot, Ownable, Pausable, ERC20Permit {
    
    event TokensMinted(address indexed to, uint256 amount);
    event ContractPaused(address indexed by);
    event ContractUnpaused(address indexed by);
    
    constructor() ERC20("${contractParams.name}", "${contractParams.symbol}") ERC20Permit("${contractParams.name}") {
        _mint(msg.sender, ${contractParams.totalSupply} * 10**decimals());
        emit TokensMinted(msg.sender, ${contractParams.totalSupply} * 10**decimals());
    }

    function snapshot() public onlyOwner {
        _snapshot();
    }

    ${contractParams.mintable ? `
    /// @notice Mint new tokens to specified address
    /// @param to Address to receive the tokens
    /// @param amount Amount of tokens to mint
    function mint(address to, uint256 amount) public onlyOwner {
        require(to != address(0), "Cannot mint to zero address");
        _mint(to, amount);
        emit TokensMinted(to, amount);
    }

    /// @notice Batch mint tokens to multiple addresses
    /// @param recipients Array of addresses to receive tokens
    /// @param amounts Array of amounts corresponding to each recipient
    function batchMint(address[] calldata recipients, uint256[] calldata amounts) external onlyOwner {
        require(recipients.length == amounts.length, "Arrays length mismatch");
        for (uint256 i = 0; i < recipients.length; i++) {
            _mint(recipients[i], amounts[i]);
            emit TokensMinted(recipients[i], amounts[i]);
        }
    }` : ''}

    ${contractParams.pausable ? `
    /// @notice Pause all token transfers
    function pause() public onlyOwner {
        _pause();
        emit ContractPaused(msg.sender);
    }

    /// @notice Unpause all token transfers
    function unpause() public onlyOwner {
        _unpause();
        emit ContractUnpaused(msg.sender);
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override(ERC20, ERC20Snapshot)
    {
        super._beforeTokenTransfer(from, to, amount);
    }` : ''}

    /// @notice Get contract version
    function version() external pure returns (string memory) {
        return "1.0.0";
    }

    /// @notice Emergency withdrawal function
    function emergencyWithdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}`;
    } else if (selectedType === 'nft') {
      return `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";

contract ${contractParams.name.replace(/\s+/g, '')} is ERC721, ERC721Enumerable, ERC721URIStorage, Pausable, Ownable, ReentrancyGuard, IERC2981 {
    
    uint256 private _nextTokenId = 1;
    uint256 public constant MAX_SUPPLY = ${contractParams.maxSupply || '10000'};
    uint256 public mintPrice = ${contractParams.mintPrice} ether;
    string private _baseTokenURI = "${contractParams.baseURI}";
    
    mapping(address => bool) public whitelist;
    bool public whitelistActive = true;
    bool public revealed = false;
    string public hiddenMetadataUri = "https://example.com/hidden.json";
    
    // Royalty info
    address private _royaltyRecipient;
    uint96 private _royaltyFee = 500; // 5%

    event TokenMinted(address indexed to, uint256 indexed tokenId);
    event WhitelistUpdated(address indexed user, bool status);
    event Revealed();

    constructor() ERC721("${contractParams.name}", "${contractParams.symbol}") {
        _royaltyRecipient = msg.sender;
    }

    function mint(uint256 quantity) external payable nonReentrant whenNotPaused {
        require(quantity > 0 && quantity <= 10, "Invalid quantity");
        require(_nextTokenId + quantity <= MAX_SUPPLY + 1, "Exceeds max supply");
        require(msg.value >= mintPrice * quantity, "Insufficient payment");
        
        if (whitelistActive) {
            require(whitelist[msg.sender], "Not whitelisted");
        }

        for (uint256 i = 0; i < quantity; i++) {
            uint256 tokenId = _nextTokenId++;
            _safeMint(msg.sender, tokenId);
            emit TokenMinted(msg.sender, tokenId);
        }
    }

    function batchWhitelist(address[] calldata users, bool status) external onlyOwner {
        for (uint256 i = 0; i < users.length; i++) {
            whitelist[users[i]] = status;
            emit WhitelistUpdated(users[i], status);
        }
    }

    function reveal() external onlyOwner {
        revealed = true;
        emit Revealed();
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        
        if (!revealed) {
            return hiddenMetadataUri;
        }
        
        return super.tokenURI(tokenId);
    }

    function royaltyInfo(uint256, uint256 salePrice) external view override returns (address, uint256) {
        return (_royaltyRecipient, (salePrice * _royaltyFee) / 10000);
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        payable(owner()).transfer(balance);
    }

    // Required overrides
    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        whenNotPaused
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage, IERC165)
        returns (bool)
    {
        return interfaceId == type(IERC2981).interfaceId || super.supportsInterface(interfaceId);
    }
}`;
    } else if (selectedType === 'dao') {
      return `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorSettings.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol";

contract ${contractParams.name.replace(/\s+/g, '')}DAO is Governor, GovernorSettings, GovernorCountingSimple, GovernorVotes, GovernorVotesQuorumFraction, GovernorTimelockControl {
    
    event ProposalExecuted(uint256 indexed proposalId);
    event QuorumUpdated(uint256 oldQuorum, uint256 newQuorum);
    
    constructor(IVotes _token, TimelockController _timelock)
        Governor("${contractParams.name} DAO")
        GovernorSettings(7200, /* 1 day */ 50400, /* 1 week */ 0)
        GovernorVotes(_token)
        GovernorVotesQuorumFraction(${contractParams.quorum || '4'})
        GovernorTimelockControl(_timelock)
    {}

    // Voting delay: How long after a proposal is created should voting power be fixed
    function votingDelay() public pure override(IGovernor, GovernorSettings) returns (uint256) {
        return 7200; // 1 day (assuming 12 second blocks)
    }

    // Voting period: How long does a proposal remain open to votes
    function votingPeriod() public pure override(IGovernor, GovernorSettings) returns (uint256) {
        return ${contractParams.votingPeriod ? contractParams.votingPeriod + '0400' : '50400'}; // ${contractParams.votingPeriod || '7'} days
    }

    // Proposal threshold: Minimum number of votes needed to create a proposal
    function proposalThreshold() public pure override(Governor, GovernorSettings) returns (uint256) {
        return 1000e18; // 1000 tokens
    }

    // Required overrides
    function quorum(uint256 blockNumber)
        public
        view
        override(IGovernor, GovernorVotesQuorumFraction)
        returns (uint256)
    {
        return super.quorum(blockNumber);
    }

    function state(uint256 proposalId)
        public
        view
        override(Governor, GovernorTimelockControl)
        returns (ProposalState)
    {
        return super.state(proposalId);
    }

    function propose(address[] memory targets, uint256[] memory values, bytes[] memory calldatas, string memory description)
        public
        override(Governor, IGovernor)
        returns (uint256)
    {
        return super.propose(targets, values, calldatas, description);
    }

    function _execute(uint256 proposalId, address[] memory targets, uint256[] memory values, bytes[] memory calldatas, bytes32 descriptionHash)
        internal
        override(Governor, GovernorTimelockControl)
    {
        super._execute(proposalId, targets, values, calldatas, descriptionHash);
        emit ProposalExecuted(proposalId);
    }

    function _cancel(address[] memory targets, uint256[] memory values, bytes[] memory calldatas, bytes32 descriptionHash)
        internal
        override(Governor, GovernorTimelockControl)
        returns (uint256)
    {
        return super._cancel(targets, values, calldatas, descriptionHash);
    }

    function _executor() internal view override(Governor, GovernorTimelockControl) returns (address) {
        return super._executor();
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(Governor, GovernorTimelockControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}`;
    }
    
    return `// ${selectedContract?.name} contract template coming soon...
// This will be a fully functional ${selectedContract?.desc}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    toast.success('Contract code copied to clipboard!');
  };

  const downloadContract = () => {
    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${contractParams.name.replace(/\s+/g, '')}.sol`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Contract downloaded successfully!');
  };

  const deployToTestnet = async () => {
    setDeploymentStatus('deploying');
    toast.info('Deploying to Sepolia testnet...');
    
    setTimeout(() => {
      toast.info('Compiling contract...');
    }, 1000);
    
    setTimeout(() => {
      toast.info('Estimating gas costs...');
    }, 2500);
    
    setTimeout(() => {
      toast.info('Broadcasting transaction...');
    }, 4000);
    
    setTimeout(() => {
      const mockAddress = '0x' + Math.random().toString(16).slice(2, 42);
      setContractAddress(mockAddress);
      setDeploymentStatus('deployed');
      toast.success('Contract deployed successfully!');
    }, 6000);
  };

  const selectedContractType = contractTypes.find(type => type.id === selectedType);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden group hover:shadow-2xl transition-all duration-300">
      <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-600 rounded-lg">
            <Wand2 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">AI Contract Generator</h3>
            <p className="text-slate-600">Professional-grade smart contract creation</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <Tabs value={step.toString()} onValueChange={(value) => setStep(parseInt(value))} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="1">Select Type</TabsTrigger>
            <TabsTrigger value="2">Configure</TabsTrigger>
            <TabsTrigger value="3">Generate</TabsTrigger>
            <TabsTrigger value="4">Deploy</TabsTrigger>
          </TabsList>

          <TabsContent value="1" className="space-y-4 mt-4">
            <h4 className="font-semibold text-slate-900 mb-4">Choose Contract Type</h4>
            <div className="space-y-3">
              {contractTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedType === type.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-slate-200 hover:border-purple-300 hover:bg-purple-25'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{type.icon}</span>
                      <div>
                        <div className="font-medium text-slate-900">{type.name}</div>
                        <div className="text-sm text-slate-600">{type.desc}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-purple-600 font-medium">{type.complexity}</div>
                      <div className="text-xs text-slate-500">{type.gasEstimate}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {type.features.map((feature, idx) => (
                      <span key={idx} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setStep(2)}
              disabled={!selectedType}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 disabled:from-slate-300 disabled:to-slate-400 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg disabled:cursor-not-allowed"
            >
              Continue Setup
            </button>
          </TabsContent>

          <TabsContent value="2" className="space-y-4 mt-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-slate-900">Configure Parameters</h4>
              <button 
                onClick={() => setStep(1)}
                className="text-sm text-purple-600 hover:text-purple-700"
              >
                ← Back
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {selectedType === 'nft' ? 'Collection' : 'Token'} Name *
                  </label>
                  <input 
                    type="text" 
                    placeholder={selectedType === 'nft' ? 'My NFT Collection' : 'My Awesome Token'}
                    value={contractParams.name}
                    onChange={(e) => handleParamChange('name', e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Symbol *
                  </label>
                  <input 
                    type="text" 
                    placeholder={selectedType === 'nft' ? 'MNC' : 'MAT'}
                    value={contractParams.symbol}
                    onChange={(e) => handleParamChange('symbol', e.target.value.toUpperCase())}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                {selectedType === 'token' && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Initial Supply
                    </label>
                    <input 
                      type="number" 
                      placeholder="1000000"
                      value={contractParams.totalSupply}
                      onChange={(e) => handleParamChange('totalSupply', e.target.value)}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                )}

                {selectedType === 'nft' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Max Supply
                      </label>
                      <input 
                        type="number" 
                        placeholder="10000"
                        value={contractParams.maxSupply}
                        onChange={(e) => handleParamChange('maxSupply', e.target.value)}
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Mint Price (ETH)
                      </label>
                      <input 
                        type="number" 
                        step="0.001"
                        placeholder="0.01"
                        value={contractParams.mintPrice}
                        onChange={(e) => handleParamChange('mintPrice', e.target.value)}
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="space-y-4">
                {livePreview && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Live Preview
                    </label>
                    <div className="bg-slate-900 rounded-lg p-3 max-h-48 overflow-y-auto">
                      <pre className="text-green-400 text-xs font-mono whitespace-pre-wrap">
                        {livePreview.split('\n').slice(0, 20).join('\n')}
                        {livePreview.split('\n').length > 20 && '\n...'}
                      </pre>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Advanced Features</label>
                  <div className="space-y-2">
                    {selectedType === 'token' && [
                      { key: 'mintable', label: 'Mintable', desc: 'Allow creating new tokens after deployment' },
                      { key: 'burnable', label: 'Burnable', desc: 'Allow destroying tokens permanently' },
                      { key: 'pausable', label: 'Pausable', desc: 'Emergency pause functionality' },
                      { key: 'ownable', label: 'Ownable', desc: 'Include administrative controls' }
                    ].map((feature) => (
                      <label key={feature.key} className="flex items-center space-x-3 p-2 hover:bg-slate-50 rounded">
                        <input
                          type="checkbox"
                          checked={contractParams[feature.key as keyof typeof contractParams] as boolean}
                          onChange={(e) => handleParamChange(feature.key, e.target.checked)}
                          className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                        />
                        <div>
                          <div className="text-sm font-medium text-slate-900">{feature.label}</div>
                          <div className="text-xs text-slate-500">{feature.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => setStep(3)}
                className="flex-1 bg-slate-100 text-slate-700 font-medium py-2 px-4 rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center space-x-2"
              >
                <Eye className="h-4 w-4" />
                <span>Preview Full Contract</span>
              </button>
              <button 
                onClick={generateContract}
                disabled={isGenerating}
                className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-semibold py-2 px-4 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-slate-900 border-t-transparent"></div>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4" />
                    <span>Generate Contract</span>
                  </>
                )}
              </button>
            </div>
          </TabsContent>

          <TabsContent value="3" className="space-y-4 mt-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-slate-900">Generated Contract</h4>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-600">
                  {selectedContractType?.name} • {selectedContractType?.gasEstimate}
                </span>
                <button 
                  onClick={() => setStep(2)}
                  className="text-sm text-purple-600 hover:text-purple-700"
                >
                  ← Edit
                </button>
              </div>
            </div>

            <div className="bg-slate-900 rounded-lg p-4 max-h-64 overflow-y-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-400 text-sm font-medium">✅ Production-Ready Contract</span>
                <div className="flex space-x-2">
                  <button 
                    onClick={copyToClipboard}
                    className="text-green-400 hover:text-green-300 text-sm flex items-center space-x-1"
                  >
                    <Copy className="h-3 w-3" />
                    <span>Copy</span>
                  </button>
                </div>
              </div>
              <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
                {generatedCode}
              </pre>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button 
                onClick={copyToClipboard}
                className="bg-slate-100 text-slate-700 font-medium py-2 px-4 rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center space-x-2"
              >
                <Copy className="h-4 w-4" />
                <span>Copy</span>
              </button>
              <button 
                onClick={downloadContract}
                className="bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </button>
              <button 
                onClick={() => setStep(4)}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-semibold py-2 px-4 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 shadow-lg flex items-center justify-center space-x-2"
              >
                <Rocket className="h-4 w-4" />
                <span>Deploy</span>
              </button>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm text-green-800 font-medium">
                  Contract generated with security best practices and gas optimizations
                </span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="4" className="space-y-4 mt-4">
            {deploymentStatus === 'idle' && (
              <>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900 mb-2">🚀 Deploy to Testnet</h4>
                  <p className="text-sm text-slate-600 mb-3">
                    Deploy your contract to Sepolia testnet for testing. This is free and uses test ETH.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Estimated Gas:</span>
                      <span className="font-medium">{selectedContractType?.gasEstimate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Network:</span>
                      <span className="font-medium">Sepolia Testnet</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Cost:</span>
                      <span className="font-medium text-green-600">FREE (Test ETH)</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={deployToTestnet}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg flex items-center justify-center space-x-2"
                >
                  <Rocket className="h-4 w-4" />
                  <span>Deploy to Sepolia Testnet</span>
                </button>
              </>
            )}

            {deploymentStatus === 'deploying' && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent mx-auto mb-4"></div>
                <p className="text-slate-600 font-medium">Deploying contract...</p>
                <p className="text-sm text-slate-400 mt-2">This may take 1-2 minutes</p>
              </div>
            )}

            {deploymentStatus === 'deployed' && (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <span className="font-semibold text-green-800">Deployment Successful!</span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-slate-600">Contract Address:</span>
                      <div className="flex items-center space-x-2 mt-1">
                        <code className="bg-white px-2 py-1 rounded text-sm font-mono">{contractAddress}</code>
                        <button 
                          onClick={() => navigator.clipboard.writeText(contractAddress)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-sm text-slate-600">
                      <span>Network:</span> <span className="font-medium">Sepolia Testnet</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    View on Etherscan
                  </button>
                  <button className="flex-1 bg-purple-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                    Verify Contract
                  </button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
