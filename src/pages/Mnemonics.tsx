
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BrainCircuit, Copy, Heart, Lightbulb, Save, Search, Share2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { MagicCard } from "@/components/ui/magic-card";

const categories = [
  "Anatomy",
  "Pharmacology",
  "Pathology",
  "Microbiology",
  "Biochemistry",
  "Physiology",
  "Clinical Medicine"
];

const popularMnemonics = [
  {
    id: 1,
    title: "DANISH - Causes of Pancreatitis",
    mnemonic: "DANISH",
    explanation: "Drugs (thiazides, steroids), Alcohol, Neoplasia, Infection, Shock, Hyperlipidemia/Hypercalcemia",
    category: "Clinical Medicine",
    likes: 248,
    saved: true
  },
  {
    id: 2,
    title: "MUDPILES - Causes of Anion Gap Metabolic Acidosis",
    mnemonic: "MUDPILES",
    explanation: "Methanol, Uremia, Diabetic ketoacidosis, Propylene glycol, Isoniazid/Iron, Lactic acidosis, Ethylene glycol, Salicylates",
    category: "Clinical Medicine",
    likes: 312,
    saved: false
  },
  {
    id: 3,
    title: "VITAMIN C - Indications for Emergent Endoscopy",
    mnemonic: "VITAMIN C",
    explanation: "Visible vessel, Infant/Increased vitals, Tachycardia, Active bleeding, Medication failure, Instability of vitals, Nasogastric tube aspirate shows blood, Comorbid disease, Coffee ground emesis",
    category: "Clinical Medicine",
    likes: 186,
    saved: false
  },
  {
    id: 4,
    title: "SCALP - Layers of the Scalp",
    mnemonic: "SCALP",
    explanation: "Skin, Connective tissue, Aponeurosis, Loose connective tissue, Periosteum",
    category: "Anatomy",
    likes: 142,
    saved: false
  }
];

