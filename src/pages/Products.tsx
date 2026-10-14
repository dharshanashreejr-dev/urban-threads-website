import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  Heart,
  Eye,
  Ruler,
  ShoppingBag,
  SlidersHorizontal,
  ArrowUpDown,
  Sparkles,
  CheckCircle2,
  Clock,
  TrendingUp,
  X
} from 'lucide-react';
import { products, categories, Product } from '../data/products';
import { getStock } from '../utils/stockStore';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatINR } from '../utils/gst';
import QuickViewModal from '../components/QuickViewModal';
import SizeGuideModal from '../components/SizeGuideModal';

type SortOption = 'Featured' | 'Price: Low to High' | 'Price: High to Low';

export default function Products() {
  const [category, setCategory] = useState<(typeof categories)[number]>('All');
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('Featured');
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [sizeGuideCategory, setSizeGuideCategory] = useState<Product['category'] | null>(null);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [toast, setToast] = useState<string | null>(null);
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const matchesCategory = category === 'All' || p.category === category;
      const matchesQuery =
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.color.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });

    if (sortBy === 'Price: Low to High') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High to Low') {
      list.sort((a, b) => b.price - a.price);
    } else {
      // Featured / Trending first
      list.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0));
    }

    return list;
  }, [category, query, sortBy]);

  function handleAddToCart(product: Product) {
    const size = selectedSizes[product.id] || product.sizes[0];
    addToCart(product, size, 1);
    setToast(`${product.name} (${size}) added to your bag`);
    setTimeout(() => setToast(null), 2000);
  }

  function handleBuyNow(product: Product) {
    const size = selectedSizes[product.id] || product.sizes[0];
    addToCart(product, size, 1);
    navigate('/cart');
  }

  return (
    <div className="bg-ink min-h-screen">
      {/* Hero Banner */}
      <div className="relative overflow-hidden border-b border-hairline/10">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.06] to-transparent pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 text-gold text-xs uppercase tracking-[0.3em] font-semibold mb-2">
                <Sparkles size={13} />
                <span>Direct Wholesale &amp; Retail Pricing</span>
              </div>
              <h1 className="font-display text-4xl sm:text-6xl text-bone tracking-wide">
                Shop Urban Threads
              </h1>
              <p className="text-boneDim text-xs sm:text-sm max-w-lg mt-2">
                Premium cotton shirts, stretch jeans, trousers, and kurta sets from Mohanur —
                curated for everyday wear and bulk retail.
              </p>
            </div>

            <button
              onClick={() => setSizeGuideCategory('Shirts')}
              className="inline-flex items-center gap-1.5 text-xs text-gold hover:text-goldDeep bg-panel px-4 py-2.5 rounded-full border border-hairline/10 hover:border-gold/40 self-start md:self-auto font-semibold uppercase tracking-wider transition-colors"
            >
              <Ruler size={14} /> Size &amp; Fit Guide
            </button>
          </motion.div>

          {/* Stat strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="flex flex-wrap gap-x-8 gap-y-2 mt-8 pt-6 border-t border-hairline/10"
          >
            <div>
              <p className="font-display text-2xl text-bone">{products.length}+</p>
              <p className="text-boneDim text-[10px] uppercase tracking-widest">Styles</p>
            </div>
            <div>
              <p className="font-display text-2xl text-gold">
                {products.filter((p) => p.trending).length}
              </p>
              <p className="text-boneDim text-[10px] uppercase tracking-widest">Trending Now</p>
            </div>
            <div>
              <p className="font-display text-2xl text-slate-400">
                {products.filter((p) => p.isNew).length}
              </p>
              <p className="text-boneDim text-[10px] uppercase tracking-widest">New Arrivals</p>
            </div>
            <div>
              <p className="font-display text-2xl text-bone">{categories.length - 1}</p>
              <p className="text-boneDim text-[10px] uppercase tracking-widest">Categories</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-10 lg:sticky lg:top-24 z-30 bg-ink/95 backdrop-blur-sm lg:py-3 lg:-mx-3 lg:px-3 lg:rounded-2xl">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-boneDim" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search shirts, stretch denim, kurtas, colors..."
            className="w-full bg-panel border border-hairline/10 rounded-full pl-11 pr-10 py-3 text-sm text-bone placeholder:text-boneDim focus:outline-none focus:border-gold/50 shadow-md"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-boneDim hover:text-bone"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {categories.map((c) => {
            const count =
              c === 'All'
                ? products.length
                : products.filter((p) => p.category === c).length;

            return (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-5 py-3 rounded-full text-xs whitespace-nowrap uppercase tracking-wider font-semibold transition-all ${
                  category === c
                    ? 'bg-gold text-onGold shadow-lg shadow-gold/20'
                    : 'bg-panel border border-hairline/10 text-boneDim hover:text-bone hover:border-gold/40'
                }`}
              >
                {c} <span className="opacity-70 text-[10px]">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2 bg-panel border border-hairline/10 rounded-full px-4 py-2.5 text-xs text-boneDim w-fit">
          <ArrowUpDown size={14} className="text-gold" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="bg-transparent text-bone font-medium focus:outline-none cursor-pointer pr-2"
          >
            <option value="Featured" className="bg-charcoal text-bone">
              Featured / Trending
            </option>
            <option value="Price: Low to High" className="bg-charcoal text-bone">
              Price: Low to High
            </option>
            <option value="Price: High to Low" className="bg-charcoal text-bone">
              Price: High to Low
            </option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {filtered.length === 0 ? (
        <div className="bg-panel rounded-3xl p-16 text-center border border-hairline/5 max-w-lg mx-auto">
          <p className="text-boneDim text-sm mb-4">No products found matching &quot;{query}&quot;.</p>
          <button
            onClick={() => {
              setQuery('');
              setCategory('All');
            }}
            className="bg-gold text-onGold font-bold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((product) => {
            const isFav = isInWishlist(product.id);
            const activeSize = selectedSizes[product.id] || product.sizes[0];
            const stockLeft = getStock(product.id);
            const isOutOfStock = stockLeft <= 0;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="bg-panel rounded-3xl overflow-hidden border border-hairline/10 hover:border-gold/30 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:shadow-gold/10 hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="relative h-72 overflow-hidden bg-charcoal">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                    {product.isNew && (
                      <span className="inline-flex items-center gap-1 bg-slate-500/90 text-white text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full shadow">
                        <Clock size={10} /> New
                      </span>
                    )}
                    {product.trending && (
                      <span className="inline-flex items-center gap-1 bg-gold text-onGold text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full shadow">
                        <TrendingUp size={10} /> Trending
                      </span>
                    )}
                    <span className="bg-ink/80 backdrop-blur text-boneDim text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full border border-hairline/10">
                      {product.category}
                    </span>
                  </div>

                  {/* Wishlist Heart Button */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-ink/70 backdrop-blur text-bone flex items-center justify-center hover:bg-ink transition-colors shadow z-10"
                    aria-label="Wishlist"
                  >
                    <Heart
                      size={16}
                      className={isFav ? 'fill-pink-500 text-pink-500' : 'text-bone'}
                    />
                  </button>

                  {/* Quick View Button on Hover */}
                  <button
                    onClick={() => setQuickViewProduct(product)}
                    className="absolute bottom-3 right-3 bg-ink/85 backdrop-blur text-bone text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 hover:bg-ink opacity-0 group-hover:opacity-100 transition-opacity shadow"
                  >
                    <Eye size={13} className="text-gold" /> Quick View
                  </button>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-display text-xl text-bone tracking-wide mb-1 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-boneDim text-xs mb-3">{product.color}</p>

                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-gold font-display text-2xl font-bold">
                        {formatINR(product.price)}
                      </span>
                      <span className="text-boneDim text-xs line-through">
                        {formatINR(Math.round(product.price * 1.35))}
                      </span>
                    </div>
                    <p
                      className={`text-[10px] font-semibold uppercase tracking-wider mb-3 ${
                        isOutOfStock
                          ? 'text-red-400'
                          : stockLeft <= 10
                            ? 'text-slate-400'
                            : 'text-slate-400'
                      }`}
                    >
                      {isOutOfStock ? 'Out of Stock' : `${stockLeft} in stock`}
                    </p>

                    {/* Size Selector */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center text-[11px] uppercase tracking-wider mb-2 text-boneDim">
                        <span>Select Size:</span>
                        <button
                          onClick={() => setSizeGuideCategory(product.category)}
                          className="text-gold hover:underline font-semibold"
                        >
                          Size Guide
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {product.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() =>
                              setSelectedSizes((prev) => ({ ...prev, [product.id]: size }))
                            }
                            className={`min-w-[34px] h-8 px-2 rounded-lg text-xs font-bold border transition-colors ${
                              activeSize === size
                                ? 'bg-gold text-onGold border-gold'
                                : 'bg-charcoal border-hairline/10 text-boneDim hover:border-gold/40'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-hairline/5 flex gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={isOutOfStock}
                      className="flex-1 border border-gold/40 hover:bg-gold/10 text-gold rounded-full py-2.5 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                    >
                      <ShoppingBag size={13} /> Add
                    </button>
                    <button
                      onClick={() => handleBuyNow(product)}
                      disabled={isOutOfStock}
                      className="flex-1 bg-gold hover:bg-goldDeep text-onGold rounded-full py-2.5 text-xs font-bold uppercase tracking-wider transition-colors shadow-md shadow-gold/20 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-gold"
                    >
                      {isOutOfStock ? 'Sold Out' : 'Buy Now'}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onNavigateToCart={() => navigate('/cart')}
        />
      )}

      {/* Size Guide Modal */}
      {sizeGuideCategory && (
        <SizeGuideModal
          category={sizeGuideCategory}
          onClose={() => setSizeGuideCategory(null)}
        />
      )}

      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-bone text-ink px-6 py-3 rounded-full text-xs font-bold shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-2">
          {toast}
        </div>
      )}
      </div>
    </div>
  );
}
