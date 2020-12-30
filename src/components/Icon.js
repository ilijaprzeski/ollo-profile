import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const icons = {
  checkin  :  require('../../assets/images/icons/icon-checkin.png'),
  explore  :  require('../../assets/images/icons/icon-explore.png'),
  home     :  require('../../assets/images/icons/icon-home.png'),
  messages :  require('../../assets/images/icons/icon-messages.png'),
  profile  :  require('../../assets/images/icons/icon-profile.png')
};

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  iconActive: {
    tintColor: '#45C6FF',
  },
});

export default class Icon extends React.Component {
  render() {
    return (
      <View style={styles.iconContainer}>
        <Image
          resizeMode='center'
          source={icons[this.props.name]}
          style={[styles.icon, this.props.active && styles.iconActive]}
        />
      </View>
    );
  }
}