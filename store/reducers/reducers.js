// import { combineReducers } from 'redux'
// import * as types from '../actions/types'

// // COUNTER REDUCER
// const counterReducer = (state = 0, { type }) => {
//   switch (type) {
//     case types.INCREMENT:
//       return state + 1
//     case types.DECREMENT:
//       return state - 1
//     case types.RESET:
//       return 0
//     default:
//       return state
//   }
// }

// // INITIAL TIMER STATE
// const initialTimerState = {
//   lastUpdate: 0,
//   light: false,
// }

// // TIMER REDUCER
// const timerReducer = (state = initialTimerState, { type, payload }) => {
//   switch (type) {
//     case types.TICK:
//       return {
//         lastUpdate: payload.ts,
//         light: !!payload.light,
//       }
//     default:
//       return state
//   }
// }

// // COMBINED REDUCERS
// const reducers = {
//   counter: counterReducer,
//   timer: timerReducer,
// }

// export default combineReducers(reducers)

import * as actions from "../actions/types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  error: null,
  loading: false,
};

const addUserStart = (state) => {
  return {
    ...state,
    loading: true,
  };
};

const addUserSuccess = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      loading: false,
      ...action.payload,
    };
    return nextState;
  } else {
    return {
      ...state,
      loading: false,
    };
  }
};

const addUserFail = (state, payload) => {
  return {
    ...state,
    loading: false,
    error: payload,
  };
};

const addUserEnd = (state) => {
  return {
    ...state,
    loading: false,
  };
};

export default (state = initialState, { type, payload }, action) => {
  switch (type) {
    case actions.ADD_USER_START:
      return addUserStart(state);

    case actions.ADD_USER_SUCCESS:
      return addUserSuccess(state);

    case actions.ADD_USER_FAIL:
      return addUserFail(state, payload);

    case actions.ADD_USER_END:
      return addUserEnd(state, payload);

    default:
      return state;
  }
};
