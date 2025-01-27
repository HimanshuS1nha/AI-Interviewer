"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

import BrandLogo from "@/components/BrandLogo";
import Loader from "@/components/Loader";

import { useCandidateEmail } from "@/hooks/useCandidateEmail";

const Navbar = () => {
  const router = useRouter();
  const params = useParams() as { interviewId: string };

  const { email, setEmail } = useCandidateEmail();

  const { data, isLoading, error } = useQuery({
    queryKey: ["is-logged-in"],
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/interview/${params.interviewId}/is-candidate-logged-in`
      );
      return data as { email: string };
    },
    retry: 1,
  });

  useEffect(() => {
    if (data?.email) {
      setEmail(data.email);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      router.replace("/");
    }
  }, [error]);
  return (
    <nav className="flex justify-between items-center h-[10vh]">
      <BrandLogo />
      {isLoading ? (
        <Loader size="sm" />
      ) : (
        <p className="font-semibold">{email}</p>
      )}
    </nav>
  );
};

export default Navbar;
