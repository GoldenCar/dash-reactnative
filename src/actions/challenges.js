import {Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {actionTypes} from 'dash/src/store/reducers/challenges';
import store from 'dash/src/store';
import {api} from '../config';

export const getMyChallenges = async () => {
  const response = await api.post('challengesapiPager', {
    pageLength: 20,
    pageNumber: 1,
  });
  response.data.data.reverse();
  store.dispatch({
    type: actionTypes.SET_CHALLENGES,
    payload: response.data.data,
  });
  return response.data.data;
};

export const getChallenges = async () => {
  const response = await api.get('challengesapi');
  store.dispatch({
    type: actionTypes.GET_CHALLENGES,
    payload: response.data.data,
  });
  return response.data.data;
};

export const postMyChallenge = async (data) => {
  const user = store.getState().user;
  const challenge = {
    createdBy: user._id,
    title: data.title,
    accessType: data.public ? 'public' : 'private',
    description: data.description,
    allStep: 30,
    scheduleDate: 15,
    typeDescription: data.type.description,
    startDate: data.startDate,
    imageFlag: true,
    program: data.typeProgram.number,
  };
  const formData = new FormData();
  for (const key in challenge) {
    formData.append(key, challenge[key]);
  }
  const picture = data.graphic;
  formData.append('challengeBGImage', {
    name: `${new Date().getTime()}.jpg`,
    type: 'image/jpeg',
    uri:
      Platform.OS === 'android'
        ? picture.uri
        : picture.uri.replace('file://', ''),
  });
  formData.append('TypeImage', {
    name: `${new Date().getTime()}.jpg`,
    type: 'image/jpeg',
    uri:
      Platform.OS === 'android'
        ? picture.uri
        : picture.uri.replace('file://', ''),
  });
  const response = await api.post('challengesapi', formData);
  console.log({response})
  store.dispatch({
    type: actionTypes.ADD_CHALLENGE,
    payload: response.data.data,
  });
  return response.data.data;
};
