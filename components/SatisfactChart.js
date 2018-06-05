import React, { Component } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Echarts from 'native-echarts';
import http from '../utils/http';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class SatisfactChart extends Component {
  state = {
    data: [],
  };

  async componentWillMount() {
    const res = await http.get('/public/getSatisfation');
    if (res.code === 0) {
      this.setState({
        data: res.data.rate,
      });
    }
  }
  render() {
    const { data } = this.state;
    const satisfactOption = {
      backgroundColor: '#2c343c',

      title: {
        text: '教师满意度',
        left: 'center',
        top: 20,
        textStyle: {
          color: '#ccc',
        },
      },

      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },

      visualMap: {
        show: false,
        min: 0,
        max: 1,
        inRange: {
          colorLightness: [0, 1],
        },
      },
      series: [
        {
          name: '满意度',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: data.sort(function(a, b) {
            return a.value - b.value;
          }),
          roseType: 'radius',
          label: {
            normal: {
              textStyle: {
                color: 'rgba(255, 255, 255, 0.3)',
              },
            },
          },
          labelLine: {
            normal: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)',
              },
              smooth: 0.2,
              length: 10,
              length2: 20,
            },
          },
          itemStyle: {
            normal: {
              color: '#c23531',
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },

          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function(idx) {
            return Math.random() * 200;
          },
        },
      ],
    };
    return <Echarts width={SCREEN_WIDTH} option={satisfactOption} />;
  }
}
