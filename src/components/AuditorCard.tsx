
import React, { useState } from 'react';
import { Upload, Shield, AlertTriangle, AlertCircle, Info, FileText, Play, Download, Eye } from 'lucide-react';
import { toast } from 'sonner';

export const AuditorCard = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [file, setFile] = useState<File | null>(null);
  const [code, setCode] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
  const vulnerabilities = {
    high: [
      { 
        line: 45, 
        issue: 'Reentrancy vulnerability in withdraw function', 
        severity: 'high',
        description: 'The withdraw function is vulnerable to reentrancy attacks. An attacker could drain the contract by calling withdraw repeatedly.',
        fix: 'Use the Checks-Effects-Interactions pattern or OpenZeppelin\'s ReentrancyGuard modifier.',
        code: 'modifier nonReentrant() { require(!locked, "No reentrancy"); locked = true; _; locked = false; }'
      },
      { 
        line: 78, 
        issue: 'Integer overflow in token calculation', 
        severity: 'high',
        description: 'Arithmetic operations can overflow, leading to unexpected behavior and potential fund loss.',
        fix: 'Use SafeMath library or Solidity 0.8+ built-in overflow protection.',
        code: 'using SafeMath for uint256;'
      }
    ],
    medium: [
      { 
        line: 23, 
        issue: 'Missing access control modifier', 
        severity: 'medium',
        description: 'Critical functions lack proper access control, allowing unauthorized users to execute admin functions.',
        fix: 'Add onlyOwner or role-based access control modifiers.',
        code: 'modifier onlyOwner() { require(msg.sender == owner, "Not owner"); _; }'
      },
      { 
        line: 67, 
        issue: 'Unchecked external call', 
        severity: 'medium',
        description: 'External calls should be checked for success to prevent silent failures.',
        fix: 'Check return values of external calls and handle failures appropriately.',
        code: 'require(token.transfer(to, amount), "Transfer failed");'
      }
    ],
    low: [
      { 
        line: 12, 
        issue: 'Gas optimization opportunity', 
        severity: 'low',
        description: 'Multiple storage reads of the same variable can be optimized by caching in memory.',
        fix: 'Cache frequently accessed storage variables in memory.',
        code: 'uint256 cachedBalance = balance; // Use cachedBalance instead'
      },
      { 
        line: 89, 
        issue: 'Event emission missing', 
        severity: 'low',
        description: 'Important state changes should emit events for better transparency and monitoring.',
        fix: 'Add event emissions for critical state changes.',
        code: 'event BalanceUpdated(address indexed user, uint256 newBalance);'
      }
    ]
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = (uploadedFile: File) => {
    if (!uploadedFile.name.endsWith('.sol')) {
      toast.error('Please upload a .sol file');
      return;
    }
    
    setFile(uploadedFile);
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setCode(content);
      toast.success('File uploaded successfully!');
    };
    reader.readAsText(uploadedFile);
  };

  const startAudit = async () => {
    if (!code.trim() && !file) {
      toast.error('Please upload a file or paste code to audit');
      return;
    }
    
    setIsAnalyzing(true);
    setActiveTab('results');
    
    // Simulate analysis process
    toast.info('Starting security analysis...');
    
    setTimeout(() => {
      toast.info('Analyzing for vulnerabilities...');
    }, 1000);
    
    setTimeout(() => {
      toast.info('Running static analysis...');
    }, 2000);
    
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      toast.success('Analysis complete! Found vulnerabilities that need attention.');
    }, 4000);
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'medium': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'low': return <Info className="h-4 w-4 text-blue-500" />;
      default: return null;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-blue-500 bg-blue-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const downloadReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      filename: file?.name || 'pasted-code',
      vulnerabilities: vulnerabilities,
      summary: {
        high: vulnerabilities.high.length,
        medium: vulnerabilities.medium.length,
        low: vulnerabilities.low.length,
        total: vulnerabilities.high.length + vulnerabilities.medium.length + vulnerabilities.low.length
      }
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-report-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Report downloaded successfully!');
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
            Results {analysisComplete && <span className="ml-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full">{vulnerabilities.high.length + vulnerabilities.medium.length + vulnerabilities.low.length}</span>}
          </button>
        </div>
        
        {activeTab === 'upload' ? (
          <div className="space-y-4">
            <div 
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
                dragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-blue-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-input')?.click()}
            >
              <input
                id="file-input"
                type="file"
                accept=".sol"
                onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
                className="hidden"
              />
              <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-600 mb-2">
                {file ? `Selected: ${file.name}` : 'Drop your Solidity file here or click to browse'}
              </p>
              <p className="text-sm text-slate-400">Supports .sol files up to 10MB</p>
            </div>
            
            <div className="text-center">
              <span className="text-slate-400">or</span>
            </div>
            
            <textarea
              placeholder="Paste your Solidity code here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-32 p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
            />
            
            <button 
              onClick={startAudit}
              disabled={isAnalyzing}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-semibold py-3 px-6 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-slate-900 border-t-transparent"></div>
                  <span>Analyzing Contract...</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  <span>Start Security Audit</span>
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {isAnalyzing ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
                <p className="text-slate-600">Analyzing your smart contract...</p>
                <p className="text-sm text-slate-400 mt-2">This may take a few moments</p>
              </div>
            ) : analysisComplete ? (
              <>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex space-x-2">
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
                  <button
                    onClick={downloadReport}
                    className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </button>
                </div>
                
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {[...vulnerabilities.high, ...vulnerabilities.medium, ...vulnerabilities.low].map((vuln, index) => (
                    <div key={index} className={`border-l-4 p-4 rounded-lg ${getSeverityColor(vuln.severity)}`}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getSeverityIcon(vuln.severity)}
                          <span className="font-medium text-slate-900">Line {vuln.line}</span>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          vuln.severity === 'high' ? 'bg-red-200 text-red-800' :
                          vuln.severity === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                          'bg-blue-200 text-blue-800'
                        }`}>
                          {vuln.severity.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-slate-900 mb-1">{vuln.issue}</p>
                      <p className="text-sm text-slate-600 mb-2">{vuln.description}</p>
                      <div className="bg-white p-2 rounded border">
                        <p className="text-xs font-medium text-green-700 mb-1">Recommended Fix:</p>
                        <p className="text-xs text-slate-600 mb-1">{vuln.fix}</p>
                        <code className="text-xs bg-gray-100 p-1 rounded block">{vuln.code}</code>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-semibold py-3 px-6 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 shadow-lg">
                    View Full Report
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg">
                    Auto-Fix Issues
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">Upload a contract to see analysis results</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
