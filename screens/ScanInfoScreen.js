import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Alert,
} from 'react-native';
import {
  List,
  InputItem,
  Switch,
  Stepper,
  Range,
  Picker,
  DatePicker,
} from 'antd-mobile';

import { Header, Button, Icon } from 'react-native-elements';
import { createForm } from 'rc-form';

const Item = List.Item;

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const district = [
  {
    label: '计算机学院',
    value: '001',
  },
  {
    label: '机械学院',
    value: '002',
  },
  {
    label: '外国语学院',
    value: '003',
  },
];

const rank = [
  {
    label: '教授',
    value: '1',
  },
  {
    label: '副教授',
    value: '1',
  },
  {
    label: '讲师',
    value: '1',
  },
];

class ScanInfoScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor() {
    super();

    this.state = {
      date: '',
    };
  }
  onSubmit = () => {
    this.props.form.validateFields({ force: true }, error => {
      if (!error) {
        console.log(this.props.form.getFieldsValue());
      } else {
        alert('Validation failed');
      }
    });
  };
  onReset = () => {
    this.props.form.resetFields();
  };
  validateUsername = (rule, value, callback) => {
    if (value && value.length > 4) {
      callback();
    } else {
      callback(new Error('At least four charactors for account'));
    }
  };
  render() {
    const { getFieldProps, getFieldError } = this.props.form;

    return (
      <View style={styles.container}>
        <Header
          centerComponent={{ text: '个人信息', style: { color: '#fff' } }}
        />
        <List
          renderHeader={() => '参评教师信息录入'}
          renderFooter={() =>
            getFieldError('username') && getFieldError('username').join(',')
          }
        >
          <InputItem
            {...getFieldProps('username', {
              rules: [{ required: true, message: 'Please input username' }],
            })}
            clear
            error={!!getFieldError('username')}
            onErrorClick={() => {
              alert(getFieldError('username').join('、'));
            }}
            placeholder="please input username"
          >
            姓名
          </InputItem>

          <Picker data={rank} cols={1} {...getFieldProps('rank')}>
            <List.Item arrow="horizontal">职称</List.Item>
          </Picker>
          <Picker data={district} cols={1} {...getFieldProps('district3')}>
            <List.Item arrow="horizontal">学院</List.Item>
          </Picker>

          <DatePicker
            {...getFieldProps('date', {
              initialValue: this.state.date,
              rules: [{ required: true, message: 'Must select a date' }],
            })}
            mode="date"
            title="参评日期"
            extra="请选择"
            minDate={new Date()}
          >
            <List.Item arrow="horizontal">参评日期</List.Item>
          </DatePicker>

          <Button
            title="提交"
            buttonStyle={styles.submitButton}
            onPress={this.onSubmit}
          />
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  submitButton: {
    borderRadius: 20,
    backgroundColor: 'black',
    width: SCREEN_WIDTH - 80,
    alignSelf: 'center',
  },
});

export default createForm()(ScanInfoScreen);
