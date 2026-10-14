import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import type { Product } from '../../data/products';
import { formatINR } from '../../utils/gst';
import './FlipProductGallery.css';

gsap.registerPlugin(Flip);

type Props = {
  products: Product[];
};

export default function FlipProductGallery({ products }: Props) {
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const boxIndexRef = useRef<number | undefined>(undefined);
  const openRef = useRef(false);

  useEffect(() => {
    const modal = modalRef.current;
    const modalContent = modalContentRef.current;
    const modalOverlay = overlayRef.current;
    const wrapper = wrapperRef.current;
    if (!modal || !modalContent || !modalOverlay || !wrapper) return;

    const boxes = gsap.utils.toArray<HTMLElement>('.flip-box', wrapper);
    const boxesContent = gsap.utils.toArray<HTMLElement>('.flip-box-content', wrapper);

    const closeIfOpen = (box: HTMLElement, i: number) => {
      const state = Flip.getState(box);
      boxes[i].appendChild(box);
      boxIndexRef.current = undefined;
      openRef.current = false;
      modal.classList.remove('is-open');
      gsap.to([modal, modalOverlay], {
        autoAlpha: 0,
        ease: 'power1.inOut',
        duration: 0.35
      });
      Flip.from(state, {
        duration: 0.7,
        ease: 'power1.inOut',
        absolute: true,
        onComplete: () => gsap.set(box, { zIndex: 'auto' })
      });
      gsap.set(box, { zIndex: 1002 });
    };

    const openBox = (box: HTMLElement, i: number) => {
      const state = Flip.getState(box);
      modalContent.appendChild(box);
      boxIndexRef.current = i;
      openRef.current = true;
      modal.classList.add('is-open');
      gsap.set(modal, { autoAlpha: 1 });
      Flip.from(state, {
        duration: 0.7,
        ease: 'power1.inOut'
      });
      gsap.to(modalOverlay, { autoAlpha: 0.65, duration: 0.35 });
    };

    const handlers: Array<() => void> = [];

    boxesContent.forEach((box, i) => {
      const handler = () => {
        if (boxIndexRef.current !== undefined) {
          // already open — only close if same box
          if (boxIndexRef.current === i) {
            closeIfOpen(box, i);
          }
        } else {
          openBox(box, i);
        }
      };
      box.addEventListener('click', handler);
      handlers.push(() => box.removeEventListener('click', handler));
    });

    const onOverlay = () => {
      if (boxIndexRef.current === undefined) return;
      const i = boxIndexRef.current;
      const box = boxesContent[i];
      if (box) closeIfOpen(box, i);
    };
    modalOverlay.addEventListener('click', onOverlay);

    return () => {
      handlers.forEach((fn) => fn());
      modalOverlay.removeEventListener('click', onOverlay);
      // put any open content back
      if (boxIndexRef.current !== undefined) {
        const i = boxIndexRef.current;
        const box = boxesContent[i];
        if (box && boxes[i] && !boxes[i].contains(box)) {
          boxes[i].appendChild(box);
        }
      }
      gsap.set([modal, modalOverlay], { autoAlpha: 0 });
      modal.classList.remove('is-open');
      boxIndexRef.current = undefined;
    };
  }, [products]);

  if (!products.length) {
    return (
      <div className="text-center py-20 text-boneDim text-sm">
        No products tagged for this collection yet.
      </div>
    );
  }

  return (
    <div className="flip-gallery-wrapper" ref={wrapperRef}>
      <div className="flip-boxes">
        {products.map((p) => (
          <div className="flip-box" key={p.id}>
            <div
              className="flip-box-content"
              style={{ backgroundImage: `url('${p.image}')` }}
              data-id={p.id}
              role="button"
              tabIndex={0}
              aria-label={`${p.name}, ${formatINR(p.price)}`}
            >
              <div className="flip-box-meta">
                <div className="name">{p.name}</div>
                <div className="price">{formatINR(p.price)}</div>
                <p className="desc">{p.description}</p>
                <button
                  type="button"
                  className="cta"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/products');
                  }}
                >
                  Shop now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flip-modal" ref={modalRef} aria-hidden>
        <div className="flip-overlay" ref={overlayRef} />
        <div className="flip-content" ref={modalContentRef} />
      </div>
    </div>
  );
}
