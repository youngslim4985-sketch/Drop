/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Wine, User, Shield, Bell } from 'lucide-react';
import DropScreen from './screens/DropScreen';
import AuthScreen from './screens/AuthScreen';
import AccountScreen from './screens/AccountScreen';
import CellarScreen from './screens/CellarScreen';
import { useNotifications } from './services/notifications';
import { cn } from './lib/utils';

function Navigation() {
  const location = useLocation();
  const navItems = [
    { path: '/', icon: Home, label: 'Drops' },
    { path: '/cellar', icon: Wine, label: 'Cellar' },
    { path: '/account', icon: User, label: 'Account' }
  ];

  if (location.pathname === '/auth') return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-xl border-t border-white/10 px-6 py-4">
      <div className="max-w-md mx-auto flex justify-between items-center">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 transition-all",
                isActive ? "text-orange-500" : "text-white/40 hover:text-white"
              )}
            >
              <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function Header() {
  const location = useLocation();
  if (location.pathname === '/auth') return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex justify-between items-center bg-gradient-to-b from-black to-transparent pointer-events-none">
      <div className="flex items-center gap-2 pointer-events-auto">
        <Shield className="text-orange-500" size={24} />
        <span className="font-black tracking-tighter text-xl">THE DROP</span>
      </div>
      <button className="p-2 bg-white/5 border border-white/10 rounded-full pointer-events-auto hover:bg-white/10 transition-all">
        <Bell size={20} className="text-white/60" />
      </button>
    </header>
  );
}

export default function App() {
  useNotifications();

  return (
    <Router>
      <div className="min-h-screen bg-[#050505]">
        <Header />
        <main className="pb-24 pt-16">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<DropScreen />} />
              <Route path="/auth" element={<AuthScreen />} />
              <Route path="/account" element={<AccountScreen />} />
              <Route path="/cellar" element={<CellarScreen />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Navigation />
      </div>
    </Router>
  );
}
