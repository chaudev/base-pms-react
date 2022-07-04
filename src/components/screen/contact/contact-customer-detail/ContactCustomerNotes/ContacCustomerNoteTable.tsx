import { Popconfirm } from "antd";
import React, { useRef, useState } from "react";
import { useMutation } from "react-query";
import { contactCustomersNotes } from "~src/api";
import { toast } from "~src/components";
import { ActionButton } from "~src/components/global/Button/ActionButton";
import { DataTable } from "~src/components/global/table";
import { TColumnsType } from "~src/types/table";
import { _format } from "~src/util";
import ContactCustomerNoteForm from "./ContactCustomerNoteForm";

const ContacCustomerNoteTable: React.FC<{ data: any; refetch: any }> = ({
  data,
  refetch,
}) => {
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
      dataIndex: "Note",
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
            onClick={() => handleModal(record)}
          />
          <Popconfirm
            title="Bạn muốn xoá ghi chú ?"
            onConfirm={() => _onRemove(record?.Id)}
            // onCancel={() => undefined}
            okText="Xoá"
            cancelText="Huỷ"
            placement="topRight"
          >
            <ActionButton
              icon={"fas fa-trash-alt"}
              title=""
              onClick={() => undefined}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const item = useRef<any>();
  const [modal, setModal] = useState(false);

  const handleModal = (itemSelected: any) => {
    item.current = itemSelected;
    setModal(true);
  };

  const mutationDelete = useMutation(
    (id: any) => contactCustomersNotes.delete(id),
    {
      // refresh item + table data after updating successfully
      onSuccess: () => {
        toast.success("Xoá ghi chú thành công");
        refetch();
      },
      onError: toast.error,
    }
  );

  const _onRemove = async (id: any) => {
    try {
      await mutationDelete.mutateAsync(id);
    } catch (error) {}
  };

  return (
    <>
      <div>
        <DataTable columns={colums} data={data} />
      </div>
      <div>
        <ContactCustomerNoteForm
          visible={modal}
          onCancel={() => setModal(false)}
          defaulId={item.current?.Id}
          refetch={refetch}
        />
      </div>
    </>
  );
};

export default ContacCustomerNoteTable;
