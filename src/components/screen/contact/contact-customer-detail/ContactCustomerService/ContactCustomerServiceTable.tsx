import React from "react";
import { ActionButton } from "~src/components/global/Button/ActionButton";
import { DataTable } from "~src/components/global/table";
import { TColumnsType } from "~src/types/table";

const ContactCustomerServiceTable: React.FC<{ data: any }> = ({ data }) => {
  const colums: TColumnsType<THistoryContact> = [
    {
      title: "ID",
      dataIndex: "Id",
      align: "center",
      render: (_, __, index) => index,
    },
    {
      title: "Ngày tạo",
      dataIndex: "Created",
      align: "left",
    },
    {
      title: "Nội dung",
      dataIndex: "Description",
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
            title="Gán"
            onClick={() => undefined}
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      <DataTable columns={colums} data={data} />
    </div>
  );
};

export default ContactCustomerServiceTable;
