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
          console.log(res.status);
          if (res.status === 405) {
            console.log("EXPERIENCE RATING FAILED");
            dispatch({ type: actions.ADD_EXPERIENCE_FAIL });
          } else {
            console.log("EXPERIENCE RATING ENDED");
            dispatch({ type: actions.ADD_EXPERIENCE_END });
          }
        })
    );
  };
};
