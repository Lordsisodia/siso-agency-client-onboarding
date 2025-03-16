
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Extracts the domain from a URL
 */
export function extractDomain(url: string): string {
  try {
    // Add protocol if missing
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    
    const hostname = new URL(url).hostname;
    return hostname.replace(/^www\./, '');
  } catch (e) {
    // If URL parsing fails, return the original input
    return url.replace(/^www\./, '');
  }
}

/**
 * Formats a JSON object into a pretty-printed string with syntax highlighting classes
 */
export function formatJsonWithHighlighting(json: any): string {
  if (typeof json !== 'object' || json === null) {
    return String(json);
  }
  
  return JSON.stringify(json, null, 2)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, 
      (match) => {
        let cls = 'text-yellow-400'; // number
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'text-purple-400'; // key
          } else {
            cls = 'text-green-400'; // string
          }
        } else if (/true|false/.test(match)) {
          cls = 'text-blue-400'; // boolean
        } else if (/null/.test(match)) {
          cls = 'text-red-400'; // null
        }
        return `<span class="${cls}">${match}</span>`;
      }
    );
}

/**
 * Safely attempts to parse JSON, returning null if parsing fails
 */
export function tryParseJson(jsonString: string): any | null {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.error("Failed to parse JSON:", e);
    return null;
  }
}

/**
 * Returns a truncated string with ellipsis if it exceeds maxLength
 */
export function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
}

/**
 * Validates if a string is a valid URL
 */
export function isValidUrl(url: string): boolean {
  try {
    // Add protocol if missing
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Extracts metadata from social media URLs
 */
export function extractSocialMediaInfo(url: string): { platform: string, username: string } | null {
  try {
    if (!url) return null;
    
    // Add protocol if missing
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.replace(/^www\./, '');
    
    // Extract platform and username
    if (hostname.includes('facebook.com')) {
      const username = urlObj.pathname.split('/')[1];
      return { platform: 'facebook', username };
    } else if (hostname.includes('twitter.com') || hostname.includes('x.com')) {
      const username = urlObj.pathname.split('/')[1];
      return { platform: 'twitter', username };
    } else if (hostname.includes('instagram.com')) {
      const username = urlObj.pathname.split('/')[1];
      return { platform: 'instagram', username };
    } else if (hostname.includes('linkedin.com')) {
      const paths = urlObj.pathname.split('/').filter(Boolean);
      if (paths[0] === 'in') {
        return { platform: 'linkedin', username: paths[1] };
      } else if (paths[0] === 'company') {
        return { platform: 'linkedin', username: paths[1] };
      }
      return { platform: 'linkedin', username: paths.join('/') };
    }
    
    return null;
  } catch (e) {
    console.error("Error extracting social media info:", e);
    return null;
  }
}
