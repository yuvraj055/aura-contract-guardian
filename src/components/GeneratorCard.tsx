
import React, { useState } from 'react';
import { Wand2, FileText, Eye, Download } from 'lucide-react';

export const GeneratorCard = () => {
  const [selectedType, setSelectedType] = useState('');
  const [step, setStep] = useState(1);
  
  const contractTypes = [
    { id: 'token', name: 'ERC-20 Token', desc: 'Standard fungible token' },
    { id: 'nft', name: 'NFT Collection', desc: 'ERC-721 non-fungible tokens' },
    { id: 'dao', name: 'DAO Governance', desc: 'Decentralized organization' },
    { id: 'marketplace', name: 'NFT Marketplace', desc: 'Buy & sell NFTs' },
    { id: 'vesting', name: 'Token Vesting', desc: 'Time-locked token release' }
  ];

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
            <div className="space-y-2">
              {contractTypes.slice(0, 3).map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedType === type.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-slate-200 hover:border-purple-300 hover:bg-purple-25'
                  }`}
                >
                  <div className="font-medium text-slate-900">{type.name}</div>
                  <div className="text-sm text-slate-600">{type.desc}</div>
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
        ) : (
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
                <label className="block text-sm font-medium text-slate-700 mb-2">Token Name</label>
                <input 
                  type="text" 
                  placeholder="My Awesome Token"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Symbol</label>
                <input 
                  type="text" 
                  placeholder="MAT"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Total Supply</label>
                <input 
                  type="number" 
                  placeholder="1000000"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="flex-1 bg-slate-100 text-slate-700 font-medium py-2 px-4 rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center space-x-2">
                <Eye className="h-4 w-4" />
                <span>Preview</span>
              </button>
              <button className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-semibold py-2 px-4 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 shadow-lg flex items-center justify-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Generate</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
