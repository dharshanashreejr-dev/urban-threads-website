import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Eye } from 'lucide-react';
import CoverflowCarousel from '../components/CoverflowCarousel/CoverflowCarousel';
import ScrollStack from '../components/ScrollStack';
import StyleStudioBundler from '../components/StyleStudioBundler';
import DeliveryEstimator from '../components/DeliveryEstimator';
import StoreLocator from '../components/StoreLocator';
import HeroSlider from '../components/HeroSlider';
import QuickViewModal from '../components/QuickViewModal';
import { products, getOffer, type Product } from '../data/products';
import { formatINR } from '../utils/gst';

const carouselProducts = products.filter((p) => p.trending || p.isNew).slice(0, 10);
const carouselImages = carouselProducts.map((p) => ({
  src: p.image,
  alt: p.name,
  title: p.name,
  price: p.price
}));

const categoryTiles = [
  { label: 'Shirts', image: products.find((p) => p.category === 'Shirts')!.image },
  { label: 'T-Shirts', image: products.find((p) => p.category === 'T-Shirts')!.image },
  { label: 'Jeans', image: products.find((p) => p.category === 'Jeans')!.image },
  { label: 'Trousers', image: products.find((p) => p.category === 'Trousers')!.image },
  { label: 'Ethnic', image: products.find((p) => p.category === 'Ethnic')!.image },
  { label: 'Formal', image: products.find((p) => p.category === 'Formal')!.image }
];

const featured = products.slice(0, 8);
const newArrivals = products.filter((p) => p.isNew).slice(0, 4);

const stackCards = [
  {
    id: 's1',
    title: 'Trend-first styles',
    description:
      'Fresh shirt, stretch denim, and ethnic drops every season, priced to give you more style for less without compromising on fabric grade or finish.',
    image: products[5].image
  },
  {
    id: 's2',
    title: 'Verified fit, every time',
    description:
      'Every style is checked against real measurements before it ships, so what you see is exactly what arrives — no surprises at the door.',
    image: products[0].image
  },
  {
    id: 's3',
    title: 'Mohanur, to your doorstep',
    description:
      'Based at 15/8 Velur Road, Mohanur, Namakkal — serving online shoppers, courier consignments, and walk-in customers alike, seven days a week.',
    image: products[7].image
  }
];

