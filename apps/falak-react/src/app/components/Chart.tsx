import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';

type ChartProps = {
  options: EChartsOption;
};

export const Chart = ({ options }: ChartProps) => {
  return <ReactECharts option={options} />;
};
