import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NewPrompt from "./pages/NewPrompt";
import FolderView from "./pages/FolderView";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import { PromptDetailProvider } from "./hooks/usePromptDetailModal";
import PromptDetailModal from "./components/PromptDetailModal";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <PromptDetailProvider>
        <div className="w-[400px] h-[600px] overflow-hidden">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/new-prompt" element={<NewPrompt />} />
              <Route path="/folder/:folderId" element={<FolderView />} />
              <Route path="/search" element={<Search />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <PromptDetailModal />
        </div>
      </PromptDetailProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
