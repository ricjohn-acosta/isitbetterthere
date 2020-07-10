import * as actions from "./types";
import request from "superagent";

export const addUser = (user) => {
  return (dispatch) => {
    dispatch({ type: actions.ADD_USER_START });
    return (
      request
        .post(
          process.env.NODE_ENV === "production"
            ? process.env.prod + "/api/users"
            : process.env.dev + "/api/users"
        )
        .send(user)
        .then((res) => {
          dispatch({ type: actions.ADD_USER_SUCCESS });
        })
        .catch((res) => {
          console.log(res.status);
          if (res.status === 405) {
            console.log("USER ADD FLOW FAILED");
            dispatch({ type: actions.ADD_USER_FAIL });
          } else {
            console.log("USER ADD FLOW ENDED");
            dispatch({ type: actions.ADD_USER_END });
          }
        })
    );
  };
};

export const editUser = (userData) => {
  return (dispatch) => {
    dispatch({ type: actions.ADD_USER_START });
    return (
      request
        .put(
          process.env.NODE_ENV === "production"
            ? process.env.prod + "/api/users"
            : process.env.dev + "/api/users"
        )
        .send(userData)
        .then((res) => {
          dispatch({ type: actions.ADD_USER_SUCCESS });
        })
        .catch((res) => {
          console.log(res.status);
          if (res.status === 405) {
            console.log("USER EDIT FLOW FAILED");
            dispatch({ type: actions.ADD_USER_FAIL });
          } else {
            console.log("USER EDIT FLOW ENDED");
            dispatch({ type: actions.ADD_USER_END });
          }
        })
    );
  };
};
