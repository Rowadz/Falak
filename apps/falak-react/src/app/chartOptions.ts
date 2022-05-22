import { EChartsOption } from 'echarts';

export const getOptions = (args: Partial<EChartsOption>): EChartsOption => {
  return {
    title: {
      textStyle: { color: '#fff' },
      text: 'Referer of a Website',
      subtextStyle: { color: '#fff' },
      subtext: 'INSERT / UPDATE / DELETE',
      left: 'center',
      ...(args.title || {}),
    },
    tooltip: {
      backgroundColor: '#0f131a',
      textStyle: { color: '#fff' },
      trigger: 'item',
      ...(args.tooltip || {}),
    },
    legend: {
      textStyle: { color: '#fff' },
      orient: 'vertical',
      left: 'left',
      ...(args.legend || {}),
    },
    series: args.series,
  };
};
