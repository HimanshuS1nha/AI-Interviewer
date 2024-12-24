import Link from "next/link";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Login = () => {
  return (
    <>
      <form className="flex flex-col gap-y-7 w-[90%]">
        <p className="text-primary text-xl font-semibold text-center">
          Login to your account
        </p>

        <div className="flex flex-col gap-y-3">
          <Label htmlFor="email" className="ml-1">
            Email
          </Label>
          <Input
            placeholder="Enter your email"
            type="email"
            id="email"
            required
          />
        </div>
        <div className="flex flex-col gap-y-3">
          <Label htmlFor="password" className="ml-1">
            Password
          </Label>
          <Input
            placeholder="Enter your password"
            type="password"
            id="password"
            required
          />
          <div className="flex justify-end">
            <p className="text-sm text-primary hover:underline delay-100 transition-all cursor-pointer">
              Forgot Password?
            </p>
          </div>
        </div>

        <Button>Login</Button>
      </form>

      <div className="flex flex-col gap-y-4 items-center">
        <p>
          Don&apos;t have an account?{" "}
          <Link
            href={"/signup"}
            className="text-primary font-medium hover:underline cursor-pointer"
          >
            Signup
          </Link>
        </p>
        <p className="text-sm font-medium text-gray-700">
          By continuing, you agree to our{" "}
          <span className="font-medium">Terms and Conditions</span>
        </p>
      </div>
    </>
  );
};

export default Login;
