
import React, { useState } from 'react';
import { Wand2, FileText, Eye, Download, Copy, Rocket, Settings } from 'lucide-react';
import { toast } from 'sonner';

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
    ownable: true
  });
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const contractTypes = [
    { 
      id: 'token', 
      name: 'ERC-20 Token', 
      desc: 'Standard fungible token',
      icon: '🪙',
      features: ['Mintable', 'Burnable', 'Pausable', 'Ownable']
    },
    { 
      id: 'nft', 
      name: 'NFT Collection', 
      desc: 'ERC-721 non-fungible tokens',
      icon: '🖼️',
      features: ['Enumerable', 'URI Storage', 'Royalties', 'Whitelist']
    },
    { 
      id: 'dao', 
      name: 'DAO Governance', 
      desc: 'Decentralized organization',
      icon: '🏛️',
      features: ['Voting', 'Proposals', 'Treasury', 'Timelock']
    },
    { 
      id: 'marketplace', 
      name: 'NFT Marketplace', 
      desc: 'Buy & sell NFTs',
      icon: '🛒',
      features: ['Auctions', 'Fixed Price', 'Royalties', 'Escrow']
    },
    { 
      id: 'vesting', 
      name: 'Token Vesting', 
      desc: 'Time-locked token release',
      icon: '⏰',
      features: ['Linear', 'Cliff', 'Revokable', 'Multiple Recipients']
    }
  ];

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

    // Simulate contract generation
    setTimeout(() => {
      const template = getContractTemplate();
      setGeneratedCode(template);
      setIsGenerating(false);
      setStep(3);
      toast.success('Contract generated successfully!');
    }, 2000);
  };

  const getContractTemplate = () => {
    const selectedContract = contractTypes.find(type => type.id === selectedType);
    
    if (selectedType === 'token') {
      return `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
${contractParams.ownable ? 'import "@openzeppelin/contracts/access/Ownable.sol";' : ''}
${contractParams.mintable ? 'import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Mintable.sol";' : ''}
${contractParams.burnable ? 'import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";' : ''}
${contractParams.pausable ? 'import "@openzeppelin/contracts/security/Pausable.sol";' : ''}

contract ${contractParams.name.replace(/\s+/g, '')} is ERC20${contractParams.ownable ? ', Ownable' : ''}${contractParams.burnable ? ', ERC20Burnable' : ''}${contractParams.pausable ? ', Pausable' : ''} {
    
    constructor() ERC20("${contractParams.name}", "${contractParams.symbol}") {
        _mint(msg.sender, ${contractParams.totalSupply} * 10**decimals());
    }

    ${contractParams.mintable ? `
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }` : ''}

    ${contractParams.pausable ? `
    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, amount);
    }` : ''}
}`;
    }
    
    return `// Generated ${selectedContract?.name} contract would appear here...`;
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

  const deployToTestnet = () => {
    toast.info('Deploying to testnet... (Feature coming soon)');
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden group hover:shadow-2xl transition-all duration-300">
      <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-600 rounded-lg">
            <Wand2 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Custom Contract Generator</h3>
            <p className="text-slate-600">AI-powered smart contract creation</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {step === 1 ? (
          <div className="space-y-4">
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
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{type.icon}</span>
                    <div>
                      <div className="font-medium text-slate-900">{type.name}</div>
                      <div className="text-sm text-slate-600">{type.desc}</div>
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
          </div>
        ) : step === 2 ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-slate-900">Configure Parameters</h4>
              <button 
                onClick={() => setStep(1)}
                className="text-sm text-purple-600 hover:text-purple-700"
              >
                ← Back
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Token Name *
                </label>
                <input 
                  type="text" 
                  placeholder="My Awesome Token"
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
                  placeholder="MAT"
                  value={contractParams.symbol}
                  onChange={(e) => handleParamChange('symbol', e.target.value.toUpperCase())}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Total Supply
                </label>
                <input 
                  type="number" 
                  placeholder="1000000"
                  value={contractParams.totalSupply}
                  onChange={(e) => handleParamChange('totalSupply', e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Features</label>
                <div className="space-y-2">
                  {[
                    { key: 'mintable', label: 'Mintable', desc: 'Allow creating new tokens' },
                    { key: 'burnable', label: 'Burnable', desc: 'Allow destroying tokens' },
                    { key: 'pausable', label: 'Pausable', desc: 'Allow pausing transfers' },
                    { key: 'ownable', label: 'Ownable', desc: 'Include ownership controls' }
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
            
            <div className="flex space-x-2">
              <button 
                onClick={() => setStep(3)}
                className="flex-1 bg-slate-100 text-slate-700 font-medium py-2 px-4 rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center space-x-2"
              >
                <Eye className="h-4 w-4" />
                <span>Preview</span>
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
                    <span>Generate</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-slate-900">Generated Contract</h4>
              <button 
                onClick={() => setStep(2)}
                className="text-sm text-purple-600 hover:text-purple-700"
              >
                ← Edit
              </button>
            </div>

            <div className="bg-slate-900 rounded-lg p-4 max-h-64 overflow-y-auto">
              <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
                {generatedCode}
              </pre>
            </div>

            <div className="flex space-x-2">
              <button 
                onClick={copyToClipboard}
                className="flex-1 bg-slate-100 text-slate-700 font-medium py-2 px-4 rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center space-x-2"
              >
                <Copy className="h-4 w-4" />
                <span>Copy</span>
              </button>
              <button 
                onClick={downloadContract}
                className="flex-1 bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </button>
              <button 
                onClick={deployToTestnet}
                className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-semibold py-2 px-4 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 shadow-lg flex items-center justify-center space-x-2"
              >
                <Rocket className="h-4 w-4" />
                <span>Deploy</span>
              </button>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-800">
                ✅ Contract generated successfully! Review the code before deployment.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
