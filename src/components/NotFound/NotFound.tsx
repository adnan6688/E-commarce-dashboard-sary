import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {


    
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center space-y-8">
        
        {/* Animated 404 Text */}
        <div className="relative">
          <h1 className="text-[120px] md:text-[200px] font-black text-gray-100 leading-none select-none">
            404
          </h1>
          <p className="absolute inset-0 flex items-center justify-center text-2xl md:text-4xl font-bold text-gray-800 mt-4">
            Oops! Page Not Found
          </p>
        </div>

        {/* Illustration or Graphic Placeholder */}
        <div className="flex justify-center">
          <div className="w-64 h-64 bg-blue-50 rounded-full flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent"></div>
            <svg 
              className="w-32 h-32 text-sky-400 animate-bounce" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-4">
          <p className="text-gray-500 text-lg max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all active:scale-95"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
          
          <a 
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-sky-400 text-white font-bold rounded-xl hover:bg-sky-800   transition-all duration-1000 shadow-lg shadow-blue-200  active:scale-95"
          >
            <Home size={18} />
            Back to Home
          </a>
        </div>

        {/* Footer Link */}
        <div className="pt-12">
          <p className="text-sm text-gray-400 font-medium tracking-wide ">
            Techzone Electronics Support
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;