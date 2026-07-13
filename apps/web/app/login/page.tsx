import { getClaims } from "@repo/auth/server";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/card";
import { redirect } from "next/navigation";
import { LoginForm } from "./login-form";

export default async function LoginPage() {
  const claims = await getClaims();
  if (claims?.sub) redirect("/dashboard");

  return (
    <main className="mx-auto flex min-h-dvh max-w-sm flex-col items-center justify-center p-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  );
}
