
import React, { useState } from 'react';
import { Shield, Home, FileSearch, Wrench, Settings, User, Bell, ChevronDown, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

export const Navigation = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();
  
  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/' },
    { name: 'Auditor', icon: Shield, path: '/auditor' },
    { name: 'Generator', icon: FileSearch, path: '/generator' },
    { name: 'Simulator', icon: Wrench, path: '/simulator' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  const getLogoSrc = () => {
    if (theme === 'dark') {
      return '/lovable-uploads/1ba3cc55-41ab-4665-8b60-eb38c610525a.png';
    }
    return '/lovable-uploads/58692659-657a-43cf-a759-aa079b070b74.png';
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md text-foreground shadow-sm sticky top-0 z-50 border-b border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <img
                  src={getLogoSrc()}
                  alt="Recover Right Logo"
                  className="h-8 w-8 object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-bold text-foreground">
                  Recover Right
                </span>
                <div className="text-xs text-primary font-medium tracking-wider">ANALYTICS</div>
              </div>
            </Link>
            
            <div className="hidden lg:flex space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`group flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'bg-primary text-primary-foreground shadow-sm' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                  {location.pathname === item.path && (
                    <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full animate-pulse"></div>
                  )}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Clean Notifications */}
            <button className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-300">
              <Bell className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-primary-foreground">3</span>
              </div>
            </button>
            
            {/* Clean Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="group flex items-center space-x-2 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-300"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-warning rounded-full flex items-center justify-center shadow-sm">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-medium text-foreground">John Developer</div>
                  <div className="text-xs text-muted-foreground">Pro Plan</div>
                </div>
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-border/50 py-2 z-50">
                  <div className="px-4 py-3 border-b border-border/50">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary to-warning rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">John Developer</div>
                        <div className="text-xs text-muted-foreground">john@recoverright.com</div>
                        <div className="text-xs text-primary font-medium">Pro Plan • 30 days left</div>
                      </div>
                    </div>
                  </div>
                  <div className="py-1">
                    <Link 
                      to="/settings"
                      className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted/50 transition-colors block"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Profile Settings
                    </Link>
                    <button className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted/50 transition-colors">
                      Billing & Usage
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted/50 transition-colors">
                      API Keys
                    </button>
                    <hr className="my-1 border-border/50" />
                    <button className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors">
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="lg:hidden border-t border-border/50 bg-white/95 backdrop-blur-md">
        <div className="px-6 py-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                location.pathname === item.path
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
