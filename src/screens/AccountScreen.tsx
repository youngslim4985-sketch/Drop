import React from 'react';
import { motion } from 'motion/react';
import { User, Award, CreditCard, LogOut, Package, ChevronRight, Star } from 'lucide-react';
import { cn } from '../lib/utils';

export default function AccountScreen() {
  const user = {
    name: "ALEX RIVERA",
    tier: "SILVER",
    score: 742,
    drops: 12,
    spent: "$3,420",
    email: "alex@example.com"
  };

  const tiers = [
    { name: 'BRONZE', price: 'Free', color: 'text-orange-700', bg: 'bg-orange-700/10', border: 'border-orange-700/30' },
    { name: 'SILVER', price: '$19/mo', color: 'text-gray-300', bg: 'bg-gray-300/10', border: 'border-gray-300/30' },
    { name: 'GOLD', price: '$99/mo', color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 pb-24">
      <div className="max-w-2xl mx-auto space-y-12">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="relative">
            <div className={cn(
              "w-32 h-32 rounded-full border-4 flex items-center justify-center",
              user.tier === 'SILVER' ? 'border-gray-400' : 'border-orange-500'
            )}>
              <div className="w-28 h-28 rounded-full bg-white/5 flex items-center justify-center">
                <User size={48} className="text-white/20" />
              </div>
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-black text-[10px] font-black rounded-full">
              {user.tier}
            </div>
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tighter">{user.name}</h1>
            <p className="text-white/40 text-sm font-mono uppercase tracking-widest">{user.email}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'SCORE', value: user.score, icon: Star },
            { label: 'DROPS', value: user.drops, icon: Package },
            { label: 'SPENT', value: user.spent, icon: CreditCard }
          ].map((stat, i) => (
            <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center space-y-2">
              <stat.icon size={16} className="mx-auto text-white/30" />
              <div className="text-xl font-bold">{stat.value}</div>
              <div className="text-[8px] font-mono text-white/40 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Subscription Tiers */}
        <div className="space-y-6">
          <h3 className="text-xs font-mono text-white/40 uppercase tracking-[0.3em]">Upgrade Standing</h3>
          <div className="grid grid-cols-1 gap-4">
            {tiers.map((tier, i) => (
              <div 
                key={i}
                className={cn(
                  "p-6 rounded-2xl border flex items-center justify-between group cursor-pointer transition-all",
                  tier.bg, tier.border,
                  user.tier === tier.name ? "ring-2 ring-white/20" : "opacity-60 hover:opacity-100"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn("p-3 rounded-xl bg-black/40", tier.color)}>
                    <Award size={24} />
                  </div>
                  <div>
                    <div className={cn("font-black tracking-tight", tier.color)}>{tier.name}</div>
                    <div className="text-xs text-white/40">{tier.price}</div>
                  </div>
                </div>
                {user.tier === tier.name ? (
                  <div className="text-[10px] font-black text-white/40 uppercase">Current</div>
                ) : (
                  <ChevronRight size={20} className="text-white/20 group-hover:text-white transition-colors" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4 pt-8">
          <button className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-all">
            <div className="flex items-center gap-4">
              <CreditCard size={20} className="text-white/40" />
              <span className="font-bold">Billing Portal</span>
            </div>
            <ChevronRight size={18} className="text-white/20" />
          </button>
          <button className="w-full p-5 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-between hover:bg-red-500/20 transition-all group">
            <div className="flex items-center gap-4">
              <LogOut size={20} className="text-red-500/60" />
              <span className="font-bold text-red-500/80">Logout</span>
            </div>
            <ArrowRight size={18} className="text-red-500/20 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ArrowRight({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  );
}
