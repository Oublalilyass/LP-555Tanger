import { motion } from 'motion/react';
import { MEDIA_ASSETS } from '../data/nye2027Data';
import { SiteLanguage } from './Navbar';
import { ResilientImage } from './ResilientImage';

interface EnterFrequencySectionProps {
  language?: SiteLanguage;
}

const STEPS = [
  {
    number: '01',
    textFr: 'Accueil club et contrôle des réservations par une file dédiée.',
    textEn: 'Club reception and reservation check via a dedicated VIP fast-track lane.',
  },
  {
    number: '02',
    textFr: 'Votre table, choisie sur le plan de salle, vous attend à votre nom.',
    textEn: 'Your table, selected directly on the floor plan, is reserved under your name.',
  },
  {
    number: '03',
    textFr: "Un accès NYE dédié (bracelet ou preuve d'accès)*, remis à l'entrée.",
    textEn: 'Dedicated NYE access pass (wristband or ticket confirmation)* issued at arrival.',
  },
  {
    number: '04',
    textFr: "Une équipe en noir, détail magenta, pour vous guider jusqu'à votre table.",
    textEn: 'Our host team in black with signature magenta detailing will escort you to your table.',
  },
];

export function EnterFrequencySection({ language = 'fr' }: EnterFrequencySectionProps) {
  const isFr = language === 'fr';

  return (
    <section
      aria-label={isFr ? 'Entrez dans la fréquence' : 'Enter the Frequency'}
      className="relative bg-[#060609] py-20 sm:py-28 border-b border-white/10 overflow-hidden"
    >
      {/* Background ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(255,31,122,0.1)_0%,transparent_70%)] blur-2xl"
      />

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Highlight Photo Card with Pink/Magenta Border Glow & Dress Code Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            {/* Glowing Magenta Outer Border Frame */}
            <div className="relative rounded-2xl p-1 bg-gradient-to-br from-[#FF1F7A] via-[#D4AF37] to-[#00F0FF] shadow-[0_20px_60px_rgba(255,31,122,0.28)]">
              <div className="relative rounded-[14px] overflow-hidden bg-[#0A0A0F] aspect-[4/5] sm:aspect-[4/4.5]">
                <ResilientImage
                  src={MEDIA_ASSETS.dressCodeBanner.src}
                  alt={MEDIA_ASSETS.dressCodeBanner.alt}
                  fallbackTitle="Entrez dans la fréquence 555 Tanger"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F]/80 via-transparent to-transparent" />

                {/* Bottom Dress Code Pill */}
                <div className="absolute bottom-5 left-5 right-5 sm:left-6 sm:right-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm bg-[#FFE100] text-[#09090B] font-mono text-xs font-extrabold tracking-[0.14em] uppercase shadow-[0_8px_24px_rgba(255,225,0,0.4)]">
                    <span>{isFr ? 'DRESS CODE :' : 'DRESS CODE :'}</span>
                    <span className="font-sans font-semibold">
                      {isFr ? 'SOIRÉE, TOUCHE MÉTALLIQUE' : 'PARTY NIGHT, METALLIC TOUCH'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: ENTREZ DANS LA FRÉQUENCE Headline + 4 Numbered Steps */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-8"
          >
            <div>
              <span className="inline-block font-mono text-xs tracking-[0.24em] text-[#FF1F7A] uppercase mb-3">
                {isFr ? 'GUIDE ACCÈS · RÉVEILLON 2027' : 'ACCESS GUIDE · NYE 2027'}
              </span>
              <h2 className="font-hero font-black uppercase tracking-tight text-[clamp(2.5rem,6.5vw,4.75rem)] leading-[0.94]">
                <span className="block text-white">ENTREZ</span>
                <span className="block text-white mt-1">DANS LA</span>
                <span className="block text-white mt-1">FRÉQUENCE.</span>
              </h2>
            </div>

            {/* 4 Numbered Steps with Magenta numbers */}
            <div className="space-y-6 pt-2">
              {STEPS.map((step, idx) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.45,
                    delay: idx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex items-start gap-4 pb-6 border-b border-white/10 group"
                >
                  <span className="font-mono tabular-nums text-lg font-black text-[#FF1F7A] tracking-wider shrink-0 mt-0.5">
                    {step.number}
                  </span>
                  <p className="text-sm sm:text-base text-[#F5F2EB]/90 leading-relaxed group-hover:text-white transition-colors">
                    {isFr ? step.textFr : step.textEn}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
