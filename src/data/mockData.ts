import { 
  Meal, 
  DayPlan, 
  UserFitnessProfile, 
  NutritionistSpecialist, 
  MealDeliveryPlan, 
  LoggedFoodItem,
  GroceryItem 
} from '../types/diet';

export const DEFAULT_FITNESS_PROFILE: UserFitnessProfile = {
  name: 'Rajiv Kumar',
  age: 28,
  gender: 'male',
  weightKg: 74,
  heightCm: 178,
  activityLevel: 'athlete',
  goal: 'muscle_hypertrophy',
  dietaryPref: 'non_veg',
  targetCalories: 2650,
  targetProtein: 165,
  targetCarbs: 290,
  targetFats: 70,
  targetFiber: 38,
  targetWaterLiters: 3.8,
};

export const SAMPLE_MEALS: Meal[] = [
  {
    id: 'meal-1',
    name: 'Grilled Herb Chicken Bowl with Farm Greens & Boiled Eggs',
    category: 'lunch',
    calories: 540,
    protein: 48,
    carbs: 22,
    fats: 16,
    fiber: 8,
    prepTimeMinutes: 20,
    dietary: ['non_veg', 'gluten_free'],
    chefTip: 'Char the chicken breast on high cast-iron for 3 mins each side to seal the rosemary-garlic juices.',
    recipeSteps: [
      'Marinate 200g chicken breast in cold-pressed extra virgin olive oil, crushed garlic, rosemary, and Himalayan pink salt.',
      'Sear on a hot skillet until internal temp reaches 74°C, then rest 5 minutes before slicing.',
      'Layer fresh crisp iceberg lettuce, thinly sliced red onion, English cucumber, and vine cherry tomatoes.',
      'Top with two soft-boiled omega-3 eggs, cracked black pepper, and cold-pressed dressing.'
    ],
    ingredients: [
      { id: 'ing-1', name: 'Free-Range Chicken Breast', amount: 200, unit: 'g', category: 'proteins', estimatedPriceINR: 120 },
      { id: 'ing-2', name: 'Omega-3 Farm Eggs', amount: 2, unit: 'pcs', category: 'proteins', estimatedPriceINR: 30 },
      { id: 'ing-3', name: 'Fresh Salad Greens & Lettuce', amount: 100, unit: 'g', category: 'produce', estimatedPriceINR: 40 },
      { id: 'ing-4', name: 'Vine Cherry Tomatoes', amount: 80, unit: 'g', category: 'produce', estimatedPriceINR: 35 },
      { id: 'ing-5', name: 'Cold-Pressed Olive Oil', amount: 12, unit: 'ml', category: 'fats', estimatedPriceINR: 25 },
      { id: 'ing-6', name: 'English Cucumber & Red Onion', amount: 80, unit: 'g', category: 'produce', estimatedPriceINR: 20 },
    ]
  },
  {
    id: 'meal-2',
    name: 'Whey Isolate Rolled Oats with Crushed Almonds & Blueberries',
    category: 'breakfast',
    calories: 460,
    protein: 36,
    carbs: 58,
    fats: 10,
    fiber: 11,
    prepTimeMinutes: 10,
    dietary: ['vegetarian'],
    chefTip: 'Stir protein powder in when the cooked oats drop below 70°C to prevent protein denaturing clumps.',
    recipeSteps: [
      'Cook 70g organic rolled oats in 250ml unsweetened almond milk for 5 minutes.',
      'Remove from heat, whisk in 1 scoop vanilla whey isolate until creamy.',
      'Garnish with wild fresh blueberries, toasted crushed California almonds, and Ceylon cinnamon.'
    ],
    ingredients: [
      { id: 'ing-7', name: 'Organic Rolled Oats', amount: 70, unit: 'g', category: 'grains', estimatedPriceINR: 35 },
      { id: 'ing-8', name: 'Whey Protein Isolate 90%', amount: 32, unit: 'g', category: 'proteins', estimatedPriceINR: 110 },
      { id: 'ing-9', name: 'Fresh Blueberries', amount: 40, unit: 'g', category: 'produce', estimatedPriceINR: 80 },
      { id: 'ing-10', name: 'Raw California Almonds', amount: 18, unit: 'g', category: 'fats', estimatedPriceINR: 45 },
      { id: 'ing-11', name: 'Unsweetened Almond Milk', amount: 250, unit: 'ml', category: 'pantry', estimatedPriceINR: 40 },
    ]
  },
  {
    id: 'meal-3',
    name: 'Tandoori Spiced Paneer Steak with Quinoa & Steamed Broccoli',
    category: 'dinner',
    calories: 520,
    protein: 34,
    carbs: 42,
    fats: 22,
    fiber: 9,
    prepTimeMinutes: 25,
    dietary: ['vegetarian', 'gluten_free'],
    chefTip: 'Use malai-free fresh cottage paneer for the highest casein protein yield and low saturated fat.',
    recipeSteps: [
      'Marinate thick slabs of artisanal fresh paneer with Greek yogurt, Kashmiri deghi mirch, roasted cumin, and kasuri methi.',
      'Grill on medium flame with ghee brush until golden smoked edges form.',
      'Serve over fluffy tricolor quinoa with flash-steamed broccoli florets and lemon drizzle.'
    ],
    ingredients: [
      { id: 'ing-12', name: 'Artisanal Fresh Low-Fat Paneer', amount: 180, unit: 'g', category: 'proteins', estimatedPriceINR: 95 },
      { id: 'ing-13', name: 'Organic Royal Quinoa', amount: 60, unit: 'g', category: 'grains', estimatedPriceINR: 50 },
      { id: 'ing-14', name: 'Fresh Garden Broccoli', amount: 120, unit: 'g', category: 'produce', estimatedPriceINR: 45 },
      { id: 'ing-15', name: 'Pure Desi A2 Ghee', amount: 8, unit: 'g', category: 'fats', estimatedPriceINR: 20 },
      { id: 'ing-16', name: 'Greek Curd & Tandoori Spices', amount: 40, unit: 'g', category: 'pantry', estimatedPriceINR: 25 },
    ]
  },
  {
    id: 'meal-4',
    name: 'Pan-Seared Himalayan Trout with Roasted Sweet Potato Wedges',
    category: 'dinner',
    calories: 510,
    protein: 42,
    carbs: 45,
    fats: 14,
    fiber: 7,
    prepTimeMinutes: 25,
    dietary: ['non_veg', 'gluten_free'],
    chefTip: 'Skin side down first in high smoke-point ghee for a glass-crisp exterior and tender flake.',
    recipeSteps: [
      'Roast paprika and rosemary tossed sweet potato wedges at 200°C for 22 minutes.',
      'Season fresh trout fillet with cracked sea salt, dill, and lemon zest.',
      'Pan-sear for 4 minutes skin-side down, flip for 90 seconds, and finish with a squeeze of fresh lime.'
    ],
    ingredients: [
      { id: 'ing-17', name: 'Fresh Himalayan Trout Fillet', amount: 190, unit: 'g', category: 'proteins', estimatedPriceINR: 240 },
      { id: 'ing-18', name: 'Orange Sweet Potatoes', amount: 150, unit: 'g', category: 'produce', estimatedPriceINR: 30 },
      { id: 'ing-19', name: 'Baby Spinach & Asparagus', amount: 90, unit: 'g', category: 'produce', estimatedPriceINR: 60 },
      { id: 'ing-20', name: 'Grass-fed Butter', amount: 10, unit: 'g', category: 'fats', estimatedPriceINR: 20 },
    ]
  },
  {
    id: 'meal-5',
    name: 'Avocado & Sprouted Moong High-Protein Chaat Bowl',
    category: 'snack',
    calories: 320,
    protein: 18,
    carbs: 34,
    fats: 12,
    fiber: 12,
    prepTimeMinutes: 12,
    dietary: ['vegetarian', 'vegan', 'gluten_free'],
    chefTip: 'Sprouting moong beans doubles enzymatic bio-availability and breaks down phytic acid.',
    recipeSteps: [
      'Steam live sprouted green moong beans lightly for 3 minutes to retain crunch.',
      'Toss with diced Hass avocado, pomegranate arils, fresh coriander, chaat masala, and cold lemon juice.',
      'Top with roasted pumpkin and watermelon seeds for zinc-rich crunch.'
    ],
    ingredients: [
      { id: 'ing-21', name: 'Sprouted Green Moong Beans', amount: 120, unit: 'g', category: 'proteins', estimatedPriceINR: 30 },
      { id: 'ing-22', name: 'Hass Avocado', amount: 60, unit: 'g', category: 'fats', estimatedPriceINR: 75 },
      { id: 'ing-23', name: 'Pomegranate Seeds', amount: 40, unit: 'g', category: 'produce', estimatedPriceINR: 30 },
      { id: 'ing-24', name: 'Raw Pumpkin & Chia Seeds', amount: 15, unit: 'g', category: 'fats', estimatedPriceINR: 25 },
    ]
  },
  {
    id: 'meal-6',
    name: 'Egg White Frittata with Sun-Dried Tomatoes & Goat Cheese',
    category: 'breakfast',
    calories: 380,
    protein: 38,
    carbs: 14,
    fats: 16,
    fiber: 4,
    prepTimeMinutes: 15,
    dietary: ['eggetarian', 'gluten_free'],
    chefTip: 'Whisk egg whites with a dash of sparkling water for a soufflé-light aeration.',
    recipeSteps: [
      'Whisk 6 organic egg whites with 1 whole egg, sea salt, and black pepper.',
      'Sauté baby spinach, sun-dried tomatoes, and shallots in olive oil.',
      'Pour egg mixture, crumble artisanal goat cheese, and bake until set and puffed.'
    ],
    ingredients: [
      { id: 'ing-25', name: 'Organic Farm Egg Whites', amount: 6, unit: 'pcs', category: 'proteins', estimatedPriceINR: 60 },
      { id: 'ing-26', name: 'Whole Egg', amount: 1, unit: 'pc', category: 'proteins', estimatedPriceINR: 15 },
      { id: 'ing-27', name: 'Artisanal Goat Cheese', amount: 30, unit: 'g', category: 'fats', estimatedPriceINR: 65 },
      { id: 'ing-28', name: 'Sun-Dried Tomatoes & Spinach', amount: 60, unit: 'g', category: 'produce', estimatedPriceINR: 40 },
    ]
  },
  {
    id: 'meal-7',
    name: 'Smoked Tofu & Edamame Soba Noodle Bowl in Miso Broth',
    category: 'lunch',
    calories: 490,
    protein: 35,
    carbs: 56,
    fats: 11,
    fiber: 10,
    prepTimeMinutes: 20,
    dietary: ['vegan', 'vegetarian'],
    chefTip: '100% Buckwheat soba provides slow-release carbohydrates without glycemic spikes.',
    recipeSteps: [
      'Boil buckwheat soba noodles for 4 minutes, rinse under ice water.',
      'Pan-sear smoked firm organic tofu cubes with tamari and sesame oil.',
      'Simmer dashi/miso broth with edamame beans, bok choy, and shiitake mushrooms, assemble bowl.'
    ],
    ingredients: [
      { id: 'ing-29', name: 'Organic Firm Smoked Tofu', amount: 180, unit: 'g', category: 'proteins', estimatedPriceINR: 90 },
      { id: 'ing-30', name: 'Shelled Green Edamame', amount: 70, unit: 'g', category: 'proteins', estimatedPriceINR: 55 },
      { id: 'ing-31', name: '100% Buckwheat Soba Noodles', amount: 65, unit: 'g', category: 'grains', estimatedPriceINR: 70 },
      { id: 'ing-32', name: 'Baby Bok Choy & Shiitake', amount: 80, unit: 'g', category: 'produce', estimatedPriceINR: 60 },
      { id: 'ing-33', name: 'Organic White Miso Paste', amount: 20, unit: 'g', category: 'pantry', estimatedPriceINR: 35 },
    ]
  }
];

