import { Empty, Tag } from "antd";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { ActionButton } from "~src/components/global/Button/ActionButton";
import { IconButton } from "~src/components/global/Button/IconButton";
import { DataTable } from "~src/components/global/table";
import { TColumnsType } from "~src/types/table";
import ModalUser from "../ModalManagement/ModalUser";

const UserManagementTable: React.FC<{
  data: any;
  loading: boolean;
  pagination: any;
}> = ({ data, loading, pagination }) => {
  const colums: TColumnsType<any> = [
    {
      title: "STT",
      dataIndex: "FullName",
      align: "left",
      width: 40,
      sorter: true,
      render: (_, __, index) => index,
    },
    {
      title: "Tên truy cập",
      dataIndex: "UserName",
      align: "left",
    },
    {
      title: "Tên đầy đủ",
      dataIndex: "FullName",
      align: "left",
    },
    {
      title: "Thuộc nhóm",
      dataIndex: "Group",
      align: "left",
    },
  ];

  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalRemove, setModalRemove] = useState(false);
  return (
    <React.Fragment>
      <div className="text-center text-base text-main font-semibold mb-2">
        {" "}
        <span> QUẢN LÝ USER</span>
      </div>
      <div className="text-right mb-4">
        <IconButton
          title={"Thêm"}
          icon={"fas fa-plus"}
          toolip={""}
          btnClass="mr-4"
          green
          onClick={() => setModalAdd(true)}
        />
        <IconButton
          title={"sửa"}
          icon={"fas fa-edit"}
          toolip={""}
          btnClass="mr-4"
          yellow
          onClick={() => setModalEdit(true)}
        />
        <IconButton
          title={"Xoá"}
          icon={"fas fa-times"}
          toolip={""}
          red
          onClick={() => setModalRemove(true)}
        />
      </div>
      <div>
        <DataTable
          columns={colums}
          data={data}
          loading={loading}
          pagination={pagination}
        />
      </div>
      <ModalUser
        visible={modalAdd}
        onCancel={() => setModalAdd(false)}
        feching={undefined}
        title={"Thêm chức năng user"}
        onPress={() => undefined}
        titleButton={"Thêm"}
      />
      <ModalUser
        visible={modalEdit}
        onCancel={() => setModalEdit(false)}
        feching={undefined}
        title={"Sửa chức năng user"}
        onPress={() => undefined}
        titleButton={"Cập nhật"}
      />
      <ModalUser
        visible={modalRemove}
        onCancel={() => setModalRemove(false)}
        feching={undefined}
        title={"Xoá chức năng user"}
        onPress={() => undefined}
        titleButton={"Xoá"}
      />
    </React.Fragment>
  );
};

export default UserManagementTable;
