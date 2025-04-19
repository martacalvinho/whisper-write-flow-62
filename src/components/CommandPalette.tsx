
import React, { useState, useEffect, useRef } from 'react';
import { Command, Search, Folder, FileText, Star, Tags, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface CommandItem {
  id: string;
  type: 'prompt' | 'folder' | 'action';
  title: string;
  description?: string;
  tags?: string[];
  icon?: React.ReactNode;
  action?: () => void;
}

interface CommandPaletteProps {
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ onClose }) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  // In a real implementation, this would fetch from an API or state
  const items: CommandItem[] = [
    // Prompts
    {
      id: 'p1',
      type: 'prompt',
      title: 'Blog Post Outline Generator',
      description: 'Create a detailed outline for a blog post on {{topic}}',
      tags: ['content', 'writing', 'blog'],
      icon: <FileText className="h-4 w-4 text-blue-500" />,
      action: () => navigate('/prompt/p1')
    },
    {
      id: 'p2',
      type: 'prompt',
      title: 'Code Refactoring Assistant',
      description: 'Help refactor {{language}} code for better performance',
      tags: ['development', 'coding'],
      icon: <FileText className="h-4 w-4 text-green-500" />,
      action: () => navigate('/prompt/p2')
    },
    
    // Folders
    {
      id: 'f1',
      type: 'folder',
      title: 'ChatGPT Templates',
      icon: <Folder className="h-4 w-4 text-amber-500" />,
      action: () => navigate('/folder/1')
    },
    {
      id: 'f2',
      type: 'folder',
      title: 'Claude Prompts',
      icon: <Folder className="h-4 w-4 text-violet-500" />,
      action: () => navigate('/folder/2')
    },
    
    // Actions
    {
      id: 'a1',
      type: 'action',
      title: 'Create New Prompt',
      icon: <FileText className="h-4 w-4 text-primary" />,
      action: () => navigate('/new-prompt')
    },
    {
      id: 'a2',
      type: 'action',
      title: 'Create New Folder',
      icon: <Folder className="h-4 w-4 text-primary" />,
      action: () => navigate('/new-folder')
    },
    {
      id: 'a3',
      type: 'action',
      title: 'View Favorites',
      icon: <Star className="h-4 w-4 text-yellow-500" />,
      action: () => navigate('/favorites')
    },
    {
      id: 'a4',
      type: 'action',
      title: 'Browse Tags',
      icon: <Tags className="h-4 w-4 text-blue-500" />,
      action: () => navigate('/tags')
    }
  ];
  
  // Filter based on search
  const filteredItems = items.filter(item => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    
    return (
      item.title.toLowerCase().includes(searchLower) ||
      (item.description?.toLowerCase().includes(searchLower)) ||
      (item.tags?.some(tag => tag.toLowerCase().includes(searchLower)))
    );
  });
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredItems.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
      } else if (e.key === 'Enter' && filteredItems.length > 0) {
        e.preventDefault();
        filteredItems[selectedIndex].action?.();
        onClose();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [filteredItems, selectedIndex, onClose]);
  
  // Auto-focus the input field
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-[20vh]"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-card rounded-lg shadow-lg border overflow-hidden animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center border-b px-4 py-2">
          <Command className="h-5 w-5 text-muted-foreground mr-2" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search prompts, folders, or actions..."
            className="flex-1 bg-transparent border-0 focus:ring-0 outline-none text-base"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="text-xs text-muted-foreground border px-1.5 py-0.5 rounded">esc</div>
        </div>
        
        <div className="overflow-y-auto max-h-[60vh]">
          {filteredItems.length === 0 ? (
            <div className="px-4 py-12 text-center text-muted-foreground">
              No results found
            </div>
          ) : (
            <div className="py-2">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className={cn(
                    "px-4 py-2 flex items-start gap-3 cursor-pointer",
                    index === selectedIndex ? "bg-accent text-accent-foreground" : "hover:bg-muted/50"
                  )}
                  onClick={() => {
                    item.action?.();
                    onClose();
                  }}
                >
                  <div className="pt-0.5">{item.icon}</div>
                  <div className="flex-1 overflow-hidden">
                    <div className="font-medium">{item.title}</div>
                    {item.description && (
                      <div className="text-sm text-muted-foreground truncate">
                        {item.description}
                      </div>
                    )}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.tags.map(tag => (
                          <span 
                            key={tag} 
                            className="text-xs px-1.5 py-0.5 bg-primary/10 text-primary rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {item.type === 'prompt' && (
                    <button 
                      className="text-muted-foreground hover:text-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Would inject to AI tools in real implementation
                        alert('Prompt injected to AI service');
                        onClose();
                      }}
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="border-t px-4 py-2 text-xs text-muted-foreground flex justify-between">
          <div>
            <span className="font-medium">↑↓</span> to navigate
          </div>
          <div>
            <span className="font-medium">enter</span> to select
          </div>
          <div>
            <span className="font-medium">⌘+shift+p</span> to open
          </div>
        </div>
      </div>
    </div>
  );
};
