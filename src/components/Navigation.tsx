
import React, { useState } from 'react';
import { Shield, Home, FileSearch, Wrench, Settings, User, Bell, ChevronDown, Sparkles, X, Check, AlertTriangle, Info } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useToast } from '../hooks/use-toast';

export const Navigation = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();
  const { toast } = useToast();
  
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Security Scan Complete',
      message: 'Found 3 vulnerabilities in your latest contract',
      type: 'warning',
      time: '2 min ago',
      read: false
    },
    {
      id: 2,
      title: 'Gas Optimization',
      message: 'Saved 15% gas on Contract_v2.sol',
      type: 'success',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      title: 'Deployment Ready',
      message: 'TokenSale contract is ready for mainnet',
      type: 'info',
      time: '3 hours ago',
      read: true
    }
  ]);
  
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

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast({
      title: "All notifications marked as read",
      description: "Your notification list has been cleared.",
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'success': return <Check className="h-4 w-4 text-success" />;
      case 'info': return <Info className="h-4 w-4 text-primary" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <nav className="bg-white/98 backdrop-blur-xl text-foreground shadow-sm sticky top-0 z-50 border-b border-border/30">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <img
                  src={getLogoSrc()}
                  alt="Recover Right Logo"
                  className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-110"
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
                  className={`group flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'bg-gradient-to-r from-primary to-warning text-primary-foreground shadow-lg shadow-primary/25' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
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
          
          <div className="flex items-center space-x-3">
            {/* Enhanced Notifications */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all duration-300 group"
              >
                <Bell className="h-5 w-5 transition-transform group-hover:scale-110" />
                {unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-primary to-warning rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-xs font-bold text-primary-foreground">{unreadCount}</span>
                  </div>
                )}
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white/98 backdrop-blur-xl rounded-2xl shadow-xl border border-border/30 py-2 z-50 max-h-96 overflow-y-auto">
                  <div className="px-4 py-3 border-b border-border/30 flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">Notifications</h3>
                    <div className="flex items-center space-x-2">
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-xs text-primary hover:text-primary/80 font-medium"
                        >
                          Mark all read
                        </button>
                      )}
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="p-1 hover:bg-muted/30 rounded-lg transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="py-2">
                    {notifications.length === 0 ? (
                      <div className="px-4 py-8 text-center text-muted-foreground">
                        <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>No notifications yet</p>
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          onClick={() => markAsRead(notification.id)}
                          className={`px-4 py-3 hover:bg-muted/20 transition-colors cursor-pointer border-l-2 ${
                            notification.read 
                              ? 'border-transparent opacity-60' 
                              : 'border-primary bg-primary/5'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-0.5">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">
                                {notification.title}
                              </p>
                              <p className="text-sm text-muted-foreground mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {notification.time}
                              </p>
                            </div>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Enhanced Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="group flex items-center space-x-2 p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all duration-300"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-warning rounded-xl flex items-center justify-center shadow-sm">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-medium text-foreground">John Developer</div>
                  <div className="text-xs text-muted-foreground">Pro Plan</div>
                </div>
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white/98 backdrop-blur-xl rounded-2xl shadow-xl border border-border/30 py-2 z-50">
                  <div className="px-4 py-3 border-b border-border/30">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary to-warning rounded-xl flex items-center justify-center">
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
                      className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-muted/30 transition-colors block rounded-lg mx-2"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Profile Settings
                    </Link>
                    <button className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-muted/30 transition-colors rounded-lg mx-2">
                      Billing & Usage
                    </button>
                    <button className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-muted/30 transition-colors rounded-lg mx-2">
                      API Keys
                    </button>
                    <hr className="my-2 border-border/30" />
                    <button className="w-full text-left px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors rounded-lg mx-2">
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="lg:hidden border-t border-border/30 bg-white/98 backdrop-blur-xl">
        <div className="px-6 py-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`w-full flex items-center space-x-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                location.pathname === item.path
                  ? 'bg-gradient-to-r from-primary to-warning text-primary-foreground shadow-lg shadow-primary/25' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
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
