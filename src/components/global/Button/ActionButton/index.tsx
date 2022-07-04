import { Tooltip } from "antd";
import clsx from "clsx";
import React, { FC } from "react";

type TProps = {
  icon: string;
  title: string;
  onClick?: () => void;
  iconContainerClassName?: string;
  btnGreen?: boolean;
  btnRed?: boolean;
  btnYellow?: boolean;
  btnViolet?: boolean;
  btnBlue?: boolean;
};

const btnStyleGreen = "text-[#1f8f2b]";
const btnStyleRed = "text-[#f02b02] ";
const btnStyleYellow = "text-[#edb90e]  ";
const btnStyleViolet = "text-[#7410b3]";
const btnStyleBlue = "text-[#119ff5]";

export const ActionButton: FC<TProps> = ({
  icon,
  iconContainerClassName,
  title,
  onClick,
  btnGreen,
  btnRed,
  btnYellow,
  btnViolet,
  btnBlue,
  ...props
}) => {
  return (
    <Tooltip title={title}>
      <div {...props} className="group inline-block p-1  ">
        <div className="cursor-pointer" onClick={onClick}>
          <div
            className={clsx(
              " transition duration-300 text-center p-2 pt-[6px] h-8 w-8 hover:shadow rounded-md text-[#27A689]",
              iconContainerClassName,
              btnGreen && btnStyleGreen,
              btnRed && btnStyleRed,
              btnYellow && btnStyleYellow,
              btnViolet && btnStyleViolet,
              btnBlue && btnStyleBlue
            )}
          >
            <i
              className={clsx(
                icon,
                " transition duration-300 !w-[12px] h-4 text-[16px]"
              )}
            ></i>
          </div>
        </div>
      </div>
    </Tooltip>
  );
};
