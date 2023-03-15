import { Suspense } from 'react';
import { AxiosApiAdapter } from '../api/AxiosApiAdapter';
import { ChartApi } from '../api/ChartApi';
import { FlexysChart } from '../components/FlexysChart';
import { suspendable } from '../util/suspendable';

const axiosApiAdapter = new AxiosApiAdapter();
const chartApi = new ChartApi(axiosApiAdapter, '');

export const ChartPage = () => {
  const chartData = suspendable(chartApi.flexys());

  return (
    <div>
      <h1>ChartPage!</h1>
      <Suspense fallback={LoaderComponent}>
        <FlexysChart chartData={chartData} />
      </Suspense>
    </div>
  );
};

const LoaderComponent = <h1>Loading...</h1>;
