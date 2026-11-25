import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

export function HeroMusicWave() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerXRef = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const drawFrame = (timeMs: number) => {
      if (!width || !height) return;
      ctx.clearRect(0, 0, width, height);

      const t = prefersReducedMotion ? 1.4 : timeMs * 0.001;
      const midY = height * 0.52;
      const pointerX = pointerXRef.current;

      // 1. Symmetric Gold Equalizer Spectrum Bars across width
      const barCount = width < 640 ? 48 : 88;
      const step = width / barCount;
      const barWidth = Math.max(2, step * 0.48);

      for (let i = 0; i < barCount; i++) {
        const norm = i / (barCount - 1);
        const x = i * step + (step - barWidth) * 0.5;

        // Envelope tapered smoothly at edges
        const edgeFade = Math.sin(norm * Math.PI);

        // Multi-frequency rhythmic audio pulse
        const bass = Math.abs(Math.sin(t * 3.1 + norm * 7.5));
        const mid = Math.abs(Math.cos(t * 4.4 - norm * 14.0));
        const high = Math.abs(Math.sin(t * 6.2 + norm * 23.0));
        const beat = (0.48 * bass + 0.34 * mid + 0.18 * high) * edgeFade;

        let pointerBoost = 0;
        if (pointerX !== null) {
          const dist = Math.abs(x - pointerX);
          if (dist < 160) {
            pointerBoost = (1 - dist / 160) * 0.45;
          }
        }

        const barHeight = Math.max(10, (beat + pointerBoost) * height * 1.08);
        const topY = midY - barHeight * 0.5;

        const barGrad = ctx.createLinearGradient(0, topY, 0, topY + barHeight);
        barGrad.addColorStop(0, 'rgba(255, 245, 214, 0.85)');
        barGrad.addColorStop(0.5, 'rgba(212, 175, 55, 0.6)');
        barGrad.addColorStop(1, 'rgba(184, 134, 45, 0.28)');

        ctx.fillStyle = barGrad;
        ctx.beginPath();
        ctx.roundRect(x, topY, barWidth, barHeight, barWidth * 0.5);
        ctx.fill();
      }

      // 2. Three Flowing Harmonic Gold Sine Waves
      const ribbons = [
        { amp: 0.52, freq: 0.011, speed: 3.1, width: 3.8, alpha: 0.98, glow: 22 },
        { amp: 0.38, freq: 0.017, speed: -2.4, width: 2.6, alpha: 0.78, glow: 15 },
        { amp: 0.26, freq: 0.025, speed: 4.0, width: 1.8, alpha: 0.6, glow: 8 },
      ];

      ribbons.forEach((ribbon, rIdx) => {
        ctx.save();
        const lineGrad = ctx.createLinearGradient(0, 0, width, 0);
        lineGrad.addColorStop(0, 'rgba(212, 175, 55, 0)');
        lineGrad.addColorStop(0.18, `rgba(247, 220, 136, ${ribbon.alpha})`);
        lineGrad.addColorStop(0.5, `rgba(255, 245, 214, ${ribbon.alpha})`);
        lineGrad.addColorStop(0.82, `rgba(212, 175, 55, ${ribbon.alpha})`);
        lineGrad.addColorStop(1, 'rgba(212, 175, 55, 0)');

        ctx.strokeStyle = lineGrad;
        ctx.lineWidth = ribbon.width;
        ctx.shadowColor = 'rgba(247, 220, 136, 0.75)';
        ctx.shadowBlur = ribbon.glow;

        ctx.beginPath();
        for (let x = 0; x <= width; x += 4) {
          const norm = x / width;
          const envelope = Math.sin(norm * Math.PI);
          let interactive = 1;
          if (pointerX !== null) {
            const d = Math.abs(x - pointerX);
            if (d < 160) interactive += (1 - d / 160) * 0.55;
          }

          const harmonicA = Math.sin(x * ribbon.freq + t * ribbon.speed + rIdx * 1.1);
          const harmonicB = Math.cos(x * ribbon.freq * 1.75 - t * (ribbon.speed * 0.8));
          const y =
            midY +
            (harmonicA * 0.65 + harmonicB * 0.35) *
              (height * ribbon.amp) *
              envelope *
              interactive;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.restore();
      });

      if (!prefersReducedMotion) {
        animId = window.requestAnimationFrame(drawFrame);
      }
    };

    if (prefersReducedMotion) {
      drawFrame(1400);
    } else {
      animId = window.requestAnimationFrame(drawFrame);
    }

    return () => {
      window.removeEventListener('resize', resize);
      if (animId) window.cancelAnimationFrame(animId);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      className="relative w-full mt-8 sm:mt-10"
      aria-label="Live gold music frequency wave visualization"
    >
      {/* Ambient gold glow underneath the wave */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-10 top-1/2 -translate-y-1/2 h-16 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.22)_0%,transparent_70%)] blur-md"
      />
      <canvas
        ref={canvasRef}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          pointerXRef.current = e.clientX - rect.left;
        }}
        onMouseLeave={() => {
          pointerXRef.current = null;
        }}
        className="relative z-10 block w-full h-[130px] sm:h-[170px] lg:h-[210px] cursor-crosshair"
      />
    </div>
  );
}
