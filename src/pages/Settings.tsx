import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Volume2, Bell, Moon, Keyboard, Brain, Download } from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [settings, setSettings] = useState({
    spacedRepetition: true,
    keyboardShortcuts: true,
    studyReminders: true,
    soundEffects: true
  });

  // Only show the settings after mounting to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem('studySettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSettingChange = (setting: keyof typeof settings) => {
    setSettings(prev => {
      const newSettings = { ...prev, [setting]: !prev[setting] };
      // Save to localStorage
      localStorage.setItem('studySettings', JSON.stringify(newSettings));
      // Show toast notification
      toast.success(`${setting} ${newSettings[setting] ? 'enabled' : 'disabled'}`);
      return newSettings;
    });
  };

  const handleSave = () => {
    localStorage.setItem('studySettings', JSON.stringify(settings));
    toast.success("Settings saved successfully!");
  };

  if (!mounted) return null;

  return (
    <div className="space-y-8 animate-fade-in p-4 md:p-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Customize your study experience
        </p>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Study Preferences</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-medical-primary" />
                  <label className="text-sm font-medium">Spaced Repetition</label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Optimize review intervals based on your performance
                </p>
              </div>
              <Switch 
                checked={settings.spacedRepetition}
                onCheckedChange={() => handleSettingChange('spacedRepetition')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Keyboard className="w-4 h-4 text-medical-primary" />
                  <label className="text-sm font-medium">Keyboard Shortcuts</label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Enable keyboard navigation and controls
                </p>
              </div>
              <Switch 
                checked={settings.keyboardShortcuts}
                onCheckedChange={() => handleSettingChange('keyboardShortcuts')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Moon className="w-4 h-4 text-medical-primary" />
                  <label className="text-sm font-medium">Dark Mode</label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Switch between light and dark themes
                </p>
              </div>
              <Switch 
                checked={theme === 'dark'}
                onCheckedChange={(checked) => {
                  setTheme(checked ? 'dark' : 'light');
                  toast.success(`${checked ? 'Dark' : 'Light'} mode enabled`);
                }}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-medical-secondary" />
                  <label className="text-sm font-medium">Study Reminders</label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Get notifications for scheduled study sessions
                </p>
              </div>
              <Switch 
                checked={settings.studyReminders}
                onCheckedChange={() => handleSettingChange('studyReminders')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-medical-secondary" />
                  <label className="text-sm font-medium">Sound Effects</label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Play sounds for card flips and actions
                </p>
              </div>
              <Switch 
                checked={settings.soundEffects}
                onCheckedChange={() => handleSettingChange('soundEffects')}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Data Management</h2>
          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              <Download className="w-4 h-4 mr-2" />
              Export Study Data
            </Button>
            <Button 
              variant="destructive" 
              className="w-full justify-start"
              onClick={() => {
                localStorage.clear();
                toast.success("All data has been reset");
                setSettings({
                  spacedRepetition: true,
                  keyboardShortcuts: true,
                  studyReminders: true,
                  soundEffects: true
                });
              }}
            >
              Reset Progress
            </Button>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;