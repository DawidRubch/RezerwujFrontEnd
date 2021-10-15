import axios, { AxiosRequestConfig } from "axios";
import { APIURLS } from "core";

const requestHandler = async (config: AxiosRequestConfig) => {
  
  const newData = {
    enviromentType: process.env.WDS_SOCKET_PATH,
    ...config.data,
  };

  return {
    ...config,
    data: newData,
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
