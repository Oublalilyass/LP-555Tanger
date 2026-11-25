import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'motion/react';
import { MEDIA_ASSETS } from '../data/nye2027Data';

export type SiteLanguage = 'fr' | 'en';

interface NavbarProps {
  onReserveClick: () => void;
  language: SiteLanguage;
  onLanguageChange: (lang: SiteLanguage) => void;
}

const NAV_LINKS: { id: string; labelFr: string; labelEn: string; href: string }[] = [
  { id: 'experience', labelFr: "L'expérience", labelEn: 'The Experience', href: '#experience' },
  { id: 'schedule', labelFr: 'Programme', labelEn: 'Program', href: '#schedule' },
  { id: 'minuit', labelFr: 'Minuit', labelEn: 'Midnight', href: '#minuit' },
  { id: 'pricing-cards', labelFr: 'Offres', labelEn: 'Offers', href: '#pricing-cards' },
  { id: 'floor-plan', labelFr: 'Plan de salle', labelEn: 'Floor Plan', href: '#floor-plan' },
];

export function Navbar({
  onReserveClick,
  language,
  onLanguageChange,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('floor-plan');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 36);

      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 24;
      if (atBottom) {
        setActiveId('venue');
        return;
      }

      const scrollPos = window.scrollY + 200;
      const positioned = NAV_LINKS.map((link) => {
        const el = document.getElementById(link.id);
        return el ? { id: link.id, top: el.getBoundingClientRect().top + window.scrollY } : null;
      })
        .filter((item): item is { id: string; top: number } => item !== null)
        .sort((a, b) => b.top - a.top);

      for (const item of positioned) {
        if (item.top <= scrollPos) {
          setActiveId(item.id);
          return;
        }
      }

      setActiveId('floor-plan');
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (id: string, href: string) => {
    setActiveId(id);
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'bg-[#09090B]/92 backdrop-blur-md border-b border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.55)]'
          : 'bg-gradient-to-b from-[#09090B]/85 via-[#09090B]/45 to-transparent backdrop-blur-[2px]'
      }`}
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 h-[78px] flex items-center justify-between gap-6">
        {/* Zone 1: Brand Logo */}
        <a
          href="#top"
          aria-label="555 Tanger Marina Bay — Home"
          className="inline-flex items-start shrink-0 h-[56px] sm:h-[60px] overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFE100]"
        >
          <img
            src={MEDIA_ASSETS.logo.src}
            alt={MEDIA_ASSETS.logo.alt}
            loading="eager"
            referrerPolicy="no-referrer"
            className="h-[92px] sm:h-[98px] w-auto max-w-none object-contain -mt-[10px] sm:-mt-[11px]"
          />
        </a>

        {/* Zone 2: Spaced Uppercase Gold Links with White Hover and Golden Music Wave Underline */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-8 xl:gap-10"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.id;
            const label = language === 'fr' ? link.labelFr : link.labelEn;

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.id, link.href);
                }}
                className={`relative py-2 font-hero text-[11px] tracking-[0.18em] uppercase whitespace-nowrap shrink-0 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFE100] ${
                  isActive
                    ? 'text-white font-extrabold drop-shadow-[0_0_14px_rgba(255,225,0,0.6)]'
                    : 'text-[#F5DC90] hover:text-white'
                }`}
              >
                <span>{label}</span>
                {isActive && (
                  <motion.span
                    layoutId="navbar-active-underline"
                    transition={{ type: 'spring', stiffness: 460, damping: 32 }}
                    className="absolute left-0 right-0 -bottom-1 h-[2px] bg-gradient-to-r from-[#B8862D] via-[#FFE100] to-[#FFF5D6] shadow-[0_0_10px_rgba(255,225,0,0.8)] pointer-events-none"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: FR / EN Pill Switcher + Rounded Yellow-Gold RÉSERVER CTA */}
        <div className="flex items-center gap-3.5 shrink-0">
          <div
            role="group"
            aria-label="Language switcher"
            className="hidden sm:inline-flex items-center p-1 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm"
          >
            <button
              type="button"
              onClick={() => onLanguageChange('fr')}
              aria-pressed={language === 'fr'}
              className={`px-3 py-1 rounded-full font-mono text-[11px] font-bold tracking-[0.12em] transition-colors duration-150 cursor-pointer ${
                language === 'fr'
                  ? 'bg-white text-[#09090B]'
                  : 'text-[#F5F2EB]/75 hover:text-[#F5F2EB]'
              }`}
            >
              FR
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              aria-pressed={language === 'en'}
              className={`px-3 py-1 rounded-full font-mono text-[11px] font-bold tracking-[0.12em] transition-colors duration-150 cursor-pointer ${
                language === 'en'
                  ? 'bg-white text-[#09090B]'
                  : 'text-[#F5F2EB]/75 hover:text-[#F5F2EB]'
              }`}
            >
              EN
            </button>
          </div>

          <button
            type="button"
            onClick={onReserveClick}
            className="hidden sm:inline-flex btn-gold-hover items-center justify-center px-7 py-3 min-h-[42px] rounded-full bg-gradient-to-r from-[#FFFDF2] via-[#F5D47A] to-[#C99A2E] hover:from-[#FFFFFF] hover:via-[#FFF0BC] hover:to-[#E2C062] text-[#09090B] text-xs font-extrabold tracking-[0.14em] uppercase whitespace-nowrap shrink-0 cursor-pointer shadow-[0_6px_22px_rgba(212,175,55,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {language === 'fr' ? 'RÉSERVER' : 'RESERVE'}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden btn-dark-hover inline-flex items-center justify-center w-11 h-11 text-[#F5F2EB] border border-white/20 rounded-full hover:border-[#FFE100]/70 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFE100]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#09090B]/95 backdrop-blur-md px-4 py-5 space-y-2">
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.id;
            const label = language === 'fr' ? link.labelFr : link.labelEn;
            return (
              <button
                key={link.href}
                type="button"
                onClick={() => handleNavClick(link.id, link.href)}
                className={`w-full text-left px-3 py-2.5 min-h-[44px] font-mono text-xs tracking-[0.2em] uppercase flex items-center justify-between cursor-pointer ${
                  isActive ? 'text-[#FFE100] font-bold' : 'text-[#E2C062]'
                }`}
              >
                <span>{label}</span>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-[#FFE100] shadow-[0_0_8px_rgba(255,225,0,0.8)]" />
                )}
              </button>
            );
          })}

          <div className="pt-3 flex items-center justify-between gap-3 border-t border-white/10">
            <div className="inline-flex items-center p-1 rounded-full border border-white/20 bg-white/5">
              <button
                type="button"
                onClick={() => onLanguageChange('fr')}
                className={`px-3 py-1.5 rounded-full font-mono text-xs font-bold cursor-pointer ${
                  language === 'fr' ? 'bg-white text-[#09090B]' : 'text-[#F5F2EB]/75'
                }`}
              >
                FR
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`px-3 py-1.5 rounded-full font-mono text-xs font-bold cursor-pointer ${
                  language === 'en' ? 'bg-white text-[#09090B]' : 'text-[#F5F2EB]/75'
                }`}
              >
                EN
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onReserveClick();
              }}
              className="flex-1 btn-gold-hover py-3 px-5 min-h-[44px] rounded-full bg-gradient-to-r from-[#FFFDF2] via-[#F5D47A] to-[#C99A2E] text-[#09090B] text-xs font-extrabold tracking-[0.14em] uppercase cursor-pointer"
            >
              {language === 'fr' ? 'RÉSERVER' : 'RESERVE'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