export const WEEKLY_SCHEDULE: DayPlan[] = [
  {
    dayIndex: 1,
    dayName: 'Monday',
    totalCalories: 2640,
    totalProtein: 168,
    totalCarbs: 285,
    totalFats: 68,
    meals: [SAMPLE_MEALS[1], SAMPLE_MEALS[4], SAMPLE_MEALS[0], SAMPLE_MEALS[2]]
  },
  {
    dayIndex: 2,
    dayName: 'Tuesday',
    totalCalories: 2620,
    totalProtein: 164,
    totalCarbs: 290,
    totalFats: 70,
    meals: [SAMPLE_MEALS[5], SAMPLE_MEALS[4], SAMPLE_MEALS[6], SAMPLE_MEALS[3]]
  },
  {
    dayIndex: 3,
    dayName: 'Wednesday',
    totalCalories: 2670,
    totalProtein: 172,
    totalCarbs: 280,
    totalFats: 72,
    meals: [SAMPLE_MEALS[1], SAMPLE_MEALS[4], SAMPLE_MEALS[0], SAMPLE_MEALS[3]]
  },
  {
    dayIndex: 4,
    dayName: 'Thursday',
    totalCalories: 2590,
    totalProtein: 160,
    totalCarbs: 295,
    totalFats: 66,
    meals: [SAMPLE_MEALS[5], SAMPLE_MEALS[4], SAMPLE_MEALS[2], SAMPLE_MEALS[0]]
  },
  {
    dayIndex: 5,
    dayName: 'Friday',
    totalCalories: 2710,
    totalProtein: 175,
    totalCarbs: 285,
    totalFats: 74,
    meals: [SAMPLE_MEALS[1], SAMPLE_MEALS[4], SAMPLE_MEALS[0], SAMPLE_MEALS[6]]
  },
  {
    dayIndex: 6,
    dayName: 'Saturday',
    totalCalories: 2650,
    totalProtein: 166,
    totalCarbs: 290,
    totalFats: 69,
    meals: [SAMPLE_MEALS[5], SAMPLE_MEALS[4], SAMPLE_MEALS[3], SAMPLE_MEALS[2]]
  },
  {
    dayIndex: 7,
    dayName: 'Sunday',
    totalCalories: 2600,
    totalProtein: 162,
    totalCarbs: 280,
    totalFats: 71,
    meals: [SAMPLE_MEALS[1], SAMPLE_MEALS[4], SAMPLE_MEALS[0], SAMPLE_MEALS[3]]
  }
];

