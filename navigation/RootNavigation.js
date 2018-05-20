import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator } from 'react-navigation';
import { View, Text } from 'react-native';
import MainTabNavigator from './MainTabNavigator';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';
import LoginInScreen from '../screens/LoginInScreen';
import { getToken } from '../utils/tokenUtil';
import Loading from '../components/Loading';
const configRootNavigator = isLogin => {
  return StackNavigator(
    {
      Main: {
        screen: MainTabNavigator,
      },
      Login: {
        screen: LoginInScreen,
      },
    },
    {
      initialRouteName: isLogin ? 'Main' : 'Login',
      navigationOptions: () => ({
        headerTitleStyle: {
          fontWeight: 'normal',
        },
      }),
    },
  );
};

export default class RootNavigator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: false,
      isLoading: true,
    };
  }
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
    getToken('sau-token', token => {
      if (token) {
        this.setState({
          isLogin: true,
          isLoading: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    const { isLogin, isLoading } = this.state;
    const RootNavigator = configRootNavigator(this.state.isLogin);

    return isLoading ? <Loading /> : <RootNavigator />;
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification,
    );
  }

  _handleNotification = ({ origin, data }) => {
    console.log(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`,
    );
  };
}
