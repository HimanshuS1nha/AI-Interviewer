import Navbar from "@/components/interview/Navbar";

export default function InterviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="px-4 lg:px-16 xl:px-24 2xl:px-32">
      <Navbar />
      {children}
    </div>
  );
}
