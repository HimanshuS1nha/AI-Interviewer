import Image from "next/image";
import { Quote } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Title from "@/components/landing-page/Title";

import { testimonials } from "@/constants/testimonials";

const Testimonials = () => {
  return (
    <section className="mt-20 flex flex-col items-center justify-center gap-y-10">
      <div className="flex flex-col gap-y-3.5 items-center">
        <Title
          tagline="What our customers say about us"
          title="Testimonials"
          size="sm"
          className="items-center"
        />
        <p className="max-w-3xl text-gray-700 text-center">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus
          corporis omnis, explicabo debitis repudiandae quae ducimus, quas in
          tempore quasi ea provident iusto earum recusandae error nemo dolor
          eius suscipit.
        </p>
      </div>

      <Carousel
        opts={{
          align: "start",
        }}
        className="w-[90%] xl:w-[80%]"
      >
        <CarouselContent>
          {testimonials.map((testimonial) => (
            <CarouselItem
              key={testimonial.id}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col items-center gap-y-3 justify-center p-6">
                    <Image
                      src={testimonial.image}
                      className="w-16 sm:w-20 h-16 sm:h-20 rounded-full object-cover"
                      alt={testimonial.name}
                      width={80}
                      height={80}
                    />
                    <div className="flex flex-col gap-y-1.5 items-center">
                      <p className="font-semibold text-lg">
                        {testimonial.name}
                      </p>
                      <p className="text-primary text-sm font-bold">
                        {testimonial.companyName}
                      </p>
                    </div>

                    <div className="relative flex justify-center">
                      <Quote
                        size={20}
                        className="hidden sm:block absolute top-0 left-0 text-blue-950 rotate-180"
                      />
                      <p className="leading-7 text-justify w-[98%] sm:w-[85%] text-sm sm:text-base">
                        {testimonial.content}
                      </p>
                      <Quote
                        size={20}
                        className="hidden sm:block absolute bottom-0 right-0 text-blue-950"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default Testimonials;
