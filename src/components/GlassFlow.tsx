/**
 * Flowing glass-like blurred gradient backdrop.
 * Built with plain CSS animation since this project doesn't have access to
 * the paid React Bits Pro "Glass Flow" registry component — this reproduces
 * a similar soft, moving frosted-glass look without an external dependency.
 */
export default function GlassFlow({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="glass-blob glass-blob-a" />
      <div className="glass-blob glass-blob-b" />
      <div className="glass-blob glass-blob-c" />
      <div className="absolute inset-0 backdrop-blur-3xl" />
    </div>
  );
}
