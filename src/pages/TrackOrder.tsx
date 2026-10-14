import { imageForItemName } from '../data/products';
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  Package,
  CheckCircle2,
  Clock,
  Truck,
  MapPin,
  MessageCircle,
  Calendar,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  Box,
  PackageCheck
} from 'lucide-react';
import { getOrders, Order } from '../utils/ordersStore';
import { formatINR } from '../utils/gst';

interface TrackedOrderDetails extends Order {
  courierName: string;
  trackingNumber: string;
  estimatedDelivery: string;
  currentStepIndex: number; // 0 to 4
  timeline: { title: string; time: string; location: string; done: boolean }[];
}

const SAMPLE_ORDERS: TrackedOrderDetails[] = [
  {
    id: 'UTH-849201',
    customerName: 'Arun Prakash',
    customerPhone: '98421 55670',
    items: [
      { name: 'Charcoal Slim Fit Shirt', size: 'L', qty: 2, price: 799 },
      { name: 'Slim Taper Denim Jeans', size: '32', qty: 1, price: 1099 }
    ],
    subtotal: 2697,
    gstAmount: 135,
    total: 2832,
    status: 'Dispatched',
    placedAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    courierName: 'ST Courier Tamil Nadu Express',
    trackingNumber: 'STC-TN-8942109',
    estimatedDelivery: 'Tomorrow by 4:00 PM (Theni Hub)',
    currentStepIndex: 2,
    timeline: [
      {
        title: 'Order Received & Verified',
        time: 'Yesterday, 10:30 AM',
        location: 'Urban Threads Velur Road, Mohanur',
        done: true
      },
      {
        title: 'Quality Check & Packing Completed',
        time: 'Yesterday, 03:15 PM',
        location: 'Mohanur Dispatch Center',
        done: true
      },
      {
        title: 'Handed to Courier Hub',
        time: 'Today, 09:00 AM',
        location: 'Mohanur Central ST Courier Hub',
        done: true
      },
      {
        title: 'In Transit to Theni Delivery Center',
        time: 'Expected Tomorrow Morning',
        location: 'Theni Main Hub',
        done: false
      },
      {
        title: 'Delivered to Customer',
        time: 'Estimated Tomorrow 04:00 PM',
        location: 'Customer Address',
        done: false
      }
    ]
  },
  {
    id: 'UTH-912304',
    customerName: 'K. Senthil Kumar',
    customerPhone: '97890 12345',
    items: [
      { name: 'Ivory Kurta Set', size: 'XL', qty: 1, price: 1299 }
    ],
    subtotal: 1299,
    gstAmount: 65,
    total: 1364,
    status: 'Delivered',
    placedAt: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
    courierName: 'The Professional Courier',
    trackingNumber: 'TPC-KRR-440219',
    estimatedDelivery: 'Delivered Successfully',
    currentStepIndex: 4,
    timeline: [
      {
        title: 'Order Received & Confirmed',
        time: '3 days ago',
        location: 'Urban Threads, Mohanur',
        done: true
      },
      {
        title: 'Packed & Dispatched',
        time: '2 days ago',
        location: 'Mohanur Store',
        done: true
      },
      {
        title: 'Arrived at Destination Hub',
        time: 'Yesterday, 08:30 AM',
        location: 'Coimbatore RS Puram Hub',
        done: true
      },
      {
        title: 'Out for Delivery',
        time: 'Yesterday, 11:00 AM',
        location: 'Delivery Agent Assigned',
        done: true
      },
      {
        title: 'Delivered to Customer',
        time: 'Yesterday, 02:45 PM',
        location: 'Coimbatore, Tamil Nadu',
        done: true
      }
    ]
  }
];

