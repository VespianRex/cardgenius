
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { StudySection } from "@/components/sections/StudySection";
import { DeckList } from "@/components/DeckManagement/DeckList";
import { AnalyticsDashboard } from "@/components/analytics/AnalyticsDashboard";
import { FlashcardEditor } from "@/components/FlashcardManagement/FlashcardEditor";
import { FlashcardBulkImport } from "@/components/FlashcardManagement/FlashcardBulkImport";
import { MindStateTracker } from "@/components/study/MindStateTracker";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen, Brain, Rocket, ChartBar, Smile } from "lucide-react";

const Index = () => {
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [showEditor, setShowEditor] = useState(false);

  const features = [
    {
      icon: BookOpen,
      title: "Smart Flashcards",
      description: "Create and study flashcards with spaced repetition technology"
    },
    {
      icon: Brain,
      title: "Mind State Tracking",
      description: "Optimize your study sessions with focus and energy monitoring"
    },
    {
      icon: Rocket,
      title: "Accelerated Learning",
      description: "Learn faster with our advanced study scheduling algorithm"
    },
    {
      icon: ChartBar,
      title: "Progress Analytics",
      description: "Track your learning journey with detailed analytics"
    },
    {
      icon: Smile,
      title: "Personalized Experience",
      description: "Adaptive system that learns from your study patterns"
    }
  ];

  const handleSaveCard = (card: { front: string; back: string; tags: string[] }) => {
    console.log("Saving card:", card);
    setShowEditor(false);
  };

  return (
    <div className="space-y-16 pb-16">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20" />
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Master Any Subject with Smart Flashcards
            </h1>
            <p className="text-xl text-muted-foreground">
              Leverage the power of spaced repetition and mind state tracking to learn more effectively
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button size="lg" onClick={() => setShowEditor(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Flashcard
              </Button>
              <Button size="lg" variant="outline">
                Explore Decks
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-lg border p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <feature.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4">
        <div className="space-y-8">
          {showEditor ? (
            <FlashcardEditor
              onSave={handleSaveCard}
              onCancel={() => setShowEditor(false)}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <DeckList />
                <FlashcardBulkImport />
              </div>
              <div className="space-y-6">
                <MindStateTracker />
                <AnalyticsDashboard />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
