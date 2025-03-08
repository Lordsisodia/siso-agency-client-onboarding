
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
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useAuthSession } from '@/hooks/useAuthSession';
import { useBasicUserData } from '@/hooks/useBasicUserData';
import { usePoints } from '@/hooks/usePoints';
import { supabase } from '@/integrations/supabase/client';

export function AppSidebar() {
  const location = useLocation();
  const { user } = useAuthSession();
  const { userData } = useBasicUserData();
  const { points, rank } = usePoints(userData.id || '');
  
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

  const displayName = userData.fullName || userData.email?.split('@')[0] || 'User';

  return (
    <Sidebar>
      <SidebarContent>
        {/* Logo section */}
        <div className="p-4 border-b border-siso-text/10 bg-gradient-to-r from-siso-bg to-siso-bg/95">
          <div className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/c5921a2f-8856-42f4-bec5-2d08b81c5691.png" 
              alt="Siso Logo" 
              className="w-8 h-8"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-siso-red to-siso-orange text-transparent bg-clip-text">
              SISO
            </span>
          </div>
        </div>

        {/* Navigation items */}
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
      
      {/* User profile section */}
      <div className="mt-auto p-4 border-t border-siso-text/10">
        <div className="flex items-center gap-3">
          {userData.avatarUrl ? (
            <Avatar>
              <AvatarImage src={supabase.storage.from('avatars').getPublicUrl(userData.avatarUrl).data.publicUrl} />
              <AvatarFallback>{displayName.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          ) : (
            <Avatar>
              <AvatarFallback className="bg-gradient-to-br from-siso-red/20 to-siso-orange/20">
                {displayName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}
          <div className="flex-1 text-left">
            <div className="font-medium text-siso-text-bold truncate">
              {displayName}
            </div>
            <div className="text-xs text-siso-text/70">
              {points} points • {rank}
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
