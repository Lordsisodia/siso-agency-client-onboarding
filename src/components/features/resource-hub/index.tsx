
import { ResourceHubProps } from "./types";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const ResourceHub = ({
  badge = "SISO Agency",
  heading = "Resource Hub Features",
  description = "Access our comprehensive suite of tools and insights designed to accelerate your agency's growth.",
  tabs = []
}: ResourceHubProps) => {
  return (
    <section className="relative py-24">
      <div className="absolute inset-0 bg-gradient-radial from-siso-orange/10 via-transparent to-transparent opacity-30" />

      <div className="relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-siso-orange mb-2">{badge}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-siso-text-bold mb-4">{heading}</h2>
            <p className="text-siso-text/70 max-w-2xl mx-auto">{description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tabs.map((tab) => (
              <motion.div
                key={tab.value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col h-full"
              >
                <Card className="p-6 rounded-xl border border-siso-orange/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm hover:border-siso-orange/40 transition-all h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-gradient-to-br from-siso-red/20 to-siso-orange/20 w-10 h-10 rounded-lg flex items-center justify-center">
                      {tab.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-siso-text-bold">{tab.label}</h3>
                  </div>
                  <p className="text-siso-text/70 mb-6">{tab.content.description}</p>
                  <div className="aspect-video rounded-lg overflow-hidden mb-4 mt-auto">
                    <img 
                      src={tab.content.imageSrc} 
                      alt={tab.content.imageAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-siso-red to-siso-orange hover:from-siso-red/90 hover:to-siso-orange/90">
                    {tab.content.buttonText}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
