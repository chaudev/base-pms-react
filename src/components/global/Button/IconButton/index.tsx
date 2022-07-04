import { Tooltip } from "antd";
import clsx from "clsx";
import React from "react";

type TProps = {
  title: string;
  icon: string;
  toolip: string;
  onClick?: (data?: any) => void | Promise<any>;
  btnClass?: string;
  btnIconClass?: string;
  showLoading?: boolean;
  disabled?: boolean;
  red?: boolean;
  yellow?: boolean;
  green?: boolean;
  blue?: boolean;
};

const styleBtn =
  "bg-orange h-[38px] mx-0 py-[6px] px-[12px] rounded-md text-white !font-semibold tracking-wide hover:bg-yellow hover:shadow";

const styleBtnGreen = "!bg-[#1f8f2b] hover:bg-[#d0f5d5]";
const styleBtnRed = "!bg-[#f02b02]";
const styleBtnBlue = "!bg-[#0275e0] hover:bg-[#bcdbf7]";
const styleBtnYellow = "!bg-[#f5b811] hover:bg-[#f7e4a3]";

export const IconButton: React.FC<TProps> = ({
  icon,
  title,
  toolip,
  disabled = false,
  onClick,
  btnClass,
  btnIconClass,
  showLoading,
  red,
  yellow,
  green,
  blue,
}) => {
  const [loading, setLoading] = React.useState(false);
  const _onPress = async () => {
    if (onClick) {
      if (showLoading) {
        try {
          setLoading(true);
          await onClick();
        } catch (error) {
        } finally {
          setLoading(false);
        }
      } else {
        onClick();
      }
    }
  };

  return (
    <Tooltip placement="topLeft" title={toolip}>
      <button
        onClick={!disabled && !loading ? _onPress : undefined}
        className={clsx(
          styleBtn,
          btnClass,
          green && styleBtnGreen,
          red && styleBtnRed,
          blue && styleBtnBlue,
          yellow && styleBtnYellow
        )}
      >
        <i
          className={clsx(
            loading ? "fa-spin fas fa-circle-notch" : icon,
            "mr-2 w-3 h-3 ",
            btnIconClass
          )}
        ></i>
        {title}
      </button>
    </Tooltip>
  );
};
