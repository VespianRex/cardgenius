import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Folder, FolderPlus, MoreVertical, Import, Export } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface Deck {
  id: string;
  name: string;
  description: string;
  cardCount: number;
  category: string;
}

export const DeckList = () => {
  const [decks, setDecks] = useState<Deck[]>([
    {
      id: "1",
      name: "Medical Terminology",
      description: "Basic medical terms and definitions",
      cardCount: 50,
      category: "Medicine"
    },
    {
      id: "2",
      name: "Anatomy Basics",
      description: "Human anatomy fundamentals",
      cardCount: 30,
      category: "Medicine"
    }
  ]);

  const handleImport = () => {
    // Placeholder for import functionality
    toast.info("Import functionality coming soon!");
  };

  const handleExport = (deckId: string) => {
    // Placeholder for export functionality
    toast.info("Export functionality coming soon!");
  };

  const handleDelete = (deckId: string) => {
    setDecks(decks.filter(deck => deck.id !== deckId));
    toast.success("Deck deleted successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Decks</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="gap-2"
            onClick={handleImport}
          >
            <Import className="w-4 h-4" />
            Import
          </Button>
          <Button
            className="gap-2 bg-medical-primary hover:bg-medical-primary/90"
          >
            <FolderPlus className="w-4 h-4" />
            New Deck
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {decks.map((deck) => (
          <Card key={deck.id} className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-medical-primary/10 rounded-lg">
                  <Folder className="w-5 h-5 text-medical-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{deck.name}</h3>
                  <p className="text-sm text-muted-foreground">{deck.description}</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleExport(deck.id)}>
                    <Export className="w-4 h-4 mr-2" />
                    Export
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleDelete(deck.id)}
                    className="text-destructive"
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
              <span>{deck.cardCount} cards</span>
              <span>{deck.category}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};