import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend
} from 'recharts';
import { useAuth } from '../context/AuthContext';

const Analytics = () => {
  const { user } = useAuth();

  const performanceData = [
    { label: 'Programming', value: user?.profile?.accuracy || 85, color: '#4f46e5' },
    { label: 'Aptitude', value: 72, color: '#9333ea' },
    { label: 'Soft Skills', value: 90, color: '#10b981' },
    { label: 'Mock Interview', value: 65, color: '#f43f5e' },
  ];

  const weeklyProgress = [
    { day: 'Mon', solved: 4 },
    { day: 'Tue', solved: 7 },
    { day: 'Wed', solved: 5 },
    { day: 'Thu', solved: 12 },
    { day: 'Fri', solved: user?.profile?.solvedCount || 0 },
    { day: 'Sat', solved: 0 },
    { day: 'Sun', solved: 0 },
  ];

  const distributionData = [
    { name: 'Easy', value: user?.profile?.solvedCount || 0, color: '#10b981' },
    { name: 'Medium', value: 0, color: '#f59e0b' },
    { name: 'Hard', value: 0, color: '#f43f5e' }
  ];

  return (
    <div className="space-y-10 animate-fade-in pb-20 relative">
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -z-10"></div>
      
      <header>
        <h1 className="text-4xl font-outfit font-black mb-2">Performance Analytics</h1>
        <p className="text-text-muted text-lg font-medium max-w-2xl">Detailed breakdown of your growth and cognitive velocity across all preparation tracks.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Category Performance */}
        <div className="glass-card p-10 group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform"></div>
          <div className="flex items-center gap-4 mb-10">
            <div className="p-4 rounded-2xl bg-primary/10 text-primary shadow-inner">
              <span className="material-symbols-outlined text-3xl">track_changes</span>
            </div>
            <div>
                <h3 className="text-2xl font-black">Accuracy Vector</h3>
                <p className="text-xs text-text-muted font-bold uppercase tracking-widest">Performance by category</p>
            </div>
          </div>
          <div className="h-72 w-full pr-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData} layout="vertical" margin={{ left: 0, right: 30 }}>
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="label" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--text-main)', fontSize: 13, fontWeight: 800 }} 
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                  contentStyle={{ 
                    background: 'var(--surface)', 
                    border: '1px solid var(--border)', 
                    borderRadius: '20px',
                    boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)',
                    padding: '12px 20px'
                  }}
                />
                <Bar dataKey="value" radius={[0, 12, 12, 0]} barSize={32}>
                  {performanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Activity */}
        <div className="glass-card p-10 group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform"></div>
          <div className="flex items-center gap-4 mb-10">
            <div className="p-4 rounded-2xl bg-secondary/10 text-secondary">
              <span className="material-symbols-outlined text-3xl">calendar_month</span>
            </div>
            <div>
                <h3 className="text-2xl font-black">Engagement Delta</h3>
                <p className="text-xs text-text-muted font-bold uppercase tracking-widest">Active sessions per day</p>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyProgress}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'var(--text-muted)', fontSize: 12, fontWeight: 700 }} 
                />
                <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'var(--text-muted)', fontSize: 12, fontWeight: 700 }} 
                />
                <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '20px', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)' }} />
                <Bar dataKey="solved" fill="var(--primary)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="glass-card p-12 relative overflow-hidden group">
        <div className="absolute top-[-100px] left-[-100px] w-64 h-64 bg-amber-500/5 rounded-full blur-[100px]"></div>
        <div className="flex items-center gap-4 mb-12">
          <div className="p-4 rounded-2xl bg-amber-500/10 text-amber-500 shadow-inner">
            <span className="material-symbols-outlined text-3xl">donut_large</span>
          </div>
          <div>
            <h3 className="text-2xl font-black">Difficulty Spectrum</h3>
            <p className="text-xs text-text-muted font-bold uppercase tracking-widest">Problem distribution by tier</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="h-80 w-full flex justify-center">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                    <Pie
                        data={distributionData}
                        innerRadius={90}
                        outerRadius={120}
                        paddingAngle={10}
                        dataKey="value"
                        className="outline-none"
                    >
                        {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                        ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '20px', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)' }} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="space-y-6">
                {distributionData.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-6 rounded-[1.5rem] bg-background border border-border group/item hover:border-primary/30 transition-all">
                        <div className="flex items-center gap-5">
                            <div className="w-5 h-5 rounded-full shadow-lg" style={{ backgroundColor: item.color }}></div>
                            <span className="font-black text-xl tracking-tight">{item.name} Level</span>
                        </div>
                        <div className="text-right">
                            <span className="text-3xl font-black text-text-main group-hover/item:text-primary transition-colors">{item.value}</span>
                            <p className="text-[10px] font-black uppercase text-text-muted mt-1">Challenges</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
