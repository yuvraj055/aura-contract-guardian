
import React, { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Switch } from '../components/ui/switch';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import { useToast } from '../hooks/use-toast';
import { 
  User, 
  Shield, 
  Bell, 
  Palette, 
  Globe, 
  Key, 
  Download, 
  Trash2,
  Moon,
  Sun,
  Monitor,
  Save,
  RefreshCw,
  Settings as SettingsIcon,
  Crown,
  CreditCard,
  Calendar,
  Check
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const SettingsPage = () => {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    security: true,
    updates: false
  });
  
  const [profile, setProfile] = useState({
    name: 'John Developer',
    email: 'john@recoverright.com',
    company: 'Recover Right',
    role: 'Senior Developer'
  });

  const [subscription, setSubscription] = useState({
    plan: 'Pro',
    status: 'active',
    nextBilling: 'Jan 15, 2025',
    usage: 847,
    limit: 1000
  });

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast({
      title: value ? "Notifications Enabled" : "Notifications Disabled",
      description: `${key.charAt(0).toUpperCase() + key.slice(1)} notifications ${value ? 'enabled' : 'disabled'}.`,
    });
  };

  const handleSubscriptionUpgrade = () => {
    toast({
      title: "Upgrade Available",
      description: "Redirecting to billing portal...",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Your data export will be ready shortly.",
    });
  };

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor }
  ];

  const subscriptionPlans = [
    {
      name: 'Basic',
      price: '$9',
      period: '/month',
      current: false,
      features: ['500 Audits/month', 'Basic Security Reports', 'Email Support']
    },
    {
      name: 'Pro',
      price: '$29',
      period: '/month',
      current: true,
      features: ['1,000 Audits/month', 'Advanced Reports', 'Priority Support', 'Custom Integrations']
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: '/month',
      current: false,
      features: ['Unlimited Audits', 'White-label Reports', '24/7 Support', 'API Access', 'Custom Training']
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-foreground via-foreground/95 to-foreground text-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,235,59,0.1),transparent_50%)]" />
        <div className="container mx-auto px-6 py-16 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="p-4 bg-primary/20 backdrop-blur-md rounded-3xl border border-primary/30">
                  <SettingsIcon className="h-12 w-12 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full animate-pulse" />
              </div>
              <div>
                <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-background via-primary to-warning bg-clip-text text-transparent">
                  Settings
                </h1>
                <p className="text-xl text-background/80">Customize your Recover Right experience</p>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="text-right">
                <div className="text-sm text-background/60">Current Plan</div>
                <div className="text-2xl font-bold text-primary">{subscription.plan}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-12 space-y-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Settings */}
          <div className="xl:col-span-3 space-y-8">
            {/* Profile Settings */}
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b border-border/50">
                <CardTitle className="flex items-center space-x-3">
                  <User className="h-6 w-6 text-primary" />
                  <span className="text-xl">Profile Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="flex items-start space-x-8">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-r from-primary to-warning rounded-2xl flex items-center justify-center shadow-lg">
                      <User className="h-12 w-12 text-primary-foreground" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-success rounded-full border-4 border-background flex items-center justify-center">
                      <Check className="h-4 w-4 text-success-foreground" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-semibold text-foreground">Full Name</Label>
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) => setProfile({...profile, name: e.target.value})}
                          className="h-12 border-border/50 focus:border-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-semibold text-foreground">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({...profile, email: e.target.value})}
                          className="h-12 border-border/50 focus:border-primary"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-sm font-semibold text-foreground">Company</Label>
                        <Input
                          id="company"
                          value={profile.company}
                          onChange={(e) => setProfile({...profile, company: e.target.value})}
                          className="h-12 border-border/50 focus:border-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role" className="text-sm font-semibold text-foreground">Role</Label>
                        <Input
                          id="role"
                          value={profile.role}
                          onChange={(e) => setProfile({...profile, role: e.target.value})}
                          className="h-12 border-border/50 focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Theme Settings */}
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b border-border/50">
                <CardTitle className="flex items-center space-x-3">
                  <Palette className="h-6 w-6 text-primary" />
                  <span className="text-xl">Theme Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <Label className="text-lg font-semibold mb-6 block">Choose Theme</Label>
                    <div className="grid grid-cols-3 gap-6">
                      {themeOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setTheme(option.value as any);
                            toast({
                              title: "Theme Updated",
                              description: `Switched to ${option.label} theme.`,
                            });
                          }}
                          className={`group p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                            theme === option.value
                              ? 'border-primary bg-primary/10 shadow-xl shadow-primary/20'
                              : 'border-border hover:border-primary/50 hover:shadow-lg'
                          }`}
                        >
                          <option.icon className={`h-10 w-10 mx-auto mb-4 ${
                            theme === option.value ? 'text-primary' : 'text-muted-foreground'
                          }`} />
                          <div className={`font-semibold text-lg ${
                            theme === option.value ? 'text-primary' : 'text-foreground'
                          }`}>
                            {option.label}
                          </div>
                          {theme === option.value && (
                            <div className="mt-2 text-xs text-primary font-medium">Active</div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b border-border/50">
                <CardTitle className="flex items-center space-x-3">
                  <Bell className="h-6 w-6 text-primary" />
                  <span className="text-xl">Notifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 rounded-xl border border-border/50 hover:border-primary/50 transition-colors">
                      <div className="space-y-1">
                        <div className="font-semibold text-lg capitalize">{key} Notifications</div>
                        <div className="text-sm text-muted-foreground">
                          Receive {key} notifications via {key === 'email' ? 'email' : key === 'push' ? 'browser' : 'system'}
                        </div>
                      </div>
                      <Switch
                        checked={value}
                        onCheckedChange={(checked) => handleNotificationChange(key, checked)}
                        className="data-[state=checked]:bg-primary"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Subscription Plan */}
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b border-border/50">
                <CardTitle className="flex items-center space-x-3">
                  <Crown className="h-6 w-6 text-primary" />
                  <span>Your Plan</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-warning rounded-2xl mb-4">
                    <Crown className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">{subscription.plan}</h3>
                  <p className="text-muted-foreground">Current Plan</p>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <Badge className="bg-success text-success-foreground">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Usage</span>
                    <span className="text-sm font-semibold">{subscription.usage} / {subscription.limit}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${(subscription.usage / subscription.limit) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Next Billing</span>
                    <span className="text-sm font-semibold">{subscription.nextBilling}</span>
                  </div>
                </div>
                <Button 
                  onClick={handleSubscriptionUpgrade}
                  className="w-full mt-6 bg-gradient-to-r from-primary to-warning text-primary-foreground hover:opacity-90"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Manage Billing
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b border-border/50">
                <CardTitle className="flex items-center space-x-3">
                  <Shield className="h-6 w-6 text-primary" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start h-12 border-border/50 hover:border-primary/50"
                  onClick={handleExportData}
                >
                  <Download className="h-4 w-4 mr-3" />
                  Export Data
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start h-12 border-border/50 hover:border-primary/50"
                  onClick={() => toast({ title: "API Keys", description: "Opening API management..." })}
                >
                  <Key className="h-4 w-4 mr-3" />
                  API Keys
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start h-12 border-border/50 hover:border-primary/50"
                  onClick={() => toast({ title: "Cache Reset", description: "Cache cleared successfully." })}
                >
                  <RefreshCw className="h-4 w-4 mr-3" />
                  Reset Cache
                </Button>
                <Separator className="my-4" />
                <Button 
                  variant="destructive" 
                  className="w-full justify-start h-12"
                  onClick={() => toast({ title: "Account Deletion", description: "Please contact support to delete your account.", variant: "destructive" })}
                >
                  <Trash2 className="h-4 w-4 mr-3" />
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Subscription Plans */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b border-border/50">
            <CardTitle className="flex items-center space-x-3">
              <CreditCard className="h-6 w-6 text-primary" />
              <span className="text-xl">Subscription Plans</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {subscriptionPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                    plan.current
                      ? 'border-primary bg-primary/5 shadow-xl shadow-primary/20'
                      : 'border-border hover:border-primary/50 hover:shadow-lg'
                  }`}
                >
                  {plan.current && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground px-4 py-1">Current Plan</Badge>
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-primary">{plan.price}</span>
                      <span className="text-muted-foreground ml-1">{plan.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      plan.current
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-gradient-to-r from-primary to-warning text-primary-foreground hover:opacity-90'
                    }`}
                    onClick={() => {
                      if (!plan.current) {
                        toast({
                          title: "Upgrade Plan",
                          description: `Upgrading to ${plan.name} plan...`,
                        });
                      }
                    }}
                    disabled={plan.current}
                  >
                    {plan.current ? 'Current Plan' : 'Upgrade'}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button 
            onClick={handleSaveSettings} 
            className="px-8 py-4 text-lg bg-gradient-to-r from-primary to-warning text-primary-foreground hover:opacity-90 shadow-lg"
          >
            <Save className="h-5 w-5 mr-3" />
            Save All Settings
          </Button>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
