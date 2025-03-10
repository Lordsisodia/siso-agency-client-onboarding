
import { ChevronDown, ChevronRight, Link, Users, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarLogoProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  onLogoClick: () => void;
  showAlternateMenu: boolean;
}

export const SidebarLogo = ({ 
  collapsed, 
  setCollapsed, 
  onLogoClick, 
  showAlternateMenu 
}: SidebarLogoProps) => {
  const businessLinks = [
    {
      name: 'SISO LinkedIn Sales Team',
      description: 'Automate and earn from LinkedIn B2B deal closing',
      icon: <Link className="w-5 h-5" />,
      url: 'https://sisosaas.framer.website/',
    },
    {
      name: 'SISO Resource Hub',
      description: 'Access our comprehensive suite of tools and resources',
      icon: <Users className="w-5 h-5" />,
      url: '/resource-hub',
    },
    {
      name: 'SISO Apparel',
      description: 'Exclusive clothing brand for business leaders',
      icon: <ShoppingBag className="w-5 h-5" />,
      url: 'https://sisoapparel.framer.website/',
    },
  ];

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    onLogoClick();
  };

  const handleToggleCollapse = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    setCollapsed(!collapsed);
  };

  return (
    <div className="p-4 border-b border-siso-text/10 bg-gradient-to-r from-siso-bg to-siso-bg/95">
      {showAlternateMenu ? (
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="hover:bg-siso-text/5"
            >
              <ArrowLeft className="w-5 h-5 text-siso-text" />
            </Button>
            <div className="relative">
              <img 
                src="/lovable-uploads/c5921a2f-8856-42f4-bec5-2d08b81c5691.png" 
                alt="Siso Logo" 
                className="w-10 h-10 object-contain rounded-full p-0.5 bg-gradient-to-tr from-siso-red/30 to-siso-orange/30"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-siso-red to-siso-orange rounded-full border-2 border-siso-bg" />
            </div>
          </div>

          <div className="space-y-6">
            {/* Welcome Message */}
            <div className="rounded-xl bg-gradient-to-br from-siso-red/5 to-siso-orange/5 p-4 border border-siso-text/10">
              <h3 className="font-medium text-base mb-2 bg-gradient-to-r from-siso-red to-siso-orange text-transparent bg-clip-text">
                Welcome to SISO AGENCY
              </h3>
              <p className="text-sm text-siso-text/80 leading-relaxed">
                Discover our suite of powerful tools and exclusive offerings designed for business growth and success
              </p>
            </div>

            {/* Business Links */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-wider text-siso-text/50 px-1 font-medium">
                Our Solutions
              </h4>
              {businessLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.url}
                  target={link.url.startsWith('http') ? "_blank" : "_self"}
                  rel={link.url.startsWith('http') ? "noopener noreferrer" : ""}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gradient-to-r from-siso-red/10 to-siso-orange/10 transition-all duration-300 group cursor-pointer"
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    opacity: 0,
                    animation: 'fade-in 0.5s ease-out forwards'
                  }}
                >
                  <div className="p-2.5 rounded-lg bg-gradient-to-r from-siso-red/10 to-siso-orange/10 group-hover:from-siso-red/20 group-hover:to-siso-orange/20 transition-colors shadow-sm">
                    <div className="text-siso-red/90 group-hover:text-siso-red transition-colors">
                      {link.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-siso-text group-hover:text-siso-text-bold transition-colors">
                      {link.name}
                    </h3>
                    <p className="text-xs leading-tight text-siso-text/70 mt-1 group-hover:text-siso-text/90 transition-colors">
                      {link.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
            
            {/* Footer */}
            <div className="mt-auto pt-4">
              <div className="text-center">
                <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-siso-red/10 to-siso-orange/10 text-xs text-siso-text/80">
                  <span className="mr-1">🚀</span> Powered by SISO AGENCY
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={toggleMenu}
          >
            <img 
              src="/lovable-uploads/c5921a2f-8856-42f4-bec5-2d08b81c5691.png" 
              alt="Siso Logo" 
              className="w-8 h-8"
            />
            {!collapsed && (
              <span className="text-xl font-bold bg-gradient-to-r from-siso-red to-siso-orange text-transparent bg-clip-text">
                SISO
              </span>
            )}
          </div>
          {/* Only show collapse button in regular navigation mode */}
          <button
            onClick={handleToggleCollapse}
            className="p-2 hover:bg-siso-text/5 rounded-lg transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="text-siso-text" />
            ) : (
              <ChevronDown className="text-siso-text" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};
