
"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer group inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-siso-red data-[state=checked]:to-siso-orange data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <motion.div className="absolute w-11 h-6 rounded-full opacity-0 group-hover:opacity-20 bg-siso-orange/20" 
      layoutId="switchHover"
      transition={{ type: "spring", bounce: 0.2 }}
    />
    <SwitchPrimitives.Thumb asChild>
      <motion.div
        className="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0"
        layout
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
        whileTap={{ scale: 0.9 }}
      />
    </SwitchPrimitives.Thumb>
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
