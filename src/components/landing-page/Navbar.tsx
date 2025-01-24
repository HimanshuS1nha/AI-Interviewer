"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Menu } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Button } from "@/components/ui/button";
import BrandLogo from "@/components/BrandLogo";
import Loader from "@/components/Loader";
import UserButton from "@/components/UserButton";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { useUser } from "@/hooks/useUser";

import type { UserType } from "../../../types";

const Navbar = () => {
  const { user, setUser } = useUser();

  const { data, isLoading, error } = useQuery({
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

  useEffect(() => {
    if (error) {
      setUser(null);
    }
  }, [error]);
  return (
    <nav className="sticky inset-x-0 top-0 z-20 flex justify-between h-[8vh] items-center bg-white/75 border-b border-b-gray-200 px-4 lg:px-36 xl:px-44 backdrop-blur-lg">
      <BrandLogo />

      <div className="flex gap-x-3.5 md:gap-x-8 items-center">
        <Link
          href={"/pricing"}
          className="hover:text-primary delay-100 transition-all text-sm text-gray-700 cursor-pointer hidden md:block"
        >
          Pricing
        </Link>
        <Link
          href={"/contact-us"}
          className="hover:text-primary delay-100 transition-all text-sm text-gray-700 cursor-pointer hidden md:block"
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

        <Drawer>
          <DrawerTrigger asChild>
            <Button variant={"outline"} className="block md:hidden">
              <Menu size={20} />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="flex flex-col gap-y-6 py-2.5 items-center">
            <DrawerClose asChild>
              <Link
                href={"/pricing"}
                className="hover:text-primary delay-100 transition-all text-sm text-gray-700 cursor-pointer"
              >
                Pricing
              </Link>
            </DrawerClose>
            <DrawerClose asChild>
              <Link
                href={"/contact-us"}
                className="hover:text-primary delay-100 transition-all text-sm text-gray-700 cursor-pointer"
              >
                Contact Us
              </Link>
            </DrawerClose>
          </DrawerContent>
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;
