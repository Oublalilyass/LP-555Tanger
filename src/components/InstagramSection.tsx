import { useState } from 'react';
import { Instagram } from 'lucide-react';
import { motion } from 'motion/react';
import {
  INSTAGRAM_EXTRA_POSTS,
  INSTAGRAM_POSTS,
  INSTAGRAM_URL,
  PARTNER_LOGOS,
} from '../data/nye2027Data';
import { SiteLanguage } from './Navbar';
import { ResilientImage } from './ResilientImage';

export function InstagramSection({ language = 'fr' }: { language?: SiteLanguage }) {
  const [showMore, setShowMore] = useState(false);
  const isFr = language === 'fr';

  const visiblePosts = showMore
    ? [...INSTAGRAM_POSTS, ...INSTAGRAM_EXTRA_POSTS]
    : INSTAGRAM_POSTS;

  return (
    <section
      id="instagram"
      aria-label="Suivez-nous sur Instagram — 555 Famous Club Tanger"
      className="bg-[#09090B] py-16 sm:py-24 border-b border-white/10"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        {/* Centered Gold Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="font-sans text-3xl sm:text-5xl font-extrabold tracking-[0.02em] gold-bevel-text text-balance">
            {isFr ? 'Suivez-nous sur Instagram !' : 'Follow Us on Instagram!'}
          </h2>
        </motion.div>

        {/* 4-Column Square Instagram Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {visiblePosts.map((post, index) => (
            <motion.a
              key={post.id}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              aria-label={post.alt}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.45,
                delay: (index % 4) * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative aspect-square w-full overflow-hidden bg-[#111114] border border-white/10 hover:border-[#D4AF37]/70 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              <ResilientImage
                src={post.src}
                alt={post.alt}
                fallbackTitle="555 Tanger Instagram"
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/10 transition-colors duration-200" />
            </motion.a>
          ))}
        </div>

        {/* Centered Load More & Follow on Instagram Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setShowMore((prev) => !prev)}
            className="btn-gold-hover inline-flex items-center justify-center px-7 py-3 min-h-[44px] rounded-full bg-gradient-to-r from-[#FFFDF2] via-[#F5D47A] to-[#C99A2E] hover:from-[#FFFFFF] hover:via-[#FFF0BC] hover:to-[#E2C062] text-[#09090B] text-xs sm:text-sm font-extrabold tracking-[0.14em] uppercase whitespace-nowrap shrink-0 cursor-pointer shadow-[0_6px_22px_rgba(212,175,55,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {showMore
              ? isFr
                ? 'Voir moins'
                : 'Show Less'
              : isFr
                ? 'Charger plus'
                : 'Load More'}
          </button>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-gold-hover inline-flex items-center justify-center gap-2 px-7 py-3 min-h-[44px] rounded-full bg-gradient-to-r from-[#FFFDF2] via-[#F5D47A] to-[#C99A2E] hover:from-[#FFFFFF] hover:via-[#FFF0BC] hover:to-[#E2C062] text-[#09090B] text-xs sm:text-sm font-extrabold tracking-[0.14em] uppercase whitespace-nowrap shrink-0 cursor-pointer shadow-[0_6px_22px_rgba(212,175,55,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Instagram className="w-4 h-4 text-[#09090B]" aria-hidden="true" />
            <span>{isFr ? 'Suivre sur Instagram' : 'Follow on Instagram'}</span>
          </a>
        </div>

        {/* Bottom Hospitality Group Partner Logos */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 sm:mt-20 pt-8 border-t border-white/5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center"
        >
          {PARTNER_LOGOS.map((partner) => (
            <div
              key={partner.id}
              className="flex items-center justify-center h-14 sm:h-16 px-2 opacity-85 hover:opacity-100 hover:-translate-y-0.5 transition-[opacity,transform] duration-200"
            >
              <img
                src={partner.src}
                alt={partner.name}
                referrerPolicy="no-referrer"
                className="max-h-12 sm:max-h-14 w-auto object-contain select-none"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
