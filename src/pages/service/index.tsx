import { TablePaginationConfig } from "antd";
import { NextPage } from "next";
import React, { useRef, useState } from "react";
import { MainLayout, toast } from "~src/components";
import { defaultPagination } from "~src/config/appConfig";
import { TNextPageWithLayout } from "~src/types/layout";
import { useQuery } from "react-query";
import { IconButton } from "~src/components/global/Button/IconButton";
import ServiceListTable from "~src/components/screen/service/ServiceListTable";
import ServiceListFilter from "~src/components/screen/service/ServiceListFilter";
import AddServiceForm from "~src/components/screen/service/AddServiceForm";
import { customerServices } from "~src/api";
import TitlePage from "~src/components/global/TitlePage";

const Index: TNextPageWithLayout = () => {
  const [pagination, setPagination] =
    useState<TablePaginationConfig>(defaultPagination);
  const [filter, setFilter] = useState(false);

  const { data, isLoading, refetch } = useQuery(
    [
      "customersServices",
      { Current: pagination.current, PageSize: pagination.pageSize },
    ],
    () =>
      customerServices
        .getList({
          PageIndex: pagination.current,
          PageSize: pagination.pageSize,
          OrderBy: 0,
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
        <TitlePage title={"Danh sách dịch vụ"} />
        <div className="flex">
          <IconButton
            title={"Bộ lọc"}
            icon={"fas fa-filter"}
            toolip={""}
            onClick={() => setFilter(!filter)}
            btnClass="mr-4"
          />
          <IconButton
            title={"Thêm dịch vụ"}
            icon={"fas fa-plus"}
            toolip={""}
            onClick={() => setModal(true)}
          />
        </div>
      </div>
      {filter && (
        <div>
          <ServiceListFilter handleFilter={() => undefined} />
        </div>
      )}
      <div>
        <ServiceListTable
          data={data?.Items}
          loading={false}
          pagination={undefined}
        />
      </div>
      <AddServiceForm
        visible={modal}
        onCancel={() => setModal(false)}
        feching={undefined}
      />
    </div>
  );
};

Index.Layout = MainLayout;

export default Index;
