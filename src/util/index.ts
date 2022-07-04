import { SorterResult } from "antd/lib/table/interface";
import jwt_decode from "jwt-decode";
import moment from "moment";
import { GroupBase, StylesConfig, ThemeConfig } from "react-select";
// import { baseFile } from "~/api";
// export * from "./dom";

class Format {
  // format date
  getVNDate = (date: Date, format: string = "DD/MM/YYYY h:mm:ss A") =>
    moment(date).format(format);

  getShortVNDate = (date: Date) => moment(date).format("DD/MM/YYYY");

  // lấy thông tin từ token
  getJWTDecode = (
    token: string
  ): {
    exp: number;
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata": string;
    iat: number;
    nbf: number;
  } => jwt_decode(token);

  addUrlForImage = (imageName?: string) =>
    !imageName ? imageName : process.env.NEXT_PUBLIC_IMAGE_URL + imageName;

  getNameImage = (url?: string): string | undefined => url?.split("/Temp/")[1];

  // kiểm tra có phải là số hay không
  isNumber = (val: string) => {
    if (val.match(/^-?[0-9]\d*([,.]\d+)?$/)) return true;
    return false;
  };

  // format ngày giờ

  converseDateTime = (val: number | any) => {
    const newDate = new Date(val).toLocaleString();
    return moment(newDate).format("DD/MM/YYYY");
  };
  // chuyển ngày giờ về dạng dãy số
  converseDateNumber = (val: string | any) => {
    const newD = new Date(val).getTime();
    return newD;
  };

  // format tiền việt nam
  getVND = (price: number, suffix: string = " VNĐ") =>
    (price?.toString() || "0").replace(/\B(?=(\d{3})+(?!\d))/g, ",") + suffix;

  // format phần trăm
  getPercent = (price: number, suffix: string = " %") =>
    (price?.toString() || "0") + suffix;

  // format sorter table antd
  getCurrentSorter = <T>(sorter: SorterResult<T>) => {
    return sorter.field + " " + (sorter.order === "ascend" ? "asc" : "desc");
  };
  customThemes: ThemeConfig | undefined;
  customStyles: StylesConfig<unknown, boolean, GroupBase<unknown>> | undefined;
}

export const _format = new Format();
