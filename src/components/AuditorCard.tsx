
import React, { useState } from 'react';
import { Upload, Shield, AlertTriangle, AlertCircle, Info, FileText } from 'lucide-react';

export const AuditorCard = () => {
  const [activeTab, setActiveTab] = useState('upload');
  
  const vulnerabilities = {
    high: [
      { line: 45, issue: 'Reentrancy vulnerability in withdraw function', severity: 'high' },
      { line: 78, issue: 'Integer overflow in token calculation', severity: 'high' }
    ],
    medium: [
      { line: 23, issue: 'Missing access control modifier', severity: 'medium' },
      { line: 67, issue: 'Unchecked external call', severity: 'medium' }
    ],
    low: [
      { line: 12, issue: 'Gas optimization opportunity', severity: 'low' },
      { line: 89, issue: 'Event emission missing', severity: 'low' }
    ]
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'medium': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'low': return <Info className="h-4 w-4 text-blue-500" />;
      default: return null;
    }
  };

  return (
    <div className="lg:col-span-2 xl:col-span-1 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden group hover:shadow-2xl transition-all duration-300">
      <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Deep Smart Contract Auditor</h3>
            <p className="text-slate-600">Static & semantic vulnerability analysis</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'upload' 
                ? 'bg-blue-600 text-white' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Upload
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'results' 
                ? 'bg-blue-600 text-white' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Results
          </button>
        </div>
        
        {activeTab === 'upload' ? (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
              <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-600 mb-2">Drop your Solidity file here or click to browse</p>
              <p className="text-sm text-slate-400">Supports .sol files up to 10MB</p>
            </div>
            
            <div className="text-center">
              <span className="text-slate-400">or</span>
            </div>
            
            <textarea
              placeholder="Paste your Solidity code here..."
              className="w-full h-32 p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            
            <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-semibold py-3 px-6 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 shadow-lg">
              Start Security Audit
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex space-x-2 mb-4">
              <div className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                High: {vulnerabilities.high.length}
              </div>
              <div className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                Medium: {vulnerabilities.medium.length}
              </div>
              <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                Low: {vulnerabilities.low.length}
              </div>
            </div>
            
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {[...vulnerabilities.high, ...vulnerabilities.medium].slice(0, 3).map((vuln, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                  {getSeverityIcon(vuln.severity)}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">Line {vuln.line}</p>
                    <p className="text-sm text-slate-600">{vuln.issue}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-semibold py-3 px-6 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 shadow-lg">
              View Full Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
