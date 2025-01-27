import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, BookOpen, Brain, Star } from "lucide-react";
import { SearchFilters } from "@/components/analytics/SearchFilters";
import { SmartCardOrganizer } from "@/components/cards/SmartCardOrganizer";

const Library = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-start">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Study Library</h1>
          <p className="text-muted-foreground">
            Manage your flashcard decks and study materials
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Deck
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search cards and decks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <SearchFilters />
        </div>

        <SmartCardOrganizer />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 hover:border-medical-primary/40 transition-colors cursor-pointer">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-medical-primary/10 rounded-lg">
              <BookOpen className="w-5 h-5 text-medical-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Medical Terms</h3>
              <p className="text-sm text-muted-foreground">200 cards</p>
            </div>
          </div>
          <Progress value={65} className="h-2" />
        </Card>

        <Card className="p-6 hover:border-medical-secondary/40 transition-colors cursor-pointer">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-medical-secondary/10 rounded-lg">
              <Brain className="w-5 h-5 text-medical-secondary" />
            </div>
            <div>
              <h3 className="font-semibold">Anatomy</h3>
              <p className="text-sm text-muted-foreground">150 cards</p>
            </div>
          </div>
          <Progress value={45} className="h-2" />
        </Card>

        <Card className="p-6 hover:border-medical-accent/40 transition-colors cursor-pointer">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-medical-accent/10 rounded-lg">
              <Star className="w-5 h-5 text-medical-accent" />
            </div>
            <div>
              <h3 className="font-semibold">Favorites</h3>
              <p className="text-sm text-muted-foreground">50 cards</p>
            </div>
          </div>
          <Progress value={85} className="h-2" />
        </Card>
      </div>
    </div>
  );
};

export default Library;