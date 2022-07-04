import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { IconButton } from "~src/components/global/Button/IconButton";
import { FilterInput } from "~src/components/global/FilterBase";

type TProps = {
  handleFilter: (SearchContent: string | null) => void;
};

const StaffListFilter: React.FC<TProps> = ({ handleFilter }) => {
  const { handleSubmit, reset, watch, setValue, control } = useForm<any>({
    mode: "onBlur",
  });
  const SearchContent = useRef<string | null>(null);

  return (
    <div className=" bg-[#fff] w-full p-4 mb-4 rounded-md">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1 flex max-w-[500px] ">
          <FilterInput
            placeholder="Tìm kiếm"
            id=""
            name="SearchContent"
            handleSearch={(val: string) => (SearchContent.current = val)}
            inputClassName="w-full"
          />
          <IconButton
            title={"Tìm kiếm"}
            icon={""}
            toolip={""}
            btnClass="ml-4 min-w-[100px]"
            onClick={() => handleFilter(SearchContent.current)}
          />
        </div>

        {/* <div className="col-span-1 flex">
          <div className="w-full">
            <FilterSelect
              data={[]}
              placeholder="Trạng thái"
              defaultValue={undefined}
              handleSearch={undefined}
            />
          </div>
        </div>

        <div className="col-span-1 flex">
          <div className="w-full">
            <FilterSelect
              data={[]}
              placeholder="Chức vụ"
              defaultValue={undefined}
              handleSearch={undefined}
            />
          </div>
        </div> */}

        {/* <div>
          <IconButton
            title={"Lọc"}
            icon={""}
            toolip={""}
            btnClass="float-right"
          />
        </div> */}
      </div>
    </div>
  );
};

export default StaffListFilter;
