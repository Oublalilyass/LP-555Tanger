import { motion } from 'motion/react';
import { Check, Sparkles } from 'lucide-react';
import { SiteLanguage } from './Navbar';

interface PricingCardItem {
  id: string;
  number: string;
  badge: string;
  title: string;
  price: string;
  unit: string;
  capacityBadge?: string;
  availableTablesBadge?: string;
  features: string[];
  isFeatured?: boolean;
  accentColor: string; // hex or tailwind class
  badgeColorClass: string;
}

const PRICING_CARDS: PricingCardItem[] = [
  {
    id: 'ticket-entree',
    number: '01',
    badge: 'ACCÈS CLUB',
    title: "TICKET D'ENTRÉE",
    price: '1 000',
    unit: 'MAD / PERS.',
    capacityBadge: '1 PERS.',
    availableTablesBadge: 'PASS DISPONIBLES',
    features: [
      'Accès club NYE',
      '1 consommation incluse',
      'Onde lumineuse 2027 à minuit',
    ],
    accentColor: '#FFE100',
    badgeColorClass: 'text-[#FFE100]',
  },
  {
    id: 'table-bar',
    number: '02',
    badge: '4 PERS. MAX',
    title: 'TABLE BAR',
    price: '6 000',
    unit: 'MAD / TABLE',
    capacityBadge: '4 PERS. MAX',
    availableTablesBadge: '5 / 5 TABLES LIBRES',
    features: [
      'Table 4 personnes, côté bar',
      '1 bouteille',
      'Tables 56 à 60',
    ],
    accentColor: '#F97316',
    badgeColorClass: 'text-[#F97316]',
  },
  {
    id: 'table-lounge',
    number: '03',
    badge: '6 PERS. MAX',
    title: 'TABLE LOUNGE',
    price: '7 000',
    unit: 'MAD / TABLE',
    capacityBadge: '6 PERS. MAX',
    availableTablesBadge: '20 / 20 TABLES LIBRES',
    features: [
      'Banquette 6 personnes',
      '1 bouteille',
      'Salon principal ou salon lounge',
    ],
    accentColor: '#22C55E',
    badgeColorClass: 'text-emerald-400',
  },
  {
    id: 'table-premium',
    number: '04',
    badge: '6 PERS. MAX',
    title: 'TABLE PREMIUM',
    price: '8 000',
    unit: 'MAD / TABLE',
    capacityBadge: '6 PERS. MAX',
    availableTablesBadge: '12 / 12 TABLES LIBRES',
    features: [
      'Table 6 personnes',
      '1 bouteille',
      'Autour de la piste',
    ],
    accentColor: '#EF4444',
    badgeColorClass: 'text-red-400',
  },
  {
    id: 'vip-dancefloor',
    number: '05',
    badge: '6 PERS. MAX',
    title: 'VIP DANCEFLOOR',
    price: '10 000',
    unit: 'MAD / TABLE',
    capacityBadge: '6 PERS. MAX',
    availableTablesBadge: '12 / 12 TABLES LIBRES',
    features: [
      'Table VIP 6 personnes au bord de la piste',
      '2 bouteilles ou 1 magnum',
      'Service tables coordonné',
    ],
    accentColor: '#3B82F6',
    badgeColorClass: 'text-blue-400',
  },
  {
    id: 'vip-prestige',
    number: '06',
    badge: 'LE PLUS EXCLUSIF',
    title: 'VIP PRESTIGE',
    price: '15 000',
    unit: 'MAD / TABLE',
    capacityBadge: '6 PERS. MAX',
    availableTablesBadge: '20 / 20 TABLES LIBRES',
    features: [
      'Carré VIP 6 personnes face au DJ',
      '2 bouteilles ou 1 magnum',
      'Parade bouteilles à minuit',
    ],
    isFeatured: true,
    accentColor: '#FF1F7A',
    badgeColorClass: 'text-[#FF1F7A]',
  },
];

