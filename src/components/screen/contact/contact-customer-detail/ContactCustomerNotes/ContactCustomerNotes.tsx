/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { contactCustomersNotes } from "~src/api";
import { toast } from "~src/components";
import { FormTextarea } from "~src/components/global";
import { IconButton } from "~src/components/global/Button/IconButton";

const ContactCustomerNotes: React.FC<{
  defaultValues: any;
  refetch: () => void;
}> = ({ defaultValues, refetch }) => {
  const [note, setNote] = useState(false);
  const { handleSubmit, control, reset } = useForm<TNote>({
    mode: "onBlur",
  });

  const queryClient = useQueryClient();
  const mutationAdd = useMutation(
    (data: TNote) => contactCustomersNotes.create(data),
    {
      onSuccess: () => {
        toast.success("Tạo ghi chú thành công");
        reset();
        refetch();
      },
      onError: toast.error,
    }
  );

  const _handelAddNote = (data: TNote) => {
    // console.log();
    mutationAdd.mutateAsync({ ...data, contactCustomerId: defaultValues });
  };

  return (
    <React.Fragment>
      <div>
        <div className="flex justify-between mb-4">
          <span className="text-main text-base font-semibold flex items-center">
            Danh sách ghi chú
          </span>
          {(!note && (
            <IconButton
              title={"Thêm ghi chú"}
              icon={"fas fa-plus"}
              toolip={""}
              onClick={() => setNote(true)}
            />
          )) || (
            <IconButton
              title={"Đóng ghi chú"}
              icon={"fas fa-ban"}
              toolip={""}
              onClick={() => setNote(false)}
            />
          )}
        </div>
        {note && (
          <>
            <div>
              <FormTextarea
                name="note"
                placeholder=""
                control={control}
                inputClassName="rounded-md w-full mt-4 p-2"
              />
            </div>
            <div className="flex justify-end mt-4">
              <IconButton
                title={"Tạo ghi chú"}
                icon={"fas fa-check-circle"}
                toolip={""}
                onClick={handleSubmit(_handelAddNote)}
              />
            </div>
          </>
        )}
      </div>
    </React.Fragment>
  );
};

export default ContactCustomerNotes;
