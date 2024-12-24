"use client";

import { useRouter } from "next/navigation";

import PricingCard from "@/components/landing-page/PricingCard";
import Title from "@/components/landing-page/Title";

import { pricingPlan } from "@/constants/pricing-plan";

const Pricing = () => {
  const router = useRouter();
  return (
    <section className="flex flex-col items-center gap-y-9">
      <Title tagline="As cheap as it can be" title="Pricing" />

      <div className="flex w-full justify-center items-center gap-x-6">
        {pricingPlan.map((item) => {
          return (
            <PricingCard
              key={item.planName}
              planName={item.planName}
              buttonText={item.buttonText}
              features={item.features}
              isHighlighted={item.planName === "Pro"}
              price={item.price}
              handleClick={() => {
                if (item.planName === "Free") {
                  router.push("/signup");
                } else if (item.planName === "Custom") {
                  router.push("/contact-us");
                } else {
                  alert("This part is pending");
                }
              }}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Pricing;
