
import React from "react";
import { FeatureCard } from "../features/FeatureCard";
import { FeatureOption } from "../types";

interface FeatureSelectionStepProps {
  featureOptions: FeatureOption[];
  selectedFeatures: Record<string, { selected: boolean, priority: "must-have" | "nice-to-have" | null }>;
  onFeatureSelection: (featureId: string) => void;
  onPriorityChange: (featureId: string, priority: "must-have" | "nice-to-have") => void;
}

export function FeatureSelectionStep({
  featureOptions,
  selectedFeatures,
  onFeatureSelection,
  onPriorityChange
}: FeatureSelectionStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Select features for your app</h2>
        <p className="text-muted-foreground">Choose features and set their priorities</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto pb-4 pr-2">
        {featureOptions.map((feature) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
            isSelected={selectedFeatures[feature.id]?.selected || false}
            priority={selectedFeatures[feature.id]?.priority || null}
            onSelectFeature={onFeatureSelection}
            onPriorityChange={onPriorityChange}
          />
        ))}
      </div>
    </div>
  );
}
