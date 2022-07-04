import { Table, TablePaginationConfig, TableProps } from "antd";
import { SorterResult, TableRowSelection } from "antd/lib/table/interface";
import clsx from "clsx";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { TColumnsType } from "~src/types/table";
import styles from "./index.module.css";

type TProps<T extends object> = {
  rowKey?: keyof T | "Id";
  style?: "main" | "secondary";
  title?: string;
  columns: TColumnsType<T>;
  data: T[];
  bordered?: boolean;
  pagination?: TablePaginationConfig | false;
  onChange?: (
    pagination: TablePaginationConfig,
    filter: any,
    sorter: SorterResult<T>
  ) => void;
  summary?: (data: readonly T[]) => React.ReactNode | null;
  rowSelection?: TableRowSelection<T>;
  scroll?: TableProps<T>["scroll"];
  loading?: boolean;
  expandable?: any;
};

export const DataTable = <T extends object = object>({
  style = "main",
  title = "",
  columns,
  data,
  bordered = undefined,
  pagination = false,
  onChange,
  rowSelection,
  summary = undefined,
  scroll = { x: true },
  rowKey = "Id",
  loading = false,
  expandable,
}: TProps<T>) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  return (
    <React.Fragment>
      {!!title.length && (
        <p className={clsx("titleTable", style === "secondary" && "")}>
          {title}
        </p>
      )}
      <Table
        loading={loading}
        rowKey={rowKey as string}
        bordered={bordered}
        columns={columns}
        dataSource={data}
        className={clsx(style !== "main" ? styles.table : styles.maintable)}
        pagination={pagination}
        summary={summary}
        onChange={() => onChange}
        rowSelection={rowSelection}
        scroll={scroll}
        expandable={expandable}
      ></Table>
    </React.Fragment>
  );
};
