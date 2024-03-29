import axios, { AxiosRequestConfig } from "axios";
import { APIURLS } from "services";

const SHOULD_SHOW_TEST_ON_PROD = true;

const requestHandler = async (config: AxiosRequestConfig) => {
  config.headers.enviromentType = SHOULD_SHOW_TEST_ON_PROD
    ? "test"
    : process.env.WDS_SOCKET_PATH;

  const item = localStorage.getItem("@city");

  if (item) {
    config.headers.city = item || "Szczecin";
  }

  return config;
};

const errorHandler = (error: any) => Promise.reject(error);

export const RezerwujApi = axios.create({
  headers: {
    crossDomain: true,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },

  baseURL: APIURLS.serverAddress,
});

RezerwujApi.interceptors.request.use(requestHandler, errorHandler);