export const INITIAL_TODAY_LOG: LoggedFoodItem[] = [
  {
    id: 'log-1',
    name: 'Whey Isolate Rolled Oats Bowl with Blueberries',
    mealCategory: 'breakfast',
    calories: 460,
    protein: 36,
    carbs: 58,
    fats: 10,
    portion: '1 Large Bowl (350g)',
    timestamp: '08:15 AM'
  },
  {
    id: 'log-2',
    name: 'Black Americano + 5 Almonds',
    mealCategory: 'mid_morning',
    calories: 65,
    protein: 3,
    carbs: 2,
    fats: 6,
    portion: '1 Mug + 5 Nuts',
    timestamp: '11:00 AM'
  },
  {
    id: 'log-3',
    name: 'Grilled Herb Chicken Bowl with Farm Greens & Boiled Eggs',
    mealCategory: 'lunch',
    calories: 540,
    protein: 48,
    carbs: 22,
    fats: 16,
    portion: '1 Chef Bowl (420g)',
    timestamp: '01:30 PM'
  }
];

export const QUICK_ADD_FOOD_DB = [
  { name: 'Grilled Herb Chicken Breast (150g)', category: 'lunch' as const, calories: 240, protein: 44, carbs: 0, fats: 5, portion: '150g' },
  { name: 'Low-Fat Paneer Tikka (150g)', category: 'dinner' as const, calories: 290, protein: 28, carbs: 6, fats: 16, portion: '150g' },
  { name: 'Boiled Omega-3 Eggs (2 pcs)', category: 'breakfast' as const, calories: 145, protein: 13, carbs: 1, fats: 10, portion: '2 Whole Eggs' },
  { name: 'Cooked Tricolor Quinoa (1 cup)', category: 'lunch' as const, calories: 220, protein: 8, carbs: 39, fats: 3.5, portion: '185g' },
  { name: 'Whey Isolate Shake in Water', category: 'snack' as const, calories: 120, protein: 27, carbs: 1.5, fats: 0.5, portion: '1 Scoop (33g)' },
  { name: 'Greek Yogurt with Chia & Honey', category: 'snack' as const, calories: 180, protein: 15, carbs: 16, fats: 4, portion: '1 Cup' },
  { name: 'Steamed Edamame with Pink Salt', category: 'snack' as const, calories: 150, protein: 14, carbs: 11, fats: 5, portion: '120g' },
  { name: 'Hass Avocado Half (80g)', category: 'breakfast' as const, calories: 130, protein: 1.5, carbs: 7, fats: 12, portion: 'Half Avocado' },
  { name: 'Organic Brown Rice (1 cup)', category: 'lunch' as const, calories: 215, protein: 5, carbs: 45, fats: 1.8, portion: '195g' }
];

