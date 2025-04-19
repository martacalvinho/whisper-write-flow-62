
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import PromptCard, { Prompt } from '@/components/PromptCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Search, 
  X, 
  ArrowLeft, 
  MoreHorizontal,
  Share2,
  PencilLine,
  Trash2,
  Users,
  Lock
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

const FolderView = () => {
  const { folderId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data - in a real app these would come from API or state
  const folders = [
    { id: '1', name: 'ChatGPT Templates', description: 'Prompts for ChatGPT', shared: false },
    { id: '2', name: 'Claude Prompts', description: 'Prompts for Claude AI', shared: true },
    { id: '3', name: 'Gemini Workflows', description: 'Google Gemini workflow templates', shared: false },
    { id: '4', name: 'Marketing', description: 'Marketing and copywriting prompts', shared: true },
    { id: '5', name: 'Code Generation', description: 'Programming and development prompts', shared: false },
  ];
  
  const prompts: Prompt[] = [
    {
      id: '1',
      title: 'Blog Post Outline Generator',
      content: 'Create a detailed outline for a blog post on {{topic}}. The outline should include an introduction, at least 5 main sections with 3 subsections each, and a conclusion.',
      tags: ['content', 'writing', 'blog'],
      favorited: true,
      aiPlatforms: ['chatgpt', 'claude'],
    },
    {
      id: '2',
      title: 'Code Refactoring Assistant',
      content: 'Analyze the following {{language}} code and suggest refactoring improvements: ```{{code}}```',
      tags: ['development', 'coding', 'refactoring'],
      favorited: false,
      aiPlatforms: ['chatgpt', 'claude', 'gemini'],
    },
    {
      id: '3',
      title: 'Social Media Caption Generator',
      content: 'Write 5 engaging captions for {{social_platform}} for my post about {{topic}}. Each caption should be under 100 characters and include relevant hashtags.',
      tags: ['social media', 'marketing'],
      favorited: true,
      aiPlatforms: ['chatgpt'],
    },
    {
      id: '4',
      title: 'Email Response Template',
      content: 'Write a professional email response to {{context}} with a {{tone}} tone. The email should be concise and effective.',
      tags: ['communication', 'email'],
      favorited: false,
      aiPlatforms: ['chatgpt', 'claude'],
    },
  ];
  
  // Find current folder
  const currentFolder = folders.find(f => f.id === folderId);
  
  // Filter prompts by search query
  const filteredPrompts = searchQuery
    ? prompts.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : prompts;
  
  if (!currentFolder) {
    return (
      <MainLayout>
        <div className="text-center py-8">
          <h2 className="text-xl font-bold">Folder not found</h2>
          <p className="text-muted-foreground mt-2 text-sm">The folder you're looking for doesn't exist</p>
          <Button onClick={() => navigate('/')} className="mt-4" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 mr-1" 
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            
            {searchActive ? (
              <div className="flex items-center">
                <div className="relative">
                  <Search className="h-3.5 w-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search in this folder..."
                    className="pl-8 h-8 text-sm w-[200px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  {searchQuery && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-5 w-5" 
                      onClick={() => setSearchQuery('')}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSearchActive(false)}
                  className="ml-1 h-7 text-xs"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <>
                <h2 className="text-lg font-bold truncate max-w-[180px]">{currentFolder.name}</h2>
                <Badge 
                  variant="outline" 
                  className="ml-2 h-5 text-xs"
                >
                  {currentFolder.shared ? (
                    <div className="flex items-center">
                      <Users className="h-2.5 w-2.5 mr-1" />
                      Shared
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Lock className="h-2.5 w-2.5 mr-1" />
                      Private
                    </div>
                  )}
                </Badge>
              </>
            )}
          </div>
          
          <div className="flex items-center space-x-1">
            {!searchActive && (
              <Button 
                variant="ghost" 
                size="icon"
                className="h-7 w-7"
                onClick={() => setSearchActive(true)}
              >
                <Search className="h-4 w-4" />
              </Button>
            )}
            
            <Button onClick={() => navigate('/new-prompt')} size="sm" className="h-7">
              <Plus className="h-3.5 w-3.5 mr-1" />
              New
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => toast({ title: "Rename Folder", description: "This would open a dialog to rename the folder" })}>
                  <PencilLine className="mr-2 h-3.5 w-3.5" />
                  <span>Rename Folder</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast({ title: "Share Folder", description: "This would open sharing options" })}>
                  <Share2 className="mr-2 h-3.5 w-3.5" />
                  <span>Share Folder</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => 
                  toast({ 
                    title: currentFolder.shared ? "Made Private" : "Made Shared", 
                    description: currentFolder.shared ? "Folder is now private" : "Folder is now shared with team" 
                  })
                }>
                  {currentFolder.shared ? 
                    <><Lock className="mr-2 h-3.5 w-3.5" /><span>Make Private</span></> : 
                    <><Users className="mr-2 h-3.5 w-3.5" /><span>Make Shared</span></>
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
                  <Trash2 className="mr-2 h-3.5 w-3.5" />
                  <span>Delete Folder</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {currentFolder.description && (
          <p className="text-xs text-muted-foreground -mt-1">{currentFolder.description}</p>
        )}
        
        <div>
          {filteredPrompts.length === 0 ? (
            searchQuery ? (
              <div className="text-center py-8">
                <h3 className="text-base font-medium">No matching prompts</h3>
                <p className="text-muted-foreground mt-1 text-sm">Try a different search term</p>
              </div>
            ) : (
              <div className="text-center py-8">
                <h3 className="text-base font-medium">No prompts in this folder</h3>
                <p className="text-muted-foreground mt-1 text-sm">Add a prompt to get started</p>
                <Button onClick={() => navigate('/new-prompt')} className="mt-4" size="sm">
                  <Plus className="mr-2 h-3.5 w-3.5" />
                  New Prompt
                </Button>
              </div>
            )
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {filteredPrompts.map((prompt, index) => (
                <PromptCard 
                  key={prompt.id} 
                  prompt={prompt} 
                  className={`animate-slide-up-delay-${Math.min(index + 1, 3)}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default FolderView;
