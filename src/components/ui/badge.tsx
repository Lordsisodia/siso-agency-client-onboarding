
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        success: "border-transparent bg-green-500 text-white hover:bg-green-600",
        warning: "border-transparent bg-yellow-500 text-white hover:bg-yellow-600",
        info: "border-transparent bg-blue-500 text-white hover:bg-blue-600",
        gradient: "border-transparent bg-gradient-to-r from-siso-red to-siso-orange text-white shadow-sm shadow-siso-red/20",
        pulse: "border-transparent bg-gradient-to-r from-siso-red to-siso-orange text-white animate-pulse",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
    animated?: boolean;
    glow?: boolean;
}

function Badge({ className, variant, animated = false, glow = false, ...props }: BadgeProps) {
  const Component = animated ? motion.div : "div";
  
  return (
    <Component
      className={cn(
        badgeVariants({ variant }), 
        glow && "relative after:absolute after:inset-0 after:rounded-full after:blur-md after:bg-inherit after:opacity-70 after:-z-10", 
        className
      )}
      {...(animated ? {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: { type: "spring", stiffness: 500, damping: 10 },
        whileHover: { scale: 1.05, y: -2 },
        whileTap: { scale: 0.95 }
      } : {})}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
