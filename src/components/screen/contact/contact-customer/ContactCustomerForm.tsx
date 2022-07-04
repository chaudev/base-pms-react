/* eslint-disable react/no-children-prop */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { contactCustomers } from "~src/api";
import { showToast, toast } from "~src/components";
import { FormInput, FormTextarea } from "~src/components/global";
import { Button } from "~src/components/global/Button/PrimaryButton";
import { FormCard } from "~src/components/global/FormControls/FormCard";
import { FormSelect } from "~src/components/global/FormControls/FormSelect";
import Modal from "~src/components/global/Modal";
import { useCatalogue } from "~src/hook/useCatalogue";

type TProps = {
  visible: boolean;
  onCancel: () => void;
  refetch: any;
};

const ContactCustomerForm: React.FC<TProps> = ({
  visible,
  onCancel,
  refetch,
}) => {
  const [loading, setLoading] = useState(false);
  const { handleSubmit, control, watch, reset } = useForm<any>({
    mode: "onBlur",
  });
  const { sourceTypes } = useCatalogue({ sourceTypesEnabled: true });

  const queryClient = useQueryClient();
  const mutationAdd = useMutation(
    (data: any) => contactCustomers.create(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("ContactData");
        mutationAdd.reset();
        toast.success("Tạo liên hệ mới thành công");
        reset();
        onCancel();
        refetch();
      },
      onError: toast.error,
    }
  );

  const _onPress = (data: any) => {
    mutationAdd.mutateAsync(data);
  };
  return (
    <Modal visible={visible} onCancel={onCancel}>
      <FormCard loading={loading}>
        <FormCard.Header onCancel={onCancel}>
          <div className="w-full">
            <p className="m-0">Thêm liên hệ </p>
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
                  required={true}
                />
              </div>
              <div className="mb-2">
                <FormInput
                  name="phone"
                  control={control}
                  placeholder={""}
                  label="Số điện thoại"
                  required={true}
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
            </div>
            <div className="col-span-1">
              <div className="mb-2">
                <FormInput
                  name="lastName"
                  control={control}
                  placeholder={""}
                  label="Tên"
                  required={true}
                />
              </div>
              <div className="mb-2">
                <FormInput
                  name="email"
                  control={control}
                  placeholder={""}
                  label="Email"
                  required={true}
                />
              </div>
              <div className="mb-2">
                <FormSelect
                  name="sourceTypes"
                  control={control}
                  placeholder={""}
                  label="Nguồn"
                  data={sourceTypes?.Items as any}
                  required={true}
                  select={{ label: "Name", value: "Id" }}
                />
              </div>
            </div>
            <div className="col-span-2">
              <FormTextarea
                name={`contactCustomerMappingRequests.0.description`}
                placeholder=""
                control={control}
                label="Yêu cầu"
                required={false}
              />
            </div>
            <div className="col-span-2">
              <FormTextarea
                name={`contactCustomerNotes.0.note`}
                placeholder=""
                control={control}
                label="Ghi chú"
                required={false}
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

export default ContactCustomerForm;
