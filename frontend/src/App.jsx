import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Practice from './pages/Practice';
import Login from './pages/Login';
import Register from './pages/Register';
import Result from './pages/Result';
import Analytics from './pages/Analytics';
import Leaderboard from './pages/Leaderboard';
import Badges from './pages/Badges';
import SoftSkills from './pages/SoftSkills';
import MockInterview from './pages/MockInterview';
import Aptitude from './pages/Aptitude';
import Questions from './pages/Questions';
import Admin from './pages/Admin';
import Sidebar from './components/Sidebar';
import { AuthProvider, useAuth } from './context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  return user ? children : <Navigate to="/" />;
};

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  if (!user || user.role !== 'admin') return <Navigate to="/" />;
  return children;
};

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const { user, loading } = useAuth();
  
  const isAuthPage = location.pathname === '/' || location.pathname === '/register';

  // If loading, show nothing or a full-page spinner to prevent layout flashes
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  // Show children without sidebar for auth pages OR if user is not authenticated
  if (isAuthPage || !user) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-background font-sans text-text-main">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <main 
        className={`flex-1 transition-all duration-300 ease-in-out p-8 ${
          sidebarOpen ? 'ml-80' : 'ml-24'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/categories" element={<PrivateRoute><Categories /></PrivateRoute>} />
            <Route path="/practice" element={<PrivateRoute><Practice /></PrivateRoute>} />
            <Route path="/result" element={<PrivateRoute><Result /></PrivateRoute>} />
            <Route path="/analytics" element={<PrivateRoute><Analytics /></PrivateRoute>} />
            <Route path="/leaderboard" element={<PrivateRoute><Leaderboard /></PrivateRoute>} />
            <Route path="/badges" element={<PrivateRoute><Badges /></PrivateRoute>} />
            <Route path="/soft-skills" element={<PrivateRoute><SoftSkills /></PrivateRoute>} />
            <Route path="/mock-interview" element={<PrivateRoute><MockInterview /></PrivateRoute>} />
            <Route path="/aptitude" element={<PrivateRoute><Aptitude /></PrivateRoute>} />
            <Route path="/questions" element={<PrivateRoute><Questions /></PrivateRoute>} />
            <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
            {/* Catch-all redirect to login gate */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
