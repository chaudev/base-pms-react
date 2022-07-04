import React from "react";
import { ActionButton } from "~src/components/global/Button/ActionButton";
import { DataTable } from "~src/components/global/table";
import { TColumnsType } from "~src/types/table";
import { _format } from "~src/util";

const ContactCustomerRequestTable: React.FC<{ data: any }> = ({ data }) => {
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
      dataIndex: "Description",
      align: "left",
    },
  ];
  return (
    <>
      <div className="mb-4">
        <span className="text-main text-base font-semibold flex items-center">
          Danh sách yêu cầu ban đầu
        </span>
      </div>
      <div>
        <DataTable columns={colums} data={data} />
      </div>
    </>
  );
};

export default ContactCustomerRequestTable;
