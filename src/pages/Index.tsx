
import React from 'react';
import { Navigation } from '../components/Navigation';
import { DashboardHeader } from '../components/DashboardHeader';
import { AuditorCard } from '../components/AuditorCard';
import { GeneratorCard } from '../components/GeneratorCard';
import { SimulatorCard } from '../components/SimulatorCard';
import { AssistantPanel } from '../components/AssistantPanel';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      <DashboardHeader />
      
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          <AuditorCard />
          <GeneratorCard />
          <SimulatorCard />
        </div>
        
        {/* Stats or additional content could go here */}
        <div className="text-center py-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            RR Verified Platform - Trusted by 10,000+ developers
          </div>
        </div>
      </main>
      
      <AssistantPanel />
    </div>
  );
};

export default Index;
