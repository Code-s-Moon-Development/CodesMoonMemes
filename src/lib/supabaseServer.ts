import { createClient } from "@supabase/supabase-js";
import { env } from "../env/client.mjs";

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Server-only Supabase client. Uses service role key when set so storage list
 * bypasses RLS; otherwise uses anon (list may be empty until bucket RLS allows SELECT).
 * Never import this from client code.
 */
export const supabaseServer = createClient(url, serviceRoleKey ?? anonKey);
