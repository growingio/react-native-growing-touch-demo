import React, { Component } from 'react';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Bananas extends Component {
  state = {
    isShow: true,
  }

  handleChange = () => {
    this.setState({isShow: !this.state.isShow})
  }

  render() {
    let pic = {
      uri: this.state.isShow
        ? 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
        : 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/120px-Red_Apple.jpg',
    };
    // eslint-disable-next-line react-native/no-inline-styles
    return (
      <TouchableOpacity onPress={this.handleChange}>
      <Image
        source={pic}
        style={{
          width: 371,
          height: 230,
          margin: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      />
    </TouchableOpacity>
    );
  }
}


