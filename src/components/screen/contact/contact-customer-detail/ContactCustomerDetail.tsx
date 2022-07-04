import router from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { contactCustomers, contactCustomersNotes } from "~src/api";
import { toast } from "~src/components";
import { FormInput, FormTextarea } from "~src/components/global";
import { IconButton } from "~src/components/global/Button/IconButton";
import { FormSelect } from "~src/components/global/FormControls/FormSelect";
import { useCatalogue } from "~src/hook/useCatalogue";
import ContacCustomerNoteTable from "./ContactCustomerNotes/ContacCustomerNoteTable";
import ContactCustomerNotes from "./ContactCustomerNotes/ContactCustomerNotes";
import ContactCustomerRealRequestTable from "./ContactCustomerRequest/ContactCustomerRealRequestTable";
import ContactCustomerRequestTable from "./ContactCustomerRequest/ContactCustomerRequestTable";
import styles from "./index.module.scss";

const ContactCustomerDetail: React.FC<{
  defaultValues: TCustomers;
  refetch: () => void;
}> = ({ defaultValues, refetch }) => {
  const { handleSubmit, reset, watch, setValue, control } = useForm<TCustomers>(
    {
      mode: "onBlur",
      defaultValues,
    }
  );

  const { SystemStatus } = useCatalogue({
    SystemStatusStatusEnabled: true,
  });

  const mutationUpdate = useMutation(contactCustomers.update, {
    onSuccess: () => toast.success("Cập nhật liên hệ thành công"),
    onError: toast.error,
  });

  const _onPress = (data: any) => {
    mutationUpdate.mutateAsync(data);
    router.back();
    // console.log(data);
  };

  return (
    <React.Fragment>
      <div className={styles.container}>
        <div className={styles.boxItemLeft}>
          <div className={styles.boxItem}>
            <div className={styles.itemColLeft}>
              <span className="t">Họ</span>
            </div>
            <div className={styles.itemColRight}>
              <FormInput
                name="FirstName"
                control={control}
                placeholder={""}
                inputClassName="w-full"
              />
            </div>
          </div>
          <div className={styles.boxItem}>
            <div className={styles.itemColLeft}>
              <span className="t">Tên</span>
            </div>
            <div className={styles.itemColRight}>
              <FormInput
                name="LastName"
                control={control}
                placeholder={""}
                inputClassName="w-full"
              />
            </div>
          </div>
          <div className={styles.boxItem}>
            <div className={styles.itemColLeft}>
              <span className="t">Tên đầy đủ</span>
            </div>
            <div className={styles.itemColRight}>
              <FormInput
                name="FullName"
                control={control}
                placeholder={""}
                inputClassName="w-full"
              />
            </div>
          </div>
          <div className={styles.boxItem}>
            <div className={styles.itemColLeft}>
              <span className="t">Số điện thoại</span>
            </div>
            <div className={styles.itemColRight}>
              <FormInput
                name="Phone"
                control={control}
                placeholder={""}
                inputClassName="w-full"
              />
            </div>
          </div>
          <div className={styles.boxItem}>
            <div className={styles.itemColLeft}>
              <span className="t">Email</span>
            </div>
            <div className={styles.itemColRight}>
              <FormInput
                name="Email"
                control={control}
                placeholder={""}
                inputClassName="w-full"
              />
            </div>
          </div>
          <div className={styles.boxItem}>
            <div className={styles.itemColLeft}>
              <span className="t">Địa chỉ</span>
            </div>
            <div className={styles.itemColRight}>
              <FormInput
                name="Address"
                control={control}
                placeholder={""}
                inputClassName="w-full"
              />
            </div>
          </div>
          <div className={styles.boxItem}>
            <div className={styles.itemColLeft}>
              <span className="t">Trạng thái</span>
            </div>
            <div className={styles.itemColRight}>
              <FormSelect
                name="Status"
                control={control}
                placeholder={""}
                data={SystemStatus?.[0]?.Catalogue}
                select={{ label: "Name", value: "Id" }}
                required={false}
                defaultValue={{
                  Id: defaultValues?.Status,
                  Name: defaultValues?.StatusName,
                }}
              />
            </div>
          </div>
          <div className={styles.boxItem}>
            <div className={styles.itemColLeft}>
              <span className="t">Chức vụ</span>
            </div>
            <div className={styles.itemColRight}>
              <FormInput
                name="CustomerPosition"
                control={control}
                placeholder={""}
                inputClassName="w-full"
              />
            </div>
          </div>
          <div className={styles.boxItem}>
            <div className={styles.itemColLeft}>
              <span className="t">Công ty</span>
            </div>
            <div className={styles.itemColRight}>
              <FormInput
                name="CompanyName"
                control={control}
                placeholder={""}
                inputClassName="w-full"
              />
            </div>
          </div>
          <div className="mt-4">
            <IconButton
              title={"Cập nhật"}
              icon={""}
              toolip={"Cập nhật"}
              onClick={handleSubmit(_onPress)}
            />
            <IconButton
              title={"Xoá"}
              icon={""}
              toolip={"Cập nhật"}
              onClick={() => undefined}
              btnClass="ml-4 !bg-[#f50400]"
            />
          </div>
        </div>
        <div className={styles.boxItemRight}>
          <ContactCustomerNotes
            defaultValues={defaultValues?.Id}
            refetch={refetch}
          />
          <div>
            <div className="my-4">
              <ContacCustomerNoteTable
                data={defaultValues?.ContactCustomerNotes}
                refetch={refetch}
              />
            </div>
            <div>
              <ContactCustomerRequestTable
                data={defaultValues?.ContactCustomerMappingRequests}
              />
            </div>
            <div>
              <ContactCustomerRealRequestTable
                data={defaultValues?.ContactCustomerSaleRequests}
                refetch={refetch}
                defaultValues={defaultValues?.Id}
              />
            </div>
            <div className="text-right mt-4">
              <IconButton
                title={"Tệp đính kèm"}
                icon={"fas fa-paperclip"}
                toolip={""}
                btnClass={"bg-[#7f30db]"}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ContactCustomerDetail;
