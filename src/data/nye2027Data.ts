export type OfferCategory = 'all' | 'vip' | 'entry' | 'bundles';

export interface HolidayOffer {
  id: string;
  code: string;
  category: Exclude<OfferCategory, 'all'>;
  categoryLabel: string;
  discountPercent: number;
  title: string;
  description: string;
  originalPriceMad: number;
  discountedPriceMad: number;
  validUntil: string;
  allocationRemaining: string;
  appliesToPackageId?: string;
}

export interface VipPackage {
  id: string;
  name: string;
  tierLabel: string;
  capacity: string;
  basePriceMad: number;
  highlights: string[];
  locationNote: string;
}

export interface NightScheduleStep {
  index: string;
  time: string;
  title: string;
  detail: string;
}

export const VENUE_INFO = {
  brand: '555 TANGER',
  eventTitle: 'New Year 2027 Gala',
  address: 'Marina Bay, Boulevard Mohammed VI, Tangier, Morocco',
  doorsOpen: '22:00',
  regularHours: 'Open nightly from 23:00',
  phonePrimary: '+212 615 885 287',
  phoneSecondary: '+212 637 913 723',
  email: 'contact@555tanger.com',
  website: 'https://www.555tanger.com',
  targetIsoDate: '2027-01-01T00:00:00+01:00',
};

export const MEDIA_ASSETS = {
  logo: {
    src: '/assets/aistudio/logo-555_d7bf9db7.png',
    alt: '555 Tanger Marina Bay',
  },
  heroEmblem: {
    src: '/assets/aistudio/Gemini_Generated_Image_blryyblryyblryyb_a4b94433.png',
    alt: "555 Tanger Marina Bay — NYE 2027 New Year's Eve",
  },
  heroVideo: {
    src: '/assets/aistudio/video-cover_fd8c8945.mp4',
    poster: '/src/assets/images/hero_nye_club_tanger_1795524803779.jpg',
  },
  eventsShowcase: {
    src: '/assets/aistudio/Fe_tez_vos_e_ve_nements_avec_le_555_Famous_Club_826ad8f5.jpg',
    alt: 'Fêtez vos événements avec le 555 Famous Club Tanger',
  },
  ambianceShowcase: {
    src: '/assets/aistudio/Profitez_d_une_ambiance_magique_et_conviviale_au_sein_du_555_Famous_Club___e8eb73ee.jpg',
    alt: 'Profitez d’une ambiance magique et conviviale au sein du 555 Famous Club Tanger',
  },
  hero: {
    src: '/src/assets/images/hero_nye_club_tanger_1795524803779.jpg',
    alt: '555 Famous Club Tanger main floor prepared for the New Year 2027 champagne gala',
  },
  stage: {
    src: '/src/assets/images/stage_dj_production_1795524803775.jpg',
    alt: 'Main DJ booth and warm golden architectural lighting inside 555 Tanger',
  },
  champagne: {
    src: '/src/assets/images/champagne_vip_service_1795524805443.jpg',
    alt: 'Chilled vintage champagne bottles in brass ice bucket at a marble VIP booth',
  },
  terrace: {
    src: '/src/assets/images/marina_bay_terrace_1795524806090.jpg',
    alt: 'Waterfront VIP terrace overlooking Marina Bay Tangier with midnight New Year fireworks',
  },
  floorPlan: {
    src: '/assets/aistudio/Plan-tables-reveillon_100c486e.jpeg',
    alt: '555 Tanger Marina Bay — Plan des tables et tarifs Réveillon du 31 Décembre',
  },
  laserDancefloor: {
    src: '/assets/aistudio/DSC02139_bb76820b.jpg',
    alt: '555 Famous Club Tanger dancefloor laser show',
  },
  dressCodeBanner: {
    src: '/assets/aistudio/DSC00222_a5b37048.jpg',
    alt: 'Entrez dans la fréquence — 555 Tanger',
  },
  vibeDancer: {
    src: '/assets/aistudio/DSC00222_a5b37048.jpg',
    alt: '555 Famous Club Tanger live performer under red laser beams',
  },
};

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-bottle-trophy',
    src: '/assets/aistudio/DSC03038_d536c553.jpg',
    alt: '555 Famous Club VIP champagne bottle presentation',
    caption: 'VIP Champagne Parade',
  },
  {
    id: 'gal-chivas-service',
    src: '/assets/aistudio/DSC02671_b8da7ee3.jpg',
    alt: 'Chivas Regal 18 Gold Signature bottle service at 555 Tanger',
    caption: 'Chivas 18 Table Service',
  },
  {
    id: 'gal-sparkler-performer',
    src: '/assets/aistudio/DSC03025_e9afd4b8.jpg',
    alt: 'Live show performer with illuminated champagne bottles',
    caption: 'Midnight Live Performers',
  },
  {
    id: 'gal-percussion-lasers',
    src: '/assets/aistudio/DSC02564_54b6896b.jpg',
    alt: 'Live percussionist performing under laser beams at 555 Tanger',
    caption: 'Live Percussion & Lasers',
  },
  {
    id: 'gal-dancer-stage',
    src: '/assets/aistudio/DSC00222_a5b37048.jpg',
    alt: 'Stage dancer under red laser beams at 555 Famous Club Tanger',
    caption: 'Main Stage Show',
  },
  {
    id: 'gal-guests-confetti',
    src: '/assets/aistudio/DSC00662_0800ef90.jpg',
    alt: 'Guests celebrating under sparkler confetti at 555 Tanger',
    caption: 'Midnight Celebration',
  },
  {
    id: 'gal-vip-100-frame',
    src: '/assets/aistudio/Fe_tez_vos_e_ve_nements_avec_le_555_Famous_Club_826ad8f5.jpg',
    alt: '555 Famous Club illuminated VIP bottle frame show',
    caption: '555 Signature Bottle Show',
  },
  {
    id: 'gal-dj-console',
    src: '/assets/aistudio/Profitez_d_une_ambiance_magique_et_conviviale_au_sein_du_555_Famous_Club___e8eb73ee.jpg',
    alt: 'International DJ performing live at 555 Famous Club Tanger',
    caption: 'International DJ Lineup',
  },
];

