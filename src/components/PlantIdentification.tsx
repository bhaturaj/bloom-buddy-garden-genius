import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Search, Upload, Leaf, Sun, Calendar, X } from "lucide-react";
import { toast } from "sonner";
import { getPlantInfo, PlantData } from "@/data/plantDatabase";

interface PlantIdentificationProps {
  onBack: () => void;
}

const PlantIdentification = ({ onBack }: PlantIdentificationProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [plantName, setPlantName] = useState("");
  const [identificationResult, setIdentificationResult] = useState<PlantData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error("Please upload an image file!");
        return;
      }
      
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB!");
        return;
      }

      setSelectedFile(file);
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      toast.success("Image uploaded successfully!");
    }
  };

  const removeImage = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
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
      let result: PlantData | null = null;
      
      if (plantName.trim()) {
        // Search by name
        result = getPlantInfo(plantName.trim());
        
        if (!result) {
          toast.error("Plant not found in our database. Try a different name!");
          setIsLoading(false);
          return;
        }
      } else {
        // For image upload, simulate identification (in real app, this would call AI API)
        // For demo, randomly select a plant from database
        const plants = ["peace lily", "snake plant", "pothos", "monstera", "aloe vera", "rubber plant"];
        const randomPlant = plants[Math.floor(Math.random() * plants.length)];
        result = getPlantInfo(randomPlant);
      }
      
      if (result) {
        setIdentificationResult(result);
        setIsLoading(false);
        toast.success("Plant identified successfully!");
      } else {
        toast.error("Unable to identify plant. Please try again!");
        setIsLoading(false);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
      <div className="max-w-7xl mx-auto">
        <Button 
          onClick={onBack}
          variant="outline"
          className="mb-6 border-green-300 hover:bg-green-50"
        >
          ← Back to Home
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Plant Identification & Care Guide
          </h1>
          <p className="text-lg text-gray-600">
            Upload a photo or enter a plant name to get personalized care instructions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="bg-white shadow-xl border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <Camera className="h-5 w-5" />
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
                  <div className="border-2 border-dashed border-green-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors">
                    {previewUrl ? (
                      <div className="relative">
                        <img 
                          src={previewUrl} 
                          alt="Plant preview" 
                          className="max-h-48 mx-auto rounded-lg shadow-md"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute top-2 right-2"
                          onClick={removeImage}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <p className="text-sm text-green-600 mt-2">
                          {selectedFile?.name}
                        </p>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-12 w-12 text-green-500 mx-auto mb-4" />
                        <p className="text-sm text-gray-600 mb-4">
                          Upload a clear photo of your plant (JPG, PNG - Max 5MB)
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="plant-upload"
                        />
                        <label htmlFor="plant-upload">
                          <Button variant="outline" className="cursor-pointer border-green-300 hover:bg-green-50">
                            Choose File
                          </Button>
                        </label>
                      </>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="name" className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Plant Name</label>
                    <Input
                      placeholder="e.g., Rose, Tulsi, Aloe Vera, Snake Plant, Money Plant"
                      value={plantName}
                      onChange={(e) => setPlantName(e.target.value)}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500">
                      Try: Rose, Tulsi, Aloe Vera, Snake Plant, Money Plant, Marigold, Jasmine, Hibiscus, Neem, Lavender
                    </p>
                  </div>
                </TabsContent>
              </Tabs>

              <Button 
                onClick={handleIdentifyPlant}
                disabled={isLoading}
                className="w-full mt-6 bg-green-600 hover:bg-green-700"
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
          <Card className="bg-white shadow-xl border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <Leaf className="h-5 w-5" />
                Plant Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              {identificationResult ? (
                <div className="space-y-6">
                  <div className="text-center border-b pb-4">
                    <h3 className="text-2xl font-bold text-green-700">
                      {identificationResult.name}
                    </h3>
                    <p className="text-sm text-gray-600 italic">
                      {identificationResult.scientificName}
                    </p>
                    <div className="flex justify-center gap-2 mt-2">
                      <Badge className="bg-green-100 text-green-800">
                        {identificationResult.confidence}% Confidence
                      </Badge>
                      <Badge variant="outline" className="border-green-300 text-green-700">
                        {identificationResult.careLevel} Care
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-800">
                        {identificationResult.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <Sun className="h-4 w-4" />
                        Detailed Care Instructions
                      </h4>
                      <div className="space-y-3 text-sm bg-green-50 p-4 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="bg-white p-3 rounded-lg">
                            <p><strong>💧 Watering:</strong></p>
                            <p className="text-gray-700">{identificationResult.wateringFrequency}</p>
                            <p className="text-xs text-gray-600">Amount: {identificationResult.waterAmount}</p>
                          </div>
                          <div className="bg-white p-3 rounded-lg">
                            <p><strong>☀️ Sunlight:</strong></p>
                            <p className="text-gray-700">{identificationResult.sunlight}</p>
                          </div>
                          <div className="bg-white p-3 rounded-lg">
                            <p><strong>🌱 Soil:</strong></p>
                            <p className="text-gray-700">{identificationResult.soilType}</p>
                          </div>
                          <div className="bg-white p-3 rounded-lg">
                            <p><strong>🧪 Fertilizer:</strong></p>
                            <p className="text-gray-700">{identificationResult.fertilizer}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">⚠️ Precautions</h4>
                      <div className="bg-yellow-50 p-3 rounded-lg">
                        <p className="text-sm text-yellow-800">{identificationResult.precautions}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">✨ Benefits</h4>
                      <div className="flex flex-wrap gap-1">
                        {identificationResult.benefits.map((benefit: string, index: number) => (
                          <Badge key={index} className="bg-blue-100 text-blue-800 text-xs">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {identificationResult.commonIssues && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">🔧 Common Issues</h4>
                        <div className="text-sm space-y-1">
                          {identificationResult.commonIssues.map((issue: string, index: number) => (
                            <p key={index} className="text-gray-600">• {issue}</p>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="bg-yellow-50 p-3 rounded-lg">
                        <h5 className="font-semibold text-yellow-800 flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Best Season
                        </h5>
                        <p className="text-yellow-700">{identificationResult.season}</p>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <h5 className="font-semibold text-purple-800">Growth Time</h5>
                        <p className="text-purple-700">{identificationResult.growthTime || "Varies"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Leaf className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
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
