import React from 'react';
import { ShieldAlert, Eye, Search, AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react';
import '../styles/components.css';

export const MisinformationGuide: React.FC = () => {
  const tips = [
    {
      icon: <Eye className="text-blue-400" size={24} />,
      title: "Check the Source",
      desc: "Is it a well-known, reputable news organization? Check the URL carefully for typos (e.g., .co instead of .com)."
    },
    {
      icon: <AlertTriangle className="text-rose-400" size={24} />,
      title: "Beware Emotional Language",
      desc: "Fake news often uses sensationalist language or ALL CAPS to trigger anger or fear and encourage sharing."
    },
    {
      icon: <Search className="text-emerald-400" size={24} />,
      title: "Verify the Claims",
      desc: "Do a quick web search. Are other credible news outlets reporting the same story? If not, be skeptical."
    },
    {
      icon: <CheckCircle className="text-indigo-400" size={24} />,
      title: "Use Fact-Checkers",
      desc: "Consult official fact-checking websites or the Election Commission's official channels for clarification."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/20 text-amber-500 mb-4 border border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
          <ShieldAlert size={32} />
        </div>
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-rose-400">
          Combating Misinformation
        </h2>
        <p className="text-slate-400 mt-3 max-w-2xl mx-auto">
          During elections, false information can spread rapidly online. Learn how to protect your vote by identifying fake news and verifying facts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tips.map((tip, index) => (
          <div key={index} className="glass-panel p-6 hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-slate-800/80 rounded-xl border border-white/5">
                {tip.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-slate-100">{tip.title}</h3>
                <p className="text-slate-400 leading-relaxed">{tip.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 glass-panel p-8 border-l-4 border-l-indigo-500 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-indigo-500/20 transition-colors duration-500"></div>
        
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            The Golden Rule
          </h3>
          <p className="text-xl text-slate-300 italic border-l-2 border-indigo-400/50 pl-4 py-2 mb-6">
            "If an article makes you extremely angry, very scared, or seems too good to be true, pause before you share it."
          </p>
          
          <button className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
            Visit Official Fact-Checking Portal <ExternalLink size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
