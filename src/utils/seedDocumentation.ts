
import { supabase } from "@/integrations/supabase/client";

export const importDocumentationData = async (): Promise<{ success: boolean; message: string }> => {
  try {
    const { data, error } = await supabase.functions.invoke('import-documentation', {
      method: 'POST',
    });

    if (error) {
      console.error('Error importing documentation:', error);
      return { success: false, message: `Error: ${error.message}` };
    }

    return { success: true, message: 'Documentation data imported successfully!' };
  } catch (error) {
    console.error('Error calling import-documentation function:', error);
    return { success: false, message: `Error: ${error.message}` };
  }
};
