/**
 * Marques et modèles proposés dans les sélecteurs des formulaires.
 *
 * Liste volontairement limitée aux marques et modèles les plus courants en
 * France (voitures particulières et utilitaires légers, y compris modèles
 * anciens encore fréquents à l'enlèvement ou en pièces). Ce n'est PAS une
 * base de compatibilité : elle sert seulement à faciliter la saisie. Le choix
 * « Autre » ouvre toujours un champ libre.
 *
 * Pour ajouter une marque ou un modèle : compléter ce fichier.
 */

export const VEHICLE_MODELS: Record<string, string[]> = {
  "Alfa Romeo": ["147", "156", "159", "Giulietta", "Giulia", "MiTo", "Stelvio", "Tonale"],
  Audi: ["A1", "A3", "A4", "A5", "A6", "A8", "Q2", "Q3", "Q5", "Q7", "Q8", "TT", "e-tron"],
  BMW: ["Série 1", "Série 2", "Série 3", "Série 4", "Série 5", "Série 7", "X1", "X2", "X3", "X4", "X5", "X6", "i3", "Z4"],
  Chevrolet: ["Aveo", "Captiva", "Cruze", "Matiz", "Spark"],
  Citroën: [
    "AX", "Saxo", "C1", "C2", "C3", "C3 Aircross", "C3 Picasso", "C4", "C4 Cactus", "C4 Picasso / SpaceTourer",
    "C5", "C5 Aircross", "C5 X", "C8", "Xsara", "Xsara Picasso", "ZX", "Xantia", "Berlingo", "Jumpy", "Jumper",
    "Nemo", "DS3", "DS4", "DS5",
  ],
  Cupra: ["Born", "Formentor", "Leon", "Ateca"],
  Dacia: ["Sandero", "Logan", "Duster", "Lodgy", "Dokker", "Jogger", "Spring"],
  DS: ["DS 3 / DS 3 Crossback", "DS 4", "DS 7", "DS 9"],
  Fiat: ["500", "500X", "500L", "Panda", "Punto", "Grande Punto", "Tipo", "Bravo", "Multipla", "Doblo", "Fiorino", "Scudo", "Ducato", "Seicento"],
  Ford: ["Ka", "Fiesta", "Focus", "Mondeo", "C-Max", "S-Max", "Galaxy", "Kuga", "Puma", "EcoSport", "Fusion", "Transit", "Transit Connect", "Transit Custom", "Ranger"],
  Honda: ["Jazz", "Civic", "Accord", "CR-V", "HR-V"],
  Hyundai: ["i10", "i20", "i30", "i40", "Kona", "Tucson", "Santa Fe", "ix35", "Getz", "Ioniq"],
  Iveco: ["Daily"],
  Jeep: ["Renegade", "Compass", "Cherokee", "Grand Cherokee", "Wrangler", "Avenger"],
  Kia: ["Picanto", "Rio", "Ceed", "Stonic", "Niro", "Sportage", "Sorento", "Venga", "Soul", "EV6"],
  Lancia: ["Ypsilon", "Delta", "Musa"],
  "Land Rover": ["Defender", "Discovery", "Discovery Sport", "Freelander", "Range Rover", "Range Rover Evoque", "Range Rover Sport"],
  Mazda: ["2", "3", "5", "6", "CX-3", "CX-30", "CX-5", "MX-5"],
  "Mercedes-Benz": [
    "Classe A", "Classe B", "Classe C", "Classe E", "Classe S", "CLA", "GLA", "GLB", "GLC", "GLE", "ML",
    "Citan", "Vito", "Sprinter",
  ],
  Mini: ["Mini (3 / 5 portes)", "Clubman", "Countryman", "Cabrio"],
  Mitsubishi: ["Colt", "ASX", "Outlander", "Space Star", "L200"],
  Nissan: ["Micra", "Note", "Juke", "Qashqai", "X-Trail", "Leaf", "Navara", "NV200", "Primastar"],
  Opel: ["Corsa", "Astra", "Meriva", "Zafira", "Insignia", "Vectra", "Mokka", "Crossland", "Grandland", "Agila", "Combo", "Vivaro", "Movano"],
  Peugeot: [
    "106", "107", "108", "206", "207", "208", "306", "307", "308", "406", "407", "508", "1007",
    "2008", "3008", "5008", "807", "Partner", "Rifter", "Bipper", "Expert", "Boxer",
  ],
  Porsche: ["911", "Boxster", "Cayenne", "Cayman", "Macan", "Panamera"],
  Renault: [
    "Twingo", "Clio", "Mégane", "Scénic", "Grand Scénic", "Laguna", "Espace", "Captur", "Kadjar", "Koleos",
    "Arkana", "Austral", "Modus", "Zoe", "Fluence", "Safrane", "Vel Satis", "Kangoo", "Trafic", "Master",
  ],
  Seat: ["Ibiza", "Leon", "Arona", "Ateca", "Tarraco", "Altea", "Toledo", "Alhambra", "Mii"],
  Skoda: ["Fabia", "Octavia", "Superb", "Kamiq", "Karoq", "Kodiaq", "Scala", "Roomster", "Yeti", "Enyaq"],
  Smart: ["Fortwo", "Forfour"],
  Suzuki: ["Swift", "Ignis", "Vitara", "SX4 / S-Cross", "Jimny", "Alto", "Celerio", "Splash"],
  Tesla: ["Model 3", "Model Y", "Model S", "Model X"],
  Toyota: ["Aygo", "Yaris", "Yaris Cross", "Corolla", "Auris", "Avensis", "C-HR", "RAV4", "Prius", "Verso", "Hilux", "Proace"],
  Volkswagen: [
    "Up!", "Polo", "Golf", "Golf Plus", "Golf Sportsvan", "Passat", "Jetta", "Touran", "Sharan", "T-Roc",
    "T-Cross", "Tiguan", "Touareg", "Scirocco", "ID.3", "ID.4", "Caddy", "Transporter", "Crafter",
  ],
  Volvo: ["C30", "S40", "S60", "V40", "V50", "V60", "V70", "XC40", "XC60", "XC90"],
};

export const VEHICLE_BRANDS = Object.keys(VEHICLE_MODELS).sort((a, b) => a.localeCompare(b, "fr"));

/** Valeur technique du choix « Autre » dans les sélecteurs. */
export const OTHER = "__autre";

/** Dernière année proposée (à relever chaque année). */
export const LAST_YEAR = 2026;
export const FIRST_YEAR = 1980;

export const YEAR_OPTIONS = [
  ...Array.from({ length: LAST_YEAR - FIRST_YEAR + 1 }, (_, i) => {
    const y = String(LAST_YEAR - i);
    return { value: y, label: y };
  }),
  { value: String(FIRST_YEAR - 1), label: `${FIRST_YEAR - 1} ou avant` },
];
