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
      let satisfactCount = 0,
        generalCount = 0,
        unsatisfactCount = 0;
      let satisfactCount1 = 0,
        generalCount1 = 0,
        unsatisfactCount1 = 0;
      let satisfactCount2 = 0,
        generalCount2 = 0,
        unsatisfactCount2 = 0;
      let satisfactCount3 = 0,
        generalCount3 = 0,
        unsatisfactCount3 = 0;
      evaluateResult.forEach((value, index) => {
        resultArr.push({ desc: index, ans: value });
      });
      console.log(resultArr);
      resultArr.map(item => {
        if (item.desc === 'question-01') {
          if (item.ans.ans === '满意') {
            satisfactCount1++;
          } else if (item.ans.ans === '一般') {
            generalCount1++;
          } else {
            unsatisfactCount1++;
          }
        } else if (item.desc === 'question-02') {
          if (item.ans.ans === '满意') {
            satisfactCount2++;
          } else if (item.ans.ans === '一般') {
            generalCount2++;
          } else {
            unsatisfactCount2++;
          }
        } else {
          if (item.ans.ans === '满意') {
            satisfactCount3++;
          } else if (item.ans.ans === '一般') {
            generalCount3++;
          } else {
            unsatisfactCount3++;
          }
        }
      });
      satisfactCount =
        satisfactCount1 * 0.5 + satisfactCount2 * 0.3 + satisfactCount3 * 0.2;
      generalCount =
        generalCount1 * 0.5 + generalCount2 * 0.3 + generalCount3 * 0.2;
      unsatisfactCount =
        unsatisfactCount1 * 0.5 +
        unsatisfactCount2 * 0.3 +
        unsatisfactCount3 * 0.2;
      http
        .post('public/entryResult', {
          appraiser: userInfo.id,
          evaluateResult: resultArr,
          commentedTeacherId: teacherInfo.id,
          satisfactRate: satisfactCount,
          generalRate: generalCount,
          unsatisfactRate: unsatisfactCount,
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
      // 设置已评价标志;
      // http
      //   .get(`public/setCommentedById?id=${teacherInfo.id}`)
      //   .then(res => console.log(res))
      //   .catch(err => console.log(err));

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
