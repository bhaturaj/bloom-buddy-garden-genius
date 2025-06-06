
export interface PlantData {
  name: string;
  scientificName: string;
  confidence: number;
  care: {
    watering: string;
    sunlight: string;
    soil: string;
    fertilizer: string;
    temperature: string;
  };
  benefits: string[];
  commonIssues: string[];
  bestSeason: string;
  growthTime: string;
  careLevel: "Low" | "Medium" | "High";
  purpose: string[];
}

export const plantDatabase: Record<string, PlantData> = {
  "peace lily": {
    name: "Peace Lily",
    scientificName: "Spathiphyllum wallisii",
    confidence: 95,
    care: {
      watering: "Water when top inch of soil is dry, typically every 1-2 weeks",
      sunlight: "Bright, indirect light. Avoid direct sunlight",
      soil: "Well-draining potting mix with peat moss",
      fertilizer: "Monthly during growing season with balanced liquid fertilizer",
      temperature: "65-80°F (18-27°C), avoid cold drafts"
    },
    benefits: ["Air-purifying qualities", "Low maintenance", "Beautiful white flowers", "Removes toxins from air"],
    commonIssues: [
      "Brown leaf tips (overwatering or low humidity)",
      "Yellow leaves (overwatering)",
      "No flowers (insufficient light)"
    ],
    bestSeason: "Spring and Summer for growth, can bloom year-round indoors",
    growthTime: "Medium (3-6 months)",
    careLevel: "Medium",
    purpose: ["Air-purifying", "Aesthetic", "Indoor decoration"]
  },
  "snake plant": {
    name: "Snake Plant",
    scientificName: "Sansevieria trifasciata",
    confidence: 98,
    care: {
      watering: "Water every 2-3 weeks, allow soil to dry completely between waterings",
      sunlight: "Low to bright, indirect light. Very adaptable",
      soil: "Well-draining succulent or cactus potting mix",
      fertilizer: "Feed monthly during spring and summer with diluted fertilizer",
      temperature: "60-80°F (15-27°C), can tolerate temperature fluctuations"
    },
    benefits: ["Releases oxygen at night", "Extremely low maintenance", "Drought tolerant", "Air purifying"],
    commonIssues: [
      "Root rot (overwatering)",
      "Mushy leaves (overwatering)",
      "Slow growth (normal characteristic)"
    ],
    bestSeason: "Spring and Summer for active growth",
    growthTime: "Slow (6-12 months)",
    careLevel: "Low",
    purpose: ["Air-purifying", "Low-light areas", "Beginner-friendly"]
  },
  "pothos": {
    name: "Golden Pothos",
    scientificName: "Epipremnum aureum",
    confidence: 92,
    care: {
      watering: "Water when top 1-2 inches of soil feel dry, about weekly",
      sunlight: "Bright to medium, indirect light. Can tolerate low light",
      soil: "Regular potting soil with good drainage",
      fertilizer: "Feed monthly during growing season with liquid fertilizer",
      temperature: "65-85°F (18-29°C), avoid cold drafts"
    },
    benefits: ["Fast growing", "Easy propagation", "Trailing vine", "Air purifying"],
    commonIssues: [
      "Yellowing leaves (overwatering or natural aging)",
      "Brown spots (direct sunlight)",
      "Leggy growth (insufficient light)"
    ],
    bestSeason: "Spring through Fall for active growth",
    growthTime: "Fast (2-3 months)",
    careLevel: "Low",
    purpose: ["Hanging baskets", "Trailing decoration", "Air-purifying"]
  },
  "monstera": {
    name: "Monstera Deliciosa",
    scientificName: "Monstera deliciosa",
    confidence: 90,
    care: {
      watering: "Water when top 1-2 inches of soil are dry, typically weekly",
      sunlight: "Bright, indirect light. Avoid direct sunlight",
      soil: "Well-draining potting mix with peat moss and perlite",
      fertilizer: "Monthly feeding during growing season with balanced fertilizer",
      temperature: "65-80°F (18-27°C), prefers humid conditions"
    },
    benefits: ["Large decorative leaves", "Air purifying", "Statement plant", "Can grow very large"],
    commonIssues: [
      "Yellow leaves (overwatering or natural aging)",
      "No fenestrations (insufficient light or young plant)",
      "Brown leaf tips (low humidity or water quality)"
    ],
    bestSeason: "Spring and Summer for rapid growth",
    growthTime: "Medium to Fast (3-4 months)",
    careLevel: "Medium",
    purpose: ["Statement piece", "Large spaces", "Air-purifying"]
  },
  "aloe vera": {
    name: "Aloe Vera",
    scientificName: "Aloe barbadensis miller",
    confidence: 96,
    care: {
      watering: "Water deeply but infrequently, every 2-3 weeks in summer, less in winter",
      sunlight: "Bright, indirect sunlight. Can tolerate some direct morning sun",
      soil: "Well-draining succulent or cactus potting mix",
      fertilizer: "Feed 2-3 times per year with succulent fertilizer",
      temperature: "55-80°F (13-27°C), protect from frost"
    },
    benefits: ["Medicinal properties", "Gel for burns and cuts", "Low maintenance", "Drought tolerant"],
    commonIssues: [
      "Soft, mushy leaves (overwatering)",
      "Brown/red leaves (too much direct sun)",
      "Stretching (insufficient light)"
    ],
    bestSeason: "Spring and Summer for growth",
    growthTime: "Slow to Medium (4-6 months)",
    careLevel: "Low",
    purpose: ["Medicinal", "Succulent collection", "Low-maintenance"]
  },
  "rubber plant": {
    name: "Rubber Plant",
    scientificName: "Ficus elastica",
    confidence: 88,
    care: {
      watering: "Water when top inch of soil is dry, typically every 1-2 weeks",
      sunlight: "Bright, indirect light. Can tolerate some direct morning sun",
      soil: "Well-draining potting mix with good aeration",
      fertilizer: "Monthly during growing season with balanced liquid fertilizer",
      temperature: "60-75°F (15-24°C), consistent temperatures preferred"
    },
    benefits: ["Air purifying", "Large glossy leaves", "Can grow into tree", "Statement plant"],
    commonIssues: [
      "Leaf drop (overwatering, underwatering, or environmental stress)",
      "Brown leaf edges (low humidity or fluoride in water)",
      "Sticky leaves (natural secretion when stressed)"
    ],
    bestSeason: "Spring and Summer for active growth",
    growthTime: "Medium (4-6 months)",
    careLevel: "Medium",
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