export default function Mnemonics() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [activeTab, setActiveTab] = useState("explore");
  const [mnemonicText, setMnemonicText] = useState("");
  const [conceptText, setConceptText] = useState("");
  const [savedMnemonics, setSavedMnemonics] = useState(
    popularMnemonics.filter(m => m.saved)
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleGenerateMnemonic = () => {
    if (!conceptText.trim()) {
      toast({
        title: "Please enter a medical concept",
        description: "We need to know what concept you want a mnemonic for.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate API call delay
    toast({
      title: "Generating mnemonic...",
      description: "This might take a few seconds."
    });
    
    // Simulate returned mnemonic
    setTimeout(() => {
      let generatedMnemonic = "";
      
      // Simple demo logic to create a mnemonic from the first letters
      const words = conceptText.split(" ");
      if (words.length > 2) {
        generatedMnemonic = words.map(word => word.charAt(0).toUpperCase()).join("");
      } else {
        // For single words, create something based on the word
        generatedMnemonic = conceptText.slice(0, 5).toUpperCase();
      }
      
      setMnemonicText(generatedMnemonic);
      
      toast({
        title: "Mnemonic generated!",
        description: "Your mnemonic is ready to use."
      });
    }, 1500);
  };

  const handleSaveMnemonic = (id: number) => {
    // Toggle saved status
    const updatedMnemonics = popularMnemonics.map(mnemonic => {
      if (mnemonic.id === id) {
        return { ...mnemonic, saved: !mnemonic.saved };
      }
      return mnemonic;
    });
    
    // Update saved mnemonics list
    setSavedMnemonics(updatedMnemonics.filter(m => m.saved));
    
    toast({
      title: "Mnemonic saved",
      description: "Added to your personal collection."
    });
  };

  const handleCopyMnemonic = (mnemonic: string) => {
    navigator.clipboard.writeText(mnemonic);
    toast({
      title: "Copied to clipboard",
      description: "Mnemonic has been copied to your clipboard."
    });
  };

  const filteredMnemonics = popularMnemonics.filter(mnemonic => {
    const matchesSearch = searchTerm === "" || 
      mnemonic.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      mnemonic.mnemonic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mnemonic.explanation.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || mnemonic.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Clinical Mnemonics Generator</h1>
        <p className="text-muted-foreground max-w-3xl">
          Create and discover powerful memory aids for medical concepts with visual associations.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="explore" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            <span>Explore</span>
          </TabsTrigger>
          <TabsTrigger value="generate" className="flex items-center gap-2">
            <BrainCircuit className="h-4 w-4" />
            <span>Generate</span>
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            <span>Saved</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="explore" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search mnemonics..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full"
              />
            </div>
            <div className="w-full md:w-[200px]">
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMnemonics.map((mnemonic) => (
              <MagicCard key={mnemonic.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{mnemonic.title}</CardTitle>
                    <Badge>{mnemonic.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted p-4 rounded-md flex items-center justify-between">
                    <div className="text-2xl font-bold tracking-wider">{mnemonic.mnemonic}</div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleCopyMnemonic(mnemonic.mnemonic)}
                      title="Copy mnemonic"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm">{mnemonic.explanation}</p>
                </CardContent>
                <CardFooter className="bg-muted/50 flex justify-between">
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-500 hover:text-red-600"
                      title="Like mnemonic"
                    >
                      <Heart className="h-4 w-4 mr-1" />
                      {mnemonic.likes}
                    </Button>
                    <Button variant="ghost" size="sm" title="Share mnemonic">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button 
                    variant={mnemonic.saved ? "default" : "outline"} 
                    size="sm"
                    onClick={() => handleSaveMnemonic(mnemonic.id)}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {mnemonic.saved ? "Saved" : "Save"}
                  </Button>
                </CardFooter>
              </MagicCard>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="generate" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generate a New Mnemonic</CardTitle>
              <CardDescription>
                Enter a medical concept or list of terms to create a memorable mnemonic
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Medical Concept or Terms</label>
                <Textarea 
                  placeholder="Enter medical concept or terms separated by commas (e.g., 'layers of the epidermis' or 'steps in the Krebs cycle')"
                  value={conceptText}
                  onChange={(e) => setConceptText(e.target.value)}
                  rows={4}
                />
              </div>
              
              <div className="flex items-center gap-4">
                <Select defaultValue="standard">
                  <SelectTrigger className="w-full max-w-[200px]">
                    <SelectValue placeholder="Mnemonic Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard (First Letters)</SelectItem>
                    <SelectItem value="acronym">Acronym</SelectItem>
                    <SelectItem value="association">Visual Association</SelectItem>
                    <SelectItem value="rhyme">Rhyming</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button onClick={handleGenerateMnemonic} className="gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Generate Mnemonic
                </Button>
              </div>
              
              {mnemonicText && (
                <>
                  <Separator />
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Generated Mnemonic</label>
                      <div className="p-4 bg-muted rounded-md flex items-center justify-between">
                        <div className="text-2xl font-bold tracking-wider">{mnemonicText}</div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleCopyMnemonic(mnemonicText)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Explanation</label>
                      <Textarea 
                        placeholder="Add your explanation of what each letter stands for..."
                        rows={3}
                      />
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                      <Button variant="default">
                        <Save className="h-4 w-4 mr-2" />
                        Save Mnemonic
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Tips for Effective Mnemonics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Make it Meaningful</h3>
                  <p className="text-sm text-muted-foreground">
                    The more personal, vivid, or absurd the association, the better it will stick in your memory.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Use Visualization</h3>
                  <p className="text-sm text-muted-foreground">
                    Creating a mental image or story around your mnemonic makes it much easier to recall.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Keep it Simple</h3>
                  <p className="text-sm text-muted-foreground">
                    Shorter mnemonics are usually more effective than longer ones.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Practice Retrieval</h3>
                  <p className="text-sm text-muted-foreground">
                    Test yourself on the mnemonic to strengthen the memory connection.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saved" className="space-y-6">
          {savedMnemonics.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedMnemonics.map((mnemonic) => (
                <MagicCard key={mnemonic.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{mnemonic.title}</CardTitle>
                      <Badge>{mnemonic.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted p-4 rounded-md flex items-center justify-between">
                      <div className="text-2xl font-bold tracking-wider">{mnemonic.mnemonic}</div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleCopyMnemonic(mnemonic.mnemonic)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm">{mnemonic.explanation}</p>
                  </CardContent>
                  <CardFooter className="bg-muted/50 flex justify-between">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                        <Heart className="h-4 w-4 mr-1" fill="currentColor" />
                        {mnemonic.likes}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => handleSaveMnemonic(mnemonic.id)}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Saved
                    </Button>
                  </CardFooter>
                </MagicCard>
              ))}
            </div>
          ) : (
            <Card className="p-10 text-center">
              <div className="flex flex-col items-center gap-4">
                <Save className="h-16 w-16 text-muted-foreground/50" />
                <h3 className="text-xl font-medium">No saved mnemonics yet</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Save mnemonics from the Explore tab or create your own in the Generate tab to build your collection.
                </p>
                <Button onClick={() => setActiveTab("explore")}>
                  Explore Mnemonics
                </Button>
              </div>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
