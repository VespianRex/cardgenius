
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Share2, MessageCircle, FileText, Plus, Check } from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { toast } from "@/hooks/use-toast";

const studyGroups = [
  {
    id: 1,
    name: "Anatomy Masters",
    members: 6,
    decks: 8,
    activity: "High",
    lastActive: "Today",
    avatars: ["A", "B", "C", "D", "E", "F"],
  },
  {
    id: 2,
    name: "Pathology Study Crew",
    members: 4,
    decks: 12,
    activity: "Medium",
    lastActive: "Yesterday",
    avatars: ["G", "H", "I", "J"],
  },
  {
    id: 3,
    name: "Pharmacology Group",
    members: 8,
    decks: 15,
    activity: "High",
    lastActive: "Today",
    avatars: ["K", "L", "M", "N", "O", "P", "Q", "R"],
  }
];

const sharedDecks = [
  {
    id: 1,
    title: "Cardiovascular System",
    cards: 145,
    sharedBy: "Dr. Martinez",
    rating: 4.8,
    sharedWith: 28,
    tags: ["cardiology", "system", "heart"]
  },
  {
    id: 2,
    title: "Neuroanatomy Essentials",
    cards: 210,
    sharedBy: "Prof. Williams",
    rating: 4.9,
    sharedWith: 42,
    tags: ["neurology", "anatomy", "brain"]
  },
  {
    id: 3,
    title: "Pharmacology - Antibiotics",
    cards: 86,
    sharedBy: "Dr. Johnson",
    rating: 4.7,
    sharedWith: 19,
    tags: ["drugs", "microbiology", "treatment"]
  },
  {
    id: 4,
    title: "Pediatric Pathologies",
    cards: 124,
    sharedBy: "Dr. Patel",
    rating: 4.6,
    sharedWith: 15,
    tags: ["pediatrics", "pathology", "diseases"]
  }
];

function getAvatarColor(initial: string) {
  const colors = [
    "bg-red-500", "bg-blue-500", "bg-green-500", 
    "bg-yellow-500", "bg-purple-500", "bg-pink-500", 
    "bg-indigo-500", "bg-teal-500"
  ];
  
  // Use the character code as a hash function
  const index = initial.charCodeAt(0) % colors.length;
  return colors[index];
}

export default function Collaboration() {
  const [activeTab, setActiveTab] = useState("groups");
  
  const handleJoinGroup = (groupId: number) => {
    toast({
      title: "Group joined!",
      description: `You've successfully joined the study group.`,
    });
  };

  const handleAddToLibrary = (deckId: number) => {
    toast({
      title: "Deck added to library",
      description: "The shared deck has been added to your library.",
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Collaborative Study</h1>
        <p className="text-muted-foreground">
          Learn together with peer annotations, shared decks, and performance comparisons.
        </p>
      </div>
      
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="groups" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Study Groups</span>
          </TabsTrigger>
          <TabsTrigger value="shared" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            <span>Shared Decks</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="groups" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studyGroups.map((group) => (
              <MagicCard key={group.id} className="relative overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {group.name}
                    <Badge 
                      variant={group.activity === "High" ? "default" : "secondary"}
                      className="ml-2"
                    >
                      {group.activity}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    {group.members} members · {group.decks} decks · Active {group.lastActive}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex -space-x-2 overflow-hidden">
                    {group.avatars.slice(0, 5).map((initial, idx) => (
                      <Avatar key={idx} className={`ring-2 ring-background ${idx > 2 ? "opacity-90" : ""}`}>
                        <AvatarFallback className={getAvatarColor(initial)}>{initial}</AvatarFallback>
                      </Avatar>
                    ))}
                    {group.avatars.length > 5 && (
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-xs">
                        +{group.avatars.length - 5}
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button 
                    onClick={() => handleJoinGroup(group.id)}
                    className="gap-2"
                  >
                    <Users className="h-4 w-4" />
                    Join Group
                  </Button>
                </CardFooter>
              </MagicCard>
            ))}
            
            <MagicCard className="flex flex-col items-center justify-center p-6 border-dashed">
              <Plus className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Create Study Group</h3>
              <p className="text-center text-muted-foreground mb-4">
                Start a new group to collaborate with classmates
              </p>
              <Button>
                Create New Group
              </Button>
            </MagicCard>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Group Activity Feed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarFallback className="bg-blue-500">JD</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Jane Doe</span>
                    <span className="text-muted-foreground text-sm">2 hours ago</span>
                  </div>
                  <p>Added 24 new cards to "Cardiac Pharmacology"</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarFallback className="bg-green-500">MS</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Mark Smith</span>
                    <span className="text-muted-foreground text-sm">Yesterday</span>
                  </div>
                  <p>Shared feedback on "Neuroanatomy" deck</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarFallback className="bg-purple-500">AT</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Alex Thompson</span>
                    <span className="text-muted-foreground text-sm">2 days ago</span>
                  </div>
                  <p>Created a new study session for "USMLE Step 1 Prep"</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="shared" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sharedDecks.map((deck) => (
              <Card key={deck.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle>{deck.title}</CardTitle>
                    <HoverCard>
                      <HoverCardTrigger>
                        <Badge variant="outline" className="cursor-help">
                          {deck.rating} ★
                        </Badge>
                      </HoverCardTrigger>
                      <HoverCardContent>
                        Based on {deck.sharedWith} student ratings
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    <FileText className="h-4 w-4" /> {deck.cards} cards
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-3">Shared by {deck.sharedBy} with {deck.sharedWith} students</p>
                  <div className="flex flex-wrap gap-2">
                    {deck.tags.map((tag, idx) => (
                      <Badge key={idx} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/50 flex justify-between">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <MessageCircle className="h-4 w-4" /> Discussions
                  </Button>
                  <Button onClick={() => handleAddToLibrary(deck.id)} size="sm" className="gap-2">
                    <Plus className="h-4 w-4" /> Add to Library
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl">Recently Shared With You</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback className="bg-yellow-500">RM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Clinical Oncology Cases</p>
                      <p className="text-sm text-muted-foreground">Shared by Dr. Rodriguez</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Check className="h-4 w-4" /> Accepted
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback className="bg-pink-500">LK</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Radiology Imaging Flashcards</p>
                      <p className="text-sm text-muted-foreground">Shared by Dr. Kim</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="default" size="sm">Accept</Button>
                    <Button variant="outline" size="sm">Decline</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback className="bg-indigo-500">JB</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Pharmacology - Antihypertensives</p>
                      <p className="text-sm text-muted-foreground">Shared by Study Group: Cardio Team</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="default" size="sm">Accept</Button>
                    <Button variant="outline" size="sm">Decline</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
