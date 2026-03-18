import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wine, Search, Filter, ChevronRight, Star, ShoppingCart, Timer } from 'lucide-react';

export default function CellarScreen() {
  const [selectedWine, setSelectedWine] = useState<any>(null);
  const [isAcquisitionOpen, setIsAcquisitionOpen] = useState(false);

  const wines = [
    { id: 1, name: "Château Redacted 2018", region: "Bordeaux, FR", price: "$1,200", score: 98, image: "https://picsum.photos/seed/wine1/400/600" },
    { id: 2, name: "The Void Reserve", region: "Napa Valley, US", price: "$850", score: 96, image: "https://picsum.photos/seed/wine2/400/600" },
    { id: 3, name: "Midnight Harvest", region: "Tuscany, IT", price: "$2,400", score: 99, image: "https://picsum.photos/seed/wine3/400/600" },
    { id: 4, name: "Obsidian Syrah", region: "Barossa, AU", price: "$600", score: 94, image: "https://picsum.photos/seed/wine4/400/600" }
  ];

  const handleAcquire = (wine: any) => {
    setSelectedWine(wine);
    setIsAcquisitionOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 pb-24">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex justify-between items-end">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-orange-500">
              <Wine size={18} />
              <span className="text-xs font-mono uppercase tracking-[0.3em]">The Cellar</span>
            </div>
            <h1 className="text-5xl font-black tracking-tighter">VINTAGE ACCESS</h1>
          </div>
          <div className="flex gap-2">
            <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
              <Search size={20} className="text-white/40" />
            </button>
            <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
              <Filter size={20} className="text-white/40" />
            </button>
          </div>
        </div>

        {/* Featured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {wines.map((wine) => (
            <motion.div 
              key={wine.id}
              whileHover={{ y: -10 }}
              className="group relative aspect-[3/4] overflow-hidden rounded-3xl border border-white/10 bg-white/5"
            >
              <img 
                src={wine.image} 
                alt={wine.name} 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              
              <div className="absolute top-6 right-6 flex items-center gap-1 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
                <Star size={12} className="text-yellow-500 fill-yellow-500" />
                <span className="text-xs font-bold">{wine.score}</span>
              </div>

              <div className="absolute bottom-8 left-8 right-8 space-y-4">
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{wine.region}</div>
                  <h3 className="text-2xl font-black tracking-tight">{wine.name}</h3>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-orange-400">{wine.price}</span>
                  <button 
                    onClick={() => handleAcquire(wine)}
                    className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Acquisition Modal */}
      <AnimatePresence>
        {isAcquisitionOpen && selectedWine && (
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
                <h2 className="text-3xl font-black tracking-tight uppercase">Acquire Vintage</h2>
                <p className="text-white/50 text-sm">Secure {selectedWine.name} for your collection.</p>
              </div>

              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4">
                <div className="flex justify-between">
                  <span className="text-white/50">Vintage Price</span>
                  <span className="font-bold">{selectedWine.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Cellar Storage</span>
                  <span className="font-bold text-green-400">INCLUDED</span>
                </div>
                <div className="h-[1px] w-full bg-white/10" />
                <div className="flex justify-between text-xl font-black">
                  <span>TOTAL</span>
                  <span>{selectedWine.price}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[10px] font-mono text-white/30 uppercase tracking-widest">
                  <Timer size={12} />
                  Reservation expires in 09:59
                </div>
                <button 
                  onClick={() => {
                    alert(`Acquisition of ${selectedWine.name} successful!`);
                    setIsAcquisitionOpen(false);
                  }}
                  className="w-full py-5 bg-orange-500 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20"
                >
                  Confirm Acquisition
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
