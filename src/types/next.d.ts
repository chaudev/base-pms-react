declare module "next/types" {
  import { NextComponentType, NextPageContext } from "next";
  import { IControllerName, IRolesType } from "~src/types/util";

  declare type NextPage<P = {}, IP = P> = NextComponentType<
    NextPageContext,
    IP,
    P
  > & {
    layout?: React.FC<ILayoutProps>;
    rolesRequired?: IRolesType;
    controllers?: IControllerName[];
  };
}
