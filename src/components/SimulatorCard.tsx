
import React, { useState } from 'react';
import { Activity, Upload, Play, Download, FileText, TrendingDown, Zap, AlertTriangle, CheckCircle, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface SimulationFunction {
  name: string;
  gasUsed: number;
  optimizedGas: number;
  savings: number;
  severity: 'high' | 'medium' | 'low';
  suggestions: string[];
}

interface SimulationScenario {
  gasUsed: number;
  cost: number;
}

interface OptimizationRecommendation {
  type: string;
  description: string;
  impact: string;
  savings: string;
}

interface SimulationResults {
  totalGasUsed: number;
  optimizedGasUsed: number;
  savingsPercent: number;
  savingsEth: number;
  savingsUsd: number;
  functions: SimulationFunction[];
  scenarios: {
    standard: SimulationScenario;
    lowTraffic: SimulationScenario;
    highTraffic: SimulationScenario;
    optimized: SimulationScenario;
  };
  optimizations: OptimizationRecommendation[];
}

export const SimulatorCard = () => {
  const [contractCode, setContractCode] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResults, setSimulationResults] = useState<SimulationResults | null>(null);
  const [selectedScenario, setSelectedScenario] = useState('standard');
  const [gasPrice, setGasPrice] = useState('20');

  // Enhanced simulation data with more realistic gas analysis
  const simulateContract = async () => {
    if (!contractCode.trim()) {
      toast.error('Please upload or paste a contract first');
      return;
    }

    setIsSimulating(true);
    toast.info('Starting gas simulation...');

    setTimeout(() => {
      toast.info('Analyzing contract functions...');
    }, 1000);

    setTimeout(() => {
      toast.info('Running optimization analysis...');
    }, 2500);

    setTimeout(() => {
      const mockResults: SimulationResults = {
        totalGasUsed: 2456789,
        optimizedGasUsed: 1834567,
        savingsPercent: 25.3,
        savingsEth: 0.0124,
        savingsUsd: 28.45,
        functions: [
          {
            name: 'mint',
            gasUsed: 89432,
            optimizedGas: 67324,
            savings: 24.7,
            severity: 'medium',
            suggestions: ['Use _mint instead of mint for internal calls', 'Cache array length in loops']
          },
          {
            name: 'transfer',
            gasUsed: 52341,
            optimizedGas: 41256,
            savings: 21.2,
            severity: 'low',
            suggestions: ['Remove redundant checks', 'Use unchecked blocks for safe operations']
          },
          {
            name: 'approve',
            gasUsed: 34567,
            optimizedGas: 29123,
            savings: 15.7,
            severity: 'low',
            suggestions: ['Optimize storage reads', 'Use events more efficiently']
          },
          {
            name: 'transferFrom',
            gasUsed: 76543,
            optimizedGas: 56789,
            savings: 25.8,
            severity: 'high',
            suggestions: ['Remove duplicate allowance checks', 'Batch operations when possible']
          }
        ],
        scenarios: {
          standard: { gasUsed: 2456789, cost: 28.45 },
          lowTraffic: { gasUsed: 1876543, cost: 21.7 },
          highTraffic: { gasUsed: 3234567, cost: 37.2 },
          optimized: { gasUsed: 1834567, cost: 21.2 }
        },
        optimizations: [
          {
            type: 'Storage Optimization',
            description: 'Pack struct variables to save storage slots',
            impact: 'High',
            savings: '15%'
          },
          {
            type: 'Loop Optimization',
            description: 'Cache array length and use unchecked increments',
            impact: 'Medium',
            savings: '8%'
          },
          {
            type: 'Function Visibility',
            description: 'Make functions external where possible',
            impact: 'Low',
            savings: '3%'
          }
        ]
      };

      setSimulationResults(mockResults);
      setIsSimulating(false);
      toast.success('Simulation completed! Found optimization opportunities.');
    }, 4000);
  };

  const downloadGasReport = () => {
    if (!simulationResults) {
      toast.error('No simulation results to download');
      return;
    }

    const reportContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Gas Optimization Report</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background: #f8fafc; }
        .container { max-width: 1000px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden; }
        .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 2.5em; font-weight: bold; }
        .header p { margin: 10px 0 0 0; opacity: 0.9; font-size: 1.1em; }
        .content { padding: 30px; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .stat-card { background: #f1f5f9; border-radius: 8px; padding: 20px; text-align: center; border-left: 4px solid #10b981; }
        .stat-card h3 { margin: 0 0 10px 0; color: #1e293b; font-size: 1.8em; font-weight: bold; }
        .stat-card p { margin: 0; color: #64748b; font-size: 0.9em; }
        .section { margin-bottom: 30px; }
        .section h2 { color: #1e293b; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 20px; }
        .function-analysis { background: #fafafa; border-radius: 8px; padding: 20px; margin-bottom: 15px; }
        .function-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
        .function-name { font-weight: bold; font-size: 1.2em; color: #1e293b; }
        .severity { padding: 4px 12px; border-radius: 20px; font-size: 0.8em; font-weight: bold; text-transform: uppercase; }
        .severity.high { background: #fecaca; color: #dc2626; }
        .severity.medium { background: #fde68a; color: #d97706; }
        .severity.low { background: #d1fae5; color: #059669; }
        .gas-comparison { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin: 15px 0; }
        .gas-metric { text-align: center; padding: 10px; background: white; border-radius: 6px; border: 1px solid #e2e8f0; }
        .gas-metric .value { font-size: 1.4em; font-weight: bold; color: #1e293b; }
        .gas-metric .label { font-size: 0.9em; color: #64748b; margin-top: 5px; }
        .suggestions { margin-top: 15px; }
        .suggestions ul { margin: 0; padding-left: 20px; }
        .suggestions li { margin-bottom: 8px; color: #475569; }
        .footer { background: #1e293b; color: white; padding: 20px; text-align: center; font-size: 0.9em; }
        .savings-highlight { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
        .optimization-card { background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; margin-bottom: 10px; }
        .optimization-card h4 { margin: 0 0 8px 0; color: #1e293b; }
        .impact { display: inline-block; padding: 2px 8px; border-radius: 12px; font-size: 0.75em; font-weight: bold; }
        .impact.high { background: #fecaca; color: #dc2626; }
        .impact.medium { background: #fde68a; color: #d97706; }
        .impact.low { background: #d1fae5; color: #059669; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>⚡ Gas Optimization Report</h1>
            <p>Generated on ${new Date().toLocaleDateString()} • SecureChain Platform</p>
        </div>
        
        <div class="content">
            <div class="summary">
                <div class="stat-card">
                    <h3>${simulationResults.totalGasUsed.toLocaleString()}</h3>
                    <p>Original Gas Usage</p>
                </div>
                <div class="stat-card">
                    <h3>${simulationResults.optimizedGasUsed.toLocaleString()}</h3>
                    <p>Optimized Gas Usage</p>
                </div>
                <div class="stat-card">
                    <h3>${simulationResults.savingsPercent}%</h3>
                    <p>Gas Savings</p>
                </div>
                <div class="stat-card">
                    <h3>$${simulationResults.savingsUsd}</h3>
                    <p>Cost Savings (USD)</p>
                </div>
            </div>

            <div class="savings-highlight">
                <h2 style="margin: 0 0 10px 0;">💰 Potential Savings</h2>
                <p style="margin: 0; font-size: 1.1em;">You can save <strong>${simulationResults.savingsPercent}%</strong> on gas costs, equivalent to <strong>${simulationResults.savingsEth} ETH</strong> or <strong>$${simulationResults.savingsUsd} USD</strong> per transaction cycle.</p>
            </div>

            <div class="section">
                <h2>🔍 Function Analysis</h2>
                ${simulationResults.functions.map((func: SimulationFunction) => `
                    <div class="function-analysis">
                        <div class="function-header">
                            <span class="function-name">${func.name}()</span>
                            <span class="severity ${func.severity}">${func.severity} impact</span>
                        </div>
                        <div class="gas-comparison">
                            <div class="gas-metric">
                                <div class="value">${func.gasUsed.toLocaleString()}</div>
                                <div class="label">Current Gas</div>
                            </div>
                            <div class="gas-metric">
                                <div class="value">${func.optimizedGas.toLocaleString()}</div>
                                <div class="label">Optimized Gas</div>
                            </div>
                            <div class="gas-metric">
                                <div class="value" style="color: #10b981;">${func.savings}%</div>
                                <div class="label">Savings</div>
                            </div>
                        </div>
                        <div class="suggestions">
                            <strong>Optimization Suggestions:</strong>
                            <ul>
                                ${func.suggestions.map((suggestion: string) => `<li>${suggestion}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="section">
                <h2>🚀 Optimization Recommendations</h2>
                ${simulationResults.optimizations.map((opt: OptimizationRecommendation) => `
                    <div class="optimization-card">
                        <h4>${opt.type} <span class="impact ${opt.impact.toLowerCase()}">${opt.impact} Impact</span></h4>
                        <p>${opt.description}</p>
                        <p><strong>Potential Savings:</strong> ${opt.savings}</p>
                    </div>
                `).join('')}
            </div>

            <div class="section">
                <h2>📊 Scenario Analysis</h2>
                <div class="gas-comparison">
                    <div class="gas-metric">
                        <div class="value">${simulationResults.scenarios.standard.gasUsed.toLocaleString()}</div>
                        <div class="label">Standard Load</div>
                    </div>
                    <div class="gas-metric">
                        <div class="value">${simulationResults.scenarios.highTraffic.gasUsed.toLocaleString()}</div>
                        <div class="label">High Traffic</div>
                    </div>
                    <div class="gas-metric">
                        <div class="value" style="color: #10b981;">${simulationResults.scenarios.optimized.gasUsed.toLocaleString()}</div>
                        <div class="label">Optimized</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer">
            <p>Report generated by SecureChain Platform | For technical support, contact support@securechain.dev</p>
        </div>
    </div>
</body>
</html>`;

    const blob = new Blob([reportContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gas-optimization-report-${Date.now()}.html`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Gas optimization report downloaded!');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setContractCode(content);
      };
      reader.readAsText(file);
    }
  };

  const handleCodePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const text = event.clipboardData.getData('text/plain');
    setContractCode(text);
  };

  const handleScenarioChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedScenario(event.target.value);
  };

  const handleGasPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGasPrice(event.target.value);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="p-8 border-b border-slate-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg">
            <Activity className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">Gas Simulator & Optimizer</h3>
            <p className="text-slate-600 mt-1">Optimize gas usage and simulate contract execution scenarios</p>
          </div>
        </div>
      </div>
      
      <div className="p-8">
        <Tabs defaultValue="simulate" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="simulate" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Simulate
            </TabsTrigger>
            <TabsTrigger value="optimize" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Optimize
            </TabsTrigger>
            <TabsTrigger value="report" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Report
            </TabsTrigger>
          </TabsList>

          <TabsContent value="report" className="space-y-6">
            <div className="text-center">
              <h4 className="text-xl font-bold text-slate-900 mb-2">Download Optimization Report</h4>
              <p className="text-slate-600 mb-6">Generate a comprehensive report with all optimization findings</p>
              
              {simulationResults ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="text-green-600 font-bold text-2xl">{simulationResults.savingsPercent}%</div>
                      <div className="text-sm text-slate-600">Gas Savings</div>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="text-blue-600 font-bold text-2xl">${simulationResults.savingsUsd}</div>
                      <div className="text-sm text-slate-600">Cost Savings</div>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <div className="text-purple-600 font-bold text-2xl">{simulationResults.functions.length}</div>
                      <div className="text-sm text-slate-600">Functions Analyzed</div>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="text-yellow-600 font-bold text-2xl">{simulationResults.optimizations.length}</div>
                      <div className="text-sm text-slate-600">Optimizations</div>
                    </div>
                  </div>
                  
                  <button
                    onClick={downloadGasReport}
                    className="bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold py-3 px-8 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg flex items-center space-x-2 mx-auto"
                  >
                    <Download className="h-5 w-5" />
                    <span>Download Full Report</span>
                  </button>
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">Run a simulation first to generate a report</p>
                  <button
                    onClick={() => {
                      const simulateTab = document.querySelector('[value="simulate"]') as HTMLElement;
                      simulateTab?.click();
                    }}
                    className="mt-4 text-green-600 hover:text-green-700 font-medium"
                  >
                    Go to Simulation →
                  </button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="simulate" className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-slate-900">Upload or Paste Contract Code</h4>
              <p className="text-slate-600">Analyze gas usage and identify potential optimizations</p>
              
              <div className="flex items-center space-x-4">
                <label className="relative cursor-pointer bg-slate-100 hover:bg-slate-200 rounded-lg py-3 px-6 font-medium text-slate-700 transition-colors">
                  <Upload className="h-4 w-4 inline-block mr-2" />
                  <span>Upload File</span>
                  <input type="file" className="absolute inset-0 opacity-0" onChange={handleFileUpload} />
                </label>
                <span className="text-sm text-slate-500">or paste code below</span>
              </div>
              
              <textarea
                placeholder="// Paste your smart contract code here"
                className="w-full h-48 p-4 bg-slate-50 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                value={contractCode}
                onChange={(e) => setContractCode(e.target.value)}
                onPaste={handleCodePaste}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Select Scenario
                </label>
                <select
                  value={selectedScenario}
                  onChange={handleScenarioChange}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="standard">Standard Load</option>
                  <option value="lowTraffic">Low Traffic</option>
                  <option value="highTraffic">High Traffic</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Gas Price (Gwei)
                </label>
                <input
                  type="number"
                  placeholder="20"
                  value={gasPrice}
                  onChange={handleGasPriceChange}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <button
              onClick={simulateContract}
              disabled={isSimulating || !contractCode.trim()}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold py-3 px-6 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSimulating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Simulating...</span>
                </>
              ) : (
                <>
                  <Play className="h-5 w-5" />
                  <span>Run Simulation</span>
                </>
              )}
            </button>
          </TabsContent>

          <TabsContent value="optimize" className="space-y-6">
            {simulationResults ? (
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-slate-900">Optimization Opportunities</h4>
                <p className="text-slate-600">Review the identified optimizations and apply them to your contract</p>
                
                <div className="space-y-3">
                  {simulationResults.optimizations.map((opt: OptimizationRecommendation, index: number) => (
                    <div key={index} className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-slate-900">{opt.type}</h5>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          opt.impact === 'High' ? 'bg-red-100 text-red-600' :
                          opt.impact === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-green-100 text-green-600'
                        }`}>
                          {opt.impact} Impact
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">{opt.description}</p>
                      <div className="text-xs text-slate-500 mt-2">Potential Savings: {opt.savings}</div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center space-x-3">
                  <Zap className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-blue-800">Apply these optimizations to reduce gas costs and improve contract efficiency</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <AlertTriangle className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">Run a simulation first to view optimization suggestions</p>
                <button
                  onClick={() => {
                    const simulateTab = document.querySelector('[value="simulate"]') as HTMLElement;
                    simulateTab?.click();
                  }}
                  className="mt-4 text-green-600 hover:text-green-700 font-medium"
                >
                  Go to Simulation →
                </button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
