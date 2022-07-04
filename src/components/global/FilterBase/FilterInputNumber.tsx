import clsx from "clsx";
import React, { FC, useCallback, useRef } from "react";
import NumberFormat from "react-number-format";

type TProps = {
  name: string;
  id: string;
  handleSubmit?: (val: number) => void;
  handleSearch?: (val: number) => void;
  placeholder: string;
  inputClassName?: string;
  allowNegative?: boolean;
  format?: string;
  thousandSeparator?: boolean;
  prefix?: string;
  suffix?: string;
  decimalSeparator?: string;
};

export const FilterInputNumber: FC<TProps> = ({
  id,
  placeholder,
  name,
  handleSubmit,
  handleSearch,
  inputClassName,
  allowNegative = false,
  format,
  prefix,
  suffix,
  thousandSeparator = true,
  decimalSeparator = ".",
}) => {
  const input = useRef<null | number>(null);
  const handleInput = (val: number) => (input.current = val);

  return (
    <div className="relative w-full">
      <div className="absolute -top-3 left-4 text-xs bg-white p-1">
        {placeholder}
      </div>
      <NumberFormat
        className={clsx(
          "px-[11px] py-[4px] h-10 rounded-xl border border-[#ccc] w-full placeholder-[#c6c6c6] hover:border-orange transition duration-300 focus:shadow-input focus:border-orange outline-0",
          inputClassName
        )}
        id={id}
        allowNegative={allowNegative}
        format={format}
        prefix={prefix}
        suffix={suffix}
        thousandSeparator={thousandSeparator}
        decimalSeparator={decimalSeparator}
        name={name}
        onValueChange={({ floatValue }) =>
          handleSearch
            ? handleSearch(floatValue as any)
            : handleInput(floatValue as any)
        }
        onKeyPress={(e: { code: string }) => {
          handleSubmit &&
            e.code === "Enter" &&
            handleSubmit(input.current as any);
        }}
      />
      {!handleSearch && (
        <div
          onClick={() => handleSubmit?.(input.current as any)}
          className="absolute right-0 top-0 px-3 w-10 cursor-pointer flex items-center justify-center"
        >
          <span className="leading-10">
            <i className="fal fa-search text-base"></i>
          </span>
        </div>
      )}
    </div>
  );
};
