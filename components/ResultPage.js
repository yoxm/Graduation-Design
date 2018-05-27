import React, { Component } from 'react';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Result, WhiteSpace } from 'antd-mobile';
import { View, StyleSheet } from 'react-native';
import { Icon, Button } from 'react-native-elements';

export default class ResultPage extends Component {
  resetRoute = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
    });

    this.props.navigation.dispatch(resetAction);
  };
  handlePress = () => {
    const navigation = this.props.navigation;
    this.resetRoute();
  };

  render() {
    const { buttonTitle, pageTitle, pageMessage } = this.props;
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
            title={pageTitle}
            message={pageMessage}
          />
        </View>

        <View style={styles.button}>
          <Button
            title={buttonTitle}
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
