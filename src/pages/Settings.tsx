import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Bell, Moon, Volume2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { MainNavigation } from "@/components/layout/MainNavigation";
import { toast } from "sonner";

const Settings = () => {
  const handleSettingChange = (setting: string) => {
    toast.success(`${setting} setting updated`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <MainNavigation activeTab="settings" onTabChange={() => {}} />
        
        <div className="mt-8 space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Settings</h2>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Bell className="w-5 h-5" />
                  <div>
                    <h3 className="font-medium">Notifications</h3>
                    <p className="text-sm text-muted-foreground">Get notified about your study schedule</p>
                  </div>
                </div>
                <Switch onCheckedChange={() => handleSettingChange("Notifications")} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Moon className="w-5 h-5" />
                  <div>
                    <h3 className="font-medium">Dark Mode</h3>
                    <p className="text-sm text-muted-foreground">Toggle dark mode theme</p>
                  </div>
                </div>
                <Switch onCheckedChange={() => handleSettingChange("Dark Mode")} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <Volume2 className="w-5 h-5" />
                  <div>
                    <h3 className="font-medium">Sound Volume</h3>
                    <p className="text-sm text-muted-foreground">Adjust notification sound volume</p>
                  </div>
                </div>
                <Slider
                  defaultValue={[50]}
                  max={100}
                  step={1}
                  onValueChange={() => handleSettingChange("Volume")}
                />
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Settings;