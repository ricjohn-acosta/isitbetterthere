import * as actions from "./types";
import request from "superagent";

export const addReport = (report) => {
  return (dispatch) => {
    dispatch({ type: actions.ADD_EXPERIENCE_START });
    return (
      request
        .post(
          process.env.NODE_ENV === "production"
            ? process.env.prod + "/api/reports"
            : process.env.dev + "/api/reports"
        )
        .send(report)
        .then((res) => {
          dispatch({ type: actions.ADD_EXPERIENCE_SUCCESS });
        })
        .catch((res) => {
          console.log(res.status);
          if (res.status === 405) {
            console.log("EXPERIENCE ADD FLOW FAILED");
            dispatch({ type: actions.ADD_EXPERIENCE_FAIL });
          } else {
            console.log("EXPERIENCE ADD FLOW ENDED");
            dispatch({ type: actions.ADD_EXPERIENCE_END });
          }
        })
    );
  };
};