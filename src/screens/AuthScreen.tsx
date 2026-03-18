import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, ArrowRight, Mail, Lock, User } from 'lucide-react';
import { cn } from '../lib/utils';

export default function AuthScreen() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-12">
        {/* Logo/Header */}
        <div className="text-center space-y-4">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex p-4 bg-orange-500/10 border border-orange-500/30 rounded-2xl"
          >
            <Shield className="text-orange-500" size={32} />
          </motion.div>
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tighter uppercase">The Drop</h1>
            <p className="text-white/40 text-sm font-medium tracking-wide">
              {mode === 'login' ? "The Drop remembers you." : "Access is earned. It starts here."}
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-orange-500 transition-colors">
                <Mail size={18} />
              </div>
              <input 
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all placeholder:text-white/20"
              />
            </div>

            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-orange-500 transition-colors">
                <Lock size={18} />
              </div>
              <input 
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all placeholder:text-white/20"
              />
            </div>

            {mode === 'register' && (
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-orange-500 transition-colors">
                  <User size={18} />
                </div>
                <input 
                  type="text"
                  placeholder="Full Name"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all placeholder:text-white/20"
                />
              </div>
            )}
          </div>

          <button className="w-full py-5 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:bg-white/90 transition-all flex items-center justify-center gap-2 group">
            {mode === 'login' ? 'Enter The Void' : 'Begin Initiation'}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="text-center">
            <button 
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="text-xs font-bold text-white/40 hover:text-white transition-colors uppercase tracking-widest"
            >
              {mode === 'login' ? "Need access? Request initiation" : "Already initiated? Return to void"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-12 flex justify-center gap-8 opacity-20 grayscale">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-4" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4" />
        </div>
      </div>
    </div>
  );
}
