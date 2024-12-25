import BrandLogo from "@/components/BrandLogo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center h-[10vh]">
      <BrandLogo />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="rounded-full">A</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <p className="cursor-pointer">Upgrade Plan</p>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer focus:bg-rose-600 focus:text-white">
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default Navbar;
