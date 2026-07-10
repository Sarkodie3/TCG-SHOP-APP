const fs = require('fs');
let code = fs.readFileSync('src/lib/data.js', 'utf8');

const singleCards = `export const singleCards = [
  {
    id: 'm5-mega-chandelure',
    name: '[M5] Mega Chandelure ex 036/081〈RR〉',
    slug: 'm5-mega-chandelure-ex-036-081-rr',
    category: 'pokemon',
    subcategory: 'single',
    price: 1.01,
    image: 'https://cdn.shopify.com/s/files/1/0614/1499/8212/files/xmF1v39ZqNhWwG78VOKaL62V8o4oBARG8EZOK4C2_500x_9d3b8e93-806a-41e6-bbda-c3d990cd7029.jpg?v=1779782821',
    badge: null,
    reviews: 0,
    brand: 'TCG SHOP KASUMI',
    variants: ['Near Mint (NM)', 'Excellent (EX)'],
    description: 'Authentic Pokemon TCG single card.'
  },
  {
    id: 'm5-brave-bangle',
    name: '[M5] Brave Bangle 107/081〈SR〉',
    slug: 'm5-brave-bangle-107-081-sr',
    category: 'pokemon',
    subcategory: 'single',
    price: 2.73,
    image: 'https://cdn.shopify.com/s/files/1/0614/1499/8212/files/8qxJEiQHFgKxKu6TIDjJQeycldDoXotLto3tZaKm_500x_6c207761-8166-4270-9951-d4efa267aaa3.jpg?v=1779782818',
    badge: null,
    reviews: 0,
    brand: 'TCG SHOP KASUMI',
    variants: ['Near Mint (NM)', 'Excellent (EX)'],
    description: 'Authentic Pokemon TCG single card.'
  },
  {
    id: 'm5-crushing-hammer',
    name: '[M5] Crushing Hammer 104/081〈SR〉',
    slug: 'm5-crushing-hammer-104-081-sr',
    category: 'pokemon',
    subcategory: 'single',
    price: 2.73,
    image: 'https://cdn.shopify.com/s/files/1/0614/1499/8212/files/BLS95iZS6gUZiGeQLVhEi1I5BNDmMsNXD2RtRydw_500x_beb3b1cf-68bf-401f-b641-55c8c9de5e44.jpg?v=1779782816',
    badge: null,
    reviews: 0,
    brand: 'TCG SHOP KASUMI',
    variants: ['Near Mint (NM)', 'Excellent (EX)'],
    description: 'Authentic Pokemon TCG single card.'
  },
  {
    id: 'm5-zarude',
    name: '[M5] Zarude 090/081〈AR〉',
    slug: 'm5-zarude-090-081-ar',
    category: 'pokemon',
    subcategory: 'single',
    price: 3.93,
    image: 'https://cdn.shopify.com/s/files/1/0614/1499/8212/files/2aYL1PI4ZzibAFAx66tbTtU3QsQTcJqtLKJVoaXz_500x_faf9a9de-8749-4d56-b849-40bd244933ca.jpg?v=1779782811',
    badge: null,
    reviews: 0,
    brand: 'TCG SHOP KASUMI',
    variants: ['Near Mint (NM)', 'Excellent (EX)'],
    description: 'Authentic Pokemon TCG single card.'
  },
  {
    id: 'm5-manectric',
    name: '[M5] Manectric 086/081〈AR〉',
    slug: 'm5-manectric-086-081-ar',
    category: 'pokemon',
    subcategory: 'single',
    price: 3.93,
    image: 'https://cdn.shopify.com/s/files/1/0614/1499/8212/files/NsD3IZ0eQdNH8KyLeeGCj0KqKqMl2uc42373iSB6_500x_b219e128-1152-4f62-940c-b65a7de73448.jpg?v=1779782808',
    badge: null,
    reviews: 0,
    brand: 'TCG SHOP KASUMI',
    variants: ['Near Mint (NM)', 'Excellent (EX)'],
    description: 'Authentic Pokemon TCG single card.'
  },
  {
    id: 'm5-armarouge',
    name: '[M5] Armarouge 083/081〈AR〉',
    slug: 'm5-armarouge-083-081-ar',
    category: 'pokemon',
    subcategory: 'single',
    price: 3.98,
    image: 'https://cdn.shopify.com/s/files/1/0614/1499/8212/files/DsmvjeLMNZG6U6F6Ikakk7odWGk3THHH63vkZxec_500x_24121bbf-5788-478e-a4ec-28d74ec98f75.jpg?v=1779782805',
    badge: null,
    reviews: 0,
    brand: 'TCG SHOP KASUMI',
    variants: ['Near Mint (NM)', 'Excellent (EX)'],
    description: 'Authentic Pokemon TCG single card.'
  },
  {
    id: 'm5-fomantis',
    name: '[M5] Fomantis 082/081〈AR〉',
    slug: 'm5-fomantis-082-081-ar',
    category: 'pokemon',
    subcategory: 'single',
    price: 3.98,
    image: 'https://cdn.shopify.com/s/files/1/0614/1499/8212/files/IGwDv2ky3HyPtBCi8ULIChCNj6GolfYmwgxUi2Zd_500x_7d4cff45-184f-4ede-bf64-ee13c2d751d7.jpg?v=1779782802',
    badge: null,
    reviews: 0,
    brand: 'TCG SHOP KASUMI',
    variants: ['Near Mint (NM)', 'Excellent (EX)'],
    description: 'Authentic Pokemon TCG single card.'
  },
  {
    id: 'op-p-159-monkey-d-luffy',
    name: '[P-159] Monkey.D.Luffy P',
    slug: 'op-p-159-monkey-d-luffy',
    category: 'onepiece',
    subcategory: 'single',
    price: 34.35,
    image: 'https://cdn.shopify.com/s/files/1/0614/1499/8212/files/p-159.webp?v=1783531311',
    badge: null,
    reviews: 0,
    brand: 'TCG SHOP KASUMI',
    variants: ['Near Mint (NM)', 'Excellent (EX)'],
    description: 'Authentic One Piece TCG single card.'
  },
  {
    id: 'op-p-041-monkey-d-luffy',
    name: '[P-041] Monkey.D.Luffy P〈ONE PIECE EMOTION〉',
    slug: 'op-p-041-monkey-d-luffy',
    category: 'onepiece',
    subcategory: 'single',
    price: 63.41,
    image: 'https://cdn.shopify.com/s/files/1/0614/1499/8212/files/m65276232534_1.jpg?v=1783189129',
    badge: null,
    reviews: 0,
    brand: 'TCG SHOP KASUMI',
    variants: ['Near Mint (NM)', 'Excellent (EX)'],
    description: 'Authentic One Piece TCG single card.'
  },
  {
    id: 'op-monkey-d-luffy-watermelon',
    name: 'Monkey.D.Luffy Watermelon〈NatsuComi Summer Comics Fair 2026〉',
    slug: 'op-monkey-d-luffy-watermelon',
    category: 'onepiece',
    subcategory: 'single',
    price: 42.85,
    image: 'https://cdn.shopify.com/s/files/1/0614/1499/8212/files/2026_1.png?v=1782539202',
    badge: null,
    reviews: 0,
    brand: 'TCG SHOP KASUMI',
    variants: ['Near Mint (NM)', 'Excellent (EX)'],
    description: 'Authentic One Piece TCG single card.'
  },
  {
    id: 'op16-055-mr-2',
    name: '[OP16-055] Mr.2.Bon.Kurei(Bentham) R/P〈Parallel〉',
    slug: 'op16-055-mr-2-bon-kurei-bentham',
    category: 'onepiece',
    subcategory: 'single',
    price: 28.47,
    image: 'https://cdn.shopify.com/s/files/1/0614/1499/8212/files/OP16_P_0528_13.jpg?v=1780165338',
    badge: null,
    reviews: 0,
    brand: 'TCG SHOP KASUMI',
    variants: ['Near Mint (NM)', 'Excellent (EX)'],
    description: 'Authentic One Piece TCG single card.'
  },
  {
    id: 'op16-082-kinemon',
    name: '[OP16-082] Kinemon SR/P〈Parallel〉',
    slug: 'op16-082-kinemon',
    category: 'onepiece',
    subcategory: 'single',
    price: 31.29,
    image: 'https://cdn.shopify.com/s/files/1/0614/1499/8212/files/OP16_P_0528_21.jpg?v=1780165332',
    badge: null,
    reviews: 0,
    brand: 'TCG SHOP KASUMI',
    variants: ['Near Mint (NM)', 'Excellent (EX)'],
    description: 'Authentic One Piece TCG single card.'
  },
  {
    id: 'op16-014-marco',
    name: '[OP16-014] Marco R/P〈Parallel〉',
    slug: 'op16-014-marco',
    category: 'onepiece',
    subcategory: 'single',
    price: 27.65,
    image: 'https://cdn.shopify.com/s/files/1/0614/1499/8212/files/OP16_P_0528_3.jpg?v=1780165326',
    badge: null,
    reviews: 0,
    brand: 'TCG SHOP KASUMI',
    variants: ['Near Mint (NM)', 'Excellent (EX)'],
    description: 'Authentic One Piece TCG single card.'
  },
  {
    id: 'op16-085-kozuki-momonosuke',
    name: '[OP16-085] Kozuki Momonosuke R/P〈Parallel〉',
    slug: 'op16-085-kozuki-momonosuke',
    category: 'onepiece',
    subcategory: 'single',
    price: 33.03,
    image: 'https://cdn.shopify.com/s/files/1/0614/1499/8212/files/OP16_P_0528_22.jpg?v=1780165318',
    badge: null,
    reviews: 0,
    brand: 'TCG SHOP KASUMI',
    variants: ['Near Mint (NM)', 'Excellent (EX)'],
    description: 'Authentic One Piece TCG single card.'
  }
];`;

