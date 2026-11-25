import { FormEvent, useState } from 'react';
import { MEDIA_ASSETS, VENUE_INFO } from '../data/nye2027Data';
import { SiteLanguage } from './Navbar';

export function Footer({ language = 'fr' }: { language?: SiteLanguage }) {
  const isFr = language === 'fr';
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'error' | 'success'>('idle');

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail.trim());
    if (!valid) {
      setNewsletterStatus('error');
      return;
    }
    setNewsletterStatus('success');
    setNewsletterEmail('');
  };

  return (
    <footer
      id="venue"
      className="border-t border-white/10 bg-[#050507] pt-16 pb-8 text-sm text-[#A1A1AA]"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14">
          {/* Column 1: 555 Tanger Logo */}
          <div className="lg:col-span-3 flex items-start">
            <a
              href="#top"
              aria-label="555 Tanger Marina Bay — Retour en haut"
              className="inline-flex items-start h-[96px] overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              <img
                src={MEDIA_ASSETS.logo.src}
                alt={MEDIA_ASSETS.logo.alt}
                referrerPolicy="no-referrer"
                className="h-[156px] w-auto max-w-none object-contain -mt-[16px]"
              />
            </a>
          </div>

          {/* Column 2: 555 TANGER */}
          <div className="lg:col-span-3">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#F5F2EB] mb-5">
              555 TANGER
            </p>
            <p className="text-sm text-[#F5F2EB]/90 leading-relaxed max-w-xs">
              {isFr
                ? 'Située à Tanger, notre discothèque 555 Famous Club vous accueille dans un cadre agréable et vous assure une ambiance branchée et feutrée.'
                : 'Located in Tangier, 555 Famous Club welcomes you into an iconic waterfront setting with a chic, high-energy nightlife atmosphere.'}
            </p>
          </div>

          {/* Column 3: NOS INFORMATIONS */}
          <div className="lg:col-span-3">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#F5F2EB] mb-5">
              {isFr ? 'NOS INFORMATIONS' : 'CONTACT DETAILS'}
            </p>
            <div className="space-y-4 text-sm text-[#F5F2EB]/90">
              <p className="font-mono tabular-nums">
                <a
                  href={`tel:${VENUE_INFO.phonePrimary.replace(/\s+/g, '')}`}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  {VENUE_INFO.phonePrimary}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${VENUE_INFO.email}`}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  {VENUE_INFO.email}
                </a>
              </p>
              <p>Blvd. Mohamed VI, Tanger</p>
            </div>
          </div>

          {/* Column 4: NEWSLETTER & SUIVEZ-NOUS */}
          <div className="lg:col-span-3">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#F5F2EB] mb-5">
              NEWSLETTER
            </p>
            <form onSubmit={handleSubscribe} noValidate>
              <label htmlFor="footer-newsletter-email" className="sr-only">
                Email
              </label>
              <input
                id="footer-newsletter-email"
                type="email"
                value={newsletterEmail}
                onChange={(e) => {
                  setNewsletterEmail(e.target.value);
                  if (newsletterStatus !== 'idle') setNewsletterStatus('idle');
                }}
                placeholder="Email"
                className="w-full px-3.5 py-2.5 min-h-[42px] bg-white text-[#09090B] placeholder:text-[#71717A] text-sm rounded-none focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
              <button
                type="submit"
                className="btn-gold-hover mt-3 inline-flex items-center justify-center px-5 py-2.5 min-h-[40px] bg-[#E2A832] hover:bg-[#EEB946] text-[#09090B] text-xs font-bold uppercase tracking-[0.06em] rounded-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF5D6]"
              >
                {isFr ? "S'ABONNER" : 'SUBSCRIBE'}
              </button>
              {newsletterStatus === 'error' && (
                <p className="mt-2 text-xs text-amber-400">
                  {isFr
                    ? 'Veuillez saisir une adresse email valide.'
                    : 'Please enter a valid email address.'}
                </p>
              )}
              {newsletterStatus === 'success' && (
                <p className="mt-2 text-xs text-[#D4AF37]">
                  {isFr
                    ? 'Merci ! Vous êtes inscrit à nos actualités VIP.'
                    : 'Thank you! You are subscribed to our VIP updates.'}
                </p>
              )}
            </form>

            <div className="mt-8">
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#F5F2EB] mb-3.5">
                {isFr ? 'SUIVEZ-NOUS' : 'FOLLOW US'}
              </p>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://www.facebook.com/555famousclubtanger/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook 555 Tanger"
                  className="btn-dark-hover w-8 h-8 bg-white text-[#09090B] hover:bg-[#D4AF37] rounded-[2px] inline-flex items-center justify-center"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                    <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
                  </svg>
                </a>

                <a
                  href="https://www.instagram.com/555famousclubtanger/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram 555 Tanger"
                  className="btn-dark-hover w-8 h-8 bg-white text-[#09090B] hover:bg-[#D4AF37] rounded-[2px] inline-flex items-center justify-center"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                <a
                  href="https://www.tiktok.com/@555tanger"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="TikTok 555 Tanger"
                  className="btn-dark-hover w-8 h-8 bg-white text-[#09090B] hover:bg-[#D4AF37] rounded-[2px] inline-flex items-center justify-center"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298 0 .593.046.877.136V9.4a6.33 6.33 0 0 0-.877-.061A6.34 6.34 0 0 0 3 15.67 6.34 6.34 0 0 0 9.34 22a6.34 6.34 0 0 0 6.34-6.33V8.7a8.18 8.18 0 0 0 4.78 1.52V6.78a4.84 4.84 0 0 1-.87-.09z" />
                  </svg>
                </a>

                <a
                  href="https://www.youtube.com/@555famousclub"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube 555 Tanger"
                  className="btn-dark-hover w-8 h-8 bg-white text-[#09090B] hover:bg-[#D4AF37] rounded-[2px] inline-flex items-center justify-center"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-white/10 text-center text-xs text-[#71717A]">
          <p>
            Copyright &copy; 2026 |{' '}
            <span className="text-[#F5F2EB] font-medium">555 Tanger</span> |{' '}
            {isFr ? 'Tous droits réservés' : 'All rights reserved'}
          </p>
        </div>
      </div>
    </footer>
  );
}
