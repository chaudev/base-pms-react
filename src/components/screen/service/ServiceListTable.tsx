import { Empty, Tag } from "antd";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { ActionButton } from "~src/components/global/Button/ActionButton";
import { DataTable } from "~src/components/global/table";
import { TColumnsType } from "~src/types/table";

const ServiceListTable: React.FC<{
  data: any;
  loading: boolean;
  pagination: any;
}> = ({ data, loading, pagination }) => {
  const colums: TColumnsType<TCustomers> = [
    {
      title: "Dự án",
      dataIndex: "FullName",
      align: "left",
    },
    {
      title: "Loại dịch vụ",
      dataIndex: "Phone",
      align: "left",
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "Email",
      align: "left",
    },
    {
      title: "Số tiền",
      dataIndex: "FullName",
      align: "left",
    },
    {
      title: "Bắt đầu",
      dataIndex: "FullName",
      align: "left",
    },
    {
      title: "Kết thúc",
      dataIndex: "Status",
      align: "left",
    },
    {
      title: "Trạng thái",
      dataIndex: "FullName",
      align: "left",
      render: (status, record) => <Tag color="orange">{record.StatusName}</Tag>,
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      align: "left",
      render: (_, record) => (
        <>
          <Link href={`/`}>
            <a>
              <ActionButton icon={"fas fa-info"} title="Chi tiết" />
            </a>
          </Link>
        </>
      ),
    },
  ];
  const item = useRef<TUserHistoryRechargeVND>();
  const [modal, setModal] = useState(false);
  const handleModal = (itemSelected: TUserHistoryRechargeVND) => {
    item.current = itemSelected;
    setModal(true);
  };

  return (
    <React.Fragment>
      <div>
        <DataTable
          columns={colums}
          data={data}
          loading={loading}
          pagination={pagination}
        />
      </div>
    </React.Fragment>
  );
};

export default ServiceListTable;
