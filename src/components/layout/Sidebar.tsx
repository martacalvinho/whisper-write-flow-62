
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  FolderPlus, 
  Plus, 
  Folder,
  X,
  Star, 
  Users
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
  
  const folders = [
    { id: '1', name: 'ChatGPT', count: 12, shared: false },
    { id: '2', name: 'Claude', count: 8, shared: true },
    { id: '3', name: 'Gemini', count: 5, shared: false },
  ];

  return (
    <div className={cn(
      "fixed inset-y-0 left-0 z-30 w-48 flex flex-col bg-card border-r",
      "transform transition-transform duration-300 ease-in-out h-[600px]"
    )}>
      <div className="flex items-center justify-between p-2 border-b">
        <h2 className="text-sm font-medium">Folders</h2>
        <Button 
          variant="ghost" 
          size="icon"
          className="h-6 w-6" 
          onClick={() => setOpen(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-grow overflow-y-auto p-2 space-y-1">
        <Button 
          variant="ghost" 
          size="sm"
          className="w-full justify-start text-xs"
          onClick={() => navigate('/')}
        >
          <Folder className="mr-2 h-3 w-3" />
          All Prompts
        </Button>
        
        {folders.map((folder) => (
          <Button 
            key={folder.id}
            variant="ghost" 
            size="sm"
            className="w-full justify-start text-xs group"
            onClick={() => navigate(`/folder/${folder.id}`)}
          >
            <div className="flex-1 flex items-center">
              <Folder className="mr-2 h-3 w-3 text-muted-foreground" />
              <span className="truncate">{folder.name}</span>
              {folder.shared && (
                <Users className="ml-1 h-3 w-3 text-muted-foreground" />
              )}
            </div>
          </Button>
        ))}
      </div>

      <div className="p-2 border-t">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full justify-start text-xs" 
          onClick={() => navigate('/new-prompt')}
        >
          <Plus className="mr-2 h-3 w-3" />
          New Prompt
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
