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
import { List, Checkbox, Flex } from 'antd-mobile';
import Question from '../components/Question';

const CheckboxItem = Checkbox.CheckboxItem;
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const IMAGE_SIZE = SCREEN_WIDTH - 80;
const ansItem = [
  {
    ans: '非常满意',
    value: 0,
  },
  { ans: '一般', value: 1 },
  { ans: '不好', value: 2 },
];

const questions = [
  { header: '你满意老师的教学风格吗？', label: ansItem, desc: '01' },
  { header: '你对于上课纪律感受如何', label: ansItem, desc: '02' },
  { header: '你觉着上课讲的生动吗', label: ansItem, desc: '03' },
];
export default class EvaluateScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
      pressed: false,
      tearcherInfo: {},
      evaluateResult: [],
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      georgia: require('../assets/fonts/Georgia.ttf'),
      regular: require('../assets/fonts/Montserrat-Regular.ttf'),
      light: require('../assets/fonts/Montserrat-Light.ttf'),
      bold: require('../assets/fonts/Montserrat-Bold.ttf'),
    });

    const tearcherInfo = this.props.navigation.state.params.tearcherInfo;
    this.setState({ fontLoaded: true, tearcherInfo: tearcherInfo });
  }
  handleChange = (item, desc) => {
    const { evaluateResult } = this.state;
    evaluateResult.length > 0 &&
      evaluateResult.map(evaluate => {
        if (evaluate['desc'] === desc) {
          const index = evaluateResult.findIndex(value => value === evaluate);
          evaluateResult.splice(index, 1, { desc: desc, ans: item });
          console.log('object');
        } else {
          evaluateResult.push({ desc: desc, ans: item });
          console.log('为进取');
        }
      });
    evaluateResult.length === 0 &&
      evaluateResult.push({ desc: desc, ans: item });
    this.setState(
      {
        evaluateResult: evaluateResult,
      },
      () => {
        console.log(this.state.evaluateResult);
      },
    );
  };

  handlePress = () => {
    const navigation = this.props.navigation;
    // navigation.navigate('EvaluateComplete');
  };
  render() {
    const { pressed, tearcherInfo } = this.state;
    let questionArr = [];
    questions.map((item, index) => {
      questionArr.push(
        <Question
          question={item}
          key={index}
          handleChange={this.handleChange}
        />,
      );
    });
    return (
      <View style={{ flex: 1 }}>
        {this.state.fontLoaded ? (
          <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
              <Tile
                imageSrc={require('../assets/images/bg_screen4.jpg')}
                title={`${tearcherInfo.name}-${tearcherInfo.job}-${
                  tearcherInfo.clourse
                }`}
              />
              <View style={styles.questionContainer}>{questionArr}</View>
              <Button
                raised
                title="提交"
                backgroundColor="rgb(29,155,211)"
                borderRadius={20}
                containerViewStyle={{
                  marginTop: 20,
                  marginBottom: 20,
                  alignItems: 'center',
                  width: SCREEN_WIDTH - 80,
                  backgroundColor: 'rgb(29,155,211)',
                }}
                onPress={this.handlePress}
              />
            </ScrollView>
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({});
