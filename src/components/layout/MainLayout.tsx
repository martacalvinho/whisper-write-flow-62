
import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import Sidebar from './Sidebar';
import Header from './Header';
import { CommandPalette } from '../CommandPalette';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    <div className="flex h-[600px] w-[400px] overflow-hidden bg-background text-foreground">
      {sidebarOpen && (
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      )}
      
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="px-2 py-1">
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
