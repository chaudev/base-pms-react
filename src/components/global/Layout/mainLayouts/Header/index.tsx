/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import Image from "next/image";
import { HubConnection } from "@microsoft/signalr";
import clsx from "clsx";
import styles from "./index.module.css";
import { signOut } from "next-auth/react";
import { Dropdown } from "antd";

type Props = {
  Id: number;
  Category: string;
  connection?: HubConnection;
};

const menu = (
  <>
    <div className={clsx("rounded-xl shadow-lg p-2 px-4 mt-6")}>
      <ul className={clsx("")}>
        {/* <li className={"pb-2"}>
          <a href="/user/info-users" className={"text-main"}>
            <i className="fas fa-user-cog w-6 h-4"></i>
            Thông tin của bạn
          </a>
        </li> */}
        <li className={""}>
          <a
            className={"text-main font-semibold"}
            onClick={() => {
              signOut();
            }}
          >
            <i className="fas fa-sign-out-alt w-6 h-4"></i>
            Đăng xuất
          </a>
        </li>
      </ul>
    </div>
  </>
);

const Header: React.FC = () => {
  const [hover, setHover] = useState(true);
  return (
    <React.Fragment>
      <div className="w-[100%] h-[54px] border-b border-[#e9e9e9] bg-[#fff] flex justify-between px-[20px] fixed z-50">
        <div className="w-[10%] flex items-center"></div>
        <div className="flex items-center">
          <div className="">
            <i className="fas fa-bell px-8 text-main"></i>
          </div>
          <div className="rounded-full border-[2px] w-[34px] h-[34px] border-[#39b398]">
            <Image
              src="/avatar.jpeg"
              alt=""
              width={40}
              height={40}
              style={{ borderRadius: 30 }}
            />
          </div>
          <Dropdown overlay={menu} placement="bottomRight">
            <div className="text-xs w-fit ml-4">
              <div>
                <span className="w-full font-semibold pb-[2px]">
                  Lê Thị Mỹ Phúc
                </span>
              </div>
              <span className="w-full !text-[#7e7b7b] text-[12px]">Admin</span>
            </div>
          </Dropdown>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;
