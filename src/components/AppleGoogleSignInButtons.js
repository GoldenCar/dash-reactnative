import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import { GoogleSignin } from '@react-native-community/google-signin';
import appleAuth, {
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
} from '@invertase/react-native-apple-authentication';
import { Actions } from 'react-native-router-flux';
import jwt_decode from 'jwt-decode';

import {Google, Apple} from '../components/Icons';

import * as userActions from '../actions/user';

if (Platform.OS === 'android') {
  GoogleSignin.configure({
    webClientId:
      //'942215840003-l4kldjpp92k91f1q07srekvunfpff3qt.apps.googleusercontent.com', // Debug
      '799774940481-vfnnqtmfelum6v08o96r6vdm719qf906.apps.googleusercontent.com', // Live 
    offlineAccess: false,
  });
}

const arrAvatar = [
  require('../res/Face/Face-1.png'),
  require('../res/Face/Face-2.png'),
  require('../res/Face/Face-3.png'),
  require('../res/Face/Face-4.png'),
  require('../res/Face/Face-5.png'),
]

export default class Component extends React.Component {
  createAccount = async ({ userInfo }) => {
    try {
      const { callbackButton } = this.props;
      const res = await userActions.loginGoogleUser({
        id_token: userInfo.idToken,
        username: '',
      });
      if(!res.profileImage || res.profileImage && res.profileImage.slice(0,5) === 'https'){
        await userActions.editUserPicture(res,Image.resolveAssetSource(arrAvatar[Math.floor(Math.random() * arrAvatar.length)]))
      }
      if (callbackButton) {
        callbackButton({ userInfo });
      }
      if (res.username === '') {
        Actions.PickAUsername({
          userInfo,
          callback: () => {
            Actions.pop();
          },
        });
      }
    }catch (e) {
      console.log(e)
    }

  };
  createAccountApple = async (data) => {
    const { callbackButton } = this.props;
    const identityData = jwt_decode(data.identityToken);
    console.log('identity data', identityData);
    // TODO: once server endpoint is fixed, need to remove this

    const email = data.email || identityData.email;
    const username = data.fullName.givenName || '';

    const res = await userActions.loginAppleUser({
      id_token: data.identityToken,
      //username: data.fullName.givenName,
      username: username,
      //email: data.email,
      email: email,
      photo: '',
      kid: data.user,
    });
    if(!res.profileImage){
      await userActions.editUserPicture(res,Image.resolveAssetSource(arrAvatar[Math.floor(Math.random() * arrAvatar.length)]))
    }
    if (callbackButton) {
      callbackButton({ userInfo: data });
    }
  };
  onPressGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log({ userInfo })
      this.createAccount({ userInfo });
    } catch (e) {
      console.log(e.message);
    }
  };
  onAppleButtonPress = async () => {
    try {
      const { callbackButton } = this.props;
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedScopes: [
          AppleAuthRequestScope.EMAIL,
          AppleAuthRequestScope.FULL_NAME,
        ],
      });
      console.log(appleAuthRequestResponse)

      this.createAccountApple(appleAuthRequestResponse);
      if (callbackButton) {
        callbackButton();
      }
    } catch (e) {
      console.log('on apple auth', e);
    }
  };
  render() {
    return Platform.OS === 'ios' ? (
      <TouchableOpacity
        style={styles.appleButtonContainer}
        onPress={this.onAppleButtonPress}>
        <Apple />
        <Text style={styles.signInAppleText}>Sign In With Apple</Text>
      </TouchableOpacity>
    ) : (
        <TouchableOpacity
          style={styles.googleButtonContainer}
          onPress={this.onPressGoogle}>
          <View style={styles.googlePicture}>
            <Google />
          </View>
          <Text style={styles.signInGoogleText}>Sign In With Google</Text>
        </TouchableOpacity>
      );
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

Component.defaultProps = {};
