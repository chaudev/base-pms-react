import { Checkbox, Empty, Tag } from "antd";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FormSelect } from "~src/components";
import { IconButton } from "~src/components/global/Button/IconButton";
import { DataTable } from "~src/components/global/table";
import { TColumnsType } from "~src/types/table";
import DecentralizationFilter from "./DecentralizationFilter";
import DecentralizationModal from "./DecentralizationModal";

const DecentralizationTable: React.FC<{
  data: any;
  loading: boolean;
  pagination: any;
}> = ({ data, loading, pagination }) => {
  const { handleSubmit, control, watch, reset } = useForm<any>({
    mode: "onBlur",
  });
  const [filter, setFilter] = useState(false);
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
      title: "Mã chức năng",
      dataIndex: "CodeFunction",
      align: "left",
    },
    {
      title: "Tên chức năng",
      dataIndex: "FunctionName",
      align: "left",
    },
    {
      title: "Cho phép",
      dataIndex: "Find",
      align: "left",
      render: () => <Checkbox />,
      width: 60,
    },
  ];

  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalRemove, setModalRemove] = useState(false);

  return (
    <React.Fragment>
      <div>
        <div className="flex justify-between">
          <div className="min-w-[180px]">
            <FormSelect
              name="sourceTypes"
              control={control}
              placeholder={"Chọn nhóm user"}
              data={[]}
              required={true}
              select={{ label: "Name", value: "Id" }}
            />
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
              btnClass="mr-4"
              red
              onClick={() => setModalRemove(true)}
            />
            <IconButton
              title={"Bộ lọc"}
              icon={"fas fa-filter"}
              toolip={""}
              onClick={() => setFilter(!filter)}
            />
          </div>
        </div>
        {filter && (
          <div className="mb-4">
            <DecentralizationFilter />
          </div>
        )}
        <div>
          <DataTable
            columns={colums}
            data={data}
            loading={loading}
            pagination={pagination}
          />
        </div>
        <DecentralizationModal
          visible={modalAdd}
          onCancel={() => setModalAdd(false)}
          feching={undefined}
          title={"Thêm quyền"}
          onPress={() => undefined}
          titleButton={"Thêm"}
        />
        <DecentralizationModal
          visible={modalEdit}
          onCancel={() => setModalEdit(false)}
          feching={undefined}
          title={"Chỉnh sửa quyền"}
          onPress={() => undefined}
          titleButton={"Cập nhật"}
        />
        <DecentralizationModal
          visible={modalRemove}
          onCancel={() => setModalRemove(false)}
          feching={undefined}
          title={"Xoá quyền"}
          onPress={() => undefined}
          titleButton={"Xoá"}
        />
      </div>
    </React.Fragment>
  );
};

export default DecentralizationTable;
