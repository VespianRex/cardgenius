import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HelpCircle, Mail } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { MainNavigation } from "@/components/layout/MainNavigation";
import { toast } from "sonner";

const Help = () => {
  const handleContact = () => {
    toast.success("Support request sent!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <MainNavigation activeTab="help" onTabChange={() => {}} />
        
        <div className="mt-8 space-y-6">
          <Card className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <HelpCircle className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Help & Support</h2>
            </div>

            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I create a new flashcard?</AccordionTrigger>
                <AccordionContent>
                  To create a new flashcard, click the "+" button in the bottom right corner and select "New Card". Fill in the front and back of the card, add any tags, and click Save.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>What is spaced repetition?</AccordionTrigger>
                <AccordionContent>
                  Spaced repetition is a learning technique that incorporates increasing intervals of time between subsequent review of previously learned material to exploit the psychological spacing effect.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>How do I track my progress?</AccordionTrigger>
                <AccordionContent>
                  You can view your study progress in the Analytics dashboard. It shows your study streak, cards reviewed, and success rate over time.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Still need help?</h3>
              <Button onClick={handleContact} className="gap-2">
                <Mail className="w-4 h-4" />
                Contact Support
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Help;