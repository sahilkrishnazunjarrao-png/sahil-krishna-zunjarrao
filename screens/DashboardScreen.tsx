
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRole, AcademicYear } from '../types';

interface DashboardScreenProps {
  user: { role: UserRole; year: AcademicYear };
  onLogout: () => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const menuItems = [
    { title: 'Student Profile', icon: '👤', path: '/profile', color: 'bg-indigo-50 text-indigo-700 border-indigo-100' },
    { title: 'Department', icon: '🏢', path: '/department', color: 'bg-teal-50 text-teal-700 border-teal-100' },
    { title: 'Format K3 (FA-PR)', icon: '📝', path: '/format/k3', color: 'bg-blue-50 text-blue-700 border-blue-100' },
    { title: 'Format K4 (SA-PR)', icon: '📋', path: '/format/k4', color: 'bg-purple-50 text-purple-700 border-purple-100' },
    { title: 'Format K5 (FA-TH)', icon: '📒', path: '/format/k5', color: 'bg-orange-50 text-orange-700 border-orange-100' },
    { title: 'Format K6 (SLA)', icon: '💡', path: '/format/k6', color: 'bg-green-50 text-green-700 border-green-100' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Fixed the header height and visibility issue */}
      <header className="bg-blue-700 text-white px-6 pt-10 pb-20 relative rounded-b-[2.5rem] shadow-lg overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-20 -mt-20"></div>
        
        <div className="flex justify-between items-start relative z-10">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-1 shadow-inner">
              <img 
                src="https://upload.wikimedia.org/wikipedia/en/5/52/MSBTE_Logo.png" 
                alt="MSBTE Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="text-xs font-semibold text-blue-100 uppercase tracking-tighter">Academic Portal</h2>
              <h1 className="text-lg font-extrabold leading-none">{user.role === UserRole.TEACHER ? 'Faculty Panel' : 'Student Panel'}</h1>
            </div>
          </div>
          <button 
            onClick={onLogout} 
            className="bg-white/15 backdrop-blur-md p-2.5 rounded-xl hover:bg-white/25 transition-all active:scale-90"
            title="Logout"
          >
            <span className="text-lg">Logout 🚪</span>
          </button>
        </div>

        <div className="mt-6 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-blue-800/50 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10">
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
            <span className="text-xs font-bold uppercase tracking-widest">{user.year}</span>
          </div>
        </div>
      </header>

      <main className="px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-2 gap-4">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`bg-white p-5 rounded-[2rem] shadow-md border ${item.color} flex flex-col items-center justify-center space-y-3 transition-all hover:translate-y-[-2px] active:scale-95`}
            >
              <div className="text-3xl filter drop-shadow-sm">
                {item.icon}
              </div>
              <span className="text-[11px] font-black uppercase tracking-tight text-center leading-tight">
                {item.title}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-8 bg-white p-5 rounded-[2rem] border-2 border-dashed border-blue-100 shadow-sm">
          <div className="flex items-center space-x-2 mb-2 text-blue-700">
            <span className="text-lg">📢</span>
            <h3 className="text-xs font-black uppercase tracking-wider">Board Guidelines</h3>
          </div>
          <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
            K-Scheme formats K3 to K6 must be strictly maintained for every course. Data entries are locked after the submission deadline.
          </p>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-lg border-t border-gray-100 px-8 py-4 flex justify-between items-center z-50 rounded-t-3xl shadow-2xl">
        <button onClick={() => navigate('/')} className="flex flex-col items-center text-blue-700">
          <span className="text-xl">🏠</span>
          <span className="text-[9px] font-bold uppercase mt-0.5">Home</span>
        </button>
        <button onClick={() => navigate('/profile')} className="flex flex-col items-center text-gray-400 hover:text-blue-600 transition-colors">
          <span className="text-xl">👤</span>
          <span className="text-[9px] font-bold uppercase mt-0.5">Profile</span>
        </button>
        <button onClick={() => navigate('/department')} className="flex flex-col items-center text-gray-400 hover:text-blue-600 transition-colors">
          <span className="text-xl">🏢</span>
          <span className="text-[9px] font-bold uppercase mt-0.5">Dept</span>
        </button>
      </nav>
    </div>
  );
};

export default DashboardScreen;
