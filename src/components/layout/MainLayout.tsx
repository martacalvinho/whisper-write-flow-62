
import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import Sidebar from './Sidebar';
import Header from './Header';
import { cn } from '@/lib/utils';
import { CommandPalette } from '../CommandPalette';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  
  // Toggle command palette with Cmd+Shift+P
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.shiftKey && e.key === 'p') {
        e.preventDefault();
        setShowCommandPalette(prev => !prev);
      }
      
      // Close command palette with Escape
      if (e.key === 'Escape' && showCommandPalette) {
        setShowCommandPalette(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showCommandPalette]);
  
  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className={cn(
        "flex flex-col flex-1 w-0 overflow-hidden transition-all duration-300",
        sidebarOpen ? "ml-64" : "ml-0"
      )}>
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 relative overflow-y-auto focus:outline-none p-4">
          <div className="py-3">
            {children}
          </div>
        </main>
      </div>
      
      {showCommandPalette && (
        <CommandPalette onClose={() => setShowCommandPalette(false)} />
      )}
      
      <Toaster />
    </div>
  );
};

export default MainLayout;