export const HOLIDAY_OFFERS: HolidayOffer[] = [
  {
    id: 'offer-vip-early',
    code: 'NY27EARLY',
    category: 'vip',
    categoryLabel: 'VIP Tables',
    discountPercent: 20,
    title: 'Early-Bird Platinum Booth Privilege',
    description:
      'Reserve a Platinum Main-Floor Booth before December 15 and receive 20% off minimum spend plus priority Marina Bay valet entry.',
    originalPriceMad: 15000,
    discountedPriceMad: 12000,
    validUntil: 'Valid until Dec 15, 2026',
    allocationRemaining: '6 booths remaining',
    appliesToPackageId: 'platinum-booth',
  },
  {
    id: 'offer-terrace-winter',
    code: 'MARINA20',
    category: 'vip',
    categoryLabel: 'VIP Tables',
    discountPercent: 15,
    title: 'Marina Waterfront Terrace Reduction',
    description:
      '15% seasonal rate reduction on Gold Terrace tables overlooking the midnight harbor fireworks, including one complimentary house shisha.',
    originalPriceMad: 9000,
    discountedPriceMad: 7650,
    validUntil: 'Valid until Dec 22, 2026',
    allocationRemaining: '9 tables remaining',
    appliesToPackageId: 'gold-terrace',
  },
  {
    id: 'offer-early-pass',
    code: 'TANGER27',
    category: 'entry',
    categoryLabel: 'Early Bird Entry',
    discountPercent: 25,
    title: 'Holiday Advance Gala Pass',
    description:
      'Save 25% on advance lounge admission including two signature New Year cocktails before 23:30 and fast-track door check-in.',
    originalPriceMad: 1200,
    discountedPriceMad: 900,
    validUntil: 'Valid until Dec 20, 2026',
    allocationRemaining: '45 passes left',
    appliesToPackageId: 'lounge-pass',
  },
  {
    id: 'offer-magnum-bundle',
    code: 'GOLDMAGNUM',
    category: 'bundles',
    categoryLabel: 'Bottle Bundles',
    discountPercent: 18,
    title: 'Royal Midnight Magnum Suite',
    description:
      '18% holiday bundle discount on the Owner’s Box package featuring twin vintage champagne magnums, premium spirits, and dedicated butler service.',
    originalPriceMad: 28000,
    discountedPriceMad: 22960,
    validUntil: 'Valid until Dec 24, 2026',
    allocationRemaining: '2 suites remaining',
    appliesToPackageId: 'royal-box',
  },
];

