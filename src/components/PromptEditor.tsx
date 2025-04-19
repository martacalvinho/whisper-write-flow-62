import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { 
  X, 
  Save, 
  PlusCircle, 
  Trash2,
  Tags
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';

interface PromptEditorProps {
  onSave?: (prompt: any) => void;
  onCancel?: () => void;
  initialPrompt?: any;
}

const PromptEditor: React.FC<PromptEditorProps> = ({ 
  onSave, 
  onCancel,
  initialPrompt 
}) => {
  const { toast } = useToast();
  const [title, setTitle] = useState(initialPrompt?.title || '');
  const [content, setContent] = useState(initialPrompt?.content || '');
  const [folder, setFolder] = useState(initialPrompt?.folder || '');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<string[]>(initialPrompt?.tags || []);
  const [aiPlatforms, setAiPlatforms] = useState<string[]>(
    initialPrompt?.aiPlatforms || ['chatgpt']
  );
  
  // Mock data for folders
  const folders = [
    { id: '1', name: 'ChatGPT Templates' },
    { id: '2', name: 'Claude Prompts' },
    { id: '3', name: 'Gemini Workflows' },
    { id: '4', name: 'Marketing' },
    { id: '5', name: 'Code Generation' },
  ];
  
  const addTag = () => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTag('');
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };
  
  const toggleAiPlatform = (platform: string) => {
    if (aiPlatforms.includes(platform)) {
      setAiPlatforms(aiPlatforms.filter(p => p !== platform));
    } else {
      setAiPlatforms([...aiPlatforms, platform]);
    }
  };
  
  const handleSave = () => {
    if (!title) {
      toast({
        title: "Title required",
        description: "Please provide a title for your prompt",
        variant: "destructive"
      });
      return;
    }
    
    if (!content) {
      toast({
        title: "Content required",
        description: "Please provide content for your prompt",
        variant: "destructive"
      });
      return;
    }
    
    const prompt = {
      title,
      content,
      folder,
      tags,
      aiPlatforms,
      id: initialPrompt?.id || Date.now().toString(),
    };
    
    if (onSave) {
      onSave(prompt);
    } else {
      toast({
        title: "Prompt saved",
        description: "Your prompt has been saved successfully",
      });
    }
  };
  
  const highlightVariables = (text: string) => {
    return text.replace(
      /\{\{([^}]+)\}\}/g, 
      '<span class="bg-yellow-100 px-1 rounded text-yellow-800">{{$1}}</span>'
    );
  };
  
  return (
    <div className="space-y-4 animate-slide-up">
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="prompt-title">Title</Label>
        <Input
          id="prompt-title"
          placeholder="Give your prompt a descriptive title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="prompt-folder">Folder</Label>
        <Select value={folder} onValueChange={setFolder}>
          <SelectTrigger>
            <SelectValue placeholder="Select a folder" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No folder</SelectItem>
            {folders.map((f) => (
              <SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="prompt-content">Prompt Content</Label>
        <div className="relative">
          <Textarea
            id="prompt-content"
            placeholder="Write your prompt here. Use {{variables}} for placeholders."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[200px]"
          />
          <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
            {content.length} characters
          </div>
        </div>
        
        {content && content.includes('{{') && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mt-2">
            <h4 className="text-sm font-medium text-yellow-800 mb-1">Variables Detected</h4>
            <div className="text-xs text-yellow-700">
              These variables will be prompted for when the prompt is used:
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {(content.match(/\{\{([^}]+)\}\}/g) || []).map((match, index) => {
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
        
        {content && (
          <div className="mt-2">
            <Label className="text-sm">Preview</Label>
            <div 
              className="mt-1 p-3 bg-muted rounded-md text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: highlightVariables(content) }}
            />
          </div>
        )}
      </div>
      
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="prompt-tags">Tags</Label>
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              id="prompt-tags"
              placeholder="Add tags to organize your prompts"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag();
                }
              }}
            />
            {tag && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6"
                onClick={() => setTag('')}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
          <Button type="button" onClick={addTag} size="icon">
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((t, index) => (
              <div 
                key={index}
                className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs"
              >
                <Tags className="h-3 w-3" />
                <span>{t}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 rounded-full hover:bg-muted"
                  onClick={() => removeTag(t)}
                >
                  <X className="h-2 w-2" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex flex-col space-y-1.5">
        <Label>Compatible AI Platforms</Label>
        <div className="flex gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="chatgpt" 
              checked={aiPlatforms.includes('chatgpt')}
              onCheckedChange={() => toggleAiPlatform('chatgpt')}
            />
            <Label htmlFor="chatgpt" className="text-sm">ChatGPT</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="claude" 
              checked={aiPlatforms.includes('claude')}
              onCheckedChange={() => toggleAiPlatform('claude')}
            />
            <Label htmlFor="claude" className="text-sm">Claude</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="gemini" 
              checked={aiPlatforms.includes('gemini')}
              onCheckedChange={() => toggleAiPlatform('gemini')}
            />
            <Label htmlFor="gemini" className="text-sm">Gemini</Label>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-2 pt-2">
        <Button 
          variant="outline" 
          onClick={onCancel || (() => toast({ title: "Cancelled" }))}
        >
          Cancel
        </Button>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Prompt
        </Button>
      </div>
    </div>
  );
};

export default PromptEditor;
