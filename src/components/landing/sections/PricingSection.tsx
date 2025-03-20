
import { Pricing } from '@/components/ui/pricing';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const PricingSection = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => navigate('/auth');

  const pricingPlans = [
    {
      name: "FREE ACCESS",
      price: "0",
      yearlyPrice: "0",
      period: "per month",
      features: [
        "Complete Platform Access",
        "Enterprise-grade AI automation suite",
        "Unlimited platform integrations",
        "Regular feature updates",
        "Community support"
      ],
      description: "For early adopters - first 1,000 agencies",
      buttonText: "Claim Free Access",
      href: "/auth",
      isPopular: true,
    },
    {
      name: "STANDARD",
      price: "249",
      yearlyPrice: "199",
      period: "per year",
      features: [
        "Everything in Free Access",
        "Priority support",
        "Strategy sessions",
        "Advanced analytics",
        "Expanded resources",
        "Custom integrations"
      ],
      description: "For growing agencies scaling with AI",
      buttonText: "Get Started",
      href: "/auth",
      isPopular: false,
    },
    {
      name: "ENTERPRISE",
      price: "999",
      yearlyPrice: "799",
      period: "per year",
      features: [
        "Everything in Standard",
        "Dedicated account manager",
        "Custom development support",
        "White-label solutions",
        "Advanced security features",
        "Unlimited resources"
      ],
      description: "For established agencies needing full customization",
      buttonText: "Contact Sales",
      href: "/contact",
      isPopular: false,
    }
  ];

  return (
    <section id="pricing" className="relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-siso-orange via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-siso-red via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative max-w-6xl mx-auto"
        >
          <Pricing
            plans={pricingPlans}
            title="Exclusive Early Access Pricing"
            description="After the first 1,000 agencies, standard pricing will apply.
Lock in your free access now!"
          />
        </motion.div>
      </div>
    </section>
  );
};
