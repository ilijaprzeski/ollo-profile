import React, { Component } from 'react';
import AppNavigator from './src/modules/navigation/AppNavigator';
import { createAppContainer } from 'react-navigation';

import { ApolloProvider } from 'react-apollo';
import ApolloClientProvider from './src/lib/ApolloClientProvider';

const client = ApolloClientProvider.client;

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return <ApolloProvider client={client}><AppContainer /></ApolloProvider>;
  }
}