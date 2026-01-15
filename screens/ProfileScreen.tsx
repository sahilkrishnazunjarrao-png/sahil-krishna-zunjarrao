
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRole, AcademicYear } from '../types';

interface ProfileScreenProps {
  user: { role: UserRole; year: AcademicYear };
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-blue-700 text-white p-4 flex items-center space-x-3">
        <button onClick={() => navigate('/')} className="text-xl">←</button>
        <h1 className="text-lg font-bold">User Profile</h1>
      </header>
      
      <div className="p-8 flex flex-col items-center">
        <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center text-5xl mb-4 border-4 border-blue-100">
          {user.role === UserRole.TEACHER ? '👨‍🏫' : '👨‍🎓'}
        </div>
        <h2 className="text-xl font-bold text-gray-800">{user.role === UserRole.TEACHER ? 'Prof. Satish Mane' : 'Rahul Sharma'}</h2>
        <p className="text-blue-600 font-semibold text-sm mb-8">{user.role}</p>

        <div className="w-full space-y-4">
          <div className="bg-gray-50 p-4 rounded-2xl flex justify-between items-center">
            <span className="text-gray-500 text-sm">Enrollment/ID</span>
            <span className="font-bold">2100456211</span>
          </div>
          <div className="bg-gray-50 p-4 rounded-2xl flex justify-between items-center">
            <span className="text-gray-500 text-sm">Department</span>
            <span className="font-bold">Computer Engg.</span>
          </div>
          <div className="bg-gray-50 p-4 rounded-2xl flex justify-between items-center">
            <span className="text-gray-500 text-sm">Academic Year</span>
            <span className="font-bold">{user.year}</span>
          </div>
          <div className="bg-gray-50 p-4 rounded-2xl flex justify-between items-center">
            <span className="text-gray-500 text-sm">Status</span>
            <span className="text-green-600 font-bold flex items-center">
               <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span> Active
            </span>
          </div>
        </div>

        <button className="w-full mt-12 py-4 border-2 border-red-100 text-red-500 font-bold rounded-2xl">
          Report Issue
        </button>
      </div>
    </div>
  );
};

export default ProfileScreen;