export default function TrackOrder() {
  const [searchParams] = useSearchParams();
  const initialId = searchParams.get('id') || '';
  const [query, setQuery] = useState(initialId);
  const [foundOrder, setFoundOrder] = useState<TrackedOrderDetails | null>(null);
  const [searched, setSearched] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyTracking = (trackingNumber: string) => {
    navigator.clipboard.writeText(trackingNumber).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  function packagingStatusMeta(status?: Order['packagingStatus']) {
    switch (status) {
      case 'Packed':
        return {
          label: 'Packed',
          icon: Box,
          className: 'bg-blue-950/60 text-blue-300 border-blue-800/40'
        };
      case 'Handed to Courier':
        return {
          label: 'Handed to Courier',
          icon: PackageCheck,
          className: 'bg-slate-950/60 text-slate-300 border-slate-800/40'
        };
      default:
        return {
          label: 'Packing Pending',
          icon: Clock,
          className: 'bg-slate-950/60 text-slate-300 border-slate-800/40'
        };
    }
  }

  useEffect(() => {
    if (initialId) {
      handleSearch(initialId);
    }
  }, [initialId]);

  const handleSearch = (searchVal?: string) => {
    const q = (searchVal || query).trim().toUpperCase();
    if (!q) return;

    setSearched(true);
    const storeOrders = getOrders();

    // Check in local storage orders
    const localMatch = storeOrders.find(
      (o) => o.id.toUpperCase() === q || o.customerPhone.includes(q)
    );

    if (localMatch) {
      let stepIndex = 1;
      if (localMatch.status === 'Confirmed') stepIndex = 1;
      else if (localMatch.status === 'Dispatched') stepIndex = 2;
      else if (localMatch.status === 'Delivered') stepIndex = 4;

      const fullOrder: TrackedOrderDetails = {
        ...localMatch,
        courierName: 'ST Courier Tamil Nadu',
        trackingNumber: `STC-${localMatch.id}`,
        estimatedDelivery:
          localMatch.status === 'Delivered'
            ? 'Delivered'
            : 'Estimated 24-48 Hours across Tamil Nadu',
        currentStepIndex: stepIndex,
        timeline: [
          {
            title: 'Order Placed via WhatsApp / Storefront',
            time: new Date(localMatch.placedAt).toLocaleString('en-IN'),
            location: 'Urban Threads Mohanur',
            done: true
          },
          {
            title: 'Packed & Quality Verified',
            time:
              localMatch.packagingStatus === 'Handed to Courier' || localMatch.packagingStatus === 'Packed'
                ? 'Completed'
                : 'In Progress',
            location: 'Mohanur Hub',
            done:
              localMatch.packagingStatus === 'Handed to Courier' || localMatch.packagingStatus === 'Packed'
          },
          {
            title: 'Dispatched via Courier',
            time:
              localMatch.status === 'Dispatched' || localMatch.status === 'Delivered'
                ? 'Handed to Courier'
                : 'Pending',
            location: 'Mohanur Hub',
            done: localMatch.status === 'Dispatched' || localMatch.status === 'Delivered'
          },
          {
            title: 'Out for Delivery in Destination City',
            time: localMatch.status === 'Delivered' ? 'Completed' : 'Scheduled',
            location: 'Local Delivery Hub',
            done: localMatch.status === 'Delivered'
          },
          {
            title: 'Order Delivered',
            time: localMatch.status === 'Delivered' ? 'Completed' : 'Pending Delivery',
            location: 'Customer Address',
            done: localMatch.status === 'Delivered'
          }
        ]
      };
      setFoundOrder(fullOrder);
      return;
    }

    // Check sample orders
    const sampleMatch = SAMPLE_ORDERS.find(
      (o) => o.id.toUpperCase() === q || o.customerPhone.replace(/\s+/g, '').includes(q.replace(/\s+/g, ''))
    );

    if (sampleMatch) {
      setFoundOrder(sampleMatch);
    } else {
      setFoundOrder(null);
    }
  };

  const steps = [
    'Order Placed',
    'Packed at Store',
    'Dispatched',
    'Out for Delivery',
    'Delivered'
  ];

  return (
    <div className="bg-ink min-h-screen px-6 py-14 max-w-5xl mx-auto">
      {/* Title */}
      <div className="text-center mb-10">
        <p className="text-gold uppercase tracking-[0.3em] text-xs mb-2">Live Courier Tracking</p>
        <h1 className="font-display text-4xl sm:text-5xl text-bone tracking-wide">
          Track Your Order
        </h1>
        <p className="text-boneDim text-sm max-w-lg mx-auto mt-2">
          Enter your Order ID (e.g. <strong className="text-gold">UTH-849201</strong>) or registered phone number to view live dispatch status from our Mohanur store.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="max-w-xl mx-auto mb-12">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex gap-2"
        >
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-boneDim" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. UTH-849201 or 9842155670"
              className="w-full bg-panel border border-hairline/10 rounded-full pl-12 pr-4 py-3.5 text-sm text-bone placeholder:text-boneDim focus:outline-none focus:border-gold/50 shadow-lg"
            />
          </div>
          <button
            type="submit"
            className="bg-gold hover:bg-goldDeep text-onGold font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition-colors shadow-lg shadow-gold/20"
          >
            Track
          </button>
        </form>

        {/* Quick Demo Buttons */}
        <div className="flex items-center justify-center gap-2 mt-3 text-xs text-boneDim flex-wrap">
          <span>Try demo tracking:</span>
          {SAMPLE_ORDERS.map((sample) => (
            <button
              key={sample.id}
              onClick={() => {
                setQuery(sample.id);
                handleSearch(sample.id);
              }}
              className="text-gold hover:underline font-mono bg-charcoal px-2.5 py-1 rounded-full border border-hairline/5 text-[11px]"
            >
              {sample.id} ({sample.status})
            </button>
          ))}
        </div>
      </div>

      {/* Results Section */}
      {foundOrder ? (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-300">
          {/* Header Card */}
          <div className="bg-panel border border-hairline/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline/10 pb-6 mb-6">
              <div>
                <span className="text-gold text-xs uppercase tracking-widest font-semibold">
                  Order Details
                </span>
                <h2 className="font-display text-3xl text-bone tracking-wide mt-0.5">
                  {foundOrder.id}
                </h2>
                <p className="text-boneDim text-xs mt-1">
                  Placed for <strong className="text-bone">{foundOrder.customerName}</strong> ({foundOrder.customerPhone})
                </p>
              </div>

              <div className="sm:text-right">
                <span
                  className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs uppercase font-bold tracking-wider ${
                    foundOrder.status === 'Delivered'
                      ? 'bg-slate-950/60 text-slate-400 border border-slate-800/40'
                      : foundOrder.status === 'Dispatched'
                      ? 'bg-slate-950/60 text-slate-400 border border-slate-800/40'
                      : 'bg-gold/20 text-gold border border-gold/40'
                  }`}
                >
                  <Package size={14} />
                  Status: {foundOrder.status}
                </span>
                <p className="text-boneDim text-xs mt-2 font-mono">
                  {foundOrder.estimatedDelivery}
                </p>
                {foundOrder.status !== 'Delivered' && foundOrder.status !== 'Cancelled' && (
                  <div className="mt-2 flex sm:justify-end">
                    {(() => {
                      const meta = packagingStatusMeta(foundOrder.packagingStatus);
                      const Icon = meta.icon;
                      return (
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider border ${meta.className}`}
                        >
                          <Icon size={12} /> {meta.label}
                        </span>
                      );
                    })()}
                  </div>
                )}
              </div>
            </div>

            {/* Visual Step Progress Bar */}
            <div className="my-8">
              <div className="relative flex items-center justify-between">
                {/* Connecting Line */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-hairline/10 w-full z-0" />
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gold transition-all duration-700 z-0"
                  style={{
                    width: `${(foundOrder.currentStepIndex / (steps.length - 1)) * 100}%`
                  }}
                />

                {/* Step Icons */}
                {steps.map((step, idx) => {
                  const isDone = idx <= foundOrder.currentStepIndex;
                  const isCurrent = idx === foundOrder.currentStepIndex;

                  return (
                    <div
                      key={step}
                      className="relative z-10 flex flex-col items-center text-center"
                    >
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          isDone
                            ? 'bg-gold text-onGold shadow-lg shadow-gold/30'
                            : 'bg-charcoal border border-hairline/20 text-boneDim'
                        } ${isCurrent ? 'ring-4 ring-gold/20 scale-110' : ''}`}
                      >
                        {isDone ? <CheckCircle2 size={16} /> : idx + 1}
                      </div>
                      <span
                        className={`text-[11px] mt-2 hidden sm:block max-w-[80px] font-medium leading-tight ${
                          isDone ? 'text-bone' : 'text-boneDim/60'
                        }`}
                      >
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Courier Tracking Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-charcoal/70 p-4 rounded-2xl border border-hairline/5 text-xs">
              <div>
                <span className="text-boneDim block text-[11px]">Courier Partner</span>
                <span className="text-bone font-semibold">{foundOrder.courierName}</span>
              </div>
              <div>
                <span className="text-boneDim block text-[11px]">AWB / Tracking No.</span>
                <div className="flex items-center gap-2">
                  <span className="text-gold font-mono font-bold">{foundOrder.trackingNumber}</span>
                  <button
                    onClick={() => handleCopyTracking(foundOrder.trackingNumber)}
                    title="Copy tracking number"
                    className="text-boneDim hover:text-gold transition-colors"
                  >
                    {copied ? <Check size={13} className="text-slate-400" /> : <Copy size={13} />}
                  </button>
                </div>
              </div>
              <div>
                <span className="text-boneDim block text-[11px]">Dispatch Hub</span>
                <span className="text-bone font-semibold">Mohanur Flagship Center</span>
              </div>
            </div>
          </div>

          {/* Timeline & Order Summary Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Timeline */}
            <div className="lg:col-span-7 bg-panel border border-hairline/10 rounded-3xl p-6 sm:p-8">
              <h3 className="font-display text-2xl text-bone tracking-wide mb-6 flex items-center gap-2">
                <Clock size={20} className="text-gold" />
                Dispatch Timeline
              </h3>

              <div className="space-y-6">
                {foundOrder.timeline.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div
                      className={`w-4 h-4 rounded-full mt-1 shrink-0 ${
                        item.done
                          ? 'bg-gold shadow-md shadow-gold/40'
                          : 'bg-charcoal border border-hairline/20'
                      }`}
                    />
                    <div className="flex-1">
                      <p
                        className={`text-sm font-semibold ${
                          item.done ? 'text-bone' : 'text-boneDim/60'
                        }`}
                      >
                        {item.title}
                      </p>
                      <p className="text-boneDim text-xs">{item.time}</p>
                      <p className="text-boneDim/70 text-[11px] flex items-center gap-1 mt-0.5">
                        <MapPin size={11} className="text-gold/60" /> {item.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Package Summary & Help */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-panel border border-hairline/10 rounded-3xl p-6">
                <h3 className="font-display text-2xl text-bone tracking-wide mb-4">
                  Items in Shipment
                </h3>
                <div className="divide-y divide-hairline/5 mb-4">
                  {foundOrder.items.map((item, idx) => (
                    <div key={idx} className="py-3 flex justify-between items-center gap-3 text-xs">
                      <img
                        src={item.image ?? imageForItemName(item.name)}
                        alt={item.name}
                        className="w-12 h-14 rounded-lg object-cover border border-hairline/10 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-bone font-semibold">{item.name}</p>
                        <p className="text-boneDim text-[11px]">
                          Size: {item.size} • Qty: {item.qty}
                        </p>
                      </div>
                      <span className="text-gold font-mono font-semibold">
                        {formatINR(item.price * item.qty)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-hairline/10 pt-3 text-xs space-y-1.5 text-boneDim">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatINR(foundOrder.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (5%)</span>
                    <span>{formatINR(foundOrder.gstAmount)}</span>
                  </div>
                  <div className="flex justify-between text-bone font-bold text-sm pt-2 border-t border-hairline/5">
                    <span>Total Amount</span>
                    <span className="text-gold">{formatINR(foundOrder.total)}</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Support Callout */}
              <div className="bg-gradient-to-br from-slate-950/40 to-panel border border-slate-800/30 rounded-3xl p-6 text-xs text-boneDim">
                <h4 className="text-bone font-semibold text-sm mb-1 flex items-center gap-2">
                  <MessageCircle size={16} className="text-slate-400" />
                  Need assistance with this shipment?
                </h4>
                <p className="text-boneDim text-xs mb-4">
                  Connect directly with our Mohanur store manager on WhatsApp.
                </p>
                <a
                  href={`https://wa.me/919876543210?text=${encodeURIComponent(
                    `Hello Urban Threads, I would like to check the status of my order ${foundOrder.id}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-slate-600 hover:bg-slate-500 text-white font-bold px-4 py-2.5 rounded-full text-xs uppercase tracking-wider transition-colors shadow-lg shadow-slate-900/20"
                >
                  <MessageCircle size={14} /> WhatsApp Support
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : searched ? (
        <div className="bg-panel border border-hairline/10 rounded-3xl p-12 text-center max-w-lg mx-auto shadow-2xl">
          <AlertCircle size={40} className="text-rust mx-auto mb-3" />
          <h3 className="font-display text-2xl text-bone tracking-wide mb-2">Order Not Found</h3>
          <p className="text-boneDim text-xs mb-6">
            We could not find an active shipment matching &quot;{query}&quot;. Please verify the Order ID or phone number, or contact us directly.
          </p>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-gold hover:bg-goldDeep text-onGold font-bold px-6 py-3 rounded-full text-xs uppercase tracking-wider transition-colors"
          >
            <MessageCircle size={14} /> Contact Store on WhatsApp
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-panel border border-hairline/5 rounded-2xl p-6 text-center">
            <Truck size={28} className="text-gold mx-auto mb-3" />
            <h4 className="font-display text-xl text-bone tracking-wide mb-1">Fast Delivery</h4>
            <p className="text-boneDim text-xs">
              Daily shipments dispatched across Mohanur, Chennai, Coimbatore, Madurai, Salem &amp; all TN districts.
            </p>
          </div>
          <div className="bg-panel border border-hairline/5 rounded-2xl p-6 text-center">
            <Package size={28} className="text-gold mx-auto mb-3" />
            <h4 className="font-display text-xl text-bone tracking-wide mb-1">ST Courier Tracking</h4>
            <p className="text-boneDim text-xs">
              Direct tracking docket numbers provided on order confirmation for instant courier updates.
            </p>
          </div>
          <div className="bg-panel border border-hairline/5 rounded-2xl p-6 text-center">
            <MessageCircle size={28} className="text-gold mx-auto mb-3" />
            <h4 className="font-display text-xl text-bone tracking-wide mb-1">Direct Support</h4>
            <p className="text-boneDim text-xs">
              Direct WhatsApp concierge support from the Mohanur, Namakkal store manager.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
