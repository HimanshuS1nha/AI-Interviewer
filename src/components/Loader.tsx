import { Loader2 } from "lucide-react";
import React from "react";

const Loader = ({ size }: { size: "sm" | "lg" }) => {
  return (
    <Loader2
      className="animate-spin text-primary"
      size={size === "lg" ? 40 : 26}
    />
  );
};

export default Loader;
