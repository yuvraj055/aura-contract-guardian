
import React from 'react';
import { Navigation } from '../components/Navigation';
import { DashboardHeader } from '../components/DashboardHeader';
import { Shield, Wand2, Activity, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const modules = [
    {
      title: 'Smart Contract Auditor',
      description: 'Deep security analysis with vulnerability detection and auto-fix suggestions',
      icon: Shield,
      color: 'blue',
      path: '/auditor',
      features: ['Static Analysis', 'Vulnerability Detection', 'Auto-fix Suggestions', 'Detailed Reports']
    },
    {
      title: 'AI Contract Generator',
      description: 'Create professional smart contracts with guided wizard and live preview',
      icon: Wand2,
      color: 'purple',
      path: '/generator',
      features: ['Guided Wizard', 'Live Preview', 'Deploy to Testnet', 'Multiple Templates']
    },
    {
      title: 'Gas Simulator & Optimizer',
      description: 'Optimize gas usage and simulate contract execution scenarios',
      icon: Activity,
      color: 'green',
      path: '/simulator',
      features: ['Gas Estimation', 'Optimization Tips', 'Scenario Testing', 'Cost Analysis']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      <DashboardHeader />
      
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Choose Your Security Tool</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Select from our comprehensive suite of smart contract security tools designed for developers and security professionals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {modules.map((module, index) => (
            <Link
              key={index}
              to={module.path}
              className="group bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`p-6 bg-gradient-to-r ${
                module.color === 'blue' ? 'from-blue-50 to-blue-100' :
                module.color === 'purple' ? 'from-purple-50 to-purple-100' :
                'from-green-50 to-green-100'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${
                    module.color === 'blue' ? 'bg-blue-600' :
                    module.color === 'purple' ? 'bg-purple-600' :
                    'bg-green-600'
                  }`}>
                    <module.icon className="h-6 w-6 text-white" />
                  </div>
                  <ArrowRight className={`h-5 w-5 transition-transform group-hover:translate-x-1 ${
                    module.color === 'blue' ? 'text-blue-600' :
                    module.color === 'purple' ? 'text-purple-600' :
                    'text-green-600'
                  }`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{module.title}</h3>
                <p className="text-slate-600 mb-4">{module.description}</p>
                <div className="flex flex-wrap gap-2">
                  {module.features.map((feature, idx) => (
                    <span key={idx} className="text-xs bg-white/60 text-slate-700 px-2 py-1 rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-6">
                <button className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                  module.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700 text-white' :
                  module.color === 'purple' ? 'bg-purple-600 hover:bg-purple-700 text-white' :
                  'bg-green-600 hover:bg-green-700 text-white'
                }`}>
                  Launch {module.title}
                </button>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Stats or additional content */}
        <div className="text-center py-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            RR Verified Platform - Trusted by 10,000+ developers
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
