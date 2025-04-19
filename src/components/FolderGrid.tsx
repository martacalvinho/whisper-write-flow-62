
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Folder, 
  MoreHorizontal, 
  Users, 
  FolderPlus,
  PencilLine,
  Trash2,
  Share2,
  Lock
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface Folder {
  id: string;
  name: string;
  description?: string;
  count: number;
  shared: boolean;
}

interface FolderGridProps {
  folders: Folder[];
}

const FolderGrid: React.FC<FolderGridProps> = ({ folders }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  return (
    <div className="folder-grid animate-slide-up">
      <div 
        className="folder-card border-dashed flex flex-col items-center justify-center gap-2 hover:bg-accent/50 hover:border-primary/30"
        onClick={() => {
          toast({
            title: "Create New Folder",
            description: "This would open a folder creation dialog",
          });
        }}
      >
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <FolderPlus className="h-6 w-6 text-primary" />
        </div>
        <span className="text-sm font-medium">Create Folder</span>
      </div>
      
      {folders.map((folder) => (
        <div 
          key={folder.id}
          className="folder-card group relative"
        >
          <div 
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => e.stopPropagation()}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => toast({ title: "Rename", description: "Rename folder dialog would open" })}>
                  <PencilLine className="mr-2 h-4 w-4" />
                  <span>Rename</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast({ title: "Share", description: "Share folder dialog would open" })}>
                  <Share2 className="mr-2 h-4 w-4" />
                  <span>Share</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => 
                  toast({ 
                    title: folder.shared ? "Made Private" : "Made Shared", 
                    description: folder.shared ? "Folder is now private" : "Folder is now shared with team" 
                  })
                }>
                  {folder.shared ? 
                    <><Lock className="mr-2 h-4 w-4" /><span>Make Private</span></> : 
                    <><Users className="mr-2 h-4 w-4" /><span>Make Shared</span></>
                  }
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => toast({ 
                    title: "Delete Folder", 
                    description: "Are you sure? This would show a confirmation dialog.",
                    variant: "destructive"
                  })}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div 
            className="flex flex-col h-full"
            onClick={() => navigate(`/folder/${folder.id}`)}
          >
            <div className="mb-2 flex items-center">
              <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mr-3">
                <Folder className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-sm truncate">{folder.name}</h3>
                <p className="text-xs text-muted-foreground">{folder.count} prompts</p>
              </div>
            </div>
            
            {folder.description && (
              <p className="text-xs text-muted-foreground truncate mt-1">{folder.description}</p>
            )}
            
            <div className="mt-auto pt-2 flex justify-between items-center">
              <div className="text-xs rounded-full px-2 py-0.5 bg-secondary">
                {folder.shared ? (
                  <div className="flex items-center">
                    <Users className="h-3 w-3 mr-1 text-primary" />
                    <span>Shared</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Lock className="h-3 w-3 mr-1" />
                    <span>Private</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FolderGrid;
