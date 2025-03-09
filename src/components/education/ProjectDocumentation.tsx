
import React, { useState, useEffect } from 'react';
import { useProjectDocumentation } from '@/hooks/useProjectDocumentation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { FileText, Tag, CheckCircle, AlertCircle, Clock } from 'lucide-react';

export const ProjectDocumentation: React.FC = () => {
  const { docs, loading, error } = useProjectDocumentation();
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  useEffect(() => {
    if (docs.length > 0 && !selectedSection) {
      setSelectedSection(docs[0].section);
    }
  }, [docs, selectedSection]);

  // Filter docs by selected section
  const filteredDocs = selectedSection
    ? docs.filter(doc => doc.section === selectedSection)
    : docs;

  // Get unique sections
  const sections = [...new Set(docs.map(doc => doc.section))];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex overflow-x-auto gap-2 pb-2">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-8 w-32" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-40 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-2" />
        <h3 className="text-lg font-semibold mb-2">Error Loading Documentation</h3>
        <p className="text-siso-text/70 mb-4">{error}</p>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-amber-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-siso-text/50" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/10 text-red-500 border-red-500/30';
      case 'medium':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/30';
      case 'low':
        return 'bg-green-500/10 text-green-500 border-green-500/30';
      default:
        return 'bg-blue-500/10 text-blue-500 border-blue-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Section selector */}
      <div className="flex overflow-x-auto gap-2 pb-2">
        {sections.map(section => (
          <Badge
            key={section}
            variant={selectedSection === section ? "default" : "outline"}
            className="cursor-pointer text-xs py-1 px-3"
            onClick={() => setSelectedSection(section)}
          >
            {section}
          </Badge>
        ))}
      </div>

      {/* Documentation cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocs.map(doc => (
          <Card key={doc.id} className="border border-siso-border/50 hover:border-siso-border transition-colors">
            <CardHeader className="pb-2 flex flex-row justify-between items-start">
              <div className="flex gap-2 items-center">
                <FileText className="h-5 w-5 text-siso-text/70" />
                <CardTitle className="text-base">{doc.section}</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex gap-1 items-center text-xs text-siso-text/70">
                  {getStatusIcon(doc.implementation_status)}
                  <span>{doc.implementation_status}</span>
                </span>
                <Badge className={`text-xs ${getPriorityColor(doc.priority)}`}>
                  {doc.priority}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-siso-text/80 mb-3 line-clamp-3">{doc.content}</p>
              {doc.related_components.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-2">
                  {doc.related_components.map((component, idx) => (
                    <div key={idx} className="flex items-center text-xs bg-siso-bg-card/50 px-2 py-1 rounded-md text-siso-text/60">
                      <Tag className="h-3 w-3 mr-1 text-siso-text/40" />
                      {component}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
