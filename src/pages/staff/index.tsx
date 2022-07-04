import { TablePaginationConfig } from "antd";
import { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import { MainLayout, toast } from "~src/components";
import { defaultPagination } from "~src/config/appConfig";
import { TNextPageWithLayout } from "~src/types/layout";
import { useQuery } from "react-query";
import { IconButton } from "~src/components/global/Button/IconButton";
import StaffListTable from "~src/components/screen/staff/StaffListTable";
import AddStaffForm from "~src/components/screen/staff/AddStaffForm";
import StaffListFilter from "~src/components/screen/staff/StaffListFilter";
import TitlePage from "~src/components/global/TitlePage";
import { user } from "~src/api/user";
import { useCatalogue } from "~src/hook/useCatalogue";

const Index: TNextPageWithLayout = () => {
  const [pagination, setPagination] =
    useState<TablePaginationConfig>(defaultPagination);
  // const { roleData } = useCatalogue({ roleEnabled: true });

  const [SearchContent, setSearchContent] = useState<string>();
  const handleFilter = (SearchContent?: string) => {
    setSearchContent(SearchContent);
  };
  const { data, isLoading, refetch } = useQuery(
    [
      "contactCustomers",
      {
        Current: pagination.current,
        PageSize: pagination.pageSize,
        SearchContent,
      },
    ],
    () =>
      user
        .getList({
          PageIndex: pagination.current,
          PageSize: pagination.pageSize,
          SearchContent,
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
        <TitlePage title={"Danh sách nhân sự"} />
        <div>
          <IconButton
            title={"Thêm nhân viên"}
            icon={"fas fa-plus"}
            toolip={""}
            onClick={() => setModal(true)}
          />
        </div>
      </div>
      <div>
        <StaffListFilter handleFilter={handleFilter as any} />
      </div>
      <div>
        <StaffListTable
          data={data?.Items}
          loading={isLoading}
          pagination={undefined}
          // roleData={roleData}
        />
      </div>
      <AddStaffForm
        visible={modal}
        onCancel={() => setModal(false)}
        refetch={refetch}
      />
    </div>
  );
};

Index.Layout = MainLayout;

export default Index;
