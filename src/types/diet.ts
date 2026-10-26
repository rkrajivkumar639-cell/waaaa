export type GoalType = 
  | 'muscle_hypertrophy' 
  | 'fat_shred' 
  | 'lean_maintenance' 
  | 'keto_switch' 
  | 'vegan_athlete' 
  | 'metabolic_reset';

export type DietaryPref = 
  | 'non_veg' 
  | 'eggetarian' 
  | 'vegetarian' 
  | 'vegan' 
  | 'gluten_free';

export type MealCategory = 'breakfast' | 'mid_morning' | 'lunch' | 'snack' | 'dinner';

export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  category: 'proteins' | 'produce' | 'grains' | 'fats' | 'pantry';
  estimatedPriceINR: number;
}

export interface Meal {
  id: string;
  name: string;
  category: MealCategory;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
  prepTimeMinutes: number;
  dietary: DietaryPref[];
  ingredients: Ingredient[];
  chefTip: string;
  recipeSteps: string[];
  imagePlaceholder?: string;
}

export interface DayPlan {
  dayIndex: number;
  dayName: string;
  dateStr?: string;
  meals: Meal[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
}

export interface UserFitnessProfile {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  weightKg: number;
  heightCm: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'athlete';
  goal: GoalType;
  dietaryPref: DietaryPref;
  targetCalories: number;
  targetProtein: number;
  targetCarbs: number;
  targetFats: number;
  targetFiber: number;
  targetWaterLiters: number;
}

export interface LoggedFoodItem {
  id: string;
  name: string;
  mealCategory: MealCategory;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  portion: string;
  timestamp: string;
}

export interface GroceryItem {
  id: string;
  name: string;
  amount: number;
  unit: string;
  category: 'proteins' | 'produce' | 'grains' | 'fats' | 'pantry';
  estimatedPriceINR: number;
  isCompleted: boolean;
  sourceMealName?: string;
}

export interface NutritionistSpecialist {
  id: string;
  name: string;
  credential: string;
  specialty: string;
  experienceYears: number;
  rating: number;
  clientsHelped: number;
  consultationFeeINR: number;
  avatar: string;
  bio: string;
  availableDays: string[];
}

export interface MealDeliveryPlan {
  id: string;
  name: string;
  tagline: string;
  priceINR: number;
  duration: string;
  mealsPerDay: number;
  targetCalorieRange: string;
  proteinPerDay: string;
  deliveryCoverage: string;
  features: string[];
  isPopular?: boolean;
}

export interface BookingSubmission {
  id: string;
  bookingType: 'consultation' | 'meal_box';
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  city: string;
  address?: string;
  pincode?: string;
  date: string;
  timeSlot?: string;
  specialist?: NutritionistSpecialist;
  mealPlan?: MealDeliveryPlan;
  dietaryNotes?: string;
  subtotalINR: number;
  gstINR: number;
  totalINR: number;
  createdAt: string;
}
