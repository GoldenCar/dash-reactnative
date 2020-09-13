import { Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { GoogleSignin } from '@react-native-community/google-signin';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import { actionTypes } from 'dash/src/store/reducers/user';
import store from 'dash/src/store';

import { api } from '../config';

import { getMyChallenges } from './challenges';

export const getUserById = async (id) => {
  const response = await api.get(`userapi/${id}`);
  return response.data.data;
};

export const getUser = async () => {
  const response = await api.get(`userapi`);
  return response.data.data;
};

export const editUserPicture = async (data, picture) => {
  console.log(data, picture)
  try {
    const user = _.cloneDeep(data);
    var form_data = new FormData();
    form_data.append('picture', {
      name: `${new Date().getTime()}.jpg`,
      type: 'image/jpeg',
      uri:
        Platform.OS === 'android'
          ? picture.uri
          : picture.uri.replace('file://', ''),
    });
    form_data.append('editUserID', user._id);
    const response = await api.patch('userapi', form_data);
    store.dispatch({
      type: actionTypes.SET_USER,
      payload: response.data.data,
    });
    AsyncStorage.setItem('@user', JSON.stringify(response.data.data));
    return response.data.data;
  } catch (e) {
    console.log(e)
  }
};

export const editUser = async (data) => {
  data.editUserID = data._id;
  const response = await api.patch('userapi', data);
  store.dispatch({
    type: actionTypes.SET_USER,
    payload: response.data.data,
  });
  AsyncStorage.setItem('@user', JSON.stringify(response.data.data));
  return response.data.data;
};

export const loginGoogleUser = async ({ id_token, username }) => {
  try {
    const response = await api.post('addGoogleUser', {
      id_token,
      username,
    });

    console.log(" id_token ------", id_token, " user name ======", username);

    api.defaults.headers.common.Authorization = `Bearer ${response.data.user_token}`;
    AsyncStorage.setItem('@user', JSON.stringify(response.data.data));
    AsyncStorage.setItem('@token', `Bearer ${response.data.user_token}`);
    store.dispatch({
      type: actionTypes.SET_USER,
      payload: response.data.data,
    });
    getMyChallenges();
    return response.data.data;
  } catch (e) {
    console.log(e)
  }

};

export const loginAppleUser = async (data) => {
  const response = await api.post('addAppleUser', data);
  api.defaults.headers.common.Authorization = `Bearer ${response.data.user_token}`;
  AsyncStorage.setItem('@user', JSON.stringify(response.data.data));
  AsyncStorage.setItem('@token', `Bearer ${response.data.user_token}`);
  store.dispatch({
    type: actionTypes.SET_USER,
    payload: response.data.data,
  });
  getMyChallenges();
  return response.data.data;
};

export const setUser = (payload) => {
  store.dispatch({
    type: actionTypes.SET_USER,
    payload,
  });
};

export const getCurrentUser = async () => {
  const response = await api.get('getCurrentUser');
  setUser(response.data.data);
};

export const logout = async () => {
  delete api.defaults.headers.common.Authorization;
  AsyncStorage.clear();
  const isSignedIn = await GoogleSignin.isSignedIn();
  if (isSignedIn) {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  }
  store.dispatch({
    type: actionTypes.DEFAULT,
  });
  Actions.MyChallenge();
};

/*

FRIENDS

*/

export const sendFriendInvite = async (id) => {
  const response = await api.post(`sendFriendInvite`, {}, {
    headers: {
      friendid: id
    }
  });

  console.log(response)
  await getCurrentUser();

  return response.data.data;
};

export const removeFriend = async (id) => {
  await api.delete(`delFriend`, {
    headers: {
      friendid: id
    }
  });

  await getCurrentUser();
};

export const sendFriendAccept = async (id, status) => {
  const res = await api.post(`receiveFriendInvite`, {}, {
    headers: {
      friendid: id,
      status: status
    }
  });

  console.log(res)

  await getCurrentUser();
};

/*

CHALLENGE

*/

export const joinChallenge = async (challenge_id, user_id) => {
  const URL = `/challengesapi/${challenge_id}/join`;

  const response = await api.post(URL, {
    user_id: user_id
  });

  return response;
};

export const leaveChallenge = async (challenge_id, user_id) => {
  const URL = `/challengesapi/${challenge_id}/leave`;

  const response = await api.post(URL, {
    user_id: user_id
  });

  return response;
};

export const setDayCompleted = async (challenge_id, user_id, dayIndex) => {
  const URL = `/challengesapi/${challenge_id}/complete`;

  const response = await api.post(URL, {
    user_id: user_id,
    day: dayIndex
  });

  return response;
};
