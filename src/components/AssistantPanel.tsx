
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Lightbulb, Bot, User, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const AssistantPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Welcome! I\'m your smart contract security assistant. I can help you with vulnerability analysis, gas optimization tips, and best practices. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const tips = [
    "Always test contracts on testnets before mainnet deployment",
    "Use OpenZeppelin's battle-tested contract libraries",
    "Implement proper access controls for admin functions",
    "Consider gas optimization for frequently called functions",
    "Use events for important state changes",
    "Validate all external inputs and handle edge cases",
    "Implement circuit breakers for emergency situations",
    "Use multi-signature wallets for critical operations"
  ];

  const quickQuestions = [
    "How can I prevent reentrancy attacks?",
    "What are the best gas optimization techniques?",
    "How to implement proper access controls?",
    "What security tools should I use?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses: { [key: string]: string } = {
        'reentrancy': 'To prevent reentrancy attacks: 1) Use the Checks-Effects-Interactions pattern, 2) Implement OpenZeppelin\'s ReentrancyGuard modifier, 3) Update state before external calls, 4) Consider using pull payment patterns.',
        'gas': 'Gas optimization techniques: 1) Use `unchecked` blocks for safe arithmetic, 2) Pack structs efficiently, 3) Cache array lengths in loops, 4) Use custom errors instead of strings, 5) Optimize storage layout.',
        'access': 'Implement access controls with: 1) OpenZeppelin\'s Ownable/AccessControl, 2) Role-based permissions, 3) Multi-signature requirements, 4) Time-locked functions for critical operations.',
        'tools': 'Essential security tools: 1) Slither for static analysis, 2) Mythril for symbolic execution, 3) Hardhat for testing, 4) OpenZeppelin Defender for monitoring, 5) Tenderly for simulation.',
        'default': 'I can help you with smart contract security, gas optimization, and best practices. Try asking about specific vulnerabilities, optimization techniques, or security tools!'
      };

      let response = responses.default;
      const lowerMessage = message.toLowerCase();
      
      if (lowerMessage.includes('reentrancy')) response = responses.reentrancy;
      else if (lowerMessage.includes('gas') || lowerMessage.includes('optimization')) response = responses.gas;
      else if (lowerMessage.includes('access') || lowerMessage.includes('control')) response = responses.access;
      else if (lowerMessage.includes('tool') || lowerMessage.includes('security')) response = responses.tools;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    setMessage(question);
    sendMessage();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 z-50 group"
      >
        <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
        <div className="absolute -top-2 -right-2 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
      </button>

      {/* Assistant Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold flex items-center space-x-2">
                  <span>Security Assistant</span>
                  <Sparkles className="h-4 w-4 text-yellow-300" />
                </div>
                <div className="text-xs text-blue-200 flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Online & Ready to Help</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="h-96 flex flex-col">
            {/* Messages */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs px-4 py-2 rounded-2xl ${
                    msg.type === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-100 text-slate-900'
                  }`}>
                    <div className="flex items-start space-x-2">
                      {msg.type === 'assistant' && (
                        <Bot className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <div className="text-sm">{msg.content}</div>
                        <div className={`text-xs mt-1 ${
                          msg.type === 'user' ? 'text-blue-200' : 'text-slate-500'
                        }`}>
                          {formatTime(msg.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 px-4 py-2 rounded-2xl">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 text-blue-600" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <div className="text-xs text-slate-500 mb-2">Quick questions:</div>
                <div className="space-y-1">
                  {quickQuestions.slice(0, 2).map((question, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickQuestion(question)}
                      className="w-full text-left text-xs bg-blue-50 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Daily Tip */}
            <div className="px-4 pb-2">
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-3 rounded-lg border border-yellow-200">
                <div className="flex items-center space-x-2 mb-1">
                  <Lightbulb className="h-4 w-4 text-yellow-600" />
                  <span className="text-xs font-medium text-yellow-800">Daily Security Tip</span>
                </div>
                <div className="text-xs text-yellow-700">
                  {tips[Math.floor(Math.random() * tips.length)]}
                </div>
              </div>
            </div>
            
            {/* Input */}
            <div className="p-4 border-t border-slate-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask about security, gas optimization..."
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isTyping}
                />
                <button 
                  onClick={sendMessage}
                  disabled={isTyping || !message.trim()}
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
