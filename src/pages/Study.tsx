import { Routes, Route } from "react-router-dom";

const Study = () => {
  return (
    <Routes>
      <Route path="/" element={<div className="p-8"><h1 className="text-2xl font-bold">Study Dashboard</h1></div>} />
      <Route path="/new" element={<div className="p-8"><h1 className="text-2xl font-bold">New Study Session</h1></div>} />
      <Route path="/review" element={<div className="p-8"><h1 className="text-2xl font-bold">Review Due Cards</h1></div>} />
      <Route path="/stats" element={<div className="p-8"><h1 className="text-2xl font-bold">Study Statistics</h1></div>} />
    </Routes>
  );
};

export default Study;