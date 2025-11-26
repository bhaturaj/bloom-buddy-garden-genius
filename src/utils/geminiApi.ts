
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

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const plantData = await response.json();
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

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
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
