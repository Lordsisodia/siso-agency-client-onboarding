import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  projectName: z.string().min(2, {
    message: "Project name must be at least 2 characters.",
  }),
  projectType: z.string().min(2, {
    message: "Project type must be at least 2 characters.",
  }),
  businessGoals: z.string().min(10, {
    message: "Business goals must be at least 10 characters.",
  }),
  targetAudience: z.string().min(10, {
    message: "Target audience description must be at least 10 characters.",
  }),
  keyFeatures: z.string().min(10, {
    message: "Key features must be at least 10 characters.",
  }),
  technicalRequirements: z.string().min(10, {
    message: "Technical requirements must be at least 10 characters.",
  }),
  timelineBudget: z.string().min(10, {
    message: "Timeline and budget details must be at least 10 characters.",
  }),
  additionalNotes: z.string().optional(),
});

interface ManualInputSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitToAI: (prompt: string, formData?: Record<string, any>) => Promise<void>;
}

export function ManualInputSheet({ isOpen, onClose, onSubmitToAI }: ManualInputSheetProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      projectType: "",
      businessGoals: "",
      targetAudience: "",
      keyFeatures: "",
      technicalRequirements: "",
      timelineBudget: "",
      additionalNotes: "",
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.formState.errors) {
      toast({
        title: "Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      // Prepare a prompt based on the form data
      const prompt = `
      The user has provided the following information:
      
      Project Name: ${form.getValues("projectName")}
      Project Type: ${form.getValues("projectType")}
      Business Goals: ${form.getValues("businessGoals")}
      Target Audience: ${form.getValues("targetAudience")}
      Key Features: ${form.getValues("keyFeatures")}
      Technical Requirements: ${form.getValues("technicalRequirements")}
      Timeline/Budget: ${form.getValues("timelineBudget")}
      Additional Notes: ${form.getValues("additionalNotes") || 'None provided'}
      
      Please create a comprehensive project plan based on this information. Include sections for project scope, technical specifications, timeline, budget considerations, and recommend an appropriate approach.
      `;
      
      // Only pass the prompt as the first argument, and formData as the second argument
      await onSubmitToAI(prompt, form.getValues());
      onClose();
      
      form.reset();
      toast({
        title: "Success",
        description: "Project details submitted to AI for planning!",
      });
    } catch (error) {
      console.error("Error submitting manual input:", error);
      toast({
        title: "Error",
        description: "There was a problem submitting your project details. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Manual Project Input</SheetTitle>
          <SheetDescription>
            Enter your project details manually to generate a project plan.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="projectName">Project Name</Label>
            <Input id="projectName" placeholder="Project Name" {...form.register("projectName")} />
            {form.formState.errors.projectName && (
              <p className="text-sm text-red-500">{form.formState.errors.projectName.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="projectType">Project Type</Label>
            <Input id="projectType" placeholder="e.g., Mobile App, Website" {...form.register("projectType")} />
            {form.formState.errors.projectType && (
              <p className="text-sm text-red-500">{form.formState.errors.projectType.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="businessGoals">Business Goals</Label>
            <Textarea
              id="businessGoals"
              placeholder="Describe your business goals for this project"
              className="resize-none"
              {...form.register("businessGoals")}
            />
            {form.formState.errors.businessGoals && (
              <p className="text-sm text-red-500">{form.formState.errors.businessGoals.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="targetAudience">Target Audience</Label>
            <Textarea
              id="targetAudience"
              placeholder="Describe your target audience"
              className="resize-none"
              {...form.register("targetAudience")}
            />
            {form.formState.errors.targetAudience && (
              <p className="text-sm text-red-500">{form.formState.errors.targetAudience.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="keyFeatures">Key Features</Label>
            <Textarea
              id="keyFeatures"
              placeholder="List the key features of your project"
              className="resize-none"
              {...form.register("keyFeatures")}
            />
            {form.formState.errors.keyFeatures && (
              <p className="text-sm text-red-500">{form.formState.errors.keyFeatures.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="technicalRequirements">Technical Requirements</Label>
            <Textarea
              id="technicalRequirements"
              placeholder="Describe the technical requirements"
              className="resize-none"
              {...form.register("technicalRequirements")}
            />
            {form.formState.errors.technicalRequirements && (
              <p className="text-sm text-red-500">{form.formState.errors.technicalRequirements.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="timelineBudget">Timeline and Budget</Label>
            <Textarea
              id="timelineBudget"
              placeholder="Provide details about the timeline and budget"
              className="resize-none"
              {...form.register("timelineBudget")}
            />
            {form.formState.errors.timelineBudget && (
              <p className="text-sm text-red-500">{form.formState.errors.timelineBudget.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="additionalNotes">Additional Notes</Label>
            <Textarea
              id="additionalNotes"
              placeholder="Any additional notes or information"
              className="resize-none"
              {...form.register("additionalNotes")}
            />
          </div>
          <SheetFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit to AI"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
