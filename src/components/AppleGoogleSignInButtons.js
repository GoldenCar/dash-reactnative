import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Google, Apple } from '../components/Icons';
import { requestAppleLogin, requestGoogleLogin } from '../helpers/auth';

export default class Component extends React.Component {
  onGoogleSignIn = async () => {
    const response = await requestGoogleLogin();

    const { callback } = this.props;
    if (callback) {
      callback(response);
    }
  };

  onAppleSignIn = async () => {
    const response = await requestAppleLogin();

    const { callback } = this.props;
    if (callback) {
      callback(response);
    }
  };

  render() {
    return Platform.OS === 'ios' ? (
      <TouchableOpacity
        style={styles.appleButtonContainer}
        onPress={this.onAppleSignIn}>
        <Apple />
        <Text style={styles.signInAppleText}>Sign In With Apple</Text>
      </TouchableOpacity>
    ) : (
        <TouchableOpacity
          style={styles.googleButtonContainer}
          onPress={this.onGoogleSignIn}>
          <View style={styles.googlePicture}>
            <Google />
          </View>
          <Text style={styles.signInGoogleText}>Sign In With Google</Text>
        </TouchableOpacity>
      )
  }
}

const styles = StyleSheet.create({
  googlePicture: {
    position: 'absolute',
    left: 10,
  },
  signInGoogleText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: 'white',
    lineHeight: 20,
    marginLeft: 20,
  },
  googleButtonContainer: {
    backgroundColor: '#4286F5',
    paddingVertical: 25,
    paddingHorizontal: 60,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 60,
    marginTop: 15,
  },
  signInAppleText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: 'white',
    marginLeft: 15,
    lineHeight: 20,
    marginTop: 5,
  },
  appleButtonContainer: {
    backgroundColor: 'black',
    paddingVertical: 25,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 60,
    marginTop: 15,
  },
});
