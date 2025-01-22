"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

import PricingCard from "@/components/landing-page/PricingCard";
import Title from "@/components/landing-page/Title";

import { pricingPlan } from "@/constants/pricing-plan";

const Pricing = () => {
  const router = useRouter();

  const { mutate: handleCreateOrderId, isPending } = useMutation({
    mutationKey: ["create-order-id"],
    mutationFn: async (amount: number) => {
      const { data } = await axios.post("/api/create-order-id", { amount });

      return data as { amount: number; orderId: string };
    },
    onSuccess: (data) => {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: data.amount,
        currency: "INR",
        name: "AI Interviewer",
        description: "Pro Plan",
        image: `/logo.webp`,
        order_id: data.orderId,
        callback_url: "/api/confirm-payment",
        theme: {
          color: "#2563eb",
        },
      };

      // @ts-ignore
      const razorpayModal = new window.Razorpay(options);
      razorpayModal.open();
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
                  handleCreateOrderId(parseInt(item.price));
                }
              }}
              isPending={isPending}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Pricing;
