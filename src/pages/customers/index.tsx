import { TablePaginationConfig } from "antd";
import React, { useRef, useState } from "react";
import { MainLayout, toast } from "~src/components";
import { defaultPagination } from "~src/config/appConfig";
import { TNextPageWithLayout } from "~src/types/layout";
import { IconButton } from "~src/components/global/Button/IconButton";
import TitlePage from "~src/components/global/TitlePage";

const Index: TNextPageWithLayout = () => {
  const [pagination, setPagination] =
    useState<TablePaginationConfig>(defaultPagination);
  const [filter, setFilter] = useState(false);

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <TitlePage title={"Danh sách khách hàng"} />
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
            onClick={() => undefined}
          />
        </div>
      </div>
    </div>
  );
};

Index.Layout = MainLayout;

export default Index;
