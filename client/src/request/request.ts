import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getAccessToken } from '../Storage';

const tokenConfig = (config?: AxiosRequestConfig): AxiosRequestConfig => {
  const tokenParam = {
    params: { accessToken: getAccessToken() },
  };

  if (config) {
    const tokenConfig = { ...config };
    tokenConfig.params = { ...config?.params, ...tokenParam.params };
    return tokenConfig;
  }
  return tokenParam;
};

export const get = async <T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> => {
  const response = await axios.get<T, R>(url, tokenConfig(config));
  return response;
};

export const post = async <T, R = AxiosResponse<T>>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<R> => {
  const response = await axios.post<T, R>(url, data, tokenConfig(config));
  return response;
};
