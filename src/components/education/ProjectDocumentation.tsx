
import React from 'react';
import { useProjectDocumentation } from '@/hooks/useProjectDocumentation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export const ProjectDocumentation = () => {
  const { docs, loading, error } = useProjectDocumentation();

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-red-800 font-medium">Error loading documentation</h3>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!docs.length) {
    return (
      <div className="text-center p-8">
        <h3 className="text-xl font-semibold mb-2">No documentation available</h3>
        <p className="text-muted-foreground">Check back later for project documentation.</p>
      </div>
    );
  }

  // Group docs by section for better organization
  const sections = docs.reduce((acc, doc) => {
    if (!acc[doc.section]) {
      acc[doc.section] = [];
    }
    acc[doc.section].push(doc);
    return acc;
  }, {} as Record<string, typeof docs>);

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Project Documentation</h2>
        <p className="text-muted-foreground">
          Reference documentation for components and implementation details.
        </p>
      </div>
      
      {Object.entries(sections).map(([section, sectionDocs]) => (
        <div key={section} className="space-y-4">
          <h3 className="text-xl font-semibold">{section}</h3>
          <Separator />
          
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
            {sectionDocs.map((doc) => (
              <Card key={doc.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{doc.section}</CardTitle>
                    <div className="flex gap-2">
                      <Badge variant="outline" className={getPriorityColor(doc.priority)}>
                        {doc.priority}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(doc.implementation_status)}>
                        {doc.implementation_status}
                      </Badge>
                    </div>
                  </div>
                  {doc.related_components.length > 0 && (
                    <CardDescription>
                      Related: {doc.related_components.join(', ')}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="text-sm whitespace-pre-wrap">
                    {doc.content}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
