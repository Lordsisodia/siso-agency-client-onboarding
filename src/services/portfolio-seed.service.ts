
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export async function seedPortfolioData(clearExisting: boolean = true) {
  try {
    toast.loading("Seeding portfolio data...");
    const { data, error } = await supabase.functions.invoke('seed-portfolio', {
      method: 'GET',
      queryParams: { clear: clearExisting.toString() }
    });
    
    if (error) {
      console.error('Error seeding portfolio data:', error);
      toast.error('Failed to seed portfolio data');
      return false;
    }
    
    console.log('Seed result:', data);
    toast.success(`Portfolio data seeded successfully (${data.projects} projects, ${data.categories} categories)`);
    return true;
  } catch (error) {
    console.error('Unexpected error seeding portfolio data:', error);
    toast.error('An unexpected error occurred while seeding portfolio data');
    return false;
  }
}
