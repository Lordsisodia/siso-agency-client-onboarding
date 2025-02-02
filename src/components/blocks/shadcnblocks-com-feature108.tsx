import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layout, Pointer, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TabContent {
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  imageSrc: string;
  imageAlt: string;
}

interface Tab {
  value: string;
  icon: React.ReactNode;
  label: string;
  content: TabContent;
}

interface Feature108Props {
  badge?: string;
  heading?: string;
  description?: string;
  tabs?: Tab[];
}

const Feature108 = ({
  badge = "SISO Agency",
  heading = "Empowering Agencies with AI-Driven Solutions",
  description = "Access curated tools, education, and networking resources to scale your agency.",
  tabs = [
    {
      value: "tab-1",
      icon: <Zap className="h-auto w-4 shrink-0" />,
      label: "AI Tools",
      content: {
        badge: "Modern Solutions",
        title: "Supercharge Your Agency Growth",
        description:
          "Access our curated collection of AI tools and platforms designed specifically for agency needs, helping you automate tasks and scale operations efficiently.",
        buttonText: "Explore Tools",
        imageSrc: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
        imageAlt: "AI Tools for Agencies",
      },
    },
    {
      value: "tab-2",
      icon: <Pointer className="h-auto w-4 shrink-0" />,
      label: "Education Hub",
      content: {
        badge: "Expert Knowledge",
        title: "Learn from Industry Leaders",
        description:
          "Get access to exclusive educational content, tutorials, and best practices from successful agency owners and digital marketing experts.",
        buttonText: "Start Learning",
        imageSrc: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
        imageAlt: "Education Resources",
      },
    },
    {
      value: "tab-3",
      icon: <Layout className="h-auto w-4 shrink-0" />,
      label: "Network & Grow",
      content: {
        badge: "Community Power",
        title: "Connect with Agency Leaders",
        description:
          "Join our thriving community of agency owners, share experiences, and build valuable partnerships that drive growth and innovation.",
        buttonText: "Join Network",
        imageSrc: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
        imageAlt: "Networking",
      },
    },
  ],
}: Feature108Props) => {
  return (
    <section className="py-32">
      <div>
        <div className="container flex flex-col items-center gap-4 text-center">
          <Badge variant="outline">{badge}</Badge>
          <h1 className="max-w-2xl text-3xl font-semibold md:text-4xl">
            {heading}
          </h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div>
          <Tabs defaultValue={tabs[0].value} className="mt-8">
            <TabsList className="container flex flex-col items-center justify-center gap-4 sm:flex-row md:gap-10">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground data-[state=active]:bg-muted data-[state=active]:text-primary"
                >
                  {tab.icon} {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="container mt-8 max-w-screen-xl rounded-2xl bg-muted/70 p-6 lg:p-16">
              {tabs.map((tab) => (
                <TabsContent
                  key={tab.value}
                  value={tab.value}
                  className="grid place-items-center gap-20 lg:grid-cols-2 lg:gap-10"
                >
                  <div className="flex flex-col gap-5">
                    <Badge variant="outline" className="w-fit bg-background">
                      {tab.content.badge}
                    </Badge>
                    <h3 className="text-3xl font-semibold lg:text-5xl">
                      {tab.content.title}
                    </h3>
                    <p className="text-muted-foreground lg:text-lg">
                      {tab.content.description}
                    </p>
                    <Button className="mt-2.5 w-fit gap-2" size="lg">
                      {tab.content.buttonText}
                    </Button>
                  </div>
                  <img
                    src={tab.content.imageSrc}
                    alt={tab.content.imageAlt}
                    className="rounded-xl object-cover w-full h-[400px]"
                  />
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export { Feature108 };