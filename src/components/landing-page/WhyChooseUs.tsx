import Image from "next/image";

import Title from "@/components/landing-page/Title";

import { whyChooseUs } from "@/constants/why-choose-us";

const WhyChooseUs = () => {
  return (
    <section className="flex flex-col 2xl:flex-row items-center 2xl:items-start justify-center gap-x-16">
      <div className="w-[90%] lg:w-[50%] 2xl:w-[30%] h-[600px] lg:h-[550px] 2xl:h-[470px] relative">
        <Image
          src="/why-choose-us-img.webp"
          alt="Interview"
          className="w-full h-full rounded-xl"
          fill
        />
      </div>
      <div className="w-[90%] xl:w-[75%] 2xl:w-[55%] flex flex-col items-center 2xl:items-start gap-y-7">
        <div className="flex flex-col gap-y-3.5">
          <Title
            tagline="Providing the best for our customers"
            title="Why Choose Us?"
            size="sm"
            className="items-center sm:items-start"
          />
          <p className="max-w-3xl text-gray-700 text-justify">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus
            corporis omnis, explicabo debitis repudiandae quae ducimus, quas in
            tempore quasi ea provident iusto earum recusandae error nemo dolor
            eius suscipit.
          </p>
        </div>

        <div className="flex justify-center items-center  gap-8 flex-wrap">
          {whyChooseUs.map((item) => {
            return (
              <div className="flex gap-x-3 items-center" key={item.title}>
                <div
                  className="rounded-full p-2 flex items-center justify-center"
                  style={{ backgroundColor: item.color }}
                >
                  <item.Icon size={30} color="white" />
                </div>
                <div className="flex flex-col gap-y-1.5">
                  <p className="text-xl font-semibold">{item.title}</p>
                  <p className="text-gray-700 text-sm">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
