
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DB } from './db';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import ProfileScreen from './screens/ProfileScreen';
import DepartmentScreen from './screens/DepartmentScreen';
import K3Screen from './screens/K3Screen';
import K4Screen from './screens/K4Screen';
import K5Screen from './screens/K5Screen';
import K6Screen from './screens/K6Screen';
import { UserRole, AcademicYear } from './types';

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState<{ role: UserRole; year: AcademicYear } | null>(null);

  useEffect(() => {
    DB.init();
    const timer = setTimeout(() => setIsLoaded(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return <SplashScreen />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 max-w-md mx-auto relative overflow-hidden shadow-2xl border-x border-gray-200">
        <Routes>
          {!user ? (
            <Route path="*" element={<LoginScreen onLogin={(role, year) => setUser({ role, year })} />} />
          ) : (
            <>
              <Route path="/" element={<DashboardScreen user={user} onLogout={() => setUser(null)} />} />
              <Route path="/profile" element={<ProfileScreen user={user} />} />
              <Route path="/department" element={<DepartmentScreen />} />
              <Route path="/format/k3" element={<K3Screen user={user} />} />
              <Route path="/format/k4" element={<K4Screen user={user} />} />
              <Route path="/format/k5" element={<K5Screen user={user} />} />
              <Route path="/format/k6" element={<K6Screen user={user} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
