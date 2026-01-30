"use client";

import { ArrowLeft } from "lucide-react";
import { signup } from "@/app/actions/auth";
import { useActionState } from "react";

export default function SignupForm({ onBack }: { onBack: () => void }) {
  const [state, formAction, pending] = useActionState(signup, undefined);

  return (
    <div className="bg-white/60 border border-white/10 rounded-2xl px-8 py-6 backdrop-blur-sm shadow-lg shadow-black/20">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-4"
        type="button"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>
      
      <h2 className="text-2xl font-semibold text-black mb-6">Sign up</h2>
      
      {state?.error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
          {state.error}
        </div>
      )}
      
      <form className="space-y-4" action={formAction}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input 
              type="text"
              name="f_name"
              required
              className="w-full text-gray-700 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input 
              type="text"
              name="l_name"
              required
              className="w-full text-gray-700 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            type="email"
            name="email"
            required
            className="text-gray-900 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="your@email.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
          <input 
            type="number"
            name="age"
            required
            min="13"
            className="w-full text-gray-700 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <select 
            name="gender"
            required
            className="text-gray-900 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input 
            type="password"
            name="password"
            required
            minLength={6}
            className="text-gray-900 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="••••••••"
          />
        </div>
        
        <button 
          type="submit"
          disabled={pending}
          className="w-full text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 shadow-lg shadow-red-500/50 font-medium rounded-lg text-sm px-6 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pending ? 'Signing up...' : 'Sign up'}
        </button>
      </form>
    </div>
  );
}