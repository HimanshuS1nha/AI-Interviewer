import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ContactUs = () => {
  return (
    <div className="flex flex-col gap-y-10 items-center">
      <div className="mt-10 flex flex-col items-center gap-y-2.5">
        <p className="text-primary text-sm font-medium">Reach out to us</p>
        <h1 className="text-6xl font-semibold text-[#222222] max-w-4xl text-center tracking-tight">
          Contact Us
        </h1>
      </div>

      <div className="flex flex-col gap-y-6 w-[60%]">
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
