
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
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

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

export const identifyPlantFromImage = async (imageFile: File): Promise<string | null> => {
  try {
    // Convert image to base64
    const base64Image = await fileToBase64(imageFile);
    
    const prompt = `
Analyze this plant image and identify the plant. Return only the plant name in plain text, nothing else. 
If you cannot identify the plant with confidence, return "Unknown Plant".
Be specific with the plant name (e.g., "Rose", "Aloe Vera", "Snake Plant", etc.).
`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [
            {
              text: prompt
            },
            {
              inline_data: {
                mime_type: imageFile.type,
                data: base64Image.split(',')[1] // Remove data:image/jpeg;base64, prefix
              }
            }
          ]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    const identifiedPlant = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    
    return identifiedPlant || null;
  } catch (error) {
    console.error('Error identifying plant from image:', error);
    return null;
  }
};

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};
