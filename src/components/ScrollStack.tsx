import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export type ScrollStackCard = {
  id: string;
  title: string;
  description: string;
  image: string;
};

type Props = {
  cards: ScrollStackCard[];
};

/**
 * Custom-built equivalent of React Bits Pro's "Scroll Stack" —
 * pinned cards that stack, tilt and dissolve on scroll.
 * Built with plain React + GSAP ScrollTrigger (no license / private registry required).
 */
export default function ScrollStack({ cards }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.to(card, {
          scale: 0.92,
          rotateZ: i % 2 === 0 ? -3 : 3,
          opacity: 0.35,
          scrollTrigger: {
            trigger: card,
            start: 'top top+=80',
            end: 'bottom top+=80',
            scrub: true,
            pin: false
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, [cards]);

  return (
    <div ref={containerRef} className="relative">
      {cards.map((card, i) => (
        <div
          key={card.id}
          ref={(el) => (cardRefs.current[i] = el)}
          style={{
            position: 'sticky',
            top: `${80 + i * 14}px`,
            zIndex: i + 1
          }}
          className="mb-8 rounded-2xl border border-gold/20 bg-panel overflow-hidden grid md:grid-cols-2 gap-0 shadow-2xl"
        >
          <div className="h-64 md:h-80 overflow-hidden">
            <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
          </div>
          <div className="p-8 flex flex-col justify-center">
            <h3 className="font-display text-3xl text-gold tracking-wide mb-3">{card.title}</h3>
            <p className="text-boneDim leading-relaxed">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
