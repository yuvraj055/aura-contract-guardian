
import React, { useState } from 'react';
import { Activity, Upload, Play, Download, FileText, TrendingDown, Zap, AlertTriangle, CheckCircle, BarChart3, Clock, Target } from 'lucide-react';
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

interface SimulationResults {
  totalGasUsed: number;
  optimizedGasUsed: number;
  savingsPercent: number;
  savingsEth: number;
  savingsUsd: number;
  functions: SimulationFunction[];
  executionTime: number;
  status: 'success' | 'warning' | 'error';
}

export const SimulatorCard = () => {
  const [contractCode, setContractCode] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResults, setSimulationResults] = useState<SimulationResults | null>(null);
  const [gasPrice, setGasPrice] = useState('20');

  const simulateContract = async () => {
    if (!contractCode.trim()) {
      toast.error('Please upload or paste a contract first');
      return;
    }

    setIsSimulating(true);
    setSimulationResults(null);
    toast.info('Starting gas simulation...');

    // Simulate analysis steps
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
        executionTime: 3.7,
        status: 'success',
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
          }
        ]
      };

      setSimulationResults(mockResults);
      setIsSimulating(false);
      toast.success('Simulation completed successfully!');
    }, 4000);
  };

  const downloadReport = () => {
    if (!simulationResults) return;
    
    const reportData = JSON.stringify(simulationResults, null, 2);
    const blob = new Blob([reportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gas-report-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Report downloaded successfully!');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      {/* Input Section */}
      <div className="bg-card rounded-2xl border border-border shadow-lg">
        <div className="p-6 border-b border-border bg-gradient-to-r from-primary/5 to-warning/5">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary rounded-lg">
              <Activity className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">Gas Simulator</h3>
              <p className="text-muted-foreground text-sm">Analyze and optimize contract gas usage</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label className="relative cursor-pointer bg-secondary hover:bg-secondary/80 rounded-lg py-3 px-6 font-medium text-secondary-foreground transition-colors border border-border">
                <Upload className="h-4 w-4 inline-block mr-2" />
                <span>Upload Contract</span>
                <input 
                  type="file" 
                  className="absolute inset-0 opacity-0" 
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => setContractCode(e.target?.result as string);
                      reader.readAsText(file);
                    }
                  }}
                />
              </label>
              <span className="text-sm text-muted-foreground">or paste code below</span>
            </div>
            
            <textarea
              placeholder="// Paste your smart contract code here..."
              className="w-full h-48 p-4 bg-background rounded-lg border border-border focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-sm font-mono"
              value={contractCode}
              onChange={(e) => setContractCode(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Gas Price (Gwei)
              </label>
              <input
                type="number"
                placeholder="20"
                value={gasPrice}
                onChange={(e) => setGasPrice(e.target.value)}
                className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
              />
            </div>
            
            <button
              onClick={simulateContract}
              disabled={isSimulating || !contractCode.trim()}
              className="w-full bg-primary text-primary-foreground font-semibold py-4 px-6 rounded-xl hover:bg-primary/90 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSimulating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-foreground border-t-transparent"></div>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Play className="h-5 w-5" />
                  <span>Run Simulation</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="bg-card rounded-2xl border border-border shadow-lg">
        <div className="p-6 border-b border-border bg-gradient-to-r from-success/5 to-primary/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-success rounded-lg">
                <BarChart3 className="h-6 w-6 text-success-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Simulation Results</h3>
                <p className="text-muted-foreground text-sm">Gas optimization analysis</p>
              </div>
            </div>
            {simulationResults && (
              <button
                onClick={downloadReport}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
                title="Download Report"
              >
                <Download className="h-5 w-5 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>
        
        <div className="p-6">
          {!simulationResults && !isSimulating && (
            <div className="text-center py-12">
              <Target className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground mb-2">No simulation results yet</p>
              <p className="text-sm text-muted-foreground/70">Run a simulation to see detailed analysis</p>
            </div>
          )}

          {isSimulating && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
              <p className="text-foreground font-medium mb-2">Analyzing Contract...</p>
              <p className="text-sm text-muted-foreground">This may take a few seconds</p>
            </div>
          )}

          {simulationResults && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span className="text-sm font-medium text-success">Gas Savings</span>
                  </div>
                  <div className="text-2xl font-bold text-success">{simulationResults.savingsPercent}%</div>
                  <div className="text-xs text-success/70">${simulationResults.savingsUsd} saved</div>
                </div>
                
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium text-primary">Execution Time</span>
                  </div>
                  <div className="text-2xl font-bold text-primary">{simulationResults.executionTime}s</div>
                  <div className="text-xs text-primary/70">Analysis completed</div>
                </div>
              </div>

              {/* Gas Usage Comparison */}
              <div className="bg-secondary/50 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-3">Gas Usage Comparison</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Original Gas Usage</span>
                    <span className="font-mono text-sm">{simulationResults.totalGasUsed.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Optimized Gas Usage</span>
                    <span className="font-mono text-sm text-success">{simulationResults.optimizedGasUsed.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div 
                      className="bg-success h-2 rounded-full transition-all duration-1000" 
                      style={{ width: `${simulationResults.savingsPercent}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Function Analysis */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Function Analysis</h4>
                {simulationResults.functions.map((func, index) => (
                  <div key={index} className="bg-background border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-sm font-medium">{func.name}()</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        func.severity === 'high' ? 'bg-destructive/10 text-destructive' :
                        func.severity === 'medium' ? 'bg-warning/10 text-warning' :
                        'bg-success/10 text-success'
                      }`}>
                        {func.severity} impact
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs mb-2">
                      <div className="text-center">
                        <div className="font-mono">{func.gasUsed.toLocaleString()}</div>
                        <div className="text-muted-foreground">Current</div>
                      </div>
                      <div className="text-center">
                        <div className="font-mono text-success">{func.optimizedGas.toLocaleString()}</div>
                        <div className="text-muted-foreground">Optimized</div>
                      </div>
                      <div className="text-center">
                        <div className="font-mono text-success">{func.savings}%</div>
                        <div className="text-muted-foreground">Savings</div>
                      </div>
                    </div>
                    {func.suggestions.length > 0 && (
                      <div className="text-xs text-muted-foreground">
                        <strong>Suggestions:</strong> {func.suggestions[0]}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
