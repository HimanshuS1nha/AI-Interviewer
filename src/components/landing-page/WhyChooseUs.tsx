import Image from "next/image";

import Title from "@/components/landing-page/Title";

import { whyChooseUs } from "@/constants/why-choose-us";

const WhyChooseUs = () => {
  return (
    <section className="flex justify-center gap-x-16">
      <div className="w-[30%] h-[470px] relative">
        <Image
          src="/why-choose-us-img.webp"
          alt="Interview"
          className="w-full h-full rounded-xl"
          fill
        />
      </div>
      <div className="w-[55%] flex flex-col gap-y-7">
        <div className="flex flex-col gap-y-3.5">
          <Title
            tagline="Providing the best for our customers"
            title="Why Choose Us?"
            size="sm"
          />
          <p className="max-w-3xl text-gray-700 text-justify">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus
            corporis omnis, explicabo debitis repudiandae quae ducimus, quas in
            tempore quasi ea provident iusto earum recusandae error nemo dolor
            eius suscipit.
          </p>
        </div>

        <div className="flex flex-col gap-y-8">
          {whyChooseUs.map((ele, i) => {
            return (
              <div className="flex justify-between items-center" key={i}>
                {ele.map((item) => {
                  return (
                    <div className="flex gap-x-3 items-center" key={item.title}>
                      <div
                        className={`rounded-full p-2 flex items-center justify-center bg-${item.color}-500`}
                      >
                        <item.Icon size={30} color="white" />
                      </div>
                      <div className="flex flex-col gap-y-1.5">
                        <p className="text-xl font-semibold">{item.title}</p>
                        <p className="text-gray-700 text-sm">
                          Lorem ipsum dolor sit amet consectetur, adipisicing
                          elit.
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
