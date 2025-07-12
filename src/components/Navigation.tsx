
import React, { useState } from 'react';
import { Shield, Home, FileSearch, Wrench, Settings, User, Bell, ChevronDown, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Navigation = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/' },
    { name: 'Auditor', icon: Shield, path: '/auditor' },
    { name: 'Generator', icon: FileSearch, path: '/generator' },
    { name: 'Simulator', icon: Wrench, path: '/simulator' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <nav className="gradient-dark text-white shadow-2xl sticky top-0 z-50 border-b border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-12">
            <Link to="/" className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <Shield className="h-10 w-10 text-primary" />
                <Sparkles className="h-4 w-4 text-primary absolute -top-1 -right-1 animate-pulse" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white via-primary to-warning bg-clip-text text-transparent">
                  SecureChain
                </span>
                <div className="text-xs text-primary font-semibold tracking-wider">ANALYTICS</div>
              </div>
            </Link>
            
            <div className="hidden lg:flex space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`group flex items-center space-x-3 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
                      : 'text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-sm'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                  {location.pathname === item.path && (
                    <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse"></div>
                  )}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            {/* Notifications */}
            <button className="relative p-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
              <Bell className="h-6 w-6" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-primary-foreground">3</span>
              </div>
            </button>
            
            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="group flex items-center space-x-3 p-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-warning rounded-full flex items-center justify-center shadow-lg">
                  <User className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-medium text-white">John Developer</div>
                  <div className="text-xs text-white/60">Pro Plan</div>
                </div>
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              
              {showProfileMenu && (
                <div className="absolute right-0 mt-3 w-64 glass-effect rounded-2xl shadow-2xl border border-white/20 py-3 z-50">
                  <div className="px-6 py-4 border-b border-white/10">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary to-warning rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">John Developer</div>
                        <div className="text-xs text-muted-foreground">john@example.com</div>
                        <div className="text-xs text-primary font-medium">Pro Plan • 30 days left</div>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <button className="w-full text-left px-6 py-3 text-sm text-foreground hover:bg-accent/50 transition-colors">
                      Profile Settings
                    </button>
                    <button className="w-full text-left px-6 py-3 text-sm text-foreground hover:bg-accent/50 transition-colors">
                      Billing & Usage
                    </button>
                    <button className="w-full text-left px-6 py-3 text-sm text-foreground hover:bg-accent/50 transition-colors">
                      API Keys
                    </button>
                    <hr className="my-2 border-border" />
                    <button className="w-full text-left px-6 py-3 text-sm text-destructive hover:bg-destructive/10 transition-colors">
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className="lg:hidden border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="px-6 py-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                location.pathname === item.path
                  ? 'bg-primary text-primary-foreground shadow-lg' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
