
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from '@/components/ui/sidebar';
import { menuSections } from '@/components/sidebar/navigationData';
import { LucideIcon } from 'lucide-react';

export function AppSidebar() {
  const location = useLocation();
  
  // Improved route matching logic
  const isItemActive = (href: string, isMainRoute: boolean = false) => {
    // Remove trailing slashes for consistency
    const currentPath = location.pathname.replace(/\/$/, '');
    const targetPath = href.replace(/\/$/, '');

    // Check if the current path exactly matches the target path
    const exactMatch = currentPath === targetPath;
    
    // Check if the current path is a child of the target path
    const isChildPath = currentPath.startsWith(targetPath + '/');
    
    // For main routes, match both exact and child routes
    if (isMainRoute) {
      return exactMatch || isChildPath;
    }
    
    // For section items, use strict matching by default
    return exactMatch;
  };

  return (
    <Sidebar>
      <SidebarContent>
        {menuSections.map((section, sectionIndex) => (
          <SidebarGroup key={sectionIndex}>
            {section.type === 'section' && (
              <SidebarGroupLabel asChild>
                <div className="flex items-center gap-2">
                  <section.icon className="h-4 w-4" />
                  <span>{section.title}</span>
                </div>
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {section.type === 'main' ? (
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isItemActive(section.href!, true)}
                      tooltip={section.label}
                    >
                      <Link to={section.href!}>
                        <section.icon />
                        <span>{section.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ) : (
                  section.items?.map((item, itemIndex) => (
                    <SidebarMenuItem key={itemIndex}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={isItemActive(item.href)}
                        tooltip={item.label}
                      >
                        <Link to={item.href}>
                          <item.icon />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
