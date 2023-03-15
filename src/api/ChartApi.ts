import { ApiAdapter } from './ApiAdapter';
import { FlexSysApiResponse } from './FlexSysApiResponse';

export class ChartApi {
  private readonly apiAdapter: ApiAdapter;
  private readonly baseUrl: string;

  constructor(apiAdapter: ApiAdapter, baseUrl: string) {
    this.apiAdapter = apiAdapter;
    this.baseUrl = baseUrl;
  }

  async flexys() {
    const requestUrl = `${this.baseUrl}/mockData.json`;
    return this.apiAdapter.get<FlexSysApiResponse>(requestUrl);
  }
}
