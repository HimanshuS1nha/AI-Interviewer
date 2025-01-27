import BrandLogo from "@/components/BrandLogo";

import { useCandidateEmail } from "@/hooks/useCandidateEmail";
import { useParams } from "next/navigation";

const Navbar = () => {
  const { interviewId } = useParams() as { interviewId: string };

  const candidateEmail = useCandidateEmail((state) => state.email);
  return (
    <nav className="flex justify-between items-center h-[10vh]">
      <BrandLogo />

      <p className="font-semibold">{candidateEmail}</p>
    </nav>
  );
};

export default Navbar;
