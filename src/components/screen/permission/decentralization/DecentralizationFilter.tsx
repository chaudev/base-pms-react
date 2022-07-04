import { Checkbox } from "antd";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { FormCheckbox } from "~src/components/global";
import { IconButton } from "~src/components/global/Button/IconButton";
import { FilterInput } from "~src/components/global/FilterBase";

const DecentralizationFilter = () => {
  const { handleSubmit, control, watch, reset } = useForm<any>({
    mode: "onBlur",
  });
  const SearchContent = useRef<string | null>(null);
  const SearchCode = useRef<string | null>(null);
  return (
    <div className="grid grid-cols-4 gap-4 bg-[#e2eae8] p-2 rounded-md">
      <div className="col-span-1">
        <FilterInput
          placeholder="Tìm kiếm mã chức năng"
          id="UserName"
          name="SearchContent"
          handleSearch={(val: string) => (SearchCode.current = val)}
          inputClassName="w-full"
        />
      </div>
      <div className="col-span-1">
        <FilterInput
          placeholder="Tìm kiếm tên chức năng"
          id="UserName"
          name="SearchContent"
          handleSearch={(val: string) => (SearchContent.current = val)}
          inputClassName="w-full"
        />
      </div>
      <div className="col-span-2 flex justify-between">
        <div className="flex items-center justify-center">
          <FormCheckbox name={"find"} control={control} label="Cho phép" />
        </div>
        <div className="flex items-center">
          <IconButton
            title={"Tìm kiếm"}
            icon={"fas fa-filter"}
            toolip={""}
            onClick={() => undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default DecentralizationFilter;
