
import React from 'react';
import { Navigation } from '../components/Navigation';
import { DashboardHeader } from '../components/DashboardHeader';
import { Shield, Wand2, Activity, ArrowRight, Zap, TrendingUp, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const Index = () => {
  const modules = [
    {
      title: 'Smart Contract Auditor',
      description: 'Advanced security analysis with AI-powered vulnerability detection and automated fix suggestions',
      icon: Shield,
      color: 'primary',
      path: '/auditor',
      features: ['AI Security Analysis', 'Vulnerability Detection', 'Auto-fix Suggestions', 'Detailed Reports'],
      stats: { scanned: '10K+', issues: '500+', fixed: '95%' }
    },
    {
      title: 'AI Contract Generator',
      description: 'Generate professional smart contracts with guided wizard, live preview and deployment tools',
      icon: Wand2,
      color: 'warning',
      path: '/generator',
      features: ['Guided Wizard', 'Live Preview', 'Deploy to Testnet', 'Multiple Templates'],
      stats: { generated: '5K+', deployed: '2K+', success: '98%' }
    },
    {
      title: 'Gas Simulator & Optimizer',
      description: 'Optimize gas usage, simulate execution scenarios and reduce transaction costs effectively',
      icon: Activity,
      color: 'success',
      path: '/simulator',
      features: ['Gas Estimation', 'Optimization Tips', 'Scenario Testing', 'Cost Analysis'],
      stats: { optimized: '8K+', saved: '40%', reports: '3K+' }
    }
  ];

  const statsCards = [
    { title: 'Contracts Analyzed', value: '23,847', icon: Shield, trend: '+12%' },
    { title: 'Vulnerabilities Fixed', value: '1,286', icon: Zap, trend: '+8%' },
    { title: 'Gas Optimized', value: '45.2%', icon: TrendingUp, trend: '+15%' },
    { title: 'Active Users', value: '2,341', icon: Users, trend: '+23%' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/30">
      <Navigation />
      <DashboardHeader />
      
      <main className="container mx-auto px-6 py-12 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-warning bg-clip-text text-transparent">
              SecureChain Analytics
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Enterprise-grade smart contract security platform powered by AI. Analyze, optimize, and secure your blockchain applications with confidence.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Award className="w-4 h-4 mr-2" />
              SOC 2 Certified
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Shield className="w-4 h-4 mr-2" />
              99.9% Accuracy
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              24/7 Monitoring
            </Badge>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat, index) => (
            <Card key={index} className="glass-effect border-0 shadow-lg hover:shadow-glow transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    <div className="flex items-center text-success text-sm font-medium">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      {stat.trend}
                    </div>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Modules */}
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-foreground">Security Modules</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our comprehensive suite of blockchain security tools designed for enterprise developers
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {modules.map((module, index) => (
              <Link
                key={index}
                to={module.path}
                className="group block"
              >
                <Card className="h-full glass-effect border-0 shadow-lg hover:shadow-glow transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
                  {/* Header with gradient */}
                  <div className={`p-8 gradient-${module.color === 'primary' ? 'yellow' : module.color === 'warning' ? 'yellow' : 'dark'} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-white/20"></div>
                    <div className="relative z-10 flex items-center justify-between mb-6">
                      <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                        <module.icon className="h-8 w-8 text-white" />
                      </div>
                      <ArrowRight className="h-6 w-6 text-white/80 transition-transform group-hover:translate-x-1" />
                    </div>
                    <div className="relative z-10 space-y-3">
                      <h3 className="text-2xl font-bold text-white">{module.title}</h3>
                      <p className="text-white/90 leading-relaxed">{module.description}</p>
                    </div>
                  </div>

                  {/* Features */}
                  <CardContent className="p-8 space-y-6">
                    <div className="grid grid-cols-2 gap-3">
                      {module.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                      {Object.entries(module.stats).map(([key, value], idx) => (
                        <div key={idx} className="text-center">
                          <p className="text-lg font-bold text-foreground">{value}</p>
                          <p className="text-xs text-muted-foreground capitalize">{key}</p>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <button className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/25 transform hover:scale-[1.02]`}>
                      Launch {module.title.split(' ')[0]}
                    </button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Trust Indicators */}
        <div className="text-center py-16 space-y-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-foreground">Trusted by Industry Leaders</h3>
            <p className="text-lg text-muted-foreground">Join thousands of developers securing the future of Web3</p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {/* Placeholder for company logos */}
            <div className="h-12 w-24 bg-muted rounded-lg"></div>
            <div className="h-12 w-32 bg-muted rounded-lg"></div>
            <div className="h-12 w-28 bg-muted rounded-lg"></div>
            <div className="h-12 w-36 bg-muted rounded-lg"></div>
            <div className="h-12 w-24 bg-muted rounded-lg"></div>
          </div>
          
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-success/10 text-success rounded-full text-sm font-medium border border-success/20">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            SecureChain Verified Platform - Trusted by 10,000+ developers worldwide
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
