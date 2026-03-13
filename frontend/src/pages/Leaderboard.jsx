import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('https://smart-interview-portal.onrender.com/api/auth/leaderboard');
        setUsers(data);
        setLoading(false);
      } catch (error) {
        setUsers([
          { _id: '1', name: 'Alex Johnson', profile: { solvedCount: 450, accuracy: 94, badges: ['Gold'] } },
          { _id: '2', name: 'Sarah Williams', profile: { solvedCount: 380, accuracy: 89, badges: ['Silver', 'Streak'] } },
          { _id: '3', name: 'Mike Chen', profile: { solvedCount: 310, accuracy: 91, badges: ['Fast Learner'] } },
          { _id: '4', name: 'Emma Davis', profile: { solvedCount: 295, accuracy: 85, badges: ['Social'] } },
          { _id: '5', name: 'Chris Evans', profile: { solvedCount: 220, accuracy: 82, badges: [] } }
        ]);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="space-y-12 animate-fade-in pb-24 relative">
      {/* Cinematic Background Gradients */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-primary/10 blur-[120px] rounded-full -z-10 animate-pulse"></div>
      
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface border border-border/50 text-text-muted text-[10px] font-black uppercase tracking-[0.3em]">
           Global Community
        </div>
        <h1 className="text-5xl font-outfit font-black mb-2 bg-gradient-to-r from-text-main to-text-muted bg-clip-text text-transparent">Hall of Heroes</h1>
        <p className="text-text-muted text-lg font-medium max-w-2xl">Visualizing the elite performance and velocity of our global engineering community.</p>
      </header>

      {/* Podium Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-end mt-16">
        {users.slice(0, 3).sort((a,b) => b.profile.solvedCount - a.profile.solvedCount).map((user, idx) => {
          const isWinner = idx === 0;
          return (
            <div 
                key={user._id} 
                className={`glass-card p-10 flex flex-col items-center text-center relative overflow-hidden transition-all duration-500 hover:translate-y-[-10px] ${
                    isWinner ? 'border-primary/40 bg-primary/5 py-16' : 'hover:border-primary/20'
                } ${idx === 2 ? 'lg:order-3' : idx === 1 ? 'lg:order-1' : 'lg:order-2 shadow-[0_40px_80px_-20px_rgba(79,70,229,0.3)]'}`}
            >
                {isWinner && (
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-shimmer"></div>
                )}
                
                <div className="absolute -top-10 -right-10 font-black text-[120px] opacity-5 text-text-main italic select-none">#{idx + 1}</div>
                
                <div className={`relative mb-8 group`}>
                    <div className={`w-28 h-28 rounded-[2rem] flex items-center justify-center border-4 rotate-3 transition-transform group-hover:rotate-6 ${
                        idx === 0 ? 'border-amber-400 bg-amber-400/10' : 
                        idx === 1 ? 'border-slate-300 bg-slate-300/10' : 
                        'border-orange-400 bg-orange-400/10'
                    }`}>
                        <span className="material-symbols-outlined text-6xl select-none">
                            {idx === 0 ? 'workspace_premium' : 'person'}
                        </span>
                    </div>
                    <div className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-xl flex items-center justify-center text-white font-black shadow-lg ${
                        idx === 0 ? 'bg-amber-500' : idx === 1 ? 'bg-slate-400' : 'bg-orange-500'
                    }`}>
                        {idx + 1}
                    </div>
                </div>

                <h3 className="text-3xl font-black mb-3 font-outfit tracking-tighter">{user.name}</h3>
                <div className="flex gap-2 mb-8 flex-wrap justify-center">
                    {user.profile.badges.map(b => (
                    <span key={b} className="text-[9px] font-black uppercase px-3 py-1 bg-background text-primary rounded-full border border-primary/20 shadow-sm">{b}</span>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-10 w-full bg-background/50 rounded-3xl p-6 border border-border/50">
                    <div className="text-center">
                        <p className="text-[10px] font-black uppercase text-text-muted mb-1 tracking-widest">Velocity</p>
                        <p className="text-3xl font-black text-text-main">{user.profile.solvedCount}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] font-black uppercase text-text-muted mb-1 tracking-widest">Precision</p>
                        <p className="text-3xl font-black text-emerald-500">{user.profile.accuracy}%</p>
                    </div>
                </div>
            </div>
          );
        })}
      </div>

      {/* List Section */}
      <div className="glass-card overflow-hidden bg-surface/30 border-white/5 mt-10">
         <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                <tr className="bg-background/80 border-b border-border">
                    <th className="p-8 font-black uppercase text-[10px] tracking-[0.2em] text-text-muted">Rank</th>
                    <th className="p-8 font-black uppercase text-[10px] tracking-[0.2em] text-text-muted">Engineer</th>
                    <th className="p-8 font-black uppercase text-[10px] tracking-[0.2em] text-text-muted">Specializations</th>
                    <th className="p-8 font-black uppercase text-[10px] tracking-[0.2em] text-text-muted">Challenges Solved</th>
                    <th className="p-8 font-black uppercase text-[10px] tracking-[0.2em] text-text-muted text-right">Accuracy Rating</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                {users.map((user, idx) => (
                    <tr key={user._id} className="group hover:bg-primary/[0.03] transition-all duration-400">
                        <td className="p-8">
                            <span className="font-black text-2xl text-text-muted/50 group-hover:text-primary transition-colors">
                                {(idx + 1).toString().padStart(2, '0')}
                            </span>
                        </td>
                        <td className="p-8">
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 rounded-2xl bg-surface border border-border group-hover:border-primary/50 transition-all flex items-center justify-center overflow-hidden">
                                    <span className="material-symbols-outlined text-3xl text-text-muted group-hover:text-primary transition-colors">person</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-black text-lg tracking-tight">{user.name}</span>
                                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Quantum Level {Math.floor(user.profile.solvedCount/50) + 1}</span>
                                </div>
                            </div>
                        </td>
                        <td className="p-8">
                            <div className="flex gap-2">
                                {user.profile.badges.slice(0, 2).map(b => (
                                <span key={b} className="text-[10px] font-black uppercase px-3 py-1 bg-primary/5 text-primary rounded-lg border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all">{b}</span>
                                ))}
                                {user.profile.badges.length > 2 && (
                                    <span className="text-[10px] font-black text-text-muted bg-surface px-3 py-1 rounded-lg border border-border">+{user.profile.badges.length - 2} More</span>
                                )}
                            </div>
                        </td>
                        <td className="p-8">
                            <div className="flex items-center gap-3">
                                <span className="font-black text-2xl">{user.profile.solvedCount}</span>
                                <div className="h-1.5 w-16 bg-background rounded-full overflow-hidden border border-border">
                                    <div className="h-full bg-primary" style={{ width: `${Math.min(100, (user.profile.solvedCount/500)*100)}%` }}></div>
                                </div>
                            </div>
                        </td>
                        <td className="p-8 text-right">
                            <span className={`text-2xl font-black ${user.profile.accuracy >= 90 ? 'text-emerald-500' : 'text-amber-500'}`}>
                                {user.profile.accuracy}%
                            </span>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export default Leaderboard;
