import React, { Component } from 'react';
import { List, Radio } from 'antd-mobile';

const RadioItem = Radio.RadioItem;

export default class Question extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null,
    };
  }

  onChange = (item, desc) => {
    this.setState({
      value: item.value,
    });
    this.props.handleChange(item, desc);
  };

  render() {
    const { question } = this.props;
    const { value } = this.state;
    return (
      <List
        renderHeader={() => {
          return question.header;
        }}
      >
        {question.label.map(item => (
          <RadioItem
            key={item.value}
            checked={value === item.value}
            onChange={() => this.onChange(item, question.desc)}
          >
            {item.ans}
          </RadioItem>
        ))}
      </List>
    );
  }
}
