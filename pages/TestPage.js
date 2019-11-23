import React, {Component} from 'react';
import {Alert, Button, StyleSheet, View} from 'react-native';
import Bananas from './components/Bananas';
import BlinkApp from './components/BlinkApp';

export default class TestPage extends Component {
  _onPressButton() {
    Alert.alert('You tapped the button!');
  }
  render() {
    return (
      <View style={styles.container}>
      <View style={styles.alternativeLayoutButtonContainer}>
          <Button
            title="返回第一个页面"
            color="#841584"
            onPress={() => this.props.navigation.popToTop()}
          />
          <Button title="返回" onPress={() => this.props.navigation.goBack()} />
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={this._onPressButton} title="Press Me" />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this._onPressButton}
            title="Press Me"
            color="#841584"
          />
        </View>
        <View style={styles.alternativeLayoutButtonContainer}>
          <Button onPress={this._onPressButton} title="This  looks!" />
          <Button onPress={this._onPressButton} title="OK!" color="#841584" />
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
  buttonContainer: {
    margin: 20,
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})