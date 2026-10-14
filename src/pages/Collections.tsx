import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { products } from '../data/products';
import FlipProductGallery from '../components/FlipProductGallery/FlipProductGallery';

type Tab = 'trending' | 'new';

export default function Collections() {
  const [tab, setTab] = useState<Tab>('trending');
  const navigate = useNavigate();

  const trending = useMemo(() => products.filter((p) => p.trending), []);
  const latest = useMemo(() => products.filter((p) => p.isNew), []);
  const list = tab === 'trending' ? trending : latest;

  return (
    <div className="bg-ink min-h-screen">
      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-8 text-center">
        <div className="inline-flex items-center gap-1.5 text-gold text-xs uppercase tracking-[0.3em] font-semibold mb-3">
          <Sparkles size={13} />
          <span>Curated Showcase</span>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl text-bone tracking-wide mb-3">
          Latest &amp; Trending Collections
        </h1>
        <p className="text-boneDim text-sm max-w-xl mx-auto">
          Tap a piece to expand — flip animation, full detail, then shop the catalogue.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-3 mb-8">
        <button
          onClick={() => setTab('trending')}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
            tab === 'trending'
              ? 'bg-gold text-onGold shadow-lg shadow-gold/20'
              : 'bg-panel border border-hairline/10 text-boneDim hover:text-bone hover:border-gold/40'
          }`}
        >
          <TrendingUp size={14} /> Trending Now
          <span className="opacity-70 text-[10px]">({trending.length})</span>
        </button>
        <button
          onClick={() => setTab('new')}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
            tab === 'new'
              ? 'bg-gold text-onGold shadow-lg shadow-gold/20'
              : 'bg-panel border border-hairline/10 text-boneDim hover:text-bone hover:border-gold/40'
          }`}
        >
          <Clock size={14} /> New Arrivals
          <span className="opacity-70 text-[10px]">({latest.length})</span>
        </button>
      </div>

      {/* GSAP Flip gallery — separate list per tab */}
      <FlipProductGallery key={tab} products={list} />

      <div className="text-center pb-20">
        <button
          onClick={() => navigate('/products')}
          className="inline-flex items-center gap-2 text-gold hover:text-goldDeep text-xs font-bold uppercase tracking-widest border-b border-gold/40 pb-1 transition-colors"
        >
          View Full Shopping Page <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
