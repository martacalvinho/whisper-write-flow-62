import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import FolderGrid from '@/components/FolderGrid';
import PromptCard, { Prompt } from '@/components/PromptCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, FolderPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  
  // Mock data - in a real app this would come from API or state management
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
  
  const recentPrompts = prompts.slice(0, 3);
  const favoritedPrompts = prompts.filter(p => p.favorited);
  
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
        
        <div className="grid gap-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Folders</h3>
            <FolderGrid folders={folders} />
          </div>
          
          <div>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium">Prompts</h3>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="favorites">Favorites</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="all" className="mt-0">
                <div className="grid grid-cols-1 gap-4">
                  {prompts.map((prompt) => (
                    <PromptCard key={prompt.id} prompt={prompt} className="animate-slide-up-delay-1" />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="recent" className="mt-0">
                <div className="grid grid-cols-1 gap-4">
                  {recentPrompts.map((prompt) => (
                    <PromptCard key={prompt.id} prompt={prompt} className="animate-slide-up-delay-1" />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="favorites" className="mt-0">
                <div className="grid grid-cols-1 gap-4">
                  {favoritedPrompts.map((prompt) => (
                    <PromptCard key={prompt.id} prompt={prompt} className="animate-slide-up-delay-1" />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
