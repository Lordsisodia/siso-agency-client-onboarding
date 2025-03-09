
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Building, Globe } from "lucide-react";

interface CompanyIdentityStepProps {
  companyName: string;
  setCompanyName: (value: string) => void;
  websiteUrl: string;
  setWebsiteUrl: (value: string) => void;
  businessType: string;
  setBusinessType: (value: string) => void;
}

export function CompanyIdentityStep({
  companyName,
  setCompanyName,
  websiteUrl,
  setWebsiteUrl,
  businessType,
  setBusinessType,
}: CompanyIdentityStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Tell us about your company</h2>
        <p className="text-muted-foreground">Let's start with some basic information</p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="companyName" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Company Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="e.g. Acme Inc."
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="websiteUrl" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Website or Social Media URL
          </Label>
          <Input
            id="websiteUrl"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            placeholder="e.g. https://example.com"
            type="url"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="businessType" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Business Type
          </Label>
          <Input
            id="businessType"
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            placeholder="e.g. E-commerce, Healthcare, Education"
          />
        </div>
      </div>
    </div>
  );
}
