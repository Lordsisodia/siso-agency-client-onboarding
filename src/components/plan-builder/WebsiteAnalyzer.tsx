
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { extractDomain } from '@/lib/utils';
import {
  Building2,
  Users,
  BarChart3,
  Globe,
  ArrowUpRight,
  Cog,
  Layers,
  PieChart,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface CompanyAnalysis {
  company: {
    name: string;
    description: string;
    industry: string;
    founded: string;
    size: string;
    location: string;
    website: string;
  };
  business: {
    products: string[];
    services: string[];
    target_audience: string;
    value_proposition: string;
    competitors: string[];
  };
  online_presence: {
    social_media: {
      platform: string;
      url: string;
      activity_level: string;
    }[];
    content_types: string[];
  };
  application_recommendations: {
    suggested_features: {
      name: string;
      description: string;
      priority: string;
    }[];
    design_recommendations: string[];
    integration_suggestions: string[];
  };
  confidence_score: number;
  data_sources: string[];
}

interface WebsiteAnalyzerProps {
  analysis: CompanyAnalysis | null;
  isLoading: boolean;
  error?: string | null;
}

export function WebsiteAnalyzer({ analysis, isLoading, error }: WebsiteAnalyzerProps) {
  if (error) {
    return (
      <Card className="bg-siso-bg-card/30 border-red-300 border-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2 text-red-500">
            <AlertCircle className="h-5 w-5" />
            Analysis Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-red-500">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="bg-siso-bg-card/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Cog className="h-5 w-5 animate-spin" />
            Analyzing Website
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">Company Information</div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Business Details</div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Product Recommendations</div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analysis) {
    return null;
  }

  const confidenceColor = analysis.confidence_score >= 0.7 
    ? "bg-green-100 text-green-800"
    : analysis.confidence_score >= 0.4
      ? "bg-yellow-100 text-yellow-800" 
      : "bg-red-100 text-red-800";

  return (
    <Card className="bg-siso-bg-card/30 animate-fade-in border-siso-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          Website Analysis Results
          <Badge className={confidenceColor} variant="outline">
            Confidence: {Math.round(analysis.confidence_score * 100)}%
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Company Information */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-medium border-b border-siso-border/30 pb-1">
            <Building2 className="h-4 w-4 text-siso-orange" />
            Company Information
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">{analysis.company.name}</p>
              <p className="text-siso-text-muted">{analysis.company.description}</p>
              <p className="mt-2">
                <span className="font-medium">Industry:</span> {analysis.company.industry}
              </p>
              <p>
                <span className="font-medium">Founded:</span> {analysis.company.founded}
              </p>
            </div>
            <div>
              <p>
                <span className="font-medium">Size:</span> {analysis.company.size}
              </p>
              <p>
                <span className="font-medium">Location:</span> {analysis.company.location}
              </p>
              <p>
                <span className="font-medium">Website:</span>{' '}
                <a
                  href={analysis.company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-siso-orange hover:underline flex items-center gap-1"
                >
                  {extractDomain(analysis.company.website)}
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Business Details */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-medium border-b border-siso-border/30 pb-1">
            <BarChart3 className="h-4 w-4 text-siso-orange" />
            Business Details
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">Products</p>
              <ul className="list-disc list-inside text-siso-text-muted">
                {analysis.business.products.map((product, i) => (
                  <li key={i}>{product}</li>
                ))}
              </ul>
              
              <p className="font-medium mt-2">Services</p>
              <ul className="list-disc list-inside text-siso-text-muted">
                {analysis.business.services.map((service, i) => (
                  <li key={i}>{service}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-medium">Target Audience</p>
              <p className="text-siso-text-muted">{analysis.business.target_audience}</p>
              
              <p className="font-medium mt-2">Value Proposition</p>
              <p className="text-siso-text-muted">{analysis.business.value_proposition}</p>
              
              <p className="font-medium mt-2">Competitors</p>
              <ul className="list-disc list-inside text-siso-text-muted">
                {analysis.business.competitors.map((competitor, i) => (
                  <li key={i}>{competitor}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Online Presence */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-medium border-b border-siso-border/30 pb-1">
            <Globe className="h-4 w-4 text-siso-orange" />
            Online Presence
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">Social Media</p>
              <ul className="list-none text-siso-text-muted">
                {analysis.online_presence.social_media.map((social, i) => (
                  <li key={i} className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="capitalize">
                      {social.platform}
                    </Badge>
                    <span className="text-xs">{social.activity_level} activity</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-medium">Content Types</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {analysis.online_presence.content_types.map((type, i) => (
                  <Badge key={i} variant="secondary" className="capitalize">
                    {type}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* App Recommendations */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-medium border-b border-siso-border/30 pb-1">
            <Layers className="h-4 w-4 text-siso-orange" />
            Application Recommendations
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-medium">Suggested Features</p>
              <div className="space-y-2 mt-1">
                {analysis.application_recommendations.suggested_features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Badge 
                      variant="outline" 
                      className={
                        feature.priority === "High" ? "bg-red-100 text-red-800 border-red-200" :
                        feature.priority === "Medium" ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                        "bg-green-100 text-green-800 border-green-200"
                      }
                    >
                      {feature.priority}
                    </Badge>
                    <div>
                      <p className="font-medium">{feature.name}</p>
                      <p className="text-siso-text-muted text-xs">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Design Recommendations</p>
                <ul className="list-disc list-inside text-siso-text-muted text-xs">
                  {analysis.application_recommendations.design_recommendations.map((rec, i) => (
                    <li key={i}>{rec}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium">Integration Suggestions</p>
                <ul className="list-disc list-inside text-siso-text-muted text-xs">
                  {analysis.application_recommendations.integration_suggestions.map((int, i) => (
                    <li key={i}>{int}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Data Sources */}
        <div className="mt-4 text-xs text-siso-text-muted border-t border-siso-border/30 pt-2">
          <p className="font-medium flex items-center gap-1">
            <PieChart className="h-3 w-3" />
            Data Sources
          </p>
          <ul className="list-disc list-inside">
            {analysis.data_sources.map((source, i) => (
              <li key={i}>{source}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
