import BrandLogo from "../BrandLogo";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center h-[10vh]">
      <BrandLogo />

      <p className="font-semibold">demo@gmail.com</p>
    </nav>
  );
};

export default Navbar;
