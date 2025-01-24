import Navbar from "@/components/dashboard/Navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="px-4 lg:px-24 xl:px-32">
      <Navbar />
      {children}
    </div>
  );
}
