
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Leaf, Sun, Calendar, Plus } from "lucide-react";
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
    { value: "balcony", label: "Small Balcony (2x3 ft)" },
    { value: "small", label: "Small Garden (4x4 ft)" },
    { value: "medium", label: "Medium Garden (6x6 ft)" },
    { value: "large", label: "Large Garden (8x8 ft)" },
    { value: "custom", label: "Custom Size" }
  ];

  const purposes = [
    { value: "flower", label: "🌸 Flower-based Garden", icon: "🌸" },
    { value: "aesthetic", label: "🪴 Good-looking Garden", icon: "🪴" },
    { value: "medicinal", label: "🌿 Ayurvedic/Medicinal", icon: "🌿" },
    { value: "air", label: "💨 Air-purifying", icon: "💨" },
    { value: "mixed", label: "🍀 Mix & Match", icon: "🍀" }
  ];

  const generateRecommendations = async () => {
    if (!spaceSize || !purpose) {
      toast.error("Please select both space size and garden purpose!");
      return;
    }

    setIsLoading(true);

    // Simulate AI processing
    setTimeout(() => {
      const mockRecommendations = {
        spaceInfo: {
          size: spaceSizes.find(s => s.value === spaceSize)?.label,
          purpose: purposes.find(p => p.value === purpose)?.label
        },
        plants: [
          {
            name: "Snake Plant",
            scientificName: "Sansevieria trifasciata",
            purpose: "Air-purifying",
            position: "Corner placement",
            careLevel: "Low",
            growthTime: "Slow (6-12 months)",
            benefits: ["Releases oxygen at night", "Low maintenance", "Drought tolerant"],
            whySelected: "Perfect for beginners, extremely hardy, excellent air purifier"
          },
          {
            name: "Peace Lily",
            scientificName: "Spathiphyllum",
            purpose: "Air-purifying & Aesthetic",
            position: "Center-left area",
            careLevel: "Medium",
            growthTime: "Medium (3-6 months)",
            benefits: ["Beautiful white flowers", "Removes toxins", "Humidity indicator"],
            whySelected: "Adds elegance while purifying air, flowers indicate good care"
          },
          {
            name: "Pothos",
            scientificName: "Epipremnum aureum",
            purpose: "Air-purifying & Trailing",
            position: "Hanging or elevated",
            careLevel: "Low",
            growthTime: "Fast (2-3 months)",
            benefits: ["Fast growing", "Easy propagation", "Versatile placement"],
            whySelected: "Fills vertical space beautifully, very forgiving for beginners"
          }
        ],
        arrangement: {
          layout: "Triangular arrangement with varying heights",
          tips: [
            "Place taller plants (Snake Plant) in corners for structure",
            "Use medium plants (Peace Lily) as focal points",
            "Add trailing plants (Pothos) for vertical interest",
            "Leave walking space in the center"
          ]
        },
        maintenance: {
          weekly: "Check soil moisture, rotate plants for even growth",
          monthly: "Fertilize during growing season, inspect for pests",
          seasonal: "Repot as needed, adjust watering frequency"
        }
      };

      setRecommendations(mockRecommendations);
      setIsLoading(false);
      toast.success("Garden plan generated successfully!");
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-garden-100 p-6">
      <div className="max-w-6xl mx-auto">
        <Button 
          onClick={onBack}
          variant="outline"
          className="mb-6"
        >
          ← Back to Home
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Mini-Garden Planner
          </h1>
          <p className="text-lg text-muted-foreground">
            Design your perfect garden space with AI-powered plant recommendations
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Planning Section */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-sage-600" />
                Garden Configuration
              </CardTitle>
              <CardDescription>
                Tell us about your space and goals
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Space Size</label>
                <Select value={spaceSize} onValueChange={setSpaceSize}>
                  <SelectTrigger>
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

              <div className="space-y-2">
                <label className="text-sm font-medium">Garden Purpose</label>
                <Select value={purpose} onValueChange={setPurpose}>
                  <SelectTrigger>
                    <SelectValue placeholder="What's your garden goal?" />
                  </SelectTrigger>
                  <SelectContent>
                    {purposes.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={generateRecommendations}
                disabled={isLoading}
                className="w-full bg-sage-600 hover:bg-sage-700"
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
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="h-5 w-5 text-garden-600" />
                Garden Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recommendations ? (
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-semibold text-sage-700 mb-2">
                      Your Garden Plan
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Space: {recommendations.spaceInfo.size}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Purpose: {recommendations.spaceInfo.purpose}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-garden-700 mb-3">Recommended Plants</h4>
                    <div className="space-y-4">
                      {recommendations.plants.map((plant: any, index: number) => (
                        <div key={index} className="border rounded-lg p-4 bg-sage-50">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-medium text-sage-800">{plant.name}</h5>
                            <Badge variant="outline" className="text-xs">
                              {plant.careLevel} Care
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground italic mb-2">
                            {plant.scientificName}
                          </p>
                          <p className="text-sm mb-2">{plant.whySelected}</p>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <p><strong>Position:</strong> {plant.position}</p>
                            <p><strong>Growth:</strong> {plant.growthTime}</p>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {plant.benefits.map((benefit: string, idx: number) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {benefit}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-earth-700 mb-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Maintenance Schedule
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Weekly:</strong> {recommendations.maintenance.weekly}</p>
                      <p><strong>Monthly:</strong> {recommendations.maintenance.monthly}</p>
                      <p><strong>Seasonal:</strong> {recommendations.maintenance.seasonal}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Sun className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">
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
