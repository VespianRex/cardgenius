import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Settings, BookOpen } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { MainNavigation } from "@/components/layout/MainNavigation";

const Profile = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <MainNavigation activeTab="profile" onTabChange={() => {}} />
        
        <div className="mt-8 space-y-6">
          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">User Profile</h2>
                <p className="text-muted-foreground">Manage your account settings and preferences</p>
              </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <Card className="p-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Study Statistics
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Cards studied: 150<br />
                  Study streak: 5 days<br />
                  Average accuracy: 85%
                </p>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Preferences
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Daily goal: 20 cards<br />
                  Preferred study time: Evening<br />
                  Notifications: Enabled
                </p>
              </Card>
            </div>

            <div className="mt-6">
              <Button>Edit Profile</Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;