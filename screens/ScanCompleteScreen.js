import React, { Component } from 'react';
import ResultPage from '../components/ResultPage';
export default class ScanCompleteScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <ResultPage
        buttonTitle="返回主页"
        pageTitle="提交成功"
        pageMessage="感谢你对质量评价系统的努力"
        navigation={this.props.navigation}
      />
    );
  }
}
