
import React from 'react';
import { Zap, Shield, TrendingUp } from 'lucide-react';

export const DashboardHeader = () => {
  return (
    <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Smart Contract Security Suite
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Audit, generate, and optimize your smart contracts with enterprise-grade security tools
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-3 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
            <Shield className="h-6 w-6 text-green-400" />
            <div>
              <div className="font-semibold">1,247</div>
              <div className="text-sm text-slate-300">Contracts Audited</div>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-3 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
            <Zap className="h-6 w-6 text-yellow-400" />
            <div>
              <div className="font-semibold">532</div>
              <div className="text-sm text-slate-300">Vulnerabilities Found</div>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-3 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
            <TrendingUp className="h-6 w-6 text-blue-400" />
            <div>
              <div className="font-semibold">23%</div>
              <div className="text-sm text-slate-300">Avg Gas Savings</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
