import { useState } from 'react';
import { ArrowDownRight } from 'lucide-react';
import { MotionConfig, motion } from 'motion/react';
import { BonbonBurst } from './components/BonbonBurst';
import { CountdownTimer } from './components/CountdownTimer';
import { EnterFrequencySection } from './components/EnterFrequencySection';
import { EventsShowcaseSection } from './components/EventsShowcaseSection';
import { Footer } from './components/Footer';
import { GallerySection } from './components/GallerySection';
import { HeroMusicWave } from './components/HeroMusicWave';
import { InstagramSection } from './components/InstagramSection';
import { InteractiveFloorPlanSection } from './components/InteractiveFloorPlanSection';
import { MusicWaveHeroTitle } from './components/MusicWaveHeroTitle';
import { Navbar, SiteLanguage } from './components/Navbar';
import { NightFrequencySection } from './components/NightFrequencySection';
import { NightScheduleSection } from './components/NightScheduleSection';
import { OpeningFireworks } from './components/OpeningFireworks';
import { ResilientImage } from './components/ResilientImage';
import { ThreeChannelsSection } from './components/ThreeChannelsSection';
import { VipPackagesAndBooking } from './components/VipPackagesAndBooking';
import { PricingCardsSection } from './components/PricingCardsSection';
import { MEDIA_ASSETS } from './data/nye2027Data';

export default function App() {
  const [selectedFloorTableNumber, setSelectedFloorTableNumber] = useState<number | null>(null);
  const [fireworksTrigger, setFireworksTrigger] = useState<number>(0);
  const [emblemBurst, setEmblemBurst] = useState<number>(1);
  const [discountBurst, setDiscountBurst] = useState<number>(0);
  const [vipBurst, setVipBurst] = useState<number>(0);
  const [language, setLanguage] = useState<SiteLanguage>('fr');
  const [videoError, setVideoError] = useState<boolean>(false);

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div id="top" className="min-h-screen bg-[#09090B] text-[#F5F2EB] flex flex-col">
        <OpeningFireworks triggerKey={fireworksTrigger} />
        <Navbar
          onReserveClick={() => scrollToSection('reserve')}
          language={language}
          onLanguageChange={setLanguage}
        />

        <main className="flex-1">
          {/* Hero Section with Cover Video & Centered Gold 555 NYE 2027 Centerpiece */}
          <section className="relative min-h-[780px] lg:min-h-[860px] pt-[78px] flex flex-col items-center justify-center overflow-hidden border-b border-white/10">
            {/* Background Cover Video + Poster / Image Fallback + Contrast Scrim */}
            <div className="absolute inset-0">
              {videoError ? (
                <ResilientImage
                  src={MEDIA_ASSETS.hero.src}
                  alt={MEDIA_ASSETS.hero.alt}
                  fallbackTitle="555 Famous Club Tanger — New Year 2027"
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={MEDIA_ASSETS.heroVideo.poster}
                  onError={() => setVideoError(true)}
                  aria-hidden="true"
                  className="w-full h-full object-cover object-center"
                >
                  <source src={MEDIA_ASSETS.heroVideo.src} type="video/mp4" />
                </video>
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-[#09090B]/65 via-[#09090B]/45 to-[#09090B]" />
            </div>

            <div className="relative z-10 max-w-[1160px] w-full mx-auto px-4 sm:px-8 py-10 sm:py-14 flex flex-col items-center text-center">
              {/* Big Gold Music-Wave Display Headline (replaces center emblem picture) */}
              <MusicWaveHeroTitle
                language={language}
                burstKey={emblemBurst}
                onTriggerBurst={() => setEmblemBurst((c) => c + 1)}
              />

              {/* Dual CTA Buttons with Hover Bonbon Explosion */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-20 mt-8 mb-8 flex flex-wrap items-center justify-center gap-4"
              >
                <div className="relative inline-flex">
                  <BonbonBurst triggerKey={discountBurst} variant="button" />
                  <motion.button
                    type="button"
                    onMouseEnter={() => setDiscountBurst((c) => c + 1)}
                    onFocus={() => setDiscountBurst((c) => c + 1)}
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 460, damping: 22 }}
                    onClick={() => scrollToSection('reserve')}
                    className="group btn-gold-hover relative z-10 inline-flex items-center justify-center gap-2 px-7 py-3.5 min-h-[44px] rounded-full bg-gradient-to-r from-[#FFFDF2] via-[#F5D47A] to-[#C99A2E] hover:from-[#FFFFFF] hover:via-[#FFF0BC] hover:to-[#E2C062] text-[#09090B] text-sm font-extrabold tracking-[0.14em] uppercase whitespace-nowrap shrink-0 cursor-pointer shadow-[0_6px_22px_rgba(212,175,55,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <span>Claim Holiday Discount</span>
                    <ArrowDownRight
                      className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                      aria-hidden="true"
                    />
                  </motion.button>
                </div>

                <div className="relative inline-flex">
                  <BonbonBurst triggerKey={vipBurst} variant="button" />
                  <motion.a
                    href="#floor-plan"
                    onMouseEnter={() => setVipBurst((c) => c + 1)}
                    onFocus={() => setVipBurst((c) => c + 1)}
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 460, damping: 22 }}
                    className="btn-gold-outline-hover relative z-10 inline-flex items-center justify-center px-7 py-3.5 min-h-[44px] rounded-full bg-transparent border-2 border-[#F5D47A] text-[#F7DC88] hover:bg-[#D4AF37]/20 hover:text-white text-sm font-extrabold tracking-[0.14em] uppercase whitespace-nowrap shrink-0 shadow-[0_6px_22px_rgba(212,175,55,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    Explore VIP Tables
                  </motion.a>
                </div>
              </motion.div>

              {/* Signal Countdown Card */}
              <motion.div
                id="minuit"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-20 w-full max-w-[540px] mx-auto flex justify-center"
              >
                <CountdownTimer language={language} />
              </motion.div>

              {/* Big Gold Wave of Music */}
              <HeroMusicWave />
            </div>
          </section>

          <NightFrequencySection language={language} />

          <EventsShowcaseSection
            language={language}
            onContactClick={() => scrollToSection('reserve')}
          />

          <ThreeChannelsSection language={language} />

          <EnterFrequencySection language={language} />

          <NightScheduleSection language={language} />

          <GallerySection />

          <InstagramSection language={language} />

          <PricingCardsSection
            language={language}
            onSelectOption={() => {
              scrollToSection('floor-plan');
            }}
          />

          <InteractiveFloorPlanSection
            language={language}
            selectedTableNumber={selectedFloorTableNumber}
            onSelectTable={(num) => setSelectedFloorTableNumber(num)}
            onProceedToForm={() => scrollToSection('reserve')}
          />

          <VipPackagesAndBooking
            language={language}
            selectedFloorTableNumber={selectedFloorTableNumber}
            onSelectFloorTable={setSelectedFloorTableNumber}
            onTriggerFireworks={() => setFireworksTrigger((prev) => prev + 1)}
          />
        </main>

        <Footer language={language} />
      </div>
    </MotionConfig>
  );
}
