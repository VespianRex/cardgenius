import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Folder, FolderPlus, MoreVertical, Import, ArrowUpRight, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface Deck {
  id: string;
  name: string;
  description: string;
  cardCount: number;
  category: string;
  tags: string[];
}

export const DeckList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [decks, setDecks] = useState<Deck[]>([
    {
      id: "1",
      name: "Medical Terminology",
      description: "Basic medical terms and definitions",
      cardCount: 50,
      category: "Medicine",
      tags: ["basics", "terminology"]
    },
    {
      id: "2",
      name: "Anatomy Basics",
      description: "Human anatomy fundamentals",
      cardCount: 30,
      category: "Medicine",
      tags: ["anatomy", "basics"]
    }
  ]);

  const handleImport = () => {
    toast.info("Import functionality coming soon!");
  };

  const handleExport = (deckId: string) => {
    toast.info("Export functionality coming soon!");
  };

  const handleDelete = (deckId: string) => {
    setDecks(decks.filter(deck => deck.id !== deckId));
    toast.success("Deck deleted successfully");
  };

  const filteredAndSortedDecks = decks
    .filter(deck => {
      const matchesSearch = deck.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deck.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || deck.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "cardCount":
          return b.cardCount - a.cardCount;
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
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

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search decks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-col sm:flex-row">
          <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Medicine">Medicine</SelectItem>
              <SelectItem value="Anatomy">Anatomy</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={sortBy}
            onValueChange={setSortBy}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="cardCount">Card Count</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAndSortedDecks.map((deck) => (
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
                    <ArrowUpRight className="w-4 h-4 mr-2" />
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
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {deck.tags.map(tag => (
                <span 
                  key={tag}
                  className="px-2 py-1 text-xs bg-medical-primary/10 text-medical-primary rounded-full"
                >
                  {tag}
                </span>
              ))}
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