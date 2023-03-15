/* eslint-disable */
// @ts-nocheck
import { useLayoutEffect } from 'react';
import Chart from 'react-apexcharts';
import { FlexSysApiResponse } from '../api/FlexSysApiResponse';

interface FlexysChartProps {
  chartData: () => FlexSysApiResponse;
}

const BAR_MAX_SUPPLEMENT = 299;
const AREA_MAX_SUPPLEMENT = 201;

let chartInstance = null;

const LOCATIONS = ['성북구', '강남구', '노원구', '중랑구'];

export const FlexysChart = ({ chartData }: FlexysChartProps) => {
  const { response } = chartData();
  const timeSeries = Object.keys(response);

  const barMin = Math.min(
    ...timeSeries.map((time) => response[time].value_bar)
  );

  const barMax =
    Math.max(...timeSeries.map((time) => response[time].value_bar)) +
    BAR_MAX_SUPPLEMENT;

  const areaMin = Math.min(
    ...timeSeries.map((time) => response[time].value_area)
  );

  const areaMax =
    Math.max(...timeSeries.map((time) => response[time].value_area)) +
    AREA_MAX_SUPPLEMENT;

  const series = [
    {
      name: 'area',
      type: 'area',
      label: 'area',
      data: timeSeries.map((key) => response[key].value_area),
    },
    {
      name: 'bar',
      type: 'column',
      label: 'bar',
      data: timeSeries.map((key) => response[key].value_bar),
    },
  ];

  const options = {
    chart: {
      id: 'flexys-chart',
      events: {
        dataPointSelection: (event, chartContext, config) => {
          console.log(chartContext, config);
        },
        click(event, chartContext, config) {
          const targetIndex = config.dataPointIndex;
          console.log(targetIndex);
          const keys = Object.keys(response);
          const targetKey = keys[targetIndex];
          const { id: targetLocation } = response[targetKey];

          const targetIndices = keys.reduce<number[]>((acc, cur, idx) => {
            const { id } = response[cur];
            if (id === targetLocation) acc.push(idx);
            return acc;
          }, []);

          targetIndices.forEach((idx) =>
            chartInstance.toggleDataPointSelection(1, idx)
          );
          chartInstance.toggleDataPointSelection(1, targetIndex);
        },
      },
      selection: {
        enabled: true,
        type: 'x',
        fill: {
          color: '#24292e',
          opacity: 0.1,
        },
        stroke: {
          width: 1,
          dashArray: 3,
          color: '#24292e',
          opacity: 0.4,
        },
        xaxis: {
          min: undefined,
          max: undefined,
        },
        yaxis: {
          min: undefined,
          max: undefined,
        },
      },
    },
    states: {
      active: {
        // active 여러 개 허용
        allowMultipleDataPointsSelection: true,
      },
    },
    stroke: {
      width: [1, 0],
      curve: 'smooth',
    },
    labels: timeSeries,
    xaxis: {
      type: 'datetime',
      tooltip: {
        enabled: false,
      },
    },
    yaxis: [
      {
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#008FFB',
        },
        labels: {
          style: {
            colors: '#008FFB',
          },
        },
        min: areaMin,
        max: areaMax,
        title: {
          text: 'Area',
          style: {
            color: '#008FFB',
          },
        },
      },
      {
        opposite: true,

        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#00E396',
        },
        labels: {
          style: {
            colors: '#00E396',
          },
        },
        min: barMin,
        max: barMax,
        title: {
          text: 'Bar',
          style: {
            color: '#00E396',
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      shared: true,
      intersect: false,
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const timeKey = timeSeries[seriesIndex];
        const { id, value_area, value_bar } = response[timeKey];
        return `
          <div style="padding: 8px;">
            <div style="margin-left: 2px;">
              ▶ 시간: ${timeKey}
            </div>
            <div style="margin-left: 2px;">
              ▶ 지역: ${id}
            </div>
            <div style="margin-left: 2px;">
              ▶ Area 값: ${value_area}
            </div>
            <div style="margin-left: 2px;">
              ▶ Bar 값: ${value_bar}
            </div>
          </div>`;
      },
    },
  };

  useLayoutEffect(() => {
    const chart = ApexCharts.getChartByID('flexys-chart');
    chartInstance = chart;
    window.chartInstance = chart;
    console.log(chart);
  }, []);

  const handleFilterClick = (loc: string) => {
    const keys = Object.keys(response);
    const targetIndices = keys.reduce<number[]>((acc, cur, idx) => {
      const { id } = response[cur];
      if (id === loc) acc.push(idx);
      return acc;
    }, []);
    targetIndices.forEach((idx) =>
      chartInstance.toggleDataPointSelection(1, idx)
    );
  };

  return (
    <>
      <div>
        {LOCATIONS.map((loc) => (
          <button key={loc} onClick={() => handleFilterClick(loc)}>
            {loc}
          </button>
        ))}
      </div>
      <Chart
        type='area'
        series={series}
        width='80%'
        height='600px'
        options={options}
      />
    </>
  );
};
