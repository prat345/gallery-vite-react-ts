import React from "react";
import {
  TwitterOutlined,
  FacebookOutlined,
  YoutubeOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
const Footer: React.FC = () => {
  return (
    <footer className="footer bg-blue-900 py-4 mt-5">
      <div className="container flex">
        <p className="my-auto mr-10 text-5xl text-white font-semibold">LOGO</p>
        <ul className="flex flex-column text-gray-100">
          <li>
            <p className="font-semibold text-md">
              Anonymous Solution Co., Ltd.
            </p>
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
