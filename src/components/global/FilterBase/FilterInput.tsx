import { Input } from "antd";
import clsx from "clsx";
import React, { FC, useCallback, useRef } from "react";

type TProps = {
  name: string;
  value?: string;
  id: string;
  handleSubmit?: (val: string) => void;
  handleSearch?: (val: string) => void;
  placeholder: string;
  type?: "text" | "number";
  inputClassName?: string;
  defaultValue?: string | number;
  prefix?: React.ReactNode;
};

export const FilterInput: FC<TProps> = ({
  id,
  placeholder,
  name,
  handleSubmit,
  handleSearch,
  type,
  value,
  inputClassName,
  defaultValue,
  prefix,
}) => {
  const input = useRef("");
  const handleInput = useCallback((val: string) => (input.current = val), []);
  return (
    <div className="relative w-full">
      {/* <div
        className={clsx(
          "absolute -top-3 z-10 left-4 text-xs bg-white p-1",
          prefix && "left-12"
        )}
      >
        {placeholder}
      </div> */}
      <Input
        className={clsx(
          "!rounded-md h-10 px-2 ",
          !handleSearch ? "pr-12" : "pr-4",
          inputClassName
        )}
        placeholder={placeholder}
        type={type}
        value={value}
        defaultValue={defaultValue}
        prefix={prefix}
        suffix={
          !handleSearch &&
          handleSubmit && (
            <div
              onClick={() => handleSubmit(input.current)}
              className="absolute right-0 top-0 h-10 px-3 cursor-pointer flex items-center justify-center"
            >
              <span className="leading-10">
                <i className="fal fa-search text-base"></i>
              </span>
            </div>
          )
        }
        id={id}
        name={name}
        onChange={(e) => {
          handleSearch
            ? handleSearch(e.target.value)
            : handleInput(e.target.value);
        }}
        onKeyPress={(e) => {
          handleSubmit && e.code === "Enter" && handleSubmit(input.current);
        }}
      />
    </div>
  );
};
