
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  
  return (
    <header className="flex-shrink-0 h-9 flex items-center px-2 border-b bg-card/70 backdrop-blur-sm">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleSidebar}
        className="h-6 w-6"
      >
        <Menu className="h-3.5 w-3.5" />
      </Button>
      
      <div className="flex-1 ml-2">
        <h1 className="text-sm font-medium">AI Prompts</h1>
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6"
        onClick={() => navigate('/new-prompt')}
      >
        <Plus className="h-3.5 w-3.5" />
      </Button>
    </header>
  );
};

export default Header;