export const VIP_PACKAGES: VipPackage[] = [
  {
    id: 'lounge-pass',
    name: 'Holiday Advance Lounge Pass',
    tierLabel: 'Standing & Bar Access',
    capacity: '1 Guest',
    basePriceMad: 1200,
    locationNote: 'Main Bar & Courtyard Lounge',
    highlights: [
      'Priority admission before 23:30',
      'Two signature cocktails or house pours included',
      'Midnight countdown glass of sparkling wine',
    ],
  },
  {
    id: 'gold-terrace',
    name: 'Gold Marina Terrace Table',
    tierLabel: 'Waterfront Lounge',
    capacity: 'Up to 6 Guests',
    basePriceMad: 9000,
    locationNote: 'Marina Bay Panoramic Deck',
    highlights: [
      'Direct sightline to Tangier Bay midnight fireworks',
      '1 Vintage Champagne + 1 Premium Spirit bottle',
      '1 Signature Shisha (Apple Mint or Hawaii blend)',
    ],
  },
  {
    id: 'platinum-booth',
    name: 'Platinum Main-Floor Booth',
    tierLabel: 'Center Stage',
    capacity: 'Up to 10 Guests',
    basePriceMad: 15000,
    locationNote: 'Adjacent to DJ Console',
    highlights: [
      'Elevated marble booth with dedicated table host',
      '2 Vintage Champagnes + 2 Ultra-Premium Spirits',
      '2 Specialty Shishas with ice supplement & platters',
    ],
  },
  {
    id: 'royal-box',
    name: 'Royal Owner’s Box',
    tierLabel: 'Private Mezzanine',
    capacity: 'Up to 16 Guests',
    basePriceMad: 28000,
    locationNote: 'Private Overlook Mezzanine',
    highlights: [
      'Private security escort & Marina VIP car drop-off',
      '2 Champagne Magnums + 3 Ultra-Premium Bottles',
      'Unlimited mixers, signature shishas & midnight tapas',
    ],
  },
];

export const NYE_SCHEDULE: NightScheduleStep[] = [
  {
    index: '01.',
    time: '22:00',
    title: 'Marina Red-Carpet Reception',
    detail: 'Doors open along Boulevard Mohammed VI with welcome aperitifs and warm melodic house.',
  },
  {
    index: '02.',
    time: '23:15',
    title: 'International Guest DJ & Live Percussion',
    detail: 'Full 360-degree architectural lighting activation and kinetic visual stage premiere.',
  },
  {
    index: '03.',
    time: '00:00',
    title: 'New Year 2027 Countdown & Bay Fireworks',
    detail: 'Synchronized midnight toast across the main floor and waterfront Marina Bay terrace.',
  },
  {
    index: '04.',
    time: '01:30 — 05:00',
    title: 'After-Hours Deep & Afro House Set',
    detail: 'Extended late-night set with full bottle and luxury shisha lounge service until dawn.',
  },
];

export type FloorTableTierKey =
  | 'vip-15000'
  | 'vip-13000'
  | 'premium-10000'
  | 'classic-7000'
  | 'lounge-5000';

export interface FloorTableTierInfo {
  key: FloorTableTierKey;
  title: string;
  priceMad: number;
  bottles: string;
  tableRange: string;
  swatchHex: string;
  badgeTextClass: string;
}

