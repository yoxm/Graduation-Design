import React, { Component } from 'react';
import {
  Alert,
  LayoutAnimation,
  TouchableOpacity,
  Dimensions,
  UIManager,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Keyboard,
} from 'react-native';
import { Font } from 'expo';
import {
  FormInput,
  FormLabel,
  FormValidationMessage,
  Button,
  Icon,
} from 'react-native-elements';
import UserTypeItem from '../components/UserTypeItem';
import HomeScreen from './HomeScreen';
import dismissKeyboard from 'dismissKeyboard';
import http from '../utils/http';
import { Toast } from 'antd-mobile';
import { setToken, getToken } from '../utils/tokenUtil';
import { storage } from '../utils/storageTool';

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const USER_STUDENT = require('../assets/images/user-student.png');
const USER_HP = require('../assets/images/teacher.png');

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class LoginInScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      selectedType: null,
      fontLoaded: false,
      number: '',
      numberVaild: true,
      password: '',
      confirmationPassword: '',
      passwordValid: true,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      light: require('../assets/fonts/Ubuntu-Light.ttf'),
      bold: require('../assets/fonts/Ubuntu-Bold.ttf'),
      lightitalic: require('../assets/fonts/Ubuntu-Light-Italic.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  loginIn = () => {
    const { number, password, selectedType } = this.state;
    LayoutAnimation.easeInEaseOut();
    const numberVaild = this.validateNumber();
    const passwordValid = this.validatePassword();
    if (this.state.selectedType === null) {
      Toast.info('请选择对应职业', 1);
      return;
    }
    if (numberVaild && passwordValid) {
      this.setState({ isLoading: true });
      http
        .post('/login', {
          id: number,
          password: password,
          selectedType: selectedType,
        })
        .then(res => {
          dismissKeyboard();
          const resData = res.data;
          console.log(resData);
          setToken('sau-token', resData.data.accessToken);
          storage.save('user-info', resData.data.userInfo);
          Toast.success(resData.info);
          this.props.navigation.navigate('Home');
        });
    }
  };

  validateNumber = () => {
    const { number } = this.state;
    const numberVaild = number.length > 0 && number.length < 16;
    LayoutAnimation.easeInEaseOut();
    this.setState({ numberVaild });
    numberVaild || this.numberInput.shake();
    return numberVaild;
  };

  validatePassword = () => {
    const { password } = this.state;
    const passwordValid = password.length >= 8;
    LayoutAnimation.easeInEaseOut();
    this.setState({ passwordValid });
    passwordValid || this.passwordInput.shake();
    return passwordValid;
  };

  setSelectedType = selectedType => {
    LayoutAnimation.easeInEaseOut() || this.setState({ selectedType });
  };

  render() {
    const {
      isLoading,
      selectedType,
      fontLoaded,
      confirmationPassword,
      password,
      passwordValid,
      number,
      numberVaild,
    } = this.state;

    return !fontLoaded ? (
      <Text> Loading... </Text>
    ) : (
      <ScrollView
        scrollEnabled={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}
      >
        <KeyboardAvoidingView
          behavior="position"
          contentContainerStyle={styles.formContainer}
        >
          <Text style={styles.signUpText}>Login In</Text>
          <Text style={styles.whoAreYouText}>WHO YOU ARE ?</Text>
          <View style={styles.userTypesContainer}>
            <UserTypeItem
              label="学生"
              labelColor="#2CA75E"
              image={USER_STUDENT}
              onPress={() => this.setSelectedType('student')}
              selected={selectedType === 'student'}
            />
            <UserTypeItem
              label="教师/领导/同行"
              labelColor="#36717F"
              image={USER_HP}
              onPress={() => this.setSelectedType('teacher')}
              selected={selectedType === 'teacher'}
            />
          </View>
          <View style={{ width: ' 80%', alignItems: 'center' }}>
            <FormInput
              ref={input => (this.numberInput = input)}
              numeric
              containerStyle={styles.inputContainer}
              leftIcon={<Icon name="school" />}
              inputStyle={styles.inputStyle}
              value={number}
              onChangeText={number => this.setState({ number })}
              placeholder="学号或职工号"
              returnKeyType="next"
              onSubmitEditing={() => {
                this.validateNumber();
                this.numberInput.focus();
              }}
            />
            <FormInput
              ref={input => (this.passwordInput = input)}
              type="password"
              containerStyle={styles.inputContainer}
              inputStyle={styles.inputStyle}
              value={password}
              onChangeText={password => this.setState({ password })}
              secureTextEntry={true}
              placeholder="密码"
              returnKeyType="next"
              onSubmitEditing={() => {
                this.validatePassword();
                this.passwordInput.focus();
              }}
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>
          <Button
            loading={isLoading}
            title="登录"
            containerStyle={{ flex: -1 }}
            buttonStyle={styles.signUpButton}
            linearGradientProps={{
              colors: ['#FF9800', '#F44336'],
              start: [1, 0],
              end: [0.2, 0],
            }}
            titleStyle={styles.signUpButtonText}
            onPress={this.loginIn}
            disabled={isLoading}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: '#293046',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  signUpText: {
    color: 'white',
    fontSize: 28,
    fontFamily: 'light',
  },
  whoAreYouText: {
    color: '#7384B4',
    fontFamily: 'bold',
    fontSize: 14,
  },
  userTypesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: SCREEN_WIDTH,
    alignItems: 'center',
  },
  inputContainer: {
    paddingLeft: 8,
    height: 45,
    marginVertical: 10,
  },
  inputStyle: {
    flex: 1,
    marginLeft: 10,
    color: 'white',
    fontFamily: 'light',
    fontSize: 16,
  },
  errorInputStyle: {
    marginTop: 0,
    textAlign: 'center',
    color: '#F44336',
  },
  signUpButtonText: {
    fontFamily: 'bold',
    fontSize: 13,
  },
  signUpButton: {
    width: 250,
    borderRadius: 50,
    height: 45,
  },
  loginHereContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alreadyAccountText: {
    fontFamily: 'lightitalic',
    fontSize: 12,
    color: 'white',
  },
  loginHereText: {
    color: '#FF9800',
    fontFamily: 'lightitalic',
    fontSize: 12,
  },
});
