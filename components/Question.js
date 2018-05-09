import React, { Component } from 'react';
import { List, Radio } from 'antd-mobile';

const RadioItem = Radio.RadioItem;

export default class Question extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
    };
  }

  onChange = item => {
    this.setState({
      value: item.value,
    });
  };

  render() {
    const { question, Onchange } = this.props;
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
            onChange={() => this.onChange(item)}
          >
            {item.ans}
          </RadioItem>
        ))}
      </List>
    );
  }
}
