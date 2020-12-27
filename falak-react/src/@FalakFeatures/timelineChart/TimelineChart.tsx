import React from 'react'
import { useSelector } from 'react-redux'
import ReactEcharts from 'echarts-for-react'
import { selectTypeTimeline } from './selectors'

const TimelineChart = () => {
  const typesTimeLine: any = useSelector(selectTypeTimeline)
  console.log(typesTimeLine)
  return (
    <ReactEcharts
      style={{
        height: '60vh',
      }}
      option={{
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['DELETE', 'UPDATE', 'INSERT'],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
          show: false,
        },
        xAxis: {
          type: 'time',
          boundaryGap: true,
          splitLine: {
            show: false,
          },
          axisLabel: { textStyle: { color: '#F7F7F7' } },
        },
        yAxis: {
          type: 'value',
          splitLine: { show: false },
          axisLabel: { textStyle: { color: '#F7F7F7' } },
        },
        series: [
          {
            color: '#E0533F',
            name: 'DELETE',
            type: 'line',
            data: typesTimeLine.DELETE?.values,
          },
          {
            color: '#1E2E45',
            name: 'UPDATE',
            type: 'line',
            data: typesTimeLine.UPDATE?.values,
          },
          {
            color: '#F7F7F7',
            name: 'INSERT',
            type: 'line',
            data: typesTimeLine.INSERT?.values,
          },
        ],
      }}
    />
  )
}

export default TimelineChart
