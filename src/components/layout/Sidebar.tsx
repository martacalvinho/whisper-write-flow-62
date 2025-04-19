
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  FolderPlus, 
  Plus, 
  Folder, 
  Search,
  PanelLeft, 
  Star, 
  Users, 
  Settings,
  ChevronRight
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Mock folders - these would come from state or API in a real implementation
  const folders = [
    { id: '1', name: 'ChatGPT Templates', count: 12, shared: false },
    { id: '2', name: 'Claude Prompts', count: 8, shared: true },
    { id: '3', name: 'Gemini Workflows', count: 5, shared: false },
    { id: '4', name: 'Marketing', count: 10, shared: true },
    { id: '5', name: 'Code Generation', count: 15, shared: false },
  ];

  const createNewFolder = () => {
    // Would trigger a modal in full implementation
    toast({
      title: "Create New Folder",
      description: "This would open a modal to create a new folder",
    });
  };

  const createNewPrompt = () => {
    // Would trigger a modal in full implementation
    navigate('/new-prompt');
  };

  return (
    <div className={cn(
      "fixed inset-y-0 left-0 z-30 w-64 flex flex-col bg-card border-r",
      "transform transition-transform duration-300 ease-in-out",
      open ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="flex-shrink-0 h-16 flex items-center justify-between px-4 border-b">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
            <PanelLeft className="h-4 w-4 text-primary" />
          </div>
          <h1 className="text-lg font-semibold">Prompt Library</h1>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden" 
          onClick={() => setOpen(false)}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-grow flex flex-col overflow-y-auto py-2 px-3 space-y-2">
        {/* Quick action buttons */}
        <div className="flex space-x-2 p-1">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 justify-start" 
            onClick={createNewFolder}
          >
            <FolderPlus className="mr-2 h-4 w-4" />
            New Folder
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className="flex-1 justify-start" 
            onClick={createNewPrompt}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Prompt
          </Button>
        </div>

        {/* Navigation links */}
        <div className="space-y-1 pt-2">
          <Button 
            variant="ghost" 
            className="w-full justify-start font-normal"
            onClick={() => navigate('/')}
          >
            <Folder className="mr-2 h-4 w-4" />
            All Prompts
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start font-normal"
            onClick={() => navigate('/favorites')}
          >
            <Star className="mr-2 h-4 w-4" />
            Favorites
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start font-normal"
            onClick={() => navigate('/shared')}
          >
            <Users className="mr-2 h-4 w-4" />
            Shared with me
          </Button>
        </div>

        <div className="pt-2 pb-1">
          <p className="text-xs font-medium text-muted-foreground px-3 py-1">FOLDERS</p>
        </div>

        {/* Folder list */}
        <div className="space-y-1">
          {folders.map((folder) => (
            <Button 
              key={folder.id}
              variant="ghost" 
              className="w-full justify-start font-normal group"
              onClick={() => navigate(`/folder/${folder.id}`)}
            >
              <div className="flex-1 flex items-center">
                <Folder className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="truncate">{folder.name}</span>
                {folder.shared && (
                  <Users className="ml-2 h-3 w-3 text-muted-foreground" />
                )}
              </div>
              <span className="text-xs text-muted-foreground">{folder.count}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Footer controls */}
      <div className="border-t p-3 flex justify-between">
        <Button variant="ghost" size="sm" onClick={() => navigate('/settings')}>
          <Settings className="h-4 w-4 mr-1" />
          Settings
        </Button>
        <Button variant="ghost" size="sm" onClick={() => navigate('/search')}>
          <Search className="h-4 w-4 mr-1" />
          Search
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
