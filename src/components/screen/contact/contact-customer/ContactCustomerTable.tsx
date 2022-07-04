import { Empty, Tag, Tooltip } from "antd";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { contactCustomerSaleRequests } from "~src/api";
import { toast } from "~src/components";
import { FormInput } from "~src/components/global";
import { ActionButton } from "~src/components/global/Button/ActionButton";
import { DataTable } from "~src/components/global/table";
import { statusContact } from "~src/config/appConfig";
import { TColumnsType } from "~src/types/table";
import { _format } from "~src/util";
import ContactCustomerDetailForm from "../contact-customer-detail/ContacCustomerDetailForm";
import ContactCustomerAddRequestForm from "./ContactCustomerAddRequestForm";

const ContactCustomerTable: React.FC<{
  data: any;
  loading: boolean;
  pagination: any;
  userGroup: any;
  refetch: any;
}> = ({ data, loading, pagination, userGroup, refetch }) => {
  const { handleSubmit, reset, watch, setValue, control } = useForm<any>({
    mode: "onBlur",
  });

  const colums: TColumnsType<TCustomers> = [
    {
      title: "ID",
      dataIndex: "Id",
      align: "center",
      render: (_, __, index) => index,
      sorter: true,
      width: 40,
    },
    {
      title: "Nguồn",
      dataIndex: "SourceName",
      align: "left",
      render: (_, record) => (
        <div className="flex">
          {record?.SourceName?.split(";").map((item, index) => (
            <div key={index} className="mr-2">
              <div>
                {item === "Tawk to" && (
                  <Tooltip title={item}>
                    <i className="fas fa-comment-alt text-blue"></i>
                  </Tooltip>
                )}
                {item === "Form" && (
                  <Tooltip title={item}>
                    {" "}
                    <i className="fas fa-globe text-orange"></i>
                  </Tooltip>
                )}
                {item === "T?ng dài" && (
                  <Tooltip title={item}>
                    {" "}
                    <i className="fas fa-phone-alt text-[#51348e]"></i>
                  </Tooltip>
                )}
                {item === "Other" && (
                  <Tooltip title={item}>
                    {" "}
                    <i className="fas fa-adjust text-green"></i>
                  </Tooltip>
                )}
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Họ và tên",
      dataIndex: "FullName",
      align: "left",
    },
    {
      title: "Số điện thoại",
      dataIndex: "Phone",
      align: "left",
      width: 100,
    },
    {
      title: "Công ty",
      dataIndex: "CompanyName",
      align: "left",
    },
    {
      title: "Email",
      dataIndex: "Email",
      align: "left",
    },
    {
      title: "Yêu cầu ban đầu",
      dataIndex: "RequestName",
      align: "left",
      // render: (status, record) => (
      //   <div> {record.ContactCustomerMappingRequests?.[0]?.Decription}</div>
      // ),
    },
    {
      title: "Trạng thái",
      dataIndex: "Status",
      align: "left",
      render: (status, record) => (
        <Tag color={statusContact.find((x) => x.id == status)?.color}>
          {record.StatusName}
        </Tag>
      ),
      width: 100,
    },
    {
      title: "Ngày tạo",
      dataIndex: "Created",
      align: "left",
      render: (_, record) => <p>{_format.converseDateTime(record?.Created)}</p>,
    },
    {
      title: "Người xử lý",
      dataIndex: "SaleName",
      align: "left",
      render: (_, record) => <p>{record.SaleName ? record.SaleName : "__"}</p>,
    },
    {
      title: "Chi tiết",
      dataIndex: "action",
      align: "left",
      width: 100,
      render: (_, record) => (
        <div className="flex">
          <Link href={`/contact-customers/${record.Id}`}>
            <a>
              <ActionButton icon={"fas fa-info"} title="Chi tiết" />
            </a>
          </Link>
          <ActionButton
            icon={"fas fa-hand-paper"}
            title="Gán"
            onClick={() => handleModalAssign(record)}
          />
          <ActionButton
            icon={"fas fa-thumbtack"}
            title="Yêu cầu"
            onClick={() => handleModal(record)}
          />
        </div>
      ),
    },
  ];
  const item = useRef<any>();
  const itemAssign = useRef<any>();

  const [modal, setModal] = useState(false);
  const [modalRequest, setModalRequest] = useState(false);

  const handleModal = (itemSelected: any) => {
    item.current = itemSelected;
    setModalRequest(true);
  };
  const handleModalAssign = (itemSelected: any) => {
    itemAssign.current = itemSelected;
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
      <div>
        <ContactCustomerDetailForm
          visible={modal}
          onCancel={() => setModal(false)}
          userGroup={userGroup}
          defauValues={itemAssign?.current?.Id}
          refetch={refetch}
        />
      </div>
      <div>
        <ContactCustomerAddRequestForm
          visible={modalRequest}
          onCancel={() => setModalRequest(false)}
          refetch={undefined}
          defauValues={item?.current?.Id}
        />
      </div>
    </React.Fragment>
  );
};

export default ContactCustomerTable;
