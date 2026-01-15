
import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-700 text-white p-6 text-center">
      <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center mb-8 shadow-2xl overflow-hidden border-4 border-blue-400">
        <img 
          src="https://upload.wikimedia.org/wikipedia/en/5/52/MSBTE_Logo.png" 
          alt="MSBTE Logo" 
          className="w-32 h-32 object-contain"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/150?text=MSBTE";
          }}
        />
      </div>
      <h1 className="text-2xl font-bold tracking-tight mb-2">MSBTE K-Scheme</h1>
      <p className="text-blue-100 opacity-90 text-sm font-medium uppercase tracking-widest">Digital Assessment Portal</p>
      
      <div className="absolute bottom-16 w-full px-12">
        <div className="w-full bg-blue-800 h-1.5 rounded-full overflow-hidden">
          <div className="bg-white h-full w-1/2 animate-[loading_1.5s_ease-in-out_infinite]"></div>
        </div>
        <p className="mt-4 text-[10px] opacity-60 uppercase tracking-widest">Initialising Database...</p>
      </div>
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
