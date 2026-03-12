const Badges = () => {
  const badges = [
    { title: 'Code Warrior', desc: 'Solved 100+ programming challenges.', icon: 'shield', color: 'text-amber-500', bg: 'bg-amber-500/10', glow: 'shadow-amber-500/20' },
    { title: 'Logical Master', desc: 'Completed 50+ Aptitude quizzes.', icon: 'auto_awesome', color: 'text-blue-500', bg: 'bg-blue-500/10', glow: 'shadow-blue-500/20' },
    { title: 'Streak Master', desc: '7 days consecutive practice.', icon: 'local_fire_department', color: 'text-orange-500', bg: 'bg-orange-500/10', glow: 'shadow-orange-500/20' },
    { title: 'Top Performer', desc: 'Maintain 90%+ accuracy for 10 sessions.', icon: 'military_tech', color: 'text-emerald-500', bg: 'bg-emerald-500/10', glow: 'shadow-emerald-500/20' },
    { title: 'Knowledge Hunter', desc: 'Attempted questions from 5+ categories.', icon: 'emoji_events', color: 'text-purple-500', bg: 'bg-purple-500/10', glow: 'shadow-purple-500/20' },
    { title: 'Silent Hero', desc: 'First soft skills challenge completed.', icon: 'verified', color: 'text-slate-500', bg: 'bg-slate-500/10', glow: 'shadow-slate-500/20' },
  ];

  return (
    <div className="space-y-12 animate-fade-in pb-24 relative">
       {/* Cinematic Background */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-primary/5 blur-[150px] rounded-full -z-10"></div>
       
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface border border-border/50 text-text-muted text-[10px] font-black uppercase tracking-[0.3em]">
           Achievements Track
        </div>
        <h1 className="text-5xl font-outfit font-black mb-2 bg-gradient-to-r from-text-main to-text-muted bg-clip-text text-transparent">Quantum Badges</h1>
        <p className="text-text-muted text-lg font-medium max-w-2xl">Unlock legendary certifications and digital trophies by mastering critical interview vectors.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
        {badges.map((badge, idx) => (
          <div key={idx} className="glass-card p-12 flex flex-col items-center text-center group hover:translate-y-[-12px] transition-all duration-500 border-white/5 shadow-2xl relative overflow-hidden">
             <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${badge.color.replace('text-', 'from-')}/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700`}></div>
             
             <div className={`w-32 h-32 rounded-[3.5rem] ${badge.bg} ${badge.color} flex items-center justify-center mb-10 rotate-6 group-hover:rotate-0 transition-all duration-700 shadow-2xl relative`}>
                <div className={`absolute inset-0 rounded-[3.5rem] border-2 border-current opacity-20 group-hover:scale-110 transition-transform`}></div>
                <span className="material-symbols-outlined text-7xl select-none group-hover:scale-110 transition-transform">{badge.icon}</span>
             </div>
             
             <h3 className="text-3xl font-black mb-4 font-outfit tracking-tighter">{badge.title}</h3>
             <p className="text-text-muted font-bold mb-10 leading-relaxed opacity-70 italic">"{badge.desc}"</p>
             
             <div className="w-full bg-background/50 rounded-3xl p-6 border border-border/50 flex flex-col gap-4 relative overflow-hidden group/progress">
                <div className="flex justify-between items-center relative z-10">
                    <span className="text-[10px] font-black uppercase text-text-muted tracking-[0.2em]">Deployment Status</span>
                    <span className="text-[10px] font-black text-primary px-3 py-1 bg-primary/10 rounded-full border border-primary/20">LOCKED</span>
                </div>
                <div className="h-2 bg-surface rounded-full overflow-hidden border border-border p-0.5">
                    <div className="h-full w-0 bg-primary/20 group-hover:w-[15%] transition-all duration-1000"></div>
                </div>
                <div className="absolute inset-0 bg-primary/[0.02] translate-y-full group-hover/progress:translate-y-0 transition-transform duration-500"></div>
             </div>
             
             {/* Hover Detail */}
             <div className="absolute -bottom-10 left-0 w-full p-4 bg-primary text-white text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:bottom-0 group-hover:opacity-100 transition-all duration-500">
                Continue challenges to unlock
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Badges;
