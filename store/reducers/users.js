import * as actions from "../actions/types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  error: null,
  loading: false,
};

// ADD USER
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

export const userStore = (state = initialState, { type, payload }) => {
  switch (type) {
    case STORE_USER_DATA:
      return {
        ...state,
        user: payload
      }
    default:
      return state
  }
}

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
