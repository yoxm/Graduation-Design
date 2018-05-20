import React, { Component } from 'react';
import { Result, WhiteSpace } from 'antd-mobile';
import { View, StyleSheet } from 'react-native';
import { Icon, Button } from 'react-native-elements';

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
      <View style={styles.container}>
        <View style={styles.result}>
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
        </View>

        <View style={styles.button}>
          <Button
            title="返回主页"
            onPress={this.handlePress}
            backgroundColor="green"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  result: {
    marginTop: 60,
  },
  button: {
    marginTop: 50,
    flex: 1,
  },
});
