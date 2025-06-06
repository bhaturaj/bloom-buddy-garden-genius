
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Search, Upload, User } from "lucide-react";

const Features = () => {
  const additionalFeatures = [
    {
      icon: Calendar,
      title: "Plant Care Journal",
      description: "Track daily watering, fertilizing, and plant health progress",
      benefits: ["Daily Logs", "Growth Tracking", "Care History", "Progress Photos"],
      color: "garden"
    },
    {
      icon: Search,
      title: "Smart Reminders",
      description: "Never miss watering or fertilizing with intelligent notifications",
      benefits: ["Email Alerts", "Custom Schedules", "Weather Integration", "Care Tips"],
      color: "sage"
    },
    {
      icon: Upload,
      title: "Plant Database",
      description: "Comprehensive plant information with AI-powered insights",
      benefits: ["Disease Detection", "Seasonal Care", "Compatibility Check", "Expert Tips"],
      color: "earth"
    },
    {
      icon: User,
      title: "Personal Dashboard",
      description: "Your personalized plant care hub with history and recommendations",
      benefits: ["Plant Collection", "Care Statistics", "Achievements", "Community"],
      color: "garden"
    }
  ];

  return (
    <section className="py-16 px-6 bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Complete Plant Care Solution
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Beyond identification and planning - a comprehensive ecosystem for plant lovers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {additionalFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={feature.title}
                className={`bg-${feature.color}-50 border-${feature.color}-200 hover:shadow-lg transition-all duration-300 animate-fade-in`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardHeader className="text-center pb-3">
                  <div className={`mx-auto mb-3 p-2 rounded-full bg-${feature.color}-100 w-fit`}>
                    <IconComponent className={`h-6 w-6 text-${feature.color}-600`} />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-1">
                    {feature.benefits.map((benefit, idx) => (
                      <Badge 
                        key={idx} 
                        variant="outline" 
                        className={`text-xs mr-1 mb-1 border-${feature.color}-300 text-${feature.color}-700`}
                      >
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center bg-gradient-to-r from-garden-100 to-sage-100 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to Transform Your Garden?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of plant enthusiasts using AI-powered tools to create thriving, beautiful gardens. 
            Start your journey today with intelligent plant care and design.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge className="bg-garden-200 text-garden-800">AI-Powered</Badge>
            <Badge className="bg-sage-200 text-sage-800">Expert-Validated</Badge>
            <Badge className="bg-earth-200 text-earth-800">User-Friendly</Badge>
            <Badge className="bg-garden-200 text-garden-800">Mobile-Ready</Badge>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
