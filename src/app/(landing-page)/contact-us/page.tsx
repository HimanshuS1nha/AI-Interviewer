import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Title from "@/components/landing-page/Title";

const ContactUs = () => {
  return (
    <div className="flex flex-col gap-y-10 items-center">
      <Title tagline="Reach out to us" title="Contact Us" />

      <div className="flex flex-col gap-y-6 w-[90%] md:w-[80%] lg:w-[60%]">
        <div className="flex flex-col gap-y-3">
          <Label htmlFor="name">Name</Label>
          <Input placeholder="Enter your name" id="name" type="text" />
        </div>
        <div className="flex flex-col gap-y-3">
          <Label htmlFor="email">Email</Label>
          <Input placeholder="Enter your email" id="email" type="email" />
        </div>
        <div className="flex flex-col gap-y-3">
          <Label htmlFor="subject">Subject</Label>
          <Input placeholder="Enter subject" id="subject" type="text" />
        </div>
        <div className="flex flex-col gap-y-3">
          <Label htmlFor="message">Message</Label>
          <Textarea placeholder="Enter message" id="message" />
        </div>

        <Button>Submit</Button>
      </div>
    </div>
  );
};

export default ContactUs;
