import axios from 'axios';
import { ApiAdapter } from './ApiAdapter';

export class AxiosApiAdapter implements ApiAdapter {
  async get<T>(url: string) {
    return axios.get<T>(url).then(({ data }) => data);
  }
  post<T>(): Promise<T> {
    throw new Error('Method not implemented.');
  }
  put<T>(): Promise<T> {
    throw new Error('Method not implemented.');
  }
  delete<T>(): Promise<T> {
    throw new Error('Method not implemented.');
  }
}
