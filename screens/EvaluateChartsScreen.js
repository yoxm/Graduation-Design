import React, { Component } from 'react';
import { Text, View, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import { Tabs, WhiteSpace } from 'antd-mobile';
import Echarts from 'native-echarts';
import SatisfactChart from '../components/SatisfactChart';
import YearChart from '../components/YearChart';
import DistrubuteChart from '../components/DistributeChart';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class EvaluateChartsScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const tabs = [
      { title: '满意度' },
      { title: '历年满意度' },
      { title: '满意度分布' },
    ];

    return (
      <View style={styles.container}>
        <Header
          centerComponent={{ text: '评价结果', style: { color: '#fff' } }}
        />
        <WhiteSpace />
        <View style={{ height: 900 }}>
          <Tabs tabs={tabs} initialPage={1} tabBarPosition="top">
            <View style={styles.contentContainer}>
              <SatisfactChart />
            </View>
            <View style={styles.contentContainer}>
              <YearChart />
            </View>
            <View style={styles.contentContainer}>
              <DistrubuteChart />
            </View>
          </Tabs>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {},
});
