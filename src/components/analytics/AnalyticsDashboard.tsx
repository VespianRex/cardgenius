
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { SearchFilters } from "./SearchFilters";
import { AnalyticsOverview } from "./AnalyticsOverview";
import { AnalyticsLearningPatterns } from "./AnalyticsLearningPatterns";
import { AnalyticsAchievements } from "./AnalyticsAchievements";
import { AnalyticsSmartOrganization } from "./AnalyticsSmartOrganization";

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
    <div className="w-full space-y-6 md:space-y-8">
      {/* Header */}
      <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:items-center md:justify-between">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Learning Analytics</h2>
        <div className="relative w-full md:w-64">
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

      {/* Filters */}
      <SearchFilters />

      {/* Main Analytics Overview */}
      <AnalyticsOverview analyticsData={analyticsData} />

      {/* Learning Patterns - Full Width */}
      <AnalyticsLearningPatterns data={analyticsData.dailyProgress} />
      
      {/* Bottom Sections - Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <AnalyticsAchievements />
        <AnalyticsSmartOrganization />
      </div>
    </div>
  );
};
