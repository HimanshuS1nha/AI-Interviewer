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
    <div
      className={cn(
        "mt-10 flex flex-col gap-y-2.5",
        size === "lg" && "items-center"
      )}
    >
      <p className="text-primary text-sm font-medium">{tagline}</p>
      <h1
        className={cn(
          "font-semibold text-[#222222] max-w-4xl tracking-tight",
          size === "lg"
            ? "text-2xl sm:text-4xl lg:text-6xl text-center"
            : "text-xl sm:text-2xl lg:text-4xl"
        )}
      >
        {title}
      </h1>
    </div>
  );
};

export default Title;
