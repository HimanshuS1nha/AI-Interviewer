import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

const Loader = ({
  size,
  white = false,
}: {
  size: "sm" | "lg";
  white?: boolean;
}) => {
  return (
    <Loader2
      className={cn("animate-spin", white ? "text-white" : "text-primary")}
      size={size === "lg" ? 40 : 26}
    />
  );
};

export default Loader;
