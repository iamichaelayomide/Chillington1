import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const isUrl = (url: string) => {
  try {
    return new URL(url).protocol.startsWith('http');
  } catch {
    return false;
  }
};

// Create a proxy that won't crash if supabase is null
const createSafeClient = () => {
  if (isUrl(supabaseUrl) && supabaseAnonKey && supabaseUrl !== 'your_supabase_project_url') {
    return createClient(supabaseUrl, supabaseAnonKey);
  }
  
  // Return a "noop" client that doesn't crash on .from().insert()
  return {
    from: () => ({
      select: () => ({ eq: () => ({ order: () => ({ single: () => Promise.resolve({ data: null, error: null }) }), single: () => Promise.resolve({ data: null, error: null }) }) }),
      insert: () => Promise.resolve({ error: null }),
      update: () => ({ eq: () => Promise.resolve({ error: null }) }),
      delete: () => ({ eq: () => Promise.resolve({ error: null }) }),
    }),
    auth: {
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithPassword: () => Promise.resolve({ data: {}, error: null }),
      signOut: () => Promise.resolve({ error: null }),
    }
  } as any;
};

export const supabase = createSafeClient();
