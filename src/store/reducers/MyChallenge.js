export const actionTypes = {
    SET_MY_CHALLENGE: 'SET_MY_CHALLENGE',
    SET_MY_DAY: 'SET_MY_DAY',
    SET_CURRENT_DAY: 'SET_CURRENT_DAY',
    SET_MY_PLAN: 'SET_MY_PLAN',
    SET_PLAN_DAY_DATA: 'SET_PLAN_DAY_DATA'
};

const initialState = {
    challenge: {},
    day: {},
    currentDay: 0,
    plan: {},
    dayData: []
};

// NOTE: this is a new reducer to mostly hold my challenge and plan data

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
        case 'SET_PLAN_DAY_DATA':
            return {
                ...state,
                dayData: action.payload
            }
        default:
            return state
    }
}
