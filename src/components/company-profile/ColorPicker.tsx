
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CheckIcon, RefreshCw, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
  className?: string;
  isHighlighted?: boolean;
  suggestedColors?: string[];
}

export function ColorPicker({ 
  label, 
  color, 
  onChange, 
  className,
  isHighlighted = false,
  suggestedColors = []
}: ColorPickerProps) {
  const { toast } = useToast();
  const [localColor, setLocalColor] = useState(color);
  const [isOpen, setIsOpen] = useState(false);
  
  // Predefined palette of complementary/harmonious colors
  const defaultSuggestedColors = [
    '#6E59A5', // Purple
    '#9b87f5', // Light Purple
    '#D6BCFA', // Lavender
    '#F97316', // Orange
    '#0EA5E9', // Blue
    '#8B5CF6', // Vivid Purple
    '#D946EF', // Magenta
    '#10B981', // Green
    '#EC4899', // Pink
    '#F59E0B', // Amber
  ];
  
  // Combine user-provided suggested colors with defaults
  const allSuggestedColors = [...suggestedColors, ...defaultSuggestedColors.slice(0, 10 - suggestedColors.length)];

  // Update local state when the parent color changes
  useEffect(() => {
    setLocalColor(color);
  }, [color]);

  // Handle color input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setLocalColor(newColor);
    
    // Only propagate valid color values to parent
    if (/^#([0-9A-F]{3}){1,2}$/i.test(newColor)) {
      onChange(newColor);
    }
  };

  // Handle color picker change
  const handlePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setLocalColor(newColor);
    onChange(newColor);
  };

  // Choose a suggested color
  const selectSuggestedColor = (suggestedColor: string) => {
    setLocalColor(suggestedColor);
    onChange(suggestedColor);
    setIsOpen(false);
  };

  // Generate random color
  const generateRandomColor = () => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    setLocalColor(randomColor);
    onChange(randomColor);
    
    toast({
      title: "Random Color Generated",
      description: `New color: ${randomColor}`,
    });
  };

  // Copy color to clipboard
  const copyColorToClipboard = () => {
    navigator.clipboard.writeText(localColor);
    
    toast({
      title: "Color Copied",
      description: `${localColor} copied to clipboard`,
    });
  };

  // Calculate text color for contrast
  const getContrastColor = (hexColor: string) => {
    // Convert hex to RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    
    // Calculate luminance - simplified formula
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Return black for light colors, white for dark colors
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label className="block text-sm font-medium text-siso-text/70">{label}</Label>
      
      <div className="flex items-center gap-3">
        <div className="relative">
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button 
                type="button" 
                variant="outline" 
                size="icon"
                className={cn(
                  "w-10 h-10 rounded-lg border p-0 cursor-pointer transition-all duration-200 hover:scale-105",
                  isHighlighted ? "border-green-500/50 shadow-[0_0_8px_rgba(34,197,94,0.3)]" : "border-siso-orange/20"
                )}
                style={{ 
                  backgroundColor: localColor,
                  borderWidth: isHighlighted ? '2px' : '1px' 
                }}
                aria-label={`Select ${label} color`}
              >
                <span className="sr-only">Select color</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-3" side="right">
              <div className="space-y-3">
                <div className="mb-2">
                  <h4 className="text-sm font-medium mb-2">Custom Color</h4>
                  <Input 
                    type="color"
                    value={localColor}
                    onChange={handlePickerChange}
                    className="h-8 w-full p-1 cursor-pointer"
                  />
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Suggested Colors</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {allSuggestedColors.map((suggestedColor, index) => (
                      <Button
                        key={index}
                        type="button"
                        variant="outline"
                        size="icon"
                        className="w-8 h-8 p-0 rounded-md border border-gray-300/20"
                        style={{ backgroundColor: suggestedColor }}
                        onClick={() => selectSuggestedColor(suggestedColor)}
                      >
                        {suggestedColor === localColor && (
                          <CheckIcon 
                            className="h-4 w-4" 
                            style={{ color: getContrastColor(suggestedColor) }}
                          />
                        )}
                        <span className="sr-only">Select color {suggestedColor}</span>
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between pt-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={generateRandomColor}
                  >
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Random
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    className="text-xs"
                    onClick={copyColorToClipboard}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        
        <Input 
          type="text"
          value={localColor}
          onChange={handleInputChange}
          className={cn(
            "flex-1 p-3 rounded-lg text-siso-text focus:border-siso-orange/50 focus:outline-none",
            isHighlighted 
              ? "border-green-500/50 bg-green-500/5" 
              : "border-siso-orange/20 bg-black/20"
          )}
          placeholder="#000000"
        />
      </div>
      
      <div 
        className="h-8 w-full rounded-lg transition-all duration-300 mt-1 shadow-sm"
        style={{ backgroundColor: localColor }}
      />
    </div>
  );
}
