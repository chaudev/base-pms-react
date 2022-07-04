import { useQuery } from "react-query";
import { catalogue } from "../api/catalogue";
import { sourceType } from "~src/api/source-type";
import { toast } from "../components";
import { useState } from "react";
import { TablePaginationConfig } from "antd";
import { defaultPagination } from "~src/config/appConfig";
import { user } from "~src/api/user";
import { role } from "~src/api/role";

// thời gian sẽ api loại 1 lần // 5 là số phút + 6 * 10000 là 1 phút  =  5 phút
const staleTime = 5 * 6 * 10000;
// bắt đầu thực thi từ thời gian
const initialDataUpdatedAt = new Date().getTime();
// api error

type TProps = {
  sourceTypesEnabled?: boolean;
  SystemStatusStatusEnabled?: boolean;
  userGroupEnabled?: boolean;
  roleEnabled?: boolean;
};

export const useCatalogue = ({
  sourceTypesEnabled = false,
  SystemStatusStatusEnabled = false,
  userGroupEnabled = false,
  roleEnabled = false,
}: TProps) => {
  const [pagination, setPagination] =
    useState<TablePaginationConfig>(defaultPagination);
  const onError = toast.error;
  const sourceTypes = useQuery(
    [
      "sourceTypes",
      { Current: pagination.current, PageSize: pagination.pageSize },
    ],
    async () =>
      await sourceType
        .getList({
          PageIndex: pagination.current,
          PageSize: pagination.pageSize,
          OrderBy: 0,
        })
        .then((res) => res.Data),
    {
      staleTime,
      initialDataUpdatedAt,
      onError,
      enabled: sourceTypesEnabled,
    }
  );

  const userGroup = useQuery(
    [
      "userGroup",
      { Current: pagination.current, PageSize: pagination.pageSize },
    ],
    async () =>
      await user
        .getList({
          PageIndex: pagination.current,
          PageSize: pagination.pageSize,
          OrderBy: 0,
        })
        .then((res) => res.Data),
    {
      staleTime,
      initialDataUpdatedAt,
      onError,
      enabled: userGroupEnabled,
    }
  );

  const SystemStatus = useQuery(
    ["cskhStatusCatalogue"],
    async () => await catalogue.getSystemStatus().then((res) => res.Data),
    {
      staleTime,
      initialDataUpdatedAt,
      onError,
      enabled: SystemStatusStatusEnabled,
    }
  );

  const roleData = useQuery(
    [
      "roleData",
      { Current: pagination.current, PageSize: pagination.pageSize },
    ],
    async () =>
      await role
        .getList({
          PageIndex: pagination.current,
          PageSize: pagination.pageSize,
          OrderBy: 0,
        })
        .then((res) => res.Data),
    {
      staleTime,
      initialDataUpdatedAt,
      onError,
      enabled: roleEnabled,
    }
  );

  return {
    sourceTypes: sourceTypes.data,
    SystemStatus: SystemStatus.data,
    userGroup: userGroup.data?.Items,
    roleData: roleData.data?.Items,
  } as const;
};
