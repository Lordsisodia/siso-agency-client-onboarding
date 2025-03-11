
import { useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Star, TrendingUp } from 'lucide-react';

export default function Leaderboards() {
  useEffect(() => {
    document.title = 'Leaderboards | SISO Platform';
  }, []);

  const users = [
    { id: 1, name: 'Alex Johnson', points: 9850, level: 42, avatar: '/lovable-uploads/3b17a23d-630e-4e55-94bf-9d6fef9e6fc4.png', badge: 'Top Contributor' },
    { id: 2, name: 'Maya Wilson', points: 8720, level: 37, avatar: '/lovable-uploads/c482563a-42db-4f47-83f2-c2e7771400b7.png', badge: 'Project Expert' },
    { id: 3, name: 'Daniel Lee', points: 7650, level: 35, avatar: '/lovable-uploads/a5a9f5ad-aef3-4379-890d-fb6cef603cce.png', badge: 'Rising Star' },
    { id: 4, name: 'Sarah Miller', points: 6820, level: 31, avatar: '/lovable-uploads/19ca8c73-3736-4506-bfb2-de867b272e12.png', badge: 'Mentor' },
    { id: 5, name: 'James Chen', points: 5930, level: 28, avatar: '/lovable-uploads/05fd06bb-d4a1-4caf-81e9-3572f608b3a6.png', badge: 'Innovator' },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 overflow-auto bg-background">
        <main className="container mx-auto py-6 px-4 md:px-6">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Leaderboards</h1>
              <p className="text-muted-foreground mt-2">
                See how you rank against other users on the platform
              </p>
            </div>

            <Tabs defaultValue="points">
              <TabsList className="mb-6">
                <TabsTrigger value="points">Points</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="contributions">Contributions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="points" className="space-y-4">
                <Card className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <Trophy className="h-8 w-8 text-amber-500" />
                    <h2 className="text-2xl font-semibold">Points Leaderboard</h2>
                  </div>
                  
                  <div className="rounded-lg border">
                    <div className="grid grid-cols-12 bg-muted p-4 rounded-t-lg font-medium">
                      <div className="col-span-1">Rank</div>
                      <div className="col-span-6">User</div>
                      <div className="col-span-2 text-center">Level</div>
                      <div className="col-span-3 text-right">Points</div>
                    </div>
                    
                    {users.map((user, index) => (
                      <div key={user.id} className="grid grid-cols-12 p-4 border-t items-center">
                        <div className="col-span-1 font-semibold">{index + 1}</div>
                        <div className="col-span-6 flex items-center gap-3">
                          <Avatar className="h-10 w-10 border-2 border-primary/10">
                            <img src={user.avatar} alt={user.name} />
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <Badge variant="outline" className="mt-1">{user.badge}</Badge>
                          </div>
                        </div>
                        <div className="col-span-2 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                            <span>{user.level}</span>
                          </div>
                        </div>
                        <div className="col-span-3 text-right font-semibold">
                          <div className="flex items-center justify-end gap-1">
                            <TrendingUp className="h-4 w-4 text-green-500" />
                            <span>{user.points.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="projects">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Project Completion Leaderboard</h3>
                  <p className="text-muted-foreground">
                    Project leaderboard will be available after the first project cycle completes.
                  </p>
                </Card>
              </TabsContent>
              
              <TabsContent value="contributions">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Community Contributions</h3>
                  <p className="text-muted-foreground">
                    Community contribution metrics are being calculated. Check back soon!
                  </p>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
