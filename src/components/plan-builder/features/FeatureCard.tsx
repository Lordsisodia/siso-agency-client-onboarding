
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { FeatureOption } from "../types";

interface FeatureCardProps {
  feature: FeatureOption;
  isSelected: boolean;
  priority: "must-have" | "nice-to-have" | null;
  onSelectFeature: (featureId: string) => void;
  onPriorityChange: (featureId: string, priority: "must-have" | "nice-to-have") => void;
}

export function FeatureCard({
  feature,
  isSelected,
  priority,
  onSelectFeature,
  onPriorityChange
}: FeatureCardProps) {
  return (
    <Card 
      key={feature.id} 
      className={`border ${isSelected ? 'border-primary' : 'border-border'}`}
    >
      <CardHeader className="py-4 px-4">
        <CardTitle className="text-base flex justify-between items-start">
          <span>{feature.name}</span>
          <Checkbox 
            id={`feature-${feature.id}`}
            checked={isSelected}
            onCheckedChange={() => onSelectFeature(feature.id)}
          />
        </CardTitle>
        <CardDescription className="text-xs">{feature.description}</CardDescription>
      </CardHeader>
      {isSelected && (
        <CardFooter className="py-2 px-4 flex justify-between border-t">
          <span className="text-xs">Priority:</span>
          <div className="flex gap-2">
            <Button 
              type="button" 
              size="sm" 
              variant={priority === "must-have" ? "default" : "outline"}
              onClick={() => onPriorityChange(feature.id, "must-have")}
              className="text-xs h-7 px-2"
            >
              Must-have
            </Button>
            <Button 
              type="button" 
              size="sm" 
              variant={priority === "nice-to-have" ? "default" : "outline"}
              onClick={() => onPriorityChange(feature.id, "nice-to-have")}
              className="text-xs h-7 px-2"
            >
              Nice-to-have
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
