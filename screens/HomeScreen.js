import React from 'react';
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
  SectionList,
} from 'react-native';
import { WebBrowser } from 'expo';
import { Toast } from 'antd-mobile';
import {
  SearchBar,
  Header,
  Card,
  ListItem,
  List,
  Button,
} from 'react-native-elements';
import http from '../utils/http';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const mockTeachers = [
  {
    key: '计算机学院',
    academy: '计算机学院',
    data: [
      {
        name: '张翼飞老师',
        job: '院长',
        clourse: '软件工程',
      },
      {
        name: '刘琨老师',
        job: '讲师',
        clourse: 'ACM',
      },
      {
        name: '赵亮老师',
        job: '院长',
        clourse: '软件工程',
      },
      {
        name: '刘香芹老师',
        job: '院长',
        clourse: '软件工程',
      },
    ],
  },
  {
    key: '机械学院',
    academy: '机械学院',
    data: [
      {
        name: '张翼飞老师',
        job: '院长',
        clourse: '软件工程',
      },
      {
        name: '刘香芹老师',
        job: '副教授',
        clourse: '编译原理',
      },
      {
        name: '刘香芹老师',
        job: '副教授',
        clourse: '编译原理',
      },
    ],
  },
  {
    key: '外国语学院',
    academy: '外国语学院',
    data: [
      {
        name: 'Allen老师',
        job: '院长',
        clourse: '英语',
      },
      {
        name: 'Tony老师',
        job: '副教授',
        clourse: '英语',
      },
      {
        name: '刘香芹',
        job: '副教授',
        clourse: '英语',
      },
    ],
  },
];

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);

    this.state = {
      teachers: [],
      refreshing: true,
    };
  }

  async componentDidMount() {
    const { teachers } = this.state;
    const commentedTeacher = await http.get('/public/getCommentedTeacher');
    const teacherData = commentedTeacher.data.teacher;
    let teacherArr = [];

    teacherData.length &&
      teacherData.map(item => {
        if (item.isCommented === '0') {
          let flag = false;
          teacherArr.map(value => {
            if (item.academy === value.academy) {
              flag = true;
              value['data'].push(item);
            }
          });

          !flag &&
            teacherArr.push({
              key: item.academy,
              academy: item.academy,
              data: (() => {
                let arrTmp = [];
                arrTmp.push(item);
                return arrTmp;
              })(),
            });
        }
      });
    this.setState({
      teachers: teacherArr,
    });
  }

  renderRow = info => {
    return (
      <TouchableOpacity
        onPress={event => {
          this.handleListPress(info);
        }}
      >
        <ListItem style={styles.user} title={info.item.name} />
      </TouchableOpacity>
    );
  };

  _sectionComp = info => {
    const key = info.section.key;
    return (
      <Card
        title={info.section.key}
        image={require('../assets/images/bg_screen1.jpg')}
      />
    );
  };

  handleSearchChange = () => {};
  handleSearchClear = () => {};
  /**
   * 列表信息跳转
   */
  handleListPress = info => {
    const navigation = this.props.navigation;
    navigation.navigate('Evaluate', { tearcherInfo: info.item });
  };
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Header
            centerComponent={{ text: '评价', style: { color: '#fff' } }}
            outerContainerStyles={styles.headerContainer}
          />
          <SearchBar
            round
            lightTheme
            onChangeText={this.handleSearchChange}
            onClearText={this.handleSearchClear}
            placeholder="Type Here..."
            containerStyle={styles.searchBarContainer}
          />
        </View>
        <SectionList
          refreshing={this.state.refreshing}
          renderSectionHeader={this._sectionComp}
          renderItem={this.renderRow}
          sections={this.state.teachers}
          keyExtractor={(item, index) => 'index' + index + item}
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
  contentContainer: {
    flex: 1,
  },
  headerContainer: {},
  searchBarContainer: {},
  cardContainer: {},
  option: {
    backgroundColor: 'transparent',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EDEDED',
  },
});
