import {createStackNavigator} from 'react-navigation';

import NameDetails from '../setup/screens/NameDetails';
import ProfilePicture from '../setup/screens/ProfilePicture';
import MatchDetails from '../setup/screens/MatchDetails';

const SetupStack = createStackNavigator(
  {
    NameSetup: NameDetails,
    ProfilePicSetup: ProfilePicture,
    MatchSetup: MatchDetails
  },
  {
    initialRouteName: 'NameSetup'
  }
);

export default SetupStack;