import { useState } from 'react';
import { Sparkles, ShoppingBag, Check, Layers, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

interface StyleTheme {
  id: string;
  name: string;
  subtitle: string;
  topId: string;
  bottomId: string;
  accentText: string;
}

const STYLE_THEMES: StyleTheme[] = [
  {
    id: 'theme-1',
    name: 'Mohanur Evening Formal',
    subtitle: 'Crisp Cotton & Tailored Korean Fit',
    topId: 'p1', // Oxford shirt
    bottomId: 'p2', // Denim/trousers
    accentText: 'Best for business, client visits & dinner'
  },
  {
    id: 'theme-2',
    name: 'Festival Gold Elegance',
    subtitle: 'Pure Linen Texture & Relaxed Comfort',
    topId: 'p3', // Silk/Linen Kurta
    bottomId: 'p2',
    accentText: 'Ideal for weddings, temple visits & family functions'
  },
  {
    id: 'theme-3',
    name: 'Streetwear Weekend Drop',
    subtitle: 'Oversized Cuban & Heavy Stretch Denim',
    topId: 'p5', // Cuban shirt
    bottomId: 'p2',
    accentText: 'Engineered for coffee runs, movies & road trips'
  }
];

export default function StyleStudioBundler() {
  const [selectedThemeId, setSelectedThemeId] = useState<string>(STYLE_THEMES[0].id);
  const [selectedSize, setSelectedSize] = useState<string>('L');
  const [bundleAdded, setBundleAdded] = useState(false);
  const { addToCart } = useCart();

  const currentTheme =
    STYLE_THEMES.find((t) => t.id === selectedThemeId) || STYLE_THEMES[0];

  const topProduct = products.find((p) => p.id === currentTheme.topId) || products[0];
  const bottomProduct = products.find((p) => p.id === currentTheme.bottomId) || products[1];

  const originalTotal = topProduct.price + bottomProduct.price;
  const bundleDiscount = Math.round(originalTotal * 0.15); // 15% complete look discount
  const finalPrice = originalTotal - bundleDiscount;

  const handleAddBundle = () => {
    // Add top with bundle discount
    addToCart(
      {
        ...topProduct,
        name: `${topProduct.name} (Style Bundle)`,
        price: Math.round(topProduct.price * 0.85)
      },
      selectedSize,
      1
    );

    // Add bottom with bundle discount
    addToCart(
      {
        ...bottomProduct,
        name: `${bottomProduct.name} (Style Bundle)`,
        price: Math.round(bottomProduct.price * 0.85)
      },
      selectedSize,
      1
    );

    setBundleAdded(true);
    setTimeout(() => setBundleAdded(false), 2500);
  };

  return (
    <section id="style-studio" className="py-24 px-6 relative bg-charcoal/90 border-t border-hairline/5 overflow-hidden">
      {/* Glow decorative */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-gold/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-slate-600/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 mb-3">
            <Sparkles size={14} className="text-gold" />
            <span className="text-gold text-xs uppercase tracking-[0.25em] font-semibold">
              Curated Style Studio
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-bone tracking-wide">
            Match &amp; Save Complete Looks
          </h2>
          <p className="text-boneDim text-sm sm:text-base max-w-2xl mx-auto mt-2">
            Pair complementary topwear and bottomwear designed for effortless fit. Unlock an instant <strong className="text-gold">15% Complete Look Discount</strong> on bundled ensembles.
          </p>
        </div>

        {/* Theme Selector Tabs */}
        <div className="flex justify-center gap-3 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {STYLE_THEMES.map((theme) => {
            const isSelected = selectedThemeId === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => setSelectedThemeId(theme.id)}
                className={`px-6 py-3 rounded-2xl text-xs uppercase font-bold tracking-wider transition-all whitespace-nowrap border ${
                  isSelected
                    ? 'bg-gold text-onGold border-gold shadow-lg shadow-gold/20 scale-105'
                    : 'bg-panel border-hairline/10 text-boneDim hover:text-bone hover:border-gold/30'
                }`}
              >
                {theme.name}
              </button>
            );
          })}
        </div>

        {/* Interactive Bundler Layout */}
        <div className="bg-ink/90 border border-hairline/10 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Top Product Card */}
            <div className="lg:col-span-4 bg-panel/90 rounded-3xl p-6 border border-hairline/10 flex flex-col items-center text-center group hover:border-gold/30 transition-all">
              <span className="text-[10px] uppercase font-bold tracking-widest text-gold mb-3 bg-gold/10 px-3 py-1 rounded-full">
                Step 1: Topwear
              </span>
              <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden mb-4 bg-black relative shadow-inner">
                <img
                  src={topProduct.image}
                  alt={topProduct.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-3 right-3 bg-gold text-onGold font-mono text-xs font-bold px-2.5 py-1 rounded-lg shadow-lg border border-gold">
                  ₹{topProduct.price}
                </span>
              </div>
              <h4 className="font-display text-lg text-bone tracking-wide">{topProduct.name}</h4>
              <p className="text-boneDim text-xs mt-1">100% Breathable Weave • Tailored Fit</p>
            </div>

            {/* Middle: Plus / Bundle Connector */}
            <div className="lg:col-span-1 flex flex-col items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/40 text-gold flex items-center justify-center font-bold text-lg shadow">
                +
              </div>
            </div>

            {/* Right-Middle: Bottom Product Card */}
            <div className="lg:col-span-4 bg-panel/90 rounded-3xl p-6 border border-hairline/10 flex flex-col items-center text-center group hover:border-gold/30 transition-all">
              <span className="text-[10px] uppercase font-bold tracking-widest text-gold mb-3 bg-gold/10 px-3 py-1 rounded-full">
                Step 2: Bottomwear
              </span>
              <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden mb-4 bg-black relative shadow-inner">
                <img
                  src={bottomProduct.image}
                  alt={bottomProduct.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-3 right-3 bg-gold text-onGold font-mono text-xs font-bold px-2.5 py-1 rounded-lg shadow-lg border border-gold">
                  ₹{bottomProduct.price}
                </span>
              </div>
              <h4 className="font-display text-lg text-bone tracking-wide">{bottomProduct.name}</h4>
              <p className="text-boneDim text-xs mt-1">Heavy Stretch Denim • Reinforced Seams</p>
            </div>

            {/* Right: Pricing & 1-Click Buy Box */}
            <div className="lg:col-span-3 bg-charcoal/90 rounded-3xl p-6 sm:p-7 border border-gold/30 flex flex-col justify-between shadow-2xl relative">
              <div className="inline-flex items-center gap-1.5 text-xs text-slate-300 font-semibold mb-3">
                <Zap size={14} className="fill-slate-400 text-slate-400" />
                <span>Bundle Savings Applied</span>
              </div>

              <h3 className="font-display text-2xl text-bone tracking-wide mb-1">
                {currentTheme.name}
              </h3>
              <p className="text-boneDim text-xs mb-4">
                {currentTheme.accentText}
              </p>

              {/* Size Selector */}
              <div className="mb-5">
                <label className="block text-[11px] uppercase tracking-wider text-boneDim mb-2">
                  Select Size
                </label>
                <div className="flex gap-2">
                  {['M', 'L', 'XL', 'XXL'].map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        selectedSize === sz
                          ? 'bg-gold text-onGold shadow'
                          : 'bg-panel text-boneDim hover:text-bone border border-hairline/10'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Calculation Breakdown */}
              <div className="space-y-1.5 pt-4 border-t border-hairline/10 mb-6 text-xs">
                <div className="flex justify-between text-boneDim">
                  <span>Combined Price</span>
                  <span className="line-through font-mono">₹{originalTotal}</span>
                </div>
                <div className="flex justify-between text-slate-400 font-semibold">
                  <span>Look Discount (15%)</span>
                  <span className="font-mono">-₹{bundleDiscount}</span>
                </div>
                <div className="flex justify-between text-bone font-bold text-base pt-2 border-t border-hairline/5">
                  <span>Bundle Total</span>
                  <span className="text-gold font-mono text-xl">₹{finalPrice}</span>
                </div>
              </div>

              {/* 1-Click CTA */}
              <button
                onClick={handleAddBundle}
                className={`w-full py-3.5 rounded-full text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg ${
                  bundleAdded
                    ? 'bg-slate-600 text-white shadow-slate-600/30'
                    : 'bg-gold hover:bg-goldDeep text-onGold shadow-gold/20'
                }`}
              >
                {bundleAdded ? (
                  <>
                    <Check size={16} /> Look Added to Bag!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} /> Add Full Outfit to Bag
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
