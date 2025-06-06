
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Leaf, Camera, Sun } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-garden-100 via-sage-100 to-earth-100 opacity-60" />
      <div className="absolute top-10 left-10 animate-float">
        <Leaf className="h-16 w-16 text-garden-400 opacity-30" />
      </div>
      <div className="absolute top-32 right-20 animate-float" style={{ animationDelay: '1s' }}>
        <Sun className="h-12 w-12 text-earth-400 opacity-30" />
      </div>
      <div className="absolute bottom-20 left-1/4 animate-float" style={{ animationDelay: '2s' }}>
        <Camera className="h-10 w-10 text-sage-400 opacity-30" />
      </div>
      
      <div className="relative max-w-6xl mx-auto text-center">
        <Badge variant="secondary" className="mb-6 bg-garden-100 text-garden-800 hover:bg-garden-200">
          🌱 Final Year Engineering Project
        </Badge>
        
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in">
          Smart Plant Care &{" "}
          <span className="bg-gradient-to-r from-garden-600 to-sage-600 bg-clip-text text-transparent">
            Personalized Garden Designer
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
          Harness the power of AI to identify plants, get personalized care instructions, 
          and design your perfect garden space with intelligent recommendations and visual previews.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '400ms' }}>
          <Button size="lg" className="bg-garden-600 hover:bg-garden-700 text-white px-8">
            Start Exploring
          </Button>
          <Button size="lg" variant="outline" className="border-garden-300 hover:bg-garden-50">
            View Demo
          </Button>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center animate-fade-in" style={{ animationDelay: '600ms' }}>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-garden-200">
            <Camera className="h-8 w-8 text-garden-600 mx-auto mb-3" />
            <h3 className="font-semibold text-garden-800">AI Plant Recognition</h3>
            <p className="text-sm text-muted-foreground mt-1">Upload photos for instant identification</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-sage-200">
            <Leaf className="h-8 w-8 text-sage-600 mx-auto mb-3" />
            <h3 className="font-semibold text-sage-800">Smart Garden Planning</h3>
            <p className="text-sm text-muted-foreground mt-1">Optimize your space with AI recommendations</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-earth-200">
            <Sun className="h-8 w-8 text-earth-600 mx-auto mb-3" />
            <h3 className="font-semibold text-earth-800">Visual Garden Preview</h3>
            <p className="text-sm text-muted-foreground mt-1">See your garden before you plant</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
