
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
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
    <div className="w-full min-h-screen bg-gray-50/30 p-4 md:p-6">
      <div className="max-w-[1400px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Learning Analytics</h2>
          <div className="relative w-full md:w-80">
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

        {/* Charts Carousel */}
        <div className="w-full">
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-sm hover:shadow-md transition-shadow h-full">
                  <h3 className="text-lg font-semibold mb-4 text-blue-900">Daily Progress</h3>
                  <div className="w-full h-64">
                    <ProgressChart data={analyticsData.dailyProgress} />
                  </div>
                </Card>
              </CarouselItem>
              
              <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-sm hover:shadow-md transition-shadow h-full">
                  <h3 className="text-lg font-semibold mb-4 text-green-900">Success Rate</h3>
                  <div className="w-full h-64">
                    <SuccessRateChart data={analyticsData.successRates} />
                  </div>
                </Card>
              </CarouselItem>
              
              <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 shadow-sm hover:shadow-md transition-shadow h-full">
                  <h3 className="text-lg font-semibold mb-4 text-purple-900">Study Time</h3>
                  <div className="w-full h-64">
                    <StudyTimeChart data={analyticsData.studyTime} />
                  </div>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>

        {/* Learning Patterns */}
        <div className="w-full">
          <LearningPatterns data={analyticsData.dailyProgress} />
        </div>
        
        {/* Achievements Section */}
        <div className="space-y-4 md:space-y-6">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900">Achievements</h3>
          <AchievementSystem />
        </div>

        {/* Smart Card Organization */}
        <div className="space-y-4 md:space-y-6">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900">Smart Card Organization</h3>
          <SmartCardOrganizer />
        </div>
      </div>
    </div>
  );
};
