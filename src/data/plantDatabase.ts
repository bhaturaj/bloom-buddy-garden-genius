export interface PlantData {
  name: string;
  scientificName: string;
  confidence: number;
  category: string;
  wateringFrequency: string;
  waterAmount: string;
  sunlight: string;
  soilType: string;
  season: string;
  fertilizer: string;
  careLevel: "Easy" | "Medium" | "Hard";
  precautions: string;
  benefits: string[];
  care: {
    watering: string;
    sunlight: string;
    soil: string;
    fertilizer: string;
    temperature: string;
  };
  commonIssues: string[];
  bestSeason: string;
  growthTime: string;
  purpose: string[];
}

export const plantDatabase: Record<string, PlantData> = {
  "rose": {
    name: "Rose",
    scientificName: "Rosa",
    confidence: 95,
    category: "Flower-based",
    wateringFrequency: "Every 2 days",
    waterAmount: "500 ml",
    sunlight: "Full Sun (6+ hrs)",
    soilType: "Well-drained loamy soil",
    season: "Spring to Early Summer",
    fertilizer: "Monthly with phosphorus-rich fertilizer",
    careLevel: "Medium",
    precautions: "Avoid overwatering, prune dead flowers regularly",
    benefits: ["Beautiful flowers", "Mild fragrance", "Symbol of love"],
    care: {
      watering: "Every 2 days with 500ml water",
      sunlight: "Full Sun (6+ hours daily)",
      soil: "Well-drained loamy soil",
      fertilizer: "Monthly with phosphorus-rich fertilizer",
      temperature: "15-25°C (59-77°F)"
    },
    commonIssues: ["Black spot disease", "Aphid infestation", "Powdery mildew"],
    bestSeason: "Spring to Early Summer",
    growthTime: "Medium (3-4 months)",
    purpose: ["Flower-based", "Aesthetic", "Fragrance"]
  },
  "tulsi": {
    name: "Tulsi",
    scientificName: "Ocimum tenuiflorum",
    confidence: 98,
    category: "Ayurvedic/Medicinal",
    wateringFrequency: "Daily (small amount)",
    waterAmount: "200 ml",
    sunlight: "Full sunlight (5-6 hrs)",
    soilType: "Sandy-loam",
    season: "All year, best in summer",
    fertilizer: "Every 3-4 weeks with organic compost",
    careLevel: "Easy",
    precautions: "Don't water in excess, avoid too much shade",
    benefits: ["Medicinal", "Air purifier", "Used in herbal tea"],
    care: {
      watering: "Daily with 200ml water (small amount)",
      sunlight: "Full sunlight (5-6 hours)",
      soil: "Sandy-loam soil",
      fertilizer: "Every 3-4 weeks with organic compost",
      temperature: "20-30°C (68-86°F)"
    },
    commonIssues: ["Overwatering", "Fungal infections", "Pest attacks"],
    bestSeason: "All year, best in summer",
    growthTime: "Fast (2-3 months)",
    purpose: ["Ayurvedic/Medicinal", "Air-purifying", "Herbal tea"]
  },
  "aloe vera": {
    name: "Aloe Vera",
    scientificName: "Aloe barbadensis miller",
    confidence: 96,
    category: "Ayurvedic/Medicinal",
    wateringFrequency: "Every 3–4 days",
    waterAmount: "300 ml",
    sunlight: "Indirect sunlight",
    soilType: "Sandy soil, well-drained",
    season: "Summer",
    fertilizer: "Rarely required",
    careLevel: "Easy",
    precautions: "Don't overwater, protect from frost",
    benefits: ["Heals burns & skin issues", "Air purifier", "Low maintenance"],
    care: {
      watering: "Water deeply but infrequently, every 2-3 weeks in summer, less in winter",
      sunlight: "Bright, indirect sunlight. Can tolerate some direct morning sun",
      soil: "Well-draining succulent or cactus potting mix",
      fertilizer: "Feed 2-3 times per year with succulent fertilizer",
      temperature: "55-80°F (13-27°C), protect from frost"
    },
    commonIssues: [
      "Soft, mushy leaves (overwatering)",
      "Brown/red leaves (too much direct sun)",
      "Stretching (insufficient light)"
    ],
    bestSeason: "Spring and Summer for growth",
    growthTime: "Slow to Medium (4-6 months)",
    purpose: ["Medicinal", "Succulent collection", "Low-maintenance"]
  },
  "snake plant": {
    name: "Snake Plant",
    scientificName: "Sansevieria trifasciata",
    confidence: 98,
    category: "Air-purifying",
    wateringFrequency: "Once a week",
    waterAmount: "250 ml",
    sunlight: "Low to bright indirect",
    soilType: "Well-drained potting mix",
    season: "All year",
    fertilizer: "Once a month (mild fertilizer)",
    careLevel: "Easy",
    precautions: "Avoid water on leaves, don't expose to cold wind",
    benefits: ["Air purifier", "Low light friendly", "Absorbs toxins"],
    care: {
      watering: "Water every 2-3 weeks, allow soil to dry completely between waterings",
      sunlight: "Low to bright, indirect light. Very adaptable",
      soil: "Well-draining succulent or cactus potting mix",
      fertilizer: "Feed monthly during spring and summer with diluted fertilizer",
      temperature: "60-80°F (15-27°C), can tolerate temperature fluctuations"
    },
    commonIssues: [
      "Root rot (overwatering)",
      "Mushy leaves (overwatering)",
      "Slow growth (normal characteristic)"
    ],
    bestSeason: "Spring and Summer for active growth",
    growthTime: "Slow (6-12 months)",
    purpose: ["Air-purifying", "Low-light areas", "Beginner-friendly"]
  },
  "money plant": {
    name: "Money Plant",
    scientificName: "Epipremnum aureum",
    confidence: 92,
    category: "Good-looking",
    wateringFrequency: "Twice a week",
    waterAmount: "400 ml",
    sunlight: "Indirect sunlight",
    soilType: "Rich loamy soil",
    season: "All year",
    fertilizer: "Every 2-3 weeks",
    careLevel: "Easy",
    precautions: "Avoid direct sun, prune regularly for shape",
    benefits: ["Good looking", "Positive vibe", "Air purifier"],
    care: {
      watering: "Twice a week with 400ml water",
      sunlight: "Bright to medium, indirect light",
      soil: "Rich loamy soil with good drainage",
      fertilizer: "Every 2-3 weeks with liquid fertilizer",
      temperature: "18-29°C (65-85°F)"
    },
    commonIssues: ["Yellowing leaves", "Brown spots", "Leggy growth"],
    bestSeason: "All year",
    growthTime: "Fast (2-3 months)",
    purpose: ["Good-looking", "Trailing decoration", "Air-purifying"]
  },
  "marigold": {
    name: "Marigold",
    scientificName: "Tagetes",
    confidence: 94,
    category: "Flower-based",
    wateringFrequency: "Every 2–3 days",
    waterAmount: "500 ml",
    sunlight: "Full sun",
    soilType: "Moderately fertile soil",
    season: "Summer and Monsoon",
    fertilizer: "Every 2 weeks",
    careLevel: "Medium",
    precautions: "Remove dried flowers to boost growth",
    benefits: ["Bright flowers", "Repels insects", "Used in decoration"],
    care: {
      watering: "Every 2-3 days with 500ml water",
      sunlight: "Full sun exposure",
      soil: "Moderately fertile, well-drained soil",
      fertilizer: "Every 2 weeks with balanced fertilizer",
      temperature: "18-24°C (65-75°F)"
    },
    commonIssues: ["Aphids", "Fungal diseases", "Wilting in extreme heat"],
    bestSeason: "Summer and Monsoon",
    growthTime: "Medium (2-3 months)",
    purpose: ["Flower-based", "Insect repellent", "Decoration"]
  },
  "jasmine": {
    name: "Jasmine",
    scientificName: "Jasminum",
    confidence: 93,
    category: "Flower-based",
    wateringFrequency: "Every 2 days",
    waterAmount: "400 ml",
    sunlight: "Full to partial sun",
    soilType: "Moist, well-drained",
    season: "Spring and Summer",
    fertilizer: "Monthly organic compost",
    careLevel: "Medium",
    precautions: "Avoid soggy soil, prune after bloom",
    benefits: ["Strong fragrance", "Used in perfumes", "Beautiful flowers"],
    care: {
      watering: "Every 2 days with 400ml water",
      sunlight: "Full to partial sun",
      soil: "Moist, well-drained soil",
      fertilizer: "Monthly organic compost",
      temperature: "16-24°C (60-75°F)"
    },
    commonIssues: ["Root rot", "Scale insects", "Leaf yellowing"],
    bestSeason: "Spring and Summer",
    growthTime: "Medium (3-4 months)",
    purpose: ["Flower-based", "Fragrance", "Perfume production"]
  },
  "hibiscus": {
    name: "Hibiscus",
    scientificName: "Hibiscus rosa-sinensis",
    confidence: 91,
    category: "Mix & Match",
    wateringFrequency: "Daily in summer, alternate in winter",
    waterAmount: "500 ml",
    sunlight: "Full sun",
    soilType: "Fertile, loamy",
    season: "Spring to Autumn",
    fertilizer: "Every 2 weeks",
    careLevel: "Medium",
    precautions: "Avoid cold weather, support plant if needed",
    benefits: ["Big flowers", "Medicinal uses", "Garden attraction"],
    care: {
      watering: "Daily in summer (500ml), alternate days in winter",
      sunlight: "Full sun exposure",
      soil: "Fertile, loamy soil",
      fertilizer: "Every 2 weeks with balanced fertilizer",
      temperature: "18-32°C (65-90°F)"
    },
    commonIssues: ["Aphids", "Whiteflies", "Bud drop"],
    bestSeason: "Spring to Autumn",
    growthTime: "Medium (3-5 months)",
    purpose: ["Mix & Match", "Large flowers", "Medicinal"]
  },
  "neem": {
    name: "Neem",
    scientificName: "Azadirachta indica",
    confidence: 97,
    category: "Ayurvedic/Medicinal",
    wateringFrequency: "Every 3 days (young), weekly (mature)",
    waterAmount: "500 ml (young)",
    sunlight: "Full sunlight",
    soilType: "Sandy and well-drained",
    season: "Spring",
    fertilizer: "Rarely needed",
    careLevel: "Medium",
    precautions: "Protect young trees from frost",
    benefits: ["Medicinal", "Insect repellent", "Used in Ayurveda"],
    care: {
      watering: "Every 3 days for young plants, weekly for mature",
      sunlight: "Full sunlight exposure",
      soil: "Sandy and well-drained soil",
      fertilizer: "Rarely needed",
      temperature: "21-32°C (70-90°F)"
    },
    commonIssues: ["Scale insects", "Caterpillars", "Frost damage"],
    bestSeason: "Spring",
    growthTime: "Slow (6-12 months for young plants)",
    purpose: ["Ayurvedic/Medicinal", "Insect repellent", "Natural pesticide"]
  },
  "lavender": {
    name: "Lavender",
    scientificName: "Lavandula",
    confidence: 95,
    category: "Good-looking",
    wateringFrequency: "Every 3–4 days",
    waterAmount: "300 ml",
    sunlight: "Full sun",
    soilType: "Sandy, well-drained",
    season: "Spring & Summer",
    fertilizer: "Light compost monthly",
    careLevel: "Medium",
    precautions: "Avoid wet roots, requires good airflow",
    benefits: ["Beautiful & fragrant", "Used in aromatherapy", "Low maintenance"],
    care: {
      watering: "Every 3-4 days with 300ml water",
      sunlight: "Full sun exposure",
      soil: "Sandy, well-drained soil",
      fertilizer: "Light compost monthly",
      temperature: "15-30°C (60-85°F)"
    },
    commonIssues: ["Root rot", "Fungal diseases", "Poor flowering"],
    bestSeason: "Spring & Summer",
    growthTime: "Medium (3-4 months)",
    purpose: ["Good-looking", "Aromatherapy", "Fragrance"]
  },
  "peace lily": {
    name: "Peace Lily",
    scientificName: "Spathiphyllum wallisii",
    confidence: 95,
    category: "Air-purifying",
    wateringFrequency: "Every 1-2 weeks",
    waterAmount: "400 ml",
    sunlight: "Bright, indirect light",
    soilType: "Well-draining potting mix with peat moss",
    season: "Spring and Summer",
    fertilizer: "Monthly during growing season",
    careLevel: "Medium",
    precautions: "Avoid direct sunlight, maintain humidity",
    benefits: ["Air-purifying qualities", "Low maintenance", "Beautiful white flowers", "Removes toxins from air"],
    care: {
      watering: "Water when top inch of soil is dry, typically every 1-2 weeks",
      sunlight: "Bright, indirect light. Avoid direct sunlight",
      soil: "Well-draining potting mix with peat moss",
      fertilizer: "Monthly during growing season with balanced liquid fertilizer",
      temperature: "65-80°F (18-27°C), avoid cold drafts"
    },
    commonIssues: [
      "Brown leaf tips (overwatering or low humidity)",
      "Yellow leaves (overwatering)",
      "No flowers (insufficient light)"
    ],
    bestSeason: "Spring and Summer for growth, can bloom year-round indoors",
    growthTime: "Medium (3-6 months)",
    purpose: ["Air-purifying", "Aesthetic", "Indoor decoration"]
  },
  "pothos": {
    name: "Golden Pothos",
    scientificName: "Epipremnum aureum",
    confidence: 92,
    category: "Good-looking",
    wateringFrequency: "Weekly",
    waterAmount: "400 ml",
    sunlight: "Bright to medium, indirect light",
    soilType: "Regular potting soil with good drainage",
    season: "Spring through Fall",
    fertilizer: "Monthly during growing season",
    careLevel: "Easy",
    precautions: "Avoid direct sunlight, prune for shape",
    benefits: ["Fast growing", "Easy propagation", "Trailing vine", "Air purifying"],
    care: {
      watering: "Water when top 1-2 inches of soil feel dry, about weekly",
      sunlight: "Bright to medium, indirect light. Can tolerate low light",
      soil: "Regular potting soil with good drainage",
      fertilizer: "Feed monthly during growing season with liquid fertilizer",
      temperature: "65-85°F (18-29°C), avoid cold drafts"
    },
    commonIssues: [
      "Yellowing leaves (overwatering or natural aging)",
      "Brown spots (direct sunlight)",
      "Leggy growth (insufficient light)"
    ],
    bestSeason: "Spring through Fall for active growth",
    growthTime: "Fast (2-3 months)",
    purpose: ["Hanging baskets", "Trailing decoration", "Air-purifying"]
  },
  "monstera": {
    name: "Monstera Deliciosa",
    scientificName: "Monstera deliciosa",
    confidence: 90,
    category: "Good-looking",
    wateringFrequency: "Weekly",
    waterAmount: "500 ml",
    sunlight: "Bright, indirect light",
    soilType: "Well-draining potting mix with peat moss and perlite",
    season: "Spring and Summer",
    fertilizer: "Monthly during growing season",
    careLevel: "Medium",
    precautions: "Avoid direct sunlight, maintain humidity",
    benefits: ["Large decorative leaves", "Air purifying", "Statement plant", "Can grow very large"],
    care: {
      watering: "Water when top 1-2 inches of soil are dry, typically weekly",
      sunlight: "Bright, indirect light. Avoid direct sunlight",
      soil: "Well-draining potting mix with peat moss and perlite",
      fertilizer: "Monthly feeding during growing season with balanced fertilizer",
      temperature: "65-80°F (18-27°C), prefers humid conditions"
    },
    commonIssues: [
      "Yellow leaves (overwatering or natural aging)",
      "No fenestrations (insufficient light or young plant)",
      "Brown leaf tips (low humidity or water quality)"
    ],
    bestSeason: "Spring and Summer for rapid growth",
    growthTime: "Medium to Fast (3-4 months)",
    purpose: ["Statement piece", "Large spaces", "Air-purifying"]
  },
  "rubber plant": {
    name: "Rubber Plant",
    scientificName: "Ficus elastica",
    confidence: 88,
    category: "Good-looking",
    wateringFrequency: "Every 1-2 weeks",
    waterAmount: "450 ml",
    sunlight: "Bright, indirect light",
    soilType: "Well-draining potting mix with good aeration",
    season: "Spring and Summer",
    fertilizer: "Monthly during growing season",
    careLevel: "Medium",
    precautions: "Avoid overwatering, maintain consistent temperature",
    benefits: ["Air purifying", "Large glossy leaves", "Can grow into tree", "Statement plant"],
    care: {
      watering: "Water when top inch of soil is dry, typically every 1-2 weeks",
      sunlight: "Bright, indirect light. Can tolerate some direct morning sun",
      soil: "Well-draining potting mix with good aeration",
      fertilizer: "Monthly during growing season with balanced liquid fertilizer",
      temperature: "60-75°F (15-24°C), consistent temperatures preferred"
    },
    commonIssues: [
      "Leaf drop (overwatering, underwatering, or environmental stress)",
      "Brown leaf edges (low humidity or fluoride in water)",
      "Sticky leaves (natural secretion when stressed)"
    ],
    bestSeason: "Spring and Summer for active growth",
    growthTime: "Medium (4-6 months)",
    purpose: ["Air-purifying", "Statement piece", "Tree-like growth"]
  }
};

export const getPlantInfo = (plantName: string): PlantData | null => {
  const normalizedName = plantName.toLowerCase().trim();
  
  // Direct match
  if (plantDatabase[normalizedName]) {
    return plantDatabase[normalizedName];
  }
  
  // Partial match
  for (const [key, value] of Object.entries(plantDatabase)) {
    if (key.includes(normalizedName) || normalizedName.includes(key) || 
        value.name.toLowerCase().includes(normalizedName) ||
        value.scientificName.toLowerCase().includes(normalizedName)) {
      return value;
    }
  }
  
  return null;
};
