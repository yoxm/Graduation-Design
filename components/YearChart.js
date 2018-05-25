import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, ScrollView } from 'react-native';
import Echarts from 'native-echarts';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class YearChart extends Component {
  render() {
    var data = [
      {
        time: '人气最旺的十位老师（投票人数）',
        data: [
          {
            name: 'hhh',
            value: [342, 'hhh'],
          },
          {
            name: 'aaa',
            value: [104, 'aaa'],
          },
          {
            name: 'bbb',
            value: [90, 'bbb'],
          },
          {
            name: 'ccc',
            value: [89, 'ccc'],
          },
          {
            name: 'ddd',
            value: [83, 'ddd'],
          },
          {
            name: 'eee',
            value: [58, 'eee'],
          },
          {
            name: 'fff',
            value: [52, 'fff'],
          },
          {
            name: 'ggg',
            value: [49, 'ggg'],
          },
          {
            name: 'hhh',
            value: [48, 'hhh'],
          },
          {
            name: 'iii',
            value: [41, 'iii'],
          },
        ],
      },
      {
        time: '最满意老师（满意率）',
        data: [
          {
            name: 'xxx',
            value: [98, 'xxx'],
          },
          {
            name: 'xxx',
            value: [97, 'xxx'],
          },
          {
            name: 'xxx',
            value: [96, 'xxx'],
          },
          {
            name: 'xxx',
            value: [95, 'xxx'],
          },
          {
            name: 'xxx',
            value: [94, 'xxx'],
          },
          {
            name: 'xxx',
            value: [93, 'xxx'],
          },
          {
            name: 'xxx',
            value: [92, 'xxx'],
          },
          {
            name: 'xxx',
            value: [91, 'xxx'],
          },
          {
            name: 'xxx',
            value: [90, 'xxx'],
          },
          {
            name: 'xxx',
            value: [89, 'xxx'],
          },
        ],
      },
      {
        time: '收到满意最多的老师',
        data: [
          {
            name: 'xxx',
            value: [162, 'xxx'],
          },
          {
            name: 'xxx',
            value: [126, 'xxx'],
          },
          {
            name: 'xxx',
            value: [115, 'xxx'],
          },
          {
            name: 'xxx',
            value: [94, 'xxx'],
          },
          {
            name: 'sss',
            value: [86, 'sss'],
          },
          {
            name: 'xxx',
            value: [85, 'xxx'],
          },
          {
            name: 'aaa',
            value: [85, 'aaa'],
          },
          {
            name: 'bbb',
            value: [83, 'bbb'],
          },
          {
            name: '232',
            value: [82, '232'],
          },
          {
            name: 'ccc',
            value: [80, 'ccc'],
          },
        ],
      },
    ];

    var option = {
      backgroundColor: '#25499F',
      baseOption: {
        animationDurationUpdate: 1000,
        animationEasingUpdate: 'quinticInOut',
        timeline: {
          axisType: 'category',
          orient: 'vertical',
          autoPlay: true,
          playInterval: 5000,
          left: null,
          right: 150,
          top: 40,
          bottom: 20,
          width: 46,
          height: null,
          label: {
            normal: {
              show: true,
              interval: 0,
            },
          },
          symbol: 'none',
          lineStyle: {
            color: '#ccc',
            show: false,
          },
          checkpointStyle: {
            color: '#bbb',
            borderColor: '#777',
            show: false,
            borderWidth: 1,
          },
          controlStyle: {
            showNextBtn: false,
            showPrevBtn: false,
            normal: {
              color: '#666',
              show: false,
              borderColor: '#666',
            },
            emphasis: {
              color: '#aaa',
              borderColor: '#aaa',
            },
          },
          data: data.map(function(ele) {
            return ele.time;
          }),
        },
        title: [
          {
            left: 'center',
            top: 'top',
            textStyle: {
              fontSize: 25,
            },
          },
          {
            left: 'center',
            top: '5%',
          },
        ],
        tooltip: {
          formatter: function(params) {
            if ('value' in params.data) {
              return params.data.value[2] + ': ' + params.data.value[0];
            }
          },
        },
        grid: {
          left: 10,
          right: '20%',
          top: '12%',
          bottom: 5,
        },
        xAxis: {},
        yAxis: {},
        series: [
          {
            id: 'bar',
            type: 'bar',
            tooltip: {
              show: false,
            },
            label: {
              normal: {
                show: true,
                position: 'right',
                textStyle: {
                  //  color: '#ddd'
                },
              },
            },
            data: [],
          },
        ],
      },
      options: [],
    };

    for (var i = 0; i < data.length; i++) {
      option.options.push({
        title: {
          text: data[i].time,
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.1],
          axisLabel: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          type: 'category',
          axisLabel: {
            show: false,
            textStyle: {
              //  color: '#ddd'
            },
          },

          data: data[i].data
            .map(function(ele) {
              return ele.value[1];
            })
            .reverse(),
        },
        series: [
          {
            id: 'bar',
            label: {
              normal: {
                position: 'right',
                formatter: '{b} : {c}',
              },
            },
            data: data[i].data
              .map(function(ele) {
                return ele.value[0];
              })
              .sort(function(a, b) {
                return a > b;
              }),
          },
        ],
      });
    }
    const yearOption = {};

    return (
      <ScrollView>
        <Echarts option={option} width={SCREEN_WIDTH} />
      </ScrollView>
    );
  }
}
