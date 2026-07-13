import { getClaims } from "@repo/auth/server";
import { Button } from "@repo/ui/components/button";
import Link from "next/link";

export default async function Home() {
  const claims = await getClaims();
  const signedIn = Boolean(claims?.sub);

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-6 p-8 text-center">
      <div className="space-y-2">
        <h1 className="font-semibold text-2xl tracking-tight">Turbo Stack</h1>
        <p className="text-muted-foreground text-sm">
          {signedIn
            ? `Signed in as ${claims?.email ?? claims?.sub}`
            : "The primary web interface — sign in to continue."}
        </p>
      </div>

      <Button asChild variant="brand" size="lg">
        <Link href={signedIn ? "/dashboard" : "/login"}>
          {signedIn ? "Go to dashboard" : "Sign in"}
        </Link>
      </Button>
    </main>
  );
}
