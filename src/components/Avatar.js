import React from 'react';
import { View, Image, TouchableHighlight, StyleSheet } from 'react-native';

const profilePic = require('../../assets/images/avatar.png');

const styles = StyleSheet.create({
  avatarContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
});

export default class Avatar extends React.Component {
  _onPress = () => {
    console.log('avatar onpress');
    this.props.navigation.navigate('Profile');
  };

  render() {
    return (
      <View style={styles.avatarContainer}>
        <TouchableHighlight onPress={this._onPress} style={styles.avatar}>
          <Image
            resizeMode='center'
            source={profilePic}
            style={styles.avatar}
          />
        </TouchableHighlight>
      </View>
    );
  }
}