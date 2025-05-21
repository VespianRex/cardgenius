
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Star, ThumbsUp, ThumbsDown, FileText, Save, Lightbulb, Plus, Book, Bookmark, BookmarkCheck, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

interface Mnemonic {
  id: number;
  title: string;
  content: string;
  category: string;
  tags: string[];
  likes: number;
  saved: boolean;
  specialty?: string;
}

const popularMnemonics: Mnemonic[] = [
  {
    id: 1,
    title: "MUDPILES: Causes of Anion-Gap Metabolic Acidosis",
    content: "M - Methanol\nU - Uremia\nD - Diabetic ketoacidosis\nP - Paraldehyde\nI - Infection, Iron, Isoniazid\nL - Lactic acidosis\nE - Ethylene glycol\nS - Salicylates, Starvation ketosis",
    category: "Biochemistry",
    tags: ["acidosis", "anion-gap", "metabolic"],
    likes: 245,
    saved: false,
    specialty: "Internal Medicine"
  },
  {
    id: 2,
    title: "VITAMIN C: Indications for Adrenal Insufficiency",
    content: "V - Vitiligo\nI - Infection (recent/chronic)\nT - TB (history of)\nA - Autoimmune disorders\nM - Metastatic disease\nI - Infiltrative disease\nN - Necrosis/Neuropathy\nC - Congenital adrenal hyperplasia",
    category: "Endocrinology",
    tags: ["adrenal", "insufficiency", "endocrine"],
    likes: 189,
    saved: true,
    specialty: "Endocrinology"
  },
  {
    id: 3,
    title: "DANISH: Cranial Nerve Palsies in Diabetes",
    content: "D - Diplopia\nA - Anisocoria\nN - Nystagmus\nI - Internal ophthalmoplegia\nS - Sixth nerve palsy\nH - Horizontal gaze palsy",
    category: "Neurology",
    tags: ["diabetes", "cranial nerves", "palsy"],
    likes: 176,
    saved: false,
    specialty: "Neurology"
  },
  {
    id: 4,
    title: "SPACE D: Traumatic Causes of Radial Nerve Injury",
    content: "S - Saturday night palsy\nP - Pressure injury\nA - Axillary crutches\nC - Compression (cast, splint)\nE - External compression\nD - Distal humeral fracture",
    category: "Orthopedics",
    tags: ["radial nerve", "trauma", "injury"],
    likes: 142,
    saved: false,
    specialty: "Orthopedics"
  },
  {
    id: 5,
    title: "RATES: Findings in Rheumatoid Arthritis",
    content: "R - Rheumatoid nodules\nA - Arthritis (symmetric)\nT - Temperature elevation\nE - Elevated ESR\nS - Synovitis",
    category: "Rheumatology",
    tags: ["rheumatoid", "arthritis", "autoimmune"],
    likes: 198,
    saved: true,
    specialty: "Rheumatology"
  }
];

const specialties = [
  "All Specialties",
  "Cardiology",
  "Dermatology",
  "Endocrinology",
  "Gastroenterology",
  "Hematology",
  "Immunology",
  "Infectious Disease",
  "Nephrology",
  "Neurology",
  "Oncology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
  "Pulmonology",
  "Rheumatology",
  "Surgery",
  "Urology"
];

const categories = [
  "All Categories",
  "Anatomy",
  "Biochemistry",
  "Cardiology",
  "Embryology",
  "Endocrinology",
  "Genetics",
  "Hematology",
  "Immunology",
  "Microbiology",
  "Neurology",
  "Pathology",
  "Pharmacology",
  "Physiology",
  "Psychiatry",
];

