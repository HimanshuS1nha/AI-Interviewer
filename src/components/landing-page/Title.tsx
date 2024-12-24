import { cn } from "@/lib/utils";

const Title = ({
  tagline,
  title,
  size = "lg",
}: {
  tagline: string;
  title: string;
  size?: "sm" | "lg";
}) => {
  return (
    <div className="mt-10 flex flex-col items-center gap-y-2.5">
      <p className="text-primary text-sm font-medium">{tagline}</p>
      <h1
        className={cn(
          "font-semibold text-[#222222] max-w-4xl text-center tracking-tight",
          size === "lg" ? "text-6xl" : "text-4xl"
        )}
      >
        {title}
      </h1>
    </div>
  );
};

export default Title;
