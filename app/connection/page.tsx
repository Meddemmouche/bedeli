// app/connection/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import LoginForm from "./log-in/page";
import SignupForm from "./sign-in/page";

export default function Connect() {
  const [view, setView] = useState<'choice' | 'login' | 'signup'>('choice');

  return (
    <div className="w-full max-w-md relative overflow-hidden rounded-2xl">
      {/* Choice View */}
      <div 
        className={`transform transition-all duration-500 ${
          view === 'choice' ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 absolute'
        }`}
      >
        <div className="text-center bg-white/60 border border-white/10 rounded-2xl px-8 py-6 backdrop-blur-sm shadow-lg shadow-black/20 space-y-4">
          <div>
            <div className="w-32 h-32 mx-auto mb-2">
              <Image width={256} height={256} src="/logob.png" alt="Bedeli Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-2xl font-semibold text-black mb-4">Welcome to bedeli</h1>
            <p className="text-black/70">Please sign up or log in to continue.</p>
          </div>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => setView('signup')}
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 shadow-lg shadow-red-500/50 font-medium rounded-lg text-sm px-6 py-2.5"
            >
              Sign up
            </button>
            <button 
              onClick={() => setView('login')}
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 shadow-lg shadow-red-500/50 font-medium rounded-lg text-sm px-6 py-2.5"
            >
              Log in
            </button>
          </div>
        </div>
      </div>

      {/* Login View */}
      <div 
        className={`transform transition-all duration-500 ${
          view === 'login' ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 absolute'
        }`}
      >
        <LoginForm onBack={() => setView('choice')} />
      </div>

      {/* Signup View */}
      <div 
        className={`transform transition-all duration-500 ${
          view === 'signup' ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 absolute'
        }`}
      >
        <SignupForm onBack={() => setView('choice')} />
      </div>
    </div>
  );
}