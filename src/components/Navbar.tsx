import { FC } from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  AtHomePage: Boolean;
}

const Navbar: FC<NavbarProps> = ({ AtHomePage }) => {
  return (
    <div
      className={`py-3 mb-10  ${
        AtHomePage ? "bg-blue-900 border-b-2 border-gray-200" : ""
      }`}
    >
      <div
        className={`container flex justify-between ${
          AtHomePage ? "text-white" : "text-blue-800"
        }`}
        style={{ lineHeight: "32px" }}
      >
        <Link to={"/"} className="text-2xl uppercase font-medium">
          LOGO
        </Link>
        {AtHomePage ? (
          <div>lorem ipsum</div>
        ) : (
          <div className="text-gray-500">kopkap</div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
