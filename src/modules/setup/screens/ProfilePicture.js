import React from 'react';
import {Button, Text, View} from 'react-native';

export default class ProfilePicture extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>This is where you upload your profile pic.</Text>
        <Button title="Next" onPress={this._next } />
      </View>
    );
  }

  _next = () => {
    this.props.navigation.navigate('MatchSetup');
  };
}