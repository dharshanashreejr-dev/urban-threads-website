import { Building2, Truck, ShieldCheck } from 'lucide-react';
import WholesaleDesk from '../components/WholesaleDesk';

export default function Wholesale() {
  return (
    <div className="bg-ink text-bone min-h-screen">
      <section className="pt-40 pb-10 px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 mb-5">
          <Building2 size={14} className="text-gold" />
          <span className="text-gold text-xs uppercase tracking-[0.25em] font-semibold">
            B2B &amp; Reseller Hub
          </span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-bone tracking-wide mb-4">
          Wholesale, done right.
        </h1>
        <p className="text-boneDim text-sm sm:text-base max-w-2xl mx-auto">
          Retailers across Tamil Nadu source from Urban Threads for consistent quality, verified fit
          measurements, and fast courier turnaround — priced to keep your margins healthy.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-boneDim font-semibold">
          <div className="flex items-center gap-1.5">
            <Truck size={14} className="text-gold" />
            <span>Fast Tamil Nadu Courier Dispatch</span>
          </div>
          <span className="text-gold/50">•</span>
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-slate-400" />
            <span>Verified Fit &amp; Fabric Grade</span>
          </div>
        </div>
      </section>
      <WholesaleDesk />
    </div>
  );
}
