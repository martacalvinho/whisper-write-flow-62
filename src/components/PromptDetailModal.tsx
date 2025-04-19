
import React from 'react';
import { usePromptDetailModal } from '@/hooks/usePromptDetailModal';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Send, PencilLine, Star, Share2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const PromptDetailModal = () => {
  const { isOpen, currentPrompt, closePromptDetail } = usePromptDetailModal();
  const { toast } = useToast();

  if (!currentPrompt) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentPrompt.content);
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

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'chatgpt': return 'bg-green-100 text-green-800';
      case 'claude': return 'bg-purple-100 text-purple-800';
      case 'gemini': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const highlightVariables = (text: string) => {
    return text.replace(
      /\{\{([^}]+)\}\}/g, 
      '<span class="bg-yellow-100 px-1 rounded text-yellow-800">{{$1}}</span>'
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={closePromptDetail}>
      <DialogContent className="sm:max-w-[400px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="pr-8">{currentPrompt.title}</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toast({
                title: currentPrompt.favorited ? "Removed from favorites" : "Added to favorites",
              })}
              className="absolute right-10 top-4 h-7 w-7"
            >
              <Star className={`h-4 w-4 ${currentPrompt.favorited ? "fill-yellow-400 text-yellow-400" : ""}`} />
            </Button>
          </div>
          <DialogDescription className="text-xs">
            Compatible with: {currentPrompt.aiPlatforms.join(', ')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-2">
          <div>
            <h4 className="text-sm font-medium mb-1">Prompt Content</h4>
            <div 
              className="p-3 bg-muted rounded-md text-sm leading-relaxed whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: highlightVariables(currentPrompt.content) }}
            />
          </div>

          {currentPrompt.content.includes('{{') && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
              <h4 className="text-sm font-medium text-yellow-800 mb-1">Variables Detected</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {(currentPrompt.content.match(/\{\{([^}]+)\}\}/g) || []).map((match, index) => {
                  const variable = match.replace(/\{\{|\}\}/g, '');
                  return (
                    <Badge key={index} variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                      {variable}
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}

          <div>
            <h4 className="text-sm font-medium mb-1">Tags</h4>
            <div className="flex flex-wrap gap-1.5">
              {currentPrompt.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {currentPrompt.aiPlatforms.map((platform) => (
            <Button
              key={platform}
              size="sm"
              variant="outline"
              className={getPlatformColor(platform)}
              onClick={() => sendToAI(platform)}
            >
              <Send className="h-3.5 w-3.5 mr-1.5" />
              Send to {platform}
            </Button>
          ))}
        </div>

        <DialogFooter className="flex justify-between mt-4 sm:justify-between">
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => toast({ title: "Edit Prompt", description: "This would open the prompt editor" })}>
              <PencilLine className="h-3.5 w-3.5 mr-1.5" />
              Edit
            </Button>
            <Button size="sm" variant="outline" onClick={() => toast({ title: "Share", description: "Share prompt dialog would open" })}>
              <Share2 className="h-3.5 w-3.5 mr-1.5" />
              Share
            </Button>
          </div>
          <Button size="sm" onClick={copyToClipboard}>
            <Copy className="h-3.5 w-3.5 mr-1.5" />
            Copy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PromptDetailModal;
