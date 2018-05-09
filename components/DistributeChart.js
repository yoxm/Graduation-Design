import React, { Component } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Echarts from 'native-echarts';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class DistributeChart extends Component {
  render() {
    const distributOption = {
      backgroundColor: '#061a3b',
      color: ['#f9882c', '#24c5fb'],
      textStyle: {
        color: '#626c78',
      },
      title: {
        text: '',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      legend: {
        data: ['大一', '大二', '大三', '大四'],
        align: 'right',
        right: 10,
        textStyle: {
          color: '#d7d7d7',
        },
      },
      grid: {
        left: '3%',
        right: '5%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: ['大一', '大二', '大三', '大四'],
          axisTick: {
            show: false,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              color: '#182841',
            },
          },
        },
      ],
      series: [
        {
          name: '大一',
          type: 'bar',
          data: [30, 40, 50, 60],
          itemStyle: {
            normal: {
              color: '#b27c22',
              barBorderRadius: 2,
            },
          },
        },
        {
          name: '大二',
          type: 'bar',
          data: [40, 50, 70, 60],
          itemStyle: {
            normal: {
              color: '#519a25',
              barBorderRadius: 2,
            },
          },
        },
        {
          name: '大三',
          type: 'bar',
          data: [80, 90, 20, 10],
          itemStyle: {
            normal: {
              color: '#ae4c41',
              barBorderRadius: 2,
            },
          },
        },
        {
          name: '大四',
          type: 'bar',
          data: [12, 40, 50, 60],
          itemStyle: {
            normal: {
              color: '#147ecc',
              barBorderRadius: 2,
            },
          },
        },
      ],
    };

    return <Echarts width={SCREEN_WIDTH} option={distributOption} />;
  }
}
