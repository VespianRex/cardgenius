
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { MagicCard } from "@/components/ui/magic-card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, CheckCircle, Calendar, Clock, Star, Award, MapPin, Lock, Unlock, Zap, ArrowRight, ChevronRight, FileText, BarChart2, Users, Brain, Lightbulb } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Milestone {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: string;
  totalItems: number;
  completedItems: number;
  tags: string[];
  locked?: boolean;
  icon: React.ReactNode;
}

interface Goal {
  id: number;
  title: string;
  description: string;
  progress: number;
  dueDate?: string;
  category: string;
  priority: "High" | "Medium" | "Low";
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  dateEarned?: string;
  unlocked: boolean;
}

export default function Roadmap() {
  const [activeTab, setActiveTab] = useState("journey");
  const [activeGoalsTab, setActiveGoalsTab] = useState("active");
  const [showMilestoneDialog, setShowMilestoneDialog] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [showGoalDialog, setShowGoalDialog] = useState(false);
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: 1,
      title: "Anatomy Foundations",
      description: "Master the basic anatomical structures and relationships",
      completed: true,
      dueDate: "2025-03-15",
      totalItems: 12,
      completedItems: 12,
      tags: ["anatomy", "foundations", "completed"],
      icon: <FileText className="text-green-500" />
    },
    {
      id: 2,
      title: "Pathophysiology",
      description: "Understand the mechanisms of disease processes",
      completed: false,
      dueDate: "2025-05-30",
      totalItems: 18,
      completedItems: 13,
      tags: ["pathology", "physiology", "in-progress"],
      icon: <FileText className="text-blue-500" />
    },
    {
      id: 3,
      title: "Pharmacology Basics",
      description: "Learn fundamental drug mechanisms and classifications",
      completed: false,
      dueDate: "2025-07-10",
      totalItems: 15,
      completedItems: 6,
      tags: ["pharmacology", "drugs", "mechanisms"],
      icon: <FileText className="text-purple-500" />
    },
    {
      id: 4,
      title: "Clinical Diagnosis",
      description: "Practice clinical reasoning and differential diagnosis",
      completed: false,
      dueDate: "2025-08-20",
      totalItems: 20,
      completedItems: 4,
      tags: ["clinical", "diagnosis", "reasoning"],
      icon: <Brain className="text-orange-500" />
    },
    {
      id: 5,
      title: "Medical Ethics",
      description: "Explore ethical considerations in medical practice",
      completed: false,
      totalItems: 10,
      completedItems: 0,
      tags: ["ethics", "practice", "professionalism"],
      locked: true,
      icon: <FileText className="text-gray-500" />
    },
  ]);
  
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      title: "Complete Cardiology Section",
      description: "Master all aspects of the cardiovascular system",
      progress: 65,
      dueDate: "2025-06-10",
      category: "Subject Mastery",
      priority: "High"
    },
    {
      id: 2,
      title: "Create 100 Neurology Flashcards",
      description: "Develop comprehensive flashcard set for neurology topics",
      progress: 42,
      dueDate: "2025-06-25",
      category: "Content Creation",
      priority: "Medium"
    },
    {
      id: 3,
      title: "Weekly Study Group Sessions",
      description: "Participate in collaborative study sessions",
      progress: 80,
      dueDate: "2025-05-31",
      category: "Collaboration",
      priority: "Medium"
    },
    {
      id: 4,
      title: "Review Pharmacology Daily",
      description: "Spend 30 minutes daily reviewing drug mechanisms",
      progress: 30,
      category: "Regular Practice",
      priority: "High"
    },
    {
      id: 5,
      title: "Complete NBME Practice Exam",
      description: "Take and review a full practice examination",
      progress: 0,
      dueDate: "2025-07-15",
      category: "Assessment",
      priority: "Low"
    },
  ]);
  
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 1,
      title: "First Steps",
      description: "Created your first 10 flashcards",
      icon: <Award className="text-yellow-500" />,
      dateEarned: "2025-02-10",
      unlocked: true
    },
    {
      id: 2,
      title: "Study Streak",
      description: "Studied for 7 consecutive days",
      icon: <Zap className="text-yellow-500" />,
      dateEarned: "2025-03-05",
      unlocked: true
    },
    {
      id: 3,
      title: "Knowledge Builder",
      description: "Mastered 100 flashcards",
      icon: <BookOpen className="text-yellow-500" />,
      dateEarned: "2025-04-12",
      unlocked: true
    },
    {
      id: 4,
      title: "Anatomy Expert",
      description: "Achieved 95% success rate in Anatomy deck",
      icon: <Star className="text-gray-400" />,
      unlocked: false
    },
    {
      id: 5,
      title: "Collaboration Champion",
      description: "Shared decks with 10 different users",
      icon: <Users className="text-gray-400" />,
      unlocked: false
    },
    {
      id: 6,
      title: "Marathon Learner",
      description: "Studied for more than 24 hours in one week",
      icon: <Clock className="text-gray-400" />,
      unlocked: false
    }
  ]);
  
  const handleMilestoneClick = (milestone: Milestone) => {
    if (milestone.locked) {
      toast({
        title: "Milestone locked",
        description: "Complete previous milestones to unlock this one.",
        variant: "destructive"
      });
      return;
    }
    
    setSelectedMilestone(milestone);
    setShowMilestoneDialog(true);
  };
  
  const handleCompleteMilestoneItem = (milestoneId: number, itemIndex: number, checked: boolean) => {
    setMilestones(prevMilestones =>
      prevMilestones.map(m => {
        if (m.id === milestoneId) {
          const newCompletedItems = checked 
            ? m.completedItems + 1 
            : Math.max(0, m.completedItems - 1);
          
          const isNowCompleted = newCompletedItems === m.totalItems;
          
          if (isNowCompleted && !m.completed) {
            toast({
              title: "Milestone completed!",
              description: `You've completed "${m.title}". Keep up the great work!`,
            });
          }
          
          return {
            ...m,
            completedItems: newCompletedItems,
            completed: isNowCompleted
          };
        }
        return m;
      })
    );
  };
  
  const handleCreateGoal = (data: any) => {
    const newGoal: Goal = {
      id: goals.length + 1,
      title: data.title,
      description: data.description,
      progress: 0,
      dueDate: data.dueDate,
      category: data.category,
      priority: data.priority as "High" | "Medium" | "Low"
    };
    
    setGoals(prev => [...prev, newGoal]);
    
    toast({
      title: "Goal created!",
      description: "Your new study goal has been added to your roadmap."
    });
    
    setShowGoalDialog(false);
  };
  
  const getProgressColor = (progress: number) => {
    if (progress < 25) return "bg-red-500";
    if (progress < 50) return "bg-orange-500";
    if (progress < 75) return "bg-yellow-500";
    return "bg-green-500";
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "Medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Low": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default: return "";
    }
  };

  // Mock milestone items for our dialog
  const getMilestoneItems = (id: number) => {
    switch(id) {
      case 1:
        return [
          { name: "Skeletal System Overview", completed: true },
          { name: "Muscular System Basics", completed: true },
          { name: "Cardiovascular System", completed: true },
          { name: "Respiratory System", completed: true },
          { name: "Neurological System", completed: true },
          { name: "Digestive System", completed: true },
          { name: "Endocrine System", completed: true },
          { name: "Reproductive System", completed: true },
          { name: "Lymphatic System", completed: true },
          { name: "Integumentary System", completed: true },
          { name: "Urinary System", completed: true },
          { name: "Regional Anatomy", completed: true },
        ];
      case 2:
        return [
          { name: "Inflammation Processes", completed: true },
          { name: "Immune Response", completed: true },
          { name: "Cell Injury and Death", completed: true },
          { name: "Neoplasia", completed: true },
          { name: "Genetic Disorders", completed: true },
          { name: "Infectious Diseases", completed: true },
          { name: "Cardiovascular Pathology", completed: true },
          { name: "Respiratory Pathology", completed: true },
          { name: "Renal Pathology", completed: true },
          { name: "Gastrointestinal Pathology", completed: true },
          { name: "Endocrine Pathology", completed: true },
          { name: "Neurological Disorders", completed: true },
          { name: "Hematologic Disorders", completed: true },
          { name: "Musculoskeletal Disorders", completed: false },
          { name: "Skin Disorders", completed: false },
          { name: "Aging and Disease", completed: false },
          { name: "Environmental Pathology", completed: false },
          { name: "Nutritional Diseases", completed: false },
        ];
      case 3:
        return [
          { name: "Pharmacokinetics", completed: true },
          { name: "Pharmacodynamics", completed: true },
          { name: "Autonomic Pharmacology", completed: true },
          { name: "Cardiovascular Drugs", completed: true },
          { name: "Antimicrobials", completed: true },
          { name: "Respiratory Drugs", completed: true },
          { name: "CNS Pharmacology", completed: false },
          { name: "Gastrointestinal Drugs", completed: false },
          { name: "Endocrine Drugs", completed: false },
          { name: "Chemotherapeutics", completed: false },
          { name: "Anti-inflammatory Drugs", completed: false },
          { name: "Drug Interactions", completed: false },
          { name: "Toxicology", completed: false },
          { name: "Drug Development", completed: false },
          { name: "Personalized Medicine", completed: false },
        ];
      case 4:
        return [
          { name: "History Taking Skills", completed: true },
          { name: "Physical Examination", completed: true },
          { name: "Laboratory Test Interpretation", completed: true },
          { name: "Diagnostic Imaging", completed: true },
          { name: "Clinical Decision Making", completed: false },
          { name: "Differential Diagnosis", completed: false },
          { name: "Evidence-based Medicine", completed: false },
          { name: "Acute Care Assessment", completed: false },
          { name: "Chronic Disease Management", completed: false },
          { name: "Pediatric Assessment", completed: false },
          { name: "Geriatric Assessment", completed: false },
          { name: "Emergency Evaluation", completed: false },
          { name: "Psychiatric Assessment", completed: false },
          { name: "Clinical Documentation", completed: false },
          { name: "Patient Communication", completed: false },
          { name: "Family-Centered Care", completed: false },
          { name: "Cultural Competence", completed: false },
          { name: "Interprofessional Collaboration", completed: false },
          { name: "Quality Improvement", completed: false },
          { name: "Patient Safety", completed: false },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Study Roadmap</h1>
        <p className="text-muted-foreground">
          Plan your learning journey, track milestones, and celebrate achievements.
        </p>
      </div>
      
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="journey" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Learning Journey</span>
          </TabsTrigger>
          <TabsTrigger value="goals" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>Study Goals</span>
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            <span>Achievements</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="journey" className="space-y-6">
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-muted z-0"></div>
            
            <div className="space-y-8 relative z-10">
              {milestones.map((milestone, index) => (
                <div key={milestone.id} className="flex gap-4">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full z-10 ${
                    milestone.completed 
                      ? "bg-primary text-primary-foreground" 
                      : milestone.locked 
                        ? "bg-muted text-muted-foreground"
                        : "bg-card border-2 border-primary text-primary"
                  }`}>
                    {milestone.completed ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : milestone.locked ? (
                      <Lock className="h-4 w-4" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <MagicCard 
                      className={`
                        relative overflow-hidden cursor-pointer
                        ${milestone.locked ? "opacity-60" : ""}
                      `}
                      onClick={() => handleMilestoneClick(milestone)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            {milestone.icon}
                            <CardTitle className="text-xl">{milestone.title}</CardTitle>
                          </div>
                          
                          {milestone.completed ? (
                            <Badge variant="default" className="bg-green-500">Completed</Badge>
                          ) : milestone.locked ? (
                            <Badge variant="outline" className="gap-1">
                              <Lock className="h-3 w-3" /> Locked
                            </Badge>
                          ) : milestone.dueDate ? (
                            <Badge variant="outline" className="gap-1">
                              <Calendar className="h-3 w-3" /> Due {new Date(milestone.dueDate).toLocaleDateString()}
                            </Badge>
                          ) : null}
                        </div>
                        <CardDescription>{milestone.description}</CardDescription>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="flex items-center gap-2 mb-2">
                          <Progress
                            value={(milestone.completedItems / milestone.totalItems) * 100}
                            className={`h-2 ${
                              milestone.completed
                                ? "bg-muted/50 [&>*]:bg-green-500"
                                : "bg-muted/50 [&>*]:bg-blue-500"
                            }`}
                          />
                          <span className="text-sm font-medium">
                            {milestone.completedItems}/{milestone.totalItems}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {milestone.tags.map((tag, idx) => (
                            <Badge key={idx} variant="secondary">{tag}</Badge>
                          ))}
                        </div>
                      </CardContent>
                      
                      <CardFooter className="border-t bg-muted/50">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="gap-1 text-muted-foreground"
                          disabled={milestone.locked}
                        >
                          View Details <ChevronRight className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                      
                      {milestone.completed && (
                        <div className="absolute top-2 right-2 rotate-12">
                          <Badge variant="outline" className="border-green-500 text-green-500">
                            ✓
                          </Badge>
                        </div>
                      )}
                    </MagicCard>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <Dialog open={showMilestoneDialog} onOpenChange={setShowMilestoneDialog}>
            {selectedMilestone && (
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <div className="flex items-center gap-2">
                    {selectedMilestone.icon}
                    <DialogTitle>{selectedMilestone.title}</DialogTitle>
                  </div>
                  <DialogDescription>{selectedMilestone.description}</DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">Progress</div>
                    <div className="text-sm font-medium">
                      {selectedMilestone.completedItems}/{selectedMilestone.totalItems} completed
                    </div>
                  </div>
                  
                  <Progress
                    value={(selectedMilestone.completedItems / selectedMilestone.totalItems) * 100}
                    className={`h-2 ${
                      selectedMilestone.completed
                        ? "bg-muted/50 [&>*]:bg-green-500"
                        : "bg-muted/50 [&>*]:bg-blue-500"
                    }`}
                  />
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium mb-3">Topics</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {getMilestoneItems(selectedMilestone.id).map((item, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <Checkbox
                            id={`milestone-${selectedMilestone.id}-item-${i}`}
                            checked={item.completed}
                            onCheckedChange={(checked) => 
                              handleCompleteMilestoneItem(
                                selectedMilestone.id, 
                                i, 
                                checked as boolean
                              )
                            }
                          />
                          <label
                            htmlFor={`milestone-${selectedMilestone.id}-item-${i}`}
                            className={`text-sm ${item.completed ? "line-through text-muted-foreground" : ""}`}
                          >
                            {item.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Resources</h4>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-center gap-2">
                          <FileText className="h-3 w-3" /> Lecture Notes
                        </li>
                        <li className="flex items-center gap-2">
                          <BookOpen className="h-3 w-3" /> Recommended Reading
                        </li>
                        <li className="flex items-center gap-2">
                          <BarChart2 className="h-3 w-3" /> Practice Questions
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Related Content</h4>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-center gap-2">
                          <Users className="h-3 w-3" /> Study Groups
                        </li>
                        <li className="flex items-center gap-2">
                          <Lightbulb className="h-3 w-3" /> Mnemonics
                        </li>
                        <li className="flex items-center gap-2">
                          <Brain className="h-3 w-3" /> Conceptual Maps
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button onClick={() => setShowMilestoneDialog(false)}>Close</Button>
                </DialogFooter>
              </DialogContent>
            )}
          </Dialog>
        </TabsContent>
        
        <TabsContent value="goals" className="space-y-6">
          <Tabs 
            value={activeGoalsTab} 
            onValueChange={setActiveGoalsTab}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              
              <Dialog open={showGoalDialog} onOpenChange={setShowGoalDialog}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" /> New Goal
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Goal</DialogTitle>
                    <DialogDescription>
                      Set a new study goal to keep your progress on track.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <form className="space-y-4" onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const formData = new FormData(form);
                    const data = Object.fromEntries(formData.entries());
                    handleCreateGoal(data);
                  }}>
                    <div className="space-y-2">
                      <label htmlFor="title" className="text-sm font-medium">Goal Title</label>
                      <Input
                        id="title"
                        name="title"
                        placeholder="e.g., Master Neuroanatomy"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="description" className="text-sm font-medium">Description</label>
                      <textarea
                        id="description"
                        name="description"
                        placeholder="Describe your goal in detail"
                        className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="dueDate" className="text-sm font-medium">Due Date (Optional)</label>
                        <Input
                          id="dueDate"
                          name="dueDate"
                          type="date"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="priority" className="text-sm font-medium">Priority</label>
                        <select 
                          id="priority"
                          name="priority"
                          className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          defaultValue="Medium"
                        >
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="category" className="text-sm font-medium">Category</label>
                      <select 
                        id="category"
                        name="category"
                        className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        defaultValue="Subject Mastery"
                      >
                        <option value="Subject Mastery">Subject Mastery</option>
                        <option value="Content Creation">Content Creation</option>
                        <option value="Collaboration">Collaboration</option>
                        <option value="Regular Practice">Regular Practice</option>
                        <option value="Assessment">Assessment</option>
                      </select>
                    </div>
                    
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setShowGoalDialog(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Create Goal</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            
            <TabsContent value="active" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {goals.filter(g => g.progress < 100).map((goal) => (
                  <Card key={goal.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{goal.title}</CardTitle>
                        <Badge className={getPriorityColor(goal.priority)}>{goal.priority}</Badge>
                      </div>
                      <CardDescription>{goal.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{goal.progress}%</span>
                        </div>
                        <Progress
                          value={goal.progress}
                          className={`h-2 bg-muted/50 [&>*]:${getProgressColor(goal.progress)}`}
                        />
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-4 text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {goal.dueDate 
                            ? new Date(goal.dueDate).toLocaleDateString() 
                            : "No due date"}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <BookOpen className="h-3 w-3" />
                          {goal.category}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t bg-muted/50">
                      <div className="flex justify-between w-full">
                        <Button variant="ghost" size="sm">Update Progress</Button>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              {goals.filter(g => g.progress < 100).length === 0 && (
                <div className="text-center py-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                    <CheckCircle className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No active goals</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                    Set new study goals to track your progress and stay motivated.
                  </p>
                  <Button onClick={() => setShowGoalDialog(true)}>Create a Goal</Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="completed">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {goals.filter(g => g.progress >= 100).length === 0 ? (
                  <div className="text-center py-10 col-span-2">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                      <Award className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No completed goals yet</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                      Keep working towards your active goals. You'll see them here once completed.
                    </p>
                    <Button variant="outline" onClick={() => setActiveGoalsTab("active")}>
                      View Active Goals
                    </Button>
                  </div>
                ) : (
                  goals.filter(g => g.progress >= 100).map((goal) => (
                    <Card key={goal.id} className="overflow-hidden bg-muted/30">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{goal.title}</CardTitle>
                          <Badge variant="outline">Completed</Badge>
                        </div>
                        <CardDescription>{goal.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2 text-sm">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            Completed on {new Date().toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <BookOpen className="h-3 w-3" />
                            {goal.category}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </TabsContent>
        
        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <Card 
                key={achievement.id} 
                className={`overflow-hidden ${!achievement.unlocked ? "bg-muted/30" : ""}`}
              >
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto bg-muted/50 w-16 h-16 rounded-full flex items-center justify-center mb-2">
                    {achievement.icon}
                  </div>
                  <CardTitle className="text-center text-lg">{achievement.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    {achievement.description}
                  </p>
                  {achievement.unlocked ? (
                    <Badge variant="default" className="mx-auto">
                      Earned on {achievement.dateEarned}
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="flex items-center gap-1 mx-auto">
                      <Lock className="h-3 w-3" /> Locked
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Achievement Progress</CardTitle>
              <CardDescription>
                Track your milestones and unlock rewards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span>Total Achievements</span>
                    <span className="font-medium">{achievements.filter(a => a.unlocked).length}/{achievements.length}</span>
                  </div>
                  <Progress 
                    value={(achievements.filter(a => a.unlocked).length / achievements.length) * 100} 
                    className="h-2"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span>Flashcards Mastered</span>
                    <span className="font-medium">234/500</span>
                  </div>
                  <Progress value={234/500 * 100} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span>Study Streak</span>
                    <span className="font-medium">7 days</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
                
                <div className="pt-4">
                  <h3 className="font-medium mb-3">Next Achievements</h3>
                  <ul className="space-y-3">
                    {achievements
                      .filter(a => !a.unlocked)
                      .slice(0, 3)
                      .map((achievement) => (
                        <li key={achievement.id} className="flex items-center gap-3">
                          <div className="bg-muted w-8 h-8 rounded-full flex items-center justify-center">
                            {achievement.icon}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{achievement.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {achievement.description}
                            </p>
                          </div>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
