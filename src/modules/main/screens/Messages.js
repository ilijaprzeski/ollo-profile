import React from 'react';
import { Text, View } from 'react-native';

export default class Messages extends React.Component {
  static navigationOptions = {
    title: 'Messages',
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Messages.</Text>
      </View>
    );
  }
}