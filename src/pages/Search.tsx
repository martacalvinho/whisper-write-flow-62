
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import PromptCard, { Prompt } from '@/components/PromptCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search as SearchIcon, 
  X, 
  ArrowLeft, 
  SlidersHorizontal, 
  FileText, 
  Folder, 
  Tags
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState('all');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  // Mock data - in a real app these would come from API or state
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
  
  const folders = [
    { id: '1', name: 'ChatGPT Templates', promptCount: 12 },
    { id: '2', name: 'Claude Prompts', promptCount: 8 },
    { id: '3', name: 'Gemini Workflows', promptCount: 5 },
    { id: '4', name: 'Marketing', promptCount: 10 },
    { id: '5', name: 'Code Generation', promptCount: 15 },
  ];
  
  // Get all unique tags from prompts
  const allTags = Array.from(
    new Set(prompts.flatMap(prompt => prompt.tags))
  ).sort();
  
  // Filter prompts by search query
  const filteredPrompts = searchQuery
    ? prompts.filter(p => {
        const matchesQuery = 
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
          
        // Apply additional filters if any are active
        const matchesFilters = activeFilters.length === 0 || 
          p.tags.some(tag => activeFilters.includes(tag)) ||
          activeFilters.some(filter => p.aiPlatforms.includes(filter as any));
          
        return matchesQuery && matchesFilters;
      })
    : [];
    
  // Filter folders by search query
  const filteredFolders = searchQuery
    ? folders.filter(f => 
        f.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
  
  // Matched tags
  const matchedTags = searchQuery
    ? Array.from(
        new Set(
          prompts
            .filter(p => 
              p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.content.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .flatMap(p => p.tags)
        )
      ).sort()
    : [];
  
  // Handle form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery) {
      // Update URL to reflect current search
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };
  
  // Toggle filter
  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };
  
  // Clear all filters
  const clearFilters = () => {
    setActiveFilters([]);
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mr-2" 
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-2xl font-bold">Search Results</h2>
        </div>
        
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <SearchIcon className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search prompts, folders, or tags..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" 
                onClick={() => setSearchQuery('')}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
          <Button type="submit">Search</Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                {activeFilters.length > 0 && (
                  <Badge variant="secondary" className="rounded-full px-1 h-5 text-xs">
                    {activeFilters.length}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Search Filters</SheetTitle>
                <SheetDescription>
                  Narrow down your search results
                </SheetDescription>
              </SheetHeader>
              
              <div className="py-4">
                <div className="mb-4">
                  <h4 className="font-medium mb-2">AI Platforms</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="filter-chatgpt" 
                        checked={activeFilters.includes('chatgpt')}
                        onCheckedChange={() => toggleFilter('chatgpt')}
                      />
                      <Label htmlFor="filter-chatgpt">ChatGPT</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="filter-claude" 
                        checked={activeFilters.includes('claude')}
                        onCheckedChange={() => toggleFilter('claude')}
                      />
                      <Label htmlFor="filter-claude">Claude</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="filter-gemini" 
                        checked={activeFilters.includes('gemini')}
                        onCheckedChange={() => toggleFilter('gemini')}
                      />
                      <Label htmlFor="filter-gemini">Gemini</Label>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Tags</h4>
                    {activeFilters.length > 0 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs"
                        onClick={clearFilters}
                      >
                        Clear all
                      </Button>
                    )}
                  </div>
                  <div className="space-y-2">
                    {allTags.map(tag => (
                      <div key={tag} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`filter-tag-${tag}`} 
                          checked={activeFilters.includes(tag)}
                          onCheckedChange={() => toggleFilter(tag)}
                        />
                        <Label htmlFor={`filter-tag-${tag}`}>{tag}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </form>
        
        {/* Active filters display */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {activeFilters.map(filter => (
              <Badge key={filter} variant="secondary" className="gap-1.5">
                {filter}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-4 w-4 ml-1 -mr-1 rounded-full hover:bg-secondary/80"
                  onClick={() => toggleFilter(filter)}
                >
                  <X className="h-2 w-2" />
                </Button>
              </Badge>
            ))}
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 text-xs px-2"
              onClick={clearFilters}
            >
              Clear all
            </Button>
          </div>
        )}
        
        {searchQuery ? (
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList>
              <TabsTrigger value="all">
                All Results
                <Badge variant="secondary" className="ml-2">
                  {filteredPrompts.length + filteredFolders.length + matchedTags.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="prompts">
                Prompts
                <Badge variant="secondary" className="ml-2">
                  {filteredPrompts.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="folders">
                Folders
                <Badge variant="secondary" className="ml-2">
                  {filteredFolders.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="tags">
                Tags
                <Badge variant="secondary" className="ml-2">
                  {matchedTags.length}
                </Badge>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-4 space-y-6">
              {filteredPrompts.length === 0 && filteredFolders.length === 0 && matchedTags.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">No results found</h3>
                  <p className="text-muted-foreground mt-2">Try a different search term or clear filters</p>
                </div>
              ) : (
                <>
                  {filteredFolders.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-medium">Folders</h3>
                        {filteredFolders.length > 3 && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setActiveTab('folders')}
                          >
                            View all {filteredFolders.length}
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {filteredFolders.slice(0, 3).map((folder, index) => (
                          <div 
                            key={folder.id}
                            className="bg-card rounded-lg border p-4 hover:shadow-md transition-shadow hover:border-primary/20 cursor-pointer"
                            onClick={() => navigate(`/folder/${folder.id}`)}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                                <Folder className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-medium">{folder.name}</h3>
                                <p className="text-xs text-muted-foreground">{folder.promptCount} prompts</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {filteredPrompts.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-medium">Prompts</h3>
                        {filteredPrompts.length > 3 && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setActiveTab('prompts')}
                          >
                            View all {filteredPrompts.length}
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredPrompts.slice(0, 3).map((prompt) => (
                          <PromptCard key={prompt.id} prompt={prompt} />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {matchedTags.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-medium">Tags</h3>
                        {matchedTags.length > 8 && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setActiveTab('tags')}
                          >
                            View all {matchedTags.length}
                          </Button>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {matchedTags.slice(0, 8).map((tag) => (
                          <Button
                            key={tag}
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={() => toggleFilter(tag)}
                          >
                            <Tags className="h-3 w-3" />
                            {tag}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </TabsContent>
            
            <TabsContent value="prompts" className="mt-4">
              {filteredPrompts.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">No prompts found</h3>
                  <p className="text-muted-foreground mt-2">Try a different search term or clear filters</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredPrompts.map((prompt) => (
                    <PromptCard key={prompt.id} prompt={prompt} />
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="folders" className="mt-4">
              {filteredFolders.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">No folders found</h3>
                  <p className="text-muted-foreground mt-2">Try a different search term</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredFolders.map((folder) => (
                    <div 
                      key={folder.id}
                      className="bg-card rounded-lg border p-4 hover:shadow-md transition-shadow hover:border-primary/20 cursor-pointer"
                      onClick={() => navigate(`/folder/${folder.id}`)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                          <Folder className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{folder.name}</h3>
                          <p className="text-sm text-muted-foreground">{folder.promptCount} prompts</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="tags" className="mt-4">
              {matchedTags.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">No tags found</h3>
                  <p className="text-muted-foreground mt-2">Try a different search term</p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {matchedTags.map((tag) => (
                    <Button
                      key={tag}
                      variant="outline"
                      className="gap-2"
                      onClick={() => toggleFilter(tag)}
                    >
                      <Tags className="h-4 w-4" />
                      {tag}
                      <Badge variant="secondary" className="ml-1">
                        {prompts.filter(p => p.tags.includes(tag)).length}
                      </Badge>
                    </Button>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex mx-auto items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/10">
              <SearchIcon className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-medium">Search for prompts, folders, or tags</h3>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              Search by prompt title, content, or tags to find what you're looking for
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Search;
