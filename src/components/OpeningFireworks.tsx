import { useEffect, useRef, useState } from 'react';

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  size: number;
  color: string;
}

interface Rocket {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetY: number;
  color: string;
  exploded: boolean;
}

const GOLD_PALETTE = [
  '#FFF5D6',
  '#F7DC88',
  '#D4AF37',
  '#E5C158',
  '#FCEBB6',
  '#FFFFFF',
];

const TOTAL_DURATION_MS = 4200;
const FADE_START_MS = 3400;

interface OpeningFireworksProps {
  triggerKey?: number;
}

export function OpeningFireworks({ triggerKey = 0 }: OpeningFireworksProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [finished, setFinished] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (triggerKey > 0 && typeof window !== 'undefined') {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!reduced) {
        setFinished(false);
      }
    }
  }, [triggerKey]);

  useEffect(() => {
    if (finished) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    const sparks: Spark[] = [];
    const rockets: Rocket[] = [];
    const startTime = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const launchSpecs = [
      { delay: 40, xRatio: 0.22, targetRatio: 0.26 },
      { delay: 220, xRatio: 0.78, targetRatio: 0.24 },
      { delay: 460, xRatio: 0.5, targetRatio: 0.18 },
      { delay: 780, xRatio: 0.34, targetRatio: 0.3 },
      { delay: 1050, xRatio: 0.66, targetRatio: 0.28 },
      { delay: 1380, xRatio: 0.48, targetRatio: 0.22 },
      { delay: 1650, xRatio: 0.2, targetRatio: 0.34 },
      { delay: 1850, xRatio: 0.82, targetRatio: 0.32 },
    ];
    let launchedCount = 0;

    const createBurst = (x: number, y: number) => {
      const count = 64;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.15;
        const speed = 1.6 + Math.random() * 4.4;
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay: 0.011 + Math.random() * 0.011,
          size: 1.4 + Math.random() * 1.9,
          color: GOLD_PALETTE[Math.floor(Math.random() * GOLD_PALETTE.length)],
        });
      }
      // Inner shimmering crown ring
      for (let i = 0; i < 20; i++) {
        const angle = (Math.PI * 2 * i) / 20;
        const speed = 1.1 + Math.random() * 1.4;
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay: 0.014 + Math.random() * 0.008,
          size: 1.8,
          color: '#FFF5D6',
        });
      }
    };

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const w = window.innerWidth;
      const h = window.innerHeight;

      if (elapsed >= TOTAL_DURATION_MS) {
        setFinished(true);
        return;
      }

      // Spawn choreographed opening rockets
      while (
        launchedCount < launchSpecs.length &&
        elapsed >= launchSpecs[launchedCount].delay
      ) {
        const spec = launchSpecs[launchedCount];
        rockets.push({
          x: w * spec.xRatio,
          y: h * 0.92,
          vx: (Math.random() - 0.5) * 1.1,
          vy: -(9.5 + Math.random() * 2.5),
          targetY: h * spec.targetRatio,
          color: GOLD_PALETTE[launchedCount % GOLD_PALETTE.length],
          exploded: false,
        });
        launchedCount++;
      }

      ctx.clearRect(0, 0, w, h);

      const globalFade =
        elapsed > FADE_START_MS
          ? Math.max(0, 1 - (elapsed - FADE_START_MS) / (TOTAL_DURATION_MS - FADE_START_MS))
          : 1;

      // Update & draw rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.x += r.vx;
        r.y += r.vy;
        r.vy += 0.14;

        // Subtle rising trail spark
        if (Math.random() < 0.65) {
          sparks.push({
            x: r.x,
            y: r.y,
            vx: (Math.random() - 0.5) * 0.5,
            vy: 0.8 + Math.random() * 0.8,
            alpha: 0.75,
            decay: 0.035,
            size: 1.3,
            color: '#F7DC88',
          });
        }

        ctx.save();
        ctx.globalAlpha = globalFade;
        ctx.fillStyle = r.color;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (r.y <= r.targetY || r.vy >= -0.8) {
          createBurst(r.x, r.y);
          rockets.splice(i, 1);
        }
      }

      // Update & draw explosion sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.982;
        s.vy = s.vy * 0.982 + 0.055;
        s.alpha -= s.decay;

        if (s.alpha <= 0.02) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = s.alpha * globalFade;
        ctx.fillStyle = s.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#D4AF37';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = window.requestAnimationFrame(tick);
    };

    animationFrameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [finished, triggerKey]);

  if (finished) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-50 pointer-events-none"
    />
  );
}
