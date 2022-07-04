import { Empty, Tag } from "antd";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { ActionButton } from "~src/components/global/Button/ActionButton";
import { IconButton } from "~src/components/global/Button/IconButton";
import { DataTable } from "~src/components/global/table";
import { TColumnsType } from "~src/types/table";
import ModalUserGroup from "../ModalManagement/ModalUserGroup";

const UserGroupManagementTable: React.FC<{
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
      title: "Mã nhóm",
      dataIndex: "GroupCode",
      align: "left",
    },
    {
      title: "Tên nhóm",
      dataIndex: "GroupName",
      align: "left",
    },
  ];

  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalRemove, setModalRemove] = useState(false);
  return (
    <React.Fragment>
      <div className="text-center text-base text-main font-semibold mb-2">
        <span>QUẢN LÝ NHÓM USER</span>
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
      <div>
        <ModalUserGroup
          visible={modalAdd}
          onCancel={() => setModalAdd(false)}
          feching={undefined}
          title={"Thêm nhóm user"}
          titleButton={"Thêm"}
          onPress={() => undefined}
        />
      </div>
      <div>
        <ModalUserGroup
          visible={modalEdit}
          onCancel={() => setModalEdit(false)}
          feching={undefined}
          title={"Sửa nhóm user"}
          titleButton={"Cập nhật"}
          onPress={() => undefined}
        />
      </div>
      <div>
        <ModalUserGroup
          visible={modalRemove}
          onCancel={() => setModalRemove(false)}
          feching={undefined}
          title={"Xoá nhóm user"}
          titleButton={"Xoá"}
          onPress={() => undefined}
        />
      </div>
    </React.Fragment>
  );
};

export default UserGroupManagementTable;
