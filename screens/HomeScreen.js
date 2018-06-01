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
import { WebBrowser, Asset } from 'expo';
import { Toast } from 'antd-mobile';
import {
  SearchBar,
  Header,
  ListItem,
  List,
  Button,
  Card,
  Tile,
} from 'react-native-elements';
import http from '../utils/http';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);

    this.state = {
      teachers: [],
      refreshing: false,
    };
  }

  getTeacherData = async () => {
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
  };

  async componentDidMount() {
    this.getTeacherData();
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
    return (
      <Card
        title={info.section.academy}
        image={require('../assets/images/bg_screen2.jpg')}
      >
        <View>
          <Text>{`共${info.section.data.length}位老师`}</Text>
        </View>
      </Card>
    );
  };

  //TO_DO 搜索功能实现
  handleSearchChange = () => {};
  handleSearchClear = () => {};
  /**
   * 列表信息跳转
   */
  handleListPress = info => {
    const navigation = this.props.navigation;
    navigation.navigate('Evaluate', { teacherInfo: info.item });
  };
  render() {
    const { refreshing } = this.state;
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
          refreshing={refreshing}
          onRefresh={this.getTeacherData}
        />
        {/* stickySectionHeadersEnabled={true} */}
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
