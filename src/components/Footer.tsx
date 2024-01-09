import React from "react";
import {
  TwitterOutlined,
  FacebookOutlined,
  YoutubeOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="footer bg-blue-900 pt-8 pb-10 mt-20">
      <div className="container flex">
        <Link
          to={"/"}
          className="my-auto mr-10 text-5xl text-white font-medium"
        >
          LOGO
        </Link>
        <ul className="flex flex-col text-gray-100">
          <li>
            <p className="font-medium text-md">Anonymous Solution Co., Ltd.</p>
          </li>
          <li>
            <p className="text-xs">
              123 Main Street Cityville, Stateburg 56789 Countryland
            </p>
          </li>
          <li className="flex space-x-3 text-2xl mt-2">
            <FacebookOutlined />
            <InstagramOutlined />
            <YoutubeOutlined />
            <TwitterOutlined />
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
