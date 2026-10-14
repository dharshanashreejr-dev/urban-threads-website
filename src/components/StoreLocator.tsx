import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Navigation,
  CheckCircle2,
  Car,
  CreditCard,
  Shirt
} from 'lucide-react';
import { STORE_GOOGLE_METADATA } from '../data/googleReviews';

export default function StoreLocator() {
  return (
    <section id="store-location" className="py-24 px-6 bg-charcoal/60 relative border-t border-hairline/5">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <p className="text-gold uppercase tracking-[0.3em] text-xs mb-2">Visit Our Flagship Store</p>
          <h2 className="font-display text-4xl sm:text-5xl text-bone tracking-wide">
            Urban Threads • Mohanur
          </h2>
          <p className="text-boneDim text-sm sm:text-base max-w-xl mx-auto mt-2">
            Experience our full collection in person at Velur Road, Mohanur. Walk-in shoppers and retail store buyers are always welcome.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Location & Contact Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="bg-panel border border-hairline/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-display text-2xl text-bone tracking-wide">
                    Mohanur Flagship Store
                  </h3>
                  <p className="text-boneDim text-xs sm:text-sm mt-1 leading-relaxed">
                    {STORE_GOOGLE_METADATA.fullAddress}
                  </p>
                  <p className="text-gold text-xs font-semibold mt-1">
                   
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="border-t border-hairline/5 pt-4 mb-6 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-bone">
                  <Clock size={15} className="text-gold" />
                  <span className="font-semibold">Store Business Hours:</span>
                </div>
                <div className="flex justify-between text-boneDim pl-6">
                  <span>Monday – Saturday:</span>
                  <span className="text-bone font-mono">09:30 AM – 09:30 PM</span>
                </div>
                <div className="flex justify-between text-boneDim pl-6">
                  <span>Sunday:</span>
                  <span className="text-bone font-mono">10:00 AM – 08:30 PM</span>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href="tel:+919876543210"
                  className="bg-charcoal hover:bg-charcoal/80 border border-hairline/10 text-bone text-xs font-bold py-3 rounded-full flex items-center justify-center gap-1.5 transition-colors uppercase tracking-wider"
                >
                  <Phone size={13} className="text-gold" /> Call Store
                </a>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-gold hover:bg-goldDeep text-onGold text-xs font-bold py-3 rounded-full flex items-center justify-center gap-1.5 transition-colors uppercase tracking-wider shadow-lg shadow-gold/20"
                >
                  <MessageCircle size={14} /> WhatsApp
                </a>
              </div>
            </div>

            {/* In-Store Amenities */}
            <div className="grid grid-cols-2 gap-3 bg-panel border border-hairline/5 rounded-2xl p-4 text-xs text-boneDim">
              <div className="flex items-center gap-2">
                <Shirt size={15} className="text-gold shrink-0" />
                <span>Trial Rooms Available</span>
              </div>
              <div className="flex items-center gap-2">
                <Car size={15} className="text-gold shrink-0" />
                <span>Bike &amp; Car Parking</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard size={15} className="text-gold shrink-0" />
                <span>UPI / Cash Accepted</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-slate-400 shrink-0" />
                <span>Wholesale Billing</span>
              </div>
            </div>
          </div>

          {/* Right: Interactive Map Frame & Visual Storefront */}
          <div className="lg:col-span-7 bg-panel border border-hairline/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl overflow-hidden relative">
            <div className="rounded-2xl overflow-hidden aspect-[16/9] w-full border border-hairline/10 relative bg-charcoal group mb-6">
              {/* Google Maps Visual Embed iframe / fallback */}
              <iframe
                title="Urban Threads Mohanur Location Map"
                src="https://maps.google.com/maps?q=15%2F8%20Velur%20Road%2C%20Mohanur%2C%20Namakkal%2C%20Tamil%20Nadu%20637015&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter grayscale-[40%] contrast-125 group-hover:grayscale-0 transition-all duration-500"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 bg-ink/80 backdrop-blur border border-hairline/10 px-3 py-1.5 rounded-full text-xs text-bone font-medium flex items-center gap-1.5 shadow">
                <MapPin size={13} className="text-gold" /> Velur Road
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-bone font-semibold text-sm">Need help with directions?</p>
                <p className="text-boneDim text-xs">
                  Located right on Velur Road, easily accessible from Mohanur Bus Stand &amp; Railway Station.
                </p>
              </div>

              <a
                href={STORE_GOOGLE_METADATA.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-gold hover:bg-goldDeep text-onGold font-bold px-6 py-3 rounded-full text-xs uppercase tracking-wider transition-colors shadow-lg shadow-gold/20 shrink-0"
              >
                <Navigation size={14} /> Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
