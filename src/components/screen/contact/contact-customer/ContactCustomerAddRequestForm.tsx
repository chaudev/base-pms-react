/* eslint-disable react/no-children-prop */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { contactCustomerSaleRequests } from "~src/api";
import { showToast, toast } from "~src/components";
import { FormInput, FormTextarea } from "~src/components/global";
import { Button } from "~src/components/global/Button/PrimaryButton";
import { FormCard } from "~src/components/global/FormControls/FormCard";
import { FormSelect } from "~src/components/global/FormControls/FormSelect";
import Modal from "~src/components/global/Modal";

type TProps = {
  visible: boolean;
  onCancel: () => void;
  refetch?: any;
  defauValues: any;
};

const ContactCustomerAddRequestForm: React.FC<TProps> = ({
  visible,
  onCancel,
  refetch,
  defauValues,
}) => {
  const [loading, setLoading] = useState(false);
  const { handleSubmit, control, watch, reset } = useForm<any>({
    mode: "onBlur",
  });

  const queryClient = useQueryClient();
  const mutationAdd = useMutation(
    (data: TNote) => contactCustomerSaleRequests.create(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("ContactRequestData");
        reset();
        toast.success("Tạo yêu cầu thực tế thành công");
        refetch();
      },
      onError: toast.error,
    }
  );

  const _onPress = (data: any) => {
    mutationAdd.mutateAsync({ ...data, contactCustomerId: defauValues });
    // console.log("data", );
    onCancel();
  };
  return (
    <Modal visible={visible} onCancel={onCancel}>
      <FormCard loading={loading}>
        <FormCard.Header onCancel={onCancel}>
          <div className="w-full">
            <p>Thêm yêu cầu thực tế </p>
          </div>
        </FormCard.Header>
        <FormCard.Body>
          <div className="grid grid-cols-2">
            <div className="col-span-2">
              <div className="mb-2">
                <FormTextarea
                  control={control}
                  name={`requestDescription`}
                  placeholder=""
                  inputClassName=""
                  label="Yêu cầu thực tế"
                />
              </div>
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

export default ContactCustomerAddRequestForm;
