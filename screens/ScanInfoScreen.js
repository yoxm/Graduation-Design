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
  Toast,
} from 'antd-mobile';

import { Header, Button, Icon } from 'react-native-elements';
import { createForm } from 'rc-form';
import http from '../utils/http';

const Item = List.Item;

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const academy = [
  {
    label: '计算机学院',
    value: '计算机学院',
  },
  {
    label: '机械学院',
    value: '机械学院',
  },
  {
    label: '外国语学院',
    value: '外国语学院',
  },
];

const profession = [
  {
    label: '院长',
    id: '001',
    value: '院长',
  },
  {
    label: '副院长',
    id: '002',
    value: '副院长',
  },
  {
    label: '教授',
    id: '003',
    value: '教授',
  },
  {
    label: '副教授',
    id: '004',
    value: '副教授',
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
      isLoading: false,
    };
  }
  onSubmit = () => {
    this.setState({
      isLoading: true,
    });
    this.props.form.validateFields({ force: true }, error => {
      if (!error) {
        console.log(this.props.form.getFieldsValue());
        const {
          name,
          date,
          profession,
          academy,
        } = this.props.form.getFieldsValue();
        http
          .post('/public/scanInfo', { name, date, profession, academy })
          .then(res => {
            this.setState({
              isLoading: false,
            });
            const data = res.data;
            Toast.success(data.info);
          })
          .catch(err => {
            this.setState({
              isLoading: false,
            });
            console.log(err);
          });
      } else {
        this.setState({
          isLoading: false,
        });
        Toast.fail('请填写完整');
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
    const { isLoading } = this.state;
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{ text: '个人信息', style: { color: '#fff' } }}
        />
        <List renderHeader={() => '参评教师信息录入'}>
          <InputItem
            {...getFieldProps('name', {
              rules: [{ required: true, message: 'Please input name' }],
            })}
            clear
            error={!!getFieldError('name')}
            onErrorClick={() => {
              alert(getFieldError('name').join('、'));
            }}
            placeholder="姓名"
          >
            姓名
          </InputItem>

          <Picker
            data={profession}
            cols={1}
            {...getFieldProps('profession', {
              rules: [{ required: true, message: 'Please input name' }],
            })}
          >
            <List.Item arrow="horizontal">职称</List.Item>
          </Picker>
          <Picker
            data={academy}
            cols={1}
            {...getFieldProps('academy', {
              rules: [{ required: true, message: 'Please input name' }],
            })}
          >
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
        </List>
        <Button
          loading={isLoading}
          title="提交"
          containerStyle={{ flex: -1 }}
          buttonStyle={styles.submitButton}
          linearGradientProps={{
            colors: ['#FF9800', '#F44336'],
            start: [1, 0],
            end: [0.2, 0],
          }}
          onPress={this.onSubmit}
          disabled={isLoading}
        />
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
    backgroundColor: 'green',
    width: SCREEN_WIDTH - 40,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 20,
  },
});

export default createForm()(ScanInfoScreen);
