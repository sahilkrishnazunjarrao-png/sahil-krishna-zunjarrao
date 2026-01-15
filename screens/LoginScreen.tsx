
import React, { useState } from 'react';
import { UserRole, AcademicYear } from '../types';

interface LoginScreenProps {
  onLogin: (role: UserRole, year: AcademicYear) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
  const [year, setYear] = useState<AcademicYear>(AcademicYear.FIRST);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(role, year);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="bg-blue-700 h-1/3 flex flex-col items-center justify-center text-white rounded-b-[3rem] shadow-lg">
        <h1 className="text-3xl font-bold mb-2 uppercase tracking-tight">Login</h1>
        <p className="text-blue-100 font-medium">Portal for Students & Teachers</p>
      </div>
      
      <form onSubmit={handleLogin} className="flex-1 px-8 pt-10 pb-6">
        <div className="flex mb-8 bg-gray-100 p-1 rounded-xl border border-gray-200">
          <button
            type="button"
            className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${role === UserRole.STUDENT ? 'bg-white shadow-md text-blue-700' : 'text-gray-500'}`}
            onClick={() => setRole(UserRole.STUDENT)}
          >
            Student
          </button>
          <button
            type="button"
            className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${role === UserRole.TEACHER ? 'bg-white shadow-md text-blue-700' : 'text-gray-500'}`}
            onClick={() => setRole(UserRole.TEACHER)}
          >
            Teacher
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 tracking-widest">Select Academic Year</label>
            <select
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none text-black font-bold"
              value={year}
              onChange={(e) => setYear(e.target.value as AcademicYear)}
            >
              {Object.values(AcademicYear).map((y) => (
                <option key={y} value={y} className="text-black">{y}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 tracking-widest">{role === UserRole.STUDENT ? 'Enrollment ID' : 'Staff ID'}</label>
            <input
              type="text"
              required
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none text-black font-bold placeholder:text-gray-400"
              placeholder={role === UserRole.STUDENT ? '2100xxxx' : 'EMPxxxx'}
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 tracking-widest">Password</label>
            <input
              type="password"
              required
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none text-black font-bold placeholder:text-gray-400"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-10 py-4 bg-blue-700 text-white rounded-xl font-black uppercase tracking-widest shadow-lg shadow-blue-200 hover:bg-blue-800 transition-all active:scale-[0.98]"
        >
          {role === UserRole.TEACHER ? 'Teacher Login' : 'Student Login'}
        </button>
        
        <p className="mt-8 text-center text-gray-400 text-[10px] font-bold uppercase tracking-widest">
          © 2024 MSBTE K-Scheme Portal
        </p>
      </form>
    </div>
  );
};

export default LoginScreen;
