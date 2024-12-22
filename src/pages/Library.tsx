import { Routes, Route } from "react-router-dom";

const Library = () => {
  return (
    <Routes>
      <Route path="/" element={<div className="p-8"><h1 className="text-2xl font-bold">Library Dashboard</h1></div>} />
      <Route path="/decks" element={<div className="p-8"><h1 className="text-2xl font-bold">All Decks</h1></div>} />
      <Route path="/categories" element={<div className="p-8"><h1 className="text-2xl font-bold">Categories</h1></div>} />
      <Route path="/import" element={<div className="p-8"><h1 className="text-2xl font-bold">Import Deck</h1></div>} />
      <Route path="/export" element={<div className="p-8"><h1 className="text-2xl font-bold">Export Deck</h1></div>} />
    </Routes>
  );
};

export default Library;