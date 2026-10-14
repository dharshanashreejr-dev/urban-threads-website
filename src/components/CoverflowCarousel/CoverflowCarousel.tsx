import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export type CoverflowImage = {
  src: string;
  alt: string;
  title?: string;
  price?: number;
};

type Props = {
  images: CoverflowImage[];
  className?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  spaceBetween?: number;
  onSlideChange?: (index: number) => void;
};

export default function CoverflowCarousel({
  images,
  className = '',
  showPagination = true,
  showNavigation = true,
  loop = true,
  autoplay = true,
  spaceBetween = 0,
  onSlideChange
}: Props) {
  const css = `
  .CoverflowCarousel {
    width: 100%;
    height: 420px;
    padding-bottom: 56px !important;
  }
  .CoverflowCarousel .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 260px;
    height: 340px;
    border-radius: 16px;
    overflow: hidden;
  }
  .CoverflowCarousel .swiper-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    border-radius: 16px;
  }
  .CoverflowCarousel .swiper-pagination-bullet {
    background-color: #c9a227 !important;
    opacity: 0.35;
  }
  .CoverflowCarousel .swiper-pagination-bullet-active {
    opacity: 1 !important;
  }
  .CoverflowCarousel .swiper-button-next,
  .CoverflowCarousel .swiper-button-prev {
    color: #f5f0e8;
    width: 44px;
    height: 44px;
    border-radius: 999px;
    background: rgba(20, 18, 16, 0.65);
    border: 1px solid rgba(201, 162, 39, 0.35);
    backdrop-filter: blur(8px);
  }
  .CoverflowCarousel .swiper-button-next:after,
  .CoverflowCarousel .swiper-button-prev:after {
    display: none;
  }
  @media (max-width: 640px) {
    .CoverflowCarousel {
      height: 360px;
    }
    .CoverflowCarousel .swiper-slide {
      width: 210px;
      height: 280px;
    }
  }
`;

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.3, delay: 0.25 }}
      className={`relative w-full max-w-5xl mx-auto px-2 sm:px-5 ${className}`}
    >
      <style>{css}</style>
      <Swiper
        spaceBetween={spaceBetween}
        autoplay={
          autoplay
            ? {
                delay: 2200,
                disableOnInteraction: true
              }
            : false
        }
        effect="coverflow"
        grabCursor
        slidesPerView="auto"
        centeredSlides
        loop={loop}
        coverflowEffect={{
          rotate: 40,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        }}
        pagination={
          showPagination
            ? {
                clickable: true
              }
            : false
        }
        navigation={
          showNavigation
            ? {
                nextEl: '.coverflow-next',
                prevEl: '.coverflow-prev'
              }
            : false
        }
        onSlideChange={(swiper) => {
          if (onSlideChange) onSlideChange(swiper.realIndex);
        }}
        className="CoverflowCarousel"
        modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
      >
        {images.map((image, index) => (
          <SwiperSlide key={`${image.src}-${index}`}>
            <img src={image.src} alt={image.alt} />
          </SwiperSlide>
        ))}
      </Swiper>

      {showNavigation && (
        <>
          <button
            type="button"
            aria-label="Previous"
            className="coverflow-prev absolute left-1 sm:left-0 top-1/2 -translate-y-[60%] z-10 w-11 h-11 rounded-full bg-ink/70 border border-gold/30 text-bone flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next"
            className="coverflow-next absolute right-1 sm:right-0 top-1/2 -translate-y-[60%] z-10 w-11 h-11 rounded-full bg-ink/70 border border-gold/30 text-bone flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}
    </motion.div>
  );
}
