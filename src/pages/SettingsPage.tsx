
import React, { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Switch } from '../components/ui/switch';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
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
  Settings as SettingsIcon
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const SettingsPage = () => {
  const { theme, setTheme } = useTheme();
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

  const handleSaveSettings = () => {
    console.log('Settings saved:', { theme, notifications, profile });
  };

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <div className="bg-gradient-to-br from-foreground via-foreground/95 to-foreground text-background">
        <div className="container mx-auto px-6 py-16">
          <div className="flex items-center space-x-6">
            <div className="p-4 bg-primary/20 backdrop-blur-md rounded-3xl border border-primary/30">
              <SettingsIcon className="h-12 w-12 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Settings</h1>
              <p className="text-lg text-background/80">Customize your Recover Right experience</p>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-12 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Settings */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
                <CardTitle className="flex items-center space-x-3">
                  <User className="h-6 w-6 text-primary" />
                  <span>Profile Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-primary to-warning rounded-full flex items-center justify-center">
                    <User className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) => setProfile({...profile, name: e.target.value})}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({...profile, email: e.target.value})}
                          className="mt-2"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          value={profile.company}
                          onChange={(e) => setProfile({...profile, company: e.target.value})}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="role">Role</Label>
                        <Input
                          id="role"
                          value={profile.role}
                          onChange={(e) => setProfile({...profile, role: e.target.value})}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Theme Settings */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
                <CardTitle className="flex items-center space-x-3">
                  <Palette className="h-6 w-6 text-primary" />
                  <span>Theme Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <Label className="text-base font-semibold mb-4 block">Choose Theme</Label>
                    <div className="grid grid-cols-3 gap-4">
                      {themeOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setTheme(option.value as any)}
                          className={`p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                            theme === option.value
                              ? 'border-primary bg-primary/10 shadow-lg'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <option.icon className={`h-8 w-8 mx-auto mb-3 ${
                            theme === option.value ? 'text-primary' : 'text-muted-foreground'
                          }`} />
                          <div className={`font-medium ${
                            theme === option.value ? 'text-primary' : 'text-foreground'
                          }`}>
                            {option.label}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
                <CardTitle className="flex items-center space-x-3">
                  <Bell className="h-6 w-6 text-primary" />
                  <span>Notifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between py-3">
                    <div>
                      <div className="font-medium capitalize">{key} Notifications</div>
                      <div className="text-sm text-muted-foreground">
                        Receive {key} notifications via {key === 'email' ? 'email' : key === 'push' ? 'browser' : 'system'}
                      </div>
                    </div>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, [key]: checked})
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Company Branding & Quick Actions */}
          <div className="space-y-8">
            {/* Company Card */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <img
                    src={theme === 'dark' ? '/lovable-uploads/1ba3cc55-41ab-4665-8b60-eb38c610525a.png' : '/lovable-uploads/58692659-657a-43cf-a759-aa079b070b74.png'}
                    alt="Recover Right Logo"
                    className="w-24 h-24 mx-auto mb-4 object-contain"
                  />
                  <h3 className="text-2xl font-bold text-foreground">Recover Right</h3>
                  <p className="text-muted-foreground mt-2">Smart Contract Security Platform</p>
                </div>
                <Separator className="my-6" />
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Plan</span>
                    <Badge className="bg-primary text-primary-foreground">Pro</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Usage</span>
                    <span className="text-sm font-medium">847 / 1000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Renewal</span>
                    <span className="text-sm">Jan 15, 2025</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Shield className="h-6 w-6 text-primary" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-3" />
                  Export Data
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Key className="h-4 w-4 mr-3" />
                  API Keys
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <RefreshCw className="h-4 w-4 mr-3" />
                  Reset Cache
                </Button>
                <Separator />
                <Button variant="destructive" className="w-full justify-start">
                  <Trash2 className="h-4 w-4 mr-3" />
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSaveSettings} className="px-8 py-3">
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
