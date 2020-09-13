import { actionTypes } from 'dash/src/store/reducers/MyChallenge';
import store from 'dash/src/store';

export const setMyChallenge = (payload) => {
  store.dispatch({
    type: actionTypes.SET_MY_CHALLENGE,
    payload
  });
};

export const setMyDay = (payload) => {
  store.dispatch({
    type: actionTypes.SET_MY_DAY,
    payload
  });
}

export const setCurrentDay = (payload) => {
  store.dispatch({
    type: actionTypes.SET_CURRENT_DAY,
    payload
  });
}

export const setMyPlan = (payload) => {
  store.dispatch({
    type: actionTypes.SET_MY_PLAN,
    payload
  });
}

export const setPlanDayData = (payload) => {
  store.dispatch({
    type: actionTypes.SET_PLAN_DAY_DATA,
    payload
  });
}
