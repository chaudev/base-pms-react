import { ErrorMessage } from "@hookform/error-message";
import clsx from "clsx";
import React from "react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { InputProps } from "react-select";

type TProps<TFieldValues> = {
  name: Path<TFieldValues>;
  type?: InputProps["type"];
  placeholder: string;
  rules?: RegisterOptions;
  control: Control<TFieldValues, object>;
  icon: string;
  defaultValue?: string | number;
};

export const FormInputAuth = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  placeholder,
  rules,
  type = "text",
  icon,
  defaultValue,
}: TProps<TFieldValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, ...newField }, formState: { errors } }) => (
        <React.Fragment>
          <div className="group">
            <span>
              <i className={clsx("icon", icon)}></i>
            </span>
            <input
              defaultValue={defaultValue}
              className="input h-12 outline-none bg-[#efefef] w-full"
              placeholder={placeholder}
              type={type}
              {...newField}
            />
          </div>
          <ErrorMessage
            errors={errors}
            name={name as any}
            render={({ message }) => (
              <p className="text-warning text-xs font-medium mt-1">{message}</p>
            )}
          />
        </React.Fragment>
      )}
    />
  );
};
