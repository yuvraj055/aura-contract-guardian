
import React, { useState, useEffect } from 'react';
import { Zap, Shield, TrendingUp, Activity, Clock, Users, Target, Award, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
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
        contractsAudited: prev.contractsAudited + Math.floor(Math.random() * 2),
        vulnerabilitiesFound: prev.vulnerabilitiesFound + (Math.random() > 0.7 ? 1 : 0),
        gasOptimization: Math.min(35, prev.gasOptimization + Math.random() * 0.1),
        activeUsers: 140 + Math.floor(Math.random() * 20),
        totalSaved: prev.totalSaved + Math.random() * 0.05
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const statCards = [
    {
      icon: Shield,
      value: stats.contractsAudited.toLocaleString(),
      label: 'Contracts Audited',
      color: 'text-primary',
      bgColor: 'bg-primary/5',
      borderColor: 'border-primary/20',
      change: '+2 today',
      trend: 'up'
    },
    {
      icon: Zap,
      value: stats.vulnerabilitiesFound.toLocaleString(),
      label: 'Vulnerabilities Found',
      color: 'text-warning',
      bgColor: 'bg-warning/5',
      borderColor: 'border-warning/20',
      change: '+1 today',
      trend: 'up'
    },
    {
      icon: TrendingUp,
      value: `${stats.gasOptimization.toFixed(1)}%`,
      label: 'Avg Gas Savings',
      color: 'text-success',
      bgColor: 'bg-success/5',
      borderColor: 'border-success/20',
      change: '+0.3% this week',
      trend: 'up'
    },
    {
      icon: Users,
      value: stats.activeUsers.toString(),
      label: 'Active Users',
      color: 'text-primary',
      bgColor: 'bg-primary/5',
      borderColor: 'border-primary/20',
      change: 'Last 24h',
      trend: 'stable'
    },
    {
      icon: Target,
      value: `$${stats.totalSaved.toFixed(1)}M`,
      label: 'Total Gas Saved',
      color: 'text-success',
      bgColor: 'bg-success/5',
      borderColor: 'border-success/20',
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
    <div className="relative overflow-hidden bg-gradient-to-br from-background via-primary/3 to-warning/5">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/8 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-warning/8 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,235,59,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,235,59,0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-40"></div>
      </div>
      
      <div className="container mx-auto px-6 py-16 relative">
        {/* Clean Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-6 mb-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
              <div className="relative p-3 bg-white rounded-2xl border border-primary/10 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <img
                  src={getLogoSrc()}
                  alt="Recover Right Logo"
                  className="h-10 w-10 object-contain"
                />
              </div>
            </div>
            <div className="text-left">
              <h1 className="text-5xl font-black text-foreground leading-tight">
                Recover Right
              </h1>
              <div className="flex items-center space-x-3 mt-1">
                <div className="text-xl font-bold text-primary">Analytics Dashboard</div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-success animate-pulse' : 'bg-muted'}`}></div>
                  <span className="text-xs font-medium text-success px-2 py-1 bg-success/10 rounded-full border border-success/20">
                    {isLive ? 'LIVE' : 'OFFLINE'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-xl text-muted-foreground font-medium leading-relaxed">
              Enterprise-grade smart contract security platform powered by AI
            </p>
            <p className="text-base text-muted-foreground/80 leading-relaxed">
              Real-time monitoring, vulnerability detection, and gas optimization for Web3 developers
            </p>
          </div>
          
          {/* Clean Feature Badges */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <div className="group flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl text-sm font-medium border border-primary/10 hover:bg-white hover:shadow-md transition-all duration-300 hover:scale-105">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-foreground">SOC 2 Certified</span>
            </div>
            <div className="group flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl text-sm font-medium border border-success/10 hover:bg-white hover:shadow-md transition-all duration-300 hover:scale-105">
              <Shield className="w-4 h-4 text-success" />
              <span className="text-foreground">99.9% Accuracy</span>
            </div>
            <div className="group flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl text-sm font-medium border border-warning/10 hover:bg-white hover:shadow-md transition-all duration-300 hover:scale-105">
              <Clock className="w-4 h-4 text-warning" />
              <span className="text-foreground">24/7 Monitoring</span>
            </div>
          </div>

          {/* Clean Call to Action */}
          <div className="mt-10">
            <button className="group relative px-8 py-4 bg-primary text-primary-foreground font-semibold text-lg rounded-xl hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
              <div className="relative flex items-center space-x-2">
                <span>Start Security Audit</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>
        
        {/* Clean Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {statCards.map((stat, index) => (
            <div 
              key={index} 
              className={`group relative bg-white rounded-xl p-5 ${stat.borderColor} border hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-lg ${stat.bgColor} ${stat.borderColor} border group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div className="text-xs text-muted-foreground group-hover:text-foreground transition-colors font-medium">
                    {stat.change}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-foreground group-hover:scale-105 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors font-medium">
                    {stat.label}
                  </div>
                </div>
                
                {/* Live indicator */}
                {isLive && (
                  <div className="mt-3 flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></div>
                    <span className="text-xs text-muted-foreground font-medium">Live</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Clean Status Banner */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-success/10 backdrop-blur-sm border border-success/20 text-success rounded-xl text-sm font-medium hover:bg-success/15 transition-all duration-300 shadow-sm group">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span>All systems operational</span>
            <span className="text-success/70">•</span>
            <span>Trusted by 1,200+ developers worldwide</span>
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </div>
  );
};