interface PricingCardsSectionProps {
  onSelectOption: (optionTitle: string) => void;
  language?: SiteLanguage;
}

export function PricingCardsSection({
  onSelectOption,
  language = 'fr',
}: PricingCardsSectionProps) {
  const isFr = language === 'fr';

  return (
    <section
      id="pricing-cards"
      aria-label="Tarifs et formules Réveillon 2027 555 Tanger"
      className="relative bg-[#070709] py-20 sm:py-26 border-b border-white/10"
    >
      {/* Ambient background lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.08)_0%,transparent_60%)]"
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-3 font-mono text-xs tracking-[0.2em] uppercase text-[#D4AF37]">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{isFr ? 'TARIFS OFFICIELS · NYE 2027' : 'OFFICIAL RATES · NYE 2027'}</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-5xl font-extrabold tracking-[0.03em] gold-bevel-text text-balance">
            {isFr ? 'FORMULES & TARIFS DU RÉVEILLON' : 'GALA PACKAGES & RATES'}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
            {isFr
              ? 'Choisissez votre entrée ou votre table VIP pour célébrer le passage à 2027 au 555 Famous Club Tanger.'
              : 'Select your admission pass or VIP table to celebrate the arrival of 2027 at 555 Famous Club Tangier.'}
          </p>
        </motion.div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {PRICING_CARDS.map((card, idx) => {
            const isFeatured = card.isFeatured;

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex flex-col justify-between p-6 sm:p-7 rounded-lg transition-all duration-300 ${
                  isFeatured
                    ? 'bg-gradient-to-b from-[#140C14] via-[#0F0A10] to-[#0A070B] border-2 border-[#FF1F7A]/70 shadow-[0_20px_55px_rgba(255,31,122,0.22)]'
                    : 'bg-[#0E0E12] border border-white/15 hover:border-[#D4AF37]/60 shadow-[0_16px_40px_rgba(0,0,0,0.7)]'
                }`}
              >
                {/* Top Header inside Card */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.16em] mb-4">
                    <span className="text-[#A1A1AA] font-semibold">{card.number}</span>
                    <span className={`font-bold ${card.badgeColorClass}`}>{card.badge}</span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold tracking-[0.02em] text-[#F5F2EB]">
                    {card.title}
                  </h3>

                  {/* Price Row */}
                  <div className="mt-4 mb-6 pb-5 border-b border-white/10 flex items-baseline gap-2">
                    <span className="font-sans tabular-nums text-4xl sm:text-[2.75rem] font-black tracking-tight gold-bevel-text">
                      {card.price}
                    </span>
                    <span className="font-mono text-xs font-bold tracking-[0.12em] text-[#A1A1AA]">
                      {card.unit}
                    </span>
                  </div>

                  {/* Available Tables / Capacity badge if present */}
                  {card.availableTablesBadge && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 mb-5 rounded-full bg-white/5 border border-white/10 font-mono text-[10px] tracking-[0.14em] text-[#F7DC88]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFE100] animate-pulse" />
                      <span>{card.availableTablesBadge}</span>
                    </div>
                  )}

                  {/* Bullet features */}
                  <ul className="space-y-3">
                    {card.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F5F2EB]/90 leading-snug">
                        <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <div className="mt-8 pt-2">
                  <button
                    type="button"
                    onClick={() => onSelectOption(card.title)}
                    className="group btn-gold-hover w-full inline-flex items-center justify-center px-6 py-3.5 min-h-[44px] rounded-full bg-gradient-to-r from-[#FFFDF2] via-[#F5D47A] to-[#C99A2E] hover:from-[#FFFFFF] hover:via-[#FFF0BC] hover:to-[#E2C062] text-[#09090B] text-xs font-extrabold tracking-[0.14em] uppercase shadow-[0_6px_22px_rgba(212,175,55,0.35)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <span>{card.id === 'ticket-entree' ? (isFr ? 'RÉSERVER' : 'RESERVE') : (isFr ? 'CHOISIR MA TABLE' : 'CHOOSE TABLE')}</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
