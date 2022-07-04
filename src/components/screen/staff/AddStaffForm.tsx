/* eslint-disable react/no-children-prop */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { user } from "~src/api/user";
import { showToast, toast } from "~src/components";
import { FormInput, FormInputPW, FormTextarea } from "~src/components/global";
import { Button } from "~src/components/global/Button/PrimaryButton";
import { FormCard } from "~src/components/global/FormControls/FormCard";
import { FormDate } from "~src/components/global/FormControls/FormDate";
import { FormSelect } from "~src/components/global/FormControls/FormSelect";
import Modal from "~src/components/global/Modal";
import { useCatalogue } from "~src/hook/useCatalogue";
import { _format } from "~src/util";

type TProps = {
  visible: boolean;
  onCancel: () => void;
  refetch: () => void;
};

const AddStaffForm: React.FC<TProps> = ({ visible, onCancel, refetch }) => {
  const [loading, setLoading] = useState(false);
  const { handleSubmit, control, watch, reset } = useForm<any>({
    mode: "onBlur",
  });

  const { roleData } = useCatalogue({ roleEnabled: true });

  const queryClient = useQueryClient();
  const mutationAdd = useMutation((data: any) => user.create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("staffData");
      toast.success("Tạo nhân sự mới thành công");
      reset();
      onCancel();
      refetch();
    },
    onError: toast.error,
  });

  const _onPress = (data: any) => {
    mutationAdd.mutateAsync({ ...data, RoleIds: [watch().RoleIds] });
  };
  return (
    <Modal visible={visible} onCancel={onCancel}>
      <FormCard loading={loading}>
        <FormCard.Header onCancel={onCancel}>
          <div className="w-full">
            <p>Thêm nhân sự </p>
          </div>
        </FormCard.Header>
        <FormCard.Body>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div className="col-span-1">
              <div className="mb-2">
                <FormInput
                  name="firstName"
                  control={control}
                  placeholder={""}
                  label="Họ"
                  rules={{ required: "Không bỏ trống họ" }}
                />
              </div>
              <div className="mb-2">
                <FormInput
                  name="lastName"
                  control={control}
                  placeholder={""}
                  label="Tên"
                  rules={{ required: "Không bỏ trống tên" }}
                />
              </div>
              <div className="mb-2">
                <FormInput
                  name="address"
                  control={control}
                  placeholder={""}
                  label="Địa chỉ"
                  required={false}
                />
              </div>
              <div className="mb-2">
                <FormInput
                  name="email"
                  control={control}
                  placeholder={""}
                  label="Email"
                  rules={{ required: "Không bỏ trống email" }}
                  type="email"
                />
              </div>
            </div>
            <div className="col-span-1">
              <div className="mb-2">
                <FormInput
                  name="phone"
                  control={control}
                  placeholder={""}
                  label="Số điện thoại"
                  rules={{ required: "Không bỏ trống số điện thoại" }}
                />
              </div>
              <div className="mb-2">
                <FormInput
                  name="username"
                  control={control}
                  placeholder={""}
                  label="Tài khoản"
                  rules={{ required: "Không bỏ trống email" }}
                  type="email"
                />
              </div>
              <div className="mb-2">
                <FormInputPW
                  name="password"
                  control={control}
                  placeholder={""}
                  label="Mật khẩu"
                  rules={{ required: "Không bỏ trống email" }}
                  type="email"
                />
              </div>
              <div className="mb-2">
                <FormDate
                  name="Birthday"
                  control={control}
                  placeholder={""}
                  label="Ngày sinh"
                  rules={{ required: "Không bỏ trống nguồn" }}
                />
              </div>
            </div>
            <div className="col-span-2">
              <FormSelect
                name="RoleIds"
                control={control}
                placeholder={""}
                label="Chức vụ"
                data={roleData as any}
                required={false}
                select={{ label: "Name", value: "Id" }}
              />
            </div>
          </div>
        </FormCard.Body>
        <FormCard.Footer>
          <Button
            title="Thêm"
            btnClass="!bg-main"
            showLoading
            onClick={handleSubmit(_onPress)}
          />
          <Button title="Hủy" btnClass="!bg-pending" onClick={onCancel} />
        </FormCard.Footer>
      </FormCard>
    </Modal>
  );
};

export default AddStaffForm;
