import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { StudyModeSelector } from "@/components/StudyModeSelector";
import { FlashcardSection } from "@/components/FlashcardSection";
import { StudyProgress } from "@/components/StudyProgress";
import { StudyTimer } from "@/components/StudyTimer";
import { toast } from "sonner";

const StudyDashboard = () => {
  const [studyMode, setStudyMode] = useState<'regular' | 'cram' | 'review' | 'scheduled'>('regular');
  
  const demoFlashcards = [
    { front: "What is the primary function of hemoglobin?", back: "To transport oxygen throughout the body" },
    { front: "Name the four chambers of the heart", back: "Right atrium, left atrium, right ventricle, left ventricle" },
    { front: "Define homeostasis", back: "The maintenance of a stable internal environment" }
  ];

  const handleModeSelect = (mode: 'regular' | 'cram' | 'review' | 'scheduled') => {
    setStudyMode(mode);
    toast.success(`Started ${mode} study mode`);
  };

  const handleBreakStart = () => {
    toast.info("Time for a break! Take 5 minutes to rest.");
  };

  const handleBreakEnd = () => {
    toast.success("Break time's over! Let's continue learning!");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <StudyModeSelector onSelectMode={handleModeSelect} />
      <StudyTimer onBreakStart={handleBreakStart} onBreakEnd={handleBreakEnd} />
      <StudyProgress 
        totalCards={10} 
        cardsReviewed={3} 
        ratings={{ easy: 2, medium: 1, hard: 0 }}
        startTime={new Date()}
        streak={5}
      />
      <FlashcardSection flashcards={demoFlashcards} />
    </div>
  );
};

const NewSession = () => (
  <div className="max-w-5xl mx-auto p-6">
    <h1 className="text-2xl font-bold mb-6">New Study Session</h1>
    <StudyModeSelector onSelectMode={(mode) => toast.success(`Started ${mode} mode`)} />
  </div>
);

const ReviewDue = () => (
  <div className="max-w-5xl mx-auto p-6">
    <h1 className="text-2xl font-bold mb-6">Review Due Cards</h1>
    <FlashcardSection flashcards={[
      { front: "What is the function of insulin?", back: "Regulates blood glucose levels" },
      { front: "List the major components of the nervous system", back: "Central and Peripheral Nervous System" }
    ]} />
  </div>
);

const StudyStats = () => (
  <div className="max-w-5xl mx-auto p-6">
    <h1 className="text-2xl font-bold mb-6">Study Statistics</h1>
    <StudyProgress 
      totalCards={50} 
      cardsReviewed={35} 
      ratings={{ easy: 20, medium: 10, hard: 5 }}
      startTime={new Date()}
      streak={7}
    />
  </div>
);

const Study = () => {
  return (
    <Routes>
      <Route path="/" element={<StudyDashboard />} />
      <Route path="/new" element={<NewSession />} />
      <Route path="/review" element={<ReviewDue />} />
      <Route path="/stats" element={<StudyStats />} />
    </Routes>
  );
};

export default Study;