function ProductCard({ product, onView }: { product: Product; onView: (p: Product) => void }) {
  const o = getOffer(product);
  return (
    <div className="group bg-panel border border-hairline/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-lux transition-shadow flex flex-col">
      <button
        type="button"
        onClick={() => onView(product)}
        className="relative aspect-[4/5] overflow-hidden bg-charcoal block text-left"
        aria-label={`Quick view ${product.name}`}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-gold text-onGold text-[11px] font-bold px-2.5 py-1 rounded-full">
          {o.pct}% OFF
        </span>
        {product.isNew && (
          <span className="absolute top-3 right-3 bg-bone text-ink text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">
            New
          </span>
        )}
      </button>
      <div className="p-4 flex flex-col gap-1 flex-1">
        <p className="text-[10px] uppercase tracking-widest text-boneDim">{product.category}</p>
        <h3 className="text-bone text-sm font-semibold leading-snug">{product.name}</h3>
        <p className="mt-1">
          <span className="text-gold font-bold text-base">{formatINR(product.price)}</span>{' '}
          <span className="text-boneDim text-xs line-through">{formatINR(o.mrp)}</span>
        </p>
        <button
          type="button"
          onClick={() => onView(product)}
          className="mt-3 lux-btn-primary text-xs font-bold uppercase tracking-wider py-2.5 rounded-full flex items-center justify-center gap-2"
        >
          <ShoppingBag size={14} /> Add to Bag
        </button>
      </div>
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
  const activeCarouselProduct = carouselProducts[activeCarouselIndex];

  return (
    <div className="bg-ink text-bone selection:bg-gold selection:text-onGold relative">
      {/* Hero — auto-scrolling banner slider */}
      <HeroSlider />

      {/* Shop by category */}
      <section className="pt-20 pb-8 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-gold uppercase tracking-[0.3em] text-xs mb-3">Shop by category</p>
          <h2 className="font-display text-4xl sm:text-5xl text-bone tracking-wide">Find your style</h2>
        </div>
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
          {categoryTiles.map((c) => (
            <Link
              key={c.label}
              to="/products"
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] border border-hairline/10 shadow-sm"
            >
              <img
                src={c.image}
                alt={c.label}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <span className="absolute bottom-3 left-0 right-0 text-center text-white text-xs sm:text-sm font-bold uppercase tracking-widest">
                {c.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-10">
          <div>
            <p className="text-gold uppercase tracking-[0.3em] text-xs mb-3">Best sellers</p>
            <h2 className="font-display text-4xl sm:text-5xl text-bone tracking-wide">Featured products</h2>
          </div>
          <Link
            to="/products"
            className="text-xs uppercase tracking-wider text-gold font-bold inline-flex items-center gap-1 hover:underline"
          >
            View all products <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} onView={setQuickView} />
          ))}
        </div>
      </section>

      {/* SWIPE (Trending Items) — Coverflow */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-gold uppercase tracking-[0.3em] text-xs mb-3">Trending this week</p>
          <h2 className="font-display text-5xl text-bone tracking-wide">SWIPE!</h2>
          <p className="text-boneDim text-sm max-w-md mx-auto mt-2">
            Curated menswear staples engineered for Indian weather and everyday luxury.
          </p>
        </div>

        <CoverflowCarousel
          images={carouselImages}
          showPagination
          showNavigation
          loop
          autoplay
          onSlideChange={(index) => setActiveCarouselIndex(index)}
        />

        {activeCarouselProduct && (
          <div className="text-center mt-4">
            <p className="font-display text-2xl text-bone tracking-wide">{activeCarouselProduct.name}</p>
            <p className="text-gold text-sm">₹{activeCarouselProduct.price}</p>
          </div>
        )}
        <p className="text-center text-boneDim text-xs mt-4 uppercase tracking-widest">
          ↔ Drag or swipe to spin the rack
        </p>
      </section>

      {/* New arrivals */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-10">
          <div>
            <p className="text-gold uppercase tracking-[0.3em] text-xs mb-3">Just landed</p>
            <h2 className="font-display text-4xl sm:text-5xl text-bone tracking-wide">New arrivals</h2>
          </div>
          <span className="text-boneDim text-xs inline-flex items-center gap-1">
            <Eye size={14} /> Tap an item for quick view
          </span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {newArrivals.map((p) => (
            <ProductCard key={p.id} product={p} onView={setQuickView} />
          ))}
        </div>
      </section>

      {/* Style Studio & Outfit Bundler */}
      <StyleStudioBundler />

      {/* Why Urban Threads */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-gold uppercase tracking-[0.3em] text-xs mb-3">Why Urban Threads</p>
          <h2 className="font-display text-5xl text-bone tracking-wide">Built on trust</h2>
        </div>
        <ScrollStack cards={stackCards} />
      </section>

      {/* Express Delivery & District Checker */}
      <DeliveryEstimator />

      {/* Store Location & Mohanur Flagship Details */}
      <StoreLocator />

      {/* Strong closing CTA */}
      <section className="relative py-24 px-6 border-t border-hairline/5 overflow-hidden">
        <div className="lux-hero-frame-glow" style={{ inset: '-30% 10%' }} />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl sm:text-5xl text-bone tracking-wide mb-5">
            Ready to shop the collection?
          </h2>
          <p className="text-boneDim text-sm sm:text-base mb-9 max-w-xl mx-auto">
            Browse the full catalogue, or reach out directly for bulk orders.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/products"
              className="lux-btn-primary w-full sm:w-auto font-bold px-9 py-3.5 rounded-full uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-2"
            >
              Shop Collection <ArrowRight size={14} />
            </Link>
            <Link
              to="/wholesale"
              className="lux-btn-outline w-full sm:w-auto font-bold px-9 py-3.5 rounded-full uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-2"
            >
              Bulk Enquiry
            </Link>
          </div>
        </div>
      </section>

      {quickView && (
        <QuickViewModal
          product={quickView}
          onClose={() => setQuickView(null)}
          onNavigateToCart={() => navigate('/cart')}
        />
      )}
    </div>
  );
}
