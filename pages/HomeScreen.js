/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, Switch, TouchableNativeFeedback} from 'react-native';
import {NativeModules} from 'react-native';
import GrowingTouch from 'react-native-growing-touch'

export default class HomeScreen extends Component {
  state = {
    isEnable: true,
  };

  _onPressButton() {
    console.log('You tapped the button!');
    NativeModules.IntentMoudle.startActivityFromJS(
      'com.rntest.TestPageActivity',
      null,
    );
  }

  name1 = (param) => {
    console.log('name1 2= '+ param);
  }


  _jumpRNPage(url) {
    console.log("You jump the RN page!");
    this.props.navigation.push(url);
  }

  // 一旦在RN代码中注册了GrowingTouch的弹窗监听，您就必须自己实现click弹窗时的跳转功能
  // 如果不注册GrowingTouch的弹窗监听，那么您可以放心使用
  handleEventPopupListener = (event) => {
    console.log('注册弹窗监听');
    GrowingTouch.setEventPopupListener({
        /**
         * 弹窗显示成功
         *
         * @param eventId   埋点事件名称
         * @param eventType 事件类型，system(弹窗SDK内置的事件)或custom(用户自定义的埋点事件)
         */
        onLoadSuccess: (eventId, eventType) => {
          console.log('RNApp onLoadSuccess: eventId = ' + eventId + ', eventType = ' + eventType);
        },

        /**
         * 弹窗加载失败
         *
         * @param eventId     埋点事件名称
         * @param eventType   事件类型，system(弹窗SDK内置的事件)或custom(用户自定义的埋点事件)
         * @param errorCode   错误码
         * @param description 错误描述
         */
        onLoadFailed: (eventId, eventType, errorCode, description) => {
          console.log('RNApp onLoadFailed: eventId = ' + eventId + ', eventType = ' + eventType + ', errorCode = ' + errorCode + ', description = ' + description);
        },

        /**
         * 用户点击了弹窗的有效内容。弹窗SDK现在只提供跳转APP内部界面和H5界面两种处理方式。
         * 您可以在这里接管跳转事件，处理需要跳转的url。您也可以自定义Url协议，实现更多业务和交互功能。
         *
         * @param eventId   埋点事件名称
         * @param eventType 事件类型，system(弹窗SDK内置的事件)或custom(用户自定义的埋点事件)
         * @param openUrl   跳转的url
         */
        onClicked: (eventId, eventType, openUrl) => {
          console.log('RNApp onClicked: eventId = ' + eventId + ', eventType = ' + eventType + ', openUrl = ' + openUrl);
          var url = openUrl.substring(9);
          this.name1(url);
        },

        /**
         * 用户关闭了弹窗
         *
         * @param eventId   埋点事件名称
         * @param eventType 事件类型，system(弹窗SDK内置的事件)或custom(用户自定义的埋点事件)
         */
        onCancel: (eventId, eventType) => {
          console.log('RNApp onCancel: eventId = ' + eventId + ', eventType = ' + eventType);
        },

        /**
         * 弹窗显示超时
         *
         * @param eventId   埋点事件名称
         * @param eventType 事件类型，system(弹窗SDK内置的事件)或custom(用户自定义的埋点事件)
         */
        onTimeout: (eventId, eventType) => {
          console.log('RNApp onTimeout: eventId = ' + eventId + ', eventType = ' + eventType);
      },
   });
}

  async componentWillMount(event) {
    this.handleEventPopupListener(event);
  }

  render() {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={styles.container}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: 841584, padding: 15, fontSize: 50}}>
            Home Screen
          </Text>
        </View>
        <View style={styles.alternativeLayoutButtonContainer}>
          <Button
            title="进入详情页"
            onPress={() => this.props.navigation.push('Details')}
          />
          <Button
            title="进入轮播页"
            onPress={() => this.props.navigation.push('Banner')}
          />
        </View>
        <View style={styles.alternativeLayoutButtonContainer}>
          <Button
            title="清除用户"
            onPress={() => NativeModules.GrowingIO.clearUserId()}
          />
          <Button
            title="用户李四"
            onPress={() => NativeModules.GrowingIO.setUserId("lisi")}
          />
        </View>
        <View style={styles.alternativeLayoutButtonContainer}>
          <Button
            title="触发一个埋点事件"
            onPress={event => {
              NativeModules.GrowingIO.track('touch1', {})
            }}
          />
          <TouchableNativeFeedback onPress={this._onPressButton}>
            <Text style={styles.textContainer}>跳转到原生页面</Text>
          </TouchableNativeFeedback>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            // eslint-disable-next-line no-undef
            paddingTop: Platform.OS === 'ios' ? 50 : 10,
          }}>
          <Text style={{fontSize: 25}}>触达开关</Text>
          <Switch
            style={{marginLeft: 30, transform: [{scaleX: 1.3}, {scaleY: 1.3}]}}
            value={this.state.isEnable}
            onValueChange={value => {
              this.setState({
                isEnable: value,
              });
              GrowingTouch.setEventPopupEnable(value);
            }}
          />
        </View> 
        <View style={styles.alternativeLayoutButtonContainer}>
          <Button
            title="注册弹窗监听"
            onPress={event => {
              console.log('注册弹窗监听');
              this.handleEventPopupListener;
            }}
          />
          <Button
            title="注销弹窗监听"
            onPress={event => {
              console.log('注销弹窗监听');
              GrowingTouch.setEventPopupListener(null);
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  textContainer: {
    fontSize:18,
    padding: 5,
    backgroundColor:'#279',
    borderWidth:1,
    borderColor:'#00ff00',
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingTop: 20,
    paddingLeft: 50,
    paddingRight: 50,
    transform: [{scaleX: 1.3}, {scaleY: 1.3}],
  }
})
