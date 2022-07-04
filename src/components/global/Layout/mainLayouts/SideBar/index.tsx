import { MenuProps, Popover } from "antd";
import { Button, Menu } from "antd";
import clsx from "clsx";
import React, { useState } from "react";
import styles from "./index.module.css";
import Image from "next/image";
import Link from "next/link";
import { adminRouter } from "~src/config/router/adminRouter";
import { useRouter } from "next/router";

type TProps = {
  hover: boolean;
  handleHover: (bool: boolean) => void;
};

const Sidebar: React.FC<TProps> = ({ hover, handleHover }) => {
  const { route } = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <React.Fragment>
      <div
        className={clsx(
          styles.container,
          hover && "w-[300px]",

          "flex"
        )}
      >
        <div
          className={clsx(
            styles.menuBar,
            hover && "w-[312px]",
            !hover && "w-[64px]",
            "bg-main text-[#fff]"
          )}
        >
          <div
            className={clsx(
              !hover && "justify-center ",
              hover && "mx-4",
              "flex pt-[6px]"
            )}
          >
            <Image
              src="/logo.png"
              alt=""
              width={40}
              height={40}
              className="!py-0"
            />
            {hover && (
              <span className="text-base flex items-center ml-8">
                PMS Mona Media
              </span>
            )}
          </div>

          {(hover && (
            <>
              {adminRouter.map((item) => (
                <>
                  <li
                    key={item.path}
                    className={clsx(
                      !hover && "justify-center",
                      hover && " mx-2 px-4",
                      "flex items-center py-[14px] bg-main hover:bg-[#2eac91] m-2 rounded-lg",
                      item.path === route && "!bg-[#20977e]"
                    )}
                  >
                    <Link href={`/${item.path}`}>
                      <a className={""}>
                        <i
                          className={clsx(
                            hover && "mr-4",
                            `${item.icon} font-semibold text-[#fff]`
                          )}
                        ></i>
                        {hover && (
                          <span
                            className={clsx(
                              styles.itemContent,
                              "text-base text-[#fff]"
                            )}
                          >
                            {item?.name}
                          </span>
                        )}
                      </a>
                    </Link>
                  </li>
                </>
              ))}
            </>
          )) || (
            <>
              {adminRouter.map((item) => {
                return (
                  <Popover
                    placement="right"
                    title={item.name}
                    key={item.name}
                    content={
                      <li
                        className={clsx(
                          "flex items-center py-[15px] bg-main m-2 rounded-xl"
                        )}
                      >
                        <Link href={`/${item.path}`}>
                          <a className={""}>
                            <i
                              className={clsx(
                                `${item.icon} font-semibold text-[#fff]`
                              )}
                            ></i>

                            <span
                              className={clsx(
                                styles.itemContent,
                                "text-base text-[#fff]"
                              )}
                            >
                              {item?.name}
                            </span>
                          </a>
                        </Link>
                      </li>
                    }
                  >
                    <>
                      <li
                        className={clsx(
                          !hover && "justify-center",
                          hover && " mx-2 px-4",
                          "flex items-center py-[14px] bg-main m-2 rounded-lg",
                          item.path === route && "!bg-[#20977e]"
                        )}
                      >
                        <Link href={`/${item.path}`}>
                          <a className={styles.link}>
                            <i
                              className={clsx(
                                hover && "mr-4",
                                `${item.icon} font-semibold text-[#fff]`
                              )}
                            ></i>
                            {hover && (
                              <span
                                className={clsx(
                                  styles.itemContent,
                                  "text-base text-[#fff]"
                                )}
                              >
                                {item?.name}
                              </span>
                            )}
                          </a>
                        </Link>
                      </li>
                    </>
                  </Popover>
                );
              })}
            </>
          )}
        </div>

        <button
          className={clsx(
            styles.action,
            "xl:text-[#3e3c6a]  ml-4 absolute left-16 mt-3 text-xl",
            hover && "ml-[260px]"
          )}
          onClick={() => handleHover(!hover)}
        >
          <div className={clsx(styles.openUnMenu)}>
            <i className="far fa-bars "></i>
          </div>
        </button>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
