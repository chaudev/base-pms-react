/* eslint-disable react/no-children-prop */
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { contactCustomers, contactCustomersNotes } from "~src/api";
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
  defaulId: any;
};

const ContactCustomerNoteForm: React.FC<TProps> = ({
  visible,
  onCancel,
  refetch,
  defaulId,
}) => {
  const [loading, setLoading] = useState(false);
  const { handleSubmit, control, watch, reset } = useForm<any>({
    mode: "onBlur",
  });
  const { data, isLoading } = useQuery(
    ["noteContactData", defaulId],
    () => contactCustomersNotes.getByID(defaulId),
    {
      enabled: !!defaulId,
      refetchOnWindowFocus: false,
      onSuccess: (data) => reset(data.Data),
      onError: toast.error,
    }
  );

  const mutationUpdate = useMutation(contactCustomersNotes.update, {
    onSuccess: (data) => {
      toast.success("Cập nhật ghi chú thành công");
      refetch();
      onCancel();
    },
    onError: toast.error,
  });

  const _onPress = (data: any) => {
    mutationUpdate.mutateAsync(data);
  };
  return (
    <Modal visible={visible} onCancel={onCancel}>
      <FormCard loading={loading}>
        <FormCard.Header onCancel={onCancel}>
          <div className="w-full">
            <p className="m-0">Sửa ghi chú </p>
          </div>
        </FormCard.Header>
        <FormCard.Body>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div className="col-span-2">
              <FormTextarea
                name="Note"
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

export default ContactCustomerNoteForm;
