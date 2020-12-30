import React from 'react';

import ProfileSetupContainer from '../components/ProfileSetupContainer';
import EditName from '../components/EditName';

export default class NameDetails extends React.Component {
  render() {
    return (
      <ProfileSetupContainer>
        <EditName
          navigation={this.props.navigation}
        />
      </ProfileSetupContainer>
    );
  }
}