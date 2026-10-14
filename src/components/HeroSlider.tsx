import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import hero5 from '../assets/hero/hero-5.jpg';
import hero1 from '../assets/hero/hero-1.jpg';
import hero2 from '../assets/hero/hero-2.jpg';
import hero3 from '../assets/hero/hero-3.jpg';
import hero4 from '../assets/hero/hero-4.jpg';

const slides = [
  { src: hero5, alt: 'Urban Threads — New collection' },
  { src: hero1, alt: 'Urban Threads store — all 365 days offer, new arrivals' },
  { src: hero2, alt: 'Urban Threads — Pant + Shirt at just 1699' },
  { src: hero3, alt: 'Urban Threads — Festive season offers, up to 50% off' },
  { src: hero4, alt: 'Urban Threads — Premium menswear, elevate your style' }
  
];

const INTERVAL_MS = 4500;

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, INTERVAL_MS);
    return () => clearInterval(t);
  }, [paused, next]);

  return (
    <section
      className="relative w-full pt-20 bg-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative w-full aspect-[7/3] overflow-hidden bg-charcoal">
        {slides.map((s, i) => (
          <Link
            key={s.src}
            to="/products"
            aria-hidden={i !== index}
            tabIndex={i === index ? 0 : -1}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === index ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={s.src}
              alt={s.alt}
              loading={i === 0 ? 'eager' : 'lazy'}
              className="w-full h-full object-cover"
            />
          </Link>
        ))}

        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/65 text-white flex items-center justify-center backdrop-blur transition-colors"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/65 text-white flex items-center justify-center backdrop-blur transition-colors"
        >
          <ChevronRight size={22} />
        </button>

        <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === index ? 'w-7 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}