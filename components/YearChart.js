import React, { Component } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Echarts from 'native-echarts';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class YearChart extends Component {
  render() {
    const yearOption = {
      title: {
        text: '历年满意度堆叠图',
        left: 'center',
        top: 15,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985',
          },
        },
      },
      legend: {
        top: 50,
        data: ['非常满意', '很满意', '一般', '不满意', '未评价'],
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      grid: {
        top: 80,
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['2012', '2013', '2014', '2015', '2016', '2017', '2018'],
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: '非常满意',
          type: 'line',
          stack: '总量',
          areaStyle: { normal: {} },
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: '很满意',
          type: 'line',
          stack: '总量',
          areaStyle: { normal: {} },
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: '一般',
          type: 'line',
          stack: '总量',
          areaStyle: { normal: {} },
          data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
          name: '不满意',
          type: 'line',
          stack: '总量',
          areaStyle: { normal: {} },
          data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          name: '未评价',
          type: 'line',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'top',
            },
          },
          areaStyle: { normal: {} },
          data: [820, 932, 901, 934, 1290, 1330, 1320],
        },
      ],
    };
    return <Echarts width={SCREEN_WIDTH} option={yearOption} />;
  }
}
