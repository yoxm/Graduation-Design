import React, { Component } from 'react';
import ResultPage from '../components/ResultPage';
export default class ModifyComplete extends Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <ResultPage
        buttonTitle="返回主页"
        pageTitle="修改成功"
        pageMessage="感谢你对质量评价系统的努力"
        navigation={this.props.navigation}
      />
    );
  }
}
