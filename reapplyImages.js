const fs = require('fs');

const scrapedImages = require('./scraped_images.json');
const imageUrls = Object.values(scrapedImages).filter(url => typeof url === 'string' && url.startsWith('http'));

const csvData = [
  {"name": "Storm Emerard (M6)", "price": 72.67},
  {"name": "Abyss Eye (M5)", "price": 75.18},
  {"name": "Ninja Spinner (M4)", "price": 59.52},
  {"name": "Nihil Zero(M3)", "price": 101.49},
  {"name": "Mega Dream ex(M2a)", "price": 16.29},
  {"name": "Start Deck 100 Battle Collection", "price": 162.89},
  {"name": "Gengar Starter Set", "price": 80.19},
  {"name": "Mega Brave(M1L)", "price": 72.05},
  {"name": "Mega Symphonia(M1S)", "price": 194.21},
  {"name": "Pokemon Center Mega Blave", "price": 156.62},
  {"name": "Mega Trainer BOX", "price": 112.77},
  {"name": "Tohoku BOX", "price": 144.09},
  {"name": "Hiroshima BOX", "price": 128.43},
  {"name": "White Flare Deluxe(SV11W)", "price": 159.75},
  {"name": "Black Volt(SV11B)", "price": 144.09},
  {"name": "White Flare(SV11W)", "price": 187.95},
  {"name": "Glory of Team Rocket(Sv10)", "price": 125.3},
  {"name": "Heat Wave Arena(SV9a)", "price": 68.91},
  {"name": "Battle Partners(SV9)", "price": 137.83},
  {"name": "Terastal Festa(SV8a)", "price": 219.27},
  {"name": "Super Electric Breaker（SV8)", "price": 103.37},
  {"name": "Paradise Ⅾragona（SV7a)", "price": 75.18},
  {"name": "Stella Miracle （SV7）", "price": 71.42},
  {"name": "Night wanderer (SV6a)", "price": 90.84},
  {"name": "Mask of Transformation(SV6)", "price": 90.84},
  {"name": "Crimson Haze(SV5a)", "price": 88.96},
  {"name": "Wild Force (SV5K）", "price": 75.18},
  {"name": "Cyber Judge(SV5M）", "price": 128.43},
  {"name": "Shiny Treasure(SV4a)", "price": 77.06},
  {"name": "Ancient Roar(SV4K）", "price": 72.05},
  {"name": "Future Flash(SV4M）", "price": 92.09},
  {"name": "Raging Surf(SV3a)", "price": 122.17},
  {"name": "Ruler of Black Flame(SV3)", "price": 388.42},
  {"name": "Pokemon Card 151(SV2a)", "price": 75.18},
  {"name": "Snow Hazard (SV2P)", "price": 73.93},
  {"name": "Clay burst (SV2D）", "price": 125.3},
  {"name": "Triplet Beat(SV1a)", "price": 92.09},
  {"name": "Scarlet(SV1S）", "price": 73.93},
  {"name": "Violet(SV1V）", "price": 197.34},
  {"name": "VSTAR Universe(s12a)", "price": 137.83},
  {"name": "Paradigm Triggr(s12)", "price": 70.79},
  {"name": "Incandescent Arcana(s11a)", "price": 338.3},
  {"name": "Lost Abyss(s11)", "price": 203.61},
  {"name": "Pokemon Go(s10b)", "price": 205.49},
  {"name": "Dark Phantasma(s10a)", "price": 98.99},
  {"name": "Time Gazer(s10D）", "price": 93.97},
  {"name": "Space Juggler(s10P）", "price": 92.72},
  {"name": "Battle Region(s9a)", "price": 131.56},
  {"name": "Shiny Star V (s4a)", "price": 864.55},
  {"name": "Eevee Hearos (S6a)", "price": 147.22},
  {"name": "Jet-Black Spirit (s6k)", "price": 375.89},
  {"name": "Fusion Arts (s8)", "price": 144.09},
  {"name": "Star Vers (s9)", "price": 122.17}
];

function generateSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const newBoosterBoxes = csvData.map((item, index) => {
  const img = imageUrls[index % imageUrls.length]; // Give them an image
  return `  {
    id: "tcg-pk-sv-${index + 101}",
    name: "${item.name}",
    slug: "${generateSlug(item.name)}-tcg-box",
    category: "pokemon",
    subcategory: "booster-box",
    price: ${item.price},
    casePrice: null,
    image: "${img}",
    badge: ${index === 0 ? '"new"' : index === 1 ? '"hot"' : 'null'},
    reviews: Math.floor(Math.random() * 20),
    brand: "TCG SHOP KASUMI",
    description: "Experience the thrill of Pokémon with the highly sought-after ${item.name} box. Contains multiple booster packs inside.",
    variants: ["1 BOX"],
  }`;
});

const fileContent = fs.readFileSync('src/lib/data.js', 'utf8');
const startMarker = 'export const pokemonBoosterBoxes = [';
const startIndex = fileContent.indexOf(startMarker);
if (startIndex !== -1) {
  const restOfFile = fileContent.substring(startIndex);
  const endMatch = restOfFile.match(/\];\n/);
  if (endMatch) {
    const endIndex = startIndex + endMatch.index + 2;
    
    const newArrayString = `${startMarker}\n${newBoosterBoxes.join(',\n')}\n];\n`;
    const newFileContent = fileContent.substring(0, startIndex) + newArrayString + fileContent.substring(endIndex);
    
    fs.writeFileSync('src/lib/data.js', newFileContent);
    console.log("Restored original CSV names AND applied unique images!");
  }
}
