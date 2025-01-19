import { Routes, Route } from "react-router-dom";
import { AnalyticsDashboard } from "@/components/analytics/AnalyticsDashboard";

const Analytics = () => {
  return (
    <Routes>
      <Route path="/" element={<AnalyticsDashboard />} />
      <Route path="/overview" element={<AnalyticsDashboard />} />
      <Route path="/detailed" element={<div className="p-8">Detailed analytics coming soon</div>} />
      <Route path="/export" element={<div className="p-8">Export analytics coming soon</div>} />
    </Routes>
  );
};

export default Analytics;