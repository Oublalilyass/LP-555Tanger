import { useMemo, useState } from 'react';
import { ArrowDownRight, Check, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  FLOOR_TABLES,
  FLOOR_TABLE_TIERS,
  FloorTableItem,
  FloorTableTierKey,
  MEDIA_ASSETS,
} from '../data/nye2027Data';

import { SiteLanguage } from './Navbar';

interface InteractiveFloorPlanSectionProps {
  selectedTableNumber: number | null;
  onSelectTable: (tableNumber: number) => void;
  onProceedToForm: () => void;
  language?: SiteLanguage;
}

function formatMad(amount: number): string {
  return `${amount.toLocaleString('fr-FR')} DH`;
}

export function InteractiveFloorPlanSection({
  selectedTableNumber,
  onSelectTable,
  onProceedToForm,
  language = 'fr',
}: InteractiveFloorPlanSectionProps) {
  const isFr = language === 'fr';
  const [hoveredTable, setHoveredTable] = useState<FloorTableItem | null>(null);
  const [activeTierFilter, setActiveTierFilter] = useState<FloorTableTierKey | 'all'>('all');

  const selectedTable = useMemo(
    () => FLOOR_TABLES.find((t) => t.number === selectedTableNumber) || null,
    [selectedTableNumber]
  );

  const previewTable = hoveredTable || selectedTable;

  const filteredTables = useMemo(
    () =>
      activeTierFilter === 'all'
        ? FLOOR_TABLES
        : FLOOR_TABLES.filter((t) => t.tierKey === activeTierFilter),
    [activeTierFilter]
  );

  const handleTableClick = (table: FloorTableItem) => {
    onSelectTable(table.number);
    window.setTimeout(() => {
      onProceedToForm();
    }, 240);
  };

  return (
    <section
      id="floor-plan"
      aria-label="Plan des tables et tarifs Réveillon du 31 Décembre"
      className="relative bg-[#0B0B0E] py-20 sm:py-24 border-b border-white/10"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <p className="text-xs font-medium text-[#D4AF37] mb-3 tracking-wide">
            {isFr
              ? 'Plan Interactif · Réveillon 31 Décembre'
              : "Interactive Floor Plan · New Year's Eve Dec 31"}
          </p>
          <h2 className="font-sans text-3xl sm:text-5xl font-extrabold tracking-[0.03em] gold-bevel-text text-balance">
            {isFr ? 'Plan des Tables & Tarifs' : 'Floor Plan & Table Rates'}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
            {isFr
              ? 'Survolez une table sur le plan pour afficher son tarif exact, puis cliquez dessus pour la sélectionner automatiquement dans le formulaire de réservation.'
              : 'Hover over any table on the map to inspect its exact rate, then click to select it automatically in the reservation form.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left: Interactive Floor Plan Picture with 65 Hoverable Table Hotspots */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="relative w-full max-w-[650px] mx-auto rounded-sm border border-[#D4AF37]/30 bg-[#09090B] shadow-[0_24px_64px_rgba(0,0,0,0.7)]">
              <div className="relative w-full aspect-[644/1024]">
                <img
                  src={MEDIA_ASSETS.floorPlan.src}
                  alt={MEDIA_ASSETS.floorPlan.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain select-none rounded-sm"
                />

                {/* Interactive Hotspots over every numbered table 1–65 */}
                {FLOOR_TABLES.map((table) => {
                  const isHovered = hoveredTable?.number === table.number;
                  const isSelected = selectedTableNumber === table.number;
                  const isDimmed =
                    activeTierFilter !== 'all' &&
                    table.tierKey !== activeTierFilter &&
                    !isSelected &&
                    !isHovered;

                  const tooltipAlignClass =
                    table.x < 24
                      ? 'left-0'
                      : table.x > 76
                        ? 'right-0'
                        : 'left-1/2 -translate-x-1/2';

                  const tooltipVerticalClass =
                    table.y < 26 ? 'top-full mt-2.5' : 'bottom-full mb-2.5';

                  return (
                    <div
                      key={table.number}
                      style={{
                        left: `${table.x}%`,
                        top: `${table.y}%`,
                        width: `${table.w}%`,
                        height: `${table.h}%`,
                      }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 ${
                        isHovered ? 'z-40' : isSelected ? 'z-30' : 'z-10'
                      }`}
                    >
                      <motion.button
                        type="button"
                        onClick={() => handleTableClick(table)}
                        onMouseEnter={() => setHoveredTable(table)}
                        onMouseLeave={() =>
                          setHoveredTable((prev) =>
                            prev?.number === table.number ? null : prev
                          )
                        }
                        onFocus={() => setHoveredTable(table)}
                        onBlur={() =>
                          setHoveredTable((prev) =>
                            prev?.number === table.number ? null : prev
                          )
                        }
                        aria-label={`${table.label} — ${formatMad(table.priceMad)} — ${table.bottles}. Cliquer pour réserver.`}
                        aria-pressed={isSelected}
                        whileHover={{ scale: 1.24 }}
                        whileTap={{ scale: 0.94 }}
                        transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                        className={`w-full h-full rounded-[3px] cursor-pointer transition-opacity duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF3C4] ${
                          isSelected
                            ? 'ring-2 ring-[#FFF3C4] bg-[#D4AF37]/30 shadow-[0_0_18px_rgba(212,175,55,0.95)]'
                            : isHovered
                              ? 'ring-2 ring-[#F7DC88] bg-white/15 shadow-[0_0_16px_rgba(247,220,136,0.85)]'
                              : activeTierFilter !== 'all' && !isDimmed
                                ? 'ring-1 ring-white/80 bg-white/10'
                                : isDimmed
                                  ? 'bg-black/55 opacity-80'
                                  : 'bg-transparent hover:bg-white/10'
                        }`}
                      >
                        <span className="sr-only">
                          {table.label} ({formatMad(table.priceMad)})
                        </span>
                      </motion.button>

                      {/* Animated Selected Pulse Ring */}
                      {isSelected && (
                        <motion.span
                          aria-hidden="true"
                          initial={{ opacity: 0.8, scale: 1 }}
                          animate={{ opacity: [0.85, 0.15, 0.85], scale: [1, 1.32, 1] }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                          className="pointer-events-none absolute -inset-1 rounded-[4px] border-2 border-[#FFF3C4]"
                        />
                      )}

                      {/* Animated Hover / Focus Price Tooltip */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            role="tooltip"
                            initial={{ opacity: 0, y: table.y < 26 ? -6 : 6, scale: 0.94 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: table.y < 26 ? -4 : 4, scale: 0.95 }}
                            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                            className={`pointer-events-none absolute ${tooltipVerticalClass} ${tooltipAlignClass} w-52 sm:w-56 p-3 rounded-sm bg-[#09090B]/95 backdrop-blur-md border border-[#D4AF37] shadow-[0_14px_34px_rgba(0,0,0,0.9)] text-left`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F5F2EB]">
                                <span
                                  aria-hidden="true"
                                  style={{ backgroundColor: table.swatchHex }}
                                  className="w-2.5 h-2.5 rounded-xs shrink-0 border border-white/30"
                                />
                                {table.label}
                              </span>
                              <span className="font-mono tabular-nums text-xs font-extrabold text-[#F7DC88]">
                                {formatMad(table.priceMad)}
                              </span>
                            </div>
                            <p className="mt-1 text-[11px] text-[#D4AF37] font-medium">
                              {table.bottles}
                            </p>
                            <p className="mt-0.5 text-[11px] text-[#A1A1AA]">
                              {table.zone} · {table.capacity}
                            </p>
                            <p className="mt-1.5 pt-1.5 border-t border-white/10 text-[10px] font-semibold text-[#F5F2EB]/90">
                              {isFr
                                ? 'Cliquer pour sélectionner & réserver'
                                : 'Click to select & reserve'}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right: Live Price Inspector, Tier Filter & Direct Table Selection */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            {/* Dynamic Hover / Selected Table Preview Card */}
            <div className="p-6 bg-[#111114] border border-[#D4AF37]/40 rounded-sm">
              <div className="flex items-center justify-between gap-2 text-xs text-[#D4AF37] mb-3">
                <span className="inline-flex items-center gap-1.5 font-semibold">
                  <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                  {hoveredTable
                    ? isFr
                      ? 'Tarif au survol'
                      : 'Table Rate Preview'
                    : selectedTable
                      ? isFr
                        ? 'Table sélectionnée pour réservation'
                        : 'Selected Table for Booking'
                      : isFr
                        ? 'Sélectionnez une table'
                        : 'Select a Table'}
                </span>
                {selectedTable && (
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    {isFr ? 'Ajoutée au formulaire' : 'Added to form'}
                  </span>
                )}
              </div>

              <AnimatePresence mode="wait">
                {previewTable ? (
                  <motion.div
                    key={previewTable.number}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#F5F2EB] flex items-center gap-2.5">
                        <span
                          aria-hidden="true"
                          style={{ backgroundColor: previewTable.swatchHex }}
                          className="w-3.5 h-3.5 rounded-xs shrink-0 border border-white/30"
                        />
                        {previewTable.label}
                      </h3>
                      <span className="font-mono tabular-nums text-2xl font-extrabold text-[#F7DC88]">
                        {formatMad(previewTable.priceMad)}
                      </span>
                    </div>

                    <dl className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <dt className="text-[#A1A1AA]">{isFr ? 'Inclus' : 'Included'}</dt>
                        <dd className="mt-0.5 font-medium text-[#F5F2EB]">
                          {previewTable.bottles}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[#A1A1AA]">{isFr ? 'Capacité' : 'Capacity'}</dt>
                        <dd className="mt-0.5 font-medium text-[#F5F2EB]">
                          {previewTable.capacity}
                        </dd>
                      </div>
                      <div className="col-span-2">
                        <dt className="text-[#A1A1AA]">{isFr ? 'Emplacement' : 'Location'}</dt>
                        <dd className="mt-0.5 font-medium text-[#F5F2EB]">
                          {previewTable.zone}
                        </dd>
                      </div>
                    </dl>

                    {selectedTable && (
                      <button
                        type="button"
                        onClick={onProceedToForm}
                        className="group btn-gold-hover mt-5 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[46px] rounded-full bg-gradient-to-r from-[#FFFDF2] via-[#F5D47A] to-[#C99A2E] hover:from-[#FFFFFF] hover:via-[#FFF0BC] hover:to-[#E2C062] text-[#09090B] text-xs font-extrabold tracking-[0.14em] uppercase shadow-[0_6px_22px_rgba(212,175,55,0.35)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      >
                        <span>
                          {isFr
                            ? `Compléter mes infos pour ${selectedTable.label}`
                            : `Complete booking for ${selectedTable.label}`}
                        </span>
                        <ArrowDownRight
                          className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                          aria-hidden="true"
                        />
                      </button>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-2"
                  >
                    <p className="text-sm text-[#F5F2EB]/90 leading-relaxed">
                      {isFr
                        ? "Passez la souris sur n'importe quelle table (#1 à #65) sur l'image pour voir le tarif et la formule, puis cliquez pour la réserver."
                        : 'Hover over any table (#1 to #65) on the floor plan to view its rate and package, then click to reserve.'}
                    </p>
                    <p className="mt-2 text-xs text-[#A1A1AA]">
                      {isFr
                        ? "Ticket d'entrée : 700 DH avec consommation · Personne en plus à une table : 700 DH / pers."
                        : 'Entry ticket: 700 DH with drink · Extra guest at a table: 700 DH / person'}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Interactive Price Tier Filter + Quick Numbered Table Chips */}
            <div className="p-6 bg-[#111114] border border-white/10 rounded-sm">
              <div className="flex items-center justify-between gap-2 mb-4">
                <h3 className="text-sm font-semibold text-[#F5F2EB]">
                  {isFr
                    ? 'Tarifs des Tables (6 pers. / table)'
                    : 'Table Rates (6 guests / table)'}
                </h3>
                {activeTierFilter !== 'all' && (
                  <button
                    type="button"
                    onClick={() => setActiveTierFilter('all')}
                    className="text-xs text-[#D4AF37] hover:underline cursor-pointer"
                  >
                    {isFr ? 'Tout afficher' : 'Show all'}
                  </button>
                )}
              </div>

              <div className="space-y-2 mb-5">
                {FLOOR_TABLE_TIERS.map((tier) => {
                  const isActiveTier = activeTierFilter === tier.key;
                  return (
                    <button
                      key={tier.key}
                      type="button"
                      onClick={() =>
                        setActiveTierFilter((curr) => (curr === tier.key ? 'all' : tier.key))
                      }
                      className={`btn-dark-hover w-full flex items-center justify-between gap-3 p-2.5 rounded-sm border text-left cursor-pointer ${
                        isActiveTier
                          ? 'bg-[#1A1A1F] border-[#D4AF37]'
                          : 'bg-[#09090B] border-white/10 hover:border-white/25'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          aria-hidden="true"
                          style={{ backgroundColor: tier.swatchHex }}
                          className="w-3.5 h-3.5 rounded-xs shrink-0 border border-white/30"
                        />
                        <div className="min-w-0">
                          <span className="block text-xs font-semibold text-[#F5F2EB] truncate">
                            {tier.title} · {tier.bottles}
                          </span>
                          <span className="block text-[11px] text-[#A1A1AA] truncate">
                            {tier.tableRange}
                          </span>
                        </div>
                      </div>
                      <span className="font-mono tabular-nums text-xs font-bold text-[#F7DC88] shrink-0">
                        {formatMad(tier.priceMad)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Scrollable Numbered Quick-Select Grid for Mobile & Fast Picking */}
              <div>
                <p className="text-xs text-[#A1A1AA] mb-2.5">
                  {isFr
                    ? `Sélection rapide par numéro (${filteredTables.length} tables) :`
                    : `Quick select by table number (${filteredTables.length} tables):`}
                </p>
                <div className="grid grid-cols-7 sm:grid-cols-8 gap-1.5 max-h-[190px] overflow-y-auto pr-1">
                  {filteredTables.map((table) => {
                    const isSelected = selectedTableNumber === table.number;
                    return (
                      <button
                        key={table.number}
                        type="button"
                        onMouseEnter={() => setHoveredTable(table)}
                        onMouseLeave={() =>
                          setHoveredTable((prev) =>
                            prev?.number === table.number ? null : prev
                          )
                        }
                        onClick={() => handleTableClick(table)}
                        title={`${table.label} — ${formatMad(table.priceMad)}`}
                        className={`h-8 text-xs font-mono font-semibold rounded-xs border transition-transform duration-150 hover:scale-105 cursor-pointer flex items-center justify-center gap-1 ${
                          isSelected
                            ? 'bg-[#D4AF37] text-[#09090B] border-[#FFF3C4]'
                            : 'bg-[#09090B] text-[#F5F2EB] border-white/15 hover:border-[#D4AF37]'
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          style={{ backgroundColor: table.swatchHex }}
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                        />
                        {table.number}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
