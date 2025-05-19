
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { MainLayout } from "./components/layout/MainLayout";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Study from "./pages/Study";
import Help from "./pages/Help";
import Settings from "./pages/Settings";
import Library from "./pages/Library";
import Analytics from "./pages/Analytics";
import Roadmap from "./pages/Roadmap";
import NotFound from "./pages/NotFound";

function App() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <MainLayout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/study/*" element={<Study />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/help" element={<Help />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/library" element={<Library />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/roadmap" element={<Roadmap />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </MainLayout>
            <Toaster />
            <Sonner />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
