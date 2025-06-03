
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ProgressChart } from "./ProgressChart";
import { SuccessRateChart } from "./SuccessRateChart";
import { StudyTimeChart } from "./StudyTimeChart";

interface AnalyticsOverviewProps {
  analyticsData: {
    dailyProgress: Array<{
      date: string;
      cardsReviewed: number;
      performance: number;
      studyDuration: number;
    }>;
    successRates: Array<{
      date: string;
      rate: number;
    }>;
    studyTime: Array<{
      date: string;
      minutes: number;
    }>;
  };
}

export const AnalyticsOverview = ({ analyticsData }: AnalyticsOverviewProps) => {
  const chartCards = [
    {
      title: "Daily Progress",
      component: <ProgressChart data={analyticsData.dailyProgress} />,
      gradient: "from-blue-50 to-indigo-50",
      border: "border-blue-200",
      textColor: "text-blue-900"
    },
    {
      title: "Success Rate",
      component: <SuccessRateChart data={analyticsData.successRates} />,
      gradient: "from-green-50 to-emerald-50",
      border: "border-green-200",
      textColor: "text-green-900"
    },
    {
      title: "Study Time",
      component: <StudyTimeChart data={analyticsData.studyTime} />,
      gradient: "from-purple-50 to-violet-50",
      border: "border-purple-200",
      textColor: "text-purple-900"
    }
  ];

  return (
    <div className="w-full">
      {/* Desktop: Grid Layout for larger screens */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-6">
        {chartCards.map((card, index) => (
          <Card
            key={index}
            className={`p-6 bg-gradient-to-br ${card.gradient} ${card.border} shadow-sm hover:shadow-md transition-shadow`}
          >
            <h3 className={`text-lg font-semibold mb-4 ${card.textColor}`}>
              {card.title}
            </h3>
            <div className="w-full h-64 xl:h-80">
              {card.component}
            </div>
          </Card>
        ))}
      </div>

      {/* Tablet: 2-column grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:hidden gap-4">
        {chartCards.map((card, index) => (
          <Card
            key={index}
            className={`p-4 bg-gradient-to-br ${card.gradient} ${card.border} shadow-sm hover:shadow-md transition-shadow ${
              index === 2 ? 'md:col-span-2' : ''
            }`}
          >
            <h3 className={`text-base font-semibold mb-3 ${card.textColor}`}>
              {card.title}
            </h3>
            <div className={`w-full ${index === 2 ? 'h-48' : 'h-56'}`}>
              {card.component}
            </div>
          </Card>
        ))}
      </div>

      {/* Mobile: Carousel */}
      <div className="md:hidden">
        <Carousel className="w-full" opts={{ align: "start", loop: false }}>
          <CarouselContent className="-ml-2">
            {chartCards.map((card, index) => (
              <CarouselItem key={index} className="pl-2 basis-full">
                <Card
                  className={`p-4 bg-gradient-to-br ${card.gradient} ${card.border} shadow-sm hover:shadow-md transition-shadow h-[300px]`}
                >
                  <h3 className={`text-base font-semibold mb-3 ${card.textColor}`}>
                    {card.title}
                  </h3>
                  <div className="w-full h-[240px]">
                    {card.component}
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex -left-12" />
          <CarouselNext className="hidden sm:flex -right-12" />
        </Carousel>
      </div>
    </div>
  );
};
