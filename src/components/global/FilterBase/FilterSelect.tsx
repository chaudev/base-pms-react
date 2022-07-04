import React from "react";
import Select, {
  components,
  DropdownIndicatorProps,
  GroupBase,
  StylesConfig,
} from "react-select";
import { TFieldSelect } from "~src/types/field";
import { _format } from "../../../util";

type TProps<TFieldValues> = {
  data: TFieldValues[];
  placeholder: string;
  select?: {
    [P in keyof TFieldSelect<TFieldValues>]: TFieldSelect<TFieldValues>[P];
  };
  handleSearch?: (val: string | number | (string | number)[]) => void;
  handleSubmit?: (val: string | number | (string | number)[]) => void;
  isMulti?: boolean;
  defaultValue?: Partial<TFieldValues>;
  closeMenuOnSelect?: boolean;
  menuPlacement?: "auto" | "bottom" | "top";
  menuPortalTarget?: HTMLElement;
  styles?: StylesConfig<unknown, boolean, GroupBase<unknown>>;
  callback?: (value: number) => Promise<any> | void;
  isClearable?: boolean;
  isLoading?: boolean;
};

export const FilterSelect = <TFieldValues extends object = object>({
  data,
  placeholder,
  select = { label: "name", value: "id" },
  handleSearch,
  handleSubmit,
  isMulti = false,
  defaultValue,
  closeMenuOnSelect = true,
  menuPlacement = "auto",
  menuPortalTarget,
  styles,
  callback,
  isClearable = false,
  isLoading = false,
}: TProps<TFieldValues>) => {
  const { label: l, value: v } = select;

  const id = React.useRef<null | number | number[]>(null);
  const handleId = (val: number | number[]) => (id.current = val);

  const [selected, setSelected] = React.useState<{
    id: number;
    name: number | string;
  }>();

  return (
    <div className="">
      {/* <div className="absolute -top-3 left-4 text-xs bg-[#fff]  px-1 py-[2px] z-10">
        {placeholder}
      </div> */}
      <Select
        instanceId="id-select"
        isMulti={isMulti}
        isClearable={isClearable}
        isLoading={isLoading}
        placeholder={placeholder}
        menuPortalTarget={menuPortalTarget}
        menuPlacement={menuPlacement}
        hideSelectedOptions={false}
        value={selected || defaultValue}
        getOptionLabel={(e) => (e as any)?.[l]}
        getOptionValue={(e) => (e as any)?.[v]}
        closeMenuOnSelect={closeMenuOnSelect}
        defaultValue={defaultValue}
        styles={{ ..._format.customStyles, ...styles }}
        theme={_format.customThemes}
        options={data}
        onChange={(opt: any) => {
          if (Array.isArray(opt)) {
            const newOpt: number[] = opt?.map((item) => item?.[v]);
            handleSubmit ? handleId(newOpt) : handleSearch?.(newOpt);
          } else {
            handleSubmit
              ? handleId(opt?.[v as string])
              : handleSearch?.(opt?.[v as string]);
          }
          setSelected(opt);
          if (callback && !isMulti) {
            (callback(opt?.[v as string]) as any)?.catch(() =>
              setSelected(selected)
            );
          }
        }}
        components={{
          DropdownIndicator: (props: DropdownIndicatorProps) =>
            handleSubmit ? (
              <SearchIndicator
                {...props}
                handleSubmit={() => handleSubmit(id.current as any)}
              />
            ) : (
              <DropdownIndicator {...props} />
            ),
        }}
      />
    </div>
  );
};

const SearchIndicator: React.FC<
  DropdownIndicatorProps & { handleSubmit: () => void }
> = ({ children, handleSubmit, ...rest }) => {
  return (
    <components.DropdownIndicator {...rest}>
      <span onClick={handleSubmit} className="h-full cursor-pointer px-3">
        <i className="text-[#6b6f82] text-base fal fa-search"></i>
      </span>
    </components.DropdownIndicator>
  );
};

const DropdownIndicator: React.FC<DropdownIndicatorProps> = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <span className="h-full cursor-pointer px-3">
        <i className="text-[#6b6f82] text-base far fa-chevron-down"></i>
      </span>
    </components.DropdownIndicator>
  );
};
