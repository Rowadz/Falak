import { EChartsOption } from 'echarts';

export const getOptions = (args: Partial<EChartsOption>): EChartsOption => {
  return {
    title: {
      text: 'Referer of a Website',
      subtext: 'INSERT / UPDATE / DELETE',
      left: 'center',
      ...(args.title || {}),
    },
    tooltip: {
      trigger: 'item',
      ...(args.tooltip || {}),
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      ...(args.legend || {}),
    },
    series: args.series,
  };
};
