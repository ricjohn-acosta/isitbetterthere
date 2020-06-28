import * as actions from "./types";
import request from "superagent";

export const addUser = (user) => {
  return (dispatch) => {
    dispatch({ type: actions.ADD_USER_START });
    return (
      request
        // .post(process.env.USER_API || "http://localhost:3000/api/users")
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
