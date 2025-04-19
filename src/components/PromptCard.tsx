
import React from 'react';
import { 
  FileText, 
  MoreHorizontal, 
  Star, 
  Send, 
  Copy,
  PencilLine,
  Trash2,
  Share2,
  BookmarkPlus,
  BookmarkMinus
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { usePromptDetailModal } from '@/hooks/usePromptDetailModal';

export interface Prompt {
  id: string;
  title: string;
  content: string;
  tags: string[];
  favorited: boolean;
  aiPlatforms: ('chatgpt' | 'claude' | 'gemini')[];
}

interface PromptCardProps {
  prompt: Prompt;
  className?: string;
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt, className }) => {
  const { toast } = useToast();
  const { openPromptDetail } = usePromptDetailModal();
  
  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'chatgpt': return 'bg-green-100 text-green-800';
      case 'claude': return 'bg-purple-100 text-purple-800';
      case 'gemini': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const copyToClipboard = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.content);
    toast({
      title: "Copied to clipboard",
      description: "Prompt content has been copied to your clipboard",
    });
  };
  
  const sendToAI = (e: React.MouseEvent, platform: string) => {
    e.stopPropagation();
    toast({
      title: `Sent to ${platform}`,
      description: "Prompt has been sent to your active AI chat tab",
    });
  };
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: prompt.favorited ? "Removed from favorites" : "Added to favorites",
    });
  };
  
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({ 
      title: "Edit Prompt", 
      description: "This would open the prompt editor" 
    });
  };
  
  const handleCardClick = () => {
    openPromptDetail(prompt);
  };
  
  return (
    <div 
      className={cn(
        "prompt-card flex flex-col p-3 border rounded-lg cursor-pointer hover:shadow-md transition-shadow", 
        className
      )}
      onClick={handleCardClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-2">
          <div className="w-7 h-7 rounded-md bg-primary/10 flex-shrink-0 flex items-center justify-center">
            <FileText className="h-3.5 w-3.5 text-primary" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm truncate">{prompt.title}</h3>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
              {prompt.content}
            </p>
          </div>
        </div>
        
        <div className="flex items-center ml-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-muted-foreground hover:text-yellow-500"
            onClick={toggleFavorite}
          >
            <Star className={cn("h-3.5 w-3.5", prompt.favorited && "fill-yellow-400 text-yellow-400")} />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreHorizontal className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem onClick={(e) => sendToAI(e, 'ChatGPT')}>
                <Send className="mr-2 h-3.5 w-3.5" />
                <span>Send to ChatGPT</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => sendToAI(e, 'Claude')}>
                <Send className="mr-2 h-3.5 w-3.5" />
                <span>Send to Claude</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => sendToAI(e, 'Gemini')}>
                <Send className="mr-2 h-3.5 w-3.5" />
                <span>Send to Gemini</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={copyToClipboard}>
                <Copy className="mr-2 h-3.5 w-3.5" />
                <span>Copy to Clipboard</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={toggleFavorite}>
                {prompt.favorited ? (
                  <>
                    <BookmarkMinus className="mr-2 h-3.5 w-3.5" />
                    <span>Remove Favorite</span>
                  </>
                ) : (
                  <>
                    <BookmarkPlus className="mr-2 h-3.5 w-3.5" />
                    <span>Add to Favorites</span>
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleEdit}>
                <PencilLine className="mr-2 h-3.5 w-3.5" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => {
                e.stopPropagation();
                toast({ title: "Share", description: "Share prompt dialog would open" });
              }}>
                <Share2 className="mr-2 h-3.5 w-3.5" />
                <span>Share</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={(e) => {
                  e.stopPropagation();
                  toast({ 
                    title: "Delete Prompt", 
                    description: "Are you sure? This would show a confirmation dialog.",
                    variant: "destructive"
                  });
                }}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-3.5 w-3.5" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="mt-2 flex flex-wrap gap-1 overflow-hidden">
        {prompt.tags.slice(0, 3).map((tag) => (
          <div 
            key={tag}
            className="text-xs bg-secondary px-1.5 py-0.5 rounded-full text-secondary-foreground"
          >
            {tag}
          </div>
        ))}
        {prompt.tags.length > 3 && (
          <div className="text-xs text-muted-foreground">+{prompt.tags.length - 3}</div>
        )}
      </div>
      
      <div className="mt-auto pt-2 flex justify-between items-center">
        <div className="flex space-x-1 overflow-x-auto pb-1 max-w-[70%]">
          {prompt.aiPlatforms.map((platform) => (
            <button
              key={platform}
              className={cn(
                "text-xs px-1.5 py-0.5 rounded-full flex items-center gap-1 whitespace-nowrap",
                getPlatformColor(platform)
              )}
              onClick={(e) => sendToAI(e, platform)}
            >
              <Send className="h-2.5 w-2.5" />
              {platform}
            </button>
          ))}
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs h-6 px-1.5"
          onClick={copyToClipboard}
        >
          <Copy className="h-2.5 w-2.5 mr-1" />
          Copy
        </Button>
      </div>
    </div>
  );
};

export default PromptCard;
