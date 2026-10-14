import { useState } from 'react';
import { MessageCircle, X, Sparkles, Send, MapPin, Package, Briefcase, Shirt } from 'lucide-react';
import logo from '../assets/logo.png';

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const quickPrompts = [
    { icon: Shirt, text: 'Hi! Can you share new shirt & denim arrivals?' },
    { icon: Briefcase, text: 'I want to inquire about wholesale reseller rates & MOQ' },
    { icon: Package, text: 'Hi, I need assistance with tracking my courier order' },
    { icon: MapPin, text: 'Can you share store location & directions in Mohanur, Namakkal?' }
  ];

  const handleSendPrompt = (text: string) => {
    window.open(
      `https://wa.me/919876543210?text=${encodeURIComponent(text)}`,
      '_blank'
    );
    setIsOpen(false);
  };

  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    window.open(
      `https://wa.me/919876543210?text=${encodeURIComponent(customMsg)}`,
      '_blank'
    );
    setCustomMsg('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Expanded Popup Chat Window */}
      {isOpen && (
        <div className="bg-panel border border-hairline/15 rounded-3xl p-5 w-80 sm:w-96 shadow-2xl mb-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-hairline/10 pb-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={logo}
                  alt="Urban Threads"
                  className="w-10 h-10 rounded-full object-cover border border-gold/40"
                />
                <span className="w-3 h-3 rounded-full bg-slate-500 border-2 border-panel absolute bottom-0 right-0" />
              </div>
              <div>
                <h4 className="text-bone font-bold text-sm">Urban Threads Concierge</h4>
                <p className="text-slate-400 text-[11px]">Online • Mohanur, Namakkal</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-boneDim hover:text-bone p-1"
              aria-label="Close WhatsApp chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Welcome Message */}
          <div className="bg-charcoal p-3.5 rounded-2xl border border-hairline/5 mb-4 text-xs text-bone leading-relaxed">
            <p className="font-semibold text-gold mb-1 flex items-center gap-1">
              <Sparkles size={13} /> Vanakkam! How can we assist you today?
            </p>
            <p className="text-boneDim text-[11px]">
              Tap a quick prompt or message our store manager directly on WhatsApp:
            </p>
          </div>

          {/* Quick Prompts */}
          <div className="space-y-2 mb-4">
            {quickPrompts.map((p, idx) => {
              const Icon = p.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleSendPrompt(p.text)}
                  className="w-full text-left text-xs bg-ink/70 hover:bg-gold/15 hover:border-gold/30 border border-hairline/10 rounded-xl p-2.5 text-bone transition-all flex items-center gap-2 group"
                >
                  <Icon size={14} className="text-gold shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="line-clamp-1">{p.text}</span>
                </button>
              );
            })}
          </div>

          {/* Custom Message input */}
          <form onSubmit={handleCustomSend} className="flex gap-2">
            <input
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              placeholder="Type custom message..."
              className="flex-1 bg-charcoal border border-hairline/10 rounded-xl px-3 py-2 text-xs text-bone placeholder:text-boneDim focus:outline-none focus:border-gold/50"
            />
            <button
              type="submit"
              className="bg-slate-600 hover:bg-slate-500 text-white rounded-xl px-3.5 flex items-center justify-center transition-colors"
              aria-label="Send WhatsApp message"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-slate-600 to-green-500 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 ring-4 ring-slate-950/40 relative group"
        aria-label="Open WhatsApp Chat"
      >
        <MessageCircle size={28} />
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold border-2 border-ink animate-pulse" />
      </button>
    </div>
  );
}
