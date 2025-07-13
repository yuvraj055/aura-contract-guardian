
import React, { useState, useEffect } from 'react';
import { Zap, Shield, TrendingUp, Activity, Clock, Users, Target, Award, ChevronRight, Sparkles, ArrowRight, Wifi, WifiOff } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useRealTimeUpdates } from '../hooks/useRealTimeUpdates';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

export const DashboardHeader = () => {
  const { theme } = useTheme();
  const { stats, activities, isConnected } = useRealTimeUpdates();

  const statCards = [
    {
      icon: Shield,
      value: stats.contractsAudited.toLocaleString(),
      label: 'Contracts Audited',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20',
      change: '+2 today',
      trend: 'up'
    },
    {
      icon: Zap,
      value: stats.vulnerabilitiesFound.toLocaleString(),
      label: 'Vulnerabilities Found',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/20',
      change: '+1 today',
      trend: 'up'
    },
    {
      icon: TrendingUp,
      value: `${stats.gasOptimization.toFixed(1)}%`,
      label: 'Avg Gas Savings',
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20',
      change: '+0.3% this week',
      trend: 'up'
    },
    {
      icon: Users,
      value: stats.activeUsers.toString(),
      label: 'Active Users',
      color: 'text-info',
      bgColor: 'bg-info/10',
      borderColor: 'border-info/20',
      change: 'Last 24h',
      trend: 'stable'
    },
    {
      icon: Target,
      value: `$${stats.totalSaved.toFixed(1)}M`,
      label: 'Total Gas Saved',
      color: 'text-success',
      bgColor: 'bg-success/10',
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
    <div className="relative overflow-hidden bg-gradient-to-br from-background via-accent to-primary/5">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-warning/8 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(hsla(var(--primary),0.02)_1px,transparent_1px),linear-gradient(90deg,hsla(var(--primary),0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-40"></div>
      </div>
      
      <div className="container mx-auto px-6 py-20 relative">
        {/* Enhanced Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-8 mb-10">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 animate-pulse-glow"></div>
              <div className="relative p-4 bg-card rounded-3xl border border-primary/20 shadow-medium group-hover:shadow-glow transition-all duration-500 hover-lift">
                <img
                  src={getLogoSrc()}
                  alt="Recover Right Logo"
                  className="h-12 w-12 object-contain"
                />
              </div>
            </div>
            <div className="text-left">
              <h1 className="text-6xl font-black text-foreground leading-tight gradient-primary bg-clip-text text-transparent">
                Recover Right
              </h1>
              <div className="flex items-center space-x-4 mt-2">
                <div className="text-2xl font-bold text-primary">Analytics Dashboard</div>
                <div className="flex items-center space-x-2">
                  {isConnected ? <Wifi className="w-4 h-4 text-success" /> : <WifiOff className="w-4 h-4 text-destructive" />}
                  <Badge variant={isConnected ? "default" : "destructive"} className="text-xs font-medium">
                    {isConnected ? 'LIVE' : 'OFFLINE'}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-2xl text-muted-foreground font-medium leading-relaxed">
              Enterprise-grade smart contract security platform powered by AI
            </p>
            <p className="text-lg text-muted-foreground/80 leading-relaxed">
              Real-time monitoring, vulnerability detection, and gas optimization for Web3 developers worldwide
            </p>
          </div>
          
          {/* Enhanced Feature Badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Badge className="flex items-center gap-2 px-6 py-3 bg-card/80 backdrop-blur-sm text-base font-medium border border-primary/20 hover:bg-card hover:shadow-medium transition-all duration-300 hover:scale-105">
              <Award className="w-5 h-5 text-primary" />
              <span className="text-foreground font-semibold">SOC 2 Certified</span>
            </Badge>
            <Badge className="flex items-center gap-2 px-6 py-3 bg-card/80 backdrop-blur-sm text-base font-medium border border-success/20 hover:bg-card hover:shadow-medium transition-all duration-300 hover:scale-105">
              <Shield className="w-5 h-5 text-success" />
              <span className="text-foreground font-semibold">99.9% Accuracy</span>
            </Badge>
            <Badge className="flex items-center gap-2 px-6 py-3 bg-card/80 backdrop-blur-sm text-base font-medium border border-warning/20 hover:bg-card hover:shadow-medium transition-all duration-300 hover:scale-105">
              <Clock className="w-5 h-5 text-warning" />
              <span className="text-foreground font-semibold">24/7 Monitoring</span>
            </Badge>
          </div>

          {/* Enhanced Call to Action */}
          <div className="mt-12">
            <button className="group relative px-10 py-5 bg-gradient-to-r from-primary to-warning text-primary-foreground font-bold text-xl rounded-2xl hover:shadow-glow transition-all duration-500 hover:scale-105 shadow-medium">
              <div className="relative flex items-center space-x-3">
                <span>Start Security Audit</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </button>
          </div>
        </div>
        
        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {statCards.map((stat, index) => (
            <Card 
              key={index} 
              className={`group relative gradient-card border-0 hover:shadow-glow transition-all duration-500 hover-lift ${stat.borderColor} border-2`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-6">
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${stat.bgColor} ${stat.borderColor} border-2 group-hover:scale-110 transition-transform duration-300`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <Badge variant="secondary" className="text-xs bg-muted/50 font-medium">
                      {stat.change}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-3xl font-black text-foreground group-hover:scale-105 transition-transform duration-300">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors font-semibold">
                      {stat.label}
                    </div>
                  </div>
                  
                  {/* Live indicator */}
                  {isConnected && (
                    <div className="mt-4 flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                      <span className="text-xs text-muted-foreground font-medium">Live Data</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Real-time Activity Feed */}
        {activities.length > 0 && (
          <div className="mt-16 max-w-4xl mx-auto">
            <Card className="border-0 shadow-medium gradient-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Activity className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Live Activity</h3>
                      <p className="text-sm text-muted-foreground">Real-time platform updates</p>
                    </div>
                  </div>
                  <Badge className="bg-success/10 text-success border-success/20">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse mr-2"></div>
                    Live
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  {activities.slice(0, 5).map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-3 p-3 bg-background/50 rounded-lg border border-border/50 hover:bg-background transition-colors">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.severity === 'high' ? 'bg-destructive' :
                        activity.severity === 'medium' ? 'bg-warning' :
                        'bg-success'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                      {activity.severity && (
                        <Badge variant="outline" className={`text-xs ${
                          activity.severity === 'high' ? 'border-destructive/20 text-destructive' :
                          activity.severity === 'medium' ? 'border-warning/20 text-warning' :
                          'border-success/20 text-success'
                        }`}>
                          {activity.severity}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Enhanced Status Banner */}
        <div className="mt-16 text-center">
          <Badge className="inline-flex items-center gap-3 px-8 py-4 bg-success/10 backdrop-blur-sm border border-success/20 text-success rounded-2xl text-base font-semibold hover:bg-success/15 transition-all duration-300 shadow-soft group">
            <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
            <span>All systems operational</span>
            <span className="text-success/70">•</span>
            <span>Trusted by 1,200+ developers worldwide</span>
            <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
          </Badge>
        </div>
      </div>
    </div>
  );
};
