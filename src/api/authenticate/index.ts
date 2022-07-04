import FormData from "form-data";
import BaseAPI from "../methods";

const { put, get, post } = new BaseAPI("Account");

export const authenticate = {
  login: (params: TLogin) => {
    let frmData = new FormData();
    frmData.append("username", params.username);
    frmData.append("password", params.password);
    return post<any>("/LoginV2", frmData);
  },

  register: (data: any) => post("/register", data),

  logout: () => post("/logout"),

  changePassword: (
    userId: number,
    data: {
      oldPassword: string;
      newPassword: string;
      confirmNewPassword: string;
    }
  ) => put(`/changePassword/${userId}`, data),

  forgotPassword: async (params: { userName: string }) =>
    await put(`/forgot-password/${params.userName}`, undefined, { params }),
};
