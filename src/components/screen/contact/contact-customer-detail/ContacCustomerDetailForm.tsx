/* eslint-disable react/no-children-prop */
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { contactCustomers } from "~src/api";
import { showToast, toast } from "~src/components";
import { FormInput, FormTextarea } from "~src/components/global";
import { Button } from "~src/components/global/Button/PrimaryButton";
import { FormCard } from "~src/components/global/FormControls/FormCard";
import { FormSelect } from "~src/components/global/FormControls/FormSelect";
import Modal from "~src/components/global/Modal";

type TProps = {
  visible: boolean;
  onCancel: () => void;
  userGroup: any;
  defauValues: any;
  refetch: any;
};

const ContactCustomerDetailForm: React.FC<TProps> = ({
  visible,
  onCancel,
  userGroup,
  defauValues,
  refetch,
}) => {
  const { handleSubmit, control, watch, reset } = useForm<any>({
    mode: "onBlur",
  });
  const mutationUpdate = useMutation(
    (data: { contactCustomerId: string; saleId: string }) =>
      contactCustomers.updateAssignContact(data),
    {
      onSuccess: () => {
        toast.success("Cập nhật liên hệ thành công");
        refetch();
        onCancel();
      },
      onError: toast.error,
    }
  );
  const _onPress = (data: any) => {
    // console.log({ ...data, contactCustomerId: defauValues });
    mutationUpdate.mutateAsync({ ...data, contactCustomerId: defauValues });
  };

  return (
    <Modal visible={visible} onCancel={onCancel} width={400}>
      <FormCard>
        <FormCard.Header onCancel={onCancel}>
          <div className="w-full">
            <p className="!m-0">Assign</p>
          </div>
        </FormCard.Header>
        <FormCard.Body>
          <div className="">
            <div className="mb-2">
              <FormSelect
                name="saleId"
                control={control}
                placeholder={""}
                label="Nhân viên"
                data={userGroup as any}
                required={false}
                select={{ label: "FullName", value: "Id" }}
              />
            </div>
          </div>
        </FormCard.Body>
        <FormCard.Footer>
          <Button
            title="Cập nhật"
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

export default ContactCustomerDetailForm;
