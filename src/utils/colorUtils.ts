
/**
 * Utility functions for working with colors
 */

/**
 * Calculate whether to use light or dark text on a given background color
 * @param hexColor - Hex color code (e.g. #FFFFFF)
 * @param opacity - Optional opacity for the returned color
 * @returns RGBA color string for text that will be readable on the background
 */
export function getContrastTextColor(hexColor: string, opacity: number = 1): string {
  if (!hexColor || hexColor.length < 6) {
    return `rgba(0, 0, 0, ${opacity})`;
  }

  try {
    // Convert hex to RGB
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Calculate luminance - using the formula: 0.299*R + 0.587*G + 0.114*B
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Return white or black based on background luminance
    return luminance > 0.5 ? 
      `rgba(0, 0, 0, ${opacity})` : 
      `rgba(255, 255, 255, ${opacity})`;
  } catch (e) {
    return `rgba(0, 0, 0, ${opacity})`;
  }
}

/**
 * Generate a complementary color
 * @param hexColor - Hex color code
 * @returns Complementary color hex code
 */
export function getComplementaryColor(hexColor: string): string {
  try {
    // Convert hex to RGB
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Get complement (255 - value)
    const rComp = 255 - r;
    const gComp = 255 - g;
    const bComp = 255 - b;
    
    // Convert back to hex
    return `#${rComp.toString(16).padStart(2, '0')}${gComp.toString(16).padStart(2, '0')}${bComp.toString(16).padStart(2, '0')}`;
  } catch (e) {
    return hexColor;
  }
}

/**
 * Create a color palette based on a primary color
 * @param primaryColor - Primary hex color code
 * @returns Object with various related colors
 */
export function generateColorPalette(primaryColor: string) {
  try {
    // Convert hex to RGB
    const hex = primaryColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Create light and dark variants
    const darken = (value: number, amount: number) => Math.max(0, Math.min(255, Math.floor(value * (1 - amount))));
    const lighten = (value: number, amount: number) => Math.max(0, Math.min(255, Math.floor(value + (255 - value) * amount)));
    
    // Calculate analogous colors (adjacent on color wheel)
    const toHex = (r: number, g: number, b: number) => 
      `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    
    // Create palette
    return {
      primary: primaryColor,
      complementary: getComplementaryColor(primaryColor),
      darker: toHex(darken(r, 0.3), darken(g, 0.3), darken(b, 0.3)),
      lighter: toHex(lighten(r, 0.3), lighten(g, 0.3), lighten(b, 0.3)),
      lightest: toHex(lighten(r, 0.6), lighten(g, 0.6), lighten(b, 0.6)),
      darkest: toHex(darken(r, 0.6), darken(g, 0.6), darken(b, 0.6)),
    };
  } catch (e) {
    return {
      primary: primaryColor,
      complementary: '#000000',
      darker: '#000000',
      lighter: '#FFFFFF',
      lightest: '#FFFFFF',
      darkest: '#000000',
    };
  }
}

/**
 * Check if a hex color is valid
 * @param color - Color to check
 * @returns Boolean indicating if color is valid
 */
export function isValidHexColor(color: string): boolean {
  return /^#([0-9A-F]{3}){1,2}$/i.test(color);
}

/**
 * Get an accessibility score for a color combination (foreground and background)
 * @param foreground - Foreground hex color
 * @param background - Background hex color
 * @returns Score from 1-5 based on WCAG guidelines
 */
export function getAccessibilityScore(foreground: string, background: string): number {
  try {
    // Convert to RGB
    const fg = foreground.replace('#', '');
    const bg = background.replace('#', '');
    
    const fgR = parseInt(fg.substring(0, 2), 16);
    const fgG = parseInt(fg.substring(2, 4), 16);
    const fgB = parseInt(fg.substring(4, 6), 16);
    
    const bgR = parseInt(bg.substring(0, 2), 16);
    const bgG = parseInt(bg.substring(2, 4), 16);
    const bgB = parseInt(bg.substring(4, 6), 16);
    
    // Calculate relative luminance for each color
    const getLuminance = (r: number, g: number, b: number) => {
      const a = [r, g, b].map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    };
    
    const fgLum = getLuminance(fgR, fgG, fgB);
    const bgLum = getLuminance(bgR, bgG, bgB);
    
    // Calculate contrast ratio
    const ratio = (Math.max(fgLum, bgLum) + 0.05) / (Math.min(fgLum, bgLum) + 0.05);
    
    // Return score based on WCAG guidelines
    if (ratio >= 7) return 5; // AAA - excellent
    if (ratio >= 4.5) return 4; // AA - good
    if (ratio >= 3) return 3; // AA for large text - fair
    if (ratio >= 2) return 2; // minimum for UI components - poor
    return 1; // insufficient contrast - bad
  } catch (e) {
    return 1;
  }
}
