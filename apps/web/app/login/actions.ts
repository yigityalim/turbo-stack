"use server";

import { createServerClient } from "@repo/auth/server";
import { redirect } from "next/navigation";
import { start } from "workflow/api";
import { welcomeWorkflow } from "@/workflows/welcome";

export interface AuthState {
  error?: string;
}

/** Sign in with email + password, then land on the dashboard. */
export async function signIn(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const supabase = await createServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };

  redirect("/dashboard");
}

/** Create an account with email + password (no confirmation in the local stack). */
export async function signUp(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const supabase = await createServerClient();
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) return { error: error.message };

  await start(welcomeWorkflow, [email]);
  redirect("/dashboard");
}
