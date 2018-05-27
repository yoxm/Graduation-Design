import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import { Button, Header, Tile } from 'react-native-elements';
import { Font } from 'expo';
import { List, Checkbox, Flex, Toast } from 'antd-mobile';
import http from '../utils/http';
import Question from '../components/Question';
import Loading from '../components/Loading';
import { storage } from '../utils/storageTool';

const CheckboxItem = Checkbox.CheckboxItem;

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const IMAGE_SIZE = SCREEN_WIDTH - 80;

export default class EvaluateScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);

    this.state = {
      questionLoaded: false,
      pressed: false,
      teacherInfo: {},
      evaluateResult: new Map(),
      question: [],
      loading: false,
    };
  }

  async componentDidMount() {
    const question = await http.get('/public/getQuestionByType?type=001');
    const { teacherInfo } = this.props.navigation.state.params;
    storage.load('user-info', info => {
      this.setState({
        userInfo: info,
        questionLoaded: true,
        teacherInfo: teacherInfo,
        question: question.data.ans,
      });
    });
  }

  handleChange = (item, desc) => {
    const { evaluateResult } = this.state;
    let questionKey = `question-${desc}`;
    evaluateResult.set(questionKey, item);
    this.setState({
      evaluateResult: evaluateResult,
    });
  };

  /**
   * 处理提交
   */
  handlePress = () => {
    this.setState({
      loading: true,
    });
    const navigation = this.props.navigation;
    const { evaluateResult, question, teacherInfo, userInfo } = this.state;
    if (question.length !== evaluateResult.size) {
      Toast.fail('请填写完整！', 2, null, false);
    } else {
      let resultArr = [];
      evaluateResult.forEach((value, index) => {
        resultArr.push({ desc: index, ans: value });
      });
      http
        .post('public/entryResult', {
          appraiser: userInfo.id,
          evaluateResult: resultArr,
          commentedTeacherId: teacherInfo.id,
        })
        .then(res => {
          this.setState({
            loading: false,
          });
        })
        .catch(err => {
          console.log(err);
          this.setState({
            loading: false,
          });
        });
      http
        .get(`public/setCommentedById?id=${teacherInfo.id}`)
        .then(res => console.log(res))
        .catch(err => console.log(err));

      navigation.navigate('EvaluateComplete');
    }
  };

  render() {
    const { pressed, teacherInfo, question, loading, userInfo } = this.state;
    let questionArr = [];
    if (question.length > 0) {
      question.map((item, index) => {
        questionArr.push(
          <Question
            question={item}
            key={index}
            handleChange={this.handleChange}
          />,
        );
      });
    }
    return (
      <View style={{ flex: 1 }}>
        {this.state.questionLoaded ? (
          <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
              <Tile
                imageSrc={require('../assets/images/bg_screen4.jpg')}
                title={`${teacherInfo.academy}-${teacherInfo.name}-${
                  teacherInfo.profession
                }`}
                onPress={() => {
                  this.props.navigation.navigate('modifyTeacher', {
                    teacherInfo: teacherInfo,
                  });
                }}
              />
              {userInfo.teacherId ? (
                <View>
                  <Text style={styles.tips}>点击图片可修改教师信息</Text>
                </View>
              ) : null}
              <View style={styles.questionContainer}>{questionArr}</View>
              <Button
                raised
                title="提交"
                loading={loading}
                borderRadius={20}
                buttonStyle={{
                  alignItems: 'center',
                  backgroundColor: 'green',
                }}
                containerViewStyle={{
                  marginTop: 20,
                  marginBottom: 20,
                  width: SCREEN_WIDTH - 40,
                }}
                onPress={this.handlePress}
              />
            </ScrollView>
          </View>
        ) : (
          <Loading />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tips: {
    color: 'gray',
    marginLeft: 15,
    marginBottom: 10,
  },
});
