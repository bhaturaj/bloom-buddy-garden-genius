
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Search, Upload, Leaf, Sun, Calendar, X, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { generatePlantInfo, identifyPlantFromImage, GeminiPlantData } from "@/utils/geminiApi";

interface PlantIdentificationProps {
  onBack: () => void;
}

const PlantIdentification = ({ onBack }: PlantIdentificationProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [plantName, setPlantName] = useState("");
  const [identificationResult, setIdentificationResult] = useState<GeminiPlantData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [identificationMethod, setIdentificationMethod] = useState<"text" | "image" | null>(null);

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
    setIdentificationResult(null);
    
    try {
      if (selectedFile) {
        // AI-based image identification
        setIdentificationMethod("image");
        toast.info("AI is analyzing the image...");
        
        const identifiedPlantName = await identifyPlantFromImage(selectedFile);
        
        if (identifiedPlantName && identifiedPlantName !== "Unknown Plant") {
          toast.success(`Plant identified as: ${identifiedPlantName}`);
          
          // Get detailed information about the identified plant
          const plantDetails = await generatePlantInfo(identifiedPlantName);
          
          if (plantDetails) {
            setIdentificationResult(plantDetails);
            toast.success("Complete plant information retrieved!");
          } else {
            toast.error("Could not retrieve detailed information for this plant.");
          }
        } else {
          toast.error("Could not identify the plant from the image. Please try a clearer photo or enter the plant name manually.");
        }
      } else if (plantName.trim()) {
        // AI-based text search
        setIdentificationMethod("text");
        toast.info("AI is searching for plant information...");
        
        const aiResult = await generatePlantInfo(plantName.trim());
        
        if (aiResult) {
          setIdentificationResult(aiResult);
          toast.success("Plant information retrieved from AI!");
        } else {
          toast.error("Plant not found. Please check the name and try again!");
        }
      }
    } catch (error) {
      console.error('Plant identification error:', error);
      toast.error("AI service unavailable. Please try again later!");
    } finally {
      setIsLoading(false);
    }
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
            AI Plant Identification & Care Guide
          </h1>
          <p className="text-lg text-gray-600">
            Upload a photo or enter a plant name to get AI-powered plant identification and care instructions
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span className="text-sm text-purple-600 font-medium">Powered by Google Gemini AI</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="bg-white shadow-xl border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <Camera className="h-5 w-5" />
                AI Plant Identification
              </CardTitle>
              <CardDescription>
                Choose how you'd like to identify your plant using AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="upload" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload">AI Image Analysis</TabsTrigger>
                  <TabsTrigger value="name">AI Text Search</TabsTrigger>
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
                          Upload a clear photo of your plant for AI identification (JPG, PNG - Max 5MB)
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="plant-upload"
                        />
                        <label htmlFor="plant-upload" className="cursor-pointer">
                          <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-green-300 bg-background hover:bg-green-50 hover:text-accent-foreground h-10 px-4 py-2">
                            Choose File
                          </div>
                        </label>
                      </>
                    )}
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-xs text-blue-700">
                      <Sparkles className="h-3 w-3 inline mr-1" />
                      AI will analyze your image and identify the plant automatically
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="name" className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Plant Name</label>
                    <Input
                      placeholder="e.g., Rose, Mint, Cactus, Tomato, Sunflower, etc."
                      value={plantName}
                      onChange={(e) => setPlantName(e.target.value)}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500">
                      AI will search for any plant name and provide detailed information
                    </p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-xs text-purple-700">
                      <Sparkles className="h-3 w-3 inline mr-1" />
                      AI will dynamically search and provide accurate plant information
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
                    AI is analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Identify with AI
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
                AI Plant Analysis Results
                {identificationResult && (
                  <Badge className="bg-purple-100 text-purple-800 ml-2">
                    <Sparkles className="h-3 w-3 mr-1" />
                    AI Generated
                  </Badge>
                )}
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
                    <div className="flex justify-center gap-2 mt-2 flex-wrap">
                      <Badge className="bg-green-100 text-green-800">
                        {identificationResult.confidence}% Confidence
                      </Badge>
                      <Badge variant="outline" className="border-green-300 text-green-700">
                        {identificationResult.careLevel} Care
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-800">
                        {identificationResult.category}
                      </Badge>
                      {identificationMethod && (
                        <Badge className="bg-purple-100 text-purple-800">
                          {identificationMethod === "image" ? "Image AI" : "Text AI"}
                        </Badge>
                      )}
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
                    Upload a plant image or enter a plant name for AI identification
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    AI will analyze and provide comprehensive plant information
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
