
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Leaf, Sun, Calendar, Plus, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";

interface GardenPlannerProps {
  onBack: () => void;
}

interface PlantRecommendation {
  name: string;
  scientificName: string;
  purpose: string;
  position: string;
  careLevel: string;
  growthTime: string;
  benefits: string[];
  whySelected: string;
  wateringFrequency: string;
  waterAmount: string;
  sunlight: string;
  soilType: string;
  fertilizer: string;
  precautions: string;
}

const GardenPlanner = ({ onBack }: GardenPlannerProps) => {
  const [spaceSize, setSpaceSize] = useState("");
  const [customArea, setCustomArea] = useState("");
  const [purpose, setPurpose] = useState("");
  const [recommendations, setRecommendations] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const spaceSizes = [
    { value: "small", label: "Small Garden", area: 16 }, // 4x4 ft
    { value: "medium", label: "Medium Garden", area: 36 }, // 6x6 ft
    { value: "large", label: "Large Garden", area: 64 }, // 8x8 ft
    { value: "very-large", label: "Very Large Garden", area: 100 }, // 10x10 ft
    { value: "custom", label: "Custom Size", area: 0 }
  ];

  const purposes = [
    { value: "flower", label: "🌸 Flower-based Garden", desc: "Beautiful flowering plants" },
    { value: "aesthetic", label: "🪴 Good-looking Garden", desc: "Visually appealing foliage" },
    { value: "medicinal", label: "🌿 Ayurvedic/Medicinal", desc: "Therapeutic and healing plants" },
    { value: "air", label: "💨 Air-purifying", desc: "Clean air and healthy environment" },
    { value: "mixed", label: "🍀 Mix & Match", desc: "Combination of all benefits" }
  ];

  const calculatePlantCount = (area: number): number => {
    // Using 1.5 sq.ft per plant as specified
    return Math.floor(area / 1.5);
  };

  const getGardenArea = (): number => {
    if (spaceSize === "custom") {
      return parseFloat(customArea) || 0;
    }
    const selectedSpace = spaceSizes.find(s => s.value === spaceSize);
    return selectedSpace?.area || 0;
  };

  const generateAIRecommendations = async (plantCount: number, gardenPurpose: string): Promise<PlantRecommendation[]> => {
    const EDGE_FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/gemini-plant-info`;

    try {
      const response = await fetch(EDGE_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'garden-plan',
          spaceSize: getGardenArea(),
          purpose: gardenPurpose
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      
      // Transform the response to match expected format
      return data.recommendations.map((plant: any) => ({
        name: plant.name,
        scientificName: plant.scientificName,
        purpose: plant.whyThisPlant,
        position: "As suggested in layout",
        careLevel: "Medium",
        growthTime: "3-6 months",
        benefits: [plant.whyThisPlant],
        whySelected: plant.whyThisPlant,
        wateringFrequency: "As per care instructions",
        waterAmount: "Varies",
        sunlight: plant.careInstructions,
        soilType: "Well-draining soil",
        fertilizer: "Monthly",
        precautions: plant.careInstructions
      }));
    } catch (error) {
      console.error('Error generating AI recommendations:', error);
      toast.error('Failed to generate AI recommendations. Using fallback data.');
      return [];
    }
  };

  const generateRecommendations = async () => {
    if (!spaceSize || !purpose) {
      toast.error("Please select both space size and garden purpose!");
      return;
    }

    if (spaceSize === "custom" && (!customArea || parseFloat(customArea) <= 0)) {
      toast.error("Please enter a valid custom area!");
      return;
    }

    setIsLoading(true);

    try {
      const area = getGardenArea();
      const plantCount = calculatePlantCount(area);
      
      if (plantCount < 1) {
        toast.error("Area is too small for any plants. Minimum 1.5 sq.ft required.");
        setIsLoading(false);
        return;
      }

      const spaceInfo = spaceSize === "custom" 
        ? { label: `Custom Garden (${customArea} sq.ft)`, area: `${customArea} sq.ft` }
        : { ...spaceSizes.find(s => s.value === spaceSize), area: `${area} sq.ft` };
      
      const purposeInfo = purposes.find(p => p.value === purpose);
      
      // Generate AI recommendations
      const aiPlants = await generateAIRecommendations(plantCount, purpose);
      
      const mockRecommendations = {
        spaceInfo: {
          size: spaceInfo?.label,
          purpose: purposeInfo?.label,
          area: spaceInfo?.area,
          totalPlants: plantCount
        },
        plants: aiPlants,
        arrangement: {
          layout: `Optimized ${spaceInfo?.area} arrangement for ${plantCount} plants focused on ${purposeInfo?.desc.toLowerCase()}`,
          tips: [
            "Place taller plants in the back or corners",
            "Group plants with similar water needs together", 
            "Leave adequate space for growth and maintenance",
            "Consider light requirements when positioning plants",
            `Space plants approximately 1.5 sq.ft apart for optimal growth`
          ]
        },
        maintenance: {
          weekly: "Check soil moisture, rotate plants for even light exposure",
          monthly: "Fertilize during growing season, inspect for pests and diseases",
          seasonal: "Repot when root-bound, adjust watering based on season"
        }
      };

      setRecommendations(mockRecommendations);
      toast.success(`Garden plan generated successfully! ${plantCount} plants recommended for your ${area} sq.ft space.`);
    } catch (error) {
      console.error('Error generating recommendations:', error);
      toast.error('Failed to generate recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 p-6">
      <div className="max-w-7xl mx-auto">
        <Button 
          onClick={onBack}
          variant="outline"
          className="mb-6 border-blue-300 hover:bg-blue-50"
        >
          ← Back to Home
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Mini-Garden Planner
          </h1>
          <p className="text-lg text-gray-600">
            Design your perfect garden space with AI-powered plant recommendations
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Planning Section */}
          <Card className="bg-white shadow-xl border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Leaf className="h-5 w-5" />
                Garden Configuration
              </CardTitle>
              <CardDescription>
                Tell us about your space and goals
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Space Size
                </label>
                <Select value={spaceSize} onValueChange={setSpaceSize}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your space size" />
                  </SelectTrigger>
                  <SelectContent>
                    {spaceSizes.map((size) => (
                      <SelectItem key={size.value} value={size.value}>
                        {size.label} {size.area > 0 && `(${size.area} sq.ft)`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {spaceSize === "custom" && (
                <div className="space-y-3">
                  <label className="text-sm font-medium">
                    Custom Area (square feet)
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter area in sq.ft"
                    value={customArea}
                    onChange={(e) => setCustomArea(e.target.value)}
                    min="1"
                    step="0.5"
                  />
                  {customArea && (
                    <p className="text-xs text-gray-600">
                      Can fit approximately {calculatePlantCount(parseFloat(customArea) || 0)} plants
                    </p>
                  )}
                </div>
              )}

              <div className="space-y-3">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Sun className="h-4 w-4" />
                  Garden Purpose
                </label>
                <Select value={purpose} onValueChange={setPurpose}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="What's your garden goal?" />
                  </SelectTrigger>
                  <SelectContent>
                    {purposes.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        <div className="flex flex-col">
                          <span>{p.label}</span>
                          <span className="text-xs text-gray-500">{p.desc}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={generateRecommendations}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? (
                  <>
                    <Sun className="h-4 w-4 mr-2 animate-spin" />
                    Generating AI Plan...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Generate Garden Plan
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Recommendations Section */}
          <Card className="bg-white shadow-xl border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Sun className="h-5 w-5" />
                AI Garden Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recommendations ? (
                <div className="space-y-6">
                  <div className="border-b pb-4 bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-700 mb-2">
                      Your AI-Generated Garden Plan
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p><strong>Space:</strong> {recommendations.spaceInfo.area}</p>
                      <p><strong>Plants:</strong> {recommendations.spaceInfo.totalPlants}</p>
                      <p className="col-span-2"><strong>Purpose:</strong> {recommendations.spaceInfo.purpose?.replace(/🌸|🪴|🌿|💨|🍀/g, '').trim()}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-blue-700 mb-3 flex items-center gap-2">
                      <Leaf className="h-4 w-4" />
                      AI-Recommended Plants ({recommendations.plants.length})
                    </h4>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {recommendations.plants.map((plant: PlantRecommendation, index: number) => (
                        <div key={index} className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-medium text-blue-800">{plant.name}</h5>
                            <Badge variant="outline" className="text-xs border-blue-300 text-blue-700">
                              {plant.careLevel} Care
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-600 italic mb-2">
                            {plant.scientificName}
                          </p>
                          <p className="text-sm mb-3 text-gray-700">{plant.whySelected}</p>
                          <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                            <p><strong>Position:</strong> {plant.position}</p>
                            <p><strong>Growth:</strong> {plant.growthTime}</p>
                            <p><strong>Water:</strong> {plant.wateringFrequency}</p>
                            <p><strong>Light:</strong> {plant.sunlight}</p>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {plant.benefits.map((benefit: string, idx: number) => (
                              <Badge key={idx} className="bg-green-100 text-green-800 text-xs">
                                {benefit}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-orange-700 mb-2 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Maintenance Schedule
                    </h4>
                    <div className="space-y-2 text-sm bg-orange-50 p-4 rounded-lg">
                      <p><strong>Weekly:</strong> {recommendations.maintenance.weekly}</p>
                      <p><strong>Monthly:</strong> {recommendations.maintenance.monthly}</p>
                      <p><strong>Seasonal:</strong> {recommendations.maintenance.seasonal}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Sun className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Configure your space and purpose to get AI-powered personalized recommendations
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GardenPlanner;
