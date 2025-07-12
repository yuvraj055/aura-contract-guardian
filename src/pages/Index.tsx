
import React from 'react';
import { Navigation } from '../components/Navigation';
import { DashboardHeader } from '../components/DashboardHeader';
import { Shield, Wand2, Activity, ArrowRight, Zap, TrendingUp, Users, Award, Target, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const Index = () => {
  const modules = [
    {
      title: 'Smart Contract Auditor',
      description: 'AI-powered security analysis with vulnerability detection and automated fix suggestions',
      icon: Shield,
      path: '/auditor',
      features: ['AI Security Analysis', 'Vulnerability Detection', 'Auto-fix Suggestions', 'Detailed Reports'],
      stats: { scanned: '1.2K+', issues: '150+', accuracy: '99.9%' },
      color: 'primary'
    },
    {
      title: 'AI Contract Generator',
      description: 'Generate professional smart contracts with guided wizard and live preview',
      icon: Wand2,
      path: '/generator',
      features: ['Guided Wizard', 'Live Preview', 'Deploy to Testnet', 'Multiple Templates'],
      stats: { generated: '890+', deployed: '650+', success: '98%' },
      color: 'warning'
    },
    {
      title: 'Gas Simulator & Optimizer',
      description: 'Optimize gas usage, simulate execution scenarios and reduce transaction costs',
      icon: Activity,
      path: '/simulator',
      features: ['Gas Estimation', 'Optimization Tips', 'Scenario Testing', 'Cost Analysis'],
      stats: { optimized: '1.1K+', saved: '28%', reports: '780+' },
      color: 'success'
    }
  ];

  const quickStats = [
    { title: 'Contracts Analyzed', value: '1,247', icon: Target, trend: '+8%', color: 'primary' },
    { title: 'Vulnerabilities Fixed', value: '532', icon: Shield, trend: '+5%', color: 'warning' },
    { title: 'Gas Optimized', value: '23.4%', icon: TrendingUp, trend: '+12%', color: 'success' },
    { title: 'Active Users', value: '156', icon: Users, trend: '+18%', color: 'primary' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <DashboardHeader />
      
      <main className="container mx-auto px-6 py-16 space-y-20">
        {/* Quick Stats */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Platform Overview</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real-time insights into your smart contract security operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickStats.map((stat, index) => (
              <Card key={index} className="border-0 bg-card shadow-lg hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-${stat.color}/10 border border-${stat.color}/20`}>
                      <stat.icon className={`w-6 h-6 text-${stat.color}`} />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {stat.trend}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground font-medium">{stat.title}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Main Modules */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-foreground">Security Modules</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive blockchain security tools for enterprise developers
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {modules.map((module, index) => (
              <Link
                key={index}
                to={module.path}
                className="group block h-full"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-glow transition-all duration-500 hover:-translate-y-2 overflow-hidden bg-card">
                  {/* Header */}
                  <div className={`p-8 bg-gradient-to-br from-${module.color}/10 to-${module.color}/5 border-b border-border relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-background/5"></div>
                    <div className="relative z-10 flex items-center justify-between mb-6">
                      <div className={`p-4 bg-${module.color}/20 backdrop-blur-sm rounded-2xl border border-${module.color}/30`}>
                        <module.icon className={`h-8 w-8 text-${module.color}`} />
                      </div>
                      <ArrowRight className="h-6 w-6 text-muted-foreground/60 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                    </div>
                    <div className="relative z-10 space-y-3">
                      <h3 className="text-2xl font-bold text-foreground">{module.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{module.description}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="p-8 space-y-6">
                    {/* Features */}
                    <div className="grid grid-cols-2 gap-3">
                      {module.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                      {Object.entries(module.stats).map(([key, value], idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-lg font-bold text-foreground">{value}</div>
                          <div className="text-xs text-muted-foreground capitalize">{key}</div>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <button className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 bg-${module.color} text-${module.color}-foreground hover:bg-${module.color}/90 hover:shadow-lg transform hover:scale-[1.02] shadow-md`}>
                      Launch {module.title.split(' ')[0]}
                    </button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
        
        {/* Trust Section */}
        <section className="text-center py-16 space-y-8">
          <div className="space-y-4">
            <h3 className="text-3xl font-bold text-foreground">Trusted Globally</h3>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Join thousands of developers securing the future of Web3 technology
            </p>
          </div>
          
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-success/10 text-success rounded-2xl text-sm font-medium border border-success/20 shadow-lg">
            <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
            <span>SecureChain Verified Platform</span>
            <span className="text-success/70">•</span>
            <span>Trusted by 1,200+ developers worldwide</span>
            <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
