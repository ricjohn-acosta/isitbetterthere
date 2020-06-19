
import * as actions from "./types";
import request from "superagent";

export const addExperience = (experience) => {
  return (dispatch) => {
    dispatch({ type: actions.ADD_EXPERIENCE_START });
    return request
      .post(process.env.EXPERIENCE_API || "http://localhost:3000/api/experiences")
      .send(experience)
      .then((res) => {
        dispatch({ type: actions.ADD_EXPERIENCE_SUCCESS });
      })
      .catch((res) => {
        console.log(res.status)
        if (res.status === 405) {
          console.log("EXPERIENCE ADD FLOW FAILED")
          dispatch({ type: actions.ADD_EXPERIENCE_FAIL });
        } else {
          console.log("EXPERIENCE ADD FLOW ENDED")
          dispatch({ type: actions.ADD_EXPERIENCE_END });
        }
      });
  };
};


