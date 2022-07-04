import { TablePaginationConfig } from "antd";
import { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import { contactCustomers } from "~src/api";
import { MainLayout, toast } from "~src/components";
import ContactCustomerTable from "~src/components/screen/contact/contact-customer/ContactCustomerTable";
import { defaultPagination } from "~src/config/appConfig";
import { TNextPageWithLayout } from "~src/types/layout";
import { useMutation, useQuery } from "react-query";
import ContacCustomerFilter from "~src/components/screen/contact/contact-customer/ContacCustomerFilter";
import { IconButton } from "~src/components/global/Button/IconButton";
import ContactCustomerForm from "~src/components/screen/contact/contact-customer/ContactCustomerForm";
import { useCatalogue } from "~src/hook/useCatalogue";
import TitlePage from "~src/components/global/TitlePage";

const Index: TNextPageWithLayout = ({ connection }) => {
  const [pagination, setPagination] =
    useState<TablePaginationConfig>(defaultPagination);

  const { SystemStatus, userGroup } = useCatalogue({
    SystemStatusStatusEnabled: true,
    userGroupEnabled: true,
  });

  const [SearchContent, setSearchContent] = useState<string>();
  const [Status, setStatus] = useState<number>();
  const [SourceIds, setSourceIds] = useState<any>();
  const [SaleIds, setSaleIds] = useState<any>();
  const [FromDate, setFromDate] = useState<number>();
  const [ToDate, setToDate] = useState<number>();

  const handleFilter = (
    SearchContent?: string,
    Status?: number,
    SourceIds?: any | null,
    SaleIds?: any | null,
    FromDate?: number,
    ToDate?: number
  ) => {
    setSearchContent(SearchContent);
    setStatus(Status);
    SourceIds?.toString() == ""
      ? setSourceIds(null)
      : setSourceIds(SourceIds?.toString());
    SaleIds?.toString() == ""
      ? setSaleIds(null)
      : setSaleIds(SaleIds?.toString());
    setFromDate(FromDate);
    setToDate(ToDate);
  };

  const { data, isLoading, refetch } = useQuery(
    [
      "contactCustomers",
      {
        Current: pagination.current,
        PageSize: pagination.pageSize,
        SearchContent,
        Status,
        SourceIds,
        SaleIds,
        FromDate,
        ToDate,
      },
    ],
    () =>
      contactCustomers
        .getList({
          PageIndex: pagination.current,
          PageSize: pagination.pageSize,
          OrderBy: 0,
          SearchContent,
          SourceIds,
          SaleIds,
          Status,
          FromDate,
          ToDate,
        })
        .then((res) => res.Data),
    {
      keepPreviousData: true,
      onSuccess: (data) =>
        setPagination({ ...pagination, total: data?.TotalItem }),
      onError: toast.error,
    }
  );

 

  const item = useRef<TUserHistoryRechargeVND>();
  const [modal, setModal] = useState(false);
  const handleModal = (itemSelected: TUserHistoryRechargeVND) => {
    item.current = itemSelected;
    setModal(true);
  };

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <TitlePage title={"Danh sách liên hệ"} />
        <div className="flex">
          <IconButton
            title={"Thêm liên hệ"}
            icon={"fas fa-plus"}
            toolip={""}
            onClick={() => setModal(true)}
          />
        </div>
      </div>

      <div className="filter-drop">
        <ContacCustomerFilter handleFilter={handleFilter as any} />
      </div>
      <div className="bg-white rounded-b-md mb-4">
        <ContactCustomerTable
          data={data?.Items}
          loading={isLoading}
          pagination={pagination}
          userGroup={userGroup}
          refetch={refetch}
        />
      </div>
      <ContactCustomerForm
        visible={modal}
        onCancel={() => setModal(false)}
        refetch={refetch}
      />
    </div>
  );
};

Index.Layout = MainLayout;

export default Index;
