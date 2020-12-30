import {createStackNavigator, createSwitchNavigator} from 'react-navigation';

import AuthStackNavigation from './AuthNavigation';
import SetupNavigation from './SetupNavigation';
import MainTabNavigation from './MainTabNavigation';

import AuthPreloader from '../auth/screens/AuthPreloader';

const MainStack = createStackNavigator(
  {
    Home: {screen: MainTabNavigation},
  }
);

const AppNavigator = createSwitchNavigator(
  {
    AuthPreloader: AuthPreloader,
    Auth: AuthStackNavigation,
    Setup: SetupNavigation,
    Main: MainStack,
  },
  {
    initialRouteName: 'AuthPreloader',
  }
);

export default AppNavigator;