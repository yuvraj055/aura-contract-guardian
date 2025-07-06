
import React, { useState, useEffect } from 'react';
import { Zap, Shield, TrendingUp, Activity, Clock, Users } from 'lucide-react';

export const DashboardHeader = () => {
  const [stats, setStats] = useState({
    contractsAudited: 1247,
    vulnerabilitiesFound: 532,
    gasOptimization: 23,
    activeUsers: 156,
    uptime: 99.9
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        contractsAudited: prev.contractsAudited + Math.floor(Math.random() * 3),
        vulnerabilitiesFound: prev.vulnerabilitiesFound + Math.floor(Math.random() * 2),
        activeUsers: 150 + Math.floor(Math.random() * 20)
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const statCards = [
    {
      icon: Shield,
      value: stats.contractsAudited.toLocaleString(),
      label: 'Contracts Audited',
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      change: '+12 today'
    },
    {
      icon: Zap,
      value: stats.vulnerabilitiesFound.toLocaleString(),
      label: 'Vulnerabilities Found',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      change: '+8 today'
    },
    {
      icon: TrendingUp,
      value: `${stats.gasOptimization}%`,
      label: 'Avg Gas Savings',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      change: '+2.3% this week'
    },
    {
      icon: Users,
      value: stats.activeUsers.toString(),
      label: 'Active Users',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      change: 'Last 24h'
    },
    {
      icon: Activity,
      value: `${stats.uptime}%`,
      label: 'System Uptime',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      change: '30 days'
    }
  ];

  return (
    <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container mx-auto px-6 py-12 relative">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Smart Contract Security Suite
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-4">
            Audit, generate, and optimize your smart contracts with enterprise-grade security tools
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-slate-400">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>All systems operational</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>Real-time monitoring</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {statCards.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
                  {stat.change}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-white group-hover:scale-105 transition-transform">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-300 group-hover:text-slate-200 transition-colors">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-400/30 text-blue-200 rounded-full text-sm font-medium hover:bg-blue-600/30 transition-all duration-300">
            <Shield className="w-4 h-4" />
            <span>Trusted by 10,000+ developers worldwide</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
