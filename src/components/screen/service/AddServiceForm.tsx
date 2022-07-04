/* eslint-disable react/no-children-prop */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { contactCustomers } from "~src/api";
import { showToast, toast } from "~src/components";
import { FormInput, FormTextarea } from "~src/components/global";
import { Button } from "~src/components/global/Button/PrimaryButton";
import { FormCard } from "~src/components/global/FormControls/FormCard";
import { FormDate } from "~src/components/global/FormControls/FormDate";
import { FormSelect } from "~src/components/global/FormControls/FormSelect";
import Modal from "~src/components/global/Modal";
import { useCatalogue } from "~src/hook/useCatalogue";

type TProps = {
  visible: boolean;
  onCancel: () => void;
  feching: any;
};

const AddServiceForm: React.FC<TProps> = ({ visible, onCancel, feching }) => {
  const [loading, setLoading] = useState(false);
  const { handleSubmit, control, watch, reset } = useForm<any>({
    mode: "onBlur",
  });
  const { sourceTypes } = useCatalogue({ sourceTypesEnabled: true });

  const _onPress = (data: any) => {
    console.log(data);
    onCancel();
  };
  return (
    <Modal visible={visible} onCancel={onCancel}>
      <FormCard loading={loading}>
        <FormCard.Header onCancel={onCancel}>
          <div className="w-full">
            <p>Thêm liên hệ </p>
          </div>
        </FormCard.Header>
        <FormCard.Body>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div className="col-span-2">
              <FormSelect
                name="sourceTypes"
                control={control}
                placeholder={""}
                label="Dự án"
                data={[]}
                required={true}
                select={{ label: "Name", value: "Id" }}
              />
            </div>
            <div className="col-span-1">
              <div className="mb-2">
                <FormInput
                  name="firstName"
                  control={control}
                  placeholder={""}
                  label="Dịch vụ"
                  required={true}
                />
              </div>
              <div className="mb-2">
                <FormInput
                  name="phone"
                  control={control}
                  placeholder={""}
                  label="Giá tiền"
                  required={true}
                />
              </div>
              <div className="mb-2">
                <FormInput
                  name="address"
                  control={control}
                  placeholder={""}
                  label="Thời gian"
                  required={false}
                />
              </div>
            </div>
            <div className="col-span-1">
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
              <div className="mb-2">
                <FormDate
                  name="email"
                  control={control}
                  placeholder={""}
                  label="Bắt đầu"
                  required={true}
                />
              </div>
              <div className="mb-2">
                <FormSelect
                  name="sourceTypes"
                  control={control}
                  placeholder={""}
                  label="Thời gian"
                  data={[]}
                  required={true}
                  select={{ label: "Name", value: "Id" }}
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

export default AddServiceForm;
