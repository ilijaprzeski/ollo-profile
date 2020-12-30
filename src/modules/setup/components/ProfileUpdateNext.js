import React from 'react';
import { Button, Text } from 'react-native';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const update_profile = gql`
  mutation updateProfileWrapper($userId: String!, $fields: ProfileUpdateRequest!){
    updateProfile(userId: $userId, fields: $fields) {
      id
    }
  }
`;

export default class ProfileUpdateNext extends React.Component {
  render() {
    const queryParams = {
      userId : this.props.userId,
      fields : this.props.fields
    };

    return (
      <Mutation
        mutation={update_profile}
        variables={queryParams}
        onError={this.props.onError}
        onCompleted={() => {this.props.navigation.navigate(this.props.navigateTo)}}
      >
        {(updateProfile, result) => {
          const { loading, error } = result;
          if (error) {
            console.log(error);
          }
          if (loading) {
            return <Button title={this.props.title} disabled={true} onPress={updateProfile}/>;
          }
          else {
            return <Button title={this.props.title} onPress={updateProfile}/>;
          }
        }}
      </Mutation>
    );
  }
}


