import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { BonbonBurst } from './BonbonBurst';
import { SiteLanguage } from './Navbar';

interface MusicWaveHeroTitleProps {
  language: SiteLanguage;
  burstKey: number;
  onTriggerBurst: () => void;
}

const TITLES = [
  {
    key: '555-marina-bay',
    lineOne: '555'.split(''),
    lineTwo: 'MARINA BAY'.split(''),
    lineOneSize: 'text-[clamp(3.15rem,11vw,7.25rem)]',
    lineTwoSize: 'text-[clamp(1.95rem,7.6vw,5.75rem)]',
    aria: '555 Marina Bay',
  },
  {
    key: 'midnight-frequency',
    lineOne: 'MIDNIGHT'.split(''),
    lineTwo: 'FREQUENCY'.split(''),
    lineOneSize: 'text-[clamp(2.25rem,8.8vw,6.5rem)]',
    lineTwoSize: 'text-[clamp(2.05rem,8.1vw,6.1rem)]',
    aria: 'Midnight Frequency',
  },
] as const;

const EQUALIZER_BARS = [0.45, 0.9, 0.65, 1, 0.55, 0.85, 0.4, 0.95, 0.6, 0.8, 0.5, 0.72];

export function MusicWaveHeroTitle({
  language,
  burstKey,
  onTriggerBurst,
}: MusicWaveHeroTitleProps) {
  const prefersReducedMotion = useReducedMotion();
  const isFr = language === 'fr';
  const [phaseIndex, setPhaseIndex] = useState<number>(prefersReducedMotion ? 0 : 0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setPhaseIndex(0);
      return;
    }

    const delayMs = phaseIndex === 0 ? 3500 : 5000;
    const timer = window.setTimeout(() => {
      setPhaseIndex((prev) => (prev === 0 ? 1 : 0));
    }, delayMs);

    return () => window.clearTimeout(timer);
  }, [phaseIndex, prefersReducedMotion]);

  const current = TITLES[phaseIndex];

  const handleTitleClick = () => {
    onTriggerBurst();
    if (!prefersReducedMotion) {
      setPhaseIndex((prev) => (prev === 0 ? 1 : 0));
    }
  };

  return (
    <div className="relative w-full max-w-[1120px] mx-auto text-center flex flex-col items-center">
      <BonbonBurst triggerKey={burstKey} variant="emblem" />

      {/* Eyebrow + Live Gold Music Equalizer Bars */}
      <div className="inline-flex flex-wrap items-center justify-center gap-3 mb-4 sm:mb-5">
        <span className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs tracking-[0.22em] uppercase text-[#F7DC88]">
          <motion.span
            aria-hidden="true"
            animate={
              prefersReducedMotion
                ? undefined
                : { scale: [1, 1.45, 1], opacity: [0.75, 1, 0.75] }
            }
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-2 h-2 rounded-full bg-[#FFE100] shadow-[0_0_10px_rgba(255,225,0,0.85)]"
          />
          <span>555 FAMOUS CLUB · TANGER · NYE 2027</span>
        </span>

        {/* Rhythmic Gold Equalizer Visualizer */}
        <span
          aria-hidden="true"
          className="inline-flex items-end gap-[3px] h-4 px-2 py-0.5 border border-[#D4AF37]/30 bg-[#09090B]/60 rounded-xs"
        >
          {EQUALIZER_BARS.map((peak, i) => (
            <motion.span
              key={i}
              animate={
                prefersReducedMotion
                  ? { scaleY: peak }
                  : {
                      scaleY: [0.28, peak, 0.36, peak * 0.78, 0.28],
                    }
              }
              transition={{
                duration: 1.15 + (i % 3) * 0.18,
                delay: i * 0.08,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-[2.5px] h-full origin-bottom bg-gradient-to-t from-[#B8862D] via-[#F7DC88] to-[#FFF5D6] rounded-full"
            />
          ))}
        </span>
      </div>

      {/* Monumental Gold Display Headline morphing Midnight Frequency -> 555 Marina Bay */}
      <h1
        onClick={handleTitleClick}
        className="relative z-10 min-h-[120px] sm:min-h-[180px] lg:min-h-[215px] font-hero font-black uppercase leading-[0.94] tracking-[-0.025em] select-none cursor-pointer flex flex-col justify-center"
        aria-label={`${current.aria} — 555 Famous Club Tanger NYE 2027`}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={current.key}
            initial={
              prefersReducedMotion
                ? undefined
                : { opacity: 0, y: 22, scaleY: 0.88 }
            }
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={
              prefersReducedMotion
                ? undefined
                : { opacity: 0, y: -22, scaleY: 1.08 }
            }
            transition={{ duration: 0.46, ease: [0.16, 1, 0.3, 1] }}
            className="block"
          >
            {/* Line 1 */}
            <span className={`block whitespace-nowrap ${current.lineOneSize}`}>
              {current.lineOne.map((char, idx) => (
                <motion.span
                  key={`${current.key}-l1-${idx}`}
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : {
                          y: [0, -10, 4, -5, 0],
                          scaleY: [1, 1.07, 0.96, 1.03, 1],
                          rotate: [0, -1.2, 1, -0.5, 0],
                        }
                  }
                  whileHover={{ y: -16, scale: 1.08 }}
                  transition={{
                    duration: 2.2,
                    delay: idx * 0.09,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="inline-block origin-bottom gold-hero-champagne will-change-transform"
                >
                  {char}
                </motion.span>
              ))}
            </span>

            {/* Line 2 */}
            <span className={`block whitespace-nowrap ${current.lineTwoSize} mt-1`}>
              {current.lineTwo.map((char, idx) =>
                char === ' ' ? (
                  <span
                    key={`${current.key}-l2-space-${idx}`}
                    className="inline-block w-[0.3em]"
                  />
                ) : (
                  <motion.span
                    key={`${current.key}-l2-${idx}`}
                    animate={
                      prefersReducedMotion
                        ? undefined
                        : {
                            y: [0, -12, 5, -7, 0],
                            scaleY: [1, 1.08, 0.95, 1.04, 1],
                            rotate: [0, 1.2, -1.1, 0.5, 0],
                          }
                    }
                    whileHover={{ y: -16, scale: 1.08 }}
                    transition={{
                      duration: 2.2,
                      delay: 0.25 + idx * 0.085,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="inline-block origin-bottom gold-bevel-text will-change-transform"
                  >
                    {char}
                  </motion.span>
                )
              )}
            </span>
          </motion.span>
        </AnimatePresence>
      </h1>

      {/* Schedule Date Line */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-4 sm:mt-5"
      >
        <p className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-[#A1A1AA]">
          {isFr
            ? '31 DÉC. 2026 → 1ER JANV. 2027'
            : 'DEC 31, 2026 → JAN 1, 2027'}{' '}
          <span className="text-[#D4AF37] px-1.5">/</span>{' '}
          {isFr ? '23H → 5H' : '11PM → 5AM'}
        </p>
      </motion.div>
    </div>
  );
}
