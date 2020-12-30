import React from 'react';
import {View, Image, TouchableHighlight, StyleSheet, Text, Button} from 'react-native';
import Icon from './Icon';
import Modal from "react-native-modal";

const styles = StyleSheet.create({
  quickCheckinContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  quickCheckIn: {
    width: 24,
    height: 24,
  },
  content: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    height: 300,
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
});

export default class QuickCheckin extends React.Component {
  state = {
    isModalVisible: false
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {
    return (
      <View style={styles.quickCheckinContainer}>
        <TouchableHighlight underlayColor={'transparent'} onPress={this.toggleModal} style={styles.quickCheckIn}>
          <Icon name={'checkin'} />
        </TouchableHighlight>
        <Modal isVisible={this.state.isModalVisible}>
          <View style={styles.content}>
            <Text style={styles.contentTitle}>Check In</Text>
            <Button
              onPress={this.toggleModal}
              title="Close"
            />
          </View>
        </Modal>
      </View>
    );
  }
}