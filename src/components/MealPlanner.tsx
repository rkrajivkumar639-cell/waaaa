import React, { useState, useMemo } from 'react';
import { 
  GoalType, 
  DietaryPref, 
  Meal, 
  DayPlan, 
  UserFitnessProfile, 
  Ingredient 
} from '../types/diet';
import { 
  DEFAULT_FITNESS_PROFILE, 
  WEEKLY_SCHEDULE, 
  SAMPLE_MEALS 
} from '../data/mockData';
import { 
  Sliders, 
  Calendar, 
  Plus, 
  RefreshCw, 
  ShoppingBag, 
  Clock, 
  Check, 
  ChefHat, 
  Info, 
  ArrowRight,
  Flame,
  Dumbbell,
  Sparkles
} from 'lucide-react';

interface MealPlannerProps {
  onAddIngredientsToGrocery: (ingredients: Ingredient[], sourceMealName: string) => void;
  onOpenBooking: () => void;
}

export const MealPlanner: React.FC<MealPlannerProps> = ({
  onAddIngredientsToGrocery,
  onOpenBooking
}) => {
  const [profile, setProfile] = useState<UserFitnessProfile>(DEFAULT_FITNESS_PROFILE);
  const [selectedDayIndex, setSelectedDayIndex] = useState(1);
  const [schedule, setSchedule] = useState<DayPlan[]>(WEEKLY_SCHEDULE);
  const [activeMealForModal, setActiveMealForModal] = useState<Meal | null>(null);
  const [swapTarget, setSwapTarget] = useState<{ dayIndex: number; mealIndex: number } | null>(null);
  const [addedToast, setAddedToast] = useState<string | null>(null);

  // Recalculate targets dynamically based on user stats
  const calculatedTargets = useMemo(() => {
    // Mifflin-St Jeor BMR formula
    let bmr = 10 * profile.weightKg + 6.25 * profile.heightCm - 5 * profile.age;
    bmr += profile.gender === 'male' ? 5 : -161;

    // Activity multiplier
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      athlete: 1.725
    };
    const tdee = Math.round(bmr * activityMultipliers[profile.activityLevel]);

    let targetCal = tdee;
    let proteinGrams = Math.round(profile.weightKg * 2.2); // 2.2g/kg base for active
    let fatsGrams = Math.round((tdee * 0.25) / 9);

    if (profile.goal === 'muscle_hypertrophy') {
      targetCal = Math.round(tdee * 1.15); // +15% surplus
      proteinGrams = Math.round(profile.weightKg * 2.3);
      fatsGrams = Math.round((targetCal * 0.24) / 9);
    } else if (profile.goal === 'fat_shred') {
      targetCal = Math.round(tdee * 0.80); // 20% deficit
      proteinGrams = Math.round(profile.weightKg * 2.4); // high protein to preserve lean mass
      fatsGrams = Math.round((targetCal * 0.25) / 9);
    } else if (profile.goal === 'keto_switch') {
      targetCal = Math.round(tdee * 0.9);
      proteinGrams = Math.round(profile.weightKg * 1.8);
      fatsGrams = Math.round((targetCal * 0.70) / 9); // 70% fats
    } else if (profile.goal === 'vegan_athlete') {
      targetCal = tdee;
      proteinGrams = Math.round(profile.weightKg * 2.0);
      fatsGrams = Math.round((targetCal * 0.22) / 9);
    }

    const carbsCalories = Math.max(0, targetCal - (proteinGrams * 4 + fatsGrams * 9));
    const carbsGrams = Math.round(carbsCalories / 4);

    return {
      calories: targetCal,
      protein: proteinGrams,
      carbs: carbsGrams,
      fats: fatsGrams,
      fiber: Math.round(targetCal / 70), // ~35g fiber
      water: (profile.weightKg * 0.045).toFixed(1) // ~3.3L
    };
  }, [profile.weightKg, profile.heightCm, profile.age, profile.gender, profile.activityLevel, profile.goal]);

  const currentDayPlan = schedule.find((d) => d.dayIndex === selectedDayIndex) || schedule[0];

  const handleProfileChange = <K extends keyof UserFitnessProfile>(key: K, value: UserFitnessProfile[K]) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const handleSwapMeal = (dayIdx: number, mealIdx: number, newMeal: Meal) => {
    setSchedule(prev => prev.map(day => {
      if (day.dayIndex === dayIdx) {
        const updatedMeals = [...day.meals];
        updatedMeals[mealIdx] = newMeal;
        const totalCalories = updatedMeals.reduce((acc, m) => acc + m.calories, 0);
        const totalProtein = updatedMeals.reduce((acc, m) => acc + m.protein, 0);
        const totalCarbs = updatedMeals.reduce((acc, m) => acc + m.carbs, 0);
        const totalFats = updatedMeals.reduce((acc, m) => acc + m.fats, 0);
        return { ...day, meals: updatedMeals, totalCalories, totalProtein, totalCarbs, totalFats };
      }
      return day;
    }));
    setSwapTarget(null);
    triggerToast(`Swapped to ${newMeal.name}`);
  };

  const triggerToast = (msg: string) => {
    setAddedToast(msg);
    setTimeout(() => setAddedToast(null), 3000);
  };

  const addSingleMealGroceries = (meal: Meal) => {
    onAddIngredientsToGrocery(meal.ingredients, meal.name);
    triggerToast(`Added ${meal.ingredients.length} items from "${meal.name}" to Grocery Builder!`);
  };

  const addEntireDayGroceries = (day: DayPlan) => {
    const allIngs = day.meals.flatMap(m => m.ingredients);
    onAddIngredientsToGrocery(allIngs, `${day.dayName} Plan`);
    triggerToast(`Added ${allIngs.length} grocery items for ${day.dayName}!`);
  };

  return (
    <section id="meal-plans" className="py-16 md:py-24 border-t border-white/10 bg-[#0d0f12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#ff3b30] font-bold mb-2">
              Adaptive Clinical Nutrition
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Personalized 7-Day Meal Architecture
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl">
              Calibrated to your exact metabolic biomarkers, training intensity, and regional dietary preferences with live Indian Rupee grocery syncing.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => addEntireDayGroceries(currentDayPlan)}
              className="px-4 py-2.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span>Add {currentDayPlan.dayName} to Grocery List</span>
            </button>
          </div>
        </div>

        {/* Toast alert feedback */}
        {addedToast && (
          <div className="mb-6 p-3 bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs rounded-xl flex items-center gap-2 shadow-lg animate-fade-in">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{addedToast}</span>
          </div>
        )}

        {/* Personalized Parameters Wizard */}
        <div className="p-6 md:p-8 rounded-2xl bg-[#14181c] border border-white/10 mb-10 shadow-xl">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <Sliders className="w-5 h-5 text-amber-400" />
              <h3 className="font-display text-lg font-bold text-white">
                Biometric & Goal Calibration Engine
              </h3>
            </div>
            <span className="text-xs text-slate-400">
              Science-grounded Harris-Benedict + Macro Partitioning
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Goal Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Primary Goal
              </label>
              <select
                value={profile.goal}
                onChange={(e) => handleProfileChange('goal', e.target.value as GoalType)}
                className="w-full bg-[#0a0c0e] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff3b30]"
              >
                <option value="muscle_hypertrophy">Hypertrophy (Lean Muscle Bulk)</option>
                <option value="fat_shred">Fat Shred & Definition (Deficit)</option>
                <option value="lean_maintenance">Clean Athletic Maintenance</option>
                <option value="keto_switch">Keto Metabolic Switch</option>
                <option value="vegan_athlete">Vegan Performance Fuel</option>
                <option value="metabolic_reset">PCOS / Endocrine Metabolic Reset</option>
              </select>
            </div>

            {/* Dietary Preference */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Dietary Preference
              </label>
              <select
                value={profile.dietaryPref}
                onChange={(e) => handleProfileChange('dietaryPref', e.target.value as DietaryPref)}
                className="w-full bg-[#0a0c0e] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff3b30]"
              >
                <option value="non_veg">Non-Veg (Chicken, Fish, Eggs)</option>
                <option value="eggetarian">Eggetarian (Eggs, Paneer, Dairy)</option>
                <option value="vegetarian">Pure Veg (Indian Sattvic / Lacto)</option>
                <option value="vegan">100% Plant-Based Vegan</option>
                <option value="gluten_free">Strict Gluten-Free</option>
              </select>
            </div>

            {/* Weight & Height */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  min="40"
                  max="160"
                  value={profile.weightKg}
                  onChange={(e) => handleProfileChange('weightKg', Number(e.target.value))}
                  className="w-full bg-[#0a0c0e] border border-white/15 rounded-xl px-3 py-2.5 text-sm text-white tabular-nums focus:outline-none focus:border-[#ff3b30]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  min="130"
                  max="220"
                  value={profile.heightCm}
                  onChange={(e) => handleProfileChange('heightCm', Number(e.target.value))}
                  className="w-full bg-[#0a0c0e] border border-white/15 rounded-xl px-3 py-2.5 text-sm text-white tabular-nums focus:outline-none focus:border-[#ff3b30]"
                />
              </div>
            </div>

            {/* Activity Level */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Activity Level
              </label>
              <select
                value={profile.activityLevel}
                onChange={(e) => handleProfileChange('activityLevel', e.target.value as UserFitnessProfile['activityLevel'])}
                className="w-full bg-[#0a0c0e] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff3b30]"
              >
                <option value="sedentary">Sedentary (Desk work)</option>
                <option value="light">Light (1-2 workouts/wk)</option>
                <option value="moderate">Moderate (3-4 workouts/wk)</option>
                <option value="athlete">High Athlete (5-7 sessions/wk)</option>
              </select>
            </div>
          </div>

          {/* Dynamic Computed Output Banner */}
          <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
            <div className="p-3 bg-black/40 rounded-xl border border-white/5">
              <div className="text-[11px] text-slate-400">Target Calories</div>
              <div className="text-xl font-black text-amber-400 font-display tabular-nums">
                {calculatedTargets.calories} <span className="text-xs font-normal text-slate-400">kcal</span>
              </div>
            </div>

            <div className="p-3 bg-black/40 rounded-xl border border-white/5">
              <div className="text-[11px] text-slate-400">Target Protein</div>
              <div className="text-xl font-black text-[#ff4646] font-display tabular-nums">
                {calculatedTargets.protein} <span className="text-xs font-normal text-slate-400">g</span>
              </div>
            </div>

            <div className="p-3 bg-black/40 rounded-xl border border-white/5">
              <div className="text-[11px] text-slate-400">Complex Carbs</div>
              <div className="text-xl font-black text-emerald-400 font-display tabular-nums">
                {calculatedTargets.carbs} <span className="text-xs font-normal text-slate-400">g</span>
              </div>
            </div>

            <div className="p-3 bg-black/40 rounded-xl border border-white/5">
              <div className="text-[11px] text-slate-400">Essential Fats</div>
              <div className="text-xl font-black text-blue-400 font-display tabular-nums">
                {calculatedTargets.fats} <span className="text-xs font-normal text-slate-400">g</span>
              </div>
            </div>

            <div className="p-3 bg-black/40 rounded-xl border border-white/5">
              <div className="text-[11px] text-slate-400">Prebiotic Fiber</div>
              <div className="text-xl font-black text-white font-display tabular-nums">
                {calculatedTargets.fiber} <span className="text-xs font-normal text-slate-400">g</span>
              </div>
            </div>

            <div className="p-3 bg-black/40 rounded-xl border border-white/5">
              <div className="text-[11px] text-slate-400">Water Target</div>
              <div className="text-xl font-black text-cyan-300 font-display tabular-nums">
                {calculatedTargets.water} <span className="text-xs font-normal text-slate-400">L</span>
              </div>
            </div>
          </div>
        </div>

        {/* 7-Day Day Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {schedule.map((day) => {
            const isSelected = day.dayIndex === selectedDayIndex;
            return (
              <button
                key={day.dayIndex}
                onClick={() => setSelectedDayIndex(day.dayIndex)}
                className={`px-5 py-3 rounded-xl text-left border transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isSelected 
                    ? 'bg-[#ff3b30] border-[#ff3b30] text-white shadow-lg shadow-red-600/25' 
                    : 'bg-[#14181c] border-white/10 text-slate-300 hover:border-white/25 hover:bg-white/5'
                }`}
              >
                <div className="text-xs font-bold uppercase tracking-wider">{day.dayName}</div>
                <div className="text-sm font-semibold tabular-nums mt-0.5">
                  {day.totalCalories} kcal · {day.totalProtein}g protein
                </div>
              </button>
            );
          })}
        </div>

        {/* Meals Grid for Selected Day */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentDayPlan.meals.map((meal, mealIdx) => (
            <div
              key={`${meal.id}-${mealIdx}`}
              className="rounded-2xl bg-[#14181c] border border-white/10 hover:border-white/20 transition-all p-5 flex flex-col justify-between shadow-lg"
            >
              <div>
                {/* Header row with meal category */}
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="uppercase tracking-wider font-bold text-amber-400">
                    {meal.category}
                  </span>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{meal.prepTimeMinutes} mins</span>
                  </div>
                </div>

                <h4 className="font-display text-lg font-bold text-white mb-2 leading-snug">
                  {meal.name}
                </h4>

                <p className="text-xs text-slate-300 italic mb-4 bg-black/30 p-2.5 rounded-lg border border-white/5">
                  "{meal.chefTip}"
                </p>

                {/* Macro breakdown indicators */}
                <div className="grid grid-cols-4 gap-2 mb-4 text-center">
                  <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                    <div className="text-[10px] text-slate-400">Calories</div>
                    <div className="text-sm font-bold text-white tabular-nums">{meal.calories}</div>
                  </div>
                  <div className="p-2 rounded-lg bg-red-950/40 border border-red-500/20">
                    <div className="text-[10px] text-red-300">Protein</div>
                    <div className="text-sm font-bold text-[#ff5252] tabular-nums">{meal.protein}g</div>
                  </div>
                  <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                    <div className="text-[10px] text-slate-400">Carbs</div>
                    <div className="text-sm font-bold text-emerald-400 tabular-nums">{meal.carbs}g</div>
                  </div>
                  <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                    <div className="text-[10px] text-slate-400">Fats</div>
                    <div className="text-sm font-bold text-amber-300 tabular-nums">{meal.fats}g</div>
                  </div>
                </div>

                {/* Ingredients preview */}
                <div className="mb-4">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                    Key Ingredients ({meal.ingredients.length} items):
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {meal.ingredients.map((ing) => (
                      <span
                        key={ing.id}
                        className="text-[11px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300 tabular-nums"
                      >
                        {ing.name} ({ing.amount}{ing.unit})
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveMealForModal(meal)}
                  className="text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  View Full Recipe & Prep Steps
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSwapTarget({ dayIndex: currentDayPlan.dayIndex, mealIndex: mealIdx })}
                    className="p-2 rounded-lg border border-white/10 hover:border-white/25 text-slate-300 hover:text-white transition-colors"
                    title="Swap with another meal"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => addSingleMealGroceries(meal)}
                    className="px-3 py-1.5 rounded-lg bg-[#ff3b30]/15 hover:bg-[#ff3b30] text-[#ff4d44] hover:text-white border border-red-500/30 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Sync Grocery</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Swap Meal Modal */}
        {swapTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#14181c] border border-white/20 rounded-2xl p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <h3 className="text-lg font-bold text-white font-display">
                  Swap with Gourmet Alternative
                </h3>
                <button
                  onClick={() => setSwapTarget(null)}
                  className="text-slate-400 hover:text-white text-sm"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3">
                {SAMPLE_MEALS.map((altMeal) => (
                  <div
                    key={altMeal.id}
                    className="p-4 rounded-xl bg-black/40 border border-white/10 hover:border-[#ff3b30] transition-colors flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="text-sm font-bold text-white">{altMeal.name}</div>
                      <div className="text-xs text-slate-400 mt-1">
                        {altMeal.calories} kcal · {altMeal.protein}g Protein · {altMeal.carbs}g Carbs · {altMeal.fats}g Fat
                      </div>
                    </div>
                    <button
                      onClick={() => handleSwapMeal(swapTarget.dayIndex, swapTarget.mealIndex, altMeal)}
                      className="px-4 py-2 rounded-lg bg-[#ff3b30] hover:bg-[#d82a20] text-white text-xs font-semibold cursor-pointer shrink-0"
                    >
                      Select
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Full Recipe Modal */}
        {activeMealForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#14181c] border border-white/20 rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    {activeMealForModal.category} Recipe
                  </span>
                  <h3 className="text-xl font-bold text-white font-display">
                    {activeMealForModal.name}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveMealForModal(null)}
                  className="text-slate-400 hover:text-white p-2"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2 mb-6 text-center">
                <div className="p-2.5 rounded-lg bg-black/50 border border-white/5">
                  <div className="text-[10px] text-slate-400">Calories</div>
                  <div className="text-base font-bold text-white tabular-nums">{activeMealForModal.calories}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-red-950/40 border border-red-500/20">
                  <div className="text-[10px] text-red-300">Protein</div>
                  <div className="text-base font-bold text-[#ff5252] tabular-nums">{activeMealForModal.protein}g</div>
                </div>
                <div className="p-2.5 rounded-lg bg-black/50 border border-white/5">
                  <div className="text-[10px] text-slate-400">Carbs</div>
                  <div className="text-base font-bold text-emerald-400 tabular-nums">{activeMealForModal.carbs}g</div>
                </div>
                <div className="p-2.5 rounded-lg bg-black/50 border border-white/5">
                  <div className="text-[10px] text-slate-400">Fats</div>
                  <div className="text-base font-bold text-amber-300 tabular-nums">{activeMealForModal.fats}g</div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                  Ingredients Breakdown & Indian Market Cost:
                </h4>
                <div className="space-y-1.5">
                  {activeMealForModal.ingredients.map((ing) => (
                    <div key={ing.id} className="flex items-center justify-between text-xs py-1.5 px-3 rounded bg-black/30 border border-white/5">
                      <span className="text-slate-200">{ing.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-400 tabular-nums">{ing.amount} {ing.unit}</span>
                        <span className="font-semibold text-amber-400 tabular-nums">~₹{ing.estimatedPriceINR}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                  Chef Preparation Instructions:
                </h4>
                <ol className="space-y-2 text-xs text-slate-300 list-decimal list-inside">
                  {activeMealForModal.recipeSteps.map((step, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    addSingleMealGroceries(activeMealForModal);
                    setActiveMealForModal(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#ff3b30] hover:bg-[#e02d23] text-white text-xs font-semibold cursor-pointer flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Ingredients to Grocery List</span>
                </button>

                <button
                  onClick={onOpenBooking}
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                >
                  Want chef Vikram to cook this for you? Book Meal Box →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
