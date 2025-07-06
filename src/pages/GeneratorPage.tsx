
import React from 'react';
import { Navigation } from '../components/Navigation';
import { GeneratorCard } from '../components/GeneratorCard';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const GeneratorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">AI Contract Generator</h1>
          <p className="text-slate-600">Create professional smart contracts with guided assistance</p>
        </div>
        
        <GeneratorCard />
      </div>
    </div>
  );
};

export default GeneratorPage;
