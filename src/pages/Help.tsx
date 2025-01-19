import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Brain, Keyboard, Star, Clock } from "lucide-react";

const Help = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">Help Center</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-medical-primary/10 rounded-lg">
              <Keyboard className="w-5 h-5 text-medical-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Keyboard Shortcuts</h3>
              <p className="text-sm text-muted-foreground">Learn to study faster</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-medical-secondary/10 rounded-lg">
              <Brain className="w-5 h-5 text-medical-secondary" />
            </div>
            <div>
              <h3 className="font-semibold">Study Techniques</h3>
              <p className="text-sm text-muted-foreground">Optimize your learning</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-medical-accent/10 rounded-lg">
              <Star className="w-5 h-5 text-medical-accent" />
            </div>
            <div>
              <h3 className="font-semibold">Achievement Guide</h3>
              <p className="text-sm text-muted-foreground">Track your progress</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-medical-primary/10 rounded-lg">
              <Clock className="w-5 h-5 text-medical-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Study Planning</h3>
              <p className="text-sm text-muted-foreground">Optimize your schedule</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>How does the spaced repetition system work?</AccordionTrigger>
            <AccordionContent>
              Our spaced repetition system adapts to your learning patterns. Cards you find difficult appear more frequently, while well-known cards are shown at increasing intervals.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>What are the keyboard shortcuts?</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2">
                <li>Space - Flip card</li>
                <li>→ - Next card</li>
                <li>← - Previous card</li>
                <li>1-3 - Rate difficulty</li>
                <li>K - Show keyboard shortcuts</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>How are achievements earned?</AccordionTrigger>
            <AccordionContent>
              Achievements are earned through consistent study habits, maintaining streaks, and reaching various milestones in your learning journey.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>How is my study schedule optimized?</AccordionTrigger>
            <AccordionContent>
              We analyze your study patterns, performance data, and energy levels throughout the day to suggest optimal study times and break intervals.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  );
};

export default Help;