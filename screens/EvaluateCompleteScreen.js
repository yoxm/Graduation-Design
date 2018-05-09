import React, { Component } from 'react';
import { Result, WhiteSpace } from 'antd-mobile';
import { View } from 'react-native';
import { Icon, Button } from 'react-native-elements';

const myImg = src => (
  <img src={src} className="spe am-icon am-icon-md" alt="" />
);

export default class EvaluateCompleteScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  handlePress = () => {
    const navigation = this.props.navigation;
    navigation.navigate('Home');
  };

  render() {
    return (
      <View>
        <Result
          img={
            <Icon
              name="check-circle"
              type="FontAwesome"
              color="green"
              size={80}
            />
          }
          title="评价成功"
          message="感谢你对质量检测系统的努力"
        />
        <Button
          style={{ flex: 1 }}
          title="返回主页"
          onPress={this.handlePress}
          backgroundColor="green"
        />
      </View>
    );
  }
}
