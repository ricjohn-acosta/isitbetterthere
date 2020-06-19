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


// ADD EXPERIENCE
const addExperienceStart = (state) => {
  return {
    ...state,
    loading: true,
  };
};

const addExperienceSuccess = (state, action) => {
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

const addExperienceFail = (state, payload) => {
  return {
    ...state,
    loading: false,
    error: payload,
  };
};

const addExperienceEnd = (state) => {
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

    case actions.ADD_EXPERIENCE_START:
      return addExperienceStart(state);

    case actions.ADD_EXPERIENCE_SUCCESS:
      return addExperienceSuccess(state);

    case actions.ADD_EXPERIENCE_FAIL:
      return addExperienceFail(state, payload);

    case actions.ADD_EXPERIENCE_END:
      return addExperienceEnd(state, payload);

    default:
      return state;
  }
};
