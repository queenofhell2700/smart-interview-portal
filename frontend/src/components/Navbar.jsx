import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Home as HomeIcon, LayoutList, PenTool } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar animate-fade-in-up">
      <Link to="/dashboard" className="navbar-brand">
        <BookOpen className="text-primary-accent" size={28} />
        <span className="text-gradient">Smart<span style={{ color: 'var(--text-main)' }}>Prep</span></span>
      </Link>

      <div className="navbar-links">
        <Link to="/dashboard" className={`nav-item flex items-center gap-2 ${isActive('/dashboard')}`}>
          <HomeIcon size={18} /> Home
        </Link>
        <Link to="/categories" className={`nav-item flex items-center gap-2 ${isActive('/categories')}`}>
          <LayoutList size={18} /> Categories
        </Link>
        <Link to="/practice" className={`nav-item flex items-center gap-2 ${isActive('/practice')}`}>
          <PenTool size={18} /> Practice Setup
        </Link>
      </div>

      <div className="navbar-actions">
        <Link to="/practice" className="btn btn-primary">
          Start Practicing
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
