
import React from 'react';
import { 
  FileText, 
  MoreHorizontal, 
  Star, 
  Tags, 
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
  
  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'chatgpt': return 'bg-green-100 text-green-800';
      case 'claude': return 'bg-purple-100 text-purple-800';
      case 'gemini': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(prompt.content);
    toast({
      title: "Copied to clipboard",
      description: "Prompt content has been copied to your clipboard",
    });
  };
  
  const sendToAI = (platform: string) => {
    toast({
      title: `Sent to ${platform}`,
      description: "Prompt has been sent to your active AI chat tab",
    });
  };
  
  const toggleFavorite = () => {
    toast({
      title: prompt.favorited ? "Removed from favorites" : "Added to favorites",
    });
  };
  
  return (
    <div className={cn("prompt-card flex flex-col", className)}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-md bg-primary/10 flex-shrink-0 flex items-center justify-center">
            <FileText className="h-4 w-4 text-primary" />
          </div>
          
          <div>
            <h3 className="font-medium text-sm">{prompt.title}</h3>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {prompt.content}
            </p>
          </div>
        </div>
        
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-yellow-500"
            onClick={toggleFavorite}
          >
            <Star className={cn("h-4 w-4", prompt.favorited && "fill-yellow-400 text-yellow-400")} />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => sendToAI('ChatGPT')}>
                <Send className="mr-2 h-4 w-4" />
                <span>Send to ChatGPT</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => sendToAI('Claude')}>
                <Send className="mr-2 h-4 w-4" />
                <span>Send to Claude</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => sendToAI('Gemini')}>
                <Send className="mr-2 h-4 w-4" />
                <span>Send to Gemini</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={copyToClipboard}>
                <Copy className="mr-2 h-4 w-4" />
                <span>Copy to Clipboard</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={toggleFavorite}>
                {prompt.favorited ? (
                  <>
                    <BookmarkMinus className="mr-2 h-4 w-4" />
                    <span>Remove from Favorites</span>
                  </>
                ) : (
                  <>
                    <BookmarkPlus className="mr-2 h-4 w-4" />
                    <span>Add to Favorites</span>
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast({ title: "Edit Prompt", description: "This would open the prompt editor" })}>
                <PencilLine className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast({ title: "Share", description: "Share prompt dialog would open" })}>
                <Share2 className="mr-2 h-4 w-4" />
                <span>Share</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => toast({ 
                  title: "Delete Prompt", 
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
      </div>
      
      <div className="mt-4 flex flex-wrap gap-1">
        {prompt.tags.map((tag) => (
          <div 
            key={tag}
            className="text-xs bg-secondary px-2 py-0.5 rounded-full text-secondary-foreground"
          >
            {tag}
          </div>
        ))}
      </div>
      
      <div className="mt-auto pt-3 flex justify-between">
        <div className="flex space-x-1.5">
          {prompt.aiPlatforms.map((platform) => (
            <button
              key={platform}
              className={cn(
                "text-xs px-2 py-0.5 rounded-full flex items-center gap-1",
                getPlatformColor(platform)
              )}
              onClick={() => sendToAI(platform)}
            >
              <Send className="h-3 w-3" />
              {platform}
            </button>
          ))}
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs"
          onClick={copyToClipboard}
        >
          <Copy className="h-3 w-3 mr-1" />
          Copy
        </Button>
      </div>
    </div>
  );
};

export default PromptCard;
