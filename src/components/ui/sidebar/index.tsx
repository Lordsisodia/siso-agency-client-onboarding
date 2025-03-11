
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

import { SidebarProvider, useSidebar } from "./sidebar-context"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger
} from "./sidebar-components"
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from "./sidebar-menu"

// Wrapper component that provides the TooltipProvider
const SidebarRoot = ({ className, ...props }: React.ComponentProps<typeof SidebarProvider>) => {
  return (
    <SidebarProvider 
      className={cn("group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar", className)} 
      {...props}
    >
      <TooltipProvider delayDuration={0}>
        {props.children}
      </TooltipProvider>
    </SidebarProvider>
  )
}
SidebarRoot.displayName = "SidebarRoot"

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider, // Add SidebarProvider to exports
  SidebarRail,
  SidebarRoot,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}
