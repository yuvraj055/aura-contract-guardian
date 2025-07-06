
import React, { useState } from 'react';
import { Zap, BarChart3, TrendingDown, Gauge, Play, Upload, Settings, Target } from 'lucide-react';
import { toast } from 'sonner';

export const SimulatorCard = () => {
  const [activeTab, setActiveTab] = useState('simulate');
  const [contractCode, setContractCode] = useState('');
  const [selectedFunction, setSelectedFunction] = useState('transfer');
  const [simulationParams, setSimulationParams] = useState({
    gasPrice: '20',
    gasLimit: '100000',
    value: '0'
  });
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResults, setSimulationResults] = useState<any>(null);
  
  const gasData = {
    transfer: { current: 51000, optimized: 42000, savings: 18, cost: '₹234' },
    mint: { current: 78000, optimized: 65000, savings: 17, cost: '₹356' },
    burn: { current: 32000, optimized: 28000, savings: 12, cost: '₹145' },
    approve: { current: 46000, optimized: 39000, savings: 15, cost: '₹210' },
    transferFrom: { current: 55000, optimized: 47000, savings: 14, cost: '₹251' }
  };

  const functions = [
    { id: 'transfer', name: 'transfer()', color: 'bg-blue-500', params: ['to', 'amount'] },
    { id: 'mint', name: 'mint()', color: 'bg-green-500', params: ['to', 'amount'] },
    { id: 'burn', name: 'burn()', color: 'bg-red-500', params: ['amount'] },
    { id: 'approve', name: 'approve()', color: 'bg-purple-500', params: ['spender', 'amount'] },
    { id: 'transferFrom', name: 'transferFrom()', color: 'bg-yellow-500', params: ['from', 'to', 'amount'] }
  ];

  const scenarios = [
    { name: 'Normal Usage', multiplier: 1, desc: 'Standard transaction conditions' },
    { name: 'High Gas Price', multiplier: 2.5, desc: 'Network congestion scenario' },
    { name: 'Batch Operations', multiplier: 0.7, desc: 'Multiple operations in one tx' },
    { name: 'Flash Loan Attack', multiplier: 3, desc: 'Complex DeFi interaction' }
  ];

  const runSimulation = async () => {
    if (!contractCode.trim()) {
      toast.error('Please upload or paste contract code first');
      return;
    }

    setIsSimulating(true);
    toast.info('Running gas simulation...');

    setTimeout(() => {
      const data = gasData[selectedFunction as keyof typeof gasData];
      const scenario = scenarios[0]; // Default to normal usage
      
      setSimulationResults({
        function: selectedFunction,
        gasUsed: data.current,
        gasPrice: simulationParams.gasPrice,
        totalCost: (data.current * parseInt(simulationParams.gasPrice) / 1e9).toFixed(6),
        optimizedGas: data.optimized,
        optimizedCost: (data.optimized * parseInt(simulationParams.gasPrice) / 1e9).toFixed(6),
        savings: data.savings,
        scenario: scenario.name,
        recommendations: [
          'Use unchecked blocks for safe arithmetic operations',
          'Pack struct variables to optimize storage',
          'Cache array length in loops',
          'Use custom errors instead of revert strings'
        ]
      });
      
      setIsSimulating(false);
      setActiveTab('results');
      toast.success('Simulation completed successfully!');
    }, 3000);
  };

  const optimizeContract = () => {
    toast.info('Applying gas optimizations... (Feature coming soon)');
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden group hover:shadow-2xl transition-all duration-300">
      <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-600 rounded-lg">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Gas Simulator & Optimizer</h3>
            <p className="text-slate-600">Analyze & optimize gas consumption</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('simulate')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'simulate' 
                ? 'bg-green-600 text-white' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Simulate
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'results' 
                ? 'bg-green-600 text-white' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Results
          </button>
          <button
            onClick={() => setActiveTab('optimize')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'optimize' 
                ? 'bg-green-600 text-white' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Optimize
          </button>
        </div>

        {activeTab === 'simulate' ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Contract Code
              </label>
              <textarea
                placeholder="Paste your contract code here or upload a file..."
                value={contractCode}
                onChange={(e) => setContractCode(e.target.value)}
                className="w-full h-32 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none font-mono text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Function to Test
                </label>
                <select
                  value={selectedFunction}
                  onChange={(e) => setSelectedFunction(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {functions.map((func) => (
                    <option key={func.id} value={func.id}>
                      {func.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Gas Price (Gwei)
                </label>
                <input
                  type="number"
                  value={simulationParams.gasPrice}
                  onChange={(e) => setSimulationParams(prev => ({ ...prev, gasPrice: e.target.value }))}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Test Scenarios
              </label>
              <div className="grid grid-cols-2 gap-2">
                {scenarios.map((scenario, idx) => (
                  <button
                    key={idx}
                    className="p-3 text-left border border-slate-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
                  >
                    <div className="font-medium text-slate-900 text-sm">{scenario.name}</div>
                    <div className="text-xs text-slate-600">{scenario.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={runSimulation}
              disabled={isSimulating}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-semibold py-3 px-6 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 shadow-lg disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {isSimulating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-slate-900 border-t-transparent"></div>
                  <span>Simulating...</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  <span>Run Gas Simulation</span>
                </>
              )}
            </button>
          </div>
        ) : activeTab === 'results' ? (
          <div className="space-y-4">
            {simulationResults ? (
              <>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-slate-900">Simulation Results</h4>
                    <span className="text-sm text-slate-600">Function: {simulationResults.function}()</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded-lg">
                      <div className="text-sm text-slate-600">Current Gas Usage</div>
                      <div className="text-xl font-bold text-red-600">{simulationResults.gasUsed.toLocaleString()}</div>
                      <div className="text-sm text-slate-500">≈ {simulationResults.totalCost} ETH</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <div className="text-sm text-slate-600">Optimized Gas Usage</div>
                      <div className="text-xl font-bold text-green-600">{simulationResults.optimizedGas.toLocaleString()}</div>
                      <div className="text-sm text-slate-500">≈ {simulationResults.optimizedCost} ETH</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm text-slate-600">Potential Savings</span>
                    <span className="text-lg font-semibold text-green-600">-{simulationResults.savings}%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="font-medium text-slate-900">Optimization Recommendations</h5>
                  {simulationResults.recommendations.map((rec: string, idx: number) => (
                    <div key={idx} className="flex items-start space-x-2 p-2 bg-yellow-50 rounded">
                      <Target className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-700">{rec}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={optimizeContract}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg"
                >
                  Apply Optimizations
                </button>
              </>
            ) : (
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">Run a simulation to see results</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-slate-900">Function Analysis</h4>
              <div className="flex items-center space-x-1 text-sm text-green-600">
                <TrendingDown className="h-4 w-4" />
                <span>23% avg savings</span>
              </div>
            </div>
            
            <div className="space-y-3">
              {functions.map((func) => {
                const data = gasData[func.id as keyof typeof gasData];
                return (
                  <div key={func.id} className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${func.color}`}></div>
                        <span className="font-medium text-slate-900">{func.name}</span>
                      </div>
                      <span className="text-sm font-medium text-green-600">-{data.savings}%</span>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Current: {data.current.toLocaleString()} gas</span>
                        <span className="text-green-600">Optimized: {data.optimized.toLocaleString()} gas</span>
                      </div>
                      
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full"
                          style={{ width: `${100 - data.savings}%` }}
                        ></div>
                      </div>
                      
                      <div className="text-xs text-slate-500">
                        Est. cost: {data.cost} per transaction
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Gauge className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-slate-900">Estimated Monthly Savings</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">₹2,340</div>
              <div className="text-sm text-slate-600">Based on 1,000 transactions</div>
            </div>
            
            <button 
              onClick={optimizeContract}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-semibold py-3 px-6 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 shadow-lg"
            >
              Optimize Contract
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
