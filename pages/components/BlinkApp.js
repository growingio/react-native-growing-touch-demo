import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Blink extends Component {
  // 声明state对象
  state = { isShowingText: this.props.isShow };
  
  componentDidMount() {
    // 每1000毫秒对showText状态做一次取反操作
    setInterval(() => {
      this.setState({
        isShowingText: !this.state.isShowingText
      });
    }, 1000);
  }

  render() {
    // 根据当前showText的值决定是否显示text内容
    if (!this.state.isShowingText) {
      return null;
    }

    return (
      <Text
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          padding:15,
          justifyContent: 'center',
          color:841584
        }}>
        {this.props.text}
      </Text>
    );
  }
}

export default class BlinkApp extends Component {
  render() {
    return (
      <View>
        <Blink text='I love to blink' isShow={true} key='1' />
        <Blink text='Yes blinking is so great'  isShow={false} key='2'/>
        <Blink text='Why did they ever take this out of HTML'  isShow={true} key='3'/>
        <Blink text='Look at me look at me look at me'  isShow={false} key='4'/>
      </View>
    );
  }
}

