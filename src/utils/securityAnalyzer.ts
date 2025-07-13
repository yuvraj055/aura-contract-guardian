
export interface SecurityVulnerability {
  line: number;
  issue: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  fix: string;
  code: string;
  gasImpact: string;
  confidence: number;
  references: string[];
  category: string;
}

export interface SecurityAnalysisResult {
  vulnerabilities: SecurityVulnerability[];
  securityScore: number;
  riskLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  gasOptimizations: Array<{
    line: number;
    issue: string;
    savings: string;
    fix: string;
  }>;
  bestPractices: Array<{
    category: string;
    status: 'passed' | 'failed' | 'warning';
    description: string;
  }>;
}

export class SmartContractAnalyzer {
  private vulnerabilityPatterns = [
    // Reentrancy patterns
    {
      pattern: /\.call\{value:\s*\w+\}|\.transfer\(|\.send\(/gi,
      check: (code: string, match: RegExpMatchArray) => {
        const lines = code.split('\n');
        const lineIndex = code.substring(0, match.index).split('\n').length - 1;
        const line = lines[lineIndex];
        
        // Check if state changes happen after external call
        const afterCall = lines.slice(lineIndex + 1, lineIndex + 10).join('\n');
        const hasStateChange = /balances\[|state\s*=|_\w+\s*=/.test(afterCall);
        
        if (hasStateChange) {
          return {
            line: lineIndex + 1,
            issue: 'Reentrancy vulnerability detected',
            severity: 'critical' as const,
            description: 'External call followed by state changes can lead to reentrancy attacks',
            fix: 'Use Checks-Effects-Interactions pattern or ReentrancyGuard modifier',
            code: 'modifier nonReentrant() { require(!locked); locked = true; _; locked = false; }',
            gasImpact: 'Medium (+2,100 gas)',
            confidence: 95,
            references: ['SWC-107', 'CWE-841'],
            category: 'Reentrancy'
          };
        }
        return null;
      }
    },
    
    // Integer overflow/underflow
    {
      pattern: /\+\+|\-\-|\+\s*=|\-\s*=|\*\s*=|\/\s*=/gi,
      check: (code: string, match: RegExpMatchArray) => {
        const lines = code.split('\n');
        const lineIndex = code.substring(0, match.index).split('\n').length - 1;
        
        // Check if SafeMath is used or Solidity version is < 0.8.0
        const hasSafeMath = /using SafeMath|pragma solidity \^0\.[8-9]/.test(code);
        
        if (!hasSafeMath) {
          return {
            line: lineIndex + 1,
            issue: 'Potential integer overflow/underflow',
            severity: 'high' as const,
            description: 'Arithmetic operations without overflow protection',
            fix: 'Use SafeMath library or Solidity 0.8+ with built-in overflow checks',
            code: 'using SafeMath for uint256;\nrequire(a <= type(uint256).max - b, "Overflow");',
            gasImpact: 'Low (+500 gas)',
            confidence: 85,
            references: ['SWC-101', 'CWE-190'],
            category: 'Arithmetic'
          };
        }
        return null;
      }
    },
    
    // Access control issues
    {
      pattern: /function\s+\w+\s*\([^)]*\)\s*(public|external)/gi,
      check: (code: string, match: RegExpMatchArray) => {
        const lines = code.split('\n');
        const lineIndex = code.substring(0, match.index).split('\n').length - 1;
        const functionLine = lines[lineIndex];
        
        // Check if function has access control modifiers
        const hasAccessControl = /onlyOwner|onlyAdmin|require\(msg\.sender/.test(functionLine);
        const isStateChanging = /\w+\s*=|\w+\s*\+\+|\w+\s*\-\-/.test(functionLine);
        
        if (!hasAccessControl && isStateChanging) {
          return {
            line: lineIndex + 1,
            issue: 'Missing access control',
            severity: 'medium' as const,
            description: 'State-changing function lacks proper access control',
            fix: 'Add appropriate access control modifiers',
            code: 'modifier onlyOwner() { require(msg.sender == owner, "Not authorized"); _; }',
            gasImpact: 'Low (+200 gas)',
            confidence: 80,
            references: ['SWC-106', 'CWE-284'],
            category: 'Access Control'
          };
        }
        return null;
      }
    },
    
    // Unchecked external calls
    {
      pattern: /\.call\(|\.delegatecall\(|\.staticcall\(/gi,
      check: (code: string, match: RegExpMatchArray) => {
        const lines = code.split('\n');
        const lineIndex = code.substring(0, match.index).split('\n').length - 1;
        const line = lines[lineIndex];
        
        // Check if return value is checked
        const isChecked = /require\(|if\s*\(/.test(line) || /bool\s+success/.test(line);
        
        if (!isChecked) {
          return {
            line: lineIndex + 1,
            issue: 'Unchecked external call',
            severity: 'medium' as const,
            description: 'External call return value not checked',
            fix: 'Always check return values of external calls',
            code: '(bool success, ) = target.call(data);\nrequire(success, "Call failed");',
            gasImpact: 'Low (+100 gas)',
            confidence: 90,
            references: ['SWC-104', 'CWE-252'],
            category: 'External Calls'
          };
        }
        return null;
      }
    }
  ];

  analyzeContract(code: string): SecurityAnalysisResult {
    const vulnerabilities: SecurityVulnerability[] = [];
    
    // Run pattern-based analysis
    for (const pattern of this.vulnerabilityPatterns) {
      let match;
      while ((match = pattern.pattern.exec(code)) !== null) {
        const vulnerability = pattern.check(code, match);
        if (vulnerability) {
          vulnerabilities.push(vulnerability);
        }
      }
    }
    
    // Additional security checks
    vulnerabilities.push(...this.checkGasOptimizations(code));
    vulnerabilities.push(...this.checkBestPractices(code));
    
    // Calculate security score
    const securityScore = this.calculateSecurityScore(vulnerabilities);
    const riskLevel = this.determineRiskLevel(vulnerabilities);
    
    return {
      vulnerabilities,
      securityScore,
      riskLevel,
      gasOptimizations: this.findGasOptimizations(code),
      bestPractices: this.checkContractBestPractices(code)
    };
  }
  
  private checkGasOptimizations(code: string): SecurityVulnerability[] {
    const optimizations: SecurityVulnerability[] = [];
    const lines = code.split('\n');
    
    lines.forEach((line, index) => {
      // Check for storage optimization opportunities
      if (line.includes('storage') && line.includes('=')) {
        optimizations.push({
          line: index + 1,
          issue: 'Storage optimization opportunity',
          severity: 'low',
          description: 'Multiple storage reads can be optimized by caching',
          fix: 'Cache storage variables in memory when accessed multiple times',
          code: 'uint256 cached = storageVar; // Use cached instead of storageVar',
          gasImpact: 'High (-2,100 gas per avoided SLOAD)',
          confidence: 75,
          references: ['Gas-Optimization'],
          category: 'Gas Optimization'
        });
      }
    });
    
    return optimizations;
  }
  
  private checkBestPractices(code: string): SecurityVulnerability[] {
    const issues: SecurityVulnerability[] = [];
    
    // Check for missing events
    if (!/event\s+\w+/.test(code)) {
      issues.push({
        line: 1,
        issue: 'Missing event declarations',
        severity: 'low',
        description: 'Contract should emit events for important state changes',
        fix: 'Add event declarations and emit them in state-changing functions',
        code: 'event StateChanged(address indexed user, uint256 value);\nemit StateChanged(msg.sender, newValue);',
        gasImpact: 'Medium (+1,500 gas per event)',
        confidence: 70,
        references: ['Best-Practices'],
        category: 'Events'
      });
    }
    
    return issues;
  }
  
  private calculateSecurityScore(vulnerabilities: SecurityVulnerability[]): number {
    let score = 100;
    
    vulnerabilities.forEach(vuln => {
      switch (vuln.severity) {
        case 'critical':
          score -= 25;
          break;
        case 'high':
          score -= 15;
          break;
        case 'medium':
          score -= 8;
          break;
        case 'low':
          score -= 3;
          break;
      }
    });
    
    return Math.max(0, score);
  }
  
  private determineRiskLevel(vulnerabilities: SecurityVulnerability[]): 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' {
    const hasCritical = vulnerabilities.some(v => v.severity === 'critical');
    const hasHigh = vulnerabilities.some(v => v.severity === 'high');
    const mediumCount = vulnerabilities.filter(v => v.severity === 'medium').length;
    
    if (hasCritical) return 'CRITICAL';
    if (hasHigh) return 'HIGH';
    if (mediumCount >= 3) return 'MEDIUM';
    return 'LOW';
  }
  
  private findGasOptimizations(code: string) {
    const optimizations = [];
    const lines = code.split('\n');
    
    lines.forEach((line, index) => {
      if (line.includes('public') && line.includes('view')) {
        optimizations.push({
          line: index + 1,
          issue: 'Consider using external instead of public for view functions',
          savings: '-200 gas',
          fix: 'Change public to external if function is not called internally'
        });
      }
    });
    
    return optimizations;
  }
  
  private checkContractBestPractices(code: string) {
    const practices = [];
    
    practices.push({
      category: 'Version Pragma',
      status: /pragma solidity/.test(code) ? 'passed' : 'failed',
      description: 'Contract should specify Solidity version'
    });
    
    practices.push({
      category: 'Access Control',
      status: /onlyOwner|Ownable/.test(code) ? 'passed' : 'warning',
      description: 'Consider implementing proper access control'
    });
    
    practices.push({
      category: 'Reentrancy Protection',
      status: /ReentrancyGuard|nonReentrant/.test(code) ? 'passed' : 'warning',
      description: 'Consider adding reentrancy protection for external calls'
    });
    
    return practices;
  }
}
