export const actionTypes = {
    SET_MY_CHALLENGE: 'SET_MY_CHALLENGE',
    SET_MY_DAY: 'SET_MY_DAY',
    SET_CURRENT_DAY: 'SET_CURRENT_DAY',
    SET_MY_PLAN: 'SET_MY_PLAN'
};

const initialState = {
    challenge: {},
    day: {},
    currentDay: {},
    plan: {}
};

// NOTE: this is a new reducer to mostly hold my challenge data

export default function (state = initialState, action) {
    switch (action.type) {
        case 'SET_MY_CHALLENGE':
            return {
                ...state,
                challenge: action.payload
            }
        case 'SET_MY_DAY':
            return {
                ...state,
                day: action.payload
            }
        case 'SET_CURRENT_DAY':
            return {
                ...state,
                currentDay: action.payload
            }
        case 'SET_MY_PLAN':
            return {
                ...state,
                plan: action.payload
            }
        default:
            return state
    }
}

/*

  const onStartPress = () => Actions.TaskOverview({
    challenge: challenge,
    user: user,
    day: day,
    currentDay: currentDay,
    plan: plan
  });

*/


// pages - TaskOverview (challenge: challenge, user: user, day: day, currentDay: currentDay, plan: plan)

// pages - PlanOVerview ( challenge, plan, daysCompleted )

// page - Workout (data: stories, currentDay, user, challenge, plan, day)

/*

import {connect} from 'react-redux';

export default connect(({user}) => ({
  user,
}))(Component);

*/