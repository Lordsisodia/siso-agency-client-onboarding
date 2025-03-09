
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

// Simple placeholder component to replace the removed SummaryContent
export function DailySummary() {
  return (
    <Card className="border border-siso-border/30 bg-siso-bg/30 backdrop-blur-xl">
      <CardContent className="pt-6">
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            AI News Summary functionality has been temporarily disabled.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default DailySummary;
