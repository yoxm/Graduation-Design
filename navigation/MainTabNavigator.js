import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LoginInScreen from '../screens/LoginInScreen';
import EvaluateScreen from '../screens/EvaluateScreen';
import EvaluateCompleteScreen from '../screens/EvaluateCompleteScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ScanInfoScreen from '../screens/ScanInfoScreen';
import EvaluateChartsScreen from '../screens/EvaluateChartsScreen';
const HomeStack = StackNavigator({
  Home: { screen: HomeScreen, path: 'app/home' },
  Evaluate: { screen: EvaluateScreen, path: 'app/home/evaluate' },
  EvaluateComplete: {
    screen: EvaluateCompleteScreen,
    path: 'app/home/evaluate/evaluateComplete',
  },
});

const ProfileStack = StackNavigator({
  profile: { screen: ProfileScreen },
  scanInfo: { screen: ScanInfoScreen },
});

export default TabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: '主页',
      },
    },
    observe: {
      screen: EvaluateChartsScreen,
      navigationOptions: {
        tabBarLabel: '查看',
      },
    },
    profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarLabel: '主页',
      },
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            iconName =
              Platform.OS === 'ios'
                ? `ios-home${focused ? '' : '-outline'}`
                : 'md-home';
            break;
          case 'observe':
            iconName =
              Platform.OS === 'ios'
                ? `ios-eye${focused ? '' : '-outline'}`
                : 'md-eye';
            break;
          case 'profile':
            iconName =
              Platform.OS === 'ios'
                ? `ios-person${focused ? '' : '-outline'}`
                : 'md-person';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3, width: 25 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  },
);
