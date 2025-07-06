
import React, { useState } from 'react';
import { Zap, BarChart3, TrendingDown, Gauge } from 'lucide-react';

export const SimulatorCard = () => {
  const [activeFunction, setActiveFunction] = useState('transfer');
  
  const gasData = {
    transfer: { current: 51000, optimized: 42000, savings: 18 },
    mint: { current: 78000, optimized: 65000, savings: 17 },
    burn: { current: 32000, optimized: 28000, savings: 12 }
  };

  const functions = [
    { id: 'transfer', name: 'transfer()', color: 'bg-blue-500' },
    { id: 'mint', name: 'mint()', color: 'bg-green-500' },
    { id: 'burn', name: 'burn()', color: 'bg-red-500' }
  ];

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
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Gauge className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-slate-900">Estimated Savings</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">₹2,340 / month</div>
            <div className="text-sm text-slate-600">Based on 1,000 transactions</div>
          </div>
          
          <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-semibold py-3 px-6 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 shadow-lg">
            Optimize Contract
          </button>
        </div>
      </div>
    </div>
  );
};
