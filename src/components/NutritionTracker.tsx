import React, { useState, useMemo } from 'react';
import { 
  LoggedFoodItem, 
  MealCategory 
} from '../types/diet';
import { 
  INITIAL_TODAY_LOG, 
  QUICK_ADD_FOOD_DB 
} from '../data/mockData';
import { 
  Activity, 
  Flame, 
  Droplet, 
  Plus, 
  Trash2, 
  Search, 
  CheckCircle2, 
  Sparkles,
  PieChart,
  RotateCcw
} from 'lucide-react';

interface NutritionTrackerProps {
  calorieTarget?: number;
  proteinTarget?: number;
  carbsTarget?: number;
  fatsTarget?: number;
  waterTargetLiters?: number;
}

export const NutritionTracker: React.FC<NutritionTrackerProps> = ({
  calorieTarget = 2650,
  proteinTarget = 165,
  carbsTarget = 290,
  fatsTarget = 70,
  waterTargetLiters = 3.5,
}) => {
  const [logs, setLogs] = useState<LoggedFoodItem[]>(INITIAL_TODAY_LOG);
  const [waterMl, setWaterMl] = useState(2250);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MealCategory>('snack');
  const [isCustomFormOpen, setIsCustomFormOpen] = useState(false);

  // Custom food form state
  const [customName, setCustomName] = useState('');
  const [customCal, setCustomCal] = useState(200);
  const [customProt, setCustomProt] = useState(25);
  const [customCarb, setCustomCarb] = useState(15);
  const [customFat, setCustomFat] = useState(5);
  const [customPortion, setCustomPortion] = useState('1 Serving (150g)');

  // Sum totals
  const totals = useMemo(() => {
    return logs.reduce(
      (acc, item) => ({
        calories: acc.calories + item.calories,
        protein: acc.protein + item.protein,
        carbs: acc.carbs + item.carbs,
        fats: acc.fats + item.fats,
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    );
  }, [logs]);

  const calRemaining = Math.max(0, calorieTarget - totals.calories);
  const calPercent = Math.min(100, Math.round((totals.calories / calorieTarget) * 100));
  const proteinPercent = Math.min(100, Math.round((totals.protein / proteinTarget) * 100));
  const carbsPercent = Math.min(100, Math.round((totals.carbs / carbsTarget) * 100));
  const fatsPercent = Math.min(100, Math.round((totals.fats / fatsTarget) * 100));

  const waterTargetMl = waterTargetLiters * 1000;
  const waterPercent = Math.min(100, Math.round((waterMl / waterTargetMl) * 100));

  const handleAddQuickFood = (item: typeof QUICK_ADD_FOOD_DB[0]) => {
    const newLog: LoggedFoodItem = {
      id: `log-${Date.now()}-${Math.random()}`,
      name: item.name,
      mealCategory: item.category,
      calories: item.calories,
      protein: item.protein,
      carbs: item.carbs,
      fats: item.fats,
      portion: item.portion,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setLogs([newLog, ...logs]);
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;

    const newLog: LoggedFoodItem = {
      id: `log-${Date.now()}`,
      name: customName.trim(),
      mealCategory: selectedCategory,
      calories: Number(customCal) || 0,
      protein: Number(customProt) || 0,
      carbs: Number(customCarb) || 0,
      fats: Number(customFat) || 0,
      portion: customPortion || '1 Standard Serving',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setLogs([newLog, ...logs]);
    setCustomName('');
    setIsCustomFormOpen(false);
  };

  const handleDeleteLog = (id: string) => {
    setLogs(logs.filter((item) => item.id !== id));
  };

  const handleAddWater = (amount: number) => {
    setWaterMl((prev) => Math.min(6000, prev + amount));
  };

  const filteredQuickFoods = QUICK_ADD_FOOD_DB.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="tracker" className="py-16 md:py-24 border-t border-white/10 bg-[#0a0c0e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-widest text-[#ff3b30] font-bold mb-2">
            Real-Time Nutritional Bio-Feedback
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Nutritional & Macro Tracking Center
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2">
            Audit your daily energy expenditure, protein synthesis threshold, and hydration with pinpoint clinical accuracy.
          </p>
        </div>

        {/* Dashboard Grid: Left Summary Rings, Right Today's Log & Quick Logger */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Macro Overview & Hydration (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Calorie Card */}
            <div className="p-6 md:p-8 rounded-2xl bg-[#14181c] border border-white/10 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Daily Calorie Balance
                </span>
                <span className="text-xs text-amber-400 font-semibold tabular-nums">
                  {calPercent}% of Goal
                </span>
              </div>

              <div className="flex items-baseline justify-between mb-2">
                <div>
                  <div className="text-4xl font-black text-white font-display tabular-nums">
                    {totals.calories}
                  </div>
                  <div className="text-xs text-slate-400">kcal consumed today</div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-amber-400 font-display tabular-nums">
                    {calRemaining}
                  </div>
                  <div className="text-xs text-slate-400">kcal remaining of {calorieTarget}</div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-3 bg-black/60 rounded-full overflow-hidden border border-white/5 p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-[#ff3b30] rounded-full transition-all duration-500"
                  style={{ width: `${calPercent}%` }}
                />
              </div>

              {/* Macro Trio */}
              <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-white/10">
                {/* Protein */}
                <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                  <div className="text-[10px] font-bold text-red-400 uppercase tracking-wider">
                    Protein
                  </div>
                  <div className="text-lg font-black text-white font-display tabular-nums mt-0.5">
                    {totals.protein}<span className="text-xs font-normal text-slate-400">/{proteinTarget}g</span>
                  </div>
                  <div className="w-full h-1.5 bg-black/70 rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-full bg-[#ff3b30] rounded-full"
                      style={{ width: `${proteinPercent}%` }}
                    />
                  </div>
                </div>

                {/* Carbs */}
                <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                  <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                    Carbs
                  </div>
                  <div className="text-lg font-black text-white font-display tabular-nums mt-0.5">
                    {totals.carbs}<span className="text-xs font-normal text-slate-400">/{carbsTarget}g</span>
                  </div>
                  <div className="w-full h-1.5 bg-black/70 rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${carbsPercent}%` }}
                    />
                  </div>
                </div>

                {/* Fats */}
                <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                  <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                    Healthy Fats
                  </div>
                  <div className="text-lg font-black text-white font-display tabular-nums mt-0.5">
                    {totals.fats}<span className="text-xs font-normal text-slate-400">/{fatsTarget}g</span>
                  </div>
                  <div className="w-full h-1.5 bg-black/70 rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full"
                      style={{ width: `${fatsPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Hydration Tracker */}
            <div className="p-6 rounded-2xl bg-[#14181c] border border-white/10 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">
                    Cellular Hydration Protocol
                  </span>
                </div>
                <span className="text-xs font-bold text-cyan-400 tabular-nums">
                  {(waterMl / 1000).toFixed(2)}L / {waterTargetLiters}L ({waterPercent}%)
                </span>
              </div>

              <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${waterPercent}%` }}
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleAddWater(250)}
                  className="flex-1 py-2 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/50 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+250ml Glass</span>
                </button>
                <button
                  onClick={() => handleAddWater(500)}
                  className="flex-1 py-2 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/50 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+500ml Bottle</span>
                </button>
                <button
                  onClick={() => setWaterMl(0)}
                  className="p-2 rounded-xl border border-white/10 text-slate-400 hover:text-white"
                  title="Reset Hydration"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Today's Log & Interactive Food Adder (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 md:p-8 rounded-2xl bg-[#14181c] border border-white/10 shadow-xl">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <div>
                  <h3 className="font-display text-lg font-bold text-white">
                    Today's Bio-Nutrient Log
                  </h3>
                  <span className="text-xs text-slate-400">
                    {logs.length} items logged today · Live macro sync
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsCustomFormOpen(!isCustomFormOpen)}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isCustomFormOpen ? 'Cancel' : 'Log Custom Food'}</span>
                  </button>
                </div>
              </div>

              {/* Custom Food Form Accordion */}
              {isCustomFormOpen && (
                <form
                  onSubmit={handleAddCustom}
                  className="p-4 mb-6 rounded-xl bg-black/50 border border-amber-500/30 space-y-3"
                >
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Add Custom Food Entry
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Food Name (e.g. Sautéed Paneer & Spinach)"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      className="bg-[#121518] border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ff3b30]"
                      required
                    />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value as MealCategory)}
                      className="bg-[#121518] border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                    >
                      <option value="breakfast">Breakfast</option>
                      <option value="mid_morning">Mid-Morning</option>
                      <option value="lunch">Lunch</option>
                      <option value="snack">Post-Workout Snack</option>
                      <option value="dinner">Dinner</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    <div>
                      <label className="text-[10px] text-slate-400">Calories</label>
                      <input
                        type="number"
                        value={customCal}
                        onChange={(e) => setCustomCal(Number(e.target.value))}
                        className="w-full bg-[#121518] border border-white/15 rounded-lg px-2 py-1.5 text-xs text-white tabular-nums"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-red-400">Protein (g)</label>
                      <input
                        type="number"
                        value={customProt}
                        onChange={(e) => setCustomProt(Number(e.target.value))}
                        className="w-full bg-[#121518] border border-white/15 rounded-lg px-2 py-1.5 text-xs text-white tabular-nums"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-emerald-400">Carbs (g)</label>
                      <input
                        type="number"
                        value={customCarb}
                        onChange={(e) => setCustomCarb(Number(e.target.value))}
                        className="w-full bg-[#121518] border border-white/15 rounded-lg px-2 py-1.5 text-xs text-white tabular-nums"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-amber-400">Fats (g)</label>
                      <input
                        type="number"
                        value={customFat}
                        onChange={(e) => setCustomFat(Number(e.target.value))}
                        className="w-full bg-[#121518] border border-white/15 rounded-lg px-2 py-1.5 text-xs text-white tabular-nums"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#ff3b30] hover:bg-[#e02d23] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      Log Entry
                    </button>
                  </div>
                </form>
              )}

              {/* Log List */}
              <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
                {logs.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 text-xs">
                    No meals logged yet today. Use the Quick-Add library below!
                  </div>
                ) : (
                  logs.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl bg-black/40 border border-white/5 hover:border-white/15 transition-all flex items-center justify-between gap-3 group"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                            {item.mealCategory}
                          </span>
                          <span className="text-[10px] text-slate-500">·</span>
                          <span className="text-[10px] text-slate-400">{item.timestamp}</span>
                        </div>
                        <div className="text-sm font-semibold text-white truncate mt-0.5">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {item.portion}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right">
                          <div className="text-sm font-bold text-white tabular-nums">
                            {item.calories} <span className="text-[10px] font-normal text-slate-400">kcal</span>
                          </div>
                          <div className="text-[10px] text-slate-400 tabular-nums">
                            P: {item.protein}g · C: {item.carbs}g · F: {item.fats}g
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteLog(item.id)}
                          className="opacity-0 group-hover:opacity-100 p-1.5 rounded text-slate-500 hover:text-red-400 transition-all cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Quick Add Gourmet & Indian Food Library */}
              <div className="mt-6 pt-5 border-t border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Quick-Log Performance Foods</span>
                  </div>

                  <div className="relative w-44">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search food..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-lg pl-7 pr-2.5 py-1 text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {filteredQuickFoods.slice(0, 6).map((food, i) => (
                    <button
                      key={i}
                      onClick={() => handleAddQuickFood(food)}
                      className="p-2.5 rounded-lg bg-black/30 hover:bg-white/5 border border-white/5 hover:border-white/15 text-left transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <div>
                        <div className="text-xs font-semibold text-white group-hover:text-amber-300">
                          {food.name}
                        </div>
                        <div className="text-[10px] text-slate-400 tabular-nums">
                          {food.calories} kcal · {food.protein}g Protein
                        </div>
                      </div>

                      <div className="p-1 rounded bg-white/5 group-hover:bg-[#ff3b30] text-slate-400 group-hover:text-white transition-colors">
                        <Plus className="w-3.5 h-3.5" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
