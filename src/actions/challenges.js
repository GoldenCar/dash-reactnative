import { Platform } from 'react-native';
import axios from 'axios';
import { actionTypes } from 'dash/src/store/reducers/challenges';
import store from 'dash/src/store';
import { api, host } from '../config';

// TODO - ASAP: convert all this to /challenges api

export const getAllChallenges = async () => {
  api.defaults.baseURL = "https://www.dashchallengesapi.com/";

  try {
    const response = await api.get('challenges');

    if (response.status !== 200) {
      return [];
    }

    store.dispatch({
      type: actionTypes.SET_CHALLENGES,
      payload: response.data
    });

    return response.data.reverse();
  } catch (e) {
    console.log('get all challenges', e);
    return undefined;
  }
}

export const postMyChallenge = async (data) => {

  console.log("postMyChallenge-----> ", data);

  const user = store.getState().user;
  const picture = data.graphic;
  const formData = new FormData();

  // TODO: these all need to be cleaned up (casing and data types)

  formData.append('createdBy', user._id);
  formData.append('title', data.title);
  formData.append('accessType', data.public ? 'public' : 'private');
  formData.append('description', data.description);
  formData.append('startDate', data.startDate);
  formData.append('allStep', 30);
  formData.append('scheduleDate', '30 days');
  formData.append('typeDescription', data.type.description);
  formData.append('Version', data.version);
  formData.append('imageFlag', false);
  formData.append('Plan', data.type.title);
  formData.append('ActiveDate', data.startDate);
  formData.append('PlanID', data.type._id);
  //formData.append('Featured',"No");
  //formData.append('program', data.typeProgram.number);

  //formData.append('',);

  formData.append('challengeBGImage', {
    name: `${new Date().getTime()}.jpg`,
    type: 'image/jpeg',
    uri:
      Platform.OS === 'android'
        ? String(picture.uri)
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

  console.log(" form data ==================================", formData);

  // TODO: use api instead
  return axios({
    method: 'post',
    url: host + "/challengesapi",
    data: formData
    //headers: headers,
  })
    .then(response => {
      console.log("126 Response --- =======-----", response);
      store.dispatch({
        type: actionTypes.ADD_CHALLENGE,
        payload: response.data.data,
      });
      return response.data.data;
    }).catch(err => {
      console.log(" error is ", err);
    })
};

export const editChallenge = async (data) => {
  const formData = new FormData();
  formData.append('editID', data._id);
  formData.append('joinedUsers', data.joinedUsers);

  // TODO: use api instead
  return axios({
    method: 'patch',
    url: host + "/challengesapi",
    data: formData
  })
    .then(response => {
      console.log("EDIT CHALLENGE", response);
      // store.dispatch({
      //   type: actionTypes.ADD_CHALLENGE,
      //   payload: response.data.data,
      // });
      return response.data.data;
    }).catch(err => {
      console.log(" error is ", err);
    })
}
