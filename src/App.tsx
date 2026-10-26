/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero3DVideo } from './components/Hero3DVideo';
import { MealPlanner } from './components/MealPlanner';
import { NutritionTracker } from './components/NutritionTracker';
import { GroceryBuilder } from './components/GroceryBuilder';
import { BookingSection } from './components/BookingSection';
import { Footer } from './components/Footer';
import { INITIAL_GROCERY_ITEMS, SAMPLE_MEALS } from './data/mockData';
import { GroceryItem, Ingredient } from './types/diet';
import confetti from 'canvas-confetti';

export default function App() {
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>(INITIAL_GROCERY_ITEMS);
  const [activeTab, setActiveTab] = useState<string>('hero');
  const [bannerNotice, setBannerNotice] = useState<string | null>(null);

  const showNotice = (msg: string) => {
    setBannerNotice(msg);
    setTimeout(() => setBannerNotice(null), 3500);
  };

  // Add ingredients from meals into grocery list (smart deduplication)
  const handleAddIngredientsToGrocery = (ingredients: Ingredient[], sourceMealName: string) => {
    setGroceryItems((prev) => {
      const updated = [...prev];
      ingredients.forEach((ing) => {
        const existingIdx = updated.findIndex(
          (item) => item.name.toLowerCase() === ing.name.toLowerCase()
        );
        if (existingIdx >= 0) {
          updated[existingIdx] = {
            ...updated[existingIdx],
            amount: updated[existingIdx].amount + ing.amount,
            estimatedPriceINR: updated[existingIdx].estimatedPriceINR + ing.estimatedPriceINR,
          };
        } else {
          updated.push({
            id: `g-${Date.now()}-${Math.random()}`,
            name: ing.name,
            amount: ing.amount,
            unit: ing.unit,
            category: ing.category,
            estimatedPriceINR: ing.estimatedPriceINR,
            isCompleted: false,
            sourceMealName,
          });
        }
      });
      return updated;
    });

    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.8 }
    });
    showNotice(`Synced ${ingredients.length} ingredients to Grocery Builder!`);
  };

  const handleToggleComplete = (id: string) => {
    setGroceryItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  const handleUpdateQuantity = (id: string, newAmount: number) => {
    setGroceryItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, amount: newAmount } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setGroceryItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddCustomGroceryItem = (item: Omit<GroceryItem, 'id' | 'isCompleted'>) => {
    const newItem: GroceryItem = {
      ...item,
      id: `custom-g-${Date.now()}`,
      isCompleted: false,
    };
    setGroceryItems((prev) => [newItem, ...prev]);
    showNotice(`Added "${item.name}" to grocery builder!`);
  };

  const handleClearCompleted = () => {
    setGroceryItems((prev) => prev.filter((item) => !item.isCompleted));
    showNotice('Cleared completed items from grocery list.');
  };

  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickAddSignatureBowl = () => {
    const sigBowl = SAMPLE_MEALS[0];
    handleAddIngredientsToGrocery(sigBowl.ingredients, sigBowl.name);
  };

  return (
    <div className="min-h-screen bg-[#0b0d0e] text-[#f3f4f6] selection:bg-[#ff3b30] selection:text-white flex flex-col">
      {/* Dynamic Toast Notice */}
      {bannerNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161a1e] border border-amber-400/40 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md animate-fade-in text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{bannerNotice}</span>
        </div>
      )}

      {/* Clean Header Bar with Gain Grub Logo and 3-Zone contract */}
      <Header
        groceryCount={groceryItems.filter((i) => !i.isCompleted).length}
        onOpenBooking={() => scrollToSection('booking')}
        onSelectTab={scrollToSection}
        activeTab={activeTab}
      />

      <main className="flex-1">
        {/* 1. Flagship 3D Interactive Front Video Section */}
        <Hero3DVideo
          onExplorePlans={() => scrollToSection('meal-plans')}
          onOpenBooking={() => scrollToSection('booking')}
          onQuickAddMealToGrocery={handleQuickAddSignatureBowl}
        />

        {/* 2. Personalized 7-Day Meal Architecture */}
        <MealPlanner
          onAddIngredientsToGrocery={handleAddIngredientsToGrocery}
          onOpenBooking={() => scrollToSection('booking')}
        />

        {/* 3. Real-Time Macro & Nutritional Tracker */}
        <NutritionTracker />

        {/* 4. Integrated Grocery List Builder with Indian Rupee Pricing */}
        <GroceryBuilder
          groceryItems={groceryItems}
          onToggleComplete={handleToggleComplete}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onAddItem={handleAddCustomGroceryItem}
          onClearCompleted={handleClearCompleted}
        />

        {/* 5. Luxury Booking Section (Consultations & Meal Delivery Subscriptions) */}
        <BookingSection
          onBookingSuccess={(booking) => {
            showNotice(`Order confirmed! Reference: ${booking.id}`);
          }}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
