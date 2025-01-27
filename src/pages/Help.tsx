import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Keyboard, Brain, Clock, Trophy, BookOpen } from "lucide-react";

const Help = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Help Center</h1>
        <p className="text-muted-foreground">
          Find answers to common questions and learn how to use the study platform effectively.
        </p>
      </div>

      <Card className="p-6">
        <Accordion type="single" collapsible>
          <AccordionItem value="keyboard">
            <AccordionTrigger className="flex items-center gap-2">
              <Keyboard className="w-5 h-5" />
              Keyboard Shortcuts
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2">
                <li>Space - Flip card</li>
                <li>→ - Next card</li>
                <li>← - Previous card</li>
                <li>E - Rate Easy</li>
                <li>M - Rate Medium</li>
                <li>H - Rate Hard</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="study">
            <AccordionTrigger className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Study Techniques
            </AccordionTrigger>
            <AccordionContent>
              <p>Our spaced repetition system helps you learn efficiently by:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Showing cards at optimal intervals</li>
                <li>Adapting to your performance</li>
                <li>Focusing on challenging material</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="tracking">
            <AccordionTrigger className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Progress Tracking
            </AccordionTrigger>
            <AccordionContent>
              <p>Track your learning progress with:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Study session summaries</li>
                <li>Performance analytics</li>
                <li>Learning streaks</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  );
};

export default Help;