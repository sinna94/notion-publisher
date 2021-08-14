import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getAccessToken } from '../util/Storage';

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
  const serverUrl = process.env.REACT_APP_SERVER ?? '';
  return await axios.get<T, R>(serverUrl + url, tokenConfig(config));
};

export const post = async <T, R = AxiosResponse<T>>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<R> => {
  const serverUrl = process.env.REACT_APP_SERVER ?? '';
  return await axios.post<T, R>(serverUrl + url, data, tokenConfig(config));
};
