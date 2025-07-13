
import React from 'react';
import { Navigation } from '../components/Navigation';
import { DashboardHeader } from '../components/DashboardHeader';
import { AdvancedSearch } from '../components/AdvancedSearch';
import { ContractSimulator } from '../components/ContractSimulator';
import { Shield, Wand2, Activity, ArrowRight, Zap, TrendingUp, Users, Award, Target, CheckCircle, Sparkles } from 'lucide-react';
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
      color: 'primary',
      gradient: 'from-primary/10 to-primary/5'
    },
    {
      title: 'AI Contract Generator',
      description: 'Generate professional smart contracts with guided wizard and live preview',
      icon: Wand2,
      path: '/generator',
      features: ['Guided Wizard', 'Live Preview', 'Contract Templates', 'Code Optimization'],
      stats: { generated: '890+', templates: '25+', success: '98%' },
      color: 'warning',
      gradient: 'from-warning/10 to-warning/5'
    },
    {
      title: 'Gas Simulator & Optimizer',
      description: 'Simulate contract execution, optimize gas usage and reduce transaction costs',
      icon: Activity,
      path: '/simulator',
      features: ['Real-time Simulation', 'Gas Estimation', 'Optimization Tips', 'Performance Analysis'],
      stats: { simulated: '1.1K+', saved: '28%', reports: '780+' },
      color: 'success',
      gradient: 'from-success/10 to-success/5'
    }
  ];

  const quickStats = [
    { title: 'Contracts Analyzed', value: '1,247', icon: Target, trend: '+8%', color: 'primary' },
    { title: 'Vulnerabilities Fixed', value: '532', icon: Shield, trend: '+5%', color: 'warning' },
    { title: 'Gas Optimized', value: '23.4%', icon: TrendingUp, trend: '+12%', color: 'success' },
    { title: 'Active Users', value: '156', icon: Users, trend: '+18%', color: 'info' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <DashboardHeader />
      
      <main className="container mx-auto px-6 py-20 space-y-20">
        {/* Advanced Search Section */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-foreground">Intelligent Search</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Find exactly what you need with our advanced search and filtering capabilities
            </p>
          </div>
          <AdvancedSearch />
        </section>

        {/* Contract Simulator Section */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-foreground">Contract Simulation</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Test your smart contracts in a safe environment before deployment
            </p>
          </div>
          <ContractSimulator />
        </section>

        {/* Enhanced Stats Overview */}
        <section className="space-y-10">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-foreground">Platform Overview</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Real-time insights into your smart contract security operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickStats.map((stat, index) => (
              <Card key={index} className="border-0 bg-card/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover-lift group">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-${stat.color}/10 border-2 border-${stat.color}/20 group-hover:scale-110 transition-transform duration-300`}>
                      <stat.icon className={`w-6 h-6 text-${stat.color}`} />
                    </div>
                    <Badge variant="secondary" className="text-sm bg-muted/50 font-medium border border-border/30">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {stat.trend}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-black text-foreground">{stat.value}</div>
                    <div className="text-base text-muted-foreground font-semibold">{stat.title}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Enhanced Modules Section */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-foreground">Security Modules</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
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
                <Card className="h-full border-0 bg-card/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover-lift overflow-hidden group-hover:border-primary/20">
                  {/* Enhanced Header */}
                  <div className={`p-8 bg-gradient-to-br ${module.gradient} border-b border-border/50 relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="relative z-10 flex items-center justify-between mb-6">
                      <div className={`p-4 bg-card/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-${module.color}/20 group-hover:scale-110 transition-transform duration-300`}>
                        <module.icon className={`h-8 w-8 text-${module.color}`} />
                      </div>
                      <ArrowRight className="h-6 w-6 text-muted-foreground/60 transition-all group-hover:translate-x-2 group-hover:text-primary" />
                    </div>
                    <div className="relative z-10 space-y-3">
                      <h3 className="text-2xl font-bold text-foreground">{module.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{module.description}</p>
                    </div>
                  </div>

                  {/* Enhanced Content */}
                  <CardContent className="p-8 space-y-6 bg-card/90 backdrop-blur-sm">
                    {/* Features */}
                    <div className="grid grid-cols-1 gap-3">
                      {module.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                          <span className="text-muted-foreground font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
                      {Object.entries(module.stats).map(([key, value], idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-lg font-bold text-foreground">{value}</div>
                          <div className="text-xs text-muted-foreground capitalize font-medium">{key}</div>
                        </div>
                      ))}
                    </div>

                    {/* Enhanced CTA Button */}
                    <button className={`w-full py-4 px-6 rounded-xl font-bold transition-all duration-300 bg-gradient-to-r from-${module.color} to-${module.color}/80 text-${module.color}-foreground hover:shadow-xl transform hover:scale-[1.02] shadow-lg`}>
                      Launch {module.title.split(' ')[0]}
                    </button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
        
        {/* Enhanced Trust Section */}
        <section className="text-center py-16 space-y-8">
          <div className="space-y-4">
            <h3 className="text-3xl font-bold text-foreground">Trusted Globally</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Join thousands of developers securing the future of Web3 technology
            </p>
          </div>
          
          <Badge className="inline-flex items-center gap-4 px-8 py-4 bg-success/10 text-success rounded-2xl text-lg font-bold border-2 border-success/20 shadow-lg hover:bg-success/15 transition-all duration-300 group">
            <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
            <span>SecureChain Verified Platform</span>
            <span className="text-success/70">•</span>
            <span>Trusted by 1,200+ developers worldwide</span>
            <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
          </Badge>
        </section>
      </main>
    </div>
  );
};

export default Index;
