import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { MEDIA_ASSETS } from '../data/nye2027Data';
import { SiteLanguage } from './Navbar';
import { ResilientImage } from './ResilientImage';

type SwatchId = 'noir' | 'magenta' | 'gold' | 'chrome';

interface PaletteSwatch {
  id: SwatchId;
  label: string;
  orbClass: string;
  glowRgba: string;
  accentHex: string;
  waveGradient: string;
}

const SWATCHES: PaletteSwatch[] = [
  {
    id: 'noir',
    label: 'NOIR CLUB',
    orbClass: 'bg-[#09090B] border border-white/30',
    glowRgba: 'rgba(255, 255, 255, 0.08)',
    accentHex: '#F5F2EB',
    waveGradient: 'from-transparent via-white/35 to-transparent',
  },
  {
    id: 'magenta',
    label: 'MAGENTA',
    orbClass: 'bg-[#FF1F7A] shadow-[0_0_22px_rgba(255,31,122,0.75)]',
    glowRgba: 'rgba(255, 31, 122, 0.22)',
    accentHex: '#FF1F7A',
    waveGradient: 'from-transparent via-[#FF1F7A]/60 to-transparent',
  },
  {
    id: 'gold',
    label: 'OR 555',
    orbClass: 'bg-gradient-to-br from-[#FFF3C4] via-[#FFE100] to-[#C89218] shadow-[0_0_22px_rgba(255,225,0,0.55)]',
    glowRgba: 'rgba(212, 175, 55, 0.22)',
    accentHex: '#FFE100',
    waveGradient: 'from-transparent via-[#FFE100]/65 to-transparent',
  },
  {
    id: 'chrome',
    label: 'LASER CYAN',
    orbClass: 'bg-[#00F0FF] shadow-[0_0_22px_rgba(0,240,255,0.75)]',
    glowRgba: 'rgba(0, 240, 255, 0.22)',
    accentHex: '#00F0FF',
    waveGradient: 'from-transparent via-[#00F0FF]/60 to-transparent',
  },
];

const AMBIENT_SPECKS = [
  { id: 'n-sp-1', left: '6%', top: '18%', color: '#00F0FF', delay: 0 },
  { id: 'n-sp-2', left: '22%', top: '76%', color: '#FF1F7A', delay: 0.9 },
  { id: 'n-sp-3', left: '46%', top: '14%', color: '#FFE100', delay: 1.5 },
  { id: 'n-sp-4', left: '61%', top: '28%', color: '#00F0FF', delay: 0.4 },
  { id: 'n-sp-5', left: '78%', top: '16%', color: '#FF1F7A', delay: 1.9 },
  { id: 'n-sp-6', left: '91%', top: '64%', color: '#FFE100', delay: 1.1 },
];

