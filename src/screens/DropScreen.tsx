import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Unlock, ShoppingCart, ShieldCheck, Timer, ChevronRight, User } from 'lucide-react';
import { cn } from '../lib/utils';

export default function DropScreen() {
  const [isRitualOpen, setIsRitualOpen] = useState(false);
  const [isAcquisitionOpen, setIsAcquisitionOpen] = useState(false);
  const [accessStatus, setAccessStatus] = useState<'locked' | 'pending' | 'approved'>('locked');
  const [userScore, setUserScore] = useState(742);

  const drop = {
    title: "GENESIS: THE BEGINNING",
    artist: "REDACTED",
    type: "ALBUM + ART",
    price: "$249.00",
    progress: 82,
    totalEditions: 500,
    remaining: 89,
    status: "LIVE"
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-orange-500/30">
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <img 
          src="https://picsum.photos/seed/abstract/1200/800" 
          alt="Drop Hero" 
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
        
        {/* Gold Frame Corners */}
        <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-orange-400/50" />
        <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-orange-400/50" />
        <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-orange-400/50" />
        <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-orange-400/50" />

        <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-orange-500/20 border border-orange-500/40 rounded-full">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">{drop.status}</span>
          </div>
        </div>

        <div className="absolute bottom-12 left-12 right-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-12 bg-white/30" />
              <span className="text-xs font-mono tracking-widest text-white/50 uppercase">{drop.type}</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
              {drop.title}
            </h1>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center overflow-hidden border border-white/20">
                <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 animate-shimmer" />
              </div>
              <span className="text-xl font-medium tracking-tight italic opacity-80">{drop.artist}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
        {/* Identity Shimmer Bar */}
        <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded bg-white/10 animate-pulse" />
            <div className="space-y-1">
              <div className="h-3 w-32 bg-white/20 rounded" />
              <div className="h-2 w-20 bg-white/10 rounded" />
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-mono text-white/40 uppercase">Identity Status</div>
            <div className="text-xs font-bold text-orange-400">REDACTED</div>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <div className="text-xs font-mono text-white/40 uppercase">Edition Progress</div>
              <div className="text-2xl font-bold">{drop.remaining} / {drop.totalEditions} LEFT</div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-black text-white/10">{drop.progress}%</div>
            </div>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${drop.progress}%` }}
              className="h-full bg-gradient-to-r from-orange-600 to-orange-400"
            />
          </div>
        </div>

        {/* Access Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 bg-white/5 border border-white/10 rounded-2xl space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">The Ritual</h3>
              {accessStatus === 'approved' ? <Unlock className="text-green-400" /> : <Lock className="text-white/30" />}
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Access to this drop is gated by your standing. Complete the ritual to request entry.
            </p>
            <button 
              onClick={() => setIsRitualOpen(true)}
              className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
            >
              {accessStatus === 'approved' ? 'View Access' : 'Begin Ritual'}
              <ChevronRight size={18} />
            </button>
          </div>

          <div className={cn(
            "p-8 border rounded-2xl space-y-6 transition-all duration-500",
            accessStatus === 'approved' ? "bg-orange-500/10 border-orange-500/50" : "bg-white/5 border-white/10 opacity-50 grayscale"
          )}>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">The Acquisition</h3>
              <ShoppingCart className={accessStatus === 'approved' ? "text-orange-400" : "text-white/30"} />
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Once approved, you may secure your edition. Identity reveal occurs upon confirmation.
            </p>
            <button 
              disabled={accessStatus !== 'approved'}
              onClick={() => setIsAcquisitionOpen(true)}
              className="w-full py-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors disabled:bg-white/10 disabled:text-white/30"
            >
              Secure Edition
            </button>
          </div>
        </div>
      </div>

      {/* Ritual Modal */}
      <AnimatePresence>
        {isRitualOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsRitualOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-t-3xl sm:rounded-3xl p-8 space-y-8"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h2 className="text-3xl font-black tracking-tight">THE RITUAL</h2>
                  <p className="text-white/50 text-sm">Your standing determines your access.</p>
                </div>
                <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-center">
                  <div className="text-[10px] font-mono text-white/40 uppercase">Your Score</div>
                  <div className="text-xl font-bold text-orange-400">{userScore}</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center gap-4">
                  <ShieldCheck className="text-orange-400" />
                  <div className="text-sm">
                    <span className="font-bold">Tier 2 (Silver)</span> detected. 
                    <br/>
                    <span className="text-white/50 text-xs">Auto-approval threshold: 700</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => {
                  setAccessStatus('approved');
                  setIsRitualOpen(false);
                }}
                className="w-full py-5 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:bg-white/90 transition-all"
              >
                Request Access
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Acquisition Modal */}
      <AnimatePresence>
        {isAcquisitionOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAcquisitionOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-t-3xl sm:rounded-3xl p-8 space-y-8"
            >
              <div className="space-y-1">
                <h2 className="text-3xl font-black tracking-tight">THE ACQUISITION</h2>
                <p className="text-white/50 text-sm">Finalize your claim to the Genesis drop.</p>
              </div>

              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4">
                <div className="flex justify-between">
                  <span className="text-white/50">Edition Price</span>
                  <span className="font-bold">{drop.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Access Fee</span>
                  <span className="font-bold text-green-400">WAIVED</span>
                </div>
                <div className="h-[1px] w-full bg-white/10" />
                <div className="flex justify-between text-xl font-black">
                  <span>TOTAL</span>
                  <span>{drop.price}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[10px] font-mono text-white/30 uppercase tracking-widest">
                  <Timer size={12} />
                  Reservation expires in 04:59
                </div>
                <button 
                  onClick={() => {
                    alert("Purchase successful! Identity revealed.");
                    setIsAcquisitionOpen(false);
                  }}
                  className="w-full py-5 bg-orange-500 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20"
                >
                  Confirm Purchase
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
