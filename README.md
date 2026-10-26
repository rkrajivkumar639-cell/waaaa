# Gain Grub | Luxury Diet Foods & Performance Nutrition

[![Deploy to GitHub Pages](https://github.com/actions/deploy-pages/actions/workflows/deploy.yml/badge.svg)](https://github.com/actions/deploy-pages)
[![Built with React 19](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Styled with Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8.svg)](https://tailwindcss.com/)
[![Vite 8](https://img.shields.io/badge/Vite-8-646cff.svg)](https://vitejs.dev/)

**Gain Grub** is a luxury diet foods and athletic nutrition platform designed for high-performance athletes, fitness enthusiasts, and wellness professionals. It features real-time 3D interactive motion video, clinical personalized meal plan generation, macro and hydration tracking, an integrated grocery list builder with Indian Rupee (₹) pricing, and a consultation & chef-prepared meal delivery concierge.

---

## Key Features

1. **Front Video with 3D Interaction & Interactive Motion**:
   - High-fidelity culinary video front with mouse-driven 3D perspective tilt (`rotateX`, `rotateY`) and dynamic specular reflection glare.
   - 3D floating macro cards popping in Z-depth (Protein, Calories, Healthy Fats).
   - Video controls (Play/Pause, Mute/Unmute, 3D sensitivity switch, and expandable Macro Anatomy).

2. **Personalized 7-Day Meal Architecture**:
   - Goal-based biometrics calibration (Hypertrophy, Fat Shred, Maintenance, Keto, Vegan, Metabolic Reset).
   - Harris-Benedict & TDEE macro calculation for precise target calories, protein, carbs, and fats.
   - 7-day schedule with chef tips, recipe cooking steps, and meal swap tool.
   - 1-click sync of ingredients into the Grocery Builder.

3. **Nutritional & Macro Tracking Center**:
   - Real-time calorie and macro progress rings (Protein, Carbs, Fats, Prebiotic Fiber).
   - Cellular hydration protocol with `+250ml` and `+500ml` glass logging.
   - Daily food intake log by meal category, plus searchable performance food library and custom item logger.

4. **Integrated Grocery List Builder**:
   - Categorized by Proteins, Produce, Whole Grains, Healthy Lipids, and Pantry.
   - Real-time estimated budget in Indian Rupees (₹).
   - Check-off purchased items, adjust quantities, copy formatted list to clipboard, share to WhatsApp, or simulate 10-minute quick commerce delivery (*Blinkit, Zepto, Instamart*).

5. **Luxury Booking & Concierge**:
   - Private 1-on-1 consultations with board-certified clinical dietitians (starting at ₹1,999).
   - Chef-curated daily diet meal box subscriptions delivered fresh in Indian metros (Mumbai, Delhi NCR, Bengaluru, Hyderabad, Pune, Chennai).
   - Instant booking confirmation with reference ID and GST billing breakdown.

---

## Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18+ or 20+ recommended)
- npm or pnpm

### Installation

```bash
# 1. Clone your repository
git clone https://github.com/<your-username>/<your-repo-name>.git

# 2. Enter the directory
cd <your-repo-name>

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## How to Host on GitHub (GitHub Pages)

This repository includes a pre-configured GitHub Actions workflow in `.github/workflows/deploy.yml`.

### Step-by-Step GitHub Pages Deployment:

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Gain Grub Luxury Diet Platform"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```

2. **Enable GitHub Pages in Repository Settings**:
   - Go to your repository on GitHub.
   - Click on **Settings** > **Pages** (under "Code and automation").
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
   - Push a commit or trigger the workflow manually from the **Actions** tab.

3. **View Your Live Website**:
   - Once the action finishes (~1-2 minutes), your live website will be available at:
     ```
     https://<your-username>.github.io/<your-repo-name>/
     ```

---

## Deploying to Other Free Platforms

### Option A: Vercel
1. Push your repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import this repository.
4. Framework Preset will automatically detect **Vite**.
5. Click **Deploy**.

### Option B: Netlify
1. Go to [netlify.com](https://www.netlify.com/) and click **"Add new site"** > **"Import an existing project"**.
2. Select GitHub and choose your repository.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Click **Deploy Site**.

---

## Project Structure

```
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Pages CI/CD workflow
├── public/
│   └── assets/
│       └── aistudio/
│           ├── 1_f115f14d.png  # Gain Grub Official Logo
│           └── gemini_generated_video_a59c4846_45cb7841.mp4 # 3D Culinary Front Video
├── src/
│   ├── components/
│   │   ├── Header.tsx          # 3-Zone top bar with Gain Grub logo & mobile drawer
│   │   ├── Hero3DVideo.tsx     # 3D interactive motion video hero card
│   │   ├── MealPlanner.tsx     # Personalized 7-day meal plan generator
│   │   ├── NutritionTracker.tsx# Real-time macro & hydration bio-tracker
│   │   ├── GroceryBuilder.tsx  # Integrated grocery list builder with ₹ pricing
│   │   ├── BookingSection.tsx  # 1-on-1 consultations & chef meal delivery
│   │   └── Footer.tsx          # Luxury footer with certifications and Indian cities
│   ├── data/
│   │   └── mockData.ts         # Curated recipes, specialists, and meal plans
│   ├── types/
│   │   └── diet.ts             # TypeScript definitions
│   ├── App.tsx                 # Root application
│   ├── index.css               # Tailwind CSS v4 & custom 3D utilities
│   └── main.tsx                # React 19 entry point
├── index.html                  # HTML entry point with Google Fonts
├── package.json                # Project dependencies and scripts
├── tsconfig.json               # TypeScript configuration
└── vite.config.ts              # Vite configuration with relative base path
```

---

## License

This project is licensed under the Apache-2.0 License.
