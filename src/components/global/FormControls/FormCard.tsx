import { Spin } from "antd";
import React, { FC, ReactElement } from "react";
import { useDisableRefetchOnFocus } from "../../../hook";

type TSubComponents = {
  Header: FC<{
    onCancel: () => void;
    children: any;
  }>;
  Body: FC<{
    children: any;
  }>;
  Footer: FC<{
    children: any;
  }>;
};

export const FormCard: FC<{ loading?: boolean; children: any }> &
  TSubComponents = ({ children, loading = false }) => {
  useDisableRefetchOnFocus();

  return (
    <Spin tip="Loading..." spinning={loading} style={{ maxHeight: "unset" }}>
      <div style={{ padding: 20 }}>{children}</div>
    </Spin>
  );
};

const Header: TSubComponents["Header"] = ({ children, onCancel }) => (
  <div className="text-main text-center p-4 text-xl font-bold uppercase flex items-center justify-between">
    <div />
    {children}
    <div>
      <span className=" cursor-pointer" onClick={onCancel}>
        <i className="fad fa-times-circle"></i>
      </span>
    </div>
  </div>
);
FormCard.Header = Header;
Header.displayName = "header";

const Body: TSubComponents["Body"] = ({ children }) => (
  <div className="p-4">{children}</div>
);
FormCard.Body = Body;
Body.displayName = "body";

const Footer: TSubComponents["Footer"] = ({ children }) => (
  <div className="flex items-center justify-center p-4">{children}</div>
);
FormCard.Footer = Footer;
Footer.displayName = "footer";
