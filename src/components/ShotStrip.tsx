import { Star } from 'lucide-react';
import type { ReviewShot } from '../data/reviews';

export default function ShotStrip({ items }: { items: ReviewShot[] }) {
  return (
    <div className="review-scroll flex gap-5 overflow-x-auto pb-4 -mx-6 px-6 snap-x">
      {items.map((item) => (
        <figure
          key={item.id}
          className="review-card snap-start shrink-0 w-64 sm:w-72 bg-panel border border-hairline/10 rounded-2xl overflow-hidden shadow-sm"
        >
          <img src={item.image} alt={item.title} loading="lazy" className="w-full h-60 object-cover" />
          <figcaption className="p-4 text-sm text-boneDim">
            <div className="flex gap-0.5 mb-1.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star key={n} size={13} className={n <= item.rating ? 'fill-gold text-gold' : 'text-boneDim/40'} />
              ))}
            </div>
            <p className="text-bone font-semibold mb-1">{item.title}</p>
            <p className="text-xs leading-relaxed mb-2">{item.text}</p>
            <p className="text-[11px] text-gold font-semibold">
              {item.name} · {item.place}
            </p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
