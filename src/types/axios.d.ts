type TResponse<T> = {
  Data: T;
  Messages: unknown;
  ResultCode: number;
  ResultMessage: string;
  Success: boolean;
  token?: any;
};

type TErrorResponse<T> = {
  Response: { Data: TResponse<T> };
};

type TPaginationResponse<T> = {
  Items: T;
  PageIndex: number;
  PageSize: number;
  TotalItem: number;
  TotalPage: number;
};

type TPaginationParams = {
  PageIndex: any;
  PageSize: any;
  SearchContent?: string;
  Status?: number;
  FromDate?: number;
  ToDate?: number;
  SaleIds?: string;
  SourceIds?: string;
  OrderBy?: number;
};

type TPaginationParamsWithReactQuery = TPaginationParams & {
  Enabled: boolean;
  onSucess: (data: T) => void;
};

type TBaseUserFileParams = {
  UserFiles: Pick<TBaseReponseParams, "Active" | "Id" | "Deleted"> &
    { TypeId: number }[];
};

type TBaseUserLevel = Omit<TBaseReponseParams, "Code" | "Description"> & {
  FeeBuyPro: number;
  FeeWeight: number;
  LessDeposit: number;
  Money: number;
  MoneyTo: number;
};

type TBasePermissionParams = {
  PermitObjectPermissions: Pick<
    TBaseReponseParams,
    "Active" | "Id" | "Deleted"
  > & {
    PermitObjectId: number;
    PermissionId: number;
    UserGroupId: number;
    UserId: number;
  };
};

type TBaseReponseParams = {
  Id: number;
  Name: string;
  Code: string;
  Active: boolean;
  Deleted: boolean;
  RowNumber: number;
  Created: Date;
  CreatedBy: string;
  Updated: Date;
  UpdatedBy: string;
  Description: string;
  BankInfo: string;
  Catalogue: any;
};

type TController = "authenticate";
