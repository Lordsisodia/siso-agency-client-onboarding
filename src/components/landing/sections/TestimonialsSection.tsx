
import { Gallery4 } from '@/components/ui/gallery4';

const caseStudyItems = [
  {
    id: "netflix",
    title: "Netflix: Streaming Platform Redesign",
    description:
      "A complete UX/UI overhaul of Netflix's streaming platform, focusing on personalization algorithms and recommendation systems that increased user engagement by 42% and reduced churn rate by 15%.",
    href: "https://netflix.com",
    image:
      "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "spotify",
    title: "Spotify: AI-Powered Music Discovery",
    description:
      "Implementation of advanced AI algorithms for Spotify's discovery feature that analyzes listening patterns and creates personalized playlists, resulting in a 37% increase in daily active users and 28% more time spent in-app.",
    href: "https://spotify.com",
    image:
      "https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "airbnb",
    title: "Airbnb: Seamless Booking Experience",
    description:
      "Redesigned Airbnb's booking flow with an emphasis on trust and transparency, incorporating verified reviews and 360° property tours. This resulted in a 53% conversion rate improvement and 24% increase in first-time bookings.",
    href: "https://airbnb.com",
    image:
      "https://images.unsplash.com/photo-1501876725168-00c445821c9e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "uber",
    title: "Uber: Real-time Driver Mapping System",
    description:
      "Developed a sophisticated real-time mapping system for Uber that optimizes driver routes and predicts high-demand areas before they occur. This system reduced average wait times by 31% and increased driver earnings by 18%.",
    href: "https://uber.com",
    image:
      "https://images.unsplash.com/photo-1581515286348-98549702050f?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "slack",
    title: "Slack: Enterprise Communication Hub",
    description:
      "Created a centralized communication solution for a Fortune 500 company, integrating Slack with 27 internal tools and automating workflows. This implementation reduced internal email by 71% and improved project completion time by 32%.",
    href: "https://slack.com",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "doordash",
    title: "DoorDash: Order Tracking Optimization",
    description:
      "Revolutionized DoorDash's order tracking system with live updates and accurate delivery estimates using machine learning algorithms. The enhanced system improved customer satisfaction ratings by 47% and increased repeat orders by 29%.",
    href: "https://doordash.com",
    image:
      "https://images.unsplash.com/photo-1593246049226-ded77bf90326?q=80&w=2235&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-16 w-full max-w-full overflow-hidden bg-gradient-to-b from-black/40 to-black/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Gallery4 
          title="Success Stories" 
          description="Discover how leading companies have transformed their digital experiences with our solutions. These case studies showcase measurable results and innovative approaches."
          items={caseStudyItems}
        />
      </div>
    </section>
  );
};

export default TestimonialsSection;
