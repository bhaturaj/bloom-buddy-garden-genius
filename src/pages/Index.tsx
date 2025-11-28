
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Search, Leaf, Sun, Upload, Calendar, ArrowRight } from "lucide-react";
import PlantIdentification from "@/components/PlantIdentification";
import GardenPlanner from "@/components/GardenPlanner";

const Index = () => {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  const modules = [
    {
      id: "identification",
      title: "Plant Identification & Care",
      description: "Upload a photo or enter a plant name to get personalized care instructions",
      icon: Camera,
      gradient: "bg-gradient-to-br from-green-50 to-emerald-100",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      buttonColor: "bg-green-600 hover:bg-green-700"
    },
    {
      id: "planner",
      title: "Mini-Garden Planner",
      description: "Design your perfect garden space with AI-powered plant recommendations",
      icon: Leaf,
      gradient: "bg-gradient-to-br from-blue-50 to-cyan-100",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      buttonColor: "bg-blue-600 hover:bg-blue-700"
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
          <div className="min-h-screen bg-gray-50 p-6">
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
                  <CardTitle className="text-2xl text-orange-700">AI Garden Visualizer</CardTitle>
                  <CardDescription>Coming Soon - Generate stunning garden previews</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="animate-float">
                    <Sun className="h-24 w-24 text-orange-500 mx-auto mb-4" />
                  </div>
                  <p className="text-muted-foreground">
                    This module will generate realistic garden images based on your space and plant selections.
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium">
              🌱 Final Year Engineering Project
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Smart Plant Care &{" "}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Personalized Garden Designer
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Harness the power of AI to identify plants, get personalized care instructions, 
            and design your perfect garden space with intelligent recommendations and visual previews.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8" onClick={() => setActiveModule('identification')}>
              Start Exploring
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-gray-300 hover:bg-gray-50">
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Explore Our Smart Garden Modules
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose a module to start your journey into intelligent plant care and garden design
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {modules.map((module, index) => {
              const IconComponent = module.icon;
              return (
                <Card 
                  key={module.id}
                  className={`${module.gradient} border-0 hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2`}
                  onClick={() => setActiveModule(module.id)}
                >
                  <CardHeader className="text-center pb-4">
                    <div className={`mx-auto mb-4 p-4 rounded-2xl ${module.iconBg} w-fit`}>
                      <IconComponent className={`h-8 w-8 ${module.iconColor}`} />
                    </div>
                    <CardTitle className="text-xl mb-2 text-gray-900">{module.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {module.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button 
                      className={`w-full ${module.buttonColor} text-white border-0`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveModule(module.id);
                      }}
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Complete Plant Care Solution
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Beyond identification and planning - a comprehensive ecosystem for plant lovers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Calendar, title: "Care Journal", desc: "Track daily progress" },
              { icon: Search, title: "Smart Reminders", desc: "Never miss watering" },
              { icon: Upload, title: "Plant Database", desc: "Comprehensive info" },
              { icon: Camera, title: "Progress Photos", desc: "Visual tracking" }
            ].map((feature, idx) => (
              <Card key={idx} className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <feature.icon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
