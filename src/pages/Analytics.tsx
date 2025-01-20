import { Routes, Route } from "react-router-dom";
import { AnalyticsDashboard } from "@/components/analytics/AnalyticsDashboard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, Brain, Clock, Target } from "lucide-react";
import { toast } from "sonner";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { Meteors } from "@/components/ui/meteors";
import { AnimatedCircularProgressBar } from "@/components/ui/animated-circular-progress-bar";

const features = [
  {
    Icon: Brain,
    name: "Study Progress",
    description: "Track your learning journey with detailed analytics.",
    href: "/analytics/detailed",
    cta: "View Progress",
    className: "lg:col-span-2",
  },
  {
    Icon: Clock,
    name: "Study Time",
    description: "Monitor your study duration and patterns.",
    href: "/analytics/detailed",
    cta: "View Time",
    className: "lg:col-span-1",
  },
  {
    Icon: Target,
    name: "Goals",
    description: "Set and track your study goals.",
    href: "/analytics/detailed",
    cta: "View Goals",
    className: "lg:col-span-1",
  },
];

const DetailedAnalytics = () => {
  return (
    <div className="p-8 space-y-6 relative">
      <Meteors number={20} />
      <h2 className="text-2xl font-bold">Detailed Analytics</h2>
      <BentoGrid className="lg:grid-cols-2">
        {features.map((feature) => (
          <BentoCard key={feature.name} {...feature} background={null} />
        ))}
      </BentoGrid>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card className="p-6 relative overflow-hidden">
          <h3 className="text-lg font-semibold mb-4">Learning Progress</h3>
          <AnimatedCircularProgressBar
            max={100}
            min={0}
            value={75}
            gaugePrimaryColor="rgb(44, 82, 130)"
            gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
          />
          <Meteors number={10} />
        </Card>
        
        <Card className="p-6 relative overflow-hidden">
          <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
          <AnimatedCircularProgressBar
            max={100}
            min={0}
            value={88}
            gaugePrimaryColor="rgb(66, 153, 225)"
            gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
          />
          <Meteors number={10} />
        </Card>
      </div>
    </div>
  );
};

const ExportAnalytics = () => {
  const handleExport = () => {
    toast.success("Analytics report exported successfully!");
  };

  return (
    <div className="p-8 space-y-6">
      <h2 className="text-2xl font-bold">Export Analytics</h2>
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Generate Report</h3>
            <p className="text-muted-foreground">Export your study analytics in various formats.</p>
          </div>
          <Button onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </Card>
    </div>
  );
};

const Analytics = () => {
  return (
    <Routes>
      <Route path="/" element={<AnalyticsDashboard />} />
      <Route path="/overview" element={<AnalyticsDashboard />} />
      <Route path="/detailed" element={<DetailedAnalytics />} />
      <Route path="/export" element={<ExportAnalytics />} />
    </Routes>
  );
};

export default Analytics;