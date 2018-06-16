import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { List, InputItem, Picker, DatePicker, Toast } from 'antd-mobile';
import { Header, Button, Icon } from 'react-native-elements';
import http from '../utils/http';
import dismissKeyboard from 'dismissKeyboard';
import { createForm } from 'rc-form';

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

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

class ModifyTeacher extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    userInfo: {},
    date: now,
    isModify: false,
    isDisable: true,
  };

  onSubmit = () => {
    const navigation = this.props.navigation;
    const { teacherInfo } = navigation.state.params;
    this.setState({
      isModify: false,
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
          .post('/public/updateTeacherById', {
            id: teacherInfo.id,
            name: name,
            date: date,
            profession: profession[0],
            academy: academy[0],
          })
          .then(res => {
            this.setState({
              isModify: false,
            });
            const data = res.data;
            Toast.success('提交成功', 1, null, false);
            dismissKeyboard();
            navigation.navigate('ModifyComplete');
          })
          .catch(err => {
            this.setState({
              isModify: false,
            });
            console.log(err);
          });
      } else {
        this.setState({
          isModify: false,
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

  handleModify = () => {
    this.setState({ isModify: true, isDisable: false });
    Toast.info('可以编辑了', 2, null, false);
  };

  handleDelete = () => {
    const navigation = this.props.navigation;
    const { teacherInfo } = navigation.state.params;
    const { id } = teacherInfo;
    http.get(`public/deleteTeacherById?id=${id}`).then(res => {
      Toast.info('删除成功', 3, null, true);
    });
  };

  render() {
    const { userInfo, isModify, isDisable } = this.state;
    const { teacherInfo } = this.props.navigation.state.params;
    const { getFieldProps, getFieldError } = this.props.form;

    return (
      <View style={styles.container}>
        <Header
          centerComponent={{ text: '修改个人信息', style: { color: '#fff' } }}
        />
        <List>
          <InputItem
            {...getFieldProps('name', {
              initialValue: teacherInfo.name,
              rules: [{ required: true, message: 'Please input name' }],
            })}
            clear
            error={!!getFieldError('name')}
            onErrorClick={() => {
              alert(getFieldError('name').join('、'));
            }}
            editable={isModify}
            placeholder="姓名"
            ref={el => (this.inputRef = el)}
          >
            姓名
          </InputItem>
          <Picker
            data={profession}
            cols={1}
            disabled={!isModify}
            {...getFieldProps('profession', {
              rules: [{ required: true, message: '请输入职称' }],
              initialValue: [teacherInfo.profession],
            })}
          >
            <List.Item arrow="horizontal">职称</List.Item>
          </Picker>
          <Picker
            data={academy}
            disabled={!isModify}
            cols={1}
            {...getFieldProps('academy', {
              rules: [{ required: true, message: '请输入学院' }],
              initialValue: [teacherInfo.academy],
            })}
          >
            <List.Item arrow="horizontal">学院</List.Item>
          </Picker>

          <DatePicker
            {...getFieldProps('date', {
              initialValue: this.state.date,
              rules: [{ required: true, message: '请输入日期' }],
            })}
            disabled={!isModify}
            mode="date"
            title="参评日期"
            extra="请选择"
          >
            <List.Item arrow="horizontal">参评日期</List.Item>
          </DatePicker>
        </List>

        <View style={styles.buttonContainer}>
          <Button
            raised
            icon={{ name: 'cached' }}
            title="修改"
            borderRadius={10}
            buttonStyle={{ width: 100 }}
            onPress={this.handleModify}
            backgroundColor="#219488"
          />
          <Button
            raised
            icon={{ name: 'cached' }}
            title="保存"
            borderRadius={10}
            buttonStyle={{ width: 100 }}
            backgroundColor="#8CBF59"
            onPress={this.onSubmit}
            disabled={isDisable}
          />
          <Button
            raised
            icon={{ name: 'cached' }}
            title="删除"
            borderRadius={10}
            buttonStyle={{ width: 100 }}
            backgroundColor="#8CBF59"
            onPress={this.handleDelete}
            disabled={isDisable}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default createForm()(ModifyTeacher);
