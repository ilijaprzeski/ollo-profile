import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import * as SecureStore from './SecureStore';

const httpLink = new HttpLink({ uri: 'https://apollo-ollo-server.appspot.com' });

// local url: http://localhost:4000/
// public url: https://apollo-ollo-server.appspot.com

const authLink = setContext(async (req, { headers }) => {
  const token = await SecureStore.getUserToken();

  return {
    headers: {
      ...headers,
      authorization: token || ''
    },
  };
});

class ApolloClientProvider {
  constructor() {
    this.client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  }
}

export default new ApolloClientProvider();