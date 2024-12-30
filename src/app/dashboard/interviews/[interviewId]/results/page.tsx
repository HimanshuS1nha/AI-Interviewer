"use client";

import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";

import { DataTable } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type CandidateResults = {
  id: string;
  email: string;
  rating: number;
};

const InterviewResults = () => {
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
              <DropdownMenuItem>View</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const data: CandidateResults[] = [
    {
      email: "demo1@demo.com",
      id: "1",
      rating: 7,
    },
    {
      email: "demo2@demo.com",
      id: "2",
      rating: 4,
    },
    {
      email: "demo3@demo.com",
      id: "4",
      rating: 10,
    },
  ];
  return (
    <section className="mt-6 flex flex-col gap-y-6">
      <h1 className="text-2xl text-primary font-semibold text-center">
        Results for Interview
      </h1>

      <DataTable columns={columns} data={data} />
    </section>
  );
};

export default InterviewResults;
