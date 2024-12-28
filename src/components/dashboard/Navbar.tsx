"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import BrandLogo from "@/components/BrandLogo";
import Loader from "@/components/Loader";
import UserButton from "@/components/UserButton";

import { useUser } from "@/hooks/useUser";

import type { UserType } from "../../../types";

const Navbar = () => {
  const setUser = useUser((state) => state.setUser);

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
    <nav className="flex justify-between items-center h-[10vh]">
      <BrandLogo />

      {isLoading ? <Loader size="sm" /> : <UserButton />}
    </nav>
  );
};

export default Navbar;
