
import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// [Analysis] Complete rewrite of auth session management to fix infinite redirects
// [Plan] Monitor auth state changes and session restoration separately
export const useAuthSession = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  // [Analysis] Track initialization vs auth events separately
  const isInitialized = useRef(false);
  const isAuthEvent = useRef(false);
  const profileCache = useRef<any>(null);
  const authErrorsRef = useRef(0);

  // [Analysis] Memoized profile check to prevent unnecessary API calls
  const checkProfile = useCallback(async (userId: string) => {
    if (profileCache.current) {
      return profileCache.current;
    }

    try {
      console.log('Checking profile for user:', userId);
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error) {
        console.error('Error checking profile:', error);
        return null;
      }
      
      if (profile) {
        console.log('Profile found:', profile);
        profileCache.current = profile;
      } else {
        console.log('No profile found for user');
      }
      
      return profile;
    } catch (error) {
      console.error('Exception in checkProfile:', error);
      return null;
    }
  }, []);

  // Reset auth errors counter
  const resetAuthErrors = () => {
    authErrorsRef.current = 0;
  };

  // [Analysis] Initialize session state without triggering navigation
  useEffect(() => {
    const initializeSession = async () => {
      try {
        console.log('Initializing session...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          setLoading(false);
          return;
        }
        
        if (session?.user) {
          console.log('Session found, checking profile');
          const profile = await checkProfile(session.user.id);
          if (profile) {
            console.log('Profile verified, setting user');
            setUser(session.user);
          } else {
            console.log('No profile found, signing out');
            // Don't auto sign out on init - just don't set the user
            // This prevents white screens when profiles table doesn't exist yet
            setUser(null);
          }
        } else {
          console.log('No session found');
          setUser(null);
        }
        
        isInitialized.current = true;
        setLoading(false);
      } catch (error) {
        console.error('Error initializing session:', error);
        setLoading(false);
      }
    };

    initializeSession();
  }, [checkProfile]);

  // [Analysis] Handle auth state changes separately from initialization
  useEffect(() => {
    if (!isInitialized.current) return;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.id);

      if (event === 'SIGNED_IN') {
        isAuthEvent.current = true;
        if (session?.user) {
          const profile = await checkProfile(session.user.id);
          if (profile) {
            setUser(session.user);
            resetAuthErrors();
            // [Fix] Only navigate on explicit sign in, not session restore
            if (!user) {
              navigate('/home', { replace: true });
              toast({
                title: "Successfully signed in",
                description: "Welcome to SISO Resource Hub!",
              });
            }
          } else {
            // Don't auto sign out - it could be a new user
            // Let the app handle this case
            setUser(session.user);
          }
        }
      } else if (event === 'SIGNED_OUT') {
        isAuthEvent.current = true;
        setUser(null);
        profileCache.current = null;
        resetAuthErrors();
        navigate('/', { replace: true });
        toast({
          title: "Signed out",
          description: "Come back soon!",
        });
      } else if (event === 'TOKEN_REFRESHED') {
        // Just update the user without navigation
        if (session?.user) {
          setUser(session.user);
        }
      }
      
      isAuthEvent.current = false;
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, checkProfile, toast, user]); // [Fix] Added user dependency to prevent unnecessary navigations

  const handleSignIn = async (session: any) => {
    try {
      console.log('Handling sign in for session:', session);
      isAuthEvent.current = true;
      
      const profile = await checkProfile(session.user.id);
      
      if (profile) {
        setUser(session.user);
        resetAuthErrors();
        console.log('Profile verified, proceeding to home');
        return true;
      } else {
        console.error('Profile not found after sign in');
        // Don't throw an error, just return false
        // The app can handle this case
        return false;
      }
    } catch (error) {
      console.error('Error in sign in handler:', error);
      authErrorsRef.current += 1;
      
      toast({
        variant: "destructive",
        title: "Error signing in",
        description: "There was a problem signing you in. Please try again.",
      });
      return false;
    } finally {
      isAuthEvent.current = false;
    }
  };

  const handleSignOut = async () => {
    console.log('Handling sign out');
    try {
      isAuthEvent.current = true;
      await supabase.auth.signOut();
      setUser(null);
      profileCache.current = null;
      resetAuthErrors();
      
      toast({
        title: "Signed out",
        description: "Come back soon!",
      });
    } catch (error) {
      console.error('Error signing out:', error);
      authErrorsRef.current += 1;
      
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: "There was a problem signing you out. Please try again.",
      });
    } finally {
      isAuthEvent.current = false;
    }
  };

  return {
    user,
    setUser,
    loading,
    setLoading,
    handleSignIn,
    handleSignOut,
  };
};
