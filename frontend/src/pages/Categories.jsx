import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const navigate = useNavigate();

  const languages = [
    { id: 'java', name: 'Java', icon: 'coffee', problems: 300, color: 'text-[#f89820]', bg: 'bg-[#f89820]/10', border: 'border-[#f89820]/30' },
    { id: 'python', name: 'Python', icon: 'settings_b_roll', problems: 300, color: 'text-[#3776ab]', bg: 'bg-[#3776ab]/10', border: 'border-[#3776ab]/30' },
    { id: 'cpp', name: 'C++', icon: 'data_object', problems: 300, color: 'text-[#00599c]', bg: 'bg-[#00599c]/10', border: 'border-[#00599c]/30' },
    { id: 'c', name: 'C', icon: 'integration_instructions', problems: 300, color: 'text-[#a8b9cc]', bg: 'bg-[#a8b9cc]/10', border: 'border-[#a8b9cc]/30' },
    { id: 'javascript', name: 'JavaScript', icon: 'javascript', problems: 300, color: 'text-[#f7df1e]', bg: 'bg-[#f7df1e]/10', border: 'border-[#f7df1e]/30' },
    { id: 'sql', name: 'SQL', icon: 'database', problems: 300, color: 'text-[#336791]', bg: 'bg-[#336791]/10', border: 'border-[#336791]/30' },
  ];

  const difficulties = [
    { level: 'Easy', questions: 10, time: '10 mins', color: 'text-emerald-500', border: 'border-emerald-500/50', bg: 'bg-emerald-500/10', desc: 'Core Syntax, Basic Logic & Foundation' },
    { level: 'Medium', questions: 10, time: '15 mins', color: 'text-amber-500', border: 'border-amber-500/50', bg: 'bg-amber-500/10', desc: 'Complex Logic, Algorithms & Data Structures' },
    { level: 'Hard', questions: 10, time: '20 mins', color: 'text-rose-500', border: 'border-rose-500/50', bg: 'bg-rose-500/10', desc: 'Expert Architecture & High-Scale Optimization' },
  ];

  const handleLanguageSelect = (lang) => {
    setSelectedLanguage(lang);
  };

  const startPractice = (level) => {
    navigate(`/practice?category=${selectedLanguage.id}&difficulty=${level.level}`);
  };

  return (
    <div className="space-y-16 animate-fade-in pb-24 relative">
       {/* Background Gradients */}
       <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-primary/5 blur-[200px] rounded-full -z-10"></div>

      {!selectedLanguage ? (
        <>
          <header className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight text-text-main">
              Programming <span className="text-primary">Languages</span>
            </h1>
            <p className="text-text-muted text-lg max-w-2xl font-medium">
              Select a language to begin your technical practice and master core concepts.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {languages.map((lang) => (
              <div
                key={lang.id}
                className="glass-card p-10 flex flex-col items-center text-center cursor-pointer group hover:border-primary transition-all border-border relative overflow-hidden"
                onClick={() => handleLanguageSelect(lang)}
              >
                <div className={`w-20 h-20 rounded-2xl ${lang.bg} ${lang.color} flex items-center justify-center mb-6`}>
                  <span className="material-symbols-outlined text-4xl">{lang.icon}</span>
                </div>

                <h3 className="text-2xl font-bold mb-2 text-text-main">{lang.name}</h3>
                <p className="text-sm text-text-muted font-bold tracking-wider mb-6">
                  {lang.problems} Practice Modules
                </p>
                
                <div className="w-full h-1 bg-border rounded-full overflow-hidden">
                   <div className="h-full bg-primary" style={{ width: '40%' }}></div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12 p-8 glass-card border-primary/20 bg-primary/5 shadow-sm">
            <button
              onClick={() => setSelectedLanguage(null)}
              className="p-4 rounded-xl border border-border hover:border-primary hover:bg-primary hover:text-white transition-all text-text-muted"
            >
              <span className="material-symbols-outlined font-bold">arrow_back</span>
            </button>
            <div className="space-y-1">
               <h1 className="text-4xl font-bold tracking-tight">
                  Selected: <span className="text-primary">{selectedLanguage.name}</span>
               </h1>
               <p className="text-text-muted font-medium">
                  Adjust difficulty to baseline your current technical level.
               </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

                <p className="text-text-muted mb-10 text-lg font-medium leading-relaxed">
                  {level.desc}
                </p>
                
                <div className="bg-background p-6 rounded-2xl mb-8 flex justify-between items-center border border-border group-hover:border-primary/20 transition-all">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase text-text-muted tracking-widest mb-1">Questions</span>
                    <span className="text-4xl font-bold text-text-main">{level.questions}</span>
                  </div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-surface border border-border ${level.color}`}>
                     <span className="material-symbols-outlined text-2xl">architecture</span>
                  </div>
                </div>

                <button
                  onClick={() => startPractice(level)}
                  className="premium-btn w-full py-4 text-sm font-bold uppercase tracking-widest"
                >
                  Start Assessment
                  <span className="material-symbols-outlined text-lg">play_arrow</span>
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Categories;
