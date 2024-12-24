"use client";

import { CheckCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const PricingCard = ({
  planName,
  features,
  price,
  buttonText,
  isHighlighted,
  handleClick,
}: {
  planName: string;
  price: string;
  features: string[];
  buttonText: string;
  isHighlighted: boolean;
  handleClick: (planName: string) => void;
}) => {
  return (
    <div
      className={cn(
        "py-10 px-7 w-[95%] sm:w-[400px] rounded-xl flex flex-col gap-y-6 shadow-sm",
        isHighlighted
          ? "border-2 border-primary shadow-primary"
          : "shadow-black"
      )}
    >
      <div
        className={cn(
          "w-fit px-6 py-1.5 rounded-full",
          isHighlighted ? "bg-primary" : "bg-black"
        )}
      >
        <p className="text-white text-sm">{planName}</p>
      </div>

      <p className="text-3xl font-bold">{price}</p>

      <div className="flex flex-col gap-y-4">
        {features.map((feature) => {
          return (
            <div key={feature} className="flex gap-x-4 items-center">
              <CheckCircle
                size={23}
                color={isHighlighted ? "blue" : "black"}
                className="min-w-[23px] min-h-[23px]"
              />
              <p className="text-gray-700">{feature}</p>
            </div>
          );
        })}
      </div>

      <Button
        variant={isHighlighted ? "default" : "outline"}
        className={
          isHighlighted
            ? ""
            : "text-primary border-indigo-300 hover:border-indigo-600 hover:bg-transparent hover:text-primary delay-100 transition-all"
        }
        onClick={() => handleClick(planName)}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default PricingCard;
