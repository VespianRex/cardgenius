import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Bell, Moon, Sun, Clock, Brain } from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Study Preferences</h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="font-medium">Daily Study Goal</span>
              </div>
              <p className="text-sm text-muted-foreground">Set your daily study target</p>
            </div>
            <Slider 
              defaultValue={[30]} 
              max={120} 
              step={5}
              className="w-[200px]"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                <span className="font-medium">Smart Scheduling</span>
              </div>
              <p className="text-sm text-muted-foreground">Optimize study times based on your performance</p>
            </div>
            <Switch />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Notifications</h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                <span className="font-medium">Study Reminders</span>
              </div>
              <p className="text-sm text-muted-foreground">Get notified about due reviews</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                <span className="font-medium">Achievement Alerts</span>
              </div>
              <p className="text-sm text-muted-foreground">Notifications for unlocked achievements</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Display</h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4" />
                <span className="font-medium">Dark Mode</span>
              </div>
              <p className="text-sm text-muted-foreground">Toggle dark mode</p>
            </div>
            <Switch />
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
};

export default Settings;