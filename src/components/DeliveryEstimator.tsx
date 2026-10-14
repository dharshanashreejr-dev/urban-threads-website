import { useState, useEffect } from 'react';
import { Truck, MapPin, Clock, ShieldCheck, CheckCircle2, Search, ArrowRight } from 'lucide-react';

const TN_DISTRICTS = [
  { name: 'Mohanur (Flagship Hub)', time: 'Same Day / Walk-in', pincode: '637015', tag: 'Fastest' },
  { name: 'Coimbatore', time: '18 - 24 Hours', pincode: '641001', tag: 'Direct Express' },
  { name: 'Tirupur', time: '18 - 24 Hours', pincode: '641601', tag: 'Textile Corridor' },
  { name: 'Erode', time: '18 - 24 Hours', pincode: '638001', tag: 'Direct Express' },
  { name: 'Salem', time: '18 - 24 Hours', pincode: '636001', tag: 'Direct Express' },
  { name: 'Trichy (Tiruchirappalli)', time: '18 - 24 Hours', pincode: '620001', tag: 'Direct Express' },
  { name: 'Madurai', time: '24 Hours', pincode: '625001', tag: 'Direct Express' },
  { name: 'Chennai & Suburbs', time: '24 - 36 Hours', pincode: '600001', tag: 'Daily Dispatch' },
  { name: 'Dindigul', time: '24 Hours', pincode: '624001', tag: 'Direct Express' },
  { name: 'Thanjavur', time: '24 Hours', pincode: '613001', tag: 'Daily Dispatch' },
  { name: 'Tirunelveli', time: '24 - 48 Hours', pincode: '627001', tag: 'Daily Dispatch' },
  { name: 'Vellore', time: '24 - 48 Hours', pincode: '632001', tag: 'Daily Dispatch' }
];

export default function DeliveryEstimator() {
  const [selectedDistrict, setSelectedDistrict] = useState(TN_DISTRICTS[0].name);
  const [pincodeInput, setPincodeInput] = useState('');
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [countdown, setCountdown] = useState({ hours: 3, minutes: 42, seconds: 18 });

  // Live countdown timer for same-day dispatch cutoff
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 4, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePincodeSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincodeInput.trim()) return;

    if (pincodeInput.startsWith('639')) {
      setSearchResult('Namakkal District • Same-Day Dispatch from Mohanur Flagship Hub!');
    } else if (pincodeInput.startsWith('6')) {
      setSearchResult(`Tamil Nadu Pincode ${pincodeInput} Verified • Estimated Delivery: 24 to 36 Hours via ST Courier`);
    } else {
      setSearchResult(`All-India Pincode ${pincodeInput} Verified • Estimated Delivery: 3 to 5 Days via Express Air/Surface`);
    }
  };

  const activeData =
    TN_DISTRICTS.find((d) => d.name === selectedDistrict) || TN_DISTRICTS[0];

  return (
    <section className="py-20 px-6 relative bg-ink border-t border-hairline/5">
      <div className="max-w-6xl mx-auto">
        <div className="bg-panel/90 border border-hairline/10 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur relative overflow-hidden">
          {/* Top Banner: Dispatch Countdown */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-8 border-b border-hairline/10 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/30 text-gold flex items-center justify-center shrink-0">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gold font-bold">
                  Today&apos;s Dispatch Cutoff
                </p>
                <h3 className="font-display text-2xl text-bone tracking-wide">
                  Order within next{' '}
                  <span className="text-gold font-mono">
                    {String(countdown.hours).padStart(2, '0')}:
                    {String(countdown.minutes).padStart(2, '0')}:
                    {String(countdown.seconds).padStart(2, '0')}
                  </span>
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-charcoal/80 border border-hairline/10 rounded-full px-5 py-2 text-xs text-boneDim">
              <ShieldCheck size={16} className="text-slate-400" />
              <span>ST Courier • Professional Courier • DTDC</span>
            </div>
          </div>

          {/* Grid: District Estimator & Pincode Checker */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: District Quick Selector */}
            <div className="lg:col-span-7">
              <h4 className="font-display text-xl text-bone tracking-wide mb-2 flex items-center gap-2">
                <MapPin size={18} className="text-gold" />
                Select Your District in Tamil Nadu
              </h4>
              <p className="text-boneDim text-xs mb-6">
                Direct consignments leave Velur Road Mohanur twice every day for maximum speed.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
                {TN_DISTRICTS.slice(0, 9).map((district) => (
                  <button
                    key={district.name}
                    onClick={() => {
                      setSelectedDistrict(district.name);
                      setSearchResult(null);
                    }}
                    className={`p-3 rounded-2xl text-left transition-all border ${
                      selectedDistrict === district.name
                        ? 'bg-gold text-onGold border-gold font-bold shadow-md'
                        : 'bg-charcoal/80 border-hairline/5 text-boneDim hover:text-bone hover:border-gold/30'
                    }`}
                  >
                    <p className="text-xs truncate">{district.name}</p>
                    <p className="text-[10px] opacity-80 mt-0.5 font-mono">{district.time}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Live Result & Pincode Search Box */}
            <div className="lg:col-span-5 bg-charcoal/80 rounded-3xl p-6 border border-hairline/10 flex flex-col justify-between">
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs text-boneDim mb-2">
                  <span className="uppercase tracking-wider font-semibold">Delivery Estimate</span>
                  <span className="bg-slate-950/60 text-slate-300 border border-slate-800/40 text-[10px] px-2.5 py-0.5 rounded-full font-semibold">
                    {activeData.tag}
                  </span>
                </div>
                <h3 className="font-display text-2xl text-bone tracking-wide mb-1">
                  {activeData.name}
                </h3>
                <div className="flex items-center gap-2 text-gold font-mono text-lg font-bold my-2">
                  <Truck size={20} />
                  <span>{activeData.time}</span>
                </div>
                <p className="text-[11px] text-boneDim leading-relaxed">
                  Dispatches directly from 15/8 Velur Road, Mohanur Hub with live SMS / WhatsApp tracking.
                </p>
              </div>

              {/* Pincode Search Form */}
              <form onSubmit={handlePincodeSearch} className="pt-4 border-t border-hairline/10">
                <label className="block text-[11px] uppercase tracking-wider text-boneDim mb-2">
                  Check Exact Pincode
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincodeInput}
                    onChange={(e) => setPincodeInput(e.target.value)}
                    placeholder="e.g. 637015 or 641001"
                    className="flex-1 bg-ink border border-hairline/10 rounded-xl px-4 py-2 text-xs text-bone font-mono placeholder:text-boneDim focus:outline-none focus:border-gold/50"
                  />
                  <button
                    type="submit"
                    className="bg-gold hover:bg-goldDeep text-onGold px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow"
                  >
                    Check
                  </button>
                </div>
                {searchResult && (
                  <p className="mt-3 text-xs text-slate-400 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/30 flex items-start gap-2">
                    <CheckCircle2 size={14} className="shrink-0 mt-0.5" />
                    <span>{searchResult}</span>
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
