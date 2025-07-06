
import React, { useState } from 'react';
import { MessageCircle, X, Send, Lightbulb } from 'lucide-react';

export const AssistantPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const tips = [
    "Always test contracts on testnets before mainnet deployment",
    "Use OpenZeppelin's battle-tested contract libraries",
    "Implement proper access controls for admin functions",
    "Consider gas optimization for frequently called functions"
  ];

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Assistant Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Lightbulb className="h-4 w-4" />
              </div>
              <div>
                <div className="font-semibold">Security Assistant</div>
                <div className="text-xs text-blue-200">Online</div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="h-80 flex flex-col">
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-sm font-medium text-blue-900 mb-1">Quick Tips</div>
                <div className="text-xs text-blue-700">
                  {tips[Math.floor(Math.random() * tips.length)]}
                </div>
              </div>
              
              <div className="bg-slate-50 p-3 rounded-lg">
                <div className="text-sm text-slate-900">
                  Welcome! I'm here to help you with smart contract security best practices. What would you like to know?
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-slate-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask about security..."
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button 
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={() => setMessage('')}
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