export function NightFrequencySection({ language = 'fr' }: { language?: SiteLanguage }) {
  const isFr = language === 'fr';
  const prefersReducedMotion = useReducedMotion();
  const [activeSwatchId, setActiveSwatchId] = useState<SwatchId>('magenta');

  const activeSwatch = SWATCHES.find((s) => s.id === activeSwatchId) ?? SWATCHES[1];

  const headlineLines = isFr
    ? ['UNE NUIT', 'RÉGLÉE', 'SUR UNE', 'SEULE ONDE.']
    : ['ONE NIGHT', 'TUNED TO', 'A SINGLE', 'FREQUENCY.'];

  const stats = [
    {
      metric: '31.12',
      label: isFr ? 'Une seule nuit' : 'One single night',
    },
    {
      metric: '00:00',
      label: isFr ? "L'onde lumineuse 2027" : 'The 2027 light wave',
    },
    {
      metric: '2 DJ',
      label: isFr ? 'Résident puis invité*' : 'Resident & special guest*',
    },
    {
      metric: 'VIP',
      label: isFr ? 'Tables et service coordonné' : 'Curated tables & VIP service',
    },
  ];

  return (
    <section
      id="experience"
      aria-label={isFr ? 'Une nuit réglée sur une seule onde' : 'One night tuned to a single frequency'}
      className="relative overflow-hidden bg-[#040406] pt-20 sm:pt-28 pb-10 sm:pb-14 border-b border-white/10"
    >
      {/* Background Laser Photo with Animated Nightclub Light Pulses */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <ResilientImage
          src={MEDIA_ASSETS.laserDancefloor.src}
          alt={MEDIA_ASSETS.laserDancefloor.alt}
          fallbackTitle="555 Tanger Dancefloor Laser Show"
          className="w-full h-full object-cover object-center opacity-45 scale-105"
        />
        {/* Dynamic Multi-Color Laser Sweep Gradients */}
        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  opacity: [0.35, 0.65, 0.35],
                  scale: [1, 1.04, 1],
                }
          }
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 bg-gradient-to-t from-[#040406] via-[#040406]/75 to-transparent mix-blend-multiply"
        />

        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  opacity: [0.25, 0.55, 0.25],
                  x: [-20, 20, -20],
                }
          }
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,240,255,0.22)_0%,rgba(255,31,122,0.18)_45%,transparent_70%)]"
        />
      </div>

      {/* Dynamic Ambient Radial Light reacting to selected Club Swatch */}
      <div
        aria-hidden="true"
        style={{
          background: `radial-gradient(circle at 72% 38%, ${activeSwatch.glowRgba} 0%, transparent 65%)`,
        }}
        className="pointer-events-none absolute inset-0 transition-all duration-500"
      />

      {/* Subtle Floating Bokeh Specks */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {AMBIENT_SPECKS.map((speck) => (
          <motion.span
            key={speck.id}
            style={{
              left: speck.left,
              top: speck.top,
              backgroundColor: speck.color,
            }}
            animate={
              prefersReducedMotion
                ? undefined
                : { opacity: [0.2, 0.85, 0.2], y: [0, -12, 0], scale: [1, 1.3, 1] }
            }
            transition={{
              duration: 3.8,
              delay: speck.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute w-1.5 h-1.5 rounded-full shadow-[0_0_10px_currentColor]"
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-8">
        {/* Top Two-Column Editorial Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center pb-14 sm:pb-20">
          {/* Left: Monumental Stacked Display Statement */}
          <div className="lg:col-span-7">
            <h2 className="font-hero font-black uppercase leading-[0.94] tracking-[-0.025em] text-[clamp(2.3rem,5.6vw,4.35rem)]">
              {headlineLines.map((line, index) => {
                const isLast = index === headlineLines.length - 1;
                return (
                  <motion.span
                    key={line}
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{
                      duration: 0.52,
                      delay: index * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`block ${
                      isLast ? 'gold-bevel-text' : 'gold-hero-champagne'
                    }`}
                  >
                    {line}
                  </motion.span>
                );
              })}
            </h2>
          </div>

          {/* Right: Editorial Manifesto & Interactive Swatch Console */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Decorative background ambient vignette card */}
            <div
              aria-hidden="true"
              className="absolute -inset-4 bg-gradient-to-br from-[#00F0FF]/10 via-[#FF1F7A]/10 to-transparent rounded-lg blur-xl opacity-75 pointer-events-none"
            />

            <div className="relative p-6 sm:p-8 bg-[#060609]/85 backdrop-blur-md border border-[#00F0FF]/30 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
              {/* Top Miniature Cyan/Gold Sparkle Tag */}
              <div className="flex items-center gap-2 mb-4 font-mono text-[11px] tracking-[0.2em] text-[#00F0FF] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_10px_rgba(0,240,255,0.95)] animate-pulse" />
                <span>LASER WAVE · 555 TANGER</span>
              </div>

              <p className="font-serif italic text-base sm:text-lg lg:text-[1.2rem] text-[#F5F2EB] leading-[1.8] font-normal">
                {isFr ? (
                  <>
                    <span className="font-sans not-italic font-bold text-[#F7DC88] uppercase tracking-[0.06em]">
                      Noir profond
                    </span>
                    , accents{' '}
                    <span className="font-sans not-italic font-bold text-[#FF1F7A] tracking-[0.06em] drop-shadow-[0_0_12px_rgba(255,31,122,0.6)]">
                      magenta
                    </span>{' '}
                    et reflets{' '}
                    <span className="font-sans not-italic font-bold gold-bevel-sm tracking-[0.06em]">
                      métalliques
                    </span>
                    .{' '}
                    <span className="text-[#A1A1AA] font-sans not-italic text-sm sm:text-base block mt-3 leading-relaxed">
                      Des lignes de lumière qui suivent le son, une piste qui monte en puissance à Marina Bay, et à minuit, une onde lumineuse qui fait entrer tout le club en{' '}
                      <strong className="font-hero font-extrabold text-[#00F0FF] tracking-wider drop-shadow-[0_0_10px_rgba(0,240,255,0.6)]">
                        2027
                      </strong>
                      .
                    </span>
                  </>
                ) : (
                  <>
                    <span className="font-sans not-italic font-bold text-[#F7DC88] uppercase tracking-[0.06em]">
                      Deep obsidian
                    </span>
                    ,{' '}
                    <span className="font-sans not-italic font-bold text-[#FF1F7A] tracking-[0.06em] drop-shadow-[0_0_12px_rgba(255,31,122,0.6)]">
                      magenta pulses
                    </span>
                    , and{' '}
                    <span className="font-sans not-italic font-bold gold-bevel-sm tracking-[0.06em]">
                      metallic gold
                    </span>{' '}
                    reflections.{' '}
                    <span className="text-[#A1A1AA] font-sans not-italic text-sm sm:text-base block mt-3 leading-relaxed">
                      Lines of light tuned to the sound, a rising dancefloor at Marina Bay, and at midnight, a luminous wave carrying the entire club into{' '}
                      <strong className="font-hero font-extrabold text-[#00F0FF] tracking-wider drop-shadow-[0_0_10px_rgba(0,240,255,0.6)]">
                        2027
                      </strong>
                      .
                    </span>
                  </>
                )}
              </p>

              {/* Interactive Club Aesthetic Swatch Selector */}
              <div
                role="group"
                aria-label={isFr ? 'Palette lumineuse du club' : 'Club lighting palette'}
                className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4"
              >
                {SWATCHES.map((swatch) => {
                  const isSelected = swatch.id === activeSwatchId;
                  return (
                    <button
                      key={swatch.id}
                      type="button"
                      onClick={() => setActiveSwatchId(swatch.id)}
                      onMouseEnter={() => setActiveSwatchId(swatch.id)}
                      aria-pressed={isSelected}
                      className="group inline-flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] rounded-sm py-1"
                    >
                      <span
                        className={`relative w-6 h-6 rounded-full transition-transform duration-200 group-hover:scale-110 ${swatch.orbClass} ${
                          isSelected ? 'ring-2 ring-white/90 ring-offset-2 ring-offset-[#060609]' : ''
                        }`}
                      />
                      <span
                        className={`font-mono text-[10px] tracking-[0.16em] uppercase transition-colors ${
                          isSelected
                            ? 'text-[#F5F2EB] font-semibold'
                            : 'text-[#A1A1AA] group-hover:text-[#F5F2EB]'
                        }`}
                      >
                        {swatch.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Luminous Frequency Horizon Line */}
        <div className="relative h-[2px] w-full bg-white/10 overflow-hidden">
          <motion.div
            animate={
              prefersReducedMotion
                ? undefined
                : { x: ['-35%', '100%'] }
            }
            transition={{
              duration: 3.4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className={`absolute inset-y-0 w-1/2 bg-gradient-to-r ${activeSwatch.waveGradient}`}
          />
        </div>

        {/* Bottom 4-Column Signal Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 pt-2">
          {stats.map((item, idx) => (
            <motion.div
              key={item.metric}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.45,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`group px-4 sm:px-7 py-6 sm:py-8 transition-colors duration-200 hover:bg-white/[0.02] border-white/10 ${
                idx % 2 === 0 ? 'border-r' : ''
              } ${idx < 2 ? 'border-b lg:border-b-0' : ''} ${
                idx < 3 ? 'lg:border-r' : ''
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  style={
                    activeSwatchId !== 'gold' && activeSwatchId !== 'noir'
                      ? { color: activeSwatch.accentHex }
                      : undefined
                  }
                  className={`font-mono tabular-nums text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold tracking-[-0.02em] leading-none transition-colors duration-300 ${
                    activeSwatchId === 'gold' || activeSwatchId === 'noir'
                      ? 'text-[#FFE100]'
                      : ''
                  }`}
                >
                  {item.metric}
                </span>
                <span
                  aria-hidden="true"
                  className="w-2 h-2 rounded-full bg-[#00F0FF]/50 group-hover:bg-[#00F0FF] group-hover:scale-125 transition-all duration-200"
                />
              </div>
              <p className="mt-3 text-xs sm:text-sm text-[#A1A1AA] group-hover:text-[#F5F2EB] transition-colors">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
