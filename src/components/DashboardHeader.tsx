import React, { useState, useEffect } from 'react';
import { Zap, Shield, TrendingUp, Activity, Clock, Users, Target, Award, ChevronRight, Sparkles } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export const DashboardHeader = () => {
  const { theme } = useTheme();
  const [stats, setStats] = useState({
    contractsAudited: 1247,
    vulnerabilitiesFound: 532,
    gasOptimization: 23.4,
    activeUsers: 156,
    uptime: 99.9,
    totalSaved: 2.4
  });

  const [isLive, setIsLive] = useState(true);

  // Real-time updates simulation with realistic increments
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        contractsAudited: prev.contractsAudited + Math.floor(Math.random() * 2), // 0-1 realistic increment
        vulnerabilitiesFound: prev.vulnerabilitiesFound + (Math.random() > 0.7 ? 1 : 0), // Less frequent
        gasOptimization: Math.min(35, prev.gasOptimization + Math.random() * 0.1), // Slower growth, capped
        activeUsers: 140 + Math.floor(Math.random() * 20), // Realistic range 140-160
        totalSaved: prev.totalSaved + Math.random() * 0.05 // Smaller increments
      }));
    }, 5000); // Less frequent updates

    return () => clearInterval(interval);
  }, []);

  const statCards = [
    {
      icon: Shield,
      value: stats.contractsAudited.toLocaleString(),
      label: 'Contracts Audited',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: '+2 today',
      trend: 'up'
    },
    {
      icon: Zap,
      value: stats.vulnerabilitiesFound.toLocaleString(),
      label: 'Vulnerabilities Found',
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
      change: '+1 today',
      trend: 'up'
    },
    {
      icon: TrendingUp,
      value: `${stats.gasOptimization.toFixed(1)}%`,
      label: 'Avg Gas Savings',
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: '+0.3% this week',
      trend: 'up'
    },
    {
      icon: Users,
      value: stats.activeUsers.toString(),
      label: 'Active Users',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: 'Last 24h',
      trend: 'stable'
    },
    {
      icon: Target,
      value: `$${stats.totalSaved.toFixed(1)}M`,
      label: 'Total Gas Saved',
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: 'All time',
      trend: 'up'
    }
  ];

  const getLogoSrc = () => {
    if (theme === 'dark') {
      return '/lovable-uploads/1ba3cc55-41ab-4665-8b60-eb38c610525a.png';
    }
    return '/lovable-uploads/58692659-657a-43cf-a759-aa079b070b74.png';
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-foreground via-foreground/95 to-foreground text-background">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/15 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,235,59,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,235,59,0.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>
      </div>
      
      <div className="container mx-auto px-6 py-20 relative">
        {/* Enhanced Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 rounded-3xl blur-xl"></div>
              <div className="relative p-4 bg-primary/20 backdrop-blur-md rounded-3xl border border-primary/30 shadow-2xl">
                <img
                  src={getLogoSrc()}
                  alt="Recover Right Logo"
                  className="h-12 w-12 object-contain"
                />
              </div>
            </div>
            <div className="text-left">
              <h1 className="text-6xl font-black bg-gradient-to-r from-background via-primary to-background bg-clip-text text-transparent leading-tight">
                Recover Right
              </h1>
              <div className="flex items-center space-x-3 mt-2">
                <div className="text-2xl font-bold text-primary">Analytics</div>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-success animate-pulse' : 'bg-muted'}`}></div>
                  <span className="text-sm font-semibold text-background/90 px-3 py-1 bg-success/20 rounded-full border border-success/30">
                    {isLive ? 'LIVE' : 'OFFLINE'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-2xl text-background/90 font-medium leading-relaxed">
              Enterprise-grade smart contract security platform powered by AI
            </p>
            <p className="text-lg text-background/70 leading-relaxed">
              Real-time monitoring, vulnerability detection, and gas optimization for Web3 developers
            </p>
          </div>
          
          {/* Enhanced Feature Badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <div className="group flex items-center gap-3 px-6 py-3 bg-background/10 backdrop-blur-md rounded-2xl text-sm font-semibold border border-background/20 hover:bg-background/15 transition-all duration-300 hover:scale-105">
              <Award className="w-5 h-5 text-primary" />
              <span>SOC 2 Certified</span>
              <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="group flex items-center gap-3 px-6 py-3 bg-background/10 backdrop-blur-md rounded-2xl text-sm font-semibold border border-background/20 hover:bg-background/15 transition-all duration-300 hover:scale-105">
              <Shield className="w-5 h-5 text-success" />
              <span>99.9% Accuracy</span>
              <Sparkles className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="group flex items-center gap-3 px-6 py-3 bg-background/10 backdrop-blur-md rounded-2xl text-sm font-semibold border border-background/20 hover:bg-background/15 transition-all duration-300 hover:scale-105">
              <Clock className="w-5 h-5 text-primary" />
              <span>24/7 Monitoring</span>
              <Activity className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12">
            <button className="group relative px-8 py-4 bg-primary text-foreground font-bold text-lg rounded-2xl hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-2xl">
              <div className="absolute inset-0 bg-primary/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative flex items-center space-x-2">
                <span>Start Security Audit</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>
        
        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {statCards.map((stat, index) => (
            <div 
              key={index} 
              className="group relative bg-background/10 backdrop-blur-md rounded-2xl p-6 border border-background/20 hover:bg-background/15 transition-all duration-500 hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Card Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor} border border-current/20 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="text-xs text-background/60 group-hover:text-background/80 transition-colors font-medium">
                    {stat.change}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-3xl font-black text-background group-hover:scale-105 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm text-background/70 group-hover:text-background/90 transition-colors font-semibold">
                    {stat.label}
                  </div>
                </div>
                
                {/* Live indicator */}
                {isLive && (
                  <div className="mt-4 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-xs text-background/60 font-medium">Live</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Status Banner */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 px-10 py-5 bg-success/20 backdrop-blur-md border border-success/30 text-success rounded-2xl text-sm font-bold hover:bg-success/30 transition-all duration-300 shadow-2xl group">
            <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
            <span>All systems operational</span>
            <span className="text-success/70">•</span>
            <span>Trusted by 1,200+ developers worldwide</span>
            <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </div>
  );
};
