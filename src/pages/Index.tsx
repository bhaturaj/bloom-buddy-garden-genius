
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Search, Leaf, Sun, Upload, Calendar } from "lucide-react";
import PlantIdentification from "@/components/PlantIdentification";
import GardenPlanner from "@/components/GardenPlanner";
import Hero from "@/components/Hero";
import Features from "@/components/Features";

const Index = () => {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  const modules = [
    {
      id: "identification",
      title: "Plant Identification & Care",
      description: "Upload a photo or enter a plant name to get personalized care instructions",
      icon: Camera,
      color: "garden",
      features: ["AI Plant Recognition", "Watering Schedule", "Soil & Sunlight Tips", "Pest Management"],
      gradient: "garden-gradient"
    },
    {
      id: "planner",
      title: "Mini-Garden Planner",
      description: "Design your perfect garden space with AI-powered plant recommendations",
      icon: Leaf,
      color: "sage",
      features: ["Space Optimization", "Plant Arrangement", "Purpose-Based Selection", "Maintenance Guide"],
      gradient: "sage-gradient"
    },
    {
      id: "generator",
      title: "AI Garden Visualizer",
      description: "Generate realistic previews of your garden design with AI",
      icon: Sun,
      color: "earth",
      features: ["Realistic Previews", "Arrangement Layouts", "Decoration Ideas", "Seasonal Planning"],
      gradient: "earth-gradient"
    }
  ];

  const renderActiveModule = () => {
    switch (activeModule) {
      case "identification":
        return <PlantIdentification onBack={() => setActiveModule(null)} />;
      case "planner":
        return <GardenPlanner onBack={() => setActiveModule(null)} />;
      case "generator":
        return (
          <div className="min-h-screen bg-gradient-to-br from-earth-50 to-earth-100 p-6">
            <div className="max-w-4xl mx-auto">
              <Button 
                onClick={() => setActiveModule(null)}
                variant="outline"
                className="mb-6"
              >
                ← Back to Home
              </Button>
              <Card className="text-center p-8">
                <CardHeader>
                  <CardTitle className="text-2xl text-earth-700">AI Garden Visualizer</CardTitle>
                  <CardDescription>Coming Soon - Generate stunning garden previews</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="animate-float">
                    <Sun className="h-24 w-24 text-earth-500 mx-auto mb-4" />
                  </div>
                  <p className="text-muted-foreground">
                    This module will generate realistic garden images based on your space and plant selections.
                    Connect to Supabase to enable AI image generation with DALL-E or Stable Diffusion APIs.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (activeModule) {
    return renderActiveModule();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-garden-50 via-sage-50 to-earth-50">
      <Hero />
      
      {/* Main Modules Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Explore Our Smart Garden Modules
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose a module to start your journey into intelligent plant care and garden design
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {modules.map((module, index) => {
              const IconComponent = module.icon;
              return (
                <Card 
                  key={module.id}
                  className={`${module.gradient} border-2 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 animate-fade-in`}
                  style={{ animationDelay: `${index * 200}ms` }}
                  onClick={() => setActiveModule(module.id)}
                >
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 rounded-full bg-white/80 backdrop-blur-sm w-fit">
                      <IconComponent className={`h-8 w-8 text-${module.color}-600`} />
                    </div>
                    <CardTitle className="text-xl mb-2">{module.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {module.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      {module.features.map((feature, idx) => (
                        <Badge 
                          key={idx} 
                          variant="secondary" 
                          className="text-xs mr-1 mb-1"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <Button 
                      className="w-full bg-white/90 hover:bg-white text-gray-700 hover:text-gray-900"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveModule(module.id);
                      }}
                    >
                      Start {module.title.split(' ')[0]}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <Features />
    </div>
  );
};

export default Index;
