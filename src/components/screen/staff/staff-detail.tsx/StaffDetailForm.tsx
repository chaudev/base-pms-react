import router from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { user } from "~src/api/user";
import { FormInput, FormSelect, toast } from "~src/components";
import { FormSelectAny, FormTextarea } from "~src/components/global";
import { IconButton } from "~src/components/global/Button/IconButton";
import { FormDate } from "~src/components/global/FormControls/FormDate";
import { GenderData, statusStaff } from "~src/config/appConfig";
import { useCatalogue } from "~src/hook/useCatalogue";
import { _format } from "~src/util";

type TProps = {
  defaultValues: any;
  refetch: () => void;
};

const StaffDetailForm: React.FC<TProps> = ({ defaultValues, refetch }) => {
  const { handleSubmit, control, watch, reset } = useForm<any>({
    mode: "onBlur",
    defaultValues,
  });

  const { roleData, SystemStatus } = useCatalogue({
    roleEnabled: true,
    SystemStatusStatusEnabled: true,
  });

  const mutationUpdate = useMutation(user.update, {
    onSuccess: () => {
      toast.success("Cập nhật liên hệ thành công");
      refetch();
    },
    onError: toast.error,
  });

  const _onPress = (data: any) => {
    if (watch().Roles.toString().indexOf("{") > 0) {
      mutationUpdate.mutateAsync({
        ...data,
        RoleIds: JSON.parse(watch().Roles).map((item: { Id: any }) => {
          return item.Id;
        }),
      });
    } else {
      mutationUpdate.mutateAsync({
        ...data,
        RoleIds: watch().Roles,
      });
    }
    router.back();
  };

  console.log();

  return (
    <div className="grid grid-cols-4 gap-4 bg-[#fff] p-4 rounded-md">
      <div className="col-span-1">
        <FormSelect
          name="Status"
          control={control}
          placeholder={""}
          label="Trạng thái"
          data={SystemStatus?.[2].Catalogue}
          required={false}
          select={{ label: "Name", value: "Id" }}
          defaultValue={SystemStatus?.[2].Catalogue?.[defaultValues?.Status]}
        />
      </div>
      <div className="col-span-1">
        <FormInput
          name="LastName"
          control={control}
          placeholder={""}
          label="Họ"
          required={false}
        />
      </div>
      <div className="col-span-1">
        <FormInput
          name="FirstName"
          control={control}
          placeholder={""}
          label="Tên"
          required={false}
        />
      </div>
      <div className="col-span-1">
        <FormDate
          name="Birthday"
          control={control}
          placeholder={""}
          label="Ngày sinh"
          required={false}
          defaultValue={defaultValues?.Birthday}
        />
      </div>
      <div className="col-span-4 grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <FormSelect
            name="Gender"
            control={control}
            placeholder={""}
            label="Giới tính"
            defaultValue={GenderData?.[defaultValues?.Gender]}
            data={GenderData}
            required={false}
          />
        </div>
        <div className="col-span-1">
          <FormInput
            name="Phone"
            control={control}
            placeholder={""}
            label="Số điện thoại"
            required={false}
          />
        </div>
        <div className="col-span-1">
          <FormInput
            name="Email"
            control={control}
            placeholder={""}
            label="Email"
            required={false}
          />
        </div>
      </div>
      <div className="col-span-4">
        <FormSelectAny
          name="Roles"
          control={control}
          placeholder={""}
          label="Chức vụ"
          data={roleData as any}
          defaultValue={
            defaultValues?.Roles == "" || defaultValues?.Roles == undefined
              ? null
              : JSON.parse(defaultValues?.Roles)?.map((role: { Id: any }) =>
                  roleData?.find((item: { Id: any }) => item.Id == role?.Id)
                )
          }
          required={false}
          select={{ label: "Name", value: "Id" }}
        />
      </div>
      <div className="col-span-4">
        <FormTextarea
          name="Address"
          control={control}
          placeholder={""}
          label="Địa chỉ"
          required={false}
        />
      </div>
      <div className="col-span-4">
        <IconButton
          title={"Cập nhật"}
          icon={"fas fa-check-circle"}
          toolip={""}
          onClick={handleSubmit(_onPress)}
          showLoading
        />
      </div>
    </div>
  );
};

export default StaffDetailForm;
