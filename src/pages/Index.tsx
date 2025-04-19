import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  FolderPlus, 
  Search, 
  Tag,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PromptCard, { Prompt } from '@/components/PromptCard';
import FolderGrid from '@/components/FolderGrid';
import { Badge } from '@/components/ui/badge';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showAllTags, setShowAllTags] = useState(false);
  
  const folders = [
    { id: '1', name: 'ChatGPT Templates', count: 12, shared: false },
    { id: '2', name: 'Claude Prompts', count: 8, shared: true },
    { id: '3', name: 'Gemini Workflows', count: 5, shared: false },
    { id: '4', name: 'Marketing', count: 10, shared: true },
    { id: '5', name: 'Code Generation', count: 15, shared: false },
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
    {
      id: '5',
      title: 'Product Description Writer',
      content: 'Create a compelling product description for {{product_name}} with the following features: {{features}}. The description should be persuasive and highlight the unique selling points.',
      tags: ['marketing', 'e-commerce'],
      favorited: true,
      aiPlatforms: ['chatgpt', 'claude', 'gemini'],
    },
    {
      id: '6',
      title: 'Meeting Summary Generator',
      content: 'Summarize the key points from this meeting transcript: {{transcript}}. Include action items, decisions made, and next steps.',
      tags: ['productivity', 'meetings'],
      favorited: false,
      aiPlatforms: ['chatgpt', 'claude'],
    },
  ];

  const allTags = Array.from(
    new Set(prompts.flatMap(prompt => prompt.tags))
  ).sort();

  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = searchQuery.toLowerCase() === '' || 
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => prompt.tags.includes(tag));

    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight">AI Prompt Library</h2>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => navigate('/new-folder')}
            >
              <FolderPlus className="h-4 w-4 mr-2" />
              New Folder
            </Button>
            <Button
              onClick={() => navigate('/new-prompt')}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Prompt
            </Button>
          </div>
        </div>

        <Tabs defaultValue="folders" className="w-full">
          <TabsList>
            <TabsTrigger value="folders">Folders</TabsTrigger>
            <TabsTrigger value="prompts">Prompts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="folders" className="mt-6">
            <FolderGrid folders={folders} />
          </TabsContent>
          
          <TabsContent value="prompts" className="mt-6">
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search prompts..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <Collapsible>
                <div className="flex items-center gap-2">
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Tag className="h-4 w-4 mr-2" />
                      Select Tags
                      {showAllTags ? (
                        <ChevronUp className="h-4 w-4 ml-2" />
                      ) : (
                        <ChevronDown className="h-4 w-4 ml-2" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  {selectedTags.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto">
                      {selectedTags.map(tag => (
                        <Badge
                          key={tag}
                          variant="default"
                          className="cursor-pointer"
                          onClick={() => toggleTag(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                
                <CollapsibleContent className="mt-2">
                  <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => (
                      <Badge
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleTag(tag)}
                      >
                        <Tag className="mr-1 h-3 w-3" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <div className="space-y-4">
                {filteredPrompts.map((prompt) => (
                  <PromptCard 
                    key={prompt.id} 
                    prompt={prompt}
                    className="w-full"
                  />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Index;
