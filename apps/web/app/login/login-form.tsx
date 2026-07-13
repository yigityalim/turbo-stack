"use client";

import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { useActionState } from "react";
import { type AuthState, signIn, signUp } from "./actions";

const initial: AuthState = {};

export function LoginForm() {
  const [signInState, signInAction, signingIn] = useActionState(signIn, initial);
  const [signUpState, signUpAction, signingUp] = useActionState(signUp, initial);
  const error = signInState.error ?? signUpState.error;
  const pending = signingIn || signingUp;

  return (
    <form className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="email" required />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </div>

      {error ? <p className="text-destructive text-sm">{error}</p> : null}

      <div className="flex gap-3">
        <Button
          type="submit"
          formAction={signInAction}
          variant="brand"
          disabled={pending}
          className="flex-1"
        >
          {signingIn ? "Signing in…" : "Sign in"}
        </Button>
        <Button
          type="submit"
          formAction={signUpAction}
          variant="outline"
          disabled={pending}
          className="flex-1"
        >
          {signingUp ? "Creating…" : "Sign up"}
        </Button>
      </div>
    </form>
  );
}
