import React from 'react';
import {Button, Text, View} from 'react-native';

export default class MatchDetails extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>This is where you tell us who you're into.</Text>
        <Button title="Next" onPress={this._next } />
      </View>
    );
  }

  _next = () => {
    this.props.navigation.navigate('Main');
  };
}