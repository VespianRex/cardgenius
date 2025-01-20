import { Routes, Route } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Upload, Download, FolderTree } from "lucide-react";
import { FlashcardBulkImport } from "@/components/FlashcardManagement/FlashcardBulkImport";
import { FlashcardEditor } from "@/components/FlashcardManagement/FlashcardEditor";
import { useState } from "react";
import { toast } from "sonner";

const Categories = () => {
  return (
    <div className="p-8 space-y-6">
      <h2 className="text-2xl font-bold">Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
          <FolderTree className="w-6 h-6 text-medical-primary mb-2" />
          <h3 className="font-semibold">Anatomy</h3>
          <p className="text-sm text-muted-foreground">3 decks</p>
        </Card>
        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
          <FolderTree className="w-6 h-6 text-medical-secondary mb-2" />
          <h3 className="font-semibold">Physiology</h3>
          <p className="text-sm text-muted-foreground">2 decks</p>
        </Card>
        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
          <FolderTree className="w-6 h-6 text-medical-accent mb-2" />
          <h3 className="font-semibold">Pathology</h3>
          <p className="text-sm text-muted-foreground">4 decks</p>
        </Card>
      </div>
    </div>
  );
};

const LibraryContent = () => {
  const [showEditor, setShowEditor] = useState(false);

  const handleSaveCard = (card: { front: string; back: string; tags: string[] }) => {
    console.log("Saving card:", card);
    toast.success("Card saved successfully!");
    setShowEditor(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Flashcard Library</h1>
        <div className="flex gap-4">
          <Button onClick={() => setShowEditor(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Card
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input className="pl-10" placeholder="Search cards..." />
      </div>

      {showEditor ? (
        <FlashcardEditor
          onSave={handleSaveCard}
          onCancel={() => setShowEditor(false)}
        />
      ) : (
        <>
          <FlashcardBulkImport />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <h3 className="font-semibold">Anatomy Basics</h3>
              <p className="text-sm text-muted-foreground">120 cards</p>
            </Card>
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <h3 className="font-semibold">Physiology</h3>
              <p className="text-sm text-muted-foreground">85 cards</p>
            </Card>
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <h3 className="font-semibold">Pathology</h3>
              <p className="text-sm text-muted-foreground">150 cards</p>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

const Library = () => {
  return (
    <Routes>
      <Route path="/" element={<LibraryContent />} />
      <Route path="/decks" element={<LibraryContent />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/import" element={<FlashcardBulkImport />} />
      <Route path="/export" element={
        <div className="p-8">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Export Deck</h2>
            <p className="text-muted-foreground mb-4">Choose a format to export your flashcards.</p>
            <div className="space-x-4">
              <Button onClick={() => toast.success("Deck exported as CSV!")}>
                <Download className="w-4 h-4 mr-2" />
                Export as CSV
              </Button>
              <Button variant="outline" onClick={() => toast.success("Deck exported as PDF!")}>
                <Download className="w-4 h-4 mr-2" />
                Export as PDF
              </Button>
            </div>
          </Card>
        </div>
      } />
    </Routes>
  );
};

export default Library;