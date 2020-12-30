import React from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import * as AuthLib from '../../../lib/Auth';

export default class SMSVerify extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      smsVerifyError: '',
      code: '',
      loading: false
    };
  }

  componentWillMount() {
    const verificationId = this.props.navigation.getParam('verificationId', null);
    if (!verificationId) this.props.navigation.navigate('Auth');
  }


  render() {
    const { smsVerifyError, code, loading } = this.state;
    return (
      <View>
        <Text>Verify your SMS code:</Text>
        { smsVerifyError.length > 0 &&
        <Text style={{color: 'red'}}>{smsVerifyError}</Text>
        }
        <TextInput
          autoFocus
          style={{ height: 40, marginTop: 15, marginBottom: 15 }}
          placeholder={'Six-digit code'}
          onChangeText = {(text) => this._updateCode(text)}
          value={code}
        />
        <Button title="Verify" onPress={this._verifyCode} disabled={loading} />
      </View>
    );
  }

  _updateCode = (code) => {
    this.setState({
      code: code
    });
  };

  _verifyCode = () => {
    this.setState({
      loading: true
    });
    const verificationId = this.props.navigation.getParam('verificationId', null);

    AuthLib
      .completePhoneSignIn(verificationId, this.state.code)
      .then((authInfo) => {
        if (authInfo.success) {
          this.props.navigation.navigate('AuthPreloader');
        }
        else {
          this.setState({ smsVerifyError: 'Please try again', loading: false });
        }
      });
  };
}