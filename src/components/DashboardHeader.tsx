
import React, { useState, useEffect } from 'react';
import { Zap, Shield, TrendingUp, Activity, Clock, Users, Target, Award } from 'lucide-react';

export const DashboardHeader = () => {
  const [stats, setStats] = useState({
    contractsAudited: 1247,
    vulnerabilitiesFound: 532,
    gasOptimization: 23.4,
    activeUsers: 156,
    uptime: 99.9,
    totalSaved: 2.4
  });

  const [isLive, setIsLive] = useState(true);

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        contractsAudited: prev.contractsAudited + Math.floor(Math.random() * 3),
        vulnerabilitiesFound: prev.vulnerabilitiesFound + Math.floor(Math.random() * 2),
        gasOptimization: prev.gasOptimization + Math.random() * 0.5,
        activeUsers: 145 + Math.floor(Math.random() * 25),
        totalSaved: prev.totalSaved + Math.random() * 0.1
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const statCards = [
    {
      icon: Shield,
      value: stats.contractsAudited.toLocaleString(),
      label: 'Contracts Audited',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: '+12 today',
      trend: 'up'
    },
    {
      icon: Zap,
      value: stats.vulnerabilitiesFound.toLocaleString(),
      label: 'Vulnerabilities Found',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      change: '+8 today',
      trend: 'up'
    },
    {
      icon: TrendingUp,
      value: `${stats.gasOptimization.toFixed(1)}%`,
      label: 'Avg Gas Savings',
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: '+2.3% this week',
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

  return (
    <div className="bg-gradient-to-br from-foreground via-foreground to-muted text-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-warning rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container mx-auto px-6 py-16 relative">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="p-3 bg-primary rounded-2xl shadow-lg">
              <Shield className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-background via-primary to-warning bg-clip-text text-transparent">
                SecureChain Analytics
              </h1>
              <div className="flex items-center justify-center space-x-2 mt-2">
                <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-success animate-pulse' : 'bg-muted'}`}></div>
                <span className="text-sm font-medium text-background/80">
                  {isLive ? 'Live Dashboard' : 'Offline'}
                </span>
              </div>
            </div>
          </div>
          
          <p className="text-xl text-background/80 max-w-3xl mx-auto leading-relaxed mb-8">
            Enterprise-grade smart contract security platform powered by AI. Real-time monitoring and optimization.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-background/10 backdrop-blur-sm rounded-full text-sm border border-background/20">
              <Award className="w-4 h-4 text-primary" />
              <span>SOC 2 Certified</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-background/10 backdrop-blur-sm rounded-full text-sm border border-background/20">
              <Shield className="w-4 h-4 text-success" />
              <span>99.9% Accuracy</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-background/10 backdrop-blur-sm rounded-full text-sm border border-background/20">
              <Clock className="w-4 h-4 text-warning" />
              <span>24/7 Monitoring</span>
            </div>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {statCards.map((stat, index) => (
            <div 
              key={index} 
              className="group bg-background/10 backdrop-blur-md rounded-2xl p-6 border border-background/20 hover:bg-background/15 transition-all duration-300 hover:scale-105 hover:shadow-glow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor} border border-current/20`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="text-xs text-background/60 group-hover:text-background/80 transition-colors">
                  {stat.change}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-3xl font-bold text-background group-hover:scale-105 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-sm text-background/70 group-hover:text-background/90 transition-colors font-medium">
                  {stat.label}
                </div>
              </div>
              
              {/* Live indicator */}
              {isLive && (
                <div className="mt-3 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-xs text-background/60">Live</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Status Banner */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-success/20 backdrop-blur-sm border border-success/30 text-success rounded-2xl text-sm font-medium hover:bg-success/30 transition-all duration-300 shadow-lg">
            <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
            <span>All systems operational • Trusted by 10,000+ developers worldwide</span>
            <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
