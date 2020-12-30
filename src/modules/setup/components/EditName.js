import React from 'react';
import { Text, TextInput, View } from 'react-native';
import ProfileUpdateNext from './ProfileUpdateNext';

export default class EditName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        name: this.props.profile.name,
        birthDate: this.props.profile.birthDate
      },
      error: null
    };
  }
  _updateName = (name) => {
    this.setState({...this.state, fields: { name: name, birthDate: this.state.fields.birthDate }});
  };

  _updateBirthDate = (birthDate) => {
    this.setState({...this.state, fields: { name: this.state.fields.name, birthDate: birthDate }});
  };

  _onError = (error) => {
    console.log(error);
    this.setState({...this.state, error: error});
  };

  render() {
    return(
      <View>
        { this.state.error &&
          <Text>Error, please try again.</Text>
        }
        <Text>First Name</Text>
        <TextInput
          autoFocus
          style={{ height: 40, width: 100, marginTop: 15, marginBottom: 15 }}
          placeholder={'First name'}
          onChangeText = {(text) => this._updateName(text)}
          value={this.state.fields.name}
        />
        <Text>This is the name others will see.</Text>
        <Text style={{ marginTop: 20 }}>Birthday</Text>
        <TextInput
          autoFocus
          style={{ height: 40, width: 100, marginTop: 15, marginBottom: 15 }}
          placeholder={'Birthday'}
          onChangeText = {(text) => this._updateBirthDate(text)}
          value={this.state.fields.birthDate}
        />
        <ProfileUpdateNext
          title={'Next'}
          userId={this.props.profile.userId}
          fields={this.state.fields}
          navigation={this.props.navigation}
          navigateTo={'ProfilePicSetup'}
          onError={this._onError}
        />
      </View>
    )
  }
}

