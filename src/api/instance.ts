import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getSession, signIn, signOut } from "next-auth/react";
import { config } from "~src/config/appConfig";

const apiConfig = {
  baseUrl: `${config.API_URL}/api`,
};

export const authHeader_X = async () => {
  const session: any = await getSession();
  // console.log("hahaaa", session);
  return !!session && !!session.user.accessToken
    ? { Authorization: "Bearer " + session.user.accessToken }
    : {};
};

const instance = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    Accept: "application/json",
  },
  timeout: 30000, // 30 seconds
});

export const setToken = (token: string) => {
  instance.defaults.headers.common["Authorization"] = "Bearer " + token;
};

const getUrl = (config: any) => {
  if (config?.baseURL) {
    return config?.url.replace(config?.baseURL, "");
  }
  return config?.url;
};

// Intercept all request
instance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const AuthHeader: any = await authHeader_X();
    config.headers = {
      ...config.headers,
      ...AuthHeader,
    };
    console.log(
      `%c ${config?.method?.toUpperCase()} - ${getUrl(config)}:`,
      "color: #0086b3; font-weight: bold",
      config
    );
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercept all responses
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(
      `%c ${response?.status} - ${getUrl(response?.config)}:`,
      "color: #008000; font-weight: bold",
      response
    );

    return response;
  },
  (error) => {
    // Phản hồi rồi mà bị lỗi từ phía server ...
    if (error?.response) {
      console.log("====== LỖI PHÍA SERVER =====");
      if (error?.response?.status === 408) {
        // signOut();
      }
    }
    // Lỗi request mãi mà không thấy
    else if (error?.request) {
      console.log("====== LỖI REQUEST MÃI KHÔNG THẤY =====");
    }
    // Lỗi gì đó ...
    else {
      console.log("====== LỖI CHƯA XÁC ĐỊNH =====");
    }

    console.log(
      `%c ${error?.response?.status} - ${getUrl(error?.response?.config)}:`,
      "color: #a71d5d; font-weight: bold",
      error?.response
    );
    return Promise.reject(error);
  }
);

export default instance;
