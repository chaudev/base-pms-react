import { ErrorMessage } from "@hookform/error-message";
import { Input } from "antd";
import clsx from "clsx";
import _ from "lodash";
import React from "react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";

type TProps<TFieldValues> = {
  required?: boolean;
  name: Path<TFieldValues>;
  label?: string;
  placeholder: string;
  rules?: RegisterOptions;
  control: Control<TFieldValues, object>;
  rows?: number;
  disabled?: boolean;
  hideError?: boolean;
  inputClassName?: string;
  onEnter?: () => void;
  defaultValue?: any;
};

export const FormTextarea = <TFieldValues extends FieldValues = FieldValues>({
  label,
  name,
  placeholder,
  rules,
  control,
  rows = 4,
  required = true,
  disabled = false,
  hideError = false,
  inputClassName,
  onEnter,
  defaultValue,
}: TProps<TFieldValues>) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-[#808080] text-sm mb-1" htmlFor={name}>
          {label} {required === true && <span className="text-red">*</span>}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({
          field: { onChange, ...newField },
          fieldState: { error },
          formState: { errors },
        }) => (
          <div>
            <Input.TextArea
              rows={rows}
              placeholder={placeholder}
              onChange={!disabled && onChange}
              onKeyPress={(e) => {
                if (e.code === "Enter") {
                  onEnter?.();
                }
              }}
              {...newField}
              className={clsx(
                disabled &&
                  "cursor-not-allowed !border-[#dedede] !bg-[#f5f5f5] hover:!border-[#d9d9d9]",
                { "!border-warning": !_.isEmpty(error) },
                inputClassName,
                "!rounded-md"
              )}
              defaultValue={defaultValue}
            />
            {hideError && (
              <ErrorMessage
                errors={errors}
                name={name as any}
                render={({ message }) => (
                  <p className="text-warning text-xs font-medium mt-1">
                    {message}
                  </p>
                )}
              />
            )}
          </div>
        )}
      />
    </div>
  );
};
