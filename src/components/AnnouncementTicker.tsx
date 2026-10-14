import { Sparkles, Truck, Phone, Star } from 'lucide-react';

export default function AnnouncementTicker() {
  const announcements = [
    {
      icon: Truck,
      text: 'FREE Express Delivery across Tamil Nadu on orders above ₹999'
    },
    {
      icon: Sparkles,
      text: 'New Season Trend Drop Every Wednesday • Mohanur Studio'
    },
    {
      icon: Star,
      text: '4.7★ Customer Rating • Visit us at 15/8 Velur Road, Mohanur, Namakkal'
    },
    {
      icon: Phone,
      text: 'Call / WhatsApp us: +91 98765 43210 (Daily Dispatch)'
    }
  ];

  return (
    <div className="bg-gradient-to-r from-slate-950 via-charcoal to-slate-950 border-b border-gold/20 text-bone text-[11px] font-medium overflow-hidden py-2 select-none">
      <div className="flex w-fit animate-marquee whitespace-nowrap gap-12 items-center">
        {[...announcements, ...announcements].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-2 tracking-wider">
              <Icon size={12} className="text-gold shrink-0" />
              <span>{item.text}</span>
              <span className="text-gold/40 ml-6">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
