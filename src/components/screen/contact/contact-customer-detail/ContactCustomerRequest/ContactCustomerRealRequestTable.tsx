import React, { useState } from "react";
import { ActionButton } from "~src/components/global/Button/ActionButton";
import { IconButton } from "~src/components/global/Button/IconButton";
import { DataTable } from "~src/components/global/table";
import { TColumnsType } from "~src/types/table";
import { _format } from "~src/util";
import ContactCustomerAddRequestForm from "../../contact-customer/ContactCustomerAddRequestForm";

const ContactCustomerRealRequestTable: React.FC<{
  data: any;
  refetch: any;
  defaultValues: any;
}> = ({ data, refetch, defaultValues }) => {
  const colums: TColumnsType<THistoryContact> = [
    {
      title: "ID",
      dataIndex: "Id",
      align: "center",
      render: (_, __, index) => index,
      width: 50,
    },
    {
      title: "Ngày tạo",
      dataIndex: "Created",
      align: "left",
      width: 100,
      render: (_, record) => (
        <div>{_format.converseDateTime(record?.Created)}</div>
      ),
    },
    {
      title: "Nội dung",
      dataIndex: "RequestDescription",
      align: "left",
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      align: "left",
      width: 50,
      render: (_, record) => (
        <div className="flex">
          <ActionButton
            icon={"fas fa-edit"}
            title="Chỉnh sửa"
            onClick={() => undefined}
          />
        </div>
      ),
    },
  ];

  const [modal, setModal] = useState(false);
  return (
    <>
      <div className="flex justify-between my-4">
        <span className="text-main text-base font-semibold flex items-center">
          Danh sách yêu cầu thực tế
        </span>
        <div>
          <IconButton
            title={"Thêm yêu cầu"}
            icon={"fas fa-plus"}
            toolip={""}
            btnClass={""}
            onClick={() => setModal(true)}
          />
        </div>
      </div>
      <div>
        <DataTable columns={colums} data={data} />
      </div>
      <ContactCustomerAddRequestForm
        visible={modal}
        onCancel={() => setModal(false)}
        refetch={refetch}
        defauValues={defaultValues}
      />
    </>
  );
};

export default ContactCustomerRealRequestTable;
