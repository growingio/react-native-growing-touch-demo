import React, {Component} from 'react';
import { Alert, Button, StyleSheet, View, Text } from 'react-native';
import Bananas from './components/Bananas';
import Toast from './utils/Toast';

export default class DetailsScreen extends Component {
  _onPressButton() {
    Alert.alert('You tapped the button!');
  }
  
  // _onPressToast() {
  //   Toast.showSuccess({JSON.stringify(navigation.getParam('itemId', 'NO-ID'))});
  // }
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
         <Text style={styles.alternativeLayoutButtonContainer}>
            keygen: {JSON.stringify(navigation.getParam('keygen', 'NO-ID'))}
            otherParam: {JSON.stringify(navigation.getParam('otherParam', 'default value'))}
          </Text>
        <Bananas style={styles.container}/>
        <View style={styles.alternativeLayoutButtonContainer}>
          <Button
            color="#841584"
            title="回首页"
            onPress={() => this.props.navigation.navigate('Home')}
          />
          <Button
            title="返回"
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
              onPress={this._onPressButton}
              title="点我啊" />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this._onPressToast}
            title="查看参数"
            color="#841584"
          />
        </View>
        <View style={styles.alternativeLayoutButtonContainer}>
          <Button onPress={this._onPressButton} title="This looks great!" />
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
    justifyContent: 'space-between',
  }
})