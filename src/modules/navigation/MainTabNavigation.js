import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';

import HomeScreen from '../main/screens/Home';
import ExploreScreen from '../main/screens/Explore';
import MessagesScreen from '../main/screens/Messages';
import ProfileScreen from '../main/screens/Profile';

import LogoTitle from '../../components/LogoTitle';
import Icon from '../../components/Icon';
import Avatar from '../../components/Avatar';
import QuickCheckin from '../../components/QuickCheckin';


export default createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Explore: {
      screen: ExploreScreen
    },
    Messages: {
      screen: MessagesScreen
    },
    Profile: {
      screen: ProfileScreen
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        return (
          <Icon name={routeName.toLowerCase()} active={focused} />
        );
      },
    }),
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: <Avatar navigation={navigation} />,
        headerTitle: <LogoTitle/>,
        headerRight: <QuickCheckin />,
      };
    },
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: false,
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0.5,
        borderTopColor: '#d6d6d6',
      },
    },
  },
);
