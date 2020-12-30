import React from 'react';
import * as SecureStore from '../../../lib/SecureStore';
import {Button, View} from 'react-native';

export default class GetStarted extends React.Component {
  componentWillMount() {
    SecureStore
      .getPhoneNumber()
      .then((phoneNumber) => {
        if (phoneNumber) this.props.navigation.navigate('PhoneCapture');
      });
  }

  render() {
    return (
      <View>
        <Button title="Get Started" onPress={this._getStarted} />
      </View>
    );
  }

  _getStarted = () => {
    this.props.navigation.navigate('PhoneCapture');
  };
}