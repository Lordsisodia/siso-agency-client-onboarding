
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { getNavigationData } from './navigationData';
import { MenuSection, NavigationProps } from './types';
import { SidebarSeparator } from '@/components/ui/sidebar';

export const SidebarNavigation = ({ collapsed, onItemClick, visible }: NavigationProps) => {
  const { pathname } = useLocation();
  // Always show admin section regardless of auth status
  const isAdmin = true; // Force this to true to always show admin section
  const [navigationData, setNavigationData] = useState<MenuSection[]>([]);

  // Update navigation data to always include admin
  useEffect(() => {
    setNavigationData(getNavigationData(isAdmin));
  }, [isAdmin]);

  return (
    <div 
      className={cn(
        "flex flex-col gap-1 py-2",
        !visible && "hidden",
      )}
    >
      {navigationData.map((section, idx) => {
        if (section.type === 'main') {
          // Main navigation item
          return (
            <Link
              key={`main-${idx}`}
              to={section.href || '#'}
              className={cn(
                "flex items-center gap-3.5 px-3.5 py-2.5 rounded-md text-sm hover:bg-muted transition-colors",
                pathname === section.href && "bg-muted",
                collapsed && "justify-center"
              )}
              onClick={onItemClick}
            >
              <section.icon className="h-5 w-5" />
              {!collapsed && <span>{section.label}</span>}
            </Link>
          );
        }
        
        // Section with items
        return (
          <div key={`section-${idx}`} className="mb-1.5">
            {idx > 0 && <SidebarSeparator />}
            
            {!collapsed && section.title && (
              <h3 className="text-xs font-medium uppercase text-muted-foreground mt-3 mb-1 px-3.5">
                {section.title}
              </h3>
            )}
            
            {collapsed && section.title && (
              <div className="flex justify-center my-2">
                <section.icon className="h-5 w-5 text-muted-foreground" />
              </div>
            )}
            
            {section.items && section.items.map((item, itemIdx) => (
              <Link
                key={`item-${idx}-${itemIdx}`}
                to={item.href}
                className={cn(
                  "flex items-center gap-3.5 px-3.5 py-2.5 rounded-md text-sm hover:bg-muted transition-colors",
                  pathname === item.href && "bg-muted",
                  collapsed && "justify-center"
                )}
                onClick={onItemClick}
                target={item.isExternal ? "_blank" : undefined}
                rel={item.isExternal ? "noopener noreferrer" : undefined}
              >
                <item.icon className="h-5 w-5" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            ))}
          </div>
        );
      })}
    </div>
  );
};
