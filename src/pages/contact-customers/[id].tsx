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

const Index: TNextPageWithLayout = () => {
  const { query } = useRouter();
  const { data, isLoading, isError, refetch } = useQuery(
    ["customerDetail", query?.id],
    () => contactCustomers.getByID(query?.id as string),
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
          Chi tiết liên hệ
        </span>
        <div className="mt-4">
          <Skeleton
            title={false}
            loading={isLoading}
            paragraph={{ rows: 6, width: "100%" }}
          >
            <ContactCustomerDetail
              defaultValues={data as any}
              refetch={refetch}
            />
          </Skeleton>
        </div>
      </div>
    </div>
  );
};

Index.Layout = MainLayout;

export default Index;
