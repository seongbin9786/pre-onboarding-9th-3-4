// 현재까지만 필요한 Api
// Axios, fetch 구현체 갈아끼우는 목적
export interface ApiAdapter {
  get<T>(url: string, ...args: any): Promise<T>;
  post<T>(url: string, ...args: any): Promise<T>;
  put<T>(url: string, ...args: any): Promise<T>;
  delete<T>(url: string, ...args: any): Promise<T>;
}
