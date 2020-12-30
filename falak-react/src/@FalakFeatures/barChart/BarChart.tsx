import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import ReactEcharts from 'echarts-for-react'
import {
  selectTableNames,
  selectTables,
} from '@FalakFeatures/barChart/selectors'
import colors from '@FalakFeatures/colors'

const BarChart = () => {
  const tablesNames = useSelector(selectTableNames)
  const tablesMap = useSelector(selectTables)
  const memoedTables = useMemo(() => tablesNames, [tablesNames])
  return (
    <ReactEcharts
      style={{
        height: '40vh',
      }}
      option={{
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {
          data: ['DELETE', 'UPDATE', 'INSERT'],
          type: 'scroll',
          orient: 'vertical',
          right: 10,
          top: 20,
          bottom: 20,
          textStyle: { color: colors.white, fontFamily: 'Audiowide' },
        },
        xAxis: {
          type: 'category',
          axisTick: { show: false },
          data: memoedTables,
          splitLine: {
            show: false,
          },
          axisLabel: { textStyle: { color: colors.white } },
        },

        yAxis: {
          type: 'value',
          splitLine: {
            show: false,
          },
          axisLabel: { textStyle: { color: colors.white } },
        },
        series: [
          {
            name: 'DELETE',
            type: 'bar',
            barGap: 0.5,
            color:['#E0533F'],
            data: memoedTables.map((table) => tablesMap[table].DELETE),
          },
          {
            name: 'UPDATE',
            type: 'bar',
            color: '#0084CC',
            barGap: 0.5,
            data: memoedTables.map((table) => tablesMap[table].UPDATE),
          },
          {
            name: 'INSERT',
            type: 'bar',
            color: colors.white,
            barGap: 0.5,
            data: memoedTables.map((table) => tablesMap[table].INSERT),
          },
        ],
      }}
    />
  )
}

export default BarChart
