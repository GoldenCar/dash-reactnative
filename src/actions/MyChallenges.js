import { actionTypes } from 'dash/src/store/reducers/MyChallenge';
import store from 'dash/src/store';

export const setMyChallenge = async (payload) => {
  store.dispatch({
    type: actionTypes.SET_MY_CHALLENGE,
    payload
  });
};

export const setMyDay = async (payload) => {
  store.dispatch({
    type: actionTypes.SET_MY_DAY,
    payload
  });
}

export const setCurrentDay = async (payload) => {
  store.dispatch({
    type: actionTypes.SET_CURRENT_DAY,
    payload
  });
}

export const setMyPlan = async (payload) => {
  store.dispatch({
    type: actionTypes.SET_MY_PLAN,
    payload
  });
}
