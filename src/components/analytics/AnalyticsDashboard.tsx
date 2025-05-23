
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
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-3xl font-bold text-gray-900">Learning Analytics</h2>
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search cards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
      </div>

      <SearchFilters />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <h3 className="text-lg font-semibold mb-4 text-blue-900">Daily Progress</h3>
          <div className="h-[280px]">
            <ProgressChart data={analyticsData.dailyProgress} />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <h3 className="text-lg font-semibold mb-4 text-green-900">Success Rate</h3>
          <div className="h-[280px]">
            <SuccessRateChart data={analyticsData.successRates} />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <h3 className="text-lg font-semibold mb-4 text-purple-900">Study Time</h3>
          <div className="h-[280px]">
            <StudyTimeChart data={analyticsData.studyTime} />
          </div>
        </Card>
      </div>

      <div className="w-full">
        <LearningPatterns data={analyticsData.dailyProgress} />
      </div>
      
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900">Achievements</h3>
        <AchievementSystem />
      </div>

      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900">Smart Card Organization</h3>
        <SmartCardOrganizer />
      </div>
    </div>
  );
};
