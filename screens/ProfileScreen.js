import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import { List, ListItem } from 'react-native-elements';
import { delToken } from '../utils/tokenUtil';
import { WebBrowser, FileSystem } from 'expo';
import { storage } from '../utils/storageTool';
import http from '../utils/http';
import { FileOpener } from 'react-native-file-opener';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class ProfileScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      userInfo: {},
    };
  }

  signout = () => {
    delToken('sau-token');
    this.props.navigation.navigate('Login');
  };

  componentDidMount() {
    storage.load('user-info', info => {
      console.log('====================================');
      console.log(info);
      console.log('====================================');
      this.setState({
        userInfo: info,
      });
    });
  }
  render() {
    const { userInfo } = this.state;
    const navigation = this.props.navigation;

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(241,240,241,1)',
          marginTop: 10,
        }}
      >
        <View style={styles.statusBar} />
        <View style={styles.navBar}>
          <Text style={styles.nameHeader}>个人信息</Text>
        </View>
        <ScrollView style={{ flex: 1, marginBottom: 20 }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              backgroundColor: 'white',
              borderRadius: 5,
              alignItems: 'center',
              marginHorizontal: 10,
              height: 250,
              marginBottom: 10,
            }}
          >
            <View style={{ flex: 3, flexDirection: 'row' }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Avatar
                  width={145}
                  height={145}
                  source={{
                    uri:
                      'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg',
                  }}
                  activeOpacity={0.7}
                  avatarStyle={{ borderRadius: 145 / 2 }}
                  overlayContainerStyle={{ backgroundColor: 'transparent' }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{ flex: 1, marginTop: 10, justifyContent: 'center' }}
                >
                  <Text
                    style={{
                      fontSize: 25,
                      color: 'rgba(98,93,144,1)',
                      marginLeft: -15,
                    }}
                  >
                    {userInfo.name || '未录入'}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                width: 300,
                borderWidth: 0.5,
                borderColor: 'rgba(222, 223, 226, 1)',
                marginHorizontal: 20,
                height: 1,
                marginVertical: 10,
              }}
            />
            <View
              style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
            >
              <View style={{ flex: 1, marginLeft: 20 }}>
                <Button
                  title="View Profile"
                  buttonStyle={{
                    height: 33,
                    width: 120,
                    backgroundColor: 'rgba(222, 223, 226, 1)',
                    borderRadius: 5,
                  }}
                  titleStyle={{
                    fontSize: 13,
                    color: 'gray',
                  }}
                  onPress={() => navigation.navigate('viewProfile')}
                  underlayColor="transparent"
                />
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Button
                  title="登出"
                  buttonStyle={{
                    height: 33,
                    width: 120,
                    backgroundColor: 'rgba(113, 154, 112, 1)',
                    borderRadius: 5,
                  }}
                  titleStyle={{
                    fontSize: 13,
                    color: 'white',
                  }}
                  onPress={this.signout}
                  underlayColor="transparent"
                />
              </View>
            </View>
          </View>
          <View>
            <List>
              <TouchableOpacity onPress={() => navigation.navigate('scanInfo')}>
                <ListItem
                  title="录入参评教师信息"
                  leftIcon={{ name: 'av-timer' }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  WebBrowser.openBrowserAsync(
                    'http://10.0.3.2:3000/public/exportEvaluate',
                  );
                }}
              >
                <ListItem
                  title="评价结果导出"
                  leftIcon={{ name: 'av-timer' }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  WebBrowser.openBrowserAsync(
                    'http://10.0.3.2:3000/public/exportTeacher',
                  );
                }}
              >
                <ListItem
                  title="参评教师信息导出"
                  leftIcon={{ name: 'av-timer' }}
                />
              </TouchableOpacity>
            </List>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  statusBar: {
    height: 10,
  },
  navBar: {
    height: 60,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignContent: 'center',
  },
  nameHeader: {
    color: 'black',
    fontSize: 25,
    marginLeft: 20,
  },
});
