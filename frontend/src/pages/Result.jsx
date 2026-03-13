import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { score, total, category, difficulty, userAnswers } = location.state || { 
    score: 0, 
    total: 0, 
    category: 'Unknown', 
    difficulty: 'Easy',
    userAnswers: [] 
  };
  
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  useEffect(() => {
    const saveProgress = async () => {
      if (user && user.token && total > 0) {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
          await axios.put('https://smart-interview-portal.onrender.com/api/auth/stats', { 
            solvedCount: total, 
            accuracy: percentage 
          }, config);
        } catch (error) {
          console.error('Failed to save progress', error);
        }
      }
    };

    saveProgress();
  }, [user, total, percentage]);
  
  let feedback = {
    message: 'Needs Improvement',
    description: 'Keep practicing! Review the concepts you missed to improve your performance and conquer future challenges.',
    icon: 'sentiment_dissatisfied',
    color: 'text-accent',
    bg: 'bg-accent/10',
    border: 'border-accent/20'
  };

  if (percentage >= 80) {
    feedback = {
      message: 'Excellent Performance!',
      description: 'Masterful work! You have a solid grasp of these concepts and are well on your way to interview success.',
      icon: 'military_tech',
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20'
    };
  } else if (percentage >= 60) {
    feedback = {
      message: 'Great Effort!',
      description: 'You did well! A bit more practice and you will be a true expert in this category.',
      icon: 'thumb_up',
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20'
    };
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-fade-in text-center pb-24 mt-12 relative">
       {/* Background Aesthetics */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-primary/10 blur-[120px] rounded-full -z-10"></div>
      
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface border border-border/50 text-text-muted text-[10px] font-black uppercase tracking-[0.3em]">
           Mission Debriefing
        </div>
        <h1 className="text-5xl font-outfit font-black mb-2 bg-gradient-to-r from-text-main to-text-muted bg-clip-text text-transparent">Assessment Complete</h1>
        <p className="text-text-muted text-lg uppercase tracking-[0.5em] font-black opacity-60">
          {category} Track // {difficulty} Tier
        </p>
      </header>

      <div className={`glass-card p-12 md:p-16 relative overflow-hidden border-2 bg-surface/40 hover:bg-surface/60 transition-colors shadow-2xl ${feedback.border}`}>
        {/* Cinematic Backdrop */}
        <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[100px] opacity-20 ${feedback.bg}`}></div>
        
        <div className="relative w-64 h-64 mx-auto mb-12 flex items-center justify-center group">
            <div className={`absolute inset-0 rounded-full border-2 border-dashed ${feedback.border} animate-spin-slow opacity-30`}></div>
            <svg className="w-full h-full transform -rotate-90 filter drop-shadow-[0_0_15px_rgba(0,0,0,0.2)]">
                <circle
                    cx="128"
                    cy="128"
                    r="115"
                    stroke="var(--background)"
                    strokeWidth="16"
                    fill="transparent"
                />
                <circle
                    cx="128"
                    cy="128"
                    r="115"
                    stroke="currentColor"
                    strokeWidth="16"
                    fill="transparent"
                    strokeDasharray={722}
                    strokeDashoffset={722 - (722 * percentage) / 100}
                    strokeLinecap="round"
                    className={`${feedback.color} transition-all duration-[1500ms] cubic-bezier(0.4,0,0.2,1)`}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-7xl font-black text-text-main group-hover:scale-110 transition-transform duration-500">{percentage}%</span>
                <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] mt-1">Accuracy Index</span>
            </div>
        </div>

        <div className={`inline-flex p-5 rounded-[2rem] ${feedback.bg} ${feedback.color} mb-8 shadow-inner`}>
           <span className="material-symbols-outlined text-6xl font-black">{feedback.icon}</span>
        </div>
        
        <h2 className={`text-5xl font-outfit font-black mb-6 ${feedback.color} tracking-tighter`}>{feedback.message}</h2>
        <p className="text-text-muted text-xl max-w-2xl mx-auto mb-14 leading-relaxed font-bold opacity-80 italic">
          "{feedback.description}"
        </p>

        <div className="grid grid-cols-2 gap-8 max-w-xl mx-auto">
          <div className="p-8 bg-background/50 rounded-[2.5rem] border border-border group hover:border-emerald-500/50 transition-all shadow-xl">
            <p className="text-[10px] font-black text-text-muted uppercase mb-2 tracking-widest">Successful Pulses</p>
            <h3 className="text-5xl font-black text-emerald-500 group-hover:scale-110 transition-transform">{score}</h3>
            <div className="mt-4 w-12 h-1 bg-emerald-500/20 rounded-full mx-auto"></div>
          </div>
          <div className="p-8 bg-background/50 rounded-[2.5rem] border border-border group hover:border-accent/50 transition-all shadow-xl">
            <p className="text-[10px] font-black text-text-muted uppercase mb-2 tracking-widest">Failed Attempts</p>
            <h3 className="text-5xl font-black text-accent group-hover:scale-110 transition-transform">{total - score}</h3>
            <div className="mt-4 w-12 h-1 bg-accent/20 rounded-full mx-auto"></div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-10">
        <button 
          onClick={() => navigate('/dashboard')}
          className="group flex items-center gap-4 text-text-muted hover:text-text-main transition-all font-black text-sm uppercase tracking-[0.3em]"
        >
          <span className="material-symbols-outlined p-3 bg-surface rounded-2xl border border-border group-hover:border-primary transition-all">home</span>
          Dashboard
        </button>
        
        <button 
          onClick={() => navigate(-1)}
          className="premium-btn px-20 py-7 shadow-2xl shadow-primary/40 relative group overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-4">
            Initialize Retry Sequence
            <span className="material-symbols-outlined font-black text-2xl group-hover:rotate-180 transition-transform duration-500">refresh</span>
          </span>
        </button>
      </div>

      {userAnswers && userAnswers.length > 0 && (
        <div className="mt-20 space-y-8 text-left max-w-4xl mx-auto">
          <h2 className="text-3xl font-outfit font-black mb-10 text-center">Detailed Solutions</h2>
          <div className="grid gap-6">
            {userAnswers.map((ans, idx) => (
              <div key={idx} className={`glass-card p-10 relative overflow-hidden border-l-8 ${ans.isCorrect ? 'border-l-emerald-500' : 'border-l-accent'}`}>
                <div className="flex justify-between items-start mb-6">
                    <h4 className="text-xl font-bold flex-1">{ans.question}</h4>
                    <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full whitespace-nowrap ml-4 border ${ans.isCorrect ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-accent/10 text-accent border-accent/20'}`}>
                      {ans.isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className={`p-5 rounded-2xl border-2 ${ans.selected === ans.correct ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-accent/20 bg-accent/5'}`}>
                    <p className="text-[10px] font-black uppercase text-text-muted mb-2 tracking-widest">Your Answer</p>
                    <p className={`text-lg font-bold ${ans.selected === ans.correct ? 'text-emerald-500' : 'text-accent'}`}>{ans.selected || 'No answer'}</p>
                  </div>
                  <div className="p-5 rounded-2xl border-2 border-emerald-500/20 bg-emerald-500/5">
                    <p className="text-[10px] font-black uppercase text-emerald-500 mb-2 tracking-widest">Correct Answer</p>
                    <p className="text-lg font-bold text-emerald-500">{ans.correct}</p>
                  </div>
                </div>

                <div className="p-6 bg-surface rounded-2xl border border-border">
                    <p className="text-[10px] font-black uppercase text-text-muted mb-2 tracking-widest">Expert Explanation</p>
                    <p className="text-text-muted leading-relaxed font-medium">{ans.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;
