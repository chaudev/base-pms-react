import Link from "next/link";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FormSelect } from "~src/components";
import { ActionButton } from "~src/components/global/Button/ActionButton";
import { DataTable } from "~src/components/global/table";
import { TColumnsType } from "~src/types/table";
import { _format } from "~src/util";

const StaffListTable: React.FC<{
  data: any;
  loading: boolean;
  pagination: any;
  // roleData: any;
}> = ({ data, loading, pagination }) => {
  const { handleSubmit, control, watch, reset } = useForm<TStaff>({
    mode: "onBlur",
  });

  const colums: TColumnsType<TStaff> = [
    {
      title: "ID",
      dataIndex: "Id",
      align: "center",
      render: (_, __, index) => index,
      sorter: true,
      width: 40,
    },
    {
      title: "Họ và tên",
      dataIndex: "FullName",
      align: "left",
    },
    {
      title: "Chức vụ",
      dataIndex: "Roles",
      align: "left",
      render: (_, record) => (
        <div className="grid grid-cols-2 gap-2">
          {record?.Roles === "" || record?.Roles == undefined
            ? null
            : JSON.parse(record?.Roles)?.map((item: { Name: any }) => (
                <>
                  <div
                    key={item.Name}
                    className="col-span-2 bg-[#e7e1f5] px-2 rounded-md border-[#8842bd] border text-[#8842bd]"
                  >
                    {item?.Name}
                  </div>
                </>
              ))}
        </div>
      ),
      width: 170,
    },
    {
      title: "Tài khoản",
      dataIndex: "Username",
      align: "left",
    },
    {
      title: "Số điện thoại",
      dataIndex: "Phone",
      align: "left",
    },
    {
      title: "Email",
      dataIndex: "Email",
      align: "left",
    },
    {
      title: "Địa chỉ",
      dataIndex: "Address",
      align: "left",
    },
    {
      title: "Ngày tạo",
      dataIndex: "Created",
      align: "left",
      render: (status, record) => (
        <p>{_format.converseDateTime(record?.Created)}</p>
      ),
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      align: "left",
      render: (_, record) => (
        <>
          <Link href={`/staff/${record.Id}`}>
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

export default StaffListTable;
