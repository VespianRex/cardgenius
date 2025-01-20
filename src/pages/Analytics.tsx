import { Routes, Route } from "react-router-dom";
import { AnalyticsDashboard } from "@/components/analytics/AnalyticsDashboard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp } from "lucide-react";
import { toast } from "sonner";

const DetailedAnalytics = () => {
  return (
    <div className="p-8 space-y-6">
      <h2 className="text-2xl font-bold">Detailed Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Learning Patterns</h3>
          <p className="text-muted-foreground">Detailed analysis of your study habits and performance trends.</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
          <p className="text-muted-foreground">In-depth look at your success rates and areas for improvement.</p>
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