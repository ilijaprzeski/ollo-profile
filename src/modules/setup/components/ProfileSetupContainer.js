import React from 'react';
import { Text } from 'react-native';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const user_profile = gql`
  query userProfile {
    profile {
      name,
      birthDate,
      userId
    }
  }
`;

export default class ProfileSetupContainer extends React.Component {
  render() {
    return (
      <Query query={user_profile} fetchPolicy="network-only">
        {
          result => {
            const { loading, error, data } = result;

            if (loading) {
              return <Text>Loading...</Text>;
            }
            if (error) {
              console.log(error);
              return <Text>Error</Text>;
            }
            if (data) {
              return React.cloneElement(this.props.children, { profile: data.profile });
            }
          }
        }
    </Query>
    )
  }
}