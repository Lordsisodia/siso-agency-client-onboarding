
import React from 'react';
import { SidebarRoot } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Search, Users, Globe, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

const CompetitiveAnalysis: React.FC = () => {
  return (
    <ProtectedRoute>
      <SidebarRoot>
        <div className="container mx-auto py-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight">Competitive Analysis</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Search className="h-4 w-4 mr-2" />
                Search Competitors
              </Button>
              <Button>
                <Zap className="h-4 w-4 mr-2" />
                Quick Analysis
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="companies">Companies</TabsTrigger>
              <TabsTrigger value="market">Market Analysis</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Tracked Competitors
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground mt-1">+2 from last month</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Market Share
                    </CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">23.5%</div>
                    <p className="text-xs text-muted-foreground mt-1">+1.2% from last quarter</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Industry Growth
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">7.8%</div>
                    <p className="text-xs text-muted-foreground mt-1">Annual projection</p>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Competitive Landscape</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border border-dashed rounded-lg">
                    <p className="text-muted-foreground">Competitive analysis chart will appear here</p>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Competitors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {['Competitor A', 'Competitor B', 'Competitor C', 'Competitor D'].map((competitor, index) => (
                        <li key={index} className="flex items-center justify-between border-b pb-2">
                          <span>{competitor}</span>
                          <Button variant="ghost" size="sm">View Details</Button>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Market Changes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {[
                        'New entrant in premium segment',
                        'Competitor A launched new product line',
                        'Market expansion in APAC region',
                        'Regulatory changes affecting industry'
                      ].map((change, index) => (
                        <li key={index} className="flex items-center border-b pb-2">
                          <span className="text-sm">{change}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="companies" className="mt-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Competitor Profiles</CardTitle>
                    <div className="flex gap-2">
                      <Input placeholder="Search competitors..." className="w-64" />
                      <Button variant="outline" size="sm">
                        <Globe className="h-4 w-4 mr-2" />
                        Add New
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[600px] flex items-center justify-center border border-dashed rounded-lg">
                    <p className="text-muted-foreground">Competitor companies list will appear here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="market" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Market Analysis Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[600px] flex items-center justify-center border border-dashed rounded-lg">
                    <p className="text-muted-foreground">Market analysis charts and data will appear here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="trends" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Industry Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[600px] flex items-center justify-center border border-dashed rounded-lg">
                    <p className="text-muted-foreground">Industry trend charts and analysis will appear here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarRoot>
    </ProtectedRoute>
  );
};

export default CompetitiveAnalysis;
