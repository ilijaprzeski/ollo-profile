import React from 'react';
import * as AuthLib from '../../../lib/Auth';
import * as ProfileLib from '../../../lib/Profile';
import { ActivityIndicator, StatusBar, View } from 'react-native';

export default class AuthPreloader extends React.Component {
  constructor(props) {
    super(props);

    AuthLib.loadUser().then((user) => {
      if (user) {
        ProfileLib.isSetupComplete().then((result) => {
          this.props.navigation.navigate(result ? 'Main' : 'Setup');
        });
      }
      else {
        this.props.navigation.navigate('Auth');
      }
    }).catch(() => {
      this.props.navigation.navigate('Auth');
    });
  }

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}