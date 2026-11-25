import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface BonbonBurstProps {
  triggerKey: number;
  variant?: 'emblem' | 'button';
}

interface BurstParticle {
  id: number;
  tx: number;
  ty: number;
  rotate: number;
  scale: number;
  width: number;
  height: number;
  color: string;
  shape: 'confetti' | 'spark' | 'diamond';
  delay: number;
}

const PALETTE = [
  '#FFF5D6',
  '#F7DC88',
  '#D4AF37',
  '#E5C158',
  '#FBBF24',
  '#FFFFFF',
];

function buildParticles(
  count: number,
  minRadius: number,
  maxRadius: number,
  seedOffset: number
): BurstParticle[] {
  const items: BurstParticle[] = [];
  for (let i = 0; i < count; i++) {
    const baseAngle = (Math.PI * 2 * i) / count;
    const jitterAngle = (((i * 37 + seedOffset * 13) % 100) / 100 - 0.5) * 0.28;
    const angle = baseAngle + jitterAngle;
    const rRatio = ((i * 53 + seedOffset * 29) % 100) / 100;
    const radius = minRadius + rRatio * (maxRadius - minRadius);
    const tx = Math.cos(angle) * radius;
    const ty = Math.sin(angle) * radius + 14;
    const shapeRoll = (i + seedOffset) % 3;
    const shape: BurstParticle['shape'] =
      shapeRoll === 0 ? 'confetti' : shapeRoll === 1 ? 'diamond' : 'spark';

    items.push({
      id: i,
      tx,
      ty,
      rotate: (((i * 71 + seedOffset * 19) % 360) + 180) * (i % 2 === 0 ? 1 : -1),
      scale: 0.75 + (((i * 17) % 6) * 0.12),
      width: shape === 'confetti' ? 8 : shape === 'diamond' ? 7 : 5,
      height: shape === 'confetti' ? 4 : shape === 'diamond' ? 7 : 5,
      color: PALETTE[(i + seedOffset) % PALETTE.length],
      shape,
      delay: ((i * 11) % 5) * 0.015,
    });
  }
  return items;
}

export function BonbonBurst({ triggerKey, variant = 'button' }: BonbonBurstProps) {
  const [active, setActive] = useState(false);

  const durationMs = variant === 'emblem' ? 1050 : 720;

  useEffect(() => {
    if (triggerKey <= 0) return;
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    setActive(true);
    const timer = window.setTimeout(() => {
      setActive(false);
    }, durationMs);

    return () => window.clearTimeout(timer);
  }, [triggerKey, durationMs]);

  if (!active || triggerKey <= 0) return null;

  const isEmblem = variant === 'emblem';
  const particles = buildParticles(
    isEmblem ? 34 : 20,
    isEmblem ? 120 : 58,
    isEmblem ? 275 : 132,
    triggerKey
  );

  return (
    <div
      key={triggerKey}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible z-30"
    >
      {/* Expanding champagne-gold shockwave ring */}
      <motion.span
        initial={{ scale: 0.35, opacity: 0.85 }}
        animate={{ scale: isEmblem ? 1.85 : 1.55, opacity: 0 }}
        transition={{ duration: isEmblem ? 0.65 : 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={`absolute rounded-full border border-[#F7DC88]/70 shadow-[0_0_24px_rgba(212,175,55,0.65)] ${
          isEmblem ? 'w-44 h-44 sm:w-56 sm:h-56' : 'w-20 h-20'
        }`}
      />

      {/* Confetti & sparkle explosion particles */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          initial={{ x: 0, y: 0, scale: 0.3, rotate: 0, opacity: 1 }}
          animate={{
            x: p.tx,
            y: p.ty,
            scale: [0.4, p.scale, 0.4],
            rotate: p.rotate,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: (durationMs - 80) / 1000,
            delay: p.delay,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            width: p.width,
            height: p.height,
            backgroundColor: p.color,
            boxShadow: `0 0 10px ${p.color}`,
          }}
          className={`absolute ${
            p.shape === 'spark'
              ? 'rounded-full'
              : p.shape === 'diamond'
                ? 'rotate-45 rounded-[1px]'
                : 'rounded-[1px]'
          }`}
        />
      ))}
    </div>
  );
}
