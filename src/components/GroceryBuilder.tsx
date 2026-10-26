import React, { useState, useMemo } from 'react';
import { GroceryItem } from '../types/diet';
import { 
  ShoppingBag, 
  Check, 
  Plus, 
  Trash2, 
  Copy, 
  Share2, 
  CheckCircle, 
  DollarSign, 
  ExternalLink,
  Sparkles,
  ShoppingBasket
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface GroceryBuilderProps {
  groceryItems: GroceryItem[];
  onToggleComplete: (id: string) => void;
  onUpdateQuantity: (id: string, newAmount: number) => void;
  onRemoveItem: (id: string) => void;
  onAddItem: (item: Omit<GroceryItem, 'id' | 'isCompleted'>) => void;
  onClearCompleted: () => void;
}

export const GroceryBuilder: React.FC<GroceryBuilderProps> = ({
  groceryItems,
  onToggleComplete,
  onUpdateQuantity,
  onRemoveItem,
  onAddItem,
  onClearCompleted,
}) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [partnerOrderModal, setPartnerOrderModal] = useState<string | null>(null);

  // New item form state
  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState(250);
  const [newItemUnit, setNewItemUnit] = useState('g');
  const [newItemCategory, setNewItemCategory] = useState<GroceryItem['category']>('proteins');
  const [newItemPrice, setNewItemPrice] = useState(150);

  // Computed metrics
  const totalEstimatedCostINR = useMemo(() => {
    return groceryItems.reduce((acc, item) => acc + item.estimatedPriceINR, 0);
  }, [groceryItems]);

  const completedCount = groceryItems.filter(i => i.isCompleted).length;
  const pendingCount = groceryItems.length - completedCount;

  const filteredItems = groceryItems.filter(item => {
    if (filter === 'pending') return !item.isCompleted;
    if (filter === 'completed') return item.isCompleted;
    return true;
  });

  // Group by category
  const categories: { key: GroceryItem['category']; label: string; icon: string }[] = [
    { key: 'proteins', label: 'Proteins & Seafood', icon: '🥩' },
    { key: 'produce', label: 'Farm Fresh Produce', icon: '🥗' },
    { key: 'grains', label: 'Whole Grains & Carbs', icon: '🌾' },
    { key: 'fats', label: 'Healthy Lipids & Nuts', icon: '🫒' },
    { key: 'pantry', label: 'Herbs & Pantry', icon: '🧂' },
  ];

  const handleCreateItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    onAddItem({
      name: newItemName.trim(),
      amount: Number(newItemAmount) || 1,
      unit: newItemUnit,
      category: newItemCategory,
      estimatedPriceINR: Number(newItemPrice) || 50,
      sourceMealName: 'Custom Entry'
    });

    setNewItemName('');
    setIsAddOpen(false);
  };

  const handleCopyClipboard = () => {
    const lines = [
      `🛒 GAIN GRUB — INTEGRATED GROCERY LIST`,
      `Est. Total: ₹${totalEstimatedCostINR.toLocaleString('en-IN')}`,
      `Items: ${groceryItems.length} (${completedCount} bought)`,
      `---------------------------------`,
      ...groceryItems.map(
        i => `[${i.isCompleted ? '✓' : ' '}] ${i.name} — ${i.amount}${i.unit} (~₹${i.estimatedPriceINR})`
      ),
      `---------------------------------`,
      `Generated via Gain Grub Luxury Diet Architecture`
    ].join('\n');

    navigator.clipboard.writeText(lines).then(() => {
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2500);
    });
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `🛒 *Gain Grub Diet Grocery List*\n` +
      `Est. Total: *₹${totalEstimatedCostINR.toLocaleString('en-IN')}*\n\n` +
      groceryItems.map(i => `${i.isCompleted ? '✅' : '▫️'} ${i.name} (${i.amount}${i.unit}) - ₹${i.estimatedPriceINR}`).join('\n')
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const triggerPartnerCheckout = (partnerName: string) => {
    setPartnerOrderModal(partnerName);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  return (
    <section id="groceries" className="py-16 md:py-24 border-t border-white/10 bg-[#0d0f12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Strip */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#ff3b30] font-bold mb-2">
              Automated Pantry Logistics
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Integrated Grocery List Builder
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl">
              Synchronized automatically from your weekly meal recipes with real-time Indian Rupee budget calculations and one-click quick commerce export.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleCopyClipboard}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 border border-white/15 text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Copy className="w-4 h-4 text-amber-400" />
              <span>{copyFeedback ? 'Copied to Clipboard!' : 'Copy List'}</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="px-4 py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>WhatsApp List</span>
            </button>

            <button
              onClick={() => setIsAddOpen(!isAddOpen)}
              className="px-4 py-2.5 rounded-xl bg-[#ff3b30] hover:bg-[#e02d23] text-white text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Custom Item</span>
            </button>
          </div>
        </div>

        {/* Budget & Stats Strip */}
        <div className="p-6 rounded-2xl bg-[#14181c] border border-white/10 mb-8 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center shadow-xl">
          <div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Estimated Total Indian Market Cost
            </div>
            <div className="text-3xl font-black text-amber-400 font-display tabular-nums mt-1">
              ₹{totalEstimatedCostINR.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Based on organic farm & tier-1 grocery retail pricing in India
            </div>
          </div>

          <div className="sm:border-l sm:border-white/10 sm:pl-6">
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Cart Completion Status
            </div>
            <div className="text-2xl font-bold text-white font-display tabular-nums mt-1">
              {completedCount} of {groceryItems.length} Items Packed
            </div>
            <div className="w-full h-2 bg-black/60 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-emerald-400 rounded-full transition-all duration-300"
                style={{ width: `${groceryItems.length > 0 ? (completedCount / groceryItems.length) * 100 : 0}%` }}
              />
            </div>
          </div>

          <div className="sm:border-l sm:border-white/10 sm:pl-6 flex flex-col gap-2">
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Instant 10-Min Quick Dispatch
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => triggerPartnerCheckout('Blinkit')}
                className="px-3 py-1.5 rounded-lg bg-yellow-500/15 hover:bg-yellow-500/25 border border-yellow-500/30 text-yellow-300 text-xs font-semibold cursor-pointer"
              >
                Blinkit Dispatch
              </button>
              <button
                onClick={() => triggerPartnerCheckout('Zepto')}
                className="px-3 py-1.5 rounded-lg bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-300 text-xs font-semibold cursor-pointer"
              >
                Zepto Quick
              </button>
              <button
                onClick={() => triggerPartnerCheckout('Instamart')}
                className="px-3 py-1.5 rounded-lg bg-orange-500/15 hover:bg-orange-500/25 border border-orange-500/30 text-orange-300 text-xs font-semibold cursor-pointer"
              >
                Instamart
              </button>
            </div>
          </div>
        </div>

        {/* Add Custom Item Modal / Inline Drawer */}
        {isAddOpen && (
          <form
            onSubmit={handleCreateItem}
            className="p-6 mb-8 rounded-2xl bg-[#181d22] border border-[#ff3b30]/50 shadow-2xl space-y-4 animate-fade-in"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Add Custom Grocery Ingredient
              </h4>
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <div className="lg:col-span-2">
                <label className="text-[11px] text-slate-300 font-semibold mb-1 block">
                  Ingredient Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Free-Range Chicken Breast or Almond Flour"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full bg-[#101316] border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ff3b30]"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-300 font-semibold mb-1 block">
                  Category
                </label>
                <select
                  value={newItemCategory}
                  onChange={(e) => setNewItemCategory(e.target.value as GroceryItem['category'])}
                  className="w-full bg-[#101316] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                >
                  <option value="proteins">Proteins & Meat</option>
                  <option value="produce">Fresh Produce</option>
                  <option value="grains">Whole Grains</option>
                  <option value="fats">Healthy Fats</option>
                  <option value="pantry">Herbs & Pantry</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-300 font-semibold mb-1 block">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={newItemAmount}
                    onChange={(e) => setNewItemAmount(Number(e.target.value))}
                    className="w-full bg-[#101316] border border-white/15 rounded-xl px-2 py-2 text-xs text-white tabular-nums"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-300 font-semibold mb-1 block">
                    Unit
                  </label>
                  <input
                    type="text"
                    value={newItemUnit}
                    onChange={(e) => setNewItemUnit(e.target.value)}
                    className="w-full bg-[#101316] border border-white/15 rounded-xl px-2 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-300 font-semibold mb-1 block">
                  Est. Price (₹)
                </label>
                <input
                  type="number"
                  value={newItemPrice}
                  onChange={(e) => setNewItemPrice(Number(e.target.value))}
                  className="w-full bg-[#101316] border border-white/15 rounded-xl px-3 py-2 text-xs text-white tabular-nums"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#ff3b30] hover:bg-[#e02d23] text-white text-xs font-semibold cursor-pointer"
              >
                Add to List
              </button>
            </div>
          </form>
        )}

        {/* Filter Tabs & Clean Actions */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 flex-wrap gap-4">
          <div className="flex items-center gap-1.5 p-1 bg-[#14181c] rounded-xl border border-white/10">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filter === 'all' ? 'bg-[#ff3b30] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({groceryItems.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filter === 'pending' ? 'bg-[#ff3b30] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              To Buy ({pendingCount})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filter === 'completed' ? 'bg-[#ff3b30] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Purchased ({completedCount})
            </button>
          </div>

          {completedCount > 0 && (
            <button
              onClick={onClearCompleted}
              className="text-xs text-slate-400 hover:text-red-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Completed ({completedCount})</span>
            </button>
          )}
        </div>

        {/* Categorized List Sections */}
        <div className="space-y-8">
          {categories.map((cat) => {
            const itemsInCat = filteredItems.filter(i => i.category === cat.key);
            if (itemsInCat.length === 0) return null;

            const categorySubtotal = itemsInCat.reduce((acc, i) => acc + i.estimatedPriceINR, 0);

            return (
              <div key={cat.key} className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{cat.icon}</span>
                    <h3 className="font-display text-base font-bold text-white">
                      {cat.label}
                    </h3>
                    <span className="text-xs text-slate-500">
                      ({itemsInCat.length} items)
                    </span>
                  </div>
                  <span className="text-xs font-bold text-amber-400 tabular-nums">
                    Est. ₹{categorySubtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {itemsInCat.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                        item.isCompleted
                          ? 'bg-[#101316]/50 border-white/5 opacity-65'
                          : 'bg-[#14181c] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Checkbox */}
                        <button
                          onClick={() => onToggleComplete(item.id)}
                          className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors cursor-pointer shrink-0 ${
                            item.isCompleted
                              ? 'bg-emerald-500 border-emerald-500 text-white'
                              : 'border-white/25 hover:border-white/50 bg-black/40'
                          }`}
                          aria-label={item.isCompleted ? 'Mark as pending' : 'Mark as completed'}
                        >
                          {item.isCompleted && <Check className="w-3.5 h-3.5" />}
                        </button>

                        <div className="min-w-0">
                          <div
                            className={`text-sm font-semibold truncate ${
                              item.isCompleted ? 'line-through text-slate-500' : 'text-white'
                            }`}
                          >
                            {item.name}
                          </div>
                          {item.sourceMealName && (
                            <div className="text-[10px] text-slate-500 truncate">
                              From: {item.sourceMealName}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        {/* Quantity Stepper */}
                        <div className="flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded-lg border border-white/5 text-xs">
                          <button
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.amount - (item.unit === 'g' ? 50 : 1)))}
                            className="text-slate-400 hover:text-white px-1 font-bold"
                          >
                            -
                          </button>
                          <span className="font-semibold text-white tabular-nums min-w-[45px] text-center">
                            {item.amount} {item.unit}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.amount + (item.unit === 'g' ? 50 : 1))}
                            className="text-slate-400 hover:text-white px-1 font-bold"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-xs font-bold text-amber-400 tabular-nums min-w-[50px] text-right">
                          ₹{item.estimatedPriceINR}
                        </div>

                        {/* Delete */}
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1 rounded text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Commerce Partner Modal */}
        {partnerOrderModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#14181c] border border-white/20 rounded-2xl p-6 max-w-md w-full shadow-2xl text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <ShoppingBasket className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">
                Cart Packaged for {partnerOrderModal}
              </h3>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                All {pendingCount} unpurchased organic diet items (Total ₹{groceryItems.filter(i => !i.isCompleted).reduce((a, b) => a + b.estimatedPriceINR, 0).toLocaleString('en-IN')}) have been mapped to local cold-chain darkstores in your Indian city!
              </p>
              <div className="p-3 bg-black/50 rounded-xl border border-white/10 text-xs text-amber-300 mb-5 font-mono">
                Estimated Delivery: 10 - 15 Mins · Cold-Insulated Box
              </div>
              <button
                onClick={() => setPartnerOrderModal(null)}
                className="w-full py-2.5 rounded-xl bg-[#ff3b30] hover:bg-[#d82a20] text-white text-xs font-semibold cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
