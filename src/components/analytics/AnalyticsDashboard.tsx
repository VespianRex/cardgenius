import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ProgressChart } from "./ProgressChart";
import { SuccessRateChart } from "./SuccessRateChart";
import { StudyTimeChart } from "./StudyTimeChart";
import { SearchFilters } from "./SearchFilters";
import { LearningPatterns } from "./LearningPatterns";
import { AchievementSystem } from "../achievements/AchievementSystem";
import { SmartCardOrganizer } from "../cards/SmartCardOrganizer";

export const AnalyticsDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Demo data - in a real app, this would come from your backend
  const analyticsData = {
    dailyProgress: [
      { date: "2024-01-01", cardsReviewed: 25, performance: 85, studyDuration: 45 },
      { date: "2024-01-02", cardsReviewed: 30, performance: 88, studyDuration: 50 },
      { date: "2024-01-03", cardsReviewed: 28, performance: 82, studyDuration: 40 },
      { date: "2024-01-04", cardsReviewed: 35, performance: 90, studyDuration: 60 },
      { date: "2024-01-05", cardsReviewed: 40, performance: 92, studyDuration: 55 },
    ],
    successRates: [
      { date: "2024-01-01", rate: 85 },
      { date: "2024-01-02", rate: 88 },
      { date: "2024-01-03", rate: 82 },
      { date: "2024-01-04", rate: 90 },
      { date: "2024-01-05", rate: 92 },
    ],
    studyTime: [
      { date: "2024-01-01", minutes: 45 },
      { date: "2024-01-02", minutes: 50 },
      { date: "2024-01-03", minutes: 40 },
      { date: "2024-01-04", minutes: 60 },
      { date: "2024-01-05", minutes: 55 },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Learning Analytics</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search cards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-[300px]"
          />
        </div>
      </div>

      <SearchFilters />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Daily Progress</h3>
          <ProgressChart data={analyticsData.dailyProgress} />
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Success Rate</h3>
          <SuccessRateChart data={analyticsData.successRates} />
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Study Time</h3>
          <StudyTimeChart data={analyticsData.studyTime} />
        </Card>
      </div>

      <LearningPatterns data={analyticsData.dailyProgress} />
      
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Achievements</h3>
        <AchievementSystem />
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Smart Card Organization</h3>
        <SmartCardOrganizer />
      </div>
    </div>
  );
};