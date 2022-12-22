import axios, { AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {};
export const localEnvBaseUrl = "http://localhost:3000";

export const baseURL =
  process.env.NODE_ENV === "test"
    ? localEnvBaseUrl
    : process.env.NEXT_PUBLIC_BASE_URL;

config.baseURL = baseURL;

export const axiosInstance = axios.create(config);
