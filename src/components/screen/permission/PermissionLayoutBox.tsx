import { Tabs } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FormSelect } from "~src/components";
import { IconButton } from "~src/components/global/Button/IconButton";
import DecentralizationFilter from "./decentralization/DecentralizationFilter";
import DecentralizationTable from "./decentralization/DecentralizationTable";
import styles from "./index.module.scss";
import UserGroupManagementTable from "./permission-user/UserGroupManagementTable";
import UserManagementTable from "./permission-user/UserManagementTable";

const { TabPane } = Tabs;

const PermissionLayoutBox = () => {
  const dataUserManagement = [
    {
      UserName: "admin",
      FullName: "Lê Thị Mỹ Phúc",
      Group: "admin",
    },
    {
      UserName: "admin1",
      FullName: "Ngô Tùng Đạt",
      Group: "admin1",
    },
  ];

  const dataUserGroupManagement = [
    {
      GroupCode: "admin",
      GroupName: "admin",
    },
    {
      GroupCode: "Bán hàng",
      GroupName: "Bán hàng",
    },
  ];

  const decentralization = [
    {
      CodeFunction: "admin",
      FunctionName: "admin",
    },
    {
      CodeFunction: "Bán hàng",
      FunctionName: "Bán hàng",
    },
  ];

  return (
    <React.Fragment>
      <div className={styles.container}>
        <Tabs defaultActiveKey="1" onChange={() => undefined}>
          <TabPane tab=" Người sử dụng" key="1">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <UserManagementTable
                  data={dataUserManagement}
                  loading={false}
                  pagination={undefined}
                />
              </div>
              <div className="col-span-1">
                <UserGroupManagementTable
                  data={dataUserGroupManagement}
                  loading={false}
                  pagination={undefined}
                />
              </div>
            </div>
          </TabPane>
          <TabPane tab="Phân quyền" key="2">
            <div>
              <DecentralizationTable
                data={decentralization}
                loading={false}
                pagination={undefined}
              />
            </div>
          </TabPane>
        </Tabs>
      </div>
    </React.Fragment>
  );
};

export default PermissionLayoutBox;
