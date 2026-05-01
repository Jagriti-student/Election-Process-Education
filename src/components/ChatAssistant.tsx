import React, { useState, useEffect, useRef } from 'react';
import { Bot, User, Send, ArrowRight, Loader2 } from 'lucide-react';
import { getGeminiResponse } from '../services/GeminiService';
import type { UserProfile, ChatMessage } from '../types';
import '../styles/components.css';

interface ChatAssistantProps {
  onNavigate: (mode: string) => void;
  userProfile?: UserProfile;
}

export const ChatAssistant: React.FC<ChatAssistantProps> = ({ onNavigate, userProfile }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Ref to store conversation history for Gemini
  const chatHistory = useRef<{ role: string, parts: { text: string }[] }[]>([]);

  const userName = userProfile?.isFirstTimeVoter ? "First-time Voter" : "Citizen";

  useEffect(() => {
    // Initial greeting
    const greeting = `Welcome ${userName}! I can help you understand elections in a simple way 😊\nWhat would you like to learn?`;
    setMessages([
      {
        id: '1',
        sender: 'ai',
        text: greeting,
        options: [
          { id: 'opt1', text: '1. Full Election Process', action: () => handleOptionSelect('timeline', 'Full Election Process') },
          { id: 'opt2', text: '2. Voting Simulation', action: () => handleOptionSelect('simulation', 'Voting Simulation') },
          { id: 'opt3', text: '3. Quiz Mode', action: () => handleOptionSelect('quiz', 'Quiz Mode') },
          { id: 'opt4', text: '4. Identify Fake News', action: () => handleOptionSelect('misinformation', 'Identify Fake News') },
        ]
      }
    ]);
    
    chatHistory.current = [];
  }, [userName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleOptionSelect = (targetMode: string, text: string) => {
    // Add user message
    const userMsg: ChatMessage = { id: Date.now().toString(), sender: 'user', text: `I want to try: ${text}` };
    setMessages(prev => [...prev, userMsg]);
    
    // Simulate AI response for navigation
    setTimeout(() => {
      const aiMsg: ChatMessage = { 
        id: (Date.now() + 1).toString(), 
        sender: 'ai', 
        text: `Great choice! Navigating to the ${text} now...` 
      };
      setMessages(prev => [...prev, aiMsg]);
      
      setTimeout(() => {
        onNavigate(targetMode);
      }, 1000);
    }, 600);
  };

  const handleSendMessage = async () => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isLoading) return;
    
    // Security: Simple input sanitization to prevent XSS
    const sanitizedInput = trimmedInput.replace(/<[^>]*>?/gm, '');
    
    const userMsg: ChatMessage = { id: Date.now().toString(), sender: 'user', text: sanitizedInput };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Instant navigation check for better UX
    const lowerInput = sanitizedInput.toLowerCase();
    let navigated = false;
    if (lowerInput.includes('quiz') || lowerInput.includes('test')) {
      setTimeout(() => onNavigate('quiz'), 1000);
      navigated = true;
    } else if (lowerInput.includes('vote') || lowerInput.includes('simulation') || lowerInput.includes('machine')) {
      setTimeout(() => onNavigate('simulation'), 1000);
      navigated = true;
    } else if (lowerInput.includes('process') || lowerInput.includes('steps') || lowerInput.includes('timeline')) {
      setTimeout(() => onNavigate('timeline'), 1000);
      navigated = true;
    } else if (lowerInput.includes('fake') || lowerInput.includes('news') || lowerInput.includes('fact')) {
      setTimeout(() => onNavigate('misinformation'), 1000);
      navigated = true;
    }

    setIsLoading(true);

    // Update history for Gemini
    const history = [...chatHistory.current];
    
    // Get real AI response from Gemini
    const aiResponseText = await getGeminiResponse(sanitizedInput, history);
    
    const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), sender: 'ai', text: aiResponseText };
    setMessages(prev => [...prev, aiMsg]);
    
    // Update history
    chatHistory.current.push({ role: "user", parts: [{ text: sanitizedInput }] });
    chatHistory.current.push({ role: "model", parts: [{ text: aiResponseText }] });
    
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container glass-panel flex flex-col h-full" role="log" aria-live="polite">
      <div className="chat-header p-4 border-b border-white/10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
          <Bot className="text-indigo-400" aria-hidden="true" />
        </div>
        <div>
          <h3 className="font-semibold">Election Assistant</h3>
          <span className="text-xs text-emerald-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Online
          </span>
        </div>
      </div>

      <div className="chat-messages flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-start gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
              msg.sender === 'user' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-800 text-slate-400'
            }`}>
              {msg.sender === 'user' ? <User size={14} aria-hidden="true" /> : <Bot size={14} aria-hidden="true" />}
            </div>
            <div className={`max-w-[80%] rounded-2xl p-4 ${
              msg.sender === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-sm' 
                : 'bg-slate-800 border border-white/10 rounded-tl-sm'
            }`}>
              <p className="whitespace-pre-line text-sm">{msg.text}</p>
              
              {msg.options && (
                <div className="mt-4 space-y-2">
                  {msg.options.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={opt.action}
                      aria-label={`Select option: ${opt.text}`}
                      className="w-full text-left px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-between group"
                    >
                      <span className="text-xs font-medium">{opt.text}</span>
                      <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-slate-500 text-xs pl-10">
            <Loader2 size={12} className="animate-spin" />
            Assistant is thinking...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input p-4 border-t border-white/10">
        <div className="relative flex items-center">
          <input 
            type="text" 
            placeholder="Ask me anything..." 
            aria-label="Chat input"
            className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:border-indigo-500 transition-colors"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <button 
            className="absolute right-2 p-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg transition-colors disabled:opacity-50" 
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
