import { useState } from 'react';
import {
  Briefcase,
  TrendingUp,
  Truck,
  CheckCircle2,
  MessageCircle,
  FileText,
  Calculator,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { formatINR } from '../utils/gst';

export default function WholesaleDesk() {
  const [shopName, setShopName] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryInterest, setCategoryInterest] = useState('All Men’s Wear Mix');
  const [quantityPcs, setQuantityPcs] = useState(50);

  // Profit calculation metrics
  const avgWholesalePricePerPc = 420;
  const avgRetailMarketPricePerPc = 799;
  const totalWholesaleInvestment = quantityPcs * avgWholesalePricePerPc;
  const totalRetailRevenue = quantityPcs * avgRetailMarketPricePerPc;
  const estimatedShopProfit = totalRetailRevenue - totalWholesaleInvestment;
  const marginPercentage = Math.round((estimatedShopProfit / totalRetailRevenue) * 100);

  const handleWholesaleWhatsAppInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hello Urban Threads Wholesale Desk,\n\nI would like to inquire about wholesale stock supply for my retail business.\n\n• Shop/Business Name: ${shopName || 'Retail Store'}\n• Location: ${city || 'Tamil Nadu'}\n• Contact Phone: ${phone || 'N/A'}\n• Category Interest: ${categoryInterest}\n• Estimated Initial MOQ: ${quantityPcs} Pieces\n\nPlease share your latest wholesale catalogue & price list.`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="wholesale" className="py-24 px-6 bg-ink relative border-t border-hairline/5">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 mb-3">
            <Building2 size={14} className="text-gold" />
            <span className="text-gold text-xs uppercase tracking-[0.25em] font-semibold">
              B2B &amp; Reseller Hub
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-bone tracking-wide">
            Wholesale &amp; Retail Sourcing
          </h2>
          <p className="text-boneDim text-sm sm:text-base max-w-2xl mx-auto mt-2">
            Supplying over 200+ clothing stores, boutiques, and resellers across Tamil Nadu directly from our Mohanur manufacturing hub.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-panel border border-hairline/10 rounded-2xl p-6 relative overflow-hidden group hover:border-gold/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold mb-4">
              <TrendingUp size={24} />
            </div>
            <h3 className="font-display text-2xl text-bone tracking-wide mb-2">
              40% to 55% Profit Margins
            </h3>
            <p className="text-boneDim text-xs leading-relaxed">
              Source directly from Mohanur textile district at ground wholesale rates. Maximize your shop’s profit margins on everyday shirts, denims, and festive kurtas.
            </p>
          </div>

          <div className="bg-panel border border-hairline/10 rounded-2xl p-6 relative overflow-hidden group hover:border-gold/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold mb-4">
              <Truck size={24} />
            </div>
            <h3 className="font-display text-2xl text-bone tracking-wide mb-2">
              Daily Parcel Dispatch
            </h3>
            <p className="text-boneDim text-xs leading-relaxed">
              Fast door delivery via ST Courier, Professional, and transport lorries across Erode, Tirupur, Salem, Coimbatore, Madurai, Trichy, Theni &amp; Chennai.
            </p>
          </div>

          <div className="bg-panel border border-hairline/10 rounded-2xl p-6 relative overflow-hidden group hover:border-gold/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold mb-4">
              <Briefcase size={24} />
            </div>
            <h3 className="font-display text-2xl text-bone tracking-wide mb-2">
              Low MOQ (From 10 Pieces)
            </h3>
            <p className="text-boneDim text-xs leading-relaxed">
              Flexible minimum order quantities with mix-and-match sizes (S to XXL) and trend designs so you never get stuck with dead stock.
            </p>
          </div>
        </div>

        {/* Wholesale Calculator & Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Profit Estimator Calculator */}
          <div className="lg:col-span-6 bg-charcoal border border-hairline/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calculator size={18} className="text-gold" />
                <h3 className="font-display text-2xl text-bone tracking-wide">
                  Wholesale Margin Calculator
                </h3>
              </div>
              <p className="text-boneDim text-xs mb-6">
                Slide to estimate your retail turnover and net profits with Urban Threads wholesale pricing:
              </p>

              {/* Slider */}
              <div className="mb-8">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-boneDim">Stock Order Quantity:</span>
                  <span className="text-gold font-bold font-mono text-sm">{quantityPcs} Pieces</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={quantityPcs}
                  onChange={(e) => setQuantityPcs(Number(e.target.value))}
                  className="w-full accent-gold h-2 bg-ink rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-boneDim/60 mt-1">
                  <span>10 Pcs (Starter)</span>
                  <span>100 Pcs (Shop Standard)</span>
                  <span>500 Pcs (Super Stockist)</span>
                </div>
              </div>

              {/* Metrics Breakdown */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-panel p-4 rounded-xl border border-hairline/5">
                  <span className="text-[11px] text-boneDim block">Your Sourcing Cost</span>
                  <span className="font-display text-2xl text-bone">{formatINR(totalWholesaleInvestment)}</span>
                  <span className="text-[10px] text-boneDim/70 block">~₹{avgWholesalePricePerPc}/pc wholesale</span>
                </div>

                <div className="bg-panel p-4 rounded-xl border border-hairline/5">
                  <span className="text-[11px] text-boneDim block">Estimated Retail Sales</span>
                  <span className="font-display text-2xl text-gold">{formatINR(totalRetailRevenue)}</span>
                  <span className="text-[10px] text-boneDim/70 block">~₹{avgRetailMarketPricePerPc}/pc market MRP</span>
                </div>
              </div>
            </div>

            {/* Profit Callout */}
            <div className="bg-panel border border-gold/30 p-5 rounded-2xl shadow-md">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <span className="text-[11px] text-boneDim font-semibold uppercase tracking-wider block">
                    Estimated Net Profit:
                  </span>
                  <span className="font-display text-3xl text-gold font-bold">
                    +{formatINR(estimatedShopProfit)}
                  </span>
                </div>
                <span className="bg-gold text-onGold text-xs font-bold px-3.5 py-1.5 rounded-full border border-gold shadow-sm whitespace-nowrap">
                  {marginPercentage}% Return
                </span>
              </div>
            </div>
          </div>

          {/* Right: Quick Wholesale Inquiry Form */}
          <div className="lg:col-span-6 bg-panel border border-hairline/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
            <form onSubmit={handleWholesaleWhatsAppInquiry}>
              <div className="flex items-center gap-2 mb-2">
                <FileText size={18} className="text-gold" />
                <h3 className="font-display text-2xl text-bone tracking-wide">
                  Request Wholesale Catalogue
                </h3>
              </div>
              <p className="text-boneDim text-xs mb-6">
                Receive our latest wholesale PDF catalog, rate card, and video samples on WhatsApp:
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-boneDim mb-1">
                    Shop / Reseller Name
                  </label>
                  <input
                    required
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    placeholder="e.g. Sri Balaji Menswear"
                    className="w-full bg-charcoal border border-hairline/10 rounded-xl px-4 py-2.5 text-xs text-bone placeholder:text-boneDim focus:outline-none focus:border-gold/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-boneDim mb-1">
                      City / District (TN)
                    </label>
                    <input
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Coimbatore / Salem"
                      className="w-full bg-charcoal border border-hairline/10 rounded-xl px-4 py-2.5 text-xs text-bone placeholder:text-boneDim focus:outline-none focus:border-gold/50"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-boneDim mb-1">
                      WhatsApp Number
                    </label>
                    <input
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 98421 XXXXX"
                      className="w-full bg-charcoal border border-hairline/10 rounded-xl px-4 py-2.5 text-xs text-bone placeholder:text-boneDim focus:outline-none focus:border-gold/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-boneDim mb-1">
                    Category Focus
                  </label>
                  <select
                    value={categoryInterest}
                    onChange={(e) => setCategoryInterest(e.target.value)}
                    className="w-full bg-charcoal border border-hairline/10 rounded-xl px-4 py-2.5 text-xs text-bone focus:outline-none focus:border-gold/50"
                  >
                    <option value="All Men’s Wear Mix">All Men’s Wear Mix (Shirts, Jeans, Tees)</option>
                    <option value="Cotton Slim Fit Shirts">Cotton Slim Fit &amp; Casual Shirts</option>
                    <option value="Stretch Denim Jeans & Trousers">Stretch Denim Jeans &amp; Trousers</option>
                    <option value="Festive Ethnic Kurta Sets">Festive Ethnic Kurta Sets</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gold hover:bg-goldDeep text-onGold font-bold py-3.5 rounded-full text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg shadow-gold/20"
              >
                <MessageCircle size={16} /> Request Wholesale Rates on WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
