import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CandidateResults = () => {
  return (
    <section className="mt-6 flex flex-col gap-y-6">
      <h1 className="text-2xl text-primary font-semibold text-center">
        Breakdown of Candidate&apos; answers
      </h1>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is React?</AccordionTrigger>
          <AccordionContent>
            React is an open source JavaScript library.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>What does HTML stand for?</AccordionTrigger>
          <AccordionContent>Hyper Text Markup Language</AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default CandidateResults;
