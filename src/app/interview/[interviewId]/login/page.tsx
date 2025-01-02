"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BrandLogo from "@/components/BrandLogo";

const InterviewLogin = () => {
  return (
    <section className="w-full h-[100dvh] flex items-center justify-center bg-gray-100">
      <div className="bg-white w-[30%] py-7 rounded-xl flex flex-col justify-center items-center gap-y-7 shadow shadow-gray-500">
        <BrandLogo />
        <div className="flex flex-col w-full px-7 gap-y-6">
          <div className="flex flex-col">
            <p className="font-bold text-lg">Login</p>
            <p className="text-sm text-gray-700">to start the interview</p>
          </div>

          <form className="flex flex-col gap-y-6">
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
            </div>

            <Button type="submit">Login</Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default InterviewLogin;
