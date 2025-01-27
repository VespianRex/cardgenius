import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, Target, Clock, Brain, Star } from "lucide-react";
import { AchievementSystem } from "@/components/achievements/AchievementSystem";

const Profile = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Your Profile</h1>
        <p className="text-muted-foreground">
          Track your progress and achievements
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-medical-primary/10 flex items-center justify-center">
              <Brain className="w-8 h-8 text-medical-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Medical Student</h2>
              <p className="text-muted-foreground">Level 5</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Experience</span>
                <span className="text-sm font-medium">2500/5000</span>
              </div>
              <Progress value={50} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground">Study Streak</span>
                <p className="text-2xl font-bold">7 days</p>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground">Cards Reviewed</span>
                <p className="text-2xl font-bold">1,234</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-medical-primary/10 rounded-lg">
                <Clock className="w-5 h-5 text-medical-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Study Time</p>
                <p className="font-medium">48.5 hours</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-medical-secondary/10 rounded-lg">
                <Target className="w-5 h-5 text-medical-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Accuracy Rate</p>
                <p className="font-medium">85%</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-medical-accent/10 rounded-lg">
                <Star className="w-5 h-5 text-medical-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Perfect Sessions</p>
                <p className="font-medium">24</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <AchievementSystem />
    </div>
  );
};

export default Profile;