export interface FloorTableItem {
  number: number;
  label: string;
  zone: string;
  tierKey: FloorTableTierKey;
  priceMad: number;
  bottles: string;
  capacity: string;
  swatchHex: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export const FLOOR_TABLE_TIERS: FloorTableTierInfo[] = [
  {
    key: 'vip-15000',
    title: 'VIP Stage & Front Row',
    priceMad: 15000,
    bottles: '2 bouteilles ou 1 magnum',
    tableRange: 'Tables VIP 11, 13, 15, 21',
    swatchHex: '#2563EB',
    badgeTextClass: 'text-blue-400',
  },
  {
    key: 'vip-13000',
    title: 'VIP Area Sides',
    priceMad: 13000,
    bottles: '2 bouteilles ou 1 magnum',
    tableRange: 'Tables VIP 1–10, 12, 14, 16–20',
    swatchHex: '#EAB308',
    badgeTextClass: 'text-yellow-400',
  },
  {
    key: 'premium-10000',
    title: 'Dance Floor Perimeter',
    priceMad: 10000,
    bottles: '2 bouteilles ou 1 magnum',
    tableRange: 'Tables 22–26, 36–38, 42–46, 57–58',
    swatchHex: '#F97316',
    badgeTextClass: 'text-orange-400',
  },
  {
    key: 'classic-7000',
    title: 'Main Floor & DJ Wings',
    priceMad: 7000,
    bottles: '1 bouteille',
    tableRange: 'Tables 27–35, 39–41, 47–49, 59–65',
    swatchHex: '#22C55E',
    badgeTextClass: 'text-emerald-400',
  },
  {
    key: 'lounge-5000',
    title: 'Lounge Gallery Row',
    priceMad: 5000,
    bottles: '1 bouteille',
    tableRange: 'Tables 50 à 56',
    swatchHex: '#EC4899',
    badgeTextClass: 'text-pink-400',
  },
];

function makeTable(
  number: number,
  x: number,
  y: number,
  w = 4.6,
  h = 2.35
): FloorTableItem {
  const isVip15 = number === 11 || number === 13 || number === 15 || number === 21;
  const isVip13 =
    (number >= 1 && number <= 10) ||
    number === 12 ||
    number === 14 ||
    (number >= 16 && number <= 20);
  const isPremium10 =
    (number >= 22 && number <= 26) ||
    (number >= 36 && number <= 38) ||
    (number >= 42 && number <= 46) ||
    number === 57 ||
    number === 58;
  const isLounge5 = number >= 50 && number <= 56;

  if (isVip15) {
    return {
      number,
      label: `Table VIP #${number}`,
      zone: number <= 11 ? 'Right VIP Area — Front Stage' : 'Left VIP Area — Front Stage',
      tierKey: 'vip-15000',
      priceMad: 15000,
      bottles: '2 bouteilles ou 1 magnum',
      capacity: '6 personnes par table',
      swatchHex: '#2563EB',
      x,
      y,
      w,
      h,
    };
  }
  if (isVip13) {
    return {
      number,
      label: `Table VIP #${number}`,
      zone: number <= 10 ? 'Right VIP Area' : 'Left VIP Area',
      tierKey: 'vip-13000',
      priceMad: 13000,
      bottles: '2 bouteilles ou 1 magnum',
      capacity: '6 personnes par table',
      swatchHex: '#EAB308',
      x,
      y,
      w,
      h,
    };
  }
  if (isPremium10) {
    return {
      number,
      label: `Table #${number}`,
      zone:
        number >= 36 && number <= 38
          ? 'Center Dance Floor Front'
          : number >= 42 && number <= 46
            ? 'Right Dance Floor Row'
            : number <= 26
              ? 'Left Dance Floor Row'
              : 'Bar & Lounge Gallery',
      tierKey: 'premium-10000',
      priceMad: 10000,
      bottles: '2 bouteilles ou 1 magnum',
      capacity: '6 personnes par table',
      swatchHex: '#F97316',
      x,
      y,
      w,
      h,
    };
  }
  if (isLounge5) {
    return {
      number,
      label: `Table #${number}`,
      zone: 'Entrance Lounge Row',
      tierKey: 'lounge-5000',
      priceMad: 5000,
      bottles: '1 bouteille',
      capacity: '6 personnes par table',
      swatchHex: '#EC4899',
      x,
      y,
      w,
      h,
    };
  }
  return {
    number,
    label: `Table #${number}`,
    zone:
      number >= 47 && number <= 49
        ? 'Right DJ & Stage Wing'
        : number >= 63
          ? 'South Bar Terrace'
          : number >= 59
            ? 'Left Gallery Wall'
            : 'Main Club Floor',
    tierKey: 'classic-7000',
    priceMad: 7000,
    bottles: '1 bouteille',
    capacity: '6 personnes par table',
    swatchHex: '#22C55E',
    x,
    y,
    w,
    h,
  };
}

export const FLOOR_TABLES: FloorTableItem[] = [
  // Right VIP Area (1–11)
  makeTable(1, 90.3, 61.61, 4.8, 2.5),
  makeTable(2, 90.3, 58.2, 4.8, 2.45),
  makeTable(3, 90.3, 54.99, 4.8, 2.45),
  makeTable(4, 90.3, 51.78, 4.8, 2.45),
  makeTable(5, 90.3, 48.57, 4.8, 2.45),
  makeTable(6, 90.3, 45.41, 4.8, 2.45),
  makeTable(7, 90.3, 42.23, 4.8, 2.45),
  makeTable(8, 90.3, 39.05, 4.8, 2.45),
  makeTable(9, 90.3, 35.81, 4.8, 2.45),
  makeTable(10, 90.3, 32.71, 4.8, 2.45),
  makeTable(11, 90.35, 29.47, 5.0, 2.5),

  // Left VIP Area (12–21)
  makeTable(12, 23.95, 22.19, 4.7, 2.35),
  makeTable(13, 24.04, 18.98, 5.0, 2.5),
  makeTable(14, 17.26, 20.1, 4.9, 2.25),
  makeTable(15, 6.74, 20.04, 5.2, 2.55),
  makeTable(16, 6.97, 23.94, 4.5, 2.35),
  makeTable(17, 6.97, 26.98, 4.5, 2.35),
  makeTable(18, 6.97, 30.1, 4.5, 2.35),
  makeTable(19, 6.97, 33.29, 4.5, 2.35),
  makeTable(20, 6.97, 36.53, 4.5, 2.35),
  makeTable(21, 6.8, 40.19, 5.4, 2.55),

  // Left Dance Floor Column (22–29)
  makeTable(22, 22.68, 29.1, 4.2, 2.2),
  makeTable(23, 22.68, 32.22, 4.2, 2.25),
  makeTable(24, 22.68, 35.41, 4.2, 2.2),
  makeTable(25, 22.68, 38.76, 4.2, 2.25),
  makeTable(26, 22.68, 41.92, 4.2, 2.25),
  makeTable(27, 22.72, 45.33, 4.2, 2.3),
  makeTable(28, 22.77, 48.45, 4.3, 2.35),
  makeTable(29, 22.81, 51.86, 4.4, 2.4),

  // Center Floor (30–38)
  makeTable(30, 39.44, 53.87, 4.85, 2.3),
  makeTable(31, 49.13, 53.87, 4.8, 2.3),
  makeTable(32, 58.65, 53.87, 4.85, 2.3),
  makeTable(33, 58.65, 49.46, 4.85, 2.3),
  makeTable(34, 49.13, 49.46, 4.8, 2.3),
  makeTable(35, 39.44, 49.46, 4.85, 2.3),
  makeTable(36, 39.57, 45.1, 4.75, 2.2),
  makeTable(37, 49.18, 45.1, 4.7, 2.2),
  makeTable(38, 58.7, 45.07, 4.65, 2.15),

  // Right Dance Floor Column (39–46)
  makeTable(39, 74.0, 58.03, 4.6, 2.45),
  makeTable(40, 74.0, 53.84, 4.6, 2.45),
  makeTable(41, 73.91, 49.6, 4.6, 2.45),
  makeTable(42, 73.91, 45.24, 4.45, 2.35),
  makeTable(43, 73.91, 41.43, 4.45, 2.3),
  makeTable(44, 73.86, 37.18, 4.45, 2.3),
  makeTable(45, 73.82, 32.83, 4.45, 2.3),
  makeTable(46, 73.82, 28.99, 4.45, 2.3),

  // Top-Right Wing beside DJ (47–49)
  makeTable(47, 92.53, 20.13, 5.2, 2.3),
  makeTable(48, 84.61, 20.15, 5.2, 2.25),
  makeTable(49, 76.28, 20.1, 5.25, 2.3),

  // Bottom-Right Lounge Row (50–57)
  makeTable(50, 89.98, 90.4, 5.2, 2.55),
  makeTable(51, 89.98, 87.13, 5.2, 2.55),
  makeTable(52, 89.89, 84.0, 5.2, 2.5),
  makeTable(53, 89.89, 80.93, 5.2, 2.55),
  makeTable(54, 89.85, 77.84, 5.15, 2.55),
  makeTable(55, 89.85, 74.74, 5.15, 2.55),
  makeTable(56, 89.85, 71.7, 5.15, 2.55),
  makeTable(57, 89.8, 68.69, 5.1, 2.5),

  // Left Wall & Behind Bar (58–65)
  makeTable(58, 7.06, 57.63, 4.25, 2.25),
  makeTable(59, 3.69, 53.87, 4.25, 2.3),
  makeTable(60, 3.69, 51.12, 4.25, 2.3),
  makeTable(61, 3.78, 48.45, 4.1, 2.35),
  makeTable(62, 3.78, 45.56, 4.1, 2.3),
  makeTable(63, 56.38, 76.18, 5.0, 2.0),
  makeTable(64, 44.35, 76.18, 4.9, 2.0),
  makeTable(65, 31.97, 76.18, 5.0, 2.0),
];

export interface InstagramPostItem {
  id: string;
  src: string;
  alt: string;
  isVideo?: boolean;
}

export interface PartnerLogoItem {
  id: string;
  name: string;
  src: string;
}

export const INSTAGRAM_URL = 'https://www.instagram.com/555famousclubtanger/';

export const INSTAGRAM_POSTS: InstagramPostItem[] = [
  {
    id: 'ig-legends-reel',
    src: '/assets/instagram/ig-post-1.jpg',
    alt: '555 Tanger Marina Bay — The Club of Legends reel',
    isVideo: true,
  },
  {
    id: 'ig-legends-lineup-1',
    src: '/assets/instagram/ig-post-2.jpg',
    alt: '555 Tanger Marina Bay — The Club of Legends artists',
  },
  {
    id: 'ig-legends-emblem',
    src: '/assets/instagram/ig-post-3.jpg',
    alt: '555 Tanger Marina Bay — The Club of Legends emblem',
  },
  {
    id: 'ig-legends-lineup-2',
    src: '/assets/instagram/ig-post-4.jpg',
    alt: '555 Tanger Marina Bay — The Club of Legends guest DJs',
  },
];

export const INSTAGRAM_EXTRA_POSTS: InstagramPostItem[] = [
  {
    id: 'ig-extra-1',
    src: '/assets/aistudio/DSC03038_d536c553.jpg',
    alt: 'VIP Champagne Parade at 555 Famous Club Tanger',
  },
  {
    id: 'ig-extra-2',
    src: '/assets/aistudio/DSC02671_b8da7ee3.jpg',
    alt: 'Chivas Regal 18 bottle service at 555 Tanger',
  },
  {
    id: 'ig-extra-3',
    src: '/assets/aistudio/DSC02564_54b6896b.jpg',
    alt: 'Live percussion & laser show at 555 Famous Club Tanger',
  },
  {
    id: 'ig-extra-4',
    src: '/assets/aistudio/DSC00222_a5b37048.jpg',
    alt: 'Stage dancers & red laser production at 555 Tanger',
  },
];

export const PARTNER_LOGOS: PartnerLogoItem[] = [
  {
    id: 'partner-nommos-beach',
    name: 'Nommos Beach Resort & Pool Club Restaurant',
    src: '/assets/instagram/partner-nommos-beach.png',
  },
  {
    id: 'partner-secret-room',
    name: 'SR Secret Room',
    src: '/assets/instagram/partner-secret-room.png',
  },
  {
    id: 'partner-lalala',
    name: 'Lalala Restaurant',
    src: '/assets/instagram/partner-lalala.png',
  },
  {
    id: 'partner-nommos-marrakech',
    name: 'Nommos Marrakech',
    src: '/assets/instagram/partner-nommos-marrakech.png',
  },
  {
    id: 'partner-555-hotel',
    name: '555 Hotel Clubbing Marrakech',
    src: '/assets/instagram/partner-555-hotel.png',
  },
  {
    id: 'partner-famous-beach',
    name: 'Famous Beach',
    src: '/assets/instagram/partner-famous-beach.png',
  },
];

