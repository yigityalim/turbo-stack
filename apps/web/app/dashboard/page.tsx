import { createServerClient, requireClaims } from "@repo/auth/server";
import { Button } from "@repo/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/card";
import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";

async function signOut() {
  "use server";
  const supabase = await createServerClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export default async function DashboardPage() {
  const claims = await requireClaims();

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-6 p-8">
      <Card>
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm">
            Protected route. Signed in as{" "}
            <span className="text-foreground">{claims.email ?? claims.sub}</span>.
          </p>
          <form action={signOut}>
            <Button type="submit" variant="outline">
              <LogOut /> Sign out
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
