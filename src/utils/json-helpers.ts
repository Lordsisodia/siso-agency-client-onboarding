
import { Json } from '@/integrations/supabase/types';

/**
 * Safely extracts array data from a JSON field
 * @param json The JSON data from Supabase
 * @returns The array or an empty array if invalid
 */
export function safeJsonArray<T>(json: Json | null | undefined): T[] {
  if (!json) return [];
  
  try {
    if (Array.isArray(json)) {
      return json as unknown as T[];
    }
    return [];
  } catch (error) {
    console.error('Error parsing JSON array:', error);
    return [];
  }
}

/**
 * Safely gets a property from a JSON object
 * @param json The JSON data
 * @param key The property key to access
 * @param defaultValue Default value if property doesn't exist
 * @returns The property value or default value
 */
export function safeJsonProperty<T>(
  json: Json | null | undefined, 
  key: string, 
  defaultValue: T
): T {
  if (!json || typeof json !== 'object' || json === null || Array.isArray(json)) {
    return defaultValue;
  }
  
  try {
    const obj = json as Record<string, any>;
    return (key in obj && obj[key] !== undefined) ? (obj[key] as T) : defaultValue;
  } catch (error) {
    console.error(`Error accessing JSON property ${key}:`, error);
    return defaultValue;
  }
}

/**
 * Safely converts a JSON value to a Record object
 * @param json The JSON data
 * @returns The object or an empty object if invalid
 */
export function safeJsonObject(json: Json | null | undefined): Record<string, any> {
  if (!json) return {};
  
  try {
    if (typeof json === 'object' && json !== null && !Array.isArray(json)) {
      return json as Record<string, any>;
    }
    return {};
  } catch (error) {
    console.error('Error parsing JSON object:', error);
    return {};
  }
}
