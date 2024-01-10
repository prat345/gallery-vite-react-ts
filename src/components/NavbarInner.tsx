import React from "react";
import { Link, useLocation } from "react-router-dom";
import { HomeOutlined, BarChartOutlined } from "@ant-design/icons";

interface NavbarInnerProps {}

const NavbarInner: React.FC<NavbarInnerProps> = () => {
  const location = useLocation();
  return (
    <div className="navbar" id="navbar-inner">
      <ul>
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to={"/"} className="flex space-x-2">
            <HomeOutlined />
            <span>Home</span>
          </Link>
        </li>
        <li className={""}>
          <Link to={"#"} className="flex space-x-2">
            <BarChartOutlined />
            <span>Trend</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavbarInner;