export const INITIAL_GROCERY_ITEMS: GroceryItem[] = [
  { id: 'g-1', name: 'Free-Range Chicken Breast', amount: 800, unit: 'g', category: 'proteins', estimatedPriceINR: 480, isCompleted: false, sourceMealName: 'Grilled Herb Chicken Bowl' },
  { id: 'g-2', name: 'Omega-3 Farm Eggs', amount: 12, unit: 'pcs', category: 'proteins', estimatedPriceINR: 180, isCompleted: true, sourceMealName: 'Egg White Frittata' },
  { id: 'g-3', name: 'Artisanal Fresh Paneer', amount: 500, unit: 'g', category: 'proteins', estimatedPriceINR: 260, isCompleted: false, sourceMealName: 'Tandoori Spiced Paneer Steak' },
  { id: 'g-4', name: 'Fresh Vine Cherry Tomatoes', amount: 400, unit: 'g', category: 'produce', estimatedPriceINR: 140, isCompleted: false, sourceMealName: 'Salad Bowls' },
  { id: 'g-5', name: 'Fresh Crisp Salad Lettuce & Greens', amount: 350, unit: 'g', category: 'produce', estimatedPriceINR: 120, isCompleted: true, sourceMealName: 'Lunch Bowls' },
  { id: 'g-6', name: 'Hass Avocados (Pack of 3)', amount: 3, unit: 'pcs', category: 'produce', estimatedPriceINR: 320, isCompleted: false, sourceMealName: 'Avocado Chaat' },
  { id: 'g-7', name: 'Fresh Broccoli Florets', amount: 400, unit: 'g', category: 'produce', estimatedPriceINR: 110, isCompleted: false, sourceMealName: 'Dinner Bowls' },
  { id: 'g-8', name: 'Organic Royal Quinoa', amount: 500, unit: 'g', category: 'grains', estimatedPriceINR: 290, isCompleted: false, sourceMealName: 'Quinoa Bowls' },
  { id: 'g-9', name: 'Rolled Oats (Gluten-Free)', amount: 1000, unit: 'g', category: 'grains', estimatedPriceINR: 250, isCompleted: true, sourceMealName: 'Breakfast Oats' },
  { id: 'g-10', name: 'Cold-Pressed Extra Virgin Olive Oil', amount: 500, unit: 'ml', category: 'fats', estimatedPriceINR: 650, isCompleted: false, sourceMealName: 'Dressing & Cooking' },
  { id: 'g-11', name: 'California Raw Almonds', amount: 250, unit: 'g', category: 'fats', estimatedPriceINR: 310, isCompleted: false, sourceMealName: 'Snack & Oats' },
  { id: 'g-12', name: 'Unsweetened Almond Milk (1L)', amount: 2, unit: 'L', category: 'pantry', estimatedPriceINR: 380, isCompleted: false, sourceMealName: 'Smoothies' },
  { id: 'g-13', name: 'Himalayan Pink Rock Salt & Herb Rub', amount: 200, unit: 'g', category: 'pantry', estimatedPriceINR: 120, isCompleted: true, sourceMealName: 'Seasoning' },
];

