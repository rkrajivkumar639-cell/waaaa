import React, { useState, useRef, useEffect, MouseEvent } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ShieldCheck, 
  Flame, 
  Award, 
  ChevronRight,
  Maximize2,
  RefreshCw,
  ShoppingBag
} from 'lucide-react';
import { motion, useSpring, useMotionValue, useTransform } from 'motion/react';

interface Hero3DVideoProps {
  onExplorePlans: () => void;
  onOpenBooking: () => void;
  onQuickAddMealToGrocery: () => void;
}

export const Hero3DVideo: React.FC<Hero3DVideoProps> = ({
  onExplorePlans,
  onOpenBooking,
  onQuickAddMealToGrocery,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [is3DActive, setIs3DActive] = useState(true);
  const [showMacroDetails, setShowMacroDetails] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for smooth 3D mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for perspective tilt
  const springConfig = { damping: 20, stiffness: 180, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);
  const glareX = useTransform(smoothX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(smoothY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!is3DActive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const reset3D = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section id="hero" className="relative w-full pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden">
      {/* Background radial atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-tr from-red-600/15 via-amber-500/10 to-transparent blur-3xl pointer-events-none -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Hero Pitch */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-slate-300 font-medium mb-5">
            <span className="w-2 h-2 rounded-full bg-[#ff3b30]" />
            <span>Michelin-Grade Macro Nutrition · Delivered Across India</span>
            <span className="text-white/40">·</span>
            <span className="text-amber-400 font-semibold">₹249/meal onwards</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.08] mb-5">
            Fuel Your Physique. <br />
            <span className="bg-gradient-to-r from-white via-slate-200 to-amber-200 bg-clip-text text-transparent">
              Engineered by Science.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Experience bespoke clinical meal plans, precision macro tracking, and gourmet chef-prepared fresh diet meals delivered daily to your doorstep in Mumbai, Delhi, Bengaluru, and Hyderabad.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
            <button
              onClick={onExplorePlans}
              className="px-6 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#e5252a] to-[#ff4742] hover:from-[#d11e22] hover:to-[#eb3b36] rounded-xl shadow-xl shadow-red-700/25 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Build My Personalized Plan</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenBooking}
              className="px-6 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 rounded-xl transition-all cursor-pointer"
            >
              <span>Book Dietitian Consultation · ₹1,999</span>
            </button>
          </div>
        </div>

        {/* 3D Interactive Front Video Section */}
        <div 
          className="relative max-w-5xl mx-auto perspective-1200 py-4"
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
        >
          {/* Controls Bar Above Video */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-3 px-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Live 3D Culinary Interaction
              </span>
              <span className="hidden sm:inline text-white/30">|</span>
              <span className="hidden sm:inline text-slate-400">
                Move cursor or tilt to inspect layered macro depth
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIs3DActive(!is3DActive)}
                className={`px-2.5 py-1 rounded text-[11px] font-medium border transition-colors ${
                  is3DActive ? 'border-amber-500/40 text-amber-300 bg-amber-500/10' : 'border-white/10 text-slate-400'
                }`}
              >
                {is3DActive ? '3D Active' : '3D Paused'}
              </button>
              <button
                onClick={reset3D}
                className="p-1.5 rounded border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                title="Reset Angle"
              >
                <RefreshCw className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* The 3D Preserved Card Container */}
          <motion.div
            style={{
              rotateX: is3DActive ? rotateX : 0,
              rotateY: is3DActive ? rotateY : 0,
              transformStyle: 'preserve-3d',
            }}
            className="relative rounded-2xl md:rounded-3xl overflow-visible border border-white/15 bg-[#121518]/90 shadow-2xl shadow-black/80 transition-shadow duration-300"
          >
            {/* Specular lighting sheen overlay */}
            <motion.div
              style={{
                background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 65%)`,
              }}
              className="absolute inset-0 rounded-2xl md:rounded-3xl pointer-events-none z-20"
            />

            {/* Video Canvas Container */}
            <div className="relative aspect-video w-full rounded-2xl md:rounded-3xl overflow-hidden bg-black">
              <video
                ref={videoRef}
                src={`${import.meta.env.BASE_URL}assets/aistudio/gemini_generated_video_a59c4846_45cb7841.mp4`}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                preload="auto"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              {/* Cinematic Vignette & Bottom Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />

              {/* Video Overlay Interactive Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-30 pointer-events-auto">
                <div className="flex items-center gap-2">
                  <button
                    onClick={togglePlay}
                    className="p-2.5 rounded-xl bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-2.5 rounded-xl bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 text-xs text-white">
                    <Flame className="w-3.5 h-3.5 text-[#ff3b30]" />
                    <span className="font-semibold">Signature Bowl:</span>
                    <span className="text-slate-300">Herb Rosemary Chicken & Omega-3 Egg</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowMacroDetails(!showMacroDetails)}
                    className="px-3 py-1.5 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-xs font-medium text-white transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{showMacroDetails ? 'Hide Anatomy' : 'Macro Breakdown'}</span>
                  </button>

                  <button
                    onClick={onQuickAddMealToGrocery}
                    className="px-3.5 py-1.5 rounded-xl bg-[#ff3b30] hover:bg-[#e02d23] text-white text-xs font-semibold shadow-lg shadow-red-600/30 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Add Ingredients ·</span>
                    <span>₹249</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 3D Floating Layers (Popping out in Z-Space with interactive depth) */}
            {/* Top-Left Floating Badge: Protein Anchor */}
            <div 
              style={{ transform: 'translateZ(55px)' }}
              className="absolute -top-4 -left-3 sm:-top-5 sm:-left-6 z-40 bg-[#161a1e]/95 border border-white/20 rounded-xl p-3 shadow-2xl backdrop-blur-md flex items-center gap-3 transition-transform duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-red-500/15 border border-red-500/30 flex items-center justify-center text-[#ff3b30] font-bold text-lg font-display">
                48g
              </div>
              <div className="text-left">
                <div className="text-[11px] font-bold text-white uppercase tracking-wider">
                  Lean Protein
                </div>
                <div className="text-[10px] text-slate-400">
                  Free-range grilled chicken & egg
                </div>
              </div>
            </div>

            {/* Top-Right Floating Badge: Clean Calorie Precision */}
            <div 
              style={{ transform: 'translateZ(65px)' }}
              className="absolute -top-4 -right-3 sm:-top-5 sm:-right-6 z-40 bg-[#161a1e]/95 border border-white/20 rounded-xl p-3 shadow-2xl backdrop-blur-md flex items-center gap-3 transition-transform duration-200"
            >
              <div className="text-right">
                <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider flex items-center justify-end gap-1">
                  <Flame className="w-3 h-3 text-amber-400" />
                  <span>540 kcal</span>
                </div>
                <div className="text-[10px] text-slate-400">
                  Calibrated metabolic fuel
                </div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm">
                42%
              </div>
            </div>

            {/* Bottom-Right Floating Card: Indian Delivery Notice */}
            <div 
              style={{ transform: 'translateZ(45px)' }}
              className="hidden md:flex absolute -bottom-5 -right-6 z-40 bg-[#161a1e]/95 border border-white/20 rounded-xl px-4 py-2.5 shadow-2xl backdrop-blur-md items-center gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <div className="text-xs">
                <span className="font-semibold text-white">Daily Fresh Cooked: </span>
                <span className="text-slate-300">Mumbai · Delhi NCR · BLR · HYD</span>
              </div>
              <span className="text-xs font-bold text-amber-300 tabular-nums">From ₹249</span>
            </div>
          </motion.div>

          {/* Macro Anatomy Drawer Expandable */}
          {showMacroDetails && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-5 rounded-2xl bg-[#161a1e] border border-white/15 shadow-xl text-left"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div>
                  <h3 className="font-display text-base font-bold text-white">
                    Clinical Macro & Micronutrient Profile
                  </h3>
                  <p className="text-xs text-slate-400">
                    Sourced from organic certified poultry, cold-pressed olive oils, and hydroponic greens.
                  </p>
                </div>
                <div className="text-sm font-bold text-amber-400 tabular-nums">
                  Total Serving: 420g · ₹249
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider">Protein</div>
                  <div className="text-xl font-black text-white font-display tabular-nums">48g</div>
                  <div className="text-[10px] text-red-400">Leucine-rich complete amino</div>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider">Complex Carbs</div>
                  <div className="text-xl font-black text-white font-display tabular-nums">22g</div>
                  <div className="text-[10px] text-emerald-400">Low-GI fiber-bound carbs</div>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider">Healthy Lipids</div>
                  <div className="text-xl font-black text-white font-display tabular-nums">16g</div>
                  <div className="text-[10px] text-amber-400">Omega-3 EPA/DHA & MUFA</div>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider">Prebiotic Fiber</div>
                  <div className="text-xl font-black text-white font-display tabular-nums">8g</div>
                  <div className="text-[10px] text-blue-400">Gut microbiome support</div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Proof Metrics Strip (Claim-to-proof adjacency) */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-display tabular-nums">
              15,000+
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Athletes & Executives Fed Across India
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-display tabular-nums">
              4.98 / 5
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Clinical & Taste Score (Over 9,200 Reviews)
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-display tabular-nums">
              100%
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Zero Refined Sugar · Zero Seed Oils
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-display tabular-nums">
              ₹249<span className="text-sm text-slate-400 font-normal">/meal</span>
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Transparent Indian Rupee Pricing
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
