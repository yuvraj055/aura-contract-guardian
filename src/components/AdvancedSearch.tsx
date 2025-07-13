
import React, { useState } from 'react';
import { Search, Filter, X, Calendar, Tag, User, FileCode } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface SearchFilters {
  query: string;
  dateRange: string;
  category: string;
  severity: string;
  author: string;
}

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  severity: 'low' | 'medium' | 'high';
  date: string;
  author: string;
  tags: string[];
}

export const AdvancedSearch = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    dateRange: '',
    category: '',
    severity: '',
    author: ''
  });
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const mockResults: SearchResult[] = [
    {
      id: '1',
      title: 'Token Sale Smart Contract',
      description: 'ERC-20 token sale contract with security vulnerabilities detected',
      category: 'Security Audit',
      severity: 'high',
      date: '2024-01-15',
      author: 'John Developer',
      tags: ['ERC-20', 'Token Sale', 'Security']
    },
    {
      id: '2',
      title: 'DeFi Staking Protocol',
      description: 'Yield farming protocol with gas optimization opportunities',
      category: 'Gas Optimization',
      severity: 'medium',
      date: '2024-01-14',
      author: 'Alice Smith',
      tags: ['DeFi', 'Staking', 'Yield Farming']
    },
    {
      id: '3',
      title: 'NFT Marketplace Contract',
      description: 'OpenSea-style NFT marketplace with automated testing',
      category: 'Testing',
      severity: 'low',
      date: '2024-01-13',
      author: 'Bob Wilson',
      tags: ['NFT', 'Marketplace', 'Testing']
    }
  ];

  const handleSearch = async () => {
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      const filteredResults = mockResults.filter(result => {
        const matchesQuery = !filters.query || 
          result.title.toLowerCase().includes(filters.query.toLowerCase()) ||
          result.description.toLowerCase().includes(filters.query.toLowerCase());
        
        const matchesCategory = !filters.category || result.category === filters.category;
        const matchesSeverity = !filters.severity || result.severity === filters.severity;
        const matchesAuthor = !filters.author || result.author.toLowerCase().includes(filters.author.toLowerCase());
        
        return matchesQuery && matchesCategory && matchesSeverity && matchesAuthor;
      });
      
      setResults(filteredResults);
      setIsSearching(false);
    }, 800);
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      dateRange: '',
      category: '',
      severity: '',
      author: ''
    });
    setResults([]);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'low': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  return (
    <Card className="border-0 shadow-medium bg-gradient-card">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Search Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Search className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Advanced Search</h3>
                <p className="text-sm text-muted-foreground">Find contracts, audits, and reports</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary hover:text-primary/80"
            >
              <Filter className="h-4 w-4 mr-2" />
              {isExpanded ? 'Simple' : 'Advanced'}
            </Button>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search contracts, reports, or documentation..."
              className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              value={filters.query}
              onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>

          {/* Advanced Filters */}
          {isExpanded && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select 
                  className="w-full p-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary"
                  value={filters.category}
                  onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                >
                  <option value="">All Categories</option>
                  <option value="Security Audit">Security Audit</option>
                  <option value="Gas Optimization">Gas Optimization</option>
                  <option value="Testing">Testing</option>
                  <option value="Deployment">Deployment</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Severity</label>
                <select 
                  className="w-full p-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary"
                  value={filters.severity}
                  onChange={(e) => setFilters(prev => ({ ...prev, severity: e.target.value }))}
                >
                  <option value="">All Severities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Author</label>
                <input
                  type="text"
                  placeholder="Author name..."
                  className="w-full p-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary"
                  value={filters.author}
                  onChange={(e) => setFilters(prev => ({ ...prev, author: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Date Range</label>
                <input
                  type="date"
                  className="w-full p-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary"
                  value={filters.dateRange}
                  onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                />
              </div>
            </div>
          )}

          {/* Search Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button onClick={handleSearch} disabled={isSearching} className="button-primary">
                {isSearching ? 'Searching...' : 'Search'}
              </Button>
              <Button variant="outline" onClick={clearFilters}>
                <X className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
            {results.length > 0 && (
              <span className="text-sm text-muted-foreground">
                {results.length} result{results.length !== 1 ? 's' : ''} found
              </span>
            )}
          </div>

          {/* Search Results */}
          {results.length > 0 && (
            <div className="space-y-3 mt-6">
              <h4 className="font-semibold text-foreground">Search Results</h4>
              {results.map((result) => (
                <div key={result.id} className="p-4 bg-background border border-border rounded-lg hover:shadow-md transition-all hover-lift">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <FileCode className="h-4 w-4 text-primary" />
                      <h5 className="font-medium text-foreground">{result.title}</h5>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={getSeverityColor(result.severity)}>
                        {result.severity}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{result.date}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{result.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <User className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{result.author}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {result.tags.map((tag, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          <Tag className="h-2 w-2 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
