import { motion } from 'motion/react';
import { MEDIA_ASSETS } from '../data/nye2027Data';
import { SiteLanguage } from './Navbar';

interface EventsShowcaseSectionProps {
  onContactClick: () => void;
  language?: SiteLanguage;
}

const EVENT_TYPES = {
  fr: [
    'Anniversaire,',
    "Lancement d'un nouveau produit,",
    'Enterrement de vie de célibataire,',
    'Team-Building,',
    "Fête d'entreprise...",
  ],
  en: [
    'Birthday celebrations,',
    'Product launches,',
    'Bachelor & bachelorette parties,',
    'Team-building events,',
    'Corporate galas...',
  ],
};

export function EventsShowcaseSection({
  onContactClick,
  language = 'fr',
}: EventsShowcaseSectionProps) {
  const isFr = language === 'fr';

  return (
    <section
      aria-label="Événements privés et professionnels au 555 Famous Club Tanger"
      className="bg-[#09090B] py-16 sm:py-24 border-b border-white/10 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, x: 36 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1200px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
      >
        {/* Left: Split Two-Panel Gold-Accented Visual Showcase */}
        <div className="lg:col-span-6 group grid grid-cols-2 gap-2.5 h-[420px] sm:h-[500px]">
          {/* Left Panel: Top Gold Bar + Left Half of Photo */}
          <div className="flex flex-col h-full">
            <div className="h-3.5 bg-[#D4AF37] w-full shrink-0" />
            <div className="relative flex-1 overflow-hidden bg-[#09090B]">
              <div className="w-full h-full origin-right transition-transform duration-500 ease-out group-hover:scale-[1.04]">
                <img
                  src={MEDIA_ASSETS.eventsShowcase.src}
                  alt={MEDIA_ASSETS.eventsShowcase.alt}
                  referrerPolicy="no-referrer"
                  className="w-[200%] max-w-none h-full object-cover object-left"
                />
              </div>
            </div>
          </div>

          {/* Right Panel: Right Half of Photo + Bottom Gold Bar */}
          <div className="flex flex-col h-full">
            <div className="relative flex-1 overflow-hidden bg-[#09090B]">
              <div className="w-full h-full origin-left transition-transform duration-500 ease-out group-hover:scale-[1.04]">
                <img
                  src={MEDIA_ASSETS.eventsShowcase.src}
                  alt=""
                  aria-hidden="true"
                  referrerPolicy="no-referrer"
                  className="w-[200%] max-w-none h-full object-cover object-right -translate-x-1/2"
                />
              </div>
            </div>
            <div className="h-3.5 bg-[#D4AF37] w-full shrink-0" />
          </div>
        </div>

        {/* Right: Bilingual Events Content & Gold CTA */}
        <div className="lg:col-span-6">
          <h2 className="font-sans text-3xl sm:text-[2.35rem] font-extrabold leading-[1.2] tracking-[0.01em] gold-bevel-text text-balance">
            {isFr
              ? 'Fêtez vos événements avec le 555 Famous Club Tanger'
              : 'Celebrate Your Events at 555 Famous Club Tangier'}
          </h2>

          <p className="mt-5 text-sm sm:text-base text-[#F5F2EB]/90 leading-relaxed">
            {isFr
              ? 'Notre club vous reçoit dans une décoration chic et raffinée pour fêter tous vos événements privés ou professionnels :'
              : 'Our club welcomes you into an elevated, chic setting designed for unforgettable private and corporate occasions:'}
          </p>

          <ul className="mt-5 space-y-2 pl-5 list-disc text-sm sm:text-base text-[#F5F2EB]/90 marker:text-[#F5F2EB]/80">
            {EVENT_TYPES[language].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <p className="mt-6 text-sm sm:text-base text-[#F5F2EB]/90 leading-relaxed">
            {isFr
              ? "Pouvant accueillir jusqu'à 1500 personnes, notre Night club 555 Famous Club Tanger vous garantit une expérience hors du commun et un service exceptionnel tout au long de votre soirée."
              : 'With a capacity of up to 1,500 guests, 555 Famous Club Tangier delivers an extraordinary atmosphere and dedicated VIP hospitality throughout the entire night.'}
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
      </motion.div>
    </section>
  );
}
