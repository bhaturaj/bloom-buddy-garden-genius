
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Leaf, Sun, Calendar, Plus, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";

interface GardenPlannerProps {
  onBack: () => void;
}

const GardenPlanner = ({ onBack }: GardenPlannerProps) => {
  const [spaceSize, setSpaceSize] = useState("");
  const [purpose, setPurpose] = useState("");
  const [recommendations, setRecommendations] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const spaceSizes = [
    { value: "balcony", label: "Small Balcony (2x3 ft)", size: "2x3 ft" },
    { value: "small", label: "Small Garden (4x4 ft)", size: "4x4 ft" },
    { value: "medium", label: "Medium Garden (6x6 ft)", size: "6x6 ft" },
    { value: "large", label: "Large Garden (8x8 ft)", size: "8x8 ft" },
    { value: "custom", label: "Custom Size", size: "Custom" }
  ];

  const purposes = [
    { value: "flower", label: "🌸 Flower-based Garden", desc: "Beautiful flowering plants" },
    { value: "aesthetic", label: "🪴 Good-looking Garden", desc: "Visually appealing foliage" },
    { value: "medicinal", label: "🌿 Ayurvedic/Medicinal", desc: "Therapeutic and healing plants" },
    { value: "air", label: "💨 Air-purifying", desc: "Clean air and healthy environment" },
    { value: "mixed", label: "🍀 Mix & Match", desc: "Combination of all benefits" }
  ];

  const generateRecommendations = async () => {
    if (!spaceSize || !purpose) {
      toast.error("Please select both space size and garden purpose!");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const spaceInfo = spaceSizes.find(s => s.value === spaceSize);
      const purposeInfo = purposes.find(p => p.value === purpose);
      
      // Generate recommendations based on purpose
      let plantsData = [];
      
      if (purpose === "flower") {
        plantsData = [
          {
            name: "Peace Lily",
            scientificName: "Spathiphyllum wallisii",
            purpose: "Beautiful white flowers",
            position: "Center arrangement",
            careLevel: "Medium",
            growthTime: "3-6 months",
            benefits: ["White flowers", "Air purifying", "Low light tolerant"],
            whySelected: "Produces elegant white flowers that bloom regularly with proper care"
          },
          {
            name: "African Violet",
            scientificName: "Saintpaulia ionantha",
            purpose: "Colorful flowers",
            position: "Front border",
            careLevel: "Medium",
            growthTime: "2-4 months",
            benefits: ["Purple/pink flowers", "Compact size", "Year-round blooming"],
            whySelected: "Small flowering plant perfect for limited space with continuous blooms"
          }
        ];
      } else if (purpose === "air") {
        plantsData = [
          {
            name: "Snake Plant",
            scientificName: "Sansevieria trifasciata",
            purpose: "Air purification",
            position: "Corner placement",
            careLevel: "Low",
            growthTime: "6-12 months",
            benefits: ["Releases oxygen at night", "Removes toxins", "Low maintenance"],
            whySelected: "One of the best air purifiers, perfect for bedrooms and low-light areas"
          },
          {
            name: "Spider Plant",
            scientificName: "Chlorophytum comosum",
            purpose: "Air cleaning",
            position: "Hanging or elevated",
            careLevel: "Low",
            growthTime: "2-4 months",
            benefits: ["Fast air purification", "Easy propagation", "Pet-safe"],
            whySelected: "Excellent air purifier that's safe for pets and produces baby plants"
          }
        ];
      } else if (purpose === "medicinal") {
        plantsData = [
          {
            name: "Aloe Vera",
            scientificName: "Aloe barbadensis miller",
            purpose: "Healing and skincare",
            position: "Sunny spot",
            careLevel: "Low",
            growthTime: "4-6 months",
            benefits: ["Burn relief", "Skin healing", "Anti-inflammatory"],
            whySelected: "Essential medicinal plant with proven healing properties for skin conditions"
          },
          {
            name: "Tulsi (Holy Basil)",
            scientificName: "Ocimum tenuiflorum",
            purpose: "Ayurvedic medicine",
            position: "Central location",
            careLevel: "Medium",
            growthTime: "2-3 months",
            benefits: ["Respiratory health", "Stress relief", "Immunity boost"],
            whySelected: "Sacred plant in Ayurveda with multiple health benefits and easy to grow"
          }
        ];
      } else {
        // Default mix
        plantsData = [
          {
            name: "Pothos",
            scientificName: "Epipremnum aureum",
            purpose: "Versatile trailing plant",
            position: "Hanging or trailing",
            careLevel: "Low",
            growthTime: "2-3 months",
            benefits: ["Air purifying", "Fast growth", "Easy propagation"],
            whySelected: "Perfect beginner plant that grows quickly and looks great anywhere"
          },
          {
            name: "Peace Lily",
            scientificName: "Spathiphyllum wallisii",
            purpose: "Flowers and air purification",
            position: "Medium height area",
            careLevel: "Medium",
            growthTime: "3-6 months",
            benefits: ["White flowers", "Air cleaning", "Humidity indicator"],
            whySelected: "Combines beauty and function with elegant flowers and air purification"
          }
        ];
      }

      const mockRecommendations = {
        spaceInfo: {
          size: spaceInfo?.label,
          purpose: purposeInfo?.label,
          area: spaceInfo?.size
        },
        plants: plantsData,
        arrangement: {
          layout: `Optimized ${spaceInfo?.size} arrangement for ${purposeInfo?.desc.toLowerCase()}`,
          tips: [
            "Place taller plants in the back or corners",
            "Group plants with similar water needs together", 
            "Leave adequate space for growth and maintenance",
            "Consider light requirements when positioning plants"
          ]
        },
        maintenance: {
          weekly: "Check soil moisture, rotate plants for even light exposure",
          monthly: "Fertilize during growing season, inspect for pests and diseases",
          seasonal: "Repot when root-bound, adjust watering based on season"
        }
      };

      setRecommendations(mockRecommendations);
      setIsLoading(false);
      toast.success("Garden plan generated successfully!");
    }, 2500);
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
                        {size.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

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
                    Generating Plan...
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
                Garden Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recommendations ? (
                <div className="space-y-6">
                  <div className="border-b pb-4 bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-700 mb-2">
                      Your Garden Plan
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p><strong>Space:</strong> {recommendations.spaceInfo.area}</p>
                      <p><strong>Purpose:</strong> {recommendations.spaceInfo.purpose?.replace('🌸 ', '').replace('🪴 ', '').replace('🌿 ', '').replace('💨 ', '').replace('🍀 ', '')}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-blue-700 mb-3 flex items-center gap-2">
                      <Leaf className="h-4 w-4" />
                      Recommended Plants
                    </h4>
                    <div className="space-y-4">
                      {recommendations.plants.map((plant: any, index: number) => (
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
                    Configure your space and purpose to get personalized recommendations
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
