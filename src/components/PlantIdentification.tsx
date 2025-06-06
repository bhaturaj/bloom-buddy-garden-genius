
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Search, Upload, Leaf, Sun, Calendar } from "lucide-react";
import { toast } from "sonner";

interface PlantIdentificationProps {
  onBack: () => void;
}

const PlantIdentification = ({ onBack }: PlantIdentificationProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [plantName, setPlantName] = useState("");
  const [identificationResult, setIdentificationResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      toast.success("Image uploaded successfully!");
    }
  };

  const handleIdentifyPlant = async () => {
    if (!selectedFile && !plantName.trim()) {
      toast.error("Please upload an image or enter a plant name!");
      return;
    }

    setIsLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const mockResult = {
        name: plantName || "Peace Lily (Spathiphyllum)",
        scientificName: "Spathiphyllum wallisii",
        confidence: 95,
        care: {
          watering: "Water when top inch of soil is dry, typically every 1-2 weeks",
          sunlight: "Bright, indirect light. Avoid direct sunlight",
          soil: "Well-draining potting mix with peat moss",
          fertilizer: "Monthly during growing season with balanced liquid fertilizer",
          temperature: "65-80°F (18-27°C), avoid cold drafts"
        },
        benefits: [
          "Air-purifying qualities",
          "Low maintenance",
          "Beautiful white flowers",
          "Removes toxins from air"
        ],
        commonIssues: [
          "Brown leaf tips (overwatering or low humidity)",
          "Yellow leaves (overwatering)",
          "No flowers (insufficient light)"
        ],
        bestSeason: "Spring and Summer for growth, can bloom year-round indoors"
      };
      
      setIdentificationResult(mockResult);
      setIsLoading(false);
      toast.success("Plant identified successfully!");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-garden-50 to-sage-100 p-6">
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
            Plant Identification & Care Guide
          </h1>
          <p className="text-lg text-muted-foreground">
            Upload a photo or enter a plant name to get personalized care instructions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-garden-600" />
                Plant Identification
              </CardTitle>
              <CardDescription>
                Choose how you'd like to identify your plant
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="upload" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload">Upload Photo</TabsTrigger>
                  <TabsTrigger value="name">Enter Name</TabsTrigger>
                </TabsList>
                
                <TabsContent value="upload" className="space-y-4">
                  <div className="border-2 border-dashed border-garden-300 rounded-lg p-8 text-center hover:border-garden-400 transition-colors">
                    <Upload className="h-12 w-12 text-garden-500 mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground mb-4">
                      Upload a clear photo of your plant
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="plant-upload"
                    />
                    <label htmlFor="plant-upload">
                      <Button variant="outline" className="cursor-pointer">
                        Choose File
                      </Button>
                    </label>
                    {selectedFile && (
                      <p className="text-sm text-garden-600 mt-2">
                        Selected: {selectedFile.name}
                      </p>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="name" className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Plant Name</label>
                    <Input
                      placeholder="e.g., Peace Lily, Monstera, Snake Plant"
                      value={plantName}
                      onChange={(e) => setPlantName(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </TabsContent>
              </Tabs>

              <Button 
                onClick={handleIdentifyPlant}
                disabled={isLoading}
                className="w-full mt-6 bg-garden-600 hover:bg-garden-700"
              >
                {isLoading ? (
                  <>
                    <Search className="h-4 w-4 mr-2 animate-spin" />
                    Identifying Plant...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Identify Plant
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-sage-600" />
                Identification Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {identificationResult ? (
                <div className="space-y-6">
                  <div className="text-center border-b pb-4">
                    <h3 className="text-2xl font-bold text-garden-700">
                      {identificationResult.name}
                    </h3>
                    <p className="text-sm text-muted-foreground italic">
                      {identificationResult.scientificName}
                    </p>
                    <Badge className="mt-2 bg-garden-100 text-garden-800">
                      {identificationResult.confidence}% Confidence
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sage-700 mb-2 flex items-center gap-2">
                        <Sun className="h-4 w-4" />
                        Care Instructions
                      </h4>
                      <div className="space-y-2 text-sm">
                        <p><strong>Watering:</strong> {identificationResult.care.watering}</p>
                        <p><strong>Sunlight:</strong> {identificationResult.care.sunlight}</p>
                        <p><strong>Soil:</strong> {identificationResult.care.soil}</p>
                        <p><strong>Fertilizer:</strong> {identificationResult.care.fertilizer}</p>
                        <p><strong>Temperature:</strong> {identificationResult.care.temperature}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-garden-700 mb-2">Benefits</h4>
                      <div className="flex flex-wrap gap-1">
                        {identificationResult.benefits.map((benefit: string, index: number) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-earth-700 mb-2 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Best Season
                      </h4>
                      <p className="text-sm">{identificationResult.bestSeason}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Leaf className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">
                    Upload a plant photo or enter a plant name to get started
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

export default PlantIdentification;
