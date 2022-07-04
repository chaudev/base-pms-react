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
  title: string;
  onPress: () => void;
  titleButton: string;
};

const DecentralizationModal: React.FC<TProps> = ({
  visible,
  onCancel,
  feching,
  title,
  onPress,
  titleButton,
}) => {
  const [loading, setLoading] = useState(false);
  const { handleSubmit, control, watch, reset } = useForm<any>({
    mode: "onBlur",
  });

  return (
    <Modal visible={visible} onCancel={onCancel} width={500}>
      <FormCard loading={loading}>
        <FormCard.Header onCancel={onCancel}>
          <div className="w-full">
            <p>{title} </p>
          </div>
        </FormCard.Header>
        <FormCard.Body>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div className="col-span-2">
              <div className="mb-2">
                <FormInput
                  name="UserName"
                  control={control}
                  placeholder={""}
                  label="Mã chức năng"
                  required={true}
                />
              </div>
              <div className="mb-2">
                <FormInput
                  name="FullName"
                  control={control}
                  placeholder={""}
                  label="Tên chức năng"
                  required={true}
                />
              </div>
            </div>
          </div>
        </FormCard.Body>
        <FormCard.Footer>
          <Button
            title={titleButton}
            btnClass="!bg-main"
            showLoading
            onClick={handleSubmit(onPress)}
          />
          <Button title="Hủy" btnClass="!bg-pending" onClick={onCancel} />
        </FormCard.Footer>
      </FormCard>
    </Modal>
  );
};

export default DecentralizationModal;
