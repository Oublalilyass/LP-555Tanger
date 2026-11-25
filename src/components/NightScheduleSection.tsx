import { motion, useReducedMotion } from 'motion/react';
import { SiteLanguage } from './Navbar';

interface NightScheduleSectionProps {
  language?: SiteLanguage;
}

const SCHEDULE_ITEMS = [
  {
    time: '23:00',
    badge: 'A1',
    titleFr: 'ACCUEIL',
    titleEn: 'WELCOME & DOORS OPEN',
    descFr: 'Ouverture des portes et installation VIP à votre table.',
    descEn: 'Doors open and VIP table seating across Marina Bay.',
    active: false,
  },
  {
    time: '23:20',
    badge: 'A2',
    titleFr: 'WARM-UP DJ RÉSIDENT',
    titleEn: 'RESIDENT DJ WARM-UP',
    descFr: 'La piste chauffe, le son monte en fréquence.',
    descEn: 'The dancefloor heats up as the frequency builds.',
    active: true,
  },
  {
    time: '23:40',
    badge: 'A3',
    titleFr: 'PERFORMERS',
    titleEn: 'LIVE PERFORMERS',
    descFr: 'Premier passage : percussions live ou danseurs, en séquences immersives.',
    descEn: 'First live showcase: percussionists and dancers in immersive sequences.',
    active: false,
  },
  {
    time: '23:55',
    badge: 'B1',
    titleFr: 'SYNCHRONISATION',
    titleEn: 'SYNCHRONIZATION',
    descFr: 'Régie et MC lancent le compte à rebours officiel vers 2027.',
    descEn: 'Booth and MC initiate the official countdown toward 2027.',
    active: false,
  },
  {
    time: '00:00',
    badge: 'B2',
    titleFr: 'MIDNIGHT FREQUENCY',
    titleEn: 'MIDNIGHT FREQUENCY',
    descFr: "Les écrans et projecteurs révèlent l'onde lumineuse 2027.",
    descEn: 'Giant screens and laser arrays reveal the 2027 light wave.',
    active: true,
  },
];

const WAVE_BARS = [0.35, 0.7, 0.45, 0.9, 0.55, 1, 0.65, 0.85, 0.4, 0.95, 0.75, 0.5, 0.8];

export function NightScheduleSection({ language = 'fr' }: NightScheduleSectionProps) {
  const isFr = language === 'fr';
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="schedule"
      aria-label={isFr ? 'La nuit, piste par piste' : 'The night, track by track'}
      className="relative bg-[#040406] py-20 sm:py-28 border-b border-white/10 overflow-hidden"
    >
      {/* Background ambient gold/magenta glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08)_0%,rgba(255,31,122,0.08)_50%,transparent_70%)] blur-3xl"
      />

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-8">
        {/* Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block font-mono text-xs tracking-[0.24em] text-[#FFE100] uppercase mb-3">
              {isFr ? 'HORAIRES & PROGRAMME · 31 DÉCEMBRE' : 'SCHEDULE & TIMELINE · DECEMBER 31'}
            </span>
            <h2 className="font-hero font-black uppercase tracking-tight text-[clamp(2.25rem,5.8vw,4.75rem)] leading-[0.96]">
              <span className="block gold-hero-champagne">LA NUIT,</span>
              <span className="block gold-bevel-text mt-1">PISTE PAR PISTE.</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-xs sm:text-sm text-[#A1A1AA] tracking-[0.08em] max-w-xs lg:text-right"
          >
            {isFr
              ? 'Programme indicatif : artistes et horaires à confirmer.'
              : 'Indicative schedule: artists and exact timing subject to confirmation.'}
          </motion.p>
        </div>

        {/* Schedule Rows */}
        <div className="space-y-3 sm:space-y-4">
          {SCHEDULE_ITEMS.map((item, idx) => (
            <motion.div
              key={item.time}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: idx * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`group relative rounded-xl p-5 sm:p-7 transition-all duration-300 border backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                item.active
                  ? 'bg-gradient-to-r from-[#141018] via-[#101015] to-[#0A0A0F] border-[#D4AF37]/50 shadow-[0_12px_40px_rgba(212,175,55,0.15)]'
                  : 'bg-[#0B0B0F]/90 border-white/10 hover:border-white/25'
              }`}
            >
              {/* Left: Time + Badge + Title & Description */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 min-w-0">
                <div className="flex items-center gap-4">
                  <span
                    className={`font-mono tabular-nums text-2xl sm:text-3xl font-extrabold tracking-tight ${
                      item.time === '00:00' ? 'text-[#FFE100]' : 'text-[#F5F2EB]'
                    }`}
                  >
                    {item.time}
                  </span>
                  <span className="px-2.5 py-1 rounded-sm font-mono text-xs font-bold tracking-[0.14em] text-[#A1A1AA] bg-white/5 border border-white/15">
                    {item.badge}
                  </span>
                </div>

                <div className="min-w-0">
                  <h3
                    className={`font-hero font-bold text-lg sm:text-xl uppercase tracking-tight ${
                      item.active ? 'text-[#FFE100]' : 'text-[#F5F2EB]'
                    }`}
                  >
                    {isFr ? item.titleFr : item.titleEn}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                    {isFr ? item.descFr : item.descEn}
                  </p>
                </div>
              </div>

              {/* Right: Audio Waveform Visualizer */}
              <div className="flex items-center justify-end gap-1 shrink-0 h-8 px-3 rounded-md bg-black/40 border border-white/10">
                {WAVE_BARS.map((peak, barIdx) => (
                  <motion.span
                    key={barIdx}
                    animate={
                      prefersReducedMotion
                        ? { scaleY: peak }
                        : {
                            scaleY: [0.3, peak * (item.active ? 1.25 : 0.8), 0.3],
                          }
                    }
                    transition={{
                      duration: 1.2 + (barIdx % 4) * 0.18,
                      delay: barIdx * 0.06,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    style={{
                      backgroundColor: item.active
                        ? barIdx % 2 === 0
                          ? '#FFE100'
                          : '#FF1F7A'
                        : '#71717A',
                    }}
                    className="w-[2.5px] h-5 origin-center rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