const deckSets = `export const deckSets = [
  {
    id: '30th-celebration-futuristic-box',
    name: '30th CELEBRATION FUTURISTIC BOX',
    slug: '30th-celebration-futuristic-box',
    category: 'pokemon',
    subcategory: 'deck',
    price: 1000.00,
    image: 'https://cdn.shopify.com/s/files/1/0614/1499/8212/files/5_89fad6ab-c531-4f9a-99ae-c6ed9cf29f68.png?v=1783486530',
    badge: 'hot',
    reviews: 0,
    brand: 'TCG SHOP KASUMI',
    description: 'Authentic TCG deck set.',
    variants: null,
  },
  {
    id: '30th-celebration-premium-tcg-deck-set-espeon-umbreon',
    name: '30th CELEBRATION Premium TCG Deck set Espeon・Umbreon',
    slug: '30th-celebration-premium-tcg-deck-set-espeon-umbreon',
    category: 'pokemon',
    subcategory: 'deck',
    price: 499.99,
    image: 'https://cdn.shopify.com/s/files/1/0614/1499/8212/files/71RQY_K9JzL._AC_SL1500.jpg?v=1783407574',
    badge: null,
    reviews: 0,
    brand: 'TCG SHOP KASUMI',
    description: 'Authentic TCG deck set.',
    variants: null,
  },
  {
    id: 'mega-starter-set-ex-eevee-ex',
    name: 'MEGA Starter Set ex (Eevee ex)',
    slug: 'mega-starter-set-ex-eevee-ex',
    category: 'pokemon',
    subcategory: 'deck',
    price: 80.00,
    image: 'https://cdn.shopify.com/s/files/1/0614/1499/8212/files/deck_pkg-ylw-m0te1g6j.png?v=1783405531',
    badge: null,
    reviews: 0,
    brand: 'TCG SHOP KASUMI',
    description: 'Authentic TCG deck set.',
    variants: null,
  },
  {
    id: 'mega-starter-set-ex-zorua-zoroark-ex',
    name: 'MEGA Starter Set ex (Zorua & Zoroark ex)',
    slug: 'mega-starter-set-ex-zorua-zoroark-ex',
    category: 'pokemon',
    subcategory: 'deck',
    price: 80.00,
    image: 'https://cdn.shopify.com/s/files/1/0614/1499/8212/files/deck_pkg-blu-ky1bq7p1_e819b0a5-197e-460b-b675-5696985bff8c.png?v=1783405548',
    badge: null,
    reviews: 0,
    brand: 'TCG SHOP KASUMI',
    description: 'Authentic TCG deck set.',
    variants: null,
  },
  {
    id: '30th-celebration-tgc-card-set',
    name: '30th CELEBRATION TGC Card Set',
    slug: '30th-celebration-tgc-card-set',
    category: 'pokemon',
    subcategory: 'deck',
    price: 99.99,
    image: 'https://cdn.shopify.com/s/files/1/0614/1499/8212/files/1_813c1ffa-44da-479f-a113-12d22250ad0c.png?v=1783564928',
    badge: null,
    reviews: 0,
    brand: 'TCG SHOP KASUMI',
    description: 'Authentic TCG deck set.',
    variants: null,
  }
];`;

