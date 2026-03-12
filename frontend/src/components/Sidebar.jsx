import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user, logout, theme, toggleTheme } = useAuth();
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
    { name: 'Programming', icon: 'code', path: '/categories' },
    { name: 'Aptitude', icon: 'calculate', path: '/aptitude' },
    { name: 'Mock Interview', icon: 'record_voice_over', path: '/mock-interview' },
    { name: 'Questions', icon: 'database', path: '/questions' },
    { name: 'Soft Skills', icon: 'diversity_3', path: '/soft-skills' },
    { name: 'Analytics', icon: 'insights', path: '/analytics' },
    { name: 'Leaderboard', icon: 'leaderboard', path: '/leaderboard' },
    { name: 'Badges', icon: 'workspace_premium', path: '/badges' },
  ];

  return (
    <aside 
      className={`fixed left-0 top-0 h-full bg-surface border-r border-border transition-all duration-300 ease-in-out z-50 flex flex-col shadow-2xl ${
        isOpen ? 'w-80' : 'w-24'
      }`}
    >
      {/* Brand Section */}
      <div className="p-8 flex items-center justify-between overflow-hidden">
        <div className={`flex items-center gap-4 transition-all duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 scale-50'}`}>
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
            <span className="material-symbols-outlined text-white text-2xl">bolt</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold font-outfit tracking-tight text-text-main">CareerPro</span>
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Portal Console</span>
          </div>
        </div>
        {!isOpen && (
             <button onClick={toggleSidebar} className="mx-auto w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <span className="material-symbols-outlined">menu</span>
             </button>
        )}
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all group relative ${
                isActive 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'text-text-muted hover:bg-primary/10 hover:text-primary'
              }`}
            >
              <span className={`material-symbols-outlined text-2xl transition-all ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                {item.icon}
              </span>
              <span className={`font-semibold text-sm whitespace-nowrap transition-all ${isOpen ? 'opacity-100' : 'opacity-0 -translate-x-4'}`}>
                {item.name}
              </span>
              {isActive && isOpen && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-white/50"></div>
              )}
            </Link>
          );
        })}

        {/* Admin Section */}
        {user?.role === 'admin' && (
          <div className="pt-8 border-t border-border mx-2">
             <Link
                to="/admin"
                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all group ${
                    location.pathname === '/admin' ? 'bg-accent text-white shadow-lg' : 'text-text-muted hover:bg-accent/10 hover:text-accent'
                }`}
             >
                <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
                <span className={`font-semibold text-sm whitespace-nowrap transition-all ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                    Admin Control
                </span>
             </Link>
          </div>
        )}
      </nav>

      {/* User Section & Footer */}
      <div className="p-6 bg-background/50 border-t border-border mt-auto">
        <div className="flex flex-col gap-4">
             <div className="flex items-center gap-4 px-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {user?.name?.charAt(0) || 'U'}
                </div>
                {isOpen && (
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-text-main truncate">{user?.name || 'User'}</p>
                        <p className="text-[10px] text-text-muted truncate font-medium uppercase tracking-wider">Session Active</p>
                    </div>
                )}
             </div>

             <div className="flex gap-2">
                <button 
                onClick={toggleTheme}
                className="w-10 h-10 bg-surface border border-border rounded-xl flex items-center justify-center text-text-muted hover:text-white transition-all"
                title="Toggle Theme"
                >
                    <span className="material-symbols-outlined text-xl">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
                </button>
                {isOpen && (
                    <button 
                        onClick={logout}
                        className="flex-1 bg-accent/10 border border-accent/20 h-10 rounded-xl flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all font-bold text-[10px] uppercase tracking-wider"
                    >
                        Sign Out
                    </button>
                )}
                {!isOpen && (
                     <button 
                     onClick={logout}
                     className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all"
                     >
                        <span className="material-symbols-outlined text-xl">power_settings_new</span>
                     </button>
                )}
             </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
