
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DB } from '../db';

const DepartmentScreen: React.FC = () => {
  const navigate = useNavigate();
  const departments = DB.getDepartments();

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-blue-700 text-white p-4 flex items-center space-x-3">
        <button onClick={() => navigate('/')} className="text-xl">←</button>
        <h1 className="text-lg font-bold">Department Info</h1>
      </header>

      <div className="p-6">
        {departments.map(dept => (
          <div key={dept.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl">
                🏢
              </div>
              <div>
                <h2 className="font-bold text-lg">{dept.name}</h2>
                <p className="text-gray-400 text-sm font-semibold">Code: {dept.code}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <p className="text-xs text-gray-500 uppercase font-bold">Head of Department</p>
                <p className="font-semibold text-gray-800">{dept.hodName}</p>
              </div>
              <div className="border-l-4 border-blue-200 pl-4 py-2">
                <p className="text-xs text-gray-500 uppercase font-bold">Sanctioned Intake</p>
                <p className="font-semibold text-gray-800">120 Students</p>
              </div>
              <div className="border-l-4 border-blue-200 pl-4 py-2">
                <p className="text-xs text-gray-500 uppercase font-bold">Laboratories</p>
                <p className="font-semibold text-gray-800">10 High-Tech Labs</p>
              </div>
            </div>
          </div>
        ))}

        <div className="bg-gray-50 p-6 rounded-3xl">
          <h3 className="font-bold text-gray-700 mb-4">Core Faculty</h3>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-200"></div>
                <div>
                  <p className="text-sm font-bold">Faculty Member {i}</p>
                  <p className="text-xs text-gray-400">Assistant Professor</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentScreen;
