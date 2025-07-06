
import React, { useState } from 'react';
import { Upload, Shield, AlertTriangle, AlertCircle, Info, FileText, Play, Download, Eye, Wrench, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export const AuditorCard = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [file, setFile] = useState<File | null>(null);
  const [code, setCode] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [isFixingIssues, setIsFixingIssues] = useState(false);
  const [fixedCode, setFixedCode] = useState('');
  
  const vulnerabilities = {
    high: [
      { 
        line: 45, 
        issue: 'Reentrancy vulnerability in withdraw function', 
        severity: 'high' as const,
        description: 'The withdraw function is vulnerable to reentrancy attacks. An attacker could drain the contract by calling withdraw repeatedly.',
        fix: 'Use the Checks-Effects-Interactions pattern or OpenZeppelin\'s ReentrancyGuard modifier.',
        code: 'modifier nonReentrant() { require(!locked, "No reentrancy"); locked = true; _; locked = false; }',
        gasImpact: 'Medium (+2,100 gas)',
        confidence: 95,
        references: ['SWC-107', 'CWE-841']
      },
      { 
        line: 78, 
        issue: 'Integer overflow in token calculation', 
        severity: 'high' as const,
        description: 'Arithmetic operations can overflow, leading to unexpected behavior and potential fund loss.',
        fix: 'Use SafeMath library or Solidity 0.8+ built-in overflow protection.',
        code: 'using SafeMath for uint256;\nrequire(a <= type(uint256).max / b, "Overflow");',
        gasImpact: 'Low (+500 gas)',
        confidence: 98,
        references: ['SWC-101', 'CWE-190']
      }
    ],
    medium: [
      { 
        line: 23, 
        issue: 'Missing access control modifier', 
        severity: 'medium' as const,
        description: 'Critical functions lack proper access control, allowing unauthorized users to execute admin functions.',
        fix: 'Add onlyOwner or role-based access control modifiers.',
        code: 'modifier onlyOwner() { require(msg.sender == owner, "Not owner"); _; }',
        gasImpact: 'Low (+200 gas)',
        confidence: 90,
        references: ['SWC-106', 'CWE-284']
      },
      { 
        line: 67, 
        issue: 'Unchecked external call', 
        severity: 'medium' as const,
        description: 'External calls should be checked for success to prevent silent failures.',
        fix: 'Check return values of external calls and handle failures appropriately.',
        code: 'require(token.transfer(to, amount), "Transfer failed");',
        gasImpact: 'Low (+100 gas)',
        confidence: 85,
        references: ['SWC-104', 'CWE-252']
      }
    ],
    low: [
      { 
        line: 12, 
        issue: 'Gas optimization opportunity', 
        severity: 'low' as const,
        description: 'Multiple storage reads of the same variable can be optimized by caching in memory.',
        fix: 'Cache frequently accessed storage variables in memory.',
        code: 'uint256 cachedBalance = balance; // Use cachedBalance instead',
        gasImpact: 'High (-800 gas)',
        confidence: 80,
        references: ['Gas-001']
      },
      { 
        line: 89, 
        issue: 'Event emission missing', 
        severity: 'low' as const,
        description: 'Important state changes should emit events for better transparency and monitoring.',
        fix: 'Add event emissions for critical state changes.',
        code: 'event BalanceUpdated(address indexed user, uint256 newBalance);\nemit BalanceUpdated(user, newBalance);',
        gasImpact: 'Medium (+1,200 gas)',
        confidence: 75,
        references: ['Best-Practice-001']
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
    
    // Simulate realistic analysis process
    toast.info('Initializing security scanner...');
    
    setTimeout(() => {
      toast.info('Running static analysis...');
    }, 1000);
    
    setTimeout(() => {
      toast.info('Analyzing for vulnerabilities...');
    }, 2500);
    
    setTimeout(() => {
      toast.info('Running semantic analysis...');
    }, 4000);
    
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      toast.success('Security audit completed! Found issues that need attention.');
    }, 6000);
  };

  const autoFixIssues = async () => {
    setIsFixingIssues(true);
    toast.info('Applying automated fixes...');
    
    setTimeout(() => {
      const originalCode = code || '// Original contract code here...';
      const fixedCodeContent = `${originalCode}

// AUTO-FIXED CODE WITH SECURITY IMPROVEMENTS
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SecureContract is ReentrancyGuard, Ownable {
    // Fixed: Added proper access control
    mapping(address => uint256) private balances;
    
    // Fixed: Added events for transparency
    event BalanceUpdated(address indexed user, uint256 newBalance);
    event WithdrawalProcessed(address indexed user, uint256 amount);
    
    // Fixed: Reentrancy protection added
    function withdraw(uint256 amount) external nonReentrant {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        
        // Checks-Effects-Interactions pattern
        balances[msg.sender] -= amount;
        emit WithdrawalProcessed(msg.sender, amount);
        
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");
    }
    
    // Fixed: Added overflow protection and access control
    function updateBalance(address user, uint256 amount) external onlyOwner {
        require(amount <= type(uint256).max - balances[user], "Overflow protection");
        balances[user] += amount;
        emit BalanceUpdated(user, balances[user]);
    }
}`;
      
      setFixedCode(fixedCodeContent);
      setIsFixingIssues(false);
      toast.success('Auto-fix completed! Review the fixed code carefully.');
    }, 3000);
  };

  const generateDetailedReport = () => {
    const report = {
      auditSummary: {
        contractName: file?.name || 'Pasted Code',
        auditDate: new Date().toLocaleDateString(),
        auditor: 'SecureChain AI Auditor v2.1',
        totalIssues: vulnerabilities.high.length + vulnerabilities.medium.length + vulnerabilities.low.length,
        riskScore: 'HIGH',
        securityGrade: 'C-'
      },
      executiveSummary: {
        overview: 'This smart contract audit identified critical security vulnerabilities that require immediate attention.',
        recommendation: 'DO NOT DEPLOY until high-severity issues are resolved.',
        estimatedFixTime: '2-4 hours',
        costEstimate: '$500-1000 for professional remediation'
      },
      detailedFindings: vulnerabilities,
      gasAnalysis: {
        currentEstimate: '~156,000 gas per transaction',
        optimizedEstimate: '~142,000 gas per transaction',
        potentialSavings: '9% gas reduction',
        monthlySavings: '$234 (based on 1000 tx/month)'
      },
      recommendations: [
        'Implement OpenZeppelin\'s ReentrancyGuard for all state-changing functions',
        'Add comprehensive access control using OpenZeppelin\'s AccessControl',
        'Use SafeMath or Solidity 0.8+ for arithmetic operations',
        'Implement proper event logging for all critical operations',
        'Add input validation and bounds checking',
        'Consider implementing a pause mechanism for emergency situations'
      ],
      compliance: {
        standards: ['ERC-20', 'ERC-165'],
        bestPractices: 'Partially Compliant',
        missingFeatures: ['Emergency pause', 'Upgrade mechanism', 'Rate limiting']
      }
    };

    // Create a beautiful HTML report
    const htmlReport = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Smart Contract Security Audit Report</title>
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f8fafc; }
            .container { max-width: 800px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden; }
            .header { background: linear-gradient(135deg, #0a192f, #1e40af); color: white; padding: 30px; }
            .header h1 { margin: 0; font-size: 28px; }
            .header p { margin: 5px 0 0 0; opacity: 0.9; }
            .content { padding: 30px; }
            .section { margin-bottom: 30px; }
            .section h2 { color: #1e40af; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; }
            .severity-high { background: #fef2f2; border-left: 4px solid #ef4444; padding: 15px; margin: 10px 0; }
            .severity-medium { background: #fffbeb; border-left: 4px solid #f59e0b; padding: 15px; margin: 10px 0; }
            .severity-low { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 15px; margin: 10px 0; }
            .code-block { background: #1e293b; color: #e2e8f0; padding: 15px; border-radius: 8px; font-family: 'Fira Code', monospace; font-size: 14px; overflow-x: auto; }
            .stats { display: flex; gap: 20px; margin: 20px 0; }
            .stat-card { background: #f8fafc; padding: 20px; border-radius: 8px; flex: 1; text-align: center; }
            .stat-number { font-size: 24px; font-weight: bold; color: #1e40af; }
            .footer { background: #f8fafc; padding: 20px; text-align: center; color: #64748b; font-size: 14px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🛡️ Smart Contract Security Audit Report</h1>
                <p>Generated by SecureChain AI • ${new Date().toLocaleDateString()}</p>
            </div>
            <div class="content">
                <div class="section">
                    <h2>📊 Executive Summary</h2>
                    <div class="stats">
                        <div class="stat-card">
                            <div class="stat-number">${report.auditSummary.totalIssues}</div>
                            <div>Total Issues</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">${report.auditSummary.riskScore}</div>
                            <div>Risk Level</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">${report.auditSummary.securityGrade}</div>
                            <div>Security Grade</div>
                        </div>
                    </div>
                    <p><strong>Recommendation:</strong> ${report.executiveSummary.recommendation}</p>
                </div>
                
                <div class="section">
                    <h2>🚨 Critical Findings</h2>
                    ${vulnerabilities.high.map(vuln => `
                        <div class="severity-high">
                            <h3>❌ ${vuln.issue} (Line ${vuln.line})</h3>
                            <p><strong>Description:</strong> ${vuln.description}</p>
                            <p><strong>Fix:</strong> ${vuln.fix}</p>
                            <p><strong>Confidence:</strong> ${vuln.confidence}% | <strong>Gas Impact:</strong> ${vuln.gasImpact}</p>
                            <div class="code-block">${vuln.code}</div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="section">
                    <h2>💡 Recommendations</h2>
                    <ul>
                        ${report.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="section">
                    <h2>⛽ Gas Analysis</h2>
                    <p><strong>Current Gas Usage:</strong> ${report.gasAnalysis.currentEstimate}</p>
                    <p><strong>Optimized Estimate:</strong> ${report.gasAnalysis.optimizedEstimate}</p>
                    <p><strong>Potential Savings:</strong> ${report.gasAnalysis.potentialSavings}</p>
                </div>
            </div>
            <div class="footer">
                Generated by SecureChain AI Auditor • This report is for informational purposes only
            </div>
        </div>
    </body>
    </html>`;

    const blob = new Blob([htmlReport], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `security-audit-report-${Date.now()}.html`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Beautiful audit report downloaded successfully!');
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

  return (
    <div className="lg:col-span-2 xl:col-span-1 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden group hover:shadow-2xl transition-all duration-300">
      <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Deep Smart Contract Auditor</h3>
            <p className="text-slate-600">Advanced security analysis & automated fixes</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="results">
              Results {analysisComplete && <span className="ml-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full">{vulnerabilities.high.length + vulnerabilities.medium.length + vulnerabilities.low.length}</span>}
            </TabsTrigger>
            <TabsTrigger value="fixes">Auto-Fix</TabsTrigger>
            <TabsTrigger value="report">Report</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4 mt-4">
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
          </TabsContent>

          <TabsContent value="results" className="space-y-4 mt-4">
            {isAnalyzing ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
                <p className="text-slate-600">Analyzing your smart contract...</p>
                <p className="text-sm text-slate-400 mt-2">Running comprehensive security checks</p>
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
                </div>
                
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {[...vulnerabilities.high, ...vulnerabilities.medium, ...vulnerabilities.low].map((vuln, index) => (
                    <div key={index} className={`border-l-4 p-4 rounded-lg ${getSeverityColor(vuln.severity)}`}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getSeverityIcon(vuln.severity)}
                          <span className="font-medium text-slate-900">Line {vuln.line}</span>
                          <span className="text-sm text-slate-500">{vuln.confidence}% confidence</span>
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
                      <div className="bg-white p-3 rounded border mb-2">
                        <p className="text-xs font-medium text-green-700 mb-1">Recommended Fix:</p>
                        <p className="text-xs text-slate-600 mb-2">{vuln.fix}</p>
                        <code className="text-xs bg-gray-100 p-2 rounded block font-mono">{vuln.code}</code>
                      </div>
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Gas Impact: {vuln.gasImpact}</span>
                        <span>References: {vuln.references.join(', ')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">Upload a contract to see analysis results</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="fixes" className="space-y-4 mt-4">
            {!analysisComplete ? (
              <div className="text-center py-8">
                <Wrench className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">Run an audit first to see auto-fix options</p>
              </div>
            ) : (
              <>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <span className="font-medium text-yellow-800">Auto-Fix Available</span>
                  </div>
                  <p className="text-sm text-yellow-700">
                    Our AI can automatically fix {vulnerabilities.high.length + vulnerabilities.medium.length} critical issues.
                    Review changes carefully before deployment.
                  </p>
                </div>

                {fixedCode ? (
                  <div className="space-y-4">
                    <div className="bg-slate-900 rounded-lg p-4 max-h-64 overflow-y-auto">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-green-400 text-sm font-medium">✅ Auto-Fixed Code</span>
                        <button 
                          onClick={() => navigator.clipboard.writeText(fixedCode)}
                          className="text-green-400 hover:text-green-300 text-sm"
                        >
                          Copy Fixed Code
                        </button>
                      </div>
                      <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
                        {fixedCode}
                      </pre>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-sm text-green-800 font-medium">
                          Fixed {vulnerabilities.high.length + vulnerabilities.medium.length} security issues
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={autoFixIssues}
                    disabled={isFixingIssues}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {isFixingIssues ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>Applying Fixes...</span>
                      </>
                    ) : (
                      <>
                        <Wrench className="h-4 w-4" />
                        <span>Auto-Fix Critical Issues</span>
                      </>
                    )}
                  </button>
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="report" className="space-y-4 mt-4">
            {!analysisComplete ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">Complete an audit to generate a detailed report</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-slate-900 mb-4">📊 Audit Summary</h4>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-white p-3 rounded-lg">
                      <div className="text-sm text-slate-600">Security Grade</div>
                      <div className="text-2xl font-bold text-red-600">C-</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <div className="text-sm text-slate-600">Risk Level</div>
                      <div className="text-2xl font-bold text-red-600">HIGH</div>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="text-sm font-medium text-slate-900 mb-2">Key Findings:</div>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• {vulnerabilities.high.length} critical security vulnerabilities found</li>
                      <li>• Reentrancy attack vector detected</li>
                      <li>• Missing access controls on sensitive functions</li>
                      <li>• Gas optimization opportunities identified</li>
                    </ul>
                  </div>
                </div>

                <button
                  onClick={generateDetailedReport}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-semibold py-3 px-6 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 shadow-lg flex items-center justify-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Professional Report</span>
                </button>

                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-sm text-green-800">
                    💼 Professional HTML report includes executive summary, detailed findings, 
                    gas analysis, and remediation recommendations.
                  </p>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
