
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PromptEditor from '@/components/PromptEditor';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const NewPrompt = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSave = (prompt: any) => {
    // In a real app, this would save to API/state
    toast({
      title: "Prompt saved",
      description: "Your prompt has been saved successfully",
    });
    navigate('/');
  };
  
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Create New Prompt</h2>
        <PromptEditor 
          onSave={handleSave}
          onCancel={() => navigate('/')} 
        />
      </div>
    </MainLayout>
  );
};

export default NewPrompt;
