import React, { useState } from "react";
import { Button } from "../../../@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../@/components/ui/card";
import { Input } from "../../../@/components/ui/input";
import { Label } from "../../../@/components/ui/label";
import { login } from "@/services/auth/auth";

const LoginPage = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await login({ identifier, password });

      console.log("LOGIN RESPONSE", response);

      localStorage.setItem("accessToken", response.accessToken);
      window.location.href = "/";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen items-center bg-slate-900 justify-center">
      <Card className="w-full max-w-xs">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button variant="link">Sign Up</Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="string"
                  value={identifier}
                  placeholder="m@example.com"
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>

        {/* <CardFooter className="flex-col gap-2"></CardFooter> */}
      </Card>
    </div>
  );
};

export default LoginPage;
