import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Admin = () => {
  const { user } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [formData, setFormData] = useState({
    questionText: '',
    category: 'java',
    difficulty: 'easy',
    options: ['', '', '', ''],
    correctAnswer: '',
    explanation: ''
  });

  const CATEGORIES = [
    'java', 'python', 'cpp', 'c', 'javascript', 'sql', 
    'aptitude', 'mock interview', 'questions', 'soft skills'
  ];

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('http://localhost:5000/api/questions?limit=100');
      setQuestions(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch questions');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = { headers: { Authorization: `Bearer ${user.token}` } };
    try {
      if (editingQuestion) {
        await axios.put(`http://localhost:5000/api/admin/questions/${editingQuestion._id}`, formData, config);
      } else {
        await axios.post('http://localhost:5000/api/admin/questions', formData, config);
      }
      setShowModal(false);
      fetchQuestions();
    } catch (error) {
      alert('Operation failed. Please check if all fields are filled correctly.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this challenge?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await axios.delete(`http://localhost:5000/api/admin/questions/${id}`, config);
        fetchQuestions();
      } catch (error) {
        alert('Delete failed');
      }
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-6 text-center animate-fade-in">
        <span className="material-symbols-outlined text-8xl text-accent/20">lock</span>
        <h2 className="text-3xl font-black">Access Restricted</h2>
        <p className="text-text-muted max-w-md">This area is reserved for system administrators only. Please return to the dashboard.</p>
        <button onClick={() => window.location.href = '/'} className="btn-primary px-10 py-4 rounded-2xl font-black">Go Back Home</button>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-fade-in pb-24 relative font-outfit">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full -z-10 animate-pulse"></div>
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-secondary/5 blur-[100px] rounded-full -z-10"></div>

      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface border border-border/50 text-text-muted text-[10px] font-black uppercase tracking-[0.3em]">
             System Nexus
          </div>
          <h1 className="text-5xl font-black mb-2 bg-gradient-to-r from-text-main to-text-muted bg-clip-text text-transparent tracking-tighter">Admin Mission Control</h1>
          <p className="text-text-muted text-lg font-medium max-w-2xl opacity-80">Orchestrate the challenge universe, moderate core data, and monitor system velocity.</p>
        </div>
        
        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          <label className="flex-1 md:flex-none bg-surface/40 backdrop-blur-md border border-border/50 text-text-main px-8 py-5 rounded-[2rem] font-black flex items-center justify-center gap-4 cursor-pointer hover:border-primary/50 hover:bg-surface transition-all shadow-xl group">
            <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">upload_file</span>
            <span className="uppercase tracking-widest text-[11px]">Bulk Sync</span>
            <input 
              type="file" 
              className="hidden" 
              accept=".json"
              onChange={async (e) => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = async (evt) => {
                  try {
                    const json = JSON.parse(evt.target.result);
                    const config = { headers: { Authorization: `Bearer ${user.token}` } };
                    await axios.post('http://localhost:5000/api/admin/questions/bulk', json, config);
                    alert('Successfully uploaded questions!');
                    fetchQuestions();
                  } catch (err) {
                    alert('Invalid JSON file or format mismatch.');
                  }
                };
                reader.readAsText(file);
              }}
            />
          </label>
          <button 
            onClick={() => { 
                setEditingQuestion(null); 
                setFormData({ questionText: '', category: 'java', difficulty: 'easy', options: ['', '', '', ''], correctAnswer: '', explanation: '' }); 
                setShowModal(true); 
            }}
            className="flex-1 md:flex-none premium-btn px-10 py-5 shadow-2xl relative group overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-4 text-[11px] uppercase tracking-[0.2em]">
                <span className="material-symbols-outlined font-black">add</span>
                Deploy Challenge
            </span>
          </button>
        </div>
      </header>

      <div className="glass-card rounded-[3rem] border-white/5 shadow-2xl overflow-hidden relative group/table">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent pointer-events-none"></div>
        
        {loading ? (
             <div className="p-32 flex flex-col items-center gap-8">
                 <div className="w-16 h-16 border-4 border-primary/10 border-t-primary rounded-full animate-spin"></div>
                 <p className="text-text-muted font-black uppercase tracking-[0.4em] text-[10px] animate-pulse">Syncing Nexus Data...</p>
             </div>
        ) : (
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                    <tr className="bg-background/40 backdrop-blur-3xl border-b border-white/5">
                    <th className="p-8 font-black uppercase text-[10px] tracking-[0.3em] text-text-muted">Challenge Context</th>
                    <th className="p-8 font-black uppercase text-[10px] tracking-[0.3em] text-text-muted">Classification</th>
                    <th className="p-8 font-black uppercase text-[10px] tracking-[0.3em] text-text-muted">Difficulty</th>
                    <th className="p-8 font-black uppercase text-[10px] tracking-[0.3em] text-text-muted text-right">Operations</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.03]">
                    {questions.map((q) => (
                    <tr key={q._id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="p-8">
                            <p className="font-bold text-lg line-clamp-1 max-w-md group-hover:text-primary transition-colors">{q.questionText}</p>
                            <p className="text-[10px] text-text-muted font-black uppercase tracking-widest mt-1 mt-2 opacity-50">ID: {q._id.slice(-8)}</p>
                        </td>
                        <td className="p-8">
                            <span className="px-4 py-1.5 bg-surface border border-border/50 text-text-main rounded-full text-[10px] font-black uppercase tracking-widest group-hover:border-primary/30 transition-colors">
                                {q.category}
                            </span>
                        </td>
                        <td className="p-8">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                            q.difficulty === 'easy' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                            q.difficulty === 'medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                            'bg-accent/10 text-accent border-accent/20'
                        }`}>
                            {q.difficulty}
                        </span>
                        </td>
                        <td className="p-8 text-right">
                        <div className="flex justify-end gap-3 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                            <button onClick={() => { setEditingQuestion(q); setFormData(q); setShowModal(true); }} className="w-12 h-12 flex items-center justify-center bg-surface border border-border/50 text-blue-400 rounded-2xl hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all shadow-lg active:scale-90">
                                <span className="material-symbols-outlined text-lg font-black">edit</span>
                            </button>
                            <button onClick={() => handleDelete(q._id)} className="w-12 h-12 flex items-center justify-center bg-surface border border-border/50 text-accent rounded-2xl hover:bg-accent hover:text-white hover:border-accent transition-all shadow-lg active:scale-90">
                                <span className="material-symbols-outlined text-lg font-black">delete</span>
                            </button>
                        </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-background/90 backdrop-blur-2xl z-[100] flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
          <div className="bg-surface w-full max-w-4xl rounded-[3.5rem] shadow-2xl border border-white/10 p-8 md:p-16 relative animate-scale-in">
            <div className="flex justify-between items-center mb-12">
                <div className="space-y-2">
                    <div className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Protocol Execution</div>
                    <h2 className="text-4xl font-black tracking-tighter">{editingQuestion ? 'Modify Module' : 'Deploy New Module'}</h2>
                </div>
                <button onClick={() => setShowModal(false)} className="w-14 h-14 rounded-full bg-background border border-border hover:bg-accent hover:text-white hover:border-accent transition-all flex items-center justify-center text-text-muted shadow-xl active:scale-90">
                    <span className="material-symbols-outlined font-black">close</span>
                </button>
            </div>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="md:col-span-2">
                <label className="text-[10px] font-black uppercase text-text-muted mb-3 block tracking-[0.3em] ml-4">Challenge Payload</label>
                <textarea 
                    placeholder="Enter the complete question text..." required rows="4"
                    className="w-full bg-background/50 border-2 border-border p-8 rounded-[2.5rem] outline-none focus:border-primary transition-all font-bold text-xl leading-relaxed shadow-inner"
                    value={formData.questionText} onChange={(e) => setFormData({...formData, questionText: e.target.value})}
                ></textarea>
              </div>

              <div>
                 <label className="text-[10px] font-black uppercase text-text-muted mb-3 block tracking-[0.3em] ml-4">Vector Classification</label>
                 <select className="w-full bg-background/50 border-2 border-border p-6 rounded-2xl outline-none font-black capitalize cursor-pointer focus:border-primary transition-all text-lg shadow-sm" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                   {CATEGORIES.map(c => <option key={c} value={c} className="bg-surface">{c}</option>)}
                 </select>
              </div>

              <div>
                 <label className="text-[10px] font-black uppercase text-text-muted mb-3 block tracking-[0.3em] ml-4">Difficulty Intensity</label>
                 <select className="w-full bg-background/50 border-2 border-border p-6 rounded-2xl outline-none font-black capitalize cursor-pointer focus:border-primary transition-all text-lg shadow-sm" value={formData.difficulty} onChange={(e) => setFormData({...formData, difficulty: e.target.value})}>
                   {['easy', 'medium', 'hard'].map(d => <option key={d} value={d} className="bg-surface">{d}</option>)}
                 </select>
              </div>

              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                <label className="text-[10px] font-black uppercase text-text-muted mb-[-20px] block tracking-[0.3em] ml-4 md:col-span-2">Option Permutations</label>
                {formData.options.map((opt, i) => (
                  <div key={i} className="relative group/opt">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center font-black text-[10px] text-text-muted group-focus-within/opt:border-primary group-focus-within/opt:text-primary transition-colors">
                        {String.fromCharCode(65+i)}
                    </div>
                    <input type="text" placeholder={`Option ${String.fromCharCode(65+i)}`} required className="w-full bg-background/50 border-2 border-border p-6 pl-16 rounded-[2rem] font-black outline-none focus:border-primary transition-all shadow-sm text-lg" value={opt} onChange={(e) => {
                        const newOpts = [...formData.options];
                        newOpts[i] = e.target.value;
                        setFormData({...formData, options: newOpts});
                    }} />
                  </div>
                ))}
              </div>

              <div className="md:col-span-2">
                 <label className="text-[10px] font-black uppercase text-text-muted mb-3 block tracking-[0.3em] ml-4">Verified Solution (Direct Match Required)</label>
                 <div className="relative group">
                    <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-emerald-500 font-black">verified_user</span>
                    <input 
                        type="text" placeholder="Copy exactly from options..." required 
                        className="w-full bg-emerald-500/[0.03] border-2 border-emerald-500/20 p-8 pl-16 rounded-[2.5rem] outline-none focus:border-emerald-500 transition-all font-black text-emerald-600 text-xl shadow-lg"
                        value={formData.correctAnswer} onChange={(e) => setFormData({...formData, correctAnswer: e.target.value})}
                    />
                 </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-[10px] font-black uppercase text-text-muted mb-3 block tracking-[0.3em] ml-4">Expert Logic Rationale</label>
                <textarea 
                    placeholder="Provide cinematic reasoning for this challenge..." rows="4"
                    className="w-full bg-background/50 border-2 border-border p-8 rounded-[2.5rem] outline-none focus:border-primary transition-all font-bold leading-relaxed text-lg shadow-inner"
                    value={formData.explanation} onChange={(e) => setFormData({...formData, explanation: e.target.value})}
                ></textarea>
              </div>

              <div className="md:col-span-2 flex justify-end gap-6 pt-10">
                <button type="button" onClick={() => setShowModal(false)} className="px-12 py-6 font-black uppercase tracking-widest text-text-muted hover:text-accent transition-all text-xs">Abort Operation</button>
                <button type="submit" className="premium-btn px-16 py-6 shadow-2xl relative group overflow-hidden">
                    <span className="relative z-10 flex items-center justify-center gap-4 text-[11px] uppercase tracking-[0.3em]">
                        {editingQuestion ? 'Commit Updates' : 'Initiate Deployment'}
                        <span className="material-symbols-outlined font-black">rocket_launch</span>
                    </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