export const NUTRITIONISTS: NutritionistSpecialist[] = [
  {
    id: 'spec-1',
    name: 'Dr. Ananya Sharma, Ph.D.',
    credential: 'CSCS · Clinical Sports Nutritionist',
    specialty: 'Elite Athletic Hypertrophy & Olympic Conditioning',
    experienceYears: 14,
    rating: 4.96,
    clientsHelped: 1280,
    consultationFeeINR: 1999,
    avatar: 'https://images.unsplash.com/photo-1594824813593-3d0bca935e4e?w=300&auto=format&fit=crop&q=80',
    bio: 'Former consultant to Indian National Badminton and Track athletes. Specializes in metabolic priming, lean body recomposition, and blood-panel guided nutritional tailoring.',
    availableDays: ['Mon', 'Wed', 'Fri', 'Sat']
  },
  {
    id: 'spec-2',
    name: 'Chef Vikram Singhania',
    credential: 'Le Cordon Bleu Paris · Precision Gourmet Macro Chef',
    specialty: 'Michelin-Caliber Gourmet Diet Prep & Macro Formulations',
    experienceYears: 18,
    rating: 4.98,
    clientsHelped: 940,
    consultationFeeINR: 2499,
    avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=300&auto=format&fit=crop&q=80',
    bio: 'Pioneered culinary sports gastronomy across India and Europe. Designs calorie-precise meals that taste like fine dining without single excess gram of unwanted fat.',
    availableDays: ['Tue', 'Thu', 'Sat', 'Sun']
  },
  {
    id: 'spec-3',
    name: 'Dr. Rohan Mehta, M.D.',
    credential: 'Endocrine Health & Functional Nutrition Specialist',
    specialty: 'Insulin Sensitivity, PCOS, Thyroid & Rapid Fat Deficit',
    experienceYears: 16,
    rating: 4.94,
    clientsHelped: 2150,
    consultationFeeINR: 2199,
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80',
    bio: 'Clinical physician specializing in metabolic disease reversal, hormone optimization, and sustainable ketogenic metabolic transitions.',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  }
];

