import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, ScrollView } from 'react-native';
import Echarts from 'native-echarts';
import http from '../utils/http';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class YearChart extends Component {
  state = {
    data: [],
  };

  async componentDidMount() {
    const res = await http.get('/public/getSatisfationMost');
    this.setState({
      data: res.data.evaluate,
    });
  }

  render() {
    const { data } = this.state;
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

          data: data[i].data.map(function(ele) {
            return ele.value[1];
          }),
          // .reverse(),
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
              .map(ele => {
                return ele.value[0];
              })
              .sort((a, b) => {
                return a > b;
              }),
          },
        ],
      });
    }

    return <Echarts option={option} width={SCREEN_WIDTH} />;
  }
}
