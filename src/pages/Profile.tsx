import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Trophy, Brain, Clock, Star, Calendar } from "lucide-react";
import { AchievementSystem } from "@/components/achievements/AchievementSystem";

const Profile = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex items-center gap-6">
        <Avatar className="w-24 h-24">
          <div className="w-24 h-24 rounded-full bg-medical-primary/10 flex items-center justify-center">
            <Brain className="w-12 h-12 text-medical-primary" />
          </div>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">Medical Student</h1>
          <p className="text-muted-foreground">Joined January 2024</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Trophy className="w-5 h-5 text-medical-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Total Score</p>
              <p className="text-xl font-bold">2,450</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-medical-secondary" />
            <div>
              <p className="text-sm text-muted-foreground">Study Time</p>
              <p className="text-xl font-bold">48h</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-medical-accent" />
            <div>
              <p className="text-sm text-muted-foreground">Study Streak</p>
              <p className="text-xl font-bold">7 days</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Study Progress</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span>Anatomy</span>
              <span>75%</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span>Physiology</span>
              <span>60%</span>
            </div>
            <Progress value={60} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span>Pathology</span>
              <span>45%</span>
            </div>
            <Progress value={45} className="h-2" />
          </div>
        </div>
      </Card>

      <div>
        <h2 className="text-xl font-semibold mb-4">Achievements</h2>
        <AchievementSystem />
      </div>
    </div>
  );
};

export default Profile;