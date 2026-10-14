import { motion } from 'framer-motion';

type Props = {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
  wordStagger?: number;
};

/**
 * Lightweight staggered-reveal text animation (word by word).
 * Built with framer-motion since this project doesn't have access to the
 * paid React Bits Pro "Staggered Text" registry component — this reproduces
 * the same fade-up + stagger effect without an external dependency.
 */
export default function StaggeredText({
  text,
  className = '',
  as = 'span',
  delay = 0,
  wordStagger = 0.06
}: Props) {
  const words = text.split(' ');
  const Tag = motion[as as keyof typeof motion] as typeof motion.span;

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: '0.6em' }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
            delay: delay + i * wordStagger
          }}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}