export default function Mnemonics() {
  const [activeTab, setActiveTab] = useState("explore");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [mnemonics, setMnemonics] = useState(popularMnemonics);
  const [showGeneratorDialog, setShowGeneratorDialog] = useState(false);
  const [generatorInput, setGeneratorInput] = useState("");
  const [generatorPrompt, setGeneratorPrompt] = useState("");
  const [generatedMnemonic, setGeneratedMnemonic] = useState<string | null>(null);
  const [savedMnemonics, setSavedMnemonics] = useState(
    popularMnemonics.filter(m => m.saved)
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleSpecialtyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSpecialty(e.target.value);
  };

  const handleLikeMnemonic = (id: number) => {
    setMnemonics(prevMnemonics => 
      prevMnemonics.map(m => 
        m.id === id ? { ...m, likes: m.likes + 1 } : m
      )
    );
  };

  const handleSaveMnemonic = (id: number) => {
    setMnemonics(prevMnemonics => 
      prevMnemonics.map(m => {
        if (m.id === id) {
          const updated = { ...m, saved: !m.saved };
          if (updated.saved) {
            setSavedMnemonics(prev => [...prev, updated]);
            toast({
              title: "Mnemonic saved",
              description: "The mnemonic has been added to your saved collection."
            });
          } else {
            setSavedMnemonics(prev => prev.filter(sm => sm.id !== id));
            toast({
              title: "Mnemonic removed",
              description: "The mnemonic has been removed from your saved collection."
            });
          }
          return updated;
        }
        return m;
      })
    );
  };

  const handleGenerateMnemonic = () => {
    // This would normally call an API, but we'll simulate it with a timeout
    toast({
      title: "Generating mnemonic...",
      description: "This may take a few seconds."
    });
    
    setTimeout(() => {
      // Simulate generated content based on the input
      const topic = generatorInput.toLowerCase();
      let result = "";
      
      if (topic.includes("diabetes")) {
        result = "DIABETES:\nD - Diet and Drugs\nI - Infection susceptibility\nA - Autonomic neuropathy\nB - Blood pressure elevation\nE - Eye complications\nT - Touch sensation decreased\nE - Erectile dysfunction\nS - Stroke risk increased";
      } else if (topic.includes("heart") || topic.includes("cardiac")) {
        result = "HEART:\nH - Hypertension\nE - Exercise intolerance\nA - Angina\nR - Rhythm abnormalities\nT - Thrombosis risk";
      } else if (topic.includes("liver")) {
        result = "LIVER:\nL - Laboratory abnormalities\nI - Icterus (jaundice)\nV - Vascular complications\nE - Encephalopathy\nR - Right upper quadrant pain";
      } else {
        // Generic response for any other input
        const letters = generatorInput.slice(0, 5).toUpperCase().split("");
        result = letters.map(letter => `${letter} - ${getRandomWordForLetter(letter)}`).join("\n");
      }
      
      setGeneratedMnemonic(result);
      
      toast({
        title: "Mnemonic generated!",
        description: "Your custom mnemonic is ready."
      });
    }, 1500);
  };
  
  // Helper function for random word generation
  const getRandomWordForLetter = (letter: string) => {
    const wordsByLetter: Record<string, string[]> = {
      'A': ['Anatomy', 'Artery', 'Absorption', 'Asthma', 'Anemia'],
      'B': ['Blood', 'Bone', 'Brain', 'Bacteria', 'Bronchi'],
      'C': ['Cardiac', 'Cell', 'Cortex', 'Chronic', 'Coagulation'],
      'D': ['Diagnosis', 'Drug', 'Diabetes', 'Dermis', 'Disease'],
      'E': ['Enzyme', 'Edema', 'Evaluation', 'Etiology', 'Exacerbation'],
      'F': ['Function', 'Fever', 'Flow', 'Fascia', 'Fracture'],
      'G': ['Gastric', 'Gland', 'Growth', 'Gene', 'Glucose'],
      'H': ['Heart', 'Hormone', 'Hypertension', 'Histology', 'Hematoma'],
      'I': ['Infection', 'Immune', 'Intestine', 'Inflammation', 'Infarction'],
      'J': ['Joint', 'Jaundice', 'Jugular', 'Junction'],
      'K': ['Kidney', 'Ketosis', 'Keratin'],
      'L': ['Liver', 'Lung', 'Lymph', 'Lesion', 'Laboratory'],
      'M': ['Muscle', 'Membrane', 'Medication', 'Metabolism', 'Mucosa'],
      'N': ['Nerve', 'Neuron', 'Nutrition', 'Nephron', 'Nucleus'],
      'O': ['Organ', 'Oxygen', 'Occlusion', 'Osmosis', 'Oncology'],
      'P': ['Patient', 'Pathology', 'Pulse', 'Protein', 'Placenta'],
      'Q': ['Quality', 'Quadrant'],
      'R': ['Respiration', 'Renal', 'Reflex', 'Receptor', 'Radiology'],
      'S': ['System', 'Symptom', 'Synapse', 'Surgery', 'Stroke'],
      'T': ['Therapy', 'Tissue', 'Treatment', 'Trauma', 'Toxicity'],
      'U': ['Ulcer', 'Urine', 'Uterus', 'Ultrasound'],
      'V': ['Vein', 'Virus', 'Ventilation', 'Valve', 'Vessel'],
      'W': ['White blood cell', 'Wound', 'Weight'],
      'X': ['X-ray'],
      'Y': ['Yellow'],
      'Z': ['Zone']
    };
    
    const words = wordsByLetter[letter] || ['Medical term'];
    return words[Math.floor(Math.random() * words.length)];
  };

  const saveMnemonic = () => {
    if (generatedMnemonic) {
      const newMnemonic: Mnemonic = {
        id: mnemonics.length + 1,
        title: generatorPrompt || `Custom Mnemonic for ${generatorInput}`,
        content: generatedMnemonic,
        category: "Custom",
        tags: generatorInput.split(" ").filter(word => word.length > 3),
        likes: 0,
        saved: true
      };
      
      setMnemonics(prev => [...prev, newMnemonic]);
      setSavedMnemonics(prev => [...prev, newMnemonic]);
      
      toast({
        title: "Mnemonic saved to your collection!",
        description: "You can find it in your saved mnemonics tab."
      });
      
      setShowGeneratorDialog(false);
      setGeneratedMnemonic(null);
      setGeneratorInput("");
      setGeneratorPrompt("");
    }
  };

  const filteredMnemonics = mnemonics.filter(mnemonic => {
    const matchesSearch = searchTerm === "" || 
      mnemonic.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      mnemonic.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mnemonic.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All Categories" || 
      mnemonic.category === selectedCategory;
    
    const matchesSpecialty = selectedSpecialty === "All Specialties" || 
      mnemonic.specialty === selectedSpecialty;
    
    return matchesSearch && matchesCategory && matchesSpecialty;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Medical Mnemonics</h1>
        <p className="text-muted-foreground">
          Explore, create, and save memory aids to enhance your medical study experience.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 items-center mt-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            className="pl-10" 
            placeholder="Search mnemonics..." 
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
        <select 
          className="h-10 rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        
        <select 
          className="h-10 rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          value={selectedSpecialty}
          onChange={handleSpecialtyChange}
        >
          {specialties.map((specialty) => (
            <option key={specialty} value={specialty}>{specialty}</option>
          ))}
        </select>
        
        <Dialog open={showGeneratorDialog} onOpenChange={setShowGeneratorDialog}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Lightbulb className="h-4 w-4" />
              Generate Mnemonic
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Generate Custom Mnemonic</DialogTitle>
              <DialogDescription>
                Enter a medical topic to create a custom mnemonic device to help with memorization.
              </DialogDescription>
            </DialogHeader>
            
            {!generatedMnemonic ? (
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="topic" className="text-sm font-medium">Medical Topic</label>
                  <Input
                    id="topic"
                    placeholder="e.g., Diabetes complications, Liver function tests"
                    value={generatorInput}
                    onChange={(e) => setGeneratorInput(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Enter a specific medical topic or concept</p>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="prompt" className="text-sm font-medium">Title (Optional)</label>
                  <Input
                    id="prompt"
                    placeholder="e.g., Signs of Diabetic Neuropathy"
                    value={generatorPrompt}
                    onChange={(e) => setGeneratorPrompt(e.target.value)}
                  />
                </div>
                
                <DialogFooter className="mt-4">
                  <Button variant="outline" onClick={() => setShowGeneratorDialog(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleGenerateMnemonic} 
                    disabled={!generatorInput.trim()}
                    className="gap-2"
                  >
                    <Lightbulb className="h-4 w-4" />
                    Generate
                  </Button>
                </DialogFooter>
              </div>
            ) : (
              <div className="grid gap-4 py-4">
                <div className="border rounded-md p-4 bg-muted/30">
                  <h3 className="font-semibold mb-2">{generatorPrompt || `Mnemonic for ${generatorInput}`}</h3>
                  <pre className="whitespace-pre-wrap text-sm">{generatedMnemonic}</pre>
                </div>
                
                <DialogFooter className="mt-4 gap-2">
                  <Button variant="outline" onClick={() => setGeneratedMnemonic(null)}>
                    Try Another
                  </Button>
                  <Button onClick={saveMnemonic} className="gap-2">
                    <Save className="h-4 w-4" />
                    Save to Collection
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="explore" className="flex items-center gap-2">
            <Book className="h-4 w-4" />
            <span>Explore Mnemonics</span>
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex items-center gap-2">
            <Bookmark className="h-4 w-4" />
            <span>Saved Mnemonics</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="explore" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMnemonics.map((mnemonic) => (
              <Card key={mnemonic.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{mnemonic.title}</CardTitle>
                  <CardDescription>
                    {mnemonic.category}
                    {mnemonic.specialty && ` • ${mnemonic.specialty}`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="whitespace-pre-wrap text-sm mb-3">{mnemonic.content}</pre>
                  <div className="flex flex-wrap gap-2">
                    {mnemonic.tags.map((tag, idx) => (
                      <Badge key={idx} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/50 flex justify-between">
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="gap-1"
                      onClick={() => handleLikeMnemonic(mnemonic.id)}
                    >
                      <ThumbsUp className="h-4 w-4" /> 
                      <span>{mnemonic.likes}</span>
                    </Button>
                  </div>
                  <Button 
                    variant={mnemonic.saved ? "outline" : "secondary"} 
                    size="sm" 
                    className="gap-2"
                    onClick={() => handleSaveMnemonic(mnemonic.id)}
                  >
                    {mnemonic.saved ? (
                      <>
                        <BookmarkCheck className="h-4 w-4" /> 
                        <span>Saved</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="h-4 w-4" /> 
                        <span>Save</span>
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="saved" className="space-y-6">
          {savedMnemonics.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedMnemonics.map((mnemonic) => (
                <Card key={mnemonic.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg">{mnemonic.title}</CardTitle>
                      <Badge variant="outline">Saved</Badge>
                    </div>
                    <CardDescription>
                      {mnemonic.category}
                      {mnemonic.specialty && ` • ${mnemonic.specialty}`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <pre className="whitespace-pre-wrap text-sm mb-3">{mnemonic.content}</pre>
                    <div className="flex flex-wrap gap-2">
                      {mnemonic.tags.map((tag, idx) => (
                        <Badge key={idx} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted/50 flex justify-between">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <FileText className="h-4 w-4" /> 
                      <span>Add to Flashcards</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-2"
                      onClick={() => handleSaveMnemonic(mnemonic.id)}
                    >
                      <X className="h-4 w-4" /> 
                      <span>Remove</span>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <Bookmark className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No saved mnemonics yet</h3>
              <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                Explore and save mnemonics to build your collection for easy access during study sessions.
              </p>
              <Button 
                variant="outline" 
                onClick={() => setActiveTab("explore")}
                className="gap-2"
              >
                <Book className="h-4 w-4" />
                Explore Mnemonics
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
