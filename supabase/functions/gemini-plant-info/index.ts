import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const GEMINI_API_KEY = "AIzaSyCMile1idxBdMjJpGDW27ajCeoGfmZY46w";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, plantName, imageData, imageType, spaceSize, purpose } = await req.json();

    let response;

    if (type === 'identify-image') {
      // Plant identification from image
      const identifyPrompt = `Identify the plant in this image. Return ONLY the common plant name, nothing else. Examples of valid responses: "Coleus", "Rose", "Aloe Vera", "Snake Plant". If you cannot identify it, respond with "Unknown Plant".`;

      response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: identifyPrompt },
              {
                inline_data: {
                  mime_type: imageType,
                  data: imageData
                }
              }
            ]
          }]
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Gemini API error for image identification:', errorText);
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Gemini image identification response:', JSON.stringify(data, null, 2));

      const identifiedPlant = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      console.log('Extracted plant name:', identifiedPlant);
      
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

      response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: infoPrompt }]
          }]
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Gemini API error response:', errorText);
        throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Gemini API response data:', JSON.stringify(data));
      
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!generatedText) {
        console.error('No text in Gemini response:', data);
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

      response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: gardenPrompt }]
          }]
        })
      });

      const data = await response.json();
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }), 
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
