import React from 'react';
import * as AuthLib from '../../../lib/Auth';
import * as SecureStore from '../../../lib/SecureStore';
import PhoneVerifyState from '../../../lib/PhoneVerifyState';
import {Text, TextInput, Button, View} from 'react-native';

export default class PhoneCapture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneVerifyError: '',
      phoneNumber: '',
      loading: false
    };
  }

  componentWillMount() {
    SecureStore.getPhoneNumber().then((phoneNumber) => this.setState({ phoneNumber: phoneNumber}));
  }

  render() {
    const { phoneVerifyError, phoneNumber, loading } = this.state;
    return (
      <View>
        <Text>Enter your mobile phone number:</Text>
        { phoneVerifyError.length > 0 &&
          <Text style={{color: 'red'}}>{phoneVerifyError}</Text>
        }
        <TextInput
          autoFocus
          style={{ height: 40, marginTop: 15, marginBottom: 15 }}
          placeholder={'Phone number ... '}
          onChangeText = {(text) => this._updatePhoneNumber(text)}
          value={phoneNumber}
        />
        <Button title="Verify" onPress={this._verifyPhone} disabled={loading}/>
      </View>
    );
  }

  _updatePhoneNumber = (phoneNumber) => {
    this.setState({
      phoneNumber: phoneNumber
    });
  };

  _verifyPhone = () => {
    this.setState({
      loading: true
    });
    SecureStore
      .setPhoneNumber(this.state.phoneNumber)
      .then(() => {
        AuthLib
          .verifyPhoneNumber()
          .then((status) => {
            switch (status.status) {
              case PhoneVerifyState.Invalid:
                this.setState({ phoneVerifyError: status.message, loading: false });
                break;
              case PhoneVerifyState.VerifySMSCode:
                this.props.navigation.navigate('SMSVerify', { verificationId: status.verificationId });
                break;
              case PhoneVerifyState.Verified:
                this.props.navigation.navigate('AuthPreloader');
                break;
              default:
                return;
            }
          });
      });
  };
}