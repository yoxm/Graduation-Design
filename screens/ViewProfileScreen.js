import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { List } from 'antd-mobile';
import { storage } from '../utils/storageTool';

const Item = List.Item;

export default class ViewProfileScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
    };
  }

  componentDidMount() {
    storage.load('user-info', info => {
      this.setState({
        userInfo: info,
      });
    });
  }

  render() {
    const { userInfo } = this.state;
    return (
      <View sryle={styles.container}>
        <List renderHeader={() => 'Basic Style'} style={styles.list}>
          <Item
            arrow="horizontal"
            onClick={() => {}}
            platform="android"
            extra={userInfo.name}
          >
            姓名
          </Item>
          <Item
            arrow="horizontal"
            onClick={() => {}}
            platform="android"
            extra={userInfo.age}
          >
            年龄
          </Item>
          <Item
            arrow="horizontal"
            onClick={() => {}}
            platform="android"
            extra={userInfo.sex}
          >
            性别
          </Item>
          {userInfo.profession ? (
            <Item
              arrow="horizontal"
              onClick={() => {}}
              platform="android"
              extra={userInfo.profession}
            >
              职称
            </Item>
          ) : null}
          <Item
            arrow="horizontal"
            onClick={() => {}}
            platform="android"
            extra={userInfo.academy}
          >
            学院
          </Item>
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    marginTop: 30,
  },
});
