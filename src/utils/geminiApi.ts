
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

const EDGE_FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/gemini-plant-info`;

export const generatePlantInfo = async (plantName: string): Promise<GeminiPlantData | null> => {
  try {
    console.log('Requesting plant info for:', plantName);
    console.log('Edge function URL:', EDGE_FUNCTION_URL);
    
    const response = await fetch(EDGE_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'plant-info',
        plantName
      })
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', errorText);
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    const plantData = await response.json();
    console.log('Received plant data:', plantData);
    return plantData;
  } catch (error) {
    console.error('Error generating plant info:', error);
    return null;
  }
};

export const identifyPlantFromImage = async (imageFile: File): Promise<string | null> => {
  try {
    console.log('Identifying plant from image:', imageFile.name);
    
    // Convert image to base64
    const base64Image = await fileToBase64(imageFile);
    const base64Data = base64Image.split(',')[1]; // Remove data:image/jpeg;base64, prefix

    const response = await fetch(EDGE_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'identify-image',
        imageData: base64Data,
        imageType: imageFile.type
      })
    });

    console.log('Image identification response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Image identification error:', errorText);
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Identified plant:', data.plantName);
    return data.plantName || null;
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
