import { FC } from "react";
import { Link, useLocation } from "react-router-dom";

interface Props {
  // Define your props here
}

const Navbar: FC<Props> = () => {
  const location = useLocation();
  const AtHomePage = location.pathname === "/";
  return (
    <div
      className={`py-3 mb-4 border-b-2 border-gray-200 ${
        AtHomePage ? "bg-blue-900 " : ""
      }`}
    >
      <div
        className={`container flex justify-between font-semibold ${
          AtHomePage ? "text-white" : "text-blue-600"
        }`}
        style={{ lineHeight: "32px" }}
      >
        <Link to={"/"} className="text-2xl uppercase">
          Roof
        </Link>
        <div>kopkap</div>
      </div>
    </div>
  );
};

export default Navbar;
