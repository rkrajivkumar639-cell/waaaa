import React, { useState } from 'react';
import { ShoppingBag, Calendar, Menu, X, ArrowRight, Activity } from 'lucide-react';

interface HeaderProps {
  groceryCount: number;
  onOpenBooking: () => void;
  onSelectTab: (tabId: string) => void;
  activeTab: string;
}

export const Header: React.FC<HeaderProps> = ({
  groceryCount,
  onOpenBooking,
  onSelectTab,
  activeTab
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: '3D Experience' },
    { id: 'meal-plans', label: 'Personalized Plans' },
    { id: 'tracker', label: 'Macro Tracker' },
    { id: 'groceries', label: `Grocery Builder (${groceryCount})` },
    { id: 'booking', label: 'Luxury Concierge' },
  ];

  const handleNavClick = (id: string) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0b0d0e]/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark with Logo */}
        <a 
          href="#hero" 
          onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }}
          className="flex items-center gap-3 whitespace-nowrap shrink-0 group focus:outline-none"
        >
          <div className="relative w-11 h-11 rounded-lg overflow-hidden border border-white/15 bg-black/60 flex items-center justify-center p-0.5 group-hover:border-red-500/60 transition-colors">
            <img 
              src={`${import.meta.env.BASE_URL}assets/aistudio/1_f115f14d.png`}
              alt="Gain Grub Logo" 
              className="w-full h-full object-contain filter drop-shadow"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl font-black tracking-tight text-white flex items-center gap-1.5">
              GAIN <span className="text-[#ff3b30]">GRUB</span>
            </span>
            <span className="text-[10px] tracking-widest uppercase text-white/50 font-medium">
              Luxury Diet & Nutrition
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links (Strict 3-zone contract, single-line text links) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
                activeTab === item.id 
                  ? 'text-white border-b-2 border-[#ff3b30] font-semibold' 
                  : 'hover:text-white text-slate-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action + Quick Affordances */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Grocery Cart Shortcut */}
          <button
            onClick={() => handleNavClick('groceries')}
            className="relative p-2.5 rounded-lg border border-white/10 hover:border-white/25 hover:bg-white/5 text-slate-200 transition-colors flex items-center justify-center"
            title="View Grocery List"
            aria-label="Grocery List"
          >
            <ShoppingBag className="w-5 h-5" />
            {groceryCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 bg-[#ff3b30] text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-md tabular-nums">
                {groceryCount}
              </span>
            )}
          </button>

          {/* Primary CTA */}
          <button
            onClick={onOpenBooking}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#e5252a] to-[#ff4742] hover:from-[#d11e22] hover:to-[#eb3b36] rounded-lg shadow-lg shadow-red-600/20 hover:shadow-red-600/35 transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>Book Consultation · ₹1,999</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#0d1012] px-4 pt-3 pb-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-white flex items-center justify-between"
            >
              <span>{item.label}</span>
              {activeTab === item.id && <div className="w-1.5 h-1.5 rounded-full bg-[#ff3b30]" />}
            </button>
          ))}
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-center text-white bg-[#ff3b30] hover:bg-[#e03026] rounded-lg shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Clinical Diet Consultation · ₹1,999</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
