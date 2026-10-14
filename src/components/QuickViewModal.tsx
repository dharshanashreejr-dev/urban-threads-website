import { useState } from 'react';
import {
  X,
  Star,
  Truck,
  ShieldCheck,
  Ruler,
  Sparkles,
  ShoppingBag,
  Heart,
  Layers,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatINR } from '../utils/gst';
import SizeGuideModal from './SizeGuideModal';

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
  onNavigateToCart?: () => void;
}

export default function QuickViewModal({ product, onClose, onNavigateToCart }: QuickViewModalProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || '');
  const [qty, setQty] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Fit Finder State
  const [fitFinderOpen, setFitFinderOpen] = useState(false);
  const [heightCm, setHeightCm] = useState(172);
  const [weightKg, setWeightKg] = useState(68);
  const [fitPref, setFitPref] = useState<'slim' | 'regular' | 'relaxed'>('regular');
  const [recommendedSize, setRecommendedSize] = useState<string | null>(null);

  // Pincode Checker State
  const [pincode, setPincode] = useState('');
  const [deliveryEta, setDeliveryEta] = useState<string | null>(null);

  const calculateFit = () => {
    let size = 'M';
    if (product.category === 'Jeans' || product.category === 'Trousers') {
      if (weightKg < 60) size = '30';
      else if (weightKg < 70) size = '32';
      else if (weightKg < 80) size = '34';
      else if (weightKg < 90) size = '36';
      else size = '38';
    } else {
      if (weightKg < 62) size = fitPref === 'relaxed' ? 'M' : 'S';
      else if (weightKg < 74) size = fitPref === 'slim' ? 'M' : fitPref === 'relaxed' ? 'XL' : 'L';
      else if (weightKg < 86) size = fitPref === 'slim' ? 'L' : 'XL';
      else size = 'XXL';
    }

    if (product.sizes.includes(size)) {
      setRecommendedSize(size);
      setSelectedSize(size);
    } else {
      setRecommendedSize(product.sizes[0]);
    }
  };

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.length < 6) {
      setDeliveryEta('Please enter a valid 6-digit pin code');
      return;
    }

    if (pincode.startsWith('639')) {
      setDeliveryEta('⚡ Same-Day Delivery in Mohanur (Free Store Pickup Available)');
    } else if (pincode.startsWith('641') || pincode.startsWith('638') || pincode.startsWith('636')) {
      setDeliveryEta('🚚 Delivered in 24 Hours (Coimbatore / Erode / Salem Hub)');
    } else if (pincode.startsWith('600') || pincode.startsWith('625') || pincode.startsWith('620')) {
      setDeliveryEta('🚚 Delivered in 24-48 Hours (Chennai / Madurai / Trichy Express)');
    } else if (pincode.startsWith('6')) {
      setDeliveryEta('🚚 Delivered in 2-3 Days via ST Courier across South India');
    } else {
      setDeliveryEta('🚚 Delivered in 3-5 Days via Express Speed Post');
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setToast('Please choose a size first');
      setTimeout(() => setToast(null), 2000);
      return;
    }
    addToCart(product, selectedSize, qty);
    setToast(`Added ${product.name} (${selectedSize}) to cart`);
    setTimeout(() => setToast(null), 2000);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setToast('Please choose a size first');
      setTimeout(() => setToast(null), 2000);
      return;
    }
    addToCart(product, selectedSize, qty);
    onClose();
    if (onNavigateToCart) {
      onNavigateToCart();
    }
  };

  const isFavorited = isInWishlist(product.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-panel border border-hairline/10 rounded-3xl p-6 sm:p-8 max-w-4xl w-full relative shadow-2xl animate-in fade-in zoom-in-95 duration-200 my-8">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-boneDim hover:text-bone z-10"
          aria-label="Close Quick View"
        >
          <X size={22} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left: Product Image */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-charcoal border border-hairline/10 shadow-lg group">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {product.trending && (
                <span className="absolute top-3 left-3 bg-gold text-onGold text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow">
                  Trending
                </span>
              )}
              <button
                onClick={() => toggleWishlist(product)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-ink/70 backdrop-blur text-bone flex items-center justify-center hover:bg-ink transition-colors"
                aria-label="Add to Wishlist"
              >
                <Heart
                  size={18}
                  className={isFavorited ? 'fill-pink-500 text-pink-500' : 'text-bone'}
                />
              </button>
            </div>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-boneDim bg-charcoal/60 p-3 rounded-xl border border-hairline/5">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-slate-400 shrink-0" />
                <span>100% Quality Checked</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-gold shrink-0" />
                <span>Wholesale Direct</span>
              </div>
            </div>
          </div>

          {/* Right: Product Details & Interactive Sizing */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-gold text-xs uppercase tracking-widest font-semibold">
                  {product.category}
                </span>
                <span className="text-[11px] text-slate-400 bg-slate-950/40 px-2 py-0.5 rounded-full border border-slate-800/30">
                  ● In Stock (Mohanur Hub)
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl text-bone tracking-wide mb-2">
                {product.name}
              </h2>

              {/* Price & Bulk Discount Pill */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-display text-3xl text-gold font-bold">
                  {formatINR(product.price)}
                </span>
                <span className="text-boneDim text-xs line-through">
                  {formatINR(Math.round(product.price * 1.35))}
                </span>
                <span className="text-xs bg-gold/15 text-gold px-2.5 py-0.5 rounded-full font-bold">
                  25% OFF
                </span>
              </div>

              <p className="text-boneDim text-xs sm:text-sm leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Size Selector with Size Guide trigger */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-bone text-xs uppercase tracking-wider font-semibold">
                    Select Size: <strong className="text-gold">{selectedSize}</strong>
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setFitFinderOpen(!fitFinderOpen)}
                      className="text-xs text-gold hover:text-goldDeep flex items-center gap-1 font-semibold"
                    >
                      <Sparkles size={13} />
                      {fitFinderOpen ? 'Hide Fit Assistant' : 'Smart Fit Finder'}
                    </button>
                    <button
                      onClick={() => setShowSizeGuide(true)}
                      className="text-xs text-boneDim hover:text-bone flex items-center gap-1 underline"
                    >
                      <Ruler size={13} /> Size Chart
                    </button>
                  </div>
                </div>

                {/* Size Pills */}
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[42px] h-10 px-3 rounded-xl text-xs font-bold border transition-all ${
                        selectedSize === size
                          ? 'bg-gold text-onGold border-gold shadow-md shadow-gold/20 scale-105'
                          : 'bg-charcoal border-hairline/10 text-bone hover:border-gold/40'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {/* Smart Fit Finder Calculator Drawer */}
                {fitFinderOpen && (
                  <div className="mt-4 p-4 rounded-2xl bg-charcoal border border-gold/30 shadow-inner">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles size={14} className="text-gold" />
                      <span className="text-bone font-semibold text-xs uppercase tracking-wider">
                        Virtual Fit &amp; Size Recommender
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
                      <div>
                        <label className="text-boneDim block text-[11px] mb-1">Height ({heightCm} cm)</label>
                        <input
                          type="range"
                          min="150"
                          max="200"
                          value={heightCm}
                          onChange={(e) => setHeightCm(Number(e.target.value))}
                          className="w-full accent-gold"
                        />
                      </div>
                      <div>
                        <label className="text-boneDim block text-[11px] mb-1">Weight ({weightKg} kg)</label>
                        <input
                          type="range"
                          min="45"
                          max="110"
                          value={weightKg}
                          onChange={(e) => setWeightKg(Number(e.target.value))}
                          className="w-full accent-gold"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <div className="flex gap-1.5">
                        {(['slim', 'regular', 'relaxed'] as const).map((pref) => (
                          <button
                            key={pref}
                            onClick={() => setFitPref(pref)}
                            className={`px-2.5 py-1 rounded text-[10px] uppercase font-semibold capitalize ${
                              fitPref === pref ? 'bg-gold text-onGold' : 'bg-ink text-boneDim'
                            }`}
                          >
                            {pref}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={calculateFit}
                        className="bg-gold text-onGold font-bold text-xs px-3.5 py-1.5 rounded-full hover:bg-goldDeep transition-colors"
                      >
                        Calculate Size
                      </button>
                    </div>

                    {recommendedSize && (
                      <div className="mt-3 pt-3 border-t border-hairline/10 text-xs text-slate-400 flex items-center gap-2">
                        <CheckCircle2 size={14} />
                        <span>
                          Recommended for you: <strong className="text-white text-sm">{recommendedSize}</strong>
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Wholesale Tier Discount Badge */}
              <div className="mb-6 p-3 rounded-xl bg-charcoal/60 border border-hairline/5 text-xs text-boneDim">
                <p className="text-gold font-semibold uppercase tracking-wider text-[10px] mb-1">
                  📦 Wholesale Bundle Discounts:
                </p>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <span>• 3+ Pcs: <strong>10% OFF</strong></span>
                  <span>• 6+ Pcs: <strong>20% OFF (Reseller Tier)</strong></span>
                </div>
              </div>

              {/* Pincode Delivery Estimator */}
              <div className="mb-6">
                <form onSubmit={handlePincodeCheck} className="flex gap-2">
                  <div className="relative flex-1">
                    <Truck size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-boneDim" />
                    <input
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.slice(0, 6))}
                      placeholder="Enter Tamil Nadu Pincode (e.g. 637015)"
                      className="w-full bg-charcoal border border-hairline/10 rounded-xl pl-9 pr-3 py-2 text-xs text-bone placeholder:text-boneDim focus:outline-none focus:border-gold/50"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-panel hover:bg-panel/80 text-bone text-xs font-semibold px-4 py-2 rounded-xl border border-hairline/10 transition-colors uppercase tracking-wider"
                  >
                    Check
                  </button>
                </form>
                {deliveryEta && (
                  <p className="text-[11px] text-gold mt-2 font-medium">{deliveryEta}</p>
                )}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="pt-4 border-t border-hairline/10 flex flex-col sm:flex-row gap-3">
              <div className="flex items-center gap-2 bg-charcoal rounded-full px-3 py-1.5 border border-hairline/10 w-fit">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-7 h-7 rounded-full text-boneDim hover:text-bone flex items-center justify-center font-bold"
                >
                  -
                </button>
                <span className="w-6 text-center font-mono text-sm text-bone font-semibold">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-7 h-7 rounded-full text-boneDim hover:text-bone flex items-center justify-center font-bold"
                >
                  +
                </button>
              </div>

              <div className="flex-1 flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-panel border border-gold/50 text-gold hover:bg-gold/10 font-bold py-3 px-4 rounded-full text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={14} /> Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-gold hover:bg-goldDeep text-onGold font-bold py-3 px-4 rounded-full text-xs uppercase tracking-wider transition-colors shadow-lg shadow-gold/20 flex items-center justify-center gap-2"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Toast */}
        {toast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-bone text-ink px-6 py-3 rounded-full text-xs font-bold shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-2">
            {toast}
          </div>
        )}
      </div>

      {showSizeGuide && (
        <SizeGuideModal category={product.category} onClose={() => setShowSizeGuide(false)} />
      )}
    </div>
  );
}
