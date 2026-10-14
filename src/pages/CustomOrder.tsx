import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Scissors,
  Sparkles,
  MessageCircle,
  CheckCircle2,
  Package,
  Palette,
  Ruler
} from 'lucide-react';
import { ADMIN_WHATSAPP_NUMBER } from '../utils/whatsapp';
import { saveCustomOrder, CustomOrderRequest } from '../utils/customOrdersStore';

const GARMENT_TYPES = ['Shirt', 'T-Shirt', 'Trousers', 'Jeans', 'Kurta / Ethnic Set', 'Other'];
const FABRIC_OPTIONS = [
  'Pure Cotton',
  'Cotton-Linen Blend',
  'Stretch Denim',
  'Poly-Viscose',
  'Khadi',
  'Not sure — recommend one'
];

function buildCustomOrderWhatsAppLink(req: CustomOrderRequest) {
  const lines = [
    `✂️ *CUSTOM ORDER REQUEST — Urban Threads*`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `📌 *Request ID:* ${req.id}`,
    `👤 *Name:* ${req.customerName}`,
    `📞 *Phone:* ${req.customerPhone}`,
    `👕 *Garment:* ${req.garmentType}`,
    `🧵 *Fabric:* ${req.fabric}`,
    `🎨 *Color:* ${req.color}`,
    `📏 *Size:* ${req.size}`,
    `📝 *Notes:* ${req.notes || 'None'}`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `_Please confirm feasibility, price, and stitching timeline._`
  ];
  const message = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${message}`;
}

export default function CustomOrder() {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [garmentType, setGarmentType] = useState(GARMENT_TYPES[0]);
  const [fabric, setFabric] = useState(FABRIC_OPTIONS[0]);
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState<{ id: string; link: string } | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !color.trim() || !size.trim()) {
      setError('Please fill in your name, phone, color and size so we can quote accurately.');
      return;
    }
    setError('');

    const id = `CO-${Date.now().toString().slice(-6)}`;
    const request: CustomOrderRequest = {
      id,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      fabric,
      color: color.trim(),
      size: size.trim(),
      garmentType,
      notes: notes.trim(),
      createdAt: new Date().toISOString()
    };

    saveCustomOrder(request);
    const link = buildCustomOrderWhatsAppLink(request);
    setSubmitted({ id, link });
    window.open(link, '_blank');
  }

  if (submitted) {
    return (
      <div className="bg-ink min-h-screen flex items-center justify-center px-6 py-16">
        <div className="bg-panel border border-hairline/10 rounded-3xl p-8 sm:p-12 max-w-lg w-full text-center shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-slate-500/20 border border-slate-500/40 text-slate-400 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={36} />
          </div>
          <span className="text-gold uppercase tracking-[0.25em] text-xs font-bold bg-gold/10 px-3 py-1 rounded-full border border-gold/30">
            Custom Request Sent
          </span>
          <h1 className="font-display text-3xl text-bone tracking-wide mt-4 mb-2">
            Reference: {submitted.id}
          </h1>
          <p className="text-boneDim text-sm mb-6">
            Your custom order details have been sent to our tailoring desk on WhatsApp. We&apos;ll
            confirm pricing and timeline shortly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={submitted.link}
              target="_blank"
              rel="noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-600 hover:bg-slate-500 text-white font-bold py-3.5 px-6 rounded-full text-xs uppercase tracking-wider transition-colors shadow-lg shadow-slate-600/30"
            >
              <MessageCircle size={16} /> Open WhatsApp
            </a>
            <Link
              to="/products"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-panel hover:bg-panel/80 border border-hairline/10 text-bone font-semibold py-3.5 px-6 rounded-full text-xs uppercase tracking-wider transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ink min-h-screen">
      <div className="relative overflow-hidden border-b border-hairline/10">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.06] to-transparent pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-6 pt-16 pb-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-1.5 text-gold text-xs uppercase tracking-[0.3em] font-semibold mb-3">
              <Scissors size={13} />
              <span>Build Your Own Order</span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl text-bone tracking-wide mb-3">
              Custom Stitched, Just for You
            </h1>
            <p className="text-boneDim text-sm max-w-xl mx-auto">
              Fabric, color, fit, size — tell us what you have in mind and our Mohanur tailoring
              desk will get back with pricing and timeline over WhatsApp.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-panel border border-hairline/10 rounded-3xl p-6 sm:p-10 shadow-2xl"
        >
          <div className="grid sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-boneDim mb-1">
                Full Name *
              </label>
              <input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Priya Sundar"
                className="w-full bg-charcoal border border-hairline/10 rounded-xl px-4 py-2.5 text-xs text-bone placeholder:text-boneDim focus:outline-none focus:border-gold/50"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-boneDim mb-1">
                WhatsApp Phone *
              </label>
              <input
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                maxLength={10}
                placeholder="e.g. 98421 XXXXX"
                className="w-full bg-charcoal border border-hairline/10 rounded-xl px-4 py-2.5 text-xs text-bone font-mono placeholder:text-boneDim focus:outline-none focus:border-gold/50"
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-boneDim mb-1">
              <Package size={12} className="text-gold" /> Garment Type
            </label>
            <div className="flex flex-wrap gap-2">
              {GARMENT_TYPES.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGarmentType(g)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${
                    garmentType === g
                      ? 'bg-gold text-onGold shadow-lg shadow-gold/20'
                      : 'bg-charcoal border border-hairline/10 text-boneDim hover:border-gold/40'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <label className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-boneDim mb-1">
              <Scissors size={12} className="text-gold" /> Fabric Preference
            </label>
            <select
              value={fabric}
              onChange={(e) => setFabric(e.target.value)}
              className="w-full bg-charcoal border border-hairline/10 rounded-xl px-4 py-2.5 text-xs text-bone focus:outline-none focus:border-gold/50"
            >
              {FABRIC_OPTIONS.map((f) => (
                <option key={f} value={f} className="bg-charcoal text-bone">
                  {f}
                </option>
              ))}
            </select>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-boneDim mb-1">
                <Palette size={12} className="text-gold" /> Color *
              </label>
              <input
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="e.g. Navy Blue"
                className="w-full bg-charcoal border border-hairline/10 rounded-xl px-4 py-2.5 text-xs text-bone placeholder:text-boneDim focus:outline-none focus:border-gold/50"
              />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-boneDim mb-1">
                <Ruler size={12} className="text-gold" /> Size / Measurements *
              </label>
              <input
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="e.g. L, or chest 40in"
                className="w-full bg-charcoal border border-hairline/10 rounded-xl px-4 py-2.5 text-xs text-bone placeholder:text-boneDim focus:outline-none focus:border-gold/50"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-[11px] uppercase tracking-wider text-boneDim mb-1">
              Design Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Collar style, embroidery, reference image description, etc."
              className="w-full bg-charcoal border border-hairline/10 rounded-xl px-4 py-2.5 text-xs text-bone placeholder:text-boneDim focus:outline-none focus:border-gold/50 resize-none"
            />
            <p className="text-boneDim/70 text-[10px] mt-1.5">
              Have a reference photo? Send it directly on WhatsApp after submitting — easiest way
              to share images with our tailors.
            </p>
          </div>

          {error && (
            <p className="text-red-400 text-xs mb-4 bg-red-950/40 border border-red-800/40 p-2.5 rounded-xl">
              ⚠️ {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-slate-600 via-green-600 to-slate-500 hover:from-slate-500 hover:to-green-400 text-white font-bold py-4 rounded-full uppercase text-xs tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl shadow-slate-600/30"
          >
            <MessageCircle size={18} />
            <span>Send Custom Request on WhatsApp</span>
          </button>
        </motion.form>
      </div>
    </div>
  );
}
