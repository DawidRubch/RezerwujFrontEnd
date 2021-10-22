import axios, { AxiosRequestConfig } from "axios";
import { APIURLS } from "core";

const requestHandler = async (config: AxiosRequestConfig) => {
  const newHeaders = {
    ...config.headers,
    enviromentType: process.env.WDS_SOCKET_PATH,
  };

  return {
    ...config,
    headers: newHeaders,
  };
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
