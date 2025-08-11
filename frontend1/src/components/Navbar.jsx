import React from "react";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="relative z-50 bg-white/80 backdrop-blur-md shadow-lg border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-yellow-400 rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div
      onClick={() => navigate('/')}
      style={{ cursor: 'pointer' }}
    >
      <h1 className="text-xl font-serif font-bold bg-gradient-to-r from-purple-600 to-yellow-500 bg-clip-text text-transparent">
        ThoughtAlchemy
      </h1>
      <p className="text-xs text-gray-500 font-medium">Transform • Blend • Create</p>
    </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">How It Works</a>
           
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/signup')}
              className="px-4 py-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
            >
              Sign Up
            </button>

            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-yellow-400 text-white font-medium rounded-lg hover:from-purple-600 hover:to-yellow-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
