
import { useState, useEffect } from 'react';

interface DashboardStats {
  contractsAudited: number;
  vulnerabilitiesFound: number;
  gasOptimization: number;
  activeUsers: number;
  uptime: number;
  totalSaved: number;
}

interface RealtimeActivity {
  id: string;
  type: 'audit' | 'vulnerability' | 'optimization' | 'deployment';
  message: string;
  timestamp: Date;
  severity?: 'low' | 'medium' | 'high';
}

export const useRealTimeUpdates = () => {
  const [stats, setStats] = useState<DashboardStats>({
    contractsAudited: 1247,
    vulnerabilitiesFound: 532,
    gasOptimization: 23.4,
    activeUsers: 156,
    uptime: 99.9,
    totalSaved: 2.4
  });

  const [activities, setActivities] = useState<RealtimeActivity[]>([]);
  const [isConnected, setIsConnected] = useState(true);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update stats randomly
      setStats(prev => ({
        ...prev,
        contractsAudited: prev.contractsAudited + Math.floor(Math.random() * 3),
        vulnerabilitiesFound: prev.vulnerabilitiesFound + (Math.random() > 0.8 ? 1 : 0),
        gasOptimization: Math.min(35, prev.gasOptimization + Math.random() * 0.2),
        activeUsers: 140 + Math.floor(Math.random() * 30),
        totalSaved: prev.totalSaved + Math.random() * 0.1
      }));

      // Add new activity
      if (Math.random() > 0.6) {
        const activityTypes = [
          { type: 'audit' as const, message: 'New contract audit completed', severity: undefined },
          { type: 'vulnerability' as const, message: 'Critical vulnerability detected', severity: 'high' as const },
          { type: 'optimization' as const, message: 'Gas optimization applied', severity: 'low' as const },
          { type: 'deployment' as const, message: 'Contract deployed to mainnet', severity: undefined }
        ];

        const randomActivity = activityTypes[Math.floor(Math.random() * activityTypes.length)];
        const newActivity: RealtimeActivity = {
          id: Date.now().toString(),
          ...randomActivity,
          timestamp: new Date()
        };

        setActivities(prev => [newActivity, ...prev.slice(0, 9)]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return {
    stats,
    activities,
    isConnected
  };
};
