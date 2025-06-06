
export interface GeminiPlantData {
  name: string;
  scientificName: string;
  category: string;
  wateringFrequency: string;
  waterAmount: string;
  sunlight: string;
  soilType: string;
  season: string;
  fertilizer: string;
  careLevel: string;
  precautions: string;
  benefits: string[];
  commonIssues?: string[];
  growthTime?: string;
  confidence: number;
}

const GEMINI_API_KEY = "AIzaSyDWMGrUGWxcNBx8buaiUTKlX52LuXXc9XI";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

export const generatePlantInfo = async (plantName: string): Promise<GeminiPlantData | null> => {
  const prompt = `
Please provide detailed information about the plant "${plantName}" in the following JSON format. Be accurate and specific:

{
  "name": "Exact plant name",
  "scientificName": "Scientific name",
  "category": "Choose from: Flower-based, Ayurvedic/Medicinal, Air-purifying, Good-looking, Mix & Match",
  "wateringFrequency": "Specific watering schedule (e.g., Every 2 days, Daily, Once a week)",
  "waterAmount": "Amount in ml (e.g., 300 ml)",
  "sunlight": "Light requirements (e.g., Full sun, Indirect sunlight, Low light)",
  "soilType": "Soil type needed (e.g., Well-drained loamy soil, Sandy soil)",
  "season": "Best growing season",
  "fertilizer": "Fertilizer requirements and frequency",
  "careLevel": "Easy, Medium, or Hard",
  "precautions": "Important care precautions",
  "benefits": ["list", "of", "benefits"],
  "commonIssues": ["common", "problems", "and", "solutions"],
  "growthTime": "Time to maturity",
  "confidence": 95
}

Only return the JSON object, no additional text. If the plant doesn't exist, return null.
`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!generatedText) {
      throw new Error('No response from Gemini API');
    }

    // Clean and parse the JSON response
    const cleanedText = generatedText.replace(/```json\n?|\n?```/g, '').trim();
    const plantData = JSON.parse(cleanedText);
    
    return plantData;
  } catch (error) {
    console.error('Error generating plant info:', error);
    return null;
  }
};
