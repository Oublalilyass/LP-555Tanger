import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { GALLERY_PHOTOS } from '../data/nye2027Data';
import { ResilientImage } from './ResilientImage';

const NYE_SPARKLES = [
  { id: 'sp-1', left: '8%', top: '14%', size: 6, delay: 0, duration: 4.4 },
  { id: 'sp-2', left: '19%', top: '26%', size: 4, delay: 0.7, duration: 5.1 },
  { id: 'sp-3', left: '34%', top: '10%', size: 5, delay: 1.4, duration: 4.8 },
  { id: 'sp-4', left: '52%', top: '18%', size: 6, delay: 0.3, duration: 5.4 },
  { id: 'sp-5', left: '68%', top: '12%', size: 4, delay: 1.1, duration: 4.6 },
  { id: 'sp-6', left: '82%', top: '22%', size: 5, delay: 0.9, duration: 5.0 },
  { id: 'sp-7', left: '92%', top: '15%', size: 6, delay: 1.8, duration: 4.5 },
  { id: 'sp-8', left: '44%', top: '8%', size: 4, delay: 2.1, duration: 5.2 },
];

export function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const closeModal = useCallback(() => setSelectedIndex(null), []);

  const showPrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length
    );
  }, []);

  const showNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev + 1) % GALLERY_PHOTOS.length
    );
  }, []);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedIndex, closeModal, showPrev, showNext]);

  const activePhoto = selectedIndex !== null ? GALLERY_PHOTOS[selectedIndex] : null;

  return (
    <section
      id="galerie"
      aria-label="Galerie 555 Famous Club Tanger"
      className="relative overflow-hidden bg-[#09090B] py-20 sm:py-24 border-b border-white/10"
    >
      {/* Subtle Champagne-Gold New Year Floating Sparkle Particles */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {NYE_SPARKLES.map((sparkle) => (
          <motion.span
            key={sparkle.id}
            style={{
              left: sparkle.left,
              top: sparkle.top,
              width: sparkle.size,
              height: sparkle.size,
            }}
            animate={{
              y: [0, -18, 0],
              opacity: [0.15, 0.85, 0.15],
              scale: [0.85, 1.25, 0.85],
            }}
            transition={{
              duration: sparkle.duration,
              delay: sparkle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute rounded-full bg-[#F3D478] shadow-[0_0_12px_rgba(212,175,55,0.85)]"
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6">
        {/* 4x2 Larger Gallery Grid with Staggered New Year Animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {GALLERY_PHOTOS.map((photo, index) => (
            <motion.button
              key={photo.id}
              type="button"
              onClick={() => setSelectedIndex(index)}
              initial={{ opacity: 0, y: 22, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: (index % 4) * 0.08 + Math.floor(index / 4) * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              aria-label={`View ${photo.caption}`}
              className="group relative aspect-square w-full overflow-hidden bg-[#111114] border border-white/10 hover:border-[#D4AF37]/70 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              <ResilientImage
                src={photo.src}
                alt={photo.alt}
                fallbackTitle={photo.caption}
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
              />

              {/* Subtle champagne-gold hover sweep & caption scrim */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#09090B]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-4 text-left">
                <div>
                  <span className="block text-[11px] font-mono tabular-nums text-[#D4AF37]">
                    0{index + 1} / 2027
                  </span>
                  <span className="mt-0.5 block text-sm font-medium text-[#F5F2EB]">
                    {photo.caption}
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Interactive Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && selectedIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={activePhoto.caption}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={closeModal}
            className="fixed inset-0 z-50 bg-[#09090B]/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#111114] border border-[#D4AF37]/30 overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10">
                <div className="flex items-center gap-3 text-xs sm:text-sm">
                  <span className="font-mono tabular-nums text-[#D4AF37]">
                    0{selectedIndex + 1} / 0{GALLERY_PHOTOS.length}
                  </span>
                  <span aria-hidden="true" className="text-white/30">
                    ·
                  </span>
                  <span className="font-medium text-[#F5F2EB]">
                    {activePhoto.caption}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Close gallery preview"
                  className="btn-dark-hover inline-flex items-center justify-center w-10 h-10 text-[#A1A1AA] hover:text-[#F5F2EB] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative bg-[#09090B] flex items-center justify-center max-h-[75vh]">
                <img
                  src={activePhoto.src}
                  alt={activePhoto.alt}
                  referrerPolicy="no-referrer"
                  className="max-h-[75vh] w-auto object-contain"
                />

                <button
                  type="button"
                  onClick={showPrev}
                  aria-label="Previous photo"
                  className="btn-dark-hover absolute left-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-11 h-11 bg-[#09090B]/80 hover:bg-[#D4AF37] text-[#F5F2EB] hover:text-[#09090B] border border-white/15 rounded-sm cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Next photo"
                  className="btn-dark-hover absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-11 h-11 bg-[#09090B]/80 hover:bg-[#D4AF37] text-[#F5F2EB] hover:text-[#09090B] border border-white/15 rounded-sm cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
