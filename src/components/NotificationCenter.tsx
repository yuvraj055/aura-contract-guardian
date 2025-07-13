
import React, { useState, useEffect } from 'react';
import { Bell, X, Check, AlertTriangle, Info, Trash2, Settings } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  time: string;
  read: boolean;
  category: string;
}

export const NotificationCenter = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'Smart Contract Audit Complete',
      message: 'TokenSale.sol has been analyzed. Found 2 medium-risk vulnerabilities.',
      type: 'warning',
      time: '2 minutes ago',
      read: false,
      category: 'Security'
    },
    {
      id: 2,
      title: 'Gas Optimization Successful',
      message: 'Reduced gas consumption by 23% in your latest deployment.',
      type: 'success',
      time: '1 hour ago',
      read: false,
      category: 'Optimization'
    },
    {
      id: 3,
      title: 'New Feature Available',
      message: 'AI-powered code generation is now available in the Generator module.',
      type: 'info',
      time: '3 hours ago',
      read: true,
      category: 'Updates'
    },
    {
      id: 4,
      title: 'Subscription Reminder',
      message: 'Your Pro plan will renew in 7 days. Update billing information if needed.',
      type: 'info',
      time: '1 day ago',
      read: false,
      category: 'Billing'
    }
  ]);

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

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast({
      title: "Notification deleted",
      description: "The notification has been removed.",
    });
  };

  const clearAll = () => {
    setNotifications([]);
    toast({
      title: "All notifications cleared",
      description: "Your notification center is now empty.",
    });
  };

  const getNotificationIcon = (type: string) => {
    const iconClass = "h-5 w-5";
    switch (type) {
      case 'warning': return <AlertTriangle className={`${iconClass} text-warning`} />;
      case 'success': return <Check className={`${iconClass} text-success`} />;
      case 'error': return <X className={`${iconClass} text-destructive`} />;
      case 'info': return <Info className={`${iconClass} text-primary`} />;
      default: return <Bell className={`${iconClass} text-muted-foreground`} />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'security': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'optimization': return 'bg-success/10 text-success border-success/20';
      case 'updates': return 'bg-primary/10 text-primary border-primary/20';
      case 'billing': return 'bg-warning/10 text-warning border-warning/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const randomNotifications = [
        {
          title: 'New vulnerability detected',
          message: 'Reentrancy vulnerability found in contract function.',
          type: 'warning' as const,
          category: 'Security'
        },
        {
          title: 'Deployment successful',
          message: 'Your contract has been deployed to testnet successfully.',
          type: 'success' as const,
          category: 'Deployment'
        },
        {
          title: 'Gas price alert',
          message: 'Network gas prices are currently low. Good time to deploy!',
          type: 'info' as const,
          category: 'Network'
        }
      ];

      if (Math.random() > 0.7) { // 30% chance every 30 seconds
        const randomNotif = randomNotifications[Math.floor(Math.random() * randomNotifications.length)];
        const newNotification: Notification = {
          id: Date.now(),
          ...randomNotif,
          time: 'Just now',
          read: false
        };

        setNotifications(prev => [newNotification, ...prev].slice(0, 10)); // Keep only 10 most recent
        
        toast({
          title: randomNotif.title,
          description: randomNotif.message,
        });
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [toast]);

  return (
    <Card className="border-0 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b border-border/50">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bell className="h-6 w-6 text-primary" />
            <span className="text-xl">Notification Center</span>
            {unreadCount > 0 && (
              <Badge className="bg-primary text-primary-foreground px-2 py-1">
                {unreadCount} new
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {notifications.length > 0 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-primary hover:text-primary/80"
                >
                  Mark all read
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAll}
                  className="text-destructive hover:text-destructive/80"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear all
                </Button>
              </>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {notifications.length === 0 ? (
          <div className="p-12 text-center">
            <Bell className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
            <h3 className="text-lg font-medium text-foreground mb-2">All caught up!</h3>
            <p className="text-muted-foreground">No new notifications at the moment.</p>
          </div>
        ) : (
          <div className="divide-y divide-border/30">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-6 hover:bg-muted/20 transition-all duration-200 cursor-pointer border-l-4 ${
                  notification.read 
                    ? 'border-transparent opacity-70' 
                    : 'border-primary bg-primary/5'
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-sm font-semibold text-foreground">
                          {notification.title}
                        </h4>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getCategoryColor(notification.category)}`}
                        >
                          {notification.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    {!notification.read && (
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}
                      className="text-muted-foreground hover:text-destructive p-1 h-auto"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
