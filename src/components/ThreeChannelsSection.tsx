import { motion, useReducedMotion } from 'motion/react';
import { GALLERY_PHOTOS } from '../data/nye2027Data';
import { SiteLanguage } from './Navbar';
import { ResilientImage } from './ResilientImage';

interface ThreeChannelsSectionProps {
  language?: SiteLanguage;
}

export function ThreeChannelsSection({ language = 'fr' }: ThreeChannelsSectionProps) {
  const isFr = language === 'fr';
  const prefersReducedMotion = useReducedMotion();

  // Pick 3 high-impact photos from GALLERY_PHOTOS to act as CH.01, CH.02, CH.03
  const ch1Photo = GALLERY_PHOTOS[3]; // Live Percussion & Lasers
  const ch2Photo = GALLERY_PHOTOS[0]; // VIP Champagne Parade
  const ch3Photo = GALLERY_PHOTOS[5]; // Midnight Celebration

  return (
    <section
      aria-label={isFr ? 'Trois canaux, une fréquence' : 'Three channels, one frequency'}
      className="relative bg-[#050508] py-20 sm:py-28 border-b border-white/10 overflow-hidden"
    >
      {/* Background ambient lighting glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.08)_0%,rgba(255,31,122,0.08)_45%,transparent_70%)] blur-2xl"
      />

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-8">
        {/* Section Heading matching reference layout */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-center lg:text-left mb-14 sm:mb-18"
        >
          <span className="inline-block font-mono text-xs tracking-[0.24em] text-[#00F0FF] uppercase mb-3">
            {isFr ? 'EXPÉDITION IMMERSIVE · 3 CANAUX' : 'IMMERSIVE EXPERIENCE · 3 CHANNELS'}
          </span>
          <h2 className="font-hero font-black uppercase tracking-tight text-[clamp(2.25rem,6.2vw,5rem)] leading-[0.96]">
            <span className="block gold-hero-champagne">TROIS CANAUX.</span>
            <span className="block gold-bevel-text mt-1">UNE FRÉQUENCE.</span>
          </h2>
        </motion.div>

        {/* Asymmetric 3-Card Creative Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Large Card (CH.01) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 group relative rounded-2xl overflow-hidden bg-[#0D0D12] border border-white/15 shadow-[0_24px_64px_rgba(0,0,0,0.8)] flex flex-col min-h-[460px] sm:min-h-[560px]"
          >
            <div className="absolute inset-0 overflow-hidden">
              <ResilientImage
                src={ch1Photo.src}
                alt={ch1Photo.alt}
                fallbackTitle={ch1Photo.caption}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060609] via-[#060609]/40 to-transparent" />
            </div>

            <div className="relative z-10 mt-auto p-6 sm:p-10 flex flex-col justify-end">
              <span className="inline-flex items-center self-start px-2.5 py-1 rounded-full font-mono text-[11px] font-bold tracking-[0.18em] text-[#FFE100] bg-black/70 border border-[#D4AF37]/50 backdrop-blur-md mb-3">
                CH . 01
              </span>
              <h3 className="font-hero font-extrabold text-2xl sm:text-4xl text-[#F5F2EB] uppercase tracking-tight">
                {isFr ? 'LIGNES DE LUMIÈRE' : 'LINES OF LIGHT'}
              </h3>
              <p className="mt-2 text-sm sm:text-base text-[#A1A1AA] leading-relaxed max-w-xl">
                {isFr
                  ? 'Des lignes lumineuses autour de la scène, synchronisées au son pour sculpter chaque drop de minuit.'
                  : 'Illuminated architectural structures and stage beams synchronized in real-time to the midnight audio frequency.'}
              </p>
            </div>
          </motion.div>

          {/* Right Column: Two Stacked Cards (CH.02 & CH.03) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Card CH.02 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-2xl overflow-hidden bg-[#0D0D12] border border-white/15 shadow-[0_24px_64px_rgba(0,0,0,0.8)] flex flex-col min-h-[260px] sm:min-h-[270px]"
            >
              <div className="absolute inset-0 overflow-hidden">
                <ResilientImage
                  src={ch2Photo.src}
                  alt={ch2Photo.alt}
                  fallbackTitle={ch2Photo.caption}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060609] via-[#060609]/50 to-transparent" />
              </div>

              <div className="relative z-10 mt-auto p-6 sm:p-7 flex flex-col justify-end">
                <span className="inline-flex items-center self-start px-2.5 py-1 rounded-full font-mono text-[11px] font-bold tracking-[0.18em] text-[#FF1F7A] bg-black/70 border border-[#FF1F7A]/50 backdrop-blur-md mb-2">
                  CH . 02
                </span>
                <h3 className="font-hero font-extrabold text-xl sm:text-2xl text-[#F5F2EB] uppercase tracking-tight">
                  {isFr ? 'PHOTO SPOT 555' : 'PHOTO SPOT 555'}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                  {isFr
                    ? 'Un photo spot 555 exclusif et des panneaux réfléchissants mobiles pour immortaliser vos souvenirs 2027.'
                    : 'Exclusive 555 photo installation and mobile reflective panels to capture your unforgettable 2027 memories.'}
                </p>
              </div>
            </motion.div>

            {/* Card CH.03 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-2xl overflow-hidden bg-[#0D0D12] border border-white/15 shadow-[0_24px_64px_rgba(0,0,0,0.8)] flex flex-col min-h-[260px] sm:min-h-[270px]"
            >
              <div className="absolute inset-0 overflow-hidden">
                <ResilientImage
                  src={ch3Photo.src}
                  alt={ch3Photo.alt}
                  fallbackTitle={ch3Photo.caption}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060609] via-[#060609]/50 to-transparent" />
              </div>

              <div className="relative z-10 mt-auto p-6 sm:p-7 flex flex-col justify-end">
                <span className="inline-flex items-center self-start px-2.5 py-1 rounded-full font-mono text-[11px] font-bold tracking-[0.18em] text-[#00F0FF] bg-black/70 border border-[#00F0FF]/50 backdrop-blur-md mb-2">
                  CH . 03
                </span>
                <h3 className="font-hero font-extrabold text-xl sm:text-2xl text-[#F5F2EB] uppercase tracking-tight">
                  {isFr ? 'ÉCRANS EN FRÉQUENCE' : 'SCREENS IN FREQUENCY'}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                  {isFr
                    ? "Les écrans géants passent aux couleurs du concept, prolongeant l'énergie sans masquer l'architecture du club."
                    : 'Immersive giant LED visuals shift seamlessly into the concept palette, amplifying club energy.'}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
