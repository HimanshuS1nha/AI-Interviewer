"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Button } from "@/components/ui/button";
import BrandLogo from "@/components/BrandLogo";
import Loader from "@/components/Loader";
import UserButton from "@/components/UserButton";

import { useUser } from "@/hooks/useUser";

import type { UserType } from "../../../types";

const Navbar = () => {
  const { user, setUser } = useUser();

  const { data, isLoading } = useQuery({
    queryKey: ["is-logged-in"],
    queryFn: async () => {
      const { data } = await axios.get("/api/is-logged-in");
      return data as { user: UserType };
    },
    retry: 1,
  });

  useEffect(() => {
    if (data?.user) {
      setUser(data.user);
    }
  }, [data]);
  return (
    <nav className="sticky inset-x-0 top-0 z-20 flex justify-between h-[8vh] items-center bg-white/75 border-b border-b-gray-200 px-44 backdrop-blur-lg">
      <BrandLogo />

      <div className="flex gap-x-8 items-center">
        <Link
          href={"/pricing"}
          className="hover:text-primary delay-100 transition-all text-sm text-gray-700 cursor-pointer"
        >
          Pricing
        </Link>
        <Link
          href={"/contact-us"}
          className="hover:text-primary delay-100 transition-all text-sm text-gray-700 cursor-pointer"
        >
          Contact Us
        </Link>

        {isLoading ? (
          <Loader size="sm" />
        ) : user ? (
          <UserButton />
        ) : (
          <Button asChild>
            <Link href={"/login"}>
              <p>Login</p>
              <ArrowRight size={24} color="white" />
            </Link>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
