import Navbar from "@/components/interview/Navbar";

export default function InterviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="px-32">
      <Navbar />
      {children}
    </div>
  );
}
