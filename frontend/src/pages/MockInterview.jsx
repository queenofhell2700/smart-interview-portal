import React from 'react';
import { useNavigate } from 'react-router-dom';

const MockInterview = () => {
  const navigate = useNavigate();

  const difficulties = [
    { level: 'Easy', time: '30 mins', color: 'text-emerald-500', border: 'border-emerald-500', bg: 'bg-emerald-500/10', desc: 'Foundational mock interviews for beginners.' },
    { level: 'Medium', time: '45 mins', color: 'text-amber-500', border: 'border-amber-500', bg: 'bg-amber-500/10', desc: 'Standard technical and behavioral rounds.' },
    { level: 'Hard', time: '60 mins', color: 'text-accent', border: 'border-accent', bg: 'bg-accent/10', desc: 'Intensive FAANG-level mock simulations.' },
  ];

  const startPractice = (level) => {
    navigate(`/practice?category=mock interview&difficulty=${level.level}`);
  };

  return (
    <div className="space-y-12 animate-fade-in pb-24 relative">
       {/* Background Gradients */}
       <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10 animate-pulse"></div>

      <header className="space-y-4">
        <h1 className="text-5xl font-bold tracking-tight text-text-main">
          Mock <span className="text-primary">Interviews</span>
        </h1>
        <p className="text-text-muted text-lg max-w-2xl font-medium">
          Scale your performance through realistic interview simulations designed to test technical and behavioral skills.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {difficulties.map((level) => (
          <div key={level.level} className="glass-card p-10 flex flex-col group hover:border-primary/50 transition-all border-border relative">
            <div className={`absolute top-0 left-0 w-full h-1 bg-current ${level.color}`}></div>
            
            <div className="flex justify-between items-start mb-8">
              <h3 className={`text-4xl font-bold ${level.color}`}>{level.level}</h3>
              <div className="px-3 py-1 bg-surface border border-border rounded-lg text-text-main flex items-center gap-2 font-bold text-[10px] uppercase tracking-wider">
                <span className={`material-symbols-outlined text-sm ${level.color}`}>timer</span>
                {level.time}
              </div>
            </div>

            <p className="text-text-muted mb-10 text-lg font-medium leading-relaxed min-h-[4rem]">
              {level.desc}
            </p>
            
            <div className="bg-background p-6 rounded-2xl mb-8 flex justify-between items-center border border-border group-hover:border-primary/20 transition-all">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase text-text-muted tracking-widest mb-1">Questions</span>
                <span className="text-4xl font-bold text-text-main">100</span>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-surface border border-border ${level.color}`}>
                 <span className="material-symbols-outlined text-2xl">record_voice_over</span>
              </div>
            </div>

            <button
              onClick={() => startPractice(level)}
              className="premium-btn w-full py-4 text-sm font-bold uppercase tracking-widest"
            >
              Start Simulation
              <span className="material-symbols-outlined text-lg">play_arrow</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MockInterview;
