
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  PanelLeft, 
  Search, 
  X, 
  MoreHorizontal,
  PlusCircle,
  Share2,
  BookmarkPlus,
  Upload,
  Settings,
  Command,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/components/ui/use-toast';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Get current page title based on route
  const getTitle = () => {
    if (location.pathname === '/') return 'All Prompts';
    if (location.pathname === '/favorites') return 'Favorites';
    if (location.pathname === '/shared') return 'Shared with me';
    if (location.pathname === '/settings') return 'Settings';
    if (location.pathname === '/new-prompt') return 'New Prompt';
    if (location.pathname.startsWith('/folder/')) {
      // In a real app, fetch the folder name based on ID
      return 'Folder';
    }
    return 'Prompt Library';
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="flex-shrink-0 h-16 flex items-center px-4 border-b bg-card/70 backdrop-blur-sm">
      <div className="flex flex-1 items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="mr-2"
        >
          <PanelLeft className="h-5 w-5" />
        </Button>
        
        {searchActive ? (
          <form onSubmit={handleSearch} className="flex-1 flex">
            <div className="relative flex-1 mr-2 flex items-center">
              <Search className="h-4 w-4 absolute left-3 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search prompts, folders, or tags..."
                className="pl-9 pr-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              {searchQuery && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  type="button"
                  className="absolute right-1 h-7 w-7" 
                  onClick={() => setSearchQuery('')}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              type="button"
              onClick={() => setSearchActive(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </form>
        ) : (
          <>
            <h1 className="text-lg font-medium">{getTitle()}</h1>
            {location.pathname.startsWith('/folder/') && (
              <Badge variant="outline" className="ml-2">Shared</Badge>
            )}
          </>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        {!searchActive && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setSearchActive(true)}
          >
            <Search className="h-5 w-5" />
          </Button>
        )}
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => {
            toast({
              title: "Keyboard shortcut",
              description: "Press ⌘+Shift+P to open the command palette",
            });
          }}
          className="hidden md:flex"
        >
          <Command className="h-5 w-5" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigate('/new-prompt')}>
              <PlusCircle className="mr-2 h-4 w-4" />
              <span>New Prompt</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast({ title: "Shared", description: "Coming soon: Share your prompts with teammates" })}>
              <Share2 className="mr-2 h-4 w-4" />
              <span>Share Prompt</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast({ title: "Added to favorites" })}>
              <BookmarkPlus className="mr-2 h-4 w-4" />
              <span>Add to Favorites</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast({ title: "Import", description: "Coming soon: Import prompts from file" })}>
              <Upload className="mr-2 h-4 w-4" />
              <span>Import Prompts</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/settings')}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
