import React, { useState } from 'react';
import { 
  NutritionistSpecialist, 
  MealDeliveryPlan, 
  BookingSubmission 
} from '../types/diet';
import { 
  NUTRITIONISTS, 
  MEAL_DELIVERY_PLANS 
} from '../data/mockData';
import { 
  Calendar, 
  Clock, 
  Check, 
  Star, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  ChevronRight, 
  Sparkles,
  MapPin,
  UserCheck,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookingSectionProps {
  onBookingSuccess?: (booking: BookingSubmission) => void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({ onBookingSuccess }) => {
  const [activeTab, setActiveTab] = useState<'consultation' | 'meal_box'>('consultation');
  
  // Consultation booking state
  const [selectedSpecialist, setSelectedSpecialist] = useState<NutritionistSpecialist>(NUTRITIONISTS[0]);
  const [consultDate, setConsultDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [consultTime, setConsultTime] = useState('11:00 AM - 11:45 AM');
  
  // Meal box booking state
  const [selectedMealPlan, setSelectedMealPlan] = useState<MealDeliveryPlan>(MEAL_DELIVERY_PLANS[1]);
  const [deliveryCity, setDeliveryCity] = useState('Mumbai');
  const [deliveryPincode, setDeliveryPincode] = useState('400050');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  // Common customer details
  const [clientName, setClientName] = useState('Rajiv Kumar');
  const [clientEmail, setClientEmail] = useState('rkrajivkumar639@gmail.com');
  const [clientPhone, setClientPhone] = useState('+91 98765 43210');
  const [dietaryNotes, setDietaryNotes] = useState('');

  // Confirmation modal
  const [confirmedBooking, setConfirmedBooking] = useState<BookingSubmission | null>(null);

  const availableTimeSlots = [
    '09:00 AM - 09:45 AM',
    '11:00 AM - 11:45 AM',
    '02:30 PM - 03:15 PM',
    '05:00 PM - 05:45 PM',
    '07:00 PM - 07:45 PM',
  ];

  const indianMetroCities = [
    'Mumbai',
    'Delhi NCR (Gurugram / Noida)',
    'Bengaluru',
    'Hyderabad',
    'Pune',
    'Chennai',
    'Kolkata',
    'Ahmedabad',
  ];

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();

    const isConsult = activeTab === 'consultation';
    const subtotal = isConsult ? selectedSpecialist.consultationFeeINR : selectedMealPlan.priceINR;
    const gst = Math.round(subtotal * 0.05); // 5% GST for nutrition / cloud-kitchen services
    const total = subtotal + gst;

    const newBooking: BookingSubmission = {
      id: `GG-IN-${Math.floor(100000 + Math.random() * 900000)}`,
      bookingType: isConsult ? 'consultation' : 'meal_box',
      clientName,
      clientEmail,
      clientPhone,
      city: deliveryCity,
      address: isConsult ? undefined : deliveryAddress,
      pincode: isConsult ? undefined : deliveryPincode,
      date: consultDate,
      timeSlot: isConsult ? consultTime : undefined,
      specialist: isConsult ? selectedSpecialist : undefined,
      mealPlan: !isConsult ? selectedMealPlan : undefined,
      dietaryNotes,
      subtotalINR: subtotal,
      gstINR: gst,
      totalINR: total,
      createdAt: new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    };

    setConfirmedBooking(newBooking);
    if (onBookingSuccess) {
      onBookingSuccess(newBooking);
    }

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <section id="booking" className="py-16 md:py-24 border-t border-white/10 bg-[#0a0c0e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-widest text-[#ff3b30] font-bold mb-2">
            Elite Health Concierge
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Book Your Transformation Experience
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2">
            Choose between private 1-on-1 clinical nutrition consultations or daily fresh gourmet chef-prepared diet food boxes delivered across India.
          </p>

          {/* Mode Tabs */}
          <div className="inline-flex items-center gap-1 p-1 bg-[#14181c] rounded-xl border border-white/10 mt-6">
            <button
              onClick={() => setActiveTab('consultation')}
              className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'consultation'
                  ? 'bg-[#ff3b30] text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              1-on-1 Dietitian Consultation (from ₹1,999)
            </button>
            <button
              onClick={() => setActiveTab('meal_box')}
              className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'meal_box'
                  ? 'bg-[#ff3b30] text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Gourmet Meal Box Subscription (from ₹3,599)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Selection Area (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {activeTab === 'consultation' ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-base font-bold text-white">
                    Select Clinical Nutritionist Specialist:
                  </h3>
                  <span className="text-xs text-amber-400 font-semibold">
                    100% Board Certified & Sports Council of India
                  </span>
                </div>

                <div className="space-y-3">
                  {NUTRITIONISTS.map((spec) => {
                    const isSelected = selectedSpecialist.id === spec.id;
                    return (
                      <div
                        key={spec.id}
                        onClick={() => setSelectedSpecialist(spec)}
                        className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                          isSelected
                            ? 'bg-[#181d22] border-[#ff3b30] shadow-xl shadow-red-950/20'
                            : 'bg-[#14181c] border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-start gap-3.5">
                          <img
                            src={spec.avatar}
                            alt={spec.name}
                            className="w-14 h-14 rounded-xl object-cover border border-white/10 shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-white">{spec.name}</h4>
                              <div className="flex items-center text-amber-400 text-xs">
                                <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                                <span>{spec.rating}</span>
                              </div>
                            </div>
                            <div className="text-[11px] text-amber-300 font-medium">{spec.credential}</div>
                            <div className="text-xs text-slate-300 mt-1 line-clamp-2">{spec.bio}</div>
                            <div className="text-[10px] text-slate-500 mt-1">
                              {spec.experienceYears}+ Yrs Exp · {spec.clientsHelped}+ Transformations
                            </div>
                          </div>
                        </div>

                        <div className="sm:text-right shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                          <div className="text-lg font-black text-white font-display tabular-nums">
                            ₹{spec.consultationFeeINR.toLocaleString('en-IN')}
                          </div>
                          <div className="text-[10px] text-slate-400">45-min Zoom / Google Meet</div>
                          <div
                            className={`mt-2 inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-semibold ${
                              isSelected
                                ? 'bg-[#ff3b30] text-white'
                                : 'bg-white/5 text-slate-300 border border-white/10'
                            }`}
                          >
                            {isSelected ? 'Selected' : 'Choose Specialist'}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Slot Selection */}
                <div className="p-5 rounded-2xl bg-[#14181c] border border-white/10 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Select Consultation Date & Time
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-400 mb-1 block">Date</label>
                      <input
                        type="date"
                        value={consultDate}
                        onChange={(e) => setConsultDate(e.target.value)}
                        className="w-full bg-[#0a0c0e] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff3b30]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-400 mb-1 block">Time Slot (IST)</label>
                      <select
                        value={consultTime}
                        onChange={(e) => setConsultTime(e.target.value)}
                        className="w-full bg-[#0a0c0e] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                      >
                        {availableTimeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-base font-bold text-white">
                    Select Gourmet Diet Meal Box Subscription:
                  </h3>
                  <span className="text-xs text-amber-400 font-semibold">
                    Fresh Chilled Deliveries Daily in India
                  </span>
                </div>

                <div className="space-y-3">
                  {MEAL_DELIVERY_PLANS.map((plan) => {
                    const isSelected = selectedMealPlan.id === plan.id;
                    return (
                      <div
                        key={plan.id}
                        onClick={() => setSelectedMealPlan(plan)}
                        className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                          isSelected
                            ? 'bg-[#181d22] border-[#ff3b30] shadow-xl shadow-red-950/20'
                            : 'bg-[#14181c] border-white/10 hover:border-white/20'
                        }`}
                      >
                        {plan.isPopular && (
                          <div className="absolute top-0 right-0 bg-[#ff3b30] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-bl-lg">
                            Most Popular Transformation
                          </div>
                        )}

                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div>
                            <div className="text-base font-bold text-white font-display">
                              {plan.name}
                            </div>
                            <div className="text-xs text-amber-400 mt-0.5">{plan.tagline}</div>
                            <div className="text-xs text-slate-300 mt-2 font-medium">
                              {plan.duration} · {plan.mealsPerDay} Gourmet Meals/Day
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              {plan.targetCalorieRange} · {plan.proteinPerDay}
                            </div>
                          </div>

                          <div className="sm:text-right shrink-0">
                            <div className="text-2xl font-black text-white font-display tabular-nums">
                              ₹{plan.priceINR.toLocaleString('en-IN')}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              (approx. ₹{Math.round(plan.priceINR / (plan.mealsPerDay * (plan.duration.includes('6') ? 6 : 24)))} / meal)
                            </div>
                            <div
                              className={`mt-2 inline-flex items-center gap-1 px-3 py-1 rounded text-[10px] font-semibold ${
                                isSelected
                                  ? 'bg-[#ff3b30] text-white'
                                  : 'bg-white/5 text-slate-300 border border-white/10'
                              }`}
                            >
                              {isSelected ? 'Plan Selected' : 'Choose Plan'}
                            </div>
                          </div>
                        </div>

                        <ul className="mt-4 pt-3 border-t border-white/5 space-y-1.5">
                          {plan.features.map((feat, i) => (
                            <li key={i} className="text-xs text-slate-300 flex items-center gap-2">
                              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>

                {/* Delivery Location inputs */}
                <div className="p-5 rounded-2xl bg-[#14181c] border border-white/10 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Indian Metro Delivery Destination
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-400 mb-1 block">City</label>
                      <select
                        value={deliveryCity}
                        onChange={(e) => setDeliveryCity(e.target.value)}
                        className="w-full bg-[#0a0c0e] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                      >
                        {indianMetroCities.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-400 mb-1 block">Postal Code (PIN)</label>
                      <input
                        type="text"
                        value={deliveryPincode}
                        onChange={(e) => setDeliveryPincode(e.target.value)}
                        placeholder="e.g. 400050"
                        className="w-full bg-[#0a0c0e] border border-white/15 rounded-xl px-3 py-2 text-xs text-white tabular-nums focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 mb-1 block">
                      Delivery Address / Flat & Building
                    </label>
                    <input
                      type="text"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="e.g. 402 Palm Breeze Apartments, Bandra West"
                      className="w-full bg-[#0a0c0e] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Checkout Summary & Customer Form (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="p-6 md:p-8 rounded-2xl bg-[#14181c] border border-white/15 shadow-2xl sticky top-24">
              <h3 className="font-display text-lg font-bold text-white mb-4 pb-3 border-b border-white/10 flex items-center justify-between">
                <span>Order & Booking Breakdown</span>
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Secure Encrypted
                </span>
              </h3>

              <form onSubmit={handleSubmitBooking} className="space-y-4">
                <div>
                  <label className="text-[11px] text-slate-300 font-semibold mb-1 block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-[#0a0c0e] border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff3b30]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-300 font-semibold mb-1 block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full bg-[#0a0c0e] border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff3b30]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-300 font-semibold mb-1 block">
                      Mobile Number (+91)
                    </label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full bg-[#0a0c0e] border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white tabular-nums focus:outline-none focus:border-[#ff3b30]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-slate-300 font-semibold mb-1 block">
                    Special Dietary Instructions / Allergies (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={dietaryNotes}
                    onChange={(e) => setDietaryNotes(e.target.value)}
                    placeholder="e.g. No shellfish, lactose intolerant, prefer mild Indian spices"
                    className="w-full bg-[#0a0c0e] border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>

                {/* Price Summary in Indian Rupees (₹) */}
                <div className="pt-4 border-t border-white/10 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>
                      {activeTab === 'consultation'
                        ? `Consultation: ${selectedSpecialist.name}`
                        : `Plan: ${selectedMealPlan.name}`}
                    </span>
                    <span className="text-white font-semibold tabular-nums">
                      ₹{(activeTab === 'consultation'
                        ? selectedSpecialist.consultationFeeINR
                        : selectedMealPlan.priceINR
                      ).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-400">
                    <span>GST (5% Health / Culinary Tax)</span>
                    <span className="text-white tabular-nums">
                      ₹{Math.round(
                        (activeTab === 'consultation'
                          ? selectedSpecialist.consultationFeeINR
                          : selectedMealPlan.priceINR) * 0.05
                      ).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-400">
                    <span>Priority Onboarding & App Pass</span>
                    <span className="text-emerald-400 font-semibold uppercase">Free</span>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-base font-bold text-white">
                    <span>Total Amount (INR):</span>
                    <span className="text-xl font-black text-amber-400 font-display tabular-nums">
                      ₹{Math.round(
                        (activeTab === 'consultation'
                          ? selectedSpecialist.consultationFeeINR
                          : selectedMealPlan.priceINR) * 1.05
                      ).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#e5252a] to-[#ff4742] hover:from-[#d11e22] hover:to-[#eb3b36] text-white text-xs font-bold uppercase tracking-wider shadow-xl shadow-red-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>
                    Confirm & Reserve · ₹
                    {Math.round(
                      (activeTab === 'consultation'
                        ? selectedSpecialist.consultationFeeINR
                        : selectedMealPlan.priceINR) * 1.05
                    ).toLocaleString('en-IN')}
                  </span>
                </button>

                <div className="text-[11px] text-center text-slate-400 flex items-center justify-center gap-2 mt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Instant Confirmation · Razorpay & UPI Supported</span>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        {confirmedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="bg-[#14181c] border border-emerald-500/50 rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl text-left animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>

              <div className="text-center mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                  Booking Confirmed
                </span>
                <h3 className="font-display text-2xl font-black text-white mt-1">
                  Welcome to Gain Grub Elite
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Reference: <span className="font-mono text-amber-400">{confirmedBooking.id}</span>
                </p>
              </div>

              <div className="bg-black/50 rounded-xl p-4 border border-white/10 space-y-2 text-xs mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-400">Client:</span>
                  <span className="text-white font-medium">{confirmedBooking.clientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Contact:</span>
                  <span className="text-white font-mono">{confirmedBooking.clientPhone}</span>
                </div>
                {confirmedBooking.specialist && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Consultant:</span>
                    <span className="text-amber-300 font-medium">{confirmedBooking.specialist.name}</span>
                  </div>
                )}
                {confirmedBooking.timeSlot && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Slot Scheduled:</span>
                    <span className="text-white">{confirmedBooking.date} ({confirmedBooking.timeSlot})</span>
                  </div>
                )}
                {confirmedBooking.mealPlan && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Delivery Plan:</span>
                    <span className="text-amber-300 font-medium">{confirmedBooking.mealPlan.name}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-white/10 text-sm font-bold">
                  <span className="text-white">Amount Paid:</span>
                  <span className="text-emerald-400 tabular-nums">₹{confirmedBooking.totalINR.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setConfirmedBooking(null)}
                  className="w-full py-3 rounded-xl bg-[#ff3b30] hover:bg-[#e02d23] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
