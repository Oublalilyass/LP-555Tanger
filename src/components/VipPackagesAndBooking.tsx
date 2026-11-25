import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  Mail,
  MessageCircle,
  Phone,
  Sparkles,
  User,
  Users,
  ShieldCheck,
  Wine,
} from 'lucide-react';
import { motion } from 'motion/react';
import { FLOOR_TABLES, VENUE_INFO } from '../data/nye2027Data';
import { SiteLanguage } from './Navbar';

interface VipPackagesAndBookingProps {
  selectedFloorTableNumber: number | null;
  onSelectFloorTable: (tableNumber: number | null) => void;
  onTriggerFireworks: () => void;
  language?: SiteLanguage;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  guests?: string;
}

interface ConfirmedBooking {
  referenceId: string;
  fullName: string;
  email: string;
  phone: string;
  guests: number;
  selectionLabel: string;
  finalPriceMad: number;
}

const ENTRY_TICKET_PRICE_MAD = 700;

function formatMad(amount: number): string {
  return `${amount.toLocaleString('fr-FR')} DH`;
}

export function VipPackagesAndBooking({
  selectedFloorTableNumber,
  onSelectFloorTable,
  onTriggerFireworks,
  language = 'fr',
}: VipPackagesAndBookingProps) {
  const isFr = language === 'fr';
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState('6');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [confirmed, setConfirmed] = useState<ConfirmedBooking | null>(null);

  useEffect(() => {
    if (selectedFloorTableNumber !== null) {
      setConfirmed(null);
      setGuests('6');
    }
  }, [selectedFloorTableNumber]);

  const selectedFloorTable = useMemo(() => {
    if (selectedFloorTableNumber === null) return null;
    return (
      FLOOR_TABLES.find((table) => table.number === selectedFloorTableNumber) ||
      null
    );
  }, [selectedFloorTableNumber]);

  const selectionLabel = selectedFloorTable
    ? selectedFloorTable.label
    : isFr
      ? "Ticket d'entrée VIP · Avec consommation"
      : 'VIP Entry Pass · Drink Included';

  const selectionSubtitle = selectedFloorTable
    ? `${selectedFloorTable.zone} · ${selectedFloorTable.bottles} · ${selectedFloorTable.capacity}`
    : isFr
      ? 'Accès Réveillon du 31 Décembre · 700 DH par personne avec consommation'
      : "New Year's Eve Dec 31 Access · 700 DH per person with drink included";

  const parsedGuestCount = Math.max(1, Number(guests) || 1);

  const estimatedTotalMad = useMemo(() => {
    if (selectedFloorTable) {
      const extraGuests = Math.max(0, parsedGuestCount - 6);
      return selectedFloorTable.priceMad + extraGuests * ENTRY_TICKET_PRICE_MAD;
    }
    return parsedGuestCount * ENTRY_TICKET_PRICE_MAD;
  }, [selectedFloorTable, parsedGuestCount]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onTriggerFireworks();

    const nextErrors: FormErrors = {};

    if (fullName.trim().length < 2) {
      nextErrors.fullName = isFr
        ? 'Veuillez saisir votre nom complet.'
        : 'Please enter your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      nextErrors.email = isFr
        ? 'Veuillez saisir une adresse email valide.'
        : 'Please enter a valid email address.';
    }

    const phoneDigits = phone.replace(/[\s\-()]/g, '');
    if (phoneDigits.length < 8) {
      nextErrors.phone = isFr
        ? 'Veuillez saisir un numéro de téléphone ou WhatsApp valide.'
        : 'Please enter a valid phone or WhatsApp number.';
    }

    const guestCount = Number(guests);
    if (!Number.isFinite(guestCount) || guestCount < 1 || guestCount > 30) {
      nextErrors.guests = isFr
        ? 'Indiquez entre 1 et 30 personnes.'
        : 'Enter between 1 and 30 guests.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    const referenceId = `555-NY27-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmed({
      referenceId,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      guests: guestCount,
      selectionLabel,
      finalPriceMad: estimatedTotalMad,
    });
  };

  const handleReset = () => {
    setConfirmed(null);
    setFullName('');
    setEmail('');
    setPhone('');
    setGuests(selectedFloorTable ? '6' : '2');
    setNotes('');
  };

  return (
    <section
      id="reserve"
      className="relative overflow-hidden py-24 sm:py-32 border-t border-[#D4AF37]/20 bg-[#060608]"
    >
      {/* Luxurious Gold Radial Halo & Ambient Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.16)_0%,rgba(184,134,45,0.05)_45%,transparent_70%)] blur-2xl"
      />

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-3 font-mono text-xs tracking-[0.24em] uppercase text-[#F7DC88]">
            <Sparkles className="w-4 h-4 text-[#FFE100]" aria-hidden="true" />
            <span>555 FAMOUS CLUB · VIP CONCIERGE MARINA BAY</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-5xl font-black tracking-[0.03em] gold-bevel-text text-balance">
            {isFr ? 'RÉSERVATION & CONTACT VIP' : 'VIP RESERVATION & CONTACT'}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
            {isFr
              ? "Sélectionnez votre table sur le plan interactif ou choisissez votre formule ci-dessous. Notre service voiturier et conciergerie VIP de Marina Bay confirmera votre table."
              : "Select your table on the interactive floor plan or choose your package below. Our Marina Bay VIP concierge team will confirm your booking."}
          </p>
        </motion.div>

        {/* Master Gold Architectural Booking Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-gradient-to-b from-[#111116] via-[#0B0B0E] to-[#070709] border-2 border-[#D4AF37]/50 rounded-lg shadow-[0_35px_100px_rgba(0,0,0,0.9)] overflow-hidden"
        >
          {/* Top Metallic Gold Glowing Bar */}
          <div className="h-[4px] w-full bg-gradient-to-r from-transparent via-[#FFE100] to-transparent shadow-[0_0_20px_rgba(255,225,0,0.8)]" />

          {/* Luxury UX Step Indicators */}
          <div className="px-6 sm:px-10 pt-6 pb-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#FFE100] font-mono text-xs font-bold flex items-center justify-center">
                01
              </span>
              <span className="font-mono text-xs tracking-[0.16em] uppercase text-[#F5F2EB] font-semibold">
                {isFr ? 'Sélection & Formule' : 'Selection & Package'}
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#FFE100] font-mono text-xs font-bold flex items-center justify-center">
                02
              </span>
              <span className="font-mono text-xs tracking-[0.16em] uppercase text-[#F5F2EB] font-semibold">
                {isFr ? 'Coordonnées Invité' : 'Guest Information'}
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#FFE100] font-mono text-xs font-bold flex items-center justify-center">
                03
              </span>
              <span className="font-mono text-xs tracking-[0.16em] uppercase text-[#F5F2EB] font-semibold">
                {isFr ? 'Confirmation VIP' : 'VIP Confirmation'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-6 sm:p-10 lg:p-12 items-stretch">
            {/* Left Summary Panel with Gold Border */}
            <div className="lg:col-span-5 flex flex-col justify-between pb-8 lg:pb-0 lg:pr-10 border-b lg:border-b-0 lg:border-r border-[#D4AF37]/20">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.14em] uppercase text-[#FFE100]">
                    <Sparkles className="w-4 h-4 text-[#FFE100]" aria-hidden="true" />
                    {isFr ? 'Formule Active' : 'Active Package'}
                  </span>
                  <a
                    href="#floor-plan"
                    className="font-mono text-xs tracking-[0.1em] text-[#F7DC88] hover:text-white transition-colors underline underline-offset-4"
                  >
                    {isFr ? 'Voir le plan 3D ↑' : 'View floor plan ↑'}
                  </a>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F5F2EB] flex items-center gap-3">
                  {selectedFloorTable && (
                    <span
                      aria-hidden="true"
                      style={{ backgroundColor: selectedFloorTable.swatchHex }}
                      className="w-4 h-4 rounded-xs shrink-0 border border-[#FFE100]/60 shadow-[0_0_10px_currentColor]"
                    />
                  )}
                  <span className="gold-hero-champagne">{selectionLabel}</span>
                </h3>
                <p className="mt-3 text-sm text-[#A1A1AA] leading-relaxed">
                  {selectionSubtitle}
                </p>

                {/* Table Number Selector Dropdown */}
                <div className="mt-7">
                  <label
                    htmlFor="floor-table-select"
                    className="block font-mono text-xs tracking-[0.14em] uppercase text-[#F7DC88] mb-2 font-semibold"
                  >
                    {isFr
                      ? 'Sélectionner Table (#1 à #65) ou Entrée'
                      : 'Select Table (#1 to #65) or Entry Pass'}
                  </label>
                  <select
                    id="floor-table-select"
                    value={selectedFloorTableNumber ?? ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      onSelectFloorTable(val ? Number(val) : null);
                      setConfirmed(null);
                    }}
                    className="w-full px-4 py-3.5 min-h-[48px] bg-[#070709] border border-[#D4AF37]/50 rounded-sm text-sm text-[#F5F2EB] focus:outline-none focus:border-[#FFE100] focus:ring-2 focus:ring-[#FFE100]/30 cursor-pointer transition-all"
                  >
                    <option value="">
                      {isFr
                        ? "Ticket d'entrée — 700 DH / pers. avec consommation"
                        : 'Entry Ticket — 700 DH / guest with drink'}
                    </option>
                    {FLOOR_TABLES.map((t) => (
                      <option key={t.number} value={t.number}>
                        {t.label} — {t.priceMad.toLocaleString('fr-FR')} DH ({t.bottles})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Package Highlights Box */}
                <div className="mt-6 p-4.5 bg-[#070709] border border-[#D4AF37]/30 rounded-sm space-y-2.5 text-xs">
                  <div className="flex items-center justify-between text-[#A1A1AA]">
                    <span className="flex items-center gap-2">
                      <Wine className="w-3.5 h-3.5 text-[#D4AF37]" />
                      {isFr ? 'Dotation Bouteilles' : 'Bottle Allowance'}
                    </span>
                    <span className="text-[#F7DC88] font-semibold">
                      {selectedFloorTable
                        ? selectedFloorTable.bottles
                        : isFr
                          ? '1 consommation incluse'
                          : '1 drink included'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[#A1A1AA]">
                    <span className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
                      {isFr ? 'Capacité Table' : 'Table Capacity'}
                    </span>
                    <span className="text-[#F5F2EB] font-semibold">
                      {selectedFloorTable
                        ? selectedFloorTable.capacity
                        : isFr
                          ? `${parsedGuestCount} personne${parsedGuestCount > 1 ? 's' : ''}`
                          : `${parsedGuestCount} guest${parsedGuestCount > 1 ? 's' : ''}`}
                    </span>
                  </div>
                  {selectedFloorTable && parsedGuestCount > 6 && (
                    <div className="flex items-center justify-between text-[#FFE100]">
                      <span>
                        {isFr
                          ? `Invités supplémentaires (+${parsedGuestCount - 6} pers.)`
                          : `Extra guests (+${parsedGuestCount - 6} guests)`}
                      </span>
                      <span className="font-mono tabular-nums font-bold">
                        +{formatMad((parsedGuestCount - 6) * ENTRY_TICKET_PRICE_MAD)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Total Price Card */}
              <div className="mt-8 pt-6 border-t border-[#D4AF37]/30 space-y-4">
                <div className="flex items-baseline justify-between p-4 bg-gradient-to-r from-[#D4AF37]/10 via-[#FFE100]/5 to-transparent border border-[#D4AF37]/40 rounded-sm">
                  <div>
                    <span className="block font-mono text-[10px] tracking-[0.2em] uppercase text-[#F7DC88]">
                      {isFr ? 'MONTANT TOTAL ESTIMÉ' : 'ESTIMATED TOTAL'}
                    </span>
                    <span className="text-xs text-[#A1A1AA]">
                      {isFr ? 'Inclus services & taxes' : 'All taxes & fees included'}
                    </span>
                  </div>
                  <span className="font-mono tabular-nums text-3xl font-black gold-bevel-text">
                    {formatMad(estimatedTotalMad)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-[#A1A1AA] pt-1">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                    {isFr ? 'Confirmation garantie' : 'Guaranteed confirmation'}
                  </span>
                  <span className="font-mono">{VENUE_INFO.phonePrimary}</span>
                </div>
              </div>
            </div>

            {/* Right Contact & Guest Form */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {confirmed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  role="status"
                  aria-live="polite"
                  className="h-full flex flex-col justify-between p-6 sm:p-9 bg-[#070709] border-2 border-[#D4AF37] rounded-sm shadow-[0_20px_60px_rgba(212,175,55,0.25)]"
                >
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] font-mono text-xs tracking-[0.16em] uppercase text-[#FFE100] mb-4">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isFr ? 'DEMANDE VALIDÉE' : 'REQUEST RECORDED'} · REF {confirmed.referenceId}</span>
                    </div>

                    <h4 className="font-display text-2xl sm:text-3xl font-bold gold-hero-champagne">
                      {isFr
                        ? 'Votre table au 555 Famous Club est en cours de réservation'
                        : "Your table at 555 Famous Club is being processed"}
                    </h4>
                    <p className="mt-3 text-sm text-[#F5F2EB]/90 leading-relaxed">
                      {isFr
                        ? 'Notre équipe VIP à Marina Bay a bien enregistré votre demande pour '
                        : 'Our Marina Bay VIP concierge has successfully recorded your booking request for '}
                      <strong className="text-[#FFE100]">{confirmed.selectionLabel}</strong> ({confirmed.guests}{' '}
                      {isFr ? `personne${confirmed.guests > 1 ? 's' : ''}` : `guest${confirmed.guests > 1 ? 's' : ''}`}).
                    </p>

                    <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/10 text-sm">
                      <div className="p-3 bg-white/[0.03] border border-white/10 rounded-sm">
                        <dt className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#A1A1AA]">
                          {isFr ? 'Nom Invité' : 'Guest Name'}
                        </dt>
                        <dd className="text-[#F5F2EB] font-bold mt-1 text-base">
                          {confirmed.fullName}
                        </dd>
                      </div>
                      <div className="p-3 bg-white/[0.03] border border-white/10 rounded-sm">
                        <dt className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#A1A1AA]">
                          {isFr ? 'WhatsApp / Téléphone' : 'WhatsApp / Phone'}
                        </dt>
                        <dd className="text-[#FFE100] font-mono font-bold mt-1 text-base">
                          {confirmed.phone}
                        </dd>
                      </div>
                      <div className="p-3 bg-white/[0.03] border border-white/10 rounded-sm">
                        <dt className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#A1A1AA]">
                          {isFr ? 'Formule Choisie' : 'Selected Package'}
                        </dt>
                        <dd className="text-[#F7DC88] font-medium mt-1">
                          {confirmed.selectionLabel}
                        </dd>
                      </div>
                      <div className="p-3 bg-white/[0.03] border border-white/10 rounded-sm">
                        <dt className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#A1A1AA]">
                          {isFr ? 'Total Général' : 'Total Amount'}
                        </dt>
                        <dd className="text-[#FFE100] font-mono font-black mt-1 text-base">
                          {formatMad(confirmed.finalPriceMad)}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
                    <a
                      href={`https://wa.me/212615885287?text=${encodeURIComponent(
                        `Bonjour 555 Tanger VIP Desk, je souhaite confirmer ma réservation ${confirmed.referenceId} pour ${confirmed.selectionLabel} (${confirmed.guests} personnes) le 31 Décembre. Nom: ${confirmed.fullName}, Tél: ${confirmed.phone}.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-gold-hover flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 min-h-[50px] bg-gradient-to-r from-[#FFF3C4] via-[#FFE100] to-[#C89218] text-[#09090B] text-sm font-extrabold tracking-[0.08em] uppercase rounded-sm shadow-[0_8px_25px_rgba(255,225,0,0.4)] cursor-pointer"
                    >
                      <MessageCircle className="w-5 h-5 text-[#09090B]" aria-hidden="true" />
                      <span>
                        {isFr ? 'Finaliser sur WhatsApp VIP' : 'Finalize on WhatsApp VIP'}
                      </span>
                    </a>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="btn-dark-hover px-6 py-4 min-h-[50px] text-xs font-mono tracking-[0.12em] uppercase text-[#A1A1AA] hover:text-white border border-white/25 rounded-sm cursor-pointer"
                    >
                      {isFr ? 'Modifier' : 'Edit Form'}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="res-name"
                        className="block font-mono text-xs tracking-[0.12em] uppercase text-[#F5F2EB]/90 mb-2 font-medium"
                      >
                        {isFr ? 'Nom Complet' : 'Full Name'} <span className="text-[#FFE100]">*</span>
                      </label>
                      <div className="relative">
                        <User
                          className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                          aria-hidden="true"
                        />
                        <input
                          id="res-name"
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Karim Benali"
                          className="w-full pl-10 pr-3.5 py-3.5 min-h-[48px] bg-[#070709] border border-[#D4AF37]/40 rounded-sm text-sm text-[#F5F2EB] placeholder:text-[#A1A1AA]/40 focus:outline-none focus:border-[#FFE100] focus:ring-2 focus:ring-[#FFE100]/30 transition-all"
                        />
                      </div>
                      {errors.fullName && (
                        <p className="mt-1.5 text-xs text-amber-400 font-medium">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="res-phone"
                        className="block font-mono text-xs tracking-[0.12em] uppercase text-[#F5F2EB]/90 mb-2 font-medium"
                      >
                        {isFr ? 'Téléphone / WhatsApp' : 'Phone / WhatsApp'} <span className="text-[#FFE100]">*</span>
                      </label>
                      <div className="relative">
                        <Phone
                          className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                          aria-hidden="true"
                        />
                        <input
                          id="res-phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+212 600 000 000"
                          className="w-full pl-10 pr-3.5 py-3.5 min-h-[48px] bg-[#070709] border border-[#D4AF37]/40 rounded-sm text-sm font-mono text-[#F5F2EB] placeholder:text-[#A1A1AA]/40 focus:outline-none focus:border-[#FFE100] focus:ring-2 focus:ring-[#FFE100]/30 transition-all"
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1.5 text-xs text-amber-400 font-medium">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="res-email"
                        className="block font-mono text-xs tracking-[0.12em] uppercase text-[#F5F2EB]/90 mb-2 font-medium"
                      >
                        {isFr ? 'Adresse Email' : 'Email Address'} <span className="text-[#FFE100]">*</span>
                      </label>
                      <div className="relative">
                        <Mail
                          className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                          aria-hidden="true"
                        />
                        <input
                          id="res-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="guest@domain.com"
                          className="w-full pl-10 pr-3.5 py-3.5 min-h-[48px] bg-[#070709] border border-[#D4AF37]/40 rounded-sm text-sm text-[#F5F2EB] placeholder:text-[#A1A1AA]/40 focus:outline-none focus:border-[#FFE100] focus:ring-2 focus:ring-[#FFE100]/30 transition-all"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-amber-400 font-medium">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="res-guests"
                        className="block font-mono text-xs tracking-[0.12em] uppercase text-[#F5F2EB]/90 mb-2 font-medium"
                      >
                        {isFr ? 'Nombre de Personnes' : 'Number of Guests'} <span className="text-[#FFE100]">*</span>
                      </label>
                      <div className="relative">
                        <Users
                          className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                          aria-hidden="true"
                        />
                        <input
                          id="res-guests"
                          type="number"
                          min={1}
                          max={30}
                          value={guests}
                          onChange={(e) => setGuests(e.target.value)}
                          className="w-full pl-10 pr-3.5 py-3.5 min-h-[48px] bg-[#070709] border border-[#D4AF37]/40 rounded-sm text-sm font-mono tabular-nums text-[#F5F2EB] focus:outline-none focus:border-[#FFE100] focus:ring-2 focus:ring-[#FFE100]/30 transition-all"
                        />
                      </div>
                      {errors.guests && (
                        <p className="mt-1.5 text-xs text-amber-400 font-medium">
                          {errors.guests}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="res-notes"
                      className="block font-mono text-xs tracking-[0.12em] uppercase text-[#F5F2EB]/90 mb-2 font-medium"
                    >
                      {isFr
                        ? 'Préférences (Bouteilles, Chicha, Heure d’Arrivée)'
                        : 'Preferences (Champagne, Shisha, Arrival Time)'}
                    </label>
                    <textarea
                      id="res-notes"
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={
                        isFr
                          ? 'Marque de champagne préférée, saveur shisha, arrivée prévue...'
                          : 'Preferred champagne brand, shisha flavor, expected arrival...'
                      }
                      className="w-full px-4 py-3.5 bg-[#070709] border border-[#D4AF37]/40 rounded-sm text-sm text-[#F5F2EB] placeholder:text-[#A1A1AA]/40 focus:outline-none focus:border-[#FFE100] focus:ring-2 focus:ring-[#FFE100]/30 transition-all"
                    />
                  </div>

                  {/* Centered High-End Luxury Gold CTA */}
                  <div className="pt-6 flex justify-center">
                    <button
                      type="submit"
                      className="btn-gold-hover group relative inline-flex items-center justify-center gap-3 px-12 py-4.5 min-h-[54px] bg-gradient-to-r from-[#FFFDF2] via-[#F5D47A] to-[#C99A2E] hover:from-[#FFFFFF] hover:via-[#FFF0BC] hover:to-[#E2C062] text-[#09090B] text-sm sm:text-base font-black tracking-[0.16em] uppercase rounded-full shadow-[0_12px_35px_rgba(212,175,55,0.4)] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <Sparkles className="w-4 h-4 text-[#09090B] transition-transform duration-300 group-hover:rotate-12" aria-hidden="true" />
                      <span>{isFr ? 'RÉSERVER MA TABLE VIP' : 'RESERVE MY VIP TABLE'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
