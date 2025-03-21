
import { supabase } from '@/integrations/supabase/client';

export const setUserAsAdmin = async (userId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ role: 'admin' })
      .eq('id', userId);

    if (error) {
      console.error('Error setting user as admin:', error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error('Error in setUserAsAdmin:', err);
    return false;
  }
};

export const removeAdminRole = async (userId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ role: 'user' })
      .eq('id', userId);

    if (error) {
      console.error('Error removing admin role:', error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error('Error in removeAdminRole:', err);
    return false;
  }
};

export const getCurrentUserRole = async (): Promise<'admin' | 'user' | null> => {
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !sessionData.session) {
      console.error('Error getting session:', sessionError);
      return null;
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', sessionData.session.user.id)
      .single();
    
    if (error) {
      console.error('Error getting user role:', error);
      return null;
    }
    
    return data.role;
  } catch (err) {
    console.error('Error in getCurrentUserRole:', err);
    return null;
  }
};
