import React from 'react'
import { useSelector } from 'react-redux'
import ReactEcharts from 'echarts-for-react'
import { selectCount } from '@FalakFeatures/genericSelectors'

const PieChart = () => {
  const deleteCount: number = useSelector(selectCount('DELETE'))
  const insertCount: number = useSelector(selectCount('INSERT'))
  const updateCount: number = useSelector(selectCount('UPDATE'))

  return (
    <ReactEcharts
      style={{
        height: '60vh',
      }}
      option={{
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 10,
          top: 20,
          bottom: 20,
          textStyle: { color: '#F7F7F7' },
        },
        series: [
          {
            color: ['#E0533F', '#1E2E45', '#F7F7F7'],
            name: 'Queries',
            type: 'pie',
            radius: '100%',
            center: ['50%', '50%'],
            roseType: 'radius',
            data: [
              { value: deleteCount, name: 'DELETE' },
              { value: updateCount, name: 'UPDATE' },
              { value: insertCount, name: 'INSERT' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
            label: { color: '#F7F7F7', show: false },
            labelLine: {
              show: false,
              lineStyle: { color: '#F7F7F7' },
              smooth: 0.2,
              length: 10,
              length2: 20,
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: () => Math.random() * 200,
          },
        ],
      }}
    />
  )
}

export default PieChart
