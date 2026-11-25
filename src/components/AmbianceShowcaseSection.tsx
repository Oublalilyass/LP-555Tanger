import { motion } from 'motion/react';
import { MEDIA_ASSETS } from '../data/nye2027Data';
import { SiteLanguage } from './Navbar';

interface AmbianceShowcaseSectionProps {
  onContactClick: () => void;
  language?: SiteLanguage;
}

const SHOW_HIGHLIGHTS = {
  fr: [
    'Soirées à thème,',
    'Djs internationaux,',
    'Performers et danseuses brésiliennes...',
  ],
  en: [
    'Themed nights,',
    'International guest DJs,',
    'Live performers and Brazilian dancers...',
  ],
};

export function AmbianceShowcaseSection({
  onContactClick,
  language = 'fr',
}: AmbianceShowcaseSectionProps) {
  const isFr = language === 'fr';

  return (
    <section
      aria-label="Ambiance et animations au 555 Famous Club Tanger"
      className="bg-[#09090B] py-16 sm:py-24 border-b border-white/10"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left: Bilingual Ambiance Copy & Gold CTA */}
        <div className="lg:col-span-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-3xl sm:text-[2.35rem] font-extrabold leading-[1.2] tracking-[0.01em] gold-bevel-text text-balance"
          >
            {isFr
              ? "Profitez d'une ambiance magique et conviviale au sein du 555 Famous Club Tanger !"
              : 'Experience an Electric & Elevated Nightlife Atmosphere at 555 Famous Club Tangier!'}
          </motion.h2>

          <p className="mt-5 text-sm sm:text-base text-[#F5F2EB]/90 leading-relaxed">
            {isFr
              ? "Solo ou en groupe, le 555 Famous Club Tanger vous invite à partager un moment féerique en vous proposant une variété d'animations et de live shows, à savoir :"
              : 'Whether solo or with your table group, 555 Famous Club Tangier curates unforgettable live stage entertainment every evening, featuring:'}
          </p>

          <ul className="mt-5 space-y-2 pl-5 list-disc text-sm sm:text-base text-[#F5F2EB]/90 marker:text-[#F5F2EB]/80">
            {SHOW_HIGHLIGHTS[language].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <p className="mt-6 text-sm sm:text-base text-[#F5F2EB]/90 leading-relaxed">
            {isFr
              ? "un large choix de cocktails signatures, un bar à chicha est aussi mis à votre disposition tout en vous offrant un choix infini de parfums."
              : 'Enjoy a curated selection of signature cocktails alongside our dedicated shisha lounge offering an extensive variety of blends.'}
          </p>

          <p className="mt-5 text-sm sm:text-base text-[#F5F2EB]/90 leading-relaxed">
            {isFr ? "Pour plus d'informations, n'hésitez pas à nous contacter au " : 'For more information, feel free to contact us at '}
            <a
              href="tel:+212615885287"
              className="font-mono tabular-nums text-[#F5F2EB] hover:text-[#D4AF37] transition-colors"
            >
              +212 615 885 287
            </a>{' '}
            {isFr ? 'ou via notre formulaire de contact.' : 'or via our reservation desk below.'}
          </p>

          <div className="mt-8">
            <button
              type="button"
              onClick={onContactClick}
              className="btn-gold-hover inline-flex items-center justify-center px-7 py-3.5 min-h-[44px] rounded-full bg-gradient-to-r from-[#FFFDF2] via-[#F5D47A] to-[#C99A2E] hover:from-[#FFFFFF] hover:via-[#FFF0BC] hover:to-[#E2C062] text-[#09090B] text-xs sm:text-sm font-extrabold tracking-[0.14em] uppercase whitespace-nowrap shrink-0 cursor-pointer shadow-[0_6px_22px_rgba(212,175,55,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {isFr ? 'Contactez-Nous' : 'Contact Us'}
            </button>
          </div>
        </div>

        {/* Right: Horizontal Split Photo with Bottom-Right Gold Accent Bar */}
        <div className="lg:col-span-6 group flex flex-col gap-2.5 h-[360px] sm:h-[440px]">
          {/* Top Full-Width Strip (32% height) */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[32%] w-full overflow-hidden bg-[#09090B]"
          >
            <div className="w-full h-full origin-bottom transition-transform duration-500 ease-out group-hover:scale-[1.04]">
              <img
                src={MEDIA_ASSETS.ambianceShowcase.src}
                alt={MEDIA_ASSETS.ambianceShowcase.alt}
                referrerPolicy="no-referrer"
                className="w-full h-[312.5%] max-w-none object-cover object-center"
              />
            </div>
          </motion.div>

          {/* Bottom Strip (68% height) + Right Vertical Gold Bar */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-1 gap-2.5 min-h-0"
          >
            <div className="relative flex-1 h-full overflow-hidden bg-[#09090B]">
              <div className="w-full h-full origin-top transition-transform duration-500 ease-out group-hover:scale-[1.04]">
                <img
                  src={MEDIA_ASSETS.ambianceShowcase.src}
                  alt=""
                  aria-hidden="true"
                  referrerPolicy="no-referrer"
                  className="w-full h-[147.06%] max-w-none object-cover object-center -translate-y-[32%]"
                />
              </div>
            </div>
            <div className="w-4 sm:w-5 h-full bg-[#D4AF37] shrink-0" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
