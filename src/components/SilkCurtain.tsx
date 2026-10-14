import './SilkCurtain.css';

interface SilkCurtainProps {
  className?: string;
}

// Flowing vertical light-streak backdrop, recreated in the brand's own
// gold/rust/ink palette (CSS-only, no external video asset).
export default function SilkCurtain({ className = '' }: SilkCurtainProps) {
  return (
    <div className={`silk-curtain ${className}`} aria-hidden="true">
      <div className="silk-curtain__stripes" />
      <div className="silk-curtain__glow" />
      <div className="silk-curtain__vignette" />
    </div>
  );
}
