import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { user } = useAuth();
  
  const chartData = [
    { name: 'Mon', problems: 4 },
    { name: 'Tue', problems: 7 },
    { name: 'Wed', problems: 5 },
    { name: 'Thu', problems: 12 },
    { name: 'Fri', problems: user?.profile?.solvedCount || 0 },
    { name: 'Sat', problems: 0 },
    { name: 'Sun', problems: 0 },
  ];

  const stats = [
    { label: 'Challenges Mastered', value: user?.profile?.solvedCount || '0', icon: 'verified', color: 'text-emerald-500', bg: 'bg-emerald-500/10', glow: 'shadow-emerald-500/20' },
    { label: 'Overall Accuracy', value: `${user?.profile?.accuracy || 0}%`, icon: 'target', color: 'text-amber-500', bg: 'bg-amber-500/10', glow: 'shadow-amber-500/20' },
    { label: 'Global Ranking', value: '#1,284', icon: 'workspace_premium', color: 'text-primary', bg: 'bg-primary/10', glow: 'shadow-primary/20' },
    { label: 'Focus Streak', value: user?.profile?.streak || '0', icon: 'local_fire_department', color: 'text-accent', bg: 'bg-accent/10', glow: 'shadow-accent/20' },
  ];

  const categories = [
    { 
      name: 'Primary Directives', 
      items: [
        { id: 'programming', name: 'Programming', icon: 'code', path: '/categories', color: 'text-primary', desc: 'Algorithm & Data Structure Mastery' },
        { id: 'aptitude', name: 'Aptitude', icon: 'calculate', path: '/aptitude', color: 'text-amber-500', desc: 'Core Logan & Mathematical Velocity' },
        { id: 'mock', name: 'Mock Interview', icon: 'record_voice_over', path: '/mock-interview', color: 'text-emerald-500', desc: 'Technical & Behavioral Simulations' },
      ]
    },
    { 
      name: 'Supplementary Modules', 
      items: [
        { id: 'questions', name: 'Challenge Bank', icon: 'database', path: '/questions', color: 'text-secondary', desc: 'Curated Rapid-Response Questions' },
        { id: 'soft-skills', name: 'Soft Skills', icon: 'diversity_3', path: '/soft-skills', color: 'text-accent', desc: 'Professional Charisma & Etiquette' },
        { id: 'analytics', name: 'Performance', icon: 'insights', path: '/analytics', color: 'text-primary', desc: 'Deep-Trace Cognitive Analytics' },
      ]
    },
    { 
      name: 'Network Status', 
      items: [
        { id: 'leaderboard', name: 'Leaderboard', icon: 'leaderboard', path: '/leaderboard', color: 'text-primary', desc: 'Global Ranking & Peer Velocity' },
        { id: 'badges', name: 'Certifications', icon: 'workspace_premium', path: '/badges', color: 'text-secondary', desc: 'Achievement Trophies & Badges' },
      ]
    }
  ];

  return (
    <div className="space-y-16 animate-fade-in pb-24 relative">
       {/* Cinematic Backdrop */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[180px] rounded-full -z-10 animate-pulse-slow"></div>
      
      <header className="space-y-4">
        <h1 className="text-5xl font-bold tracking-tight text-text-main">
          Welcome back, <span className="text-primary">{user?.name?.split(' ')[0] || 'User'}</span>
        </h1>
        <p className="text-text-muted text-lg max-w-2xl font-medium">
          Ready to continue your preparation? Track your progress and jump back into training.
        </p>
      </header>

      {/* Stats Grid - High Visibility */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="glass-card p-8 flex flex-col gap-4 group hover:border-primary/50 transition-all border-border">
            <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
              <span className="material-symbols-outlined text-2xl">{stat.icon}</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">{stat.label}</p>
              <h3 className="text-3xl font-bold text-text-main tabular-nums">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-12">
        {categories.map((group, gIdx) => (
          <div key={gIdx} className="space-y-6">
            <h2 className="text-xs font-bold text-text-muted uppercase tracking-[0.2em] flex items-center gap-4">
               {group.name}
               <div className="h-px flex-1 bg-border"></div>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.items.map((item, iIdx) => (
                <Link 
                  to={item.path} 
                  key={iIdx} 
                  className="glass-card p-8 group flex flex-col gap-6 hover:bg-white/5 transition-all border-border relative overflow-hidden"
                >
                  <div className={`w-14 h-14 rounded-xl bg-background border border-border flex items-center justify-center ${item.color} group-hover:border-primary/50 transition-all`}>
                    <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight mb-1">{item.name}</h3>
                    <p className="text-sm text-text-muted font-medium leading-relaxed mb-4">{item.desc}</p>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-wider">
                      <span>Get Started</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Pro Tip - Simplified */}
      <div className="glass-card p-8 bg-primary/5 border border-primary/20 flex flex-col md:flex-row items-center gap-8 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg">
           <span className="material-symbols-outlined text-3xl">psychology</span>
        </div>
        <div className="flex-1 text-center md:text-left">
          <p className="text-text-main font-bold text-xl leading-snug mb-1">
            Build consistency through small, daily practice sessions.
          </p>
          <p className="text-xs font-bold uppercase text-primary tracking-widest">Expert Advice</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
