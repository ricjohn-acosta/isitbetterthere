import * as actions from "./types";
import request from "superagent";

export const rateExperience = (experience) => {
  return (dispatch) => {
    dispatch({ type: actions.ADD_EXPERIENCE_START });
    return (
      request
        .put(
          process.env.NODE_ENV === "production"
            ? process.env.prod + "/api/ratings"
            : process.env.dev + "/api/ratings"
        )
        .send(experience)
        .then((res) => {
          dispatch({ type: actions.ADD_EXPERIENCE_SUCCESS });
        })
        .catch((res) => {
          if (res.status === 405) {
            dispatch({ type: actions.ADD_EXPERIENCE_FAIL });
          } else {
            dispatch({ type: actions.ADD_EXPERIENCE_END });
          }
        })
    );
  };
};
