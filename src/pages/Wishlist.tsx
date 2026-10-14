import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, Eye, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/gst';
import QuickViewModal from '../components/QuickViewModal';
import { Product } from '../data/products';

export default function Wishlist() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<string | null>(null);

  const handleAddToCart = (product: Product) => {
    const size = selectedSizes[product.id] || product.sizes[0];
    addToCart(product, size, 1);
    setToast(`Added ${product.name} (${size}) to your bag`);
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <div className="bg-ink min-h-screen px-6 py-14 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <p className="text-gold uppercase tracking-[0.3em] text-xs mb-2">Saved Outfits</p>
          <h1 className="font-display text-4xl sm:text-5xl text-bone tracking-wide">
            Your Wishlist ({wishlist.length})
          </h1>
        </div>

        {wishlist.length > 0 && (
          <button
            onClick={clearWishlist}
            className="text-xs text-boneDim hover:text-rust transition-colors uppercase tracking-wider flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Trash2 size={14} /> Clear Wishlist
          </button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="bg-panel border border-hairline/5 rounded-3xl p-16 text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-charcoal flex items-center justify-center mx-auto mb-4 text-boneDim">
            <Heart size={28} />
          </div>
          <h2 className="font-display text-2xl text-bone tracking-wide mb-2">
            Your Wishlist is Empty
          </h2>
          <p className="text-boneDim text-xs mb-8">
            Explore our latest drop of shirts, denims, and ethnic wear to curate your favorite styles.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-gold hover:bg-goldDeep text-onGold font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition-colors shadow-lg shadow-gold/20"
          >
            Browse Catalogue <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="bg-panel rounded-2xl overflow-hidden border border-hairline/5 hover:border-gold/30 transition-all duration-300 flex flex-col justify-between group shadow-lg"
            >
              <div className="relative h-64 overflow-hidden bg-charcoal">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-ink/70 backdrop-blur text-pink-500 flex items-center justify-center hover:bg-ink transition-colors shadow"
                  aria-label="Remove from Wishlist"
                >
                  <Trash2 size={14} />
                </button>
                <button
                  onClick={() => setQuickViewProduct(product)}
                  className="absolute bottom-3 right-3 bg-ink/80 backdrop-blur text-bone text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 hover:bg-ink opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Eye size={13} className="text-gold" /> Quick View
                </button>
              </div>

              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-gold text-[10px] uppercase tracking-wider font-semibold">
                    {product.category}
                  </span>
                  <h3 className="font-display text-xl text-bone tracking-wide mb-1">
                    {product.name}
                  </h3>
                  <p className="text-boneDim text-xs mb-3">{product.color}</p>
                  <p className="text-gold font-bold text-lg mb-4">{formatINR(product.price)}</p>

                  {/* Size Selector */}
                  <div className="mb-4">
                    <p className="text-boneDim text-[11px] uppercase tracking-wider mb-2">Size</p>
                    <div className="flex flex-wrap gap-1.5">
                      {product.sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSizes((prev) => ({ ...prev, [product.id]: s }))}
                          className={`w-8 h-8 rounded-lg text-xs font-bold border transition-colors ${
                            (selectedSizes[product.id] || product.sizes[0]) === s
                              ? 'bg-gold text-onGold border-gold'
                              : 'bg-charcoal border-hairline/10 text-boneDim hover:border-gold/40'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-hairline/5 flex gap-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-gold hover:bg-goldDeep text-onGold font-bold py-2.5 rounded-full text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag size={14} /> Move to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onNavigateToCart={() => navigate('/cart')}
        />
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-bone text-ink px-6 py-3 rounded-full text-xs font-bold shadow-2xl z-50">
          {toast}
        </div>
      )}
    </div>
  );
}
