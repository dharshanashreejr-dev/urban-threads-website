import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Instagram,
  MessageCircle,
  Star,
  ExternalLink,
  ShieldCheck,
  Truck,
  Heart
} from 'lucide-react';
import logo from '../assets/logo.png';
import { STORE_GOOGLE_METADATA } from '../data/googleReviews';

export default function Footer() {
  return (
    <footer className="bg-charcoal border-t border-hairline/10 text-bone pt-16 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-hairline/10">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={logo} alt="Urban Threads" className="w-12 h-12 rounded-full object-cover shadow" />
                <div>
                  <span className="font-display text-3xl tracking-widest text-bone">
                    URBAN<span className="text-gold">THREADS</span>
                  </span>
                  <p className="text-gold text-[10px] uppercase tracking-[0.25em]">
                    Mohanur, Tamil Nadu
                  </p>
                </div>
              </div>

              <p className="text-boneDim text-xs sm:text-sm leading-relaxed mb-6">
                Supplying trend-first men’s fashion across Tamil Nadu at direct wholesale and retail pricing. Known for dependable quality, friendly service, and fast daily courier dispatch.
              </p>

              {/* Google Verified Mini Badge */}
              <div className="bg-ink/80 border border-hairline/10 rounded-2xl p-3.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow">
                    <span className="font-bold text-blue-600 text-sm">G</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-gold font-bold text-xs">3.8</span>
                      <div className="flex text-gold">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            size={10}
                            className={s <= 4 ? 'fill-gold text-gold' : 'fill-hairline/10 text-hairline/30'}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-[10px] text-boneDim">18 Google Reviews</span>
                  </div>
                </div>
                <a
                  href={STORE_GOOGLE_METADATA.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-gold hover:underline flex items-center gap-1 font-semibold"
                >
                  View <ExternalLink size={10} />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-display text-xl text-bone tracking-wide mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-xs text-boneDim uppercase tracking-wider">
              <li>
                <Link to="/" className="hover:text-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-gold transition-colors">
                  Full Catalogue
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="hover:text-gold transition-colors text-gold">
                  Track Order 🚚
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-gold transition-colors">
                  Saved Outfits ❤️
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-gold transition-colors">
                  Google Reviews
                </Link>
              </li>
              <li>
                <Link to="/wholesale" className="hover:text-gold transition-colors">
                  Wholesale Desk
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-gold transition-colors text-slate-300">
                  Admin Portal 🛡️
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Product Categories */}
          <div className="lg:col-span-3">
            <h4 className="font-display text-xl text-bone tracking-wide mb-4">Categories</h4>
            <ul className="space-y-2.5 text-xs text-boneDim">
              <li>
                <Link to="/products" className="hover:text-gold transition-colors">
                  Slim Fit Cotton Shirts
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-gold transition-colors">
                  Pique Polo &amp; Round Neck Tees
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-gold transition-colors">
                  Stretch Denim Jeans (Tapered &amp; Straight)
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-gold transition-colors">
                  Formal Straight Fit Trousers
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-gold transition-colors">
                  Festive Kurta &amp; Ethnic Combos
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Store Contact & Hours */}
          <div className="lg:col-span-3">
            <h4 className="font-display text-xl text-bone tracking-wide mb-4">Mohanur Flagship</h4>
            <div className="space-y-3 text-xs text-boneDim">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-gold shrink-0 mt-0.5" />
                <span>
                  15/8 Velur Road, Mohanur, Namakkal – 637015
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-gold shrink-0" />
                <a href="tel:+919876543210" className="hover:text-gold transition-colors">
                  +91 98765 43210
                </a>
              </div>
              <div className="pt-2 flex items-center gap-3">
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-panel border border-hairline/10 flex items-center justify-center text-pink-400 hover:bg-pink-600 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={15} />
                </a>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-panel border border-hairline/10 flex items-center justify-center text-slate-400 hover:bg-slate-600 hover:text-white transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={15} />
                </a>
                <a
                  href={STORE_GOOGLE_METADATA.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-panel border border-hairline/10 flex items-center justify-center text-gold hover:bg-gold hover:text-onGold transition-colors"
                  aria-label="Google Maps"
                >
                  <MapPin size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-boneDim/70 gap-4">
          <p>© {new Date().getFullYear()} Urban Threads. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/admin/login" className="hover:text-gold transition-colors">
              Admin Portal
            </Link>
            <span>•</span>
            <span className="text-gold">15/8 Velur Road, Mohanur</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
