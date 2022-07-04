import { ErrorMessage } from "@hookform/error-message";
import { DatePicker, DatePickerProps } from "antd";
import clsx from "clsx";
import _ from "lodash";
import moment from "moment";
import React from "react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { _format } from "~src/util";

type TProps<TFieldValues> = {
  required?: boolean;
  name: Path<TFieldValues>;
  label?: string;
  placeholder: string;
  rules?: RegisterOptions;
  control: Control<TFieldValues, object>;
  picker?: "date" | "month" | "quarter" | "time" | "week" | "year";
  format?: string;
  defaultValue?: any;
};

export const FormDate = <TFieldValues extends FieldValues = FieldValues>({
  label,
  placeholder,
  name,
  rules,
  control,
  picker,
  defaultValue,
  required = true,
  format = "DD/MM/YYYY",
}: TProps<TFieldValues>) => {
  return (
    <React.Fragment>
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
          field: { value, onChange, ...newField },
          fieldState: { error },
          formState: { errors },
        }) => {
          return (
            <div className="w-full">
              <DatePicker
                defaultValue={value && moment(new Date(defaultValue), format)}
                format={format}
                onChange={(date) => {
                  onChange(!!date ? _format.converseDateNumber(date) : date);
                }}
                picker={picker}
                style={{ height: 40, width: "100%", borderRadius: 5 }}
                placeholder={placeholder}
                {...newField}
                className={clsx({ "!border-warning": !_.isEmpty(error) })}
              />
              <ErrorMessage
                errors={errors}
                name={name as any}
                render={({ message }) => (
                  <p className="text-warning text-xs font-medium mt-1">
                    {message}
                  </p>
                )}
              />
            </div>
          );
        }}
      />
    </React.Fragment>
  );
};
