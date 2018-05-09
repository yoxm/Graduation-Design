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

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const mockTeachers = [
  {
    key: '计算机学院',
    academy: '计算机学院',
    data: [
      {
        name: '张翼飞',
        job: '院长',
        clourse: '软件工程',
      },
      {
        name: '刘琨',
        job: '讲师',
        clourse: 'ACM',
      },
      {
        name: '张翼飞',
        job: '院长',
        clourse: '软件工程',
      },
      {
        name: '张翼飞',
        job: '院长',
        clourse: '软件工程',
      },
      {
        name: '张翼飞',
        job: '院长',
        clourse: '软件工程',
      },
      {
        name: '张翼飞',
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
        name: '张翼飞',
        job: '院长',
        clourse: '软件工程',
      },
      {
        name: '刘香芹',
        job: '副教授',
        clourse: '编译原理',
      },
      {
        name: '刘香芹',
        job: '副教授',
        clourse: '编译原理',
      },
      {
        name: '刘香芹',
        job: '副教授',
        clourse: '编译原理',
      },
      {
        name: '刘香芹',
        job: '副教授',
        clourse: '编译原理',
      },
      {
        name: '刘香芹',
        job: '副教授',
        clourse: '编译原理',
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

  componentDidMount() {
    const { teachers } = this.state;
    this.setState({
      teachers: mockTeachers,
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
        title="HELLO WORLD"
        image={require('../assets/images/bg_screen1.jpg')}
      >
        <Text style={{ marginBottom: 10 }}>{info.section.key}</Text>
        <Button
          icon={{ name: 'code' }}
          backgroundColor="#03A9F4"
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          title="VIEW NOW"
        />
      </Card>
    );
  };

  handleSearchChange = () => {};
  handleSearchClear = () => {};
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
