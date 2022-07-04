import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IconButton } from "~src/components/global/Button/IconButton";
import {
  FilterInput,
  FilterRangeDate,
  FilterSelectAny,
} from "~src/components/global/FilterBase";
import { FilterSelect } from "~src/components/global/FilterBase/FilterSelect";
import { useCatalogue } from "~src/hook/useCatalogue";
import { _format } from "~src/util";

type TProps = {
  handleFilter: (
    SearchContent?: string | null,
    Status?: any | null,
    SourceIds?: string | any,
    FromDate?: number | null,
    ToDate?: number | null,
    SalerIds?: any | null
  ) => void;
};

const ContacCustomerFilter: React.FC<TProps> = ({ handleFilter }) => {
  const [filter, setFilter] = useState(false);

  const SearchContent = useRef<string | null>(null);
  const ToDate = useRef<string | null>(null);
  const FromDate = useRef<string | null>(null);
  const Status = useRef<any | null>(null);
  const SourceIds = useRef<any | null>(null);
  const SaleIds = useRef<any | null>(null);

  const { sourceTypes, userGroup, SystemStatus } = useCatalogue({
    sourceTypesEnabled: true,
    userGroupEnabled: true,
    SystemStatusStatusEnabled: true,
  });

  return (
    <div className=" bg-[#fff] w-full p-4 mb-4 rounded-md">
      <div className="flex justify-between gap-4">
        <div className="w-full max-w-[500px] flex">
          <FilterInput
            placeholder="Tìm kiếm"
            id="UserName"
            name="SearchContent"
            handleSearch={(val: string) => (SearchContent.current = val)}
            inputClassName="w-full"
          />
          <IconButton
            title={"Tìm kiếm"}
            icon={""}
            toolip={""}
            btnClass="ml-4 w-[120px]"
            onClick={() => handleFilter(SearchContent.current)}
          />
        </div>
        {(!filter && (
          <IconButton
            title={"Bộ lọc"}
            icon={"fas fa-filter"}
            toolip={""}
            onClick={() => setFilter(true)}
            btnClass=""
          />
        )) || (
          <IconButton
            title={"Đóng bộ lọc"}
            icon={"fas fa-filter"}
            toolip={""}
            onClick={() => {
              handleFilter(
                (SearchContent.current = null),
                (Status.current = null),
                (SourceIds.current = null),
                (SaleIds.current = null),
                (FromDate.current = null),
                (ToDate.current = null)
              );
              setFilter(false);
            }}
            btnClass=""
          />
        )}
      </div>
      {filter && (
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="col-span-2 flex">
            <div className="w-full">
              <FilterSelect
                // name="Status"
                data={SystemStatus?.[0]?.Catalogue as any}
                placeholder="Tìm kiếm trạng thái"
                defaultValue={SystemStatus?.[0].Catalogue?.[0]}
                select={{ label: "Name", value: "Id" }}
                handleSearch={(val: any) => (Status.current = val)}
              />
            </div>
          </div>
          <div className="col-span-2 flex">
            <div className="w-full">
              <FilterSelectAny
                data={sourceTypes?.Items as any}
                placeholder="Tìm kiếm Nguồn"
                defaultValue={undefined}
                select={{ label: "Name", value: "Id" }}
                handleSearch={(val: any) => (SourceIds.current = val)}
              />
            </div>
          </div>
          <div className="col-span-2 flex items-center">
            <div className="w-full">
              <FilterSelectAny
                data={userGroup as any}
                placeholder="Tìm kiếm saler"
                defaultValue={undefined}
                select={{ label: "FullName", value: "Id" }}
                handleSearch={(val: any) => (SaleIds.current = val)}
              />
            </div>
          </div>
          <div className="col-span-2 flex">
            <div className="w-full">
              <FilterRangeDate
                handleDate={(val: (string | null)[]) => {
                  FromDate.current = val[0];
                  ToDate.current = val[1];
                }}
                placeholder="Từ ngày / Đến ngày"
                showTime
                format="DD/MM/YYYY HH:mm"
              />
            </div>
          </div>
          <div className="col-span-2 flex">
            <div className="w-full text-right">
              <IconButton
                title={"Tìm kiếm"}
                icon={"fas fa-filter"}
                toolip={""}
                onClick={() =>
                  handleFilter(
                    SearchContent.current,
                    Status.current,
                    SourceIds.current || null,
                    SaleIds.current || null,
                    _format.converseDateNumber(FromDate.current) || null,
                    _format.converseDateNumber(ToDate.current) || null
                  )
                }
                btnClass=""
                showLoading
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContacCustomerFilter;
