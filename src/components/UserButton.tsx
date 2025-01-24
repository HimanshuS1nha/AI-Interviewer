"use client";

import { useRouter, usePathname } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { useUser } from "@/hooks/useUser";

const UserButton = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const { user, setUser } = useUser();

  const { mutate: handleLogout, isPending } = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      const { data } = await axios.get("/api/logout");
      return data as { message: string };
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["is-logged-in"] });
      setUser(null);
      toast.success(data.message);
      router.replace("/");
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response?.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Some error occured. Please try again later!");
      }
    },
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-full">{user?.name[0]}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-not-allowed font-semibold text-rose-600 focus:text-rose-600">
          Remaining : {user?.remainingNumberOfInterviews}
        </DropdownMenuItem>
        {pathname === "/" && (
          <DropdownMenuItem asChild>
            <Link href={"/dashboard/interviews"} className="cursor-pointer">
              Go to dashboard
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <Link href={"/pricing"} className="cursor-pointer">
            Upgrade Plan
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer focus:bg-rose-600 focus:text-white"
          onClick={() => handleLogout()}
          disabled={isPending}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
