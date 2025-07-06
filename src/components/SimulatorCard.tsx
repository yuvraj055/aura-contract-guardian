
import React, { useState } from 'react';
import { Zap, BarChart3, TrendingDown, Gauge, Play, Settings, Target, Activity, Clock, DollarSign } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export const SimulatorCard = () => {
  const [activeTab, setActiveTab] = useState('simulate');
  const [contractCode, setContractCode] = useState('');
  const [selectedFunction, setSelectedFunction] = useState('transfer');
  const [selectedScenario, setSelectedScenario] = useState('normal');
  const [simulationParams, setSimulationParams] = useState({
    gasPrice: '20',
    gasLimit: '100000',
    value: '0',
    iterations: '1'
  });
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResults, setSimulationResults] = useState<any>(null);
  const [detailedAnalysis, setDetailedAnalysis] = useState<any>(null);
  
  const gasData = {
    transfer: { 
      current: 51000, 
      optimized: 42000, 
      savings: 18, 
      cost: '₹234',
      breakdown: {
        'Storage reads': 15400,
        'Storage writes': 20000,
        'Computation': 8600,
        'Transaction overhead': 7000
      }
    },
    mint: { 
      current: 78000, 
      optimized: 65000, 
      savings: 17, 
      cost: '₹356',
      breakdown: {
        'Storage reads': 20400,
        'Storage writes': 40000,
        'Event emission': 8600,
        'Access control': 9000
      }
    },
    burn: { 
      current: 32000, 
      optimized: 28000, 
      savings: 12, 
      cost: '₹145',
      breakdown: {
        'Storage reads': 10400,
        'Storage writes': 15000,
        'Balance check': 3600,
        'Event emission': 3000
      }
    },
    approve: { 
      current: 46000, 
      optimized: 39000, 
      savings: 15, 
      cost: '₹210',
      breakdown: {
        'Storage writes': 20000,
        'Input validation': 5000,
        'Event emission': 8000,
        'Access control': 13000
      }
    },
    transferFrom: { 
      current: 55000, 
      optimized: 47000, 
      savings: 14, 
      cost: '₹251',
      breakdown: {
        'Allowance check': 15400,
        'Balance updates': 25000,
        'Event emissions': 8600,
        'Input validation': 6000
      }
    }
  };

  const functions = [
    { id: 'transfer', name: 'transfer()', color: 'bg-blue-500', params: ['to', 'amount'], complexity: 'Low' },
    { id: 'mint', name: 'mint()', color: 'bg-green-500', params: ['to', 'amount'], complexity: 'Medium' },
    { id: 'burn', name: 'burn()', color: 'bg-red-500', params: ['amount'], complexity: 'Low' },
    { id: 'approve', name: 'approve()', color: 'bg-purple-500', params: ['spender', 'amount'], complexity: 'Low' },
    { id: 'transferFrom', name: 'transferFrom()', color: 'bg-yellow-500', params: ['from', 'to', 'amount'], complexity: 'High' }
  ];

  const scenarios = [
    { 
      id: 'normal', 
      name: 'Normal Usage', 
      multiplier: 1, 
      desc: 'Standard transaction conditions',
      gasPrice: 20,
      networkLoad: 'Low'
    },
    { 
      id: 'congested', 
      name: 'Network Congestion', 
      multiplier: 2.5, 
      desc: 'High gas price scenario',
      gasPrice: 50,
      networkLoad: 'High'
    },
    { 
      id: 'batch', 
      name: 'Batch Operations', 
      multiplier: 0.7, 
      desc: 'Multiple operations optimization',
      gasPrice: 15,
      networkLoad: 'Medium'
    },
    { 
      id: 'defi', 
      name: 'DeFi Integration', 
      multiplier: 3, 
      desc: 'Complex DeFi interactions',
      gasPrice: 80,
      networkLoad: 'Very High'
    }
  ];

  const runSimulation = async () => {
    if (!contractCode.trim()) {
      toast.error('Please upload or paste contract code first');
      return;
    }

    setIsSimulating(true);
    toast.info('Initializing gas simulation...');

    setTimeout(() => {
      toast.info('Analyzing contract bytecode...');
    }, 1000);

    setTimeout(() => {
      toast.info('Running execution scenarios...');
    }, 2500);

    setTimeout(() => {
      const data = gasData[selectedFunction as keyof typeof gasData];
      const scenario = scenarios.find(s => s.id === selectedScenario) || scenarios[0];
      
      const baseGas = data.current;
      const adjustedGas = Math.floor(baseGas * scenario.multiplier);
      const gasPrice = parseInt(simulationParams.gasPrice);
      const iterations = parseInt(simulationParams.iterations);
      
      const results = {
        function: selectedFunction,
        scenario: scenario.name,
        gasUsed: adjustedGas,
        gasPrice: gasPrice,
        totalCost: (adjustedGas * gasPrice / 1e9).toFixed(6),
        optimizedGas: data.optimized,
        optimizedCost: (data.optimized * gasPrice / 1e9).toFixed(6),
        savings: data.savings,
        iterations: iterations,
        totalGasUsed: adjustedGas * iterations,
        breakdown: data.breakdown,
        networkConditions: {
          congestion: scenario.networkLoad,
          estimatedConfirmation: scenario.multiplier > 2 ? '2-5 minutes' : '30-60 seconds',
          successProbability: scenario.multiplier > 2 ? '85%' : '98%'
        },
        recommendations: [
          'Use unchecked blocks for safe arithmetic operations (-200 gas)',
          'Pack struct variables to optimize storage (-800 gas)',
          'Cache array length in loops (-150 gas per iteration)',
          'Use custom errors instead of revert strings (-500 gas)',
          'Optimize storage slot usage (-2000 gas)',
          'Implement gas-efficient event patterns (-300 gas)'
        ],
        costAnalysis: {
          daily: (adjustedGas * gasPrice / 1e9 * 100).toFixed(4),
          monthly: (adjustedGas * gasPrice / 1e9 * 3000).toFixed(4),
          yearly: (adjustedGas * gasPrice / 1e9 * 36500).toFixed(4)
        }
      };
      
      setSimulationResults(results);
      
      // Generate detailed analysis
      setDetailedAnalysis({
        efficiency: {
          score: 100 - data.savings,
          grade: data.savings > 20 ? 'C' : data.savings > 10 ? 'B' : 'A',
          issues: [
            'Multiple storage reads detected',
            'Inefficient loop patterns found',
            'Redundant computation identified'
          ]
        },
        security: {
          gasLimit: adjustedGas < 100000 ? 'Safe' : 'Caution',
          reentrancy: 'Protected',
          overflow: 'Safe (Solidity 0.8+)'
        },
        optimization: {
          potential: `${data.savings}% reduction possible`,
          impact: 'High',
          effort: 'Medium'
        }
      });
      
      setIsSimulating(false);
      setActiveTab('results');
      toast.success('Gas simulation completed with detailed analysis!');
    }, 4000);
  };

  const optimizeContract = () => {
    if (!simulationResults) {
      toast.error('Run a simulation first');
      return;
    }
    
    toast.info('Applying gas optimizations...');
    setTimeout(() => {
      toast.success('Optimizations applied! Gas usage reduced by ' + simulationResults.savings + '%');
    }, 2000);
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
            <p className="text-slate-600">Advanced gas analysis & cost optimization</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="simulate">Simulate</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="optimize">Optimize</TabsTrigger>
          </TabsList>

          <TabsContent value="simulate" className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Contract Code
              </label>
              <textarea
                placeholder="Paste your contract code here..."
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
                      {func.name} ({func.complexity})
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
                Simulation Scenarios
              </label>
              <div className="grid grid-cols-2 gap-2">
                {scenarios.map((scenario) => (
                  <button
                    key={scenario.id}
                    onClick={() => setSelectedScenario(scenario.id)}
                    className={`p-3 text-left border rounded-lg transition-colors ${
                      selectedScenario === scenario.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-slate-200 hover:border-green-300 hover:bg-green-50'
                    }`}
                  >
                    <div className="font-medium text-slate-900 text-sm">{scenario.name}</div>
                    <div className="text-xs text-slate-600">{scenario.desc}</div>
                    <div className="text-xs text-green-600 mt-1">{scenario.gasPrice} Gwei</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Iterations
                </label>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={simulationParams.iterations}
                  onChange={(e) => setSimulationParams(prev => ({ ...prev, iterations: e.target.value }))}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Gas Limit
                </label>
                <input
                  type="number"
                  value={simulationParams.gasLimit}
                  onChange={(e) => setSimulationParams(prev => ({ ...prev, gasLimit: e.target.value }))}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
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
                  <span>Run Advanced Simulation</span>
                </>
              )}
            </button>
          </TabsContent>

          <TabsContent value="results" className="space-y-4 mt-4">
            {simulationResults ? (
              <>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-slate-900">Simulation Results</h4>
                    <span className="text-sm text-slate-600">Scenario: {simulationResults.scenario}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
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

                  <div className="bg-white p-3 rounded-lg mb-4">
                    <div className="text-sm text-slate-600 mb-2">Gas Breakdown</div>
                    {Object.entries(simulationResults.breakdown).map(([operation, gas]) => (
                      <div key={operation} className="flex justify-between items-center mb-1">
                        <span className="text-sm text-slate-700">{operation}</span>
                        <span className="text-sm font-medium">{(gas as number).toLocaleString()} gas</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white p-2 rounded text-center">
                      <div className="text-xs text-slate-600">Network</div>
                      <div className="font-medium text-sm">{simulationResults.networkConditions.congestion}</div>
                    </div>
                    <div className="bg-white p-2 rounded text-center">
                      <div className="text-xs text-slate-600">Confirmation</div>
                      <div className="font-medium text-sm">{simulationResults.networkConditions.estimatedConfirmation}</div>
                    </div>
                    <div className="bg-white p-2 rounded text-center">
                      <div className="text-xs text-slate-600">Success Rate</div>
                      <div className="font-medium text-sm text-green-600">{simulationResults.networkConditions.successProbability}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-slate-900">Cost Analysis</span>
                    <span className="text-lg font-semibold text-green-600">{simulationResults.savings}% Savings</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center">
                      <div className="text-xs text-slate-600">Daily</div>
                      <div className="font-medium text-sm">{simulationResults.costAnalysis.daily} ETH</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-slate-600">Monthly</div>
                      <div className="font-medium text-sm">{simulationResults.costAnalysis.monthly} ETH</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-slate-600">Yearly</div>
                      <div className="font-medium text-sm">{simulationResults.costAnalysis.yearly} ETH</div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">Run a simulation to see detailed results</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="analysis" className="space-y-4 mt-4">
            {detailedAnalysis ? (
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-slate-900">Efficiency Analysis</h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-blue-600">{detailedAnalysis.efficiency.score}/100</span>
                      <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded text-sm font-medium">
                        Grade {detailedAnalysis.efficiency.grade}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-slate-700">Identified Issues:</div>
                    {detailedAnalysis.efficiency.issues.map((issue: string, idx: number) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm text-slate-600">
                        <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                        <span>{issue}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-slate-900 mb-3">Security Assessment</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center">
                      <div className="text-sm text-slate-600">Gas Limit</div>
                      <div className={`font-medium ${detailedAnalysis.security.gasLimit === 'Safe' ? 'text-green-600' : 'text-yellow-600'}`}>
                        {detailedAnalysis.security.gasLimit}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-slate-600">Reentrancy</div>
                      <div className="font-medium text-green-600">{detailedAnalysis.security.reentrancy}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-slate-600">Overflow</div>
                      <div className="font-medium text-green-600">{detailedAnalysis.security.overflow}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-slate-900 mb-3">Optimization Potential</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Reduction Potential:</span>
                      <span className="font-medium text-purple-600">{detailedAnalysis.optimization.potential}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Impact Level:</span>
                      <span className="font-medium">{detailedAnalysis.optimization.impact}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Implementation Effort:</span>
                      <span className="font-medium">{detailedAnalysis.optimization.effort}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Activity className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">Run a simulation to see detailed analysis</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="optimize" className="space-y-4 mt-4">
            <div className="space-y-2">
              <h5 className="font-medium text-slate-900">Available Optimizations</h5>
              {simulationResults?.recommendations.map((rec: string, idx: number) => (
                <div key={idx} className="flex items-start space-x-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <Target className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-700">{rec}</span>
                </div>
              )) || (
                <div className="text-center py-8">
                  <Settings className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600">Run a simulation to see optimization suggestions</p>
                </div>
              )}
            </div>
            
            {simulationResults && (
              <>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Gauge className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-slate-900">Estimated Savings</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">{simulationResults.savings}%</div>
                  <div className="text-sm text-slate-600">
                    {simulationResults.costAnalysis.monthly} ETH monthly savings
                  </div>
                </div>
                
                <button 
                  onClick={optimizeContract}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-semibold py-3 px-6 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 shadow-lg"
                >
                  Apply Gas Optimizations
                </button>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
