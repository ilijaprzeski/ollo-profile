import {createStackNavigator} from 'react-navigation';

import GetStarted from '../auth/screens/GetStarted';
import PhoneCapture from '../auth/screens/PhoneCapture';
import SMSVerify from '../auth/screens/SMSVerify';

const AuthStack = createStackNavigator(
  {
    GetStarted: GetStarted,
    PhoneCapture: PhoneCapture,
    SMSVerify: SMSVerify
  },
  {
    initialRouteName: 'GetStarted'
  }
);

export default AuthStack;