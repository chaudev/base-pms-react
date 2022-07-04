import { Skeleton, TablePaginationConfig } from "antd";
import { NextPage } from "next";
import React, { useState } from "react";
import { contactCustomers } from "~src/api";
import { MainLayout, toast } from "~src/components";
import { defaultPagination } from "~src/config/appConfig";
import { TNextPageWithLayout } from "~src/types/layout";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import ContactCustomerDetail from "~src/components/screen/contact/contact-customer-detail/ContactCustomerDetail";
import { user } from "~src/api/user";
import StaffDetailForm from "~src/components/screen/staff/staff-detail.tsx/StaffDetailForm";

const Index: TNextPageWithLayout = () => {
  const { query } = useRouter();
  const { data, isLoading, isError, refetch } = useQuery(
    ["customerDetail", query?.id],
    () => user.getByID(query?.id as string),
    {
      select: (data) => data.Data,
      retry: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  // console.log("load", isLoading);

  return (
    <div>
      <div className="mb-4">
        <span className="text-xl font-semibold text-main mb-4">
          Chi tiết nhân sự
        </span>
        <div className="mt-4">
          <Skeleton
            title={false}
            loading={isLoading}
            paragraph={{ rows: 6, width: "100%" }}
          >
            <StaffDetailForm defaultValues={data} refetch={refetch} />
          </Skeleton>
        </div>
      </div>
    </div>
  );
};

Index.Layout = MainLayout;

export default Index;
