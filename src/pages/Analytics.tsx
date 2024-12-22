import { Routes, Route } from "react-router-dom";

const Analytics = () => {
  return (
    <Routes>
      <Route path="/" element={<div className="p-8"><h1 className="text-2xl font-bold">Analytics Dashboard</h1></div>} />
      <Route path="/overview" element={<div className="p-8"><h1 className="text-2xl font-bold">Analytics Overview</h1></div>} />
      <Route path="/detailed" element={<div className="p-8"><h1 className="text-2xl font-bold">Detailed Statistics</h1></div>} />
      <Route path="/export" element={<div className="p-8"><h1 className="text-2xl font-bold">Export Report</h1></div>} />
    </Routes>
  );
};

export default Analytics;