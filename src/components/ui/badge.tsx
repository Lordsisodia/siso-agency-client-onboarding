
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
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
        success: 
          "border-transparent bg-green-500 text-white hover:bg-green-600",
        warning:
          "border-transparent bg-yellow-500 text-white hover:bg-yellow-600",
        gradient:
          "border-transparent bg-gradient-to-r from-blue-500 to-purple-600 text-white",
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
  glow?: boolean;
  animated?: boolean;
}

function Badge({ className, variant, glow, animated, ...props }: BadgeProps) {
  const glowClasses = glow ? "shadow-md shadow-current/25" : "";
  const animatedClasses = animated ? "animate-pulse" : "";
  
  return (
    <div className={cn(badgeVariants({ variant }), glowClasses, animatedClasses, className)} {...props} />
  )
}

export { Badge, badgeVariants }
