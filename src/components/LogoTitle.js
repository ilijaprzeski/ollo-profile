import React from 'react';
import { Image } from 'react-native';

const logo = require('../../assets/images/logo-header.png');

export default class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={logo}
        style={{ width: 60, height: 32 }}
      />
    );
  }
}