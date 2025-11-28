import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenAI } from "npm:@google/genai@latest";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, plantName, imageData, imageType, spaceSize, purpose } = await req.json();

    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    // Initialize GoogleGenAI with API key
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

    if (type === 'identify-image') {
      // Plant identification from image
      const identifyPrompt = `
Analyze this plant image and identify the plant. Return only the plant name in plain text, nothing else. 
If you cannot identify the plant with confidence, return "Unknown Plant".
Be specific with the plant name (e.g., "Rose", "Aloe Vera", "Snake Plant", etc.).
`;

      const contents = [
        {
          inlineData: {
            mimeType: imageType,
            data: imageData,
          },
        },
        { text: identifyPrompt },
      ];

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
      });

      const identifiedPlant = response.text?.trim();
      
      return new Response(
        JSON.stringify({ plantName: identifiedPlant || null }), 
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } else if (type === 'plant-info') {
      // Get detailed plant information
      console.log('Fetching plant info for:', plantName);
      
      const infoPrompt = `
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

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{ text: infoPrompt }],
      });

      const generatedText = response.text;
      
      if (!generatedText) {
        console.error('No text in Gemini response');
        throw new Error('No response text from Gemini API');
      }

      console.log('Generated text:', generatedText);
      
      const cleanedText = generatedText.replace(/```json\n?|\n?```/g, '').trim();
      console.log('Cleaned text:', cleanedText);
      
      const plantData = JSON.parse(cleanedText);
      console.log('Parsed plant data:', plantData);
      
      return new Response(
        JSON.stringify(plantData), 
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } else if (type === 'garden-plan') {
      // Garden planning recommendations
      const maxPlants = Math.floor(spaceSize / 1.5);
      
      const gardenPrompt = `
You are a garden planning expert. A user wants to create a ${purpose} garden in a ${spaceSize} square feet area.
Based on the calculation that each plant needs approximately 1.5 square feet, this space can accommodate ${maxPlants} plants.

Please suggest exactly ${maxPlants} diverse plants that are perfect for a ${purpose} garden. Make sure the plants are:
1. Appropriate for the "${purpose}" category
2. Diverse in species (no repetitions)
3. Compatible with each other
4. Include a mix of different heights, colors, and functions

Return your response in the following JSON format:
{
  "recommendations": [
    {
      "name": "Plant name",
      "scientificName": "Scientific name",
      "spacing": "Space requirement in sq ft",
      "careInstructions": "Brief care summary",
      "whyThisPlant": "Why this plant fits the ${purpose} category"
    }
  ],
  "layoutSuggestion": "Brief suggestion on how to arrange these ${maxPlants} plants in ${spaceSize} sq ft",
  "maintenanceSchedule": "Monthly maintenance overview for this garden"
}

Only return the JSON object, no additional text.
`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{ text: gardenPrompt }],
      });

      const generatedText = response.text;
      
      if (!generatedText) {
        throw new Error('No response from Gemini API');
      }

      const cleanedText = generatedText.replace(/```json\n?|\n?```/g, '').trim();
      const gardenData = JSON.parse(cleanedText);
      
      return new Response(
        JSON.stringify(gardenData), 
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    throw new Error('Invalid request type');

  } catch (error) {
    console.error('Error in gemini-plant-info function:', error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
