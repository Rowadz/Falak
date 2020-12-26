import React from 'react'
import ReactEcharts from 'echarts-for-react'

const TimelineChart = () => {
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
          type: 'category',
          boundaryGap: true,
          data: Array.from({ length: 200 }).map((_, i) => `${i + 1}`),
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
            stack: '总量',
            data: Array.from({ length: 200 }).map(
              () => Math.floor(Math.random() * 1000) + 1
            ),
          },
          {
            color: '#1E2E45',
            name: 'UPDATE',
            type: 'line',
            stack: '总量',
            data: Array.from({ length: 200 }).map(
              () => Math.floor(Math.random() * 1000) + 1
            ),
          },
          {
            color: '#F7F7F7',
            name: 'INSERT',
            type: 'line',
            stack: '总量',
            data: Array.from({ length: 200 }).map(
              () => Math.floor(Math.random() * 1000) + 1
            ),
          },
        ],
      }}
    />
  )
}

export default TimelineChart
