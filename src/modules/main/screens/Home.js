import React from 'react';
import { View, Button } from 'react-native';
import * as AuthLib from '../../../lib/Auth';

export default class Home extends React.Component {
  render() {
    return (
      <View>
        <Button title="Show me more of the app" onPress={this._showMoreApp} />
        <Button title="Actually, sign me out" onPress={this._signOut } />
      </View>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate('Other');
  };

  _signOut = () => {
    AuthLib.signOut().then(() => this.props.navigation.navigate('Auth'));
  };
}