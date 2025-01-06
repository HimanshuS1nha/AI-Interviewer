"use client";

import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

import { DataTable } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Loader from "@/components/Loader";

type CandidateResults = {
  id: string;
  email: string;
  rating: number;
};

const InterviewResults = () => {
  const params = useParams() as { interviewId: string };

  const columns: ColumnDef<CandidateResults>[] = [
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }) => {
        const data = row.original;

        return <p>{data.rating}/10</p>;
      },
    },
    {
      header: "Actions",
      cell: ({ row }) => {
        const data = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisVertical size={20} className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href={`/dashboard/interviews/${params.interviewId}/results/${data.id}`}
                >
                  View
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const { data, isLoading, error } = useQuery({
    queryKey: ["get-results"],
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/get-results/${params.interviewId}`
      );

      return data as { results: CandidateResults[] };
    },
  });
  if (error) {
    if (error instanceof AxiosError && error.response?.data.error) {
      toast.error(error.response.data.error);
    } else {
      toast.error("Some error occured. Please try again later!");
    }
  }
  return (
    <section className="mt-6 flex flex-col gap-y-6">
      <h1 className="text-2xl text-primary font-semibold text-center">
        Results for Interview
      </h1>

      {isLoading ? (
        <Loader size="lg" />
      ) : data && data.results.length !== 0 ? (
        <DataTable columns={columns} data={data.results} />
      ) : (
        <p>No data to show</p>
      )}
    </section>
  );
};

export default InterviewResults;
