import { routePath } from '../constants/api';
import apiClient from './api';
import { AxiosRequestConfig } from 'axios';


// Generic GET method
export const getData = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await apiClient.get<T>(url, config);
    return response.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

// Generic POST method
export const postData = async <T, R>(url: string, data: T, config?: AxiosRequestConfig): Promise<R> => {
  try {
    const response = await apiClient.post<R>(url, data, config);
    return response.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