export const MEAL_DELIVERY_PLANS: MealDeliveryPlan[] = [
  {
    id: 'plan-starter-6d',
    name: '6-Day Gourmet Reset Trial',
    tagline: 'Experience chef-cooked precision nutrition delivered fresh daily',
    priceINR: 3599,
    duration: '6 Days (Mon - Sat)',
    mealsPerDay: 2,
    targetCalorieRange: '1,200 - 1,400 kcal/day',
    proteinPerDay: '90g - 110g protein/day',
    deliveryCoverage: 'Mumbai, Delhi NCR, Bengaluru, Hyderabad, Pune',
    features: [
      'Chef-curated Lunch & Dinner delivered every morning in insulated chilled containers',
      'Vacuum-sealed freshness with recyclable eco-glass meal boxes',
      'Daily Macro Breakdown card & QR scan for instant MyFitnessPal / Gain Grub log',
      'Free weekend diet guidance check-in via WhatsApp'
    ]
  },
  {
    id: 'plan-elite-hypertrophy-24d',
    name: '24-Day Hypertrophy & Shred Elite',
    tagline: 'Our flagship transformation protocol for peak athletic physique',
    priceINR: 14999,
    duration: '24 Days (4 Weeks)',
    mealsPerDay: 4,
    targetCalorieRange: '2,400 - 2,800 kcal/day',
    proteinPerDay: '160g - 190g pure protein/day',
    deliveryCoverage: 'All Tier 1 Metro Cities in India',
    isPopular: true,
    features: [
      'Full 4-Meal Suite: Power Breakfast, Gourmet Lunch, Recovery Snack, Prime Dinner',
      'Free Range Grass-Fed Meats, Wild Himalayan Salmon & Artisanal Organic Paneer',
      'Weekly Body Recomp Consultation with Dr. Ananya Sharma included (worth ₹3,998)',
      'Zero refined sugar, zero seed oils, cold-pressed oils only',
      'Real-time delivery tracker with door concierge'
    ]
  },
  {
    id: 'plan-keto-clean-24d',
    name: '24-Day Ketogenic Clean Burn',
    tagline: 'Clinically calibrated sub-25g net carb fat adaptation box',
    priceINR: 16499,
    duration: '24 Days (4 Weeks)',
    mealsPerDay: 3,
    targetCalorieRange: '1,800 - 2,100 kcal/day',
    proteinPerDay: '130g protein · < 25g net carbs/day',
    deliveryCoverage: 'All Tier 1 Metro Cities in India',
    features: [
      'Ultra Low Carb Gourmet Suite: Hass avocados, MCT oils, grass-fed ghee, wild fish',
      'Includes Ketone urine test strips & weekly blood glucose tracking guide',
      'Chef Vikram customized seasonal rotation (never repeat meals twice in a fortnight)',
      'Free nutritionist WhatsApp hotline 7 days a week'
    ]
  }
];
