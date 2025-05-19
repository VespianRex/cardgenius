
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Circle, Timer, Calendar } from "lucide-react";

const RoadmapPage = () => {
  const featureCategories = [
    {
      name: "Specialized Learning",
      description: "Medical-specific learning tools",
      features: [
        { 
          title: "Anatomical Visualization Integration", 
          description: "3D anatomical models linked to flashcards with toggle between labeled/unlabeled structures",
          status: "planned",
          timeline: "Q3 2025"
        },
        { 
          title: "Clinical Case-Based Learning", 
          description: "Patient case scenarios, symptom-to-diagnosis pathways, and differential diagnosis exercises",
          status: "planned",
          timeline: "Q4 2025"
        },
        { 
          title: "Evidence-Based Learning Tools", 
          description: "Citation linking to primary literature with updates on changing medical guidelines",
          status: "in-progress",
          timeline: "Q2 2025"
        }
      ]
    },
    {
      name: "Medical Study Optimization",
      description: "Features tailored to medical curriculum",
      features: [
        { 
          title: "USMLE-Optimized Spaced Repetition", 
          description: "Intervals customized based on exam schedules with high-yield content prioritization",
          status: "planned",
          timeline: "Q3 2025"
        },
        { 
          title: "Smart Linking of Medical Concepts", 
          description: "Automatic connection of related systems, diseases, and medications with pathophysiology flowcharts",
          status: "in-progress",
          timeline: "Q2 2025"
        },
        { 
          title: "Clinical Mnemonics Generator", 
          description: "Automated creation of memory aids with visual association tools",
          status: "planned",
          timeline: "Q4 2025"
        }
      ]
    },
    {
      name: "Multimedia & Collaboration",
      description: "Rich media and group study features",
      features: [
        { 
          title: "Medical Imaging Integration", 
          description: "X-rays, CT scans, histology slides, and audio for heart/lung sounds linked to relevant cards",
          status: "planned",
          timeline: "Q1 2026"
        },
        { 
          title: "Collaborative Study Features", 
          description: "Shared decks for study groups with peer annotation and performance comparison",
          status: "completed",
          timeline: "Q1 2025"
        },
        { 
          title: "Voice-Activated Microlearning", 
          description: "Hands-free studying optimized for hospital rotations with location-based triggers",
          status: "planned",
          timeline: "Q2 2026"
        }
      ]
    },
    {
      name: "Assessment & Wellness",
      description: "Testing and wellbeing features",
      features: [
        { 
          title: "USMLE-Style Testing Modes", 
          description: "Exam format practice with timed blocks and confidence-based assessment",
          status: "planned",
          timeline: "Q3 2025"
        },
        { 
          title: "Specialty-Specific Progress Tracking", 
          description: "Performance analytics by body system with customized study plans for weak areas",
          status: "in-progress",
          timeline: "Q2 2025"
        },
        { 
          title: "Medical Student Wellness Features", 
          description: "Study breaks with guided meditation, burnout prevention, and sleep optimization",
          status: "planned",
          timeline: "Q4 2025"
        }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "in-progress":
        return <Timer className="h-5 w-5 text-amber-500" />;
      default:
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in p-4 md:p-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Feature Roadmap</h1>
        <p className="text-muted-foreground max-w-3xl">
          Our planned features to help medical students master complex concepts through 
          specialized study tools, clinical integrations, and evidence-based learning approaches.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {featureCategories.map((category, idx) => (
          <Card key={idx} className="p-6 overflow-hidden">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">{category.name}</h2>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                {category.features.map((feature, featureIdx) => (
                  <div key={featureIdx} className="flex gap-3">
                    <div className="mt-0.5">{getStatusIcon(feature.status)}</div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{feature.title}</h3>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {feature.timeline}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Have a feature suggestion?</h2>
        <p className="text-muted-foreground mb-4">
          We're always looking to improve our platform for medical students.
          If you have ideas for features that would help your studies, please let us know!
        </p>
        <div className="flex justify-end">
          <a href="mailto:feedback@medicalflashcards.com">
            <button className="px-4 py-2 bg-medical-primary text-white rounded hover:bg-medical-primary/90 transition-colors">
              Submit Feedback
            </button>
          </a>
        </div>
      </Card>
    </div>
  );
};

export default RoadmapPage;
