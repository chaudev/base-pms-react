import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { IconButton } from "~src/components/global/Button/IconButton";
import { FilterInput } from "~src/components/global/FilterBase";
import { FilterSelect } from "~src/components/global/FilterBase/FilterSelect";

type TProps = {
  handleFilter: (
    searchId: number,
    code: string,
    fromDate: string,
    toDate: string,
    fromPrice: number,
    toPrice: number,
    statusIds: number[],
    orderHasnotCode: boolean
  ) => void;
};

const ServiceListFilter: React.FC<TProps> = () => {
  const { handleSubmit, reset, watch, setValue, control } = useForm<any>({
    mode: "onBlur",
  });
  const toDate = useRef<string>(null);
  const fromDate = useRef<number>(null);
  return (
    <div className=" bg-[#fff] w-full p-4 mb-4 rounded-md">
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-1 flex items-center ">
          <div className="w-full">
            <FilterInput
              placeholder="Tìm kiếm"
              id="UserName"
              name="UserName"
              handleSubmit={(val: string) => undefined}
              inputClassName="w-full"
            />
          </div>
        </div>

        <div className="col-span-1 flex">
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
              placeholder="Từ ngày"
              defaultValue={undefined}
              handleSearch={undefined}
            />
          </div>
        </div>

        <div className="col-span-1 flex">
          <div className="w-full">
            <FilterSelect
              data={[]}
              placeholder="Đến ngày"
              defaultValue={undefined}
              handleSearch={undefined}
            />
          </div>
        </div>
        <div>
          <IconButton
            title={"Lọc"}
            icon={""}
            toolip={""}
            btnClass="float-right"
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceListFilter;
