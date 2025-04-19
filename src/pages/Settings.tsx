
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Share, Heart, BarChart } from "lucide-react";
import PromptCard from '@/components/PromptCard';

const Settings = () => {
  // Mock data for favorites and analytics
  const favoritePrompts = [
    {
      id: '1',
      title: 'Blog Post Outline Generator',
      content: 'Create a detailed outline for a blog post...',
      tags: ['content', 'writing'],
      favorited: true,
      aiPlatforms: ['chatgpt'],
    },
  ];

  const analyticsData = {
    mostUsedPrompts: [
      { name: 'Blog Post Outline', uses: 45 },
      { name: 'Code Refactor', uses: 32 },
      { name: 'Email Template', uses: 28 },
    ],
    totalUses: 150,
    uniquePrompts: 12,
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        
        <Tabs defaultValue="sharing" className="w-full">
          <TabsList>
            <TabsTrigger value="sharing">
              <Share className="h-4 w-4 mr-2" />
              Sharing
            </TabsTrigger>
            <TabsTrigger value="favorites">
              <Heart className="h-4 w-4 mr-2" />
              Favorites
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="sharing" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Sharing Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Public Profile</h4>
                    <p className="text-sm text-muted-foreground">
                      Allow others to see your public prompts
                    </p>
                  </div>
                  <Button variant="outline">Manage</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Shared Folders</h4>
                    <p className="text-sm text-muted-foreground">
                      Manage folder sharing and collaboration
                    </p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="favorites" className="mt-6 space-y-4">
            {favoritePrompts.map((prompt) => (
              <PromptCard 
                key={prompt.id}
                prompt={prompt}
                className="w-full"
              />
            ))}
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Usage Analytics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">{analyticsData.totalUses}</div>
                      <p className="text-xs text-muted-foreground">Total Prompt Uses</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">{analyticsData.uniquePrompts}</div>
                      <p className="text-xs text-muted-foreground">Unique Prompts</p>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Most Used Prompts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {analyticsData.mostUsedPrompts.map((prompt, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span>{prompt.name}</span>
                          <span className="text-muted-foreground">{prompt.uses} uses</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Settings;
