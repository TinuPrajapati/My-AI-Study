import React from 'react';
import { Bot, Brain, Code, FileText } from 'lucide-react';

function Loader() {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-screen bg-secondary flex items-center justify-center p-4">
      <div className="text-center">
        <div className="flex flex-col items-center gap-8">
          {/* Logo and Title */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              AI<span className="text-accent">Learn</span>
            </h1>
            <p className=" text-xl font-semibold">Your AI-Powered Learning</p>
          </div>

          {/* Animated Icons */}
          <div className="flex gap-8 items-center justify-center">
            <div className="animate-bounce delay-0">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg flex justify-center items-center">
                <Bot className="w-8 h-8 text-purple-400" />
              </div>
              <p className="text-purple-200 mt-2 font-bold">Mock Tests</p>
            </div>
            <div className="animate-bounce delay-150">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg flex justify-center items-center">
                <FileText className="w-8 h-8 text-purple-400" />
              </div>
              <p className="text-purple-200 mt-2 font-bold">Smart Notes</p>
            </div>
            <div className="animate-bounce delay-300">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg flex justify-center items-center">
                <Code className="w-8 h-8 text-purple-400" />
              </div>
              <p className="text-purple-200 mt-2 font-bold">Coding Practice</p>
            </div>
          </div>

          {/* Loading Bar */}
          <div className="w-64 h-4 bg-white rounded py-0.5 overflow-hidden mt-8">
            <div className="w-full h-full bg-gradient-to-r from-primary via-secondary to-accent rounded animate-loading"></div>
          </div>
          
          <p className="text-white animate-pulse font-semibold">Loading your personalized experience...</p>
        </div>
      </div>
    </div>
  );
}

export default Loader;