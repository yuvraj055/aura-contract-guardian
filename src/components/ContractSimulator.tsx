
import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, CheckCircle, AlertTriangle, Info, Zap, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useToast } from '../hooks/use-toast';

interface SimulationStep {
  id: number;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  duration?: number;
  gasUsed?: number;
  result?: string;
}

export const ContractSimulator = () => {
  const { toast } = useToast();
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [simulationResults, setSimulationResults] = useState<any>(null);
  
  const [steps, setSteps] = useState<SimulationStep[]>([
    { id: 1, name: 'Contract Initialization', status: 'pending' },
    { id: 2, name: 'State Variable Setup', status: 'pending' },
    { id: 3, name: 'Function Execution', status: 'pending' },
    { id: 4, name: 'Event Emission', status: 'pending' },
    { id: 5, name: 'Gas Optimization', status: 'pending' },
    { id: 6, name: 'Final Validation', status: 'pending' }
  ]);

  const startSimulation = async () => {
    setIsRunning(true);
    setIsPaused(false);
    setCurrentStep(0);
    setSimulationResults(null);
    
    // Reset all steps
    setSteps(prev => prev.map(step => ({ ...step, status: 'pending' as const })));
    
    toast({
      title: "Simulation Started",
      description: "Contract simulation is now running...",
    });

    // Simulate each step
    for (let i = 0; i < steps.length; i++) {
      if (isPaused) break;
      
      setCurrentStep(i);
      setSteps(prev => prev.map((step, index) => 
        index === i ? { ...step, status: 'running' } : step
      ));

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
      
      // Simulate realistic results
      const gasUsed = Math.floor(21000 + Math.random() * 50000);
      const duration = Math.floor(100 + Math.random() * 400);
      
      setSteps(prev => prev.map((step, index) => 
        index === i ? { 
          ...step, 
          status: Math.random() > 0.9 ? 'error' : 'completed',
          gasUsed,
          duration,
          result: `Step completed successfully in ${duration}ms`
        } : step
      ));
    }

    // Generate final results
    const totalGas = steps.reduce((sum, step) => sum + (step.gasUsed || 0), 0);
    const totalTime = steps.reduce((sum, step) => sum + (step.duration || 0), 0);
    
    setSimulationResults({
      totalGasUsed: totalGas,
      totalExecutionTime: totalTime,
      successRate: 95.5,
      optimizationSuggestions: [
        'Consider using uint256 instead of uint for gas optimization',
        'Batch multiple operations to reduce transaction costs',
        'Use events for logging instead of storage variables'
      ]
    });

    setIsRunning(false);
    
    toast({
      title: "Simulation Complete",
      description: `Contract executed successfully with ${totalGas.toLocaleString()} gas used`,
    });
  };

  const pauseSimulation = () => {
    setIsPaused(true);
    setIsRunning(false);
    toast({
      title: "Simulation Paused",
      description: "You can resume or reset the simulation",
    });
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setIsPaused(false);
    setCurrentStep(0);
    setSimulationResults(null);
    setSteps(prev => prev.map(step => ({ 
      ...step, 
      status: 'pending' as const,
      duration: undefined,
      gasUsed: undefined,
      result: undefined
    })));
    
    toast({
      title: "Simulation Reset",
      description: "Ready to start a new simulation",
    });
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'running': return <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-success" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default: return <div className="w-4 h-4 border-2 border-muted rounded-full" />;
    }
  };

  const getStepBadgeColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-primary/10 text-primary border-primary/20';
      case 'completed': return 'bg-success/10 text-success border-success/20';
      case 'error': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  return (
    <Card className="border-0 shadow-xl bg-card/95 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-warning/5 border-b border-border/50">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-xl">Contract Simulator</span>
            {isRunning && (
              <Badge className="bg-primary/10 text-primary border-primary/20">
                Running...
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {!isRunning && !isPaused && (
              <Button 
                onClick={startSimulation}
                className="bg-gradient-to-r from-primary to-warning text-primary-foreground hover:opacity-90"
              >
                <Play className="h-4 w-4 mr-2" />
                Start Simulation
              </Button>
            )}
            {isRunning && (
              <Button 
                onClick={pauseSimulation}
                variant="outline"
                className="border-warning/20 text-warning hover:bg-warning/10"
              >
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </Button>
            )}
            <Button 
              onClick={resetSimulation}
              variant="outline"
              className="border-muted/20 hover:bg-muted/10"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        {/* Simulation Steps */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold text-foreground">Execution Steps</h3>
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div 
                key={step.id} 
                className={`flex items-center space-x-4 p-4 rounded-lg border transition-all duration-300 ${
                  index === currentStep && isRunning 
                    ? 'border-primary/30 bg-primary/5' 
                    : 'border-border/30 bg-background/50'
                }`}
              >
                <div className="flex-shrink-0">
                  {getStepIcon(step.status)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{step.name}</span>
                    <Badge variant="outline" className={`text-xs ${getStepBadgeColor(step.status)}`}>
                      {step.status}
                    </Badge>
                  </div>
                  {step.result && (
                    <p className="text-xs text-muted-foreground mt-1">{step.result}</p>
                  )}
                </div>
                {step.gasUsed && (
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Gas: {step.gasUsed.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Time: {step.duration}ms</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Simulation Results */}
        {simulationResults && (
          <div className="mt-6 p-6 bg-gradient-to-r from-success/5 to-primary/5 rounded-lg border border-success/20">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <CheckCircle className="h-5 w-5 text-success mr-2" />
              Simulation Results
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center p-4 bg-card/50 rounded-lg">
                <div className="text-2xl font-bold text-foreground">{simulationResults.totalGasUsed.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Gas Used</div>
              </div>
              <div className="text-center p-4 bg-card/50 rounded-lg">
                <div className="text-2xl font-bold text-foreground">{simulationResults.totalExecutionTime}ms</div>
                <div className="text-sm text-muted-foreground">Execution Time</div>
              </div>
              <div className="text-center p-4 bg-card/50 rounded-lg">
                <div className="text-2xl font-bold text-success">{simulationResults.successRate}%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>

            {simulationResults.optimizationSuggestions && (
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                  <Info className="h-4 w-4 text-info mr-2" />
                  Optimization Suggestions
                </h4>
                <ul className="space-y-1">
                  {simulationResults.optimizationSuggestions.map((suggestion: string, index: number) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start">
                      <span className="text-primary mr-2">•</span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Info Panel */}
        <div className="mt-6 p-4 bg-info/5 rounded-lg border border-info/20">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-info flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-1">How Contract Simulation Works</h4>
              <p className="text-sm text-muted-foreground">
                This simulation runs your smart contract in a safe environment, providing insights into gas usage, 
                execution time, and potential optimization opportunities without deploying to the blockchain.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