const gradingCards = `export const gradingCards = [
  {
    id: 'psa-grading-service',
    name: 'PSA Grading Service',
    slug: 'psa-grading',
    category: 'grading',
    subcategory: 'psa',
    price: 49.99,
    image: 'https://cdn.shopify.com/s/files/1/0614/1499/8212/files/135146081_c13e1967-25b6-4dad-9a1f-20fa433626d0.jpg?v=1762978542',
    badge: null,
    reviews: 8,
    brand: 'TCG SHOP KASUMI',
    description: 'Submit your cards for professional PSA grading. We handle the entire process from Japan.',
    variants: ['Economy', 'Standard', 'Express'],
  },
];`;

const newArrays = `
// =============================================
// PRODUCTS — Graded Cards
// =============================================
export const gradedCards = [
  {
    id: 'psa10-luffy-sr',
    name: '〔PSA10〕Monkey.D.Luffy SR〈ONE PIECE magazine〉',
    slug: 'psa10-luffy-sr',
    category: 'grading',
    subcategory: 'graded',
    price: 365.00,
    image: 'https://cdn.shopify.com/s/files/1/0614/1499/8212/files/135146081_c13e1967-25b6-4dad-9a1f-20fa433626d0.jpg?v=1762978542',
    brand: 'TCG SHOP KASUMI'
  },
  {
    id: 'psa10-luffy-p-one-piece-day25',
    name: '〔PSA10〕Monkey.D.Luffy P〈ONE PIECE DAY25〉',
    slug: 'psa10-luffy-p-one-piece-day25',
    category: 'grading',
    subcategory: 'graded',
    price: 250.00,
    image: 'https://cdn.shopify.com/s/files/1/0614/1499/8212/files/145582380.jpg?v=1769659947',
    brand: 'TCG SHOP KASUMI'
  },
  {
    id: 'psa10-mega-tokyos-pikachu',
    name: '〔PSA10〕Mega Tokyo\\'s Pikachu 098/XY-P〈P〉',
    slug: 'psa10-mega-tokyos-pikachu',
    category: 'grading',
    subcategory: 'graded',
    price: 1790.00,
    image: 'https://cdn.shopify.com/s/files/1/0614/1499/8212/files/77662980_72ce98c8-8376-4cfa-a0b5-28b1d9ee3c09.jpg?v=1762977168',
    brand: 'TCG SHOP KASUMI'
  },
  {
    id: 'psa10-ace-luffy-sabo',
    name: '〔PSA10〕ACE/LUFFY/SABO〈SHONEN JUMP #19〉',
    slug: 'psa10-ace-luffy-sabo',
    category: 'grading',
    subcategory: 'graded',
    price: 280.00,
    image: 'https://cdn.shopify.com/s/files/1/0614/1499/8212/files/147816555.jpg?v=1777520200',
    brand: 'TCG SHOP KASUMI'
  },
  {
    id: 'psa10-pikachu-chr',
    name: '〔PSA10〕Pikachu 054/049〈CHR〉',
    slug: 'psa10-pikachu-chr',
    category: 'grading',
    subcategory: 'graded',
    price: 530.00,
    image: 'https://cdn.shopify.com/s/files/1/0614/1499/8212/files/133772237_297fb54e-06f1-42c3-ad1b-f05ab0fe5074.png?v=1776570641',
    brand: 'TCG SHOP KASUMI'
  },
  {
    id: 'psa10-mistys-lapras',
    name: '〔PSA10〕Misty\\'s Lapras 072/063〈AR〉',
    slug: 'psa10-mistys-lapras',
    category: 'grading',
    subcategory: 'graded',
    price: 76.50,
    image: 'https://cdn.shopify.com/s/files/1/0614/1499/8212/files/125244926_c7e7f084-0989-40eb-8415-bf9f7f936684.jpg?v=1763201406',
    brand: 'TCG SHOP KASUMI'
  },
  {
    id: 'psa10-solgaleo-lunala-gx',
    name: '〔PSA10〕Solgaleo & Lunala GX (SA) 063/049〈SR〉',
    slug: 'psa10-solgaleo-lunala-gx',
    category: 'grading',
    subcategory: 'graded',
    price: 556.13,
    image: 'https://cdn.shopify.com/s/files/1/0614/1499/8212/files/76454617_c61df9cc-32f5-44da-87ed-b550dbb27452.jpg?v=1763201323',
    brand: 'TCG SHOP KASUMI'
  },
  {
    id: 'psa10-reds-pikachu',
    name: '〔PSA10〕Red\\'s Pikachu 270/SM-P〈P〉',
    slug: 'psa10-reds-pikachu',
    category: 'grading',
    subcategory: 'graded',
    price: 1500.00,
    image: 'https://cdn.shopify.com/s/files/1/0614/1499/8212/files/119106835_d60333c9-feba-45fe-9d5a-a71a5f58e399.jpg?v=1762977166',
    brand: 'TCG SHOP KASUMI'
  }
];

// =============================================
// PRODUCTS — Lorcana Boosters
// =============================================
export const lorcanaBoosters = [
  {
    id: 'lorcana-reign-of-jafar',
    name: 'Reign of Jafar TCG BOX',
    slug: 'lorcana-reign-of-jafar',
    category: 'lorcana',
    subcategory: 'booster-box',
    price: 34.25,
    image: 'https://cdn.shopify.com/s/files/1/0614/1499/8212/files/IMG_4154.jpg?v=1771986131',
    brand: 'TCG SHOP KASUMI'
  },
  {
    id: 'lorcana-archazias-island',
    name: 'Archazia\\'s Island Booster TCG BOX',
    slug: 'lorcana-archazias-island',
    category: 'lorcana',
    subcategory: 'booster-box',
    price: 34.95,
    image: 'https://cdn.shopify.com/s/files/1/0614/1499/8212/files/61sgiKoOWRL._AC_SL1100_-removebg-preview.png?v=1764121507',
    brand: 'TCG SHOP KASUMI'
  },
  {
    id: 'lorcana-azurite-sea',
    name: 'Azurite Sea Booster TCG BOX',
    slug: 'lorcana-azurite-sea',
    category: 'lorcana',
    subcategory: 'booster-box',
    price: 27.17,
    image: 'https://cdn.shopify.com/s/files/1/0614/1499/8212/files/Photo_25-11-04-11-53-44.652.jpg?v=1762226622',
    brand: 'TCG SHOP KASUMI'
  },
  {
    id: 'lorcana-shimmering-skies',
    name: 'Shimmering Skies Booster TCG BOX',
    slug: 'lorcana-shimmering-skies',
    category: 'lorcana',
    subcategory: 'booster-box',
    price: 18.21,
    image: 'https://cdn.shopify.com/s/files/1/0614/1499/8212/files/61N-SmuS2JL._AC_SL1100_-removebg-preview.png?v=1758106004',
    brand: 'TCG SHOP KASUMI'
  },
  {
    id: 'lorcana-ursulas-return',
    name: 'URSULA\\'S RETURN Booster TCG BOX',
    slug: 'lorcana-ursulas-return',
    category: 'lorcana',
    subcategory: 'booster-box',
    price: 22.22,
    image: 'https://cdn.shopify.com/s/files/1/0614/1499/8212/files/Photo_25-07-28-10-17-06.465.jpg?v=1753686589',
    brand: 'TCG SHOP KASUMI'
  },
  {
    id: 'lorcana-into-the-inklands',
    name: 'INTO THE INKLANDS Booster TCG BOX',
    slug: 'lorcana-into-the-inklands',
    category: 'lorcana',
    subcategory: 'booster-box',
    price: 20.80,
    image: 'https://cdn.shopify.com/s/files/1/0614/1499/8212/files/IMG_1307.jpg?v=1747451971',
    brand: 'TCG SHOP KASUMI'
  }
];

// =============================================
// PRODUCTS — OP Decks
// =============================================
export const opDecks = [
  {
    id: 'op-st30-luffy-ace',
    name: '【ST-30】STARTER DECK EX -Luffy & Ace-',
    slug: 'op-st30-luffy-ace',
    category: 'onepiece',
    subcategory: 'deck',
    price: 172.95,
    image: 'https://cdn.shopify.com/s/files/1/0614/1499/8212/files/91LyJj_6BZL._AC_SY879.jpg?v=1776745428',
    brand: 'TCG SHOP KASUMI'
  }
];
`;

code = code.replace(/export const singleCards = \[[\s\S]*?\];/, singleCards);
code = code.replace(/export const deckSets = \[[\s\S]*?\];/, deckSets);
code = code.replace(/export const gradingCards = \[[\s\S]*?\];/, gradingCards);

code += '\n' + newArrays;

fs.writeFileSync('src/lib/data.js', code);
