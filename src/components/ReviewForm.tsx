import { useState } from 'react';
import { Star, Check } from 'lucide-react';

type StoredReview = {
  name: string;
  rating: number;
  message: string;
  submittedAt: string;
};

const STORAGE_KEY = 'urbanthreads_site_reviews';

export default function ReviewForm() {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const existing: StoredReview[] = raw ? JSON.parse(raw) : [];
      existing.unshift({ name, rating, message, submittedAt: new Date().toISOString() });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    } catch {
      // ignore storage errors, still show confirmation
    }

    setSubmitted(true);
    setName('');
    setMessage('');
    setRating(5);
  }

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto text-center bg-panel border border-gold/20 rounded-2xl p-10">
        <div className="w-14 h-14 rounded-full bg-gold/15 flex items-center justify-center mx-auto mb-4">
          <Check className="text-gold" size={28} />
        </div>
        <h3 className="font-display text-3xl text-bone mb-2">Thanks for the review!</h3>
        <p className="text-boneDim mb-6">
          We appreciate you taking the time \u2014 it helps other customers shop with confidence.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-gold uppercase text-sm tracking-wider border border-gold/40 rounded-full px-6 py-2 hover:border-gold transition-colors"
        >
          Write another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-panel border border-hairline/5 rounded-2xl p-8">
      <div className="mb-5">
        <label className="block text-xs uppercase tracking-wider text-boneDim mb-2">Your name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="e.g. Kabil"
          className="w-full bg-ink border border-hairline/10 rounded-lg px-4 py-3 text-bone placeholder:text-boneDim/40 focus:outline-none focus:border-gold"
        />
      </div>

      <div className="mb-5">
        <label className="block text-xs uppercase tracking-wider text-boneDim mb-2">Your rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              className="star-btn"
              onMouseEnter={() => setHoverRating(n)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(n)}
              aria-label={`${n} star`}
            >
              <Star
                size={28}
                className={(hoverRating || rating) >= n ? 'fill-gold text-gold' : 'text-boneDim/30'}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-xs uppercase tracking-wider text-boneDim mb-2">Your review</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={4}
          placeholder="Tell us about the quality, fit and delivery..."
          className="w-full bg-ink border border-hairline/10 rounded-lg px-4 py-3 text-bone placeholder:text-boneDim/40 focus:outline-none focus:border-gold resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gold text-onGold font-semibold py-3 rounded-full hover:bg-goldDeep transition-colors uppercase text-sm tracking-wider"
      >
        Submit review
      </button>
    </form>
  );
}
