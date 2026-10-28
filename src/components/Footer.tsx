import React from 'react';
import { ShieldCheck, Award, Heart, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-[#090b0c] text-slate-400 text-xs">
      {/* Top Footer Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/15 bg-black/60 flex items-center justify-center p-1">
                <img
                  src={`${import.meta.env.BASE_URL}assets/aistudio/1_f115f14d.png`}
                  alt="Gain Grub Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-display text-xl font-black text-white tracking-tight flex items-center gap-1.5">
                  GAIN <span className="text-[#ff3b30]">GRUB</span>
                </span>
                <span className="text-[10px] text-slate-400 block tracking-widest uppercase">
                  Power Up Every Plate
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              India's premier scientific performance gastronomy platform. Bespoke clinical nutrition planning, real-time bio-tracking, and chef-cooked gourmet diet meals delivered fresh to your door.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1 text-[11px] text-slate-300">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>FSSAI Lic. #11524998000412</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span>ISO 22000 Certified</span>
              </div>
            </div>
          </div>

          {/* Indian Cities Covered */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Cities Served in India
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>Mumbai (BKC, Bandra, Powai, SoBo)</li>
              <li>Delhi NCR (Gurugram, South Delhi, Noida)</li>
              <li>Bengaluru (Indiranagar, Koramangala, Whitefield)</li>
              <li>Hyderabad (Jubilee Hills, Gachibowli, Hitec)</li>
              <li>Pune (Koregaon Park, Baner, Kalyani Nagar)</li>
              <li>Chennai (Alwarpet, ECR, Anna Nagar)</li>
            </ul>
          </div>

          {/* Quick Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Dietary Protocols
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><a href="#meal-plans" className="hover:text-white transition-colors">Hypertrophy & High Protein</a></li>
              <li><a href="#meal-plans" className="hover:text-white transition-colors">Rapid Fat Shred Protocol</a></li>
              <li><a href="#meal-plans" className="hover:text-white transition-colors">Metabolic Keto Adaptation</a></li>
              <li><a href="#meal-plans" className="hover:text-white transition-colors">Vegan Athletic Performance</a></li>
              <li><a href="#tracker" className="hover:text-white transition-colors">Macro & Water Tracking</a></li>
              <li><a href="#groceries" className="hover:text-white transition-colors">Pantry & Grocery Builder</a></li>
            </ul>
          </div>

          {/* Concierge & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Client Concierge
            </h4>
            <div className="space-y-2 text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>concierge@gaingrub.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#ff3b30]" />
                <span className="tabular-nums">+91 8000 424 678</span>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>Gain Grub Culinary Lab, Nariman Point, Mumbai 400021</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-6 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} Gain Grub Private Limited. All rights reserved. Prices indicated in Indian Rupees (₹).
          </div>
          <div className="flex items-center gap-5">
            <a href="#hero" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>·</span>
            <a href="#hero" className="hover:text-white transition-colors">Terms of Nutrition Service</a>
            <span>·</span>
            <a href="#hero" className="hover:text-white transition-colors">FSSAI Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
