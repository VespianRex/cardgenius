import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Bell, Moon, Sun, Clock, Brain, Trophy } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

const Settings = () => {
  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">Settings</h1>

      <Card className="p-6 space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Study Preferences</h2>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              <span>Daily study goal</span>
            </div>
            <Slider defaultValue={[30]} max={120} step={5} className="w-[200px]" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Break reminder interval</span>
            </div>
            <Slider defaultValue={[25]} max={60} step={5} className="w-[200px]" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              <span>Show achievements</span>
            </div>
            <Switch defaultChecked />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Notifications</h2>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <span>Study reminders</span>
            </div>
            <Switch defaultChecked />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Display</h2>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4" />
              <span>Light mode</span>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4" />
              <span>Dark mode</span>
            </div>
            <Switch />
          </div>
        </div>

        <Button onClick={handleSave} className="w-full">Save Settings</Button>
      </Card>
    </div>
  );
};

export default Settings;