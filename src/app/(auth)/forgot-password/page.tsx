import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ForgotPassword = () => {
  return (
    <>
      <form className="flex flex-col gap-y-7 w-[90%]">
        <p className="text-primary text-xl font-semibold text-center">
          Forgot password
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

        <Button type="submit">Submit</Button>
      </form>

      <div className="flex flex-col gap-y-4 items-center">
        <Link
          href={"/login"}
          className="text-primary font-medium hover:underline cursor-pointer"
        >
          Back to Login
        </Link>
        <p className="text-sm font-medium text-gray-700">
          By continuing, you agree to our{" "}
          <span className="font-medium">Terms and Conditions</span>
        </p>
      </div>
    </>
  );
};

export default ForgotPassword;
