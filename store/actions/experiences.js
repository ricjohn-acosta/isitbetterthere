import * as actions from "./types";
import request from "superagent";

export const addExperience = (experience) => {
  return (dispatch) => {
    dispatch({ type: actions.ADD_EXPERIENCE_START });
    return (
      request
        .post(
          process.env.NODE_ENV === "production"
            ? process.env.prod + "/api/experiences"
            : process.env.dev + "/api/experiences"
        )
        .send(experience)
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

export const editExperience = (experience) => {
  return (dispatch) => {
    dispatch({ type: actions.ADD_EXPERIENCE_START });
    return (
      request
        .put(
          process.env.NODE_ENV === "production"
            ? process.env.prod + "/api/experiences"
            : process.env.dev + "/api/experiences"
        )
        .send(experience)
        .then((res) => {
          dispatch({ type: actions.ADD_EXPERIENCE_SUCCESS });
        })
        .catch((res) => {
          console.log(res.status);
          if (res.status === 405) {
            console.log("EXPERIENCE EDIT FLOW FAILED");
            dispatch({ type: actions.ADD_EXPERIENCE_FAIL });
          } else {
            console.log("EXPERIENCE EDIT FLOW ENDED");
            dispatch({ type: actions.ADD_EXPERIENCE_END });
          }
        })
    );
  };
};


export const deleteExperience = (experience) => {
  return (dispatch) => {
    dispatch({ type: actions.ADD_EXPERIENCE_START });
    return (
      request
        .delete(
          process.env.NODE_ENV === "production"
            ? process.env.prod + "/api/experiences"
            : process.env.dev + "/api/experiences"
        )
        .send(experience)
        .then((res) => {
          dispatch({ type: actions.ADD_EXPERIENCE_SUCCESS });
        })
        .catch((res) => {
          console.log(res.status);
          if (res.status === 405) {
            console.log("EXPERIENCE DELETE FLOW FAILED");
            dispatch({ type: actions.ADD_EXPERIENCE_FAIL });
          } else {
            console.log("EXPERIENCE DELETE FLOW ENDED");
            dispatch({ type: actions.ADD_EXPERIENCE_END });
          }
        })
    );
  };
};

export const getExperiences = (from, to) => {
  return (dispatch) => {
    dispatch({ type: actions.GET_EXPERIENCES_START });
    return request
      .get("/api/experiences")
      .query({ from, to })
      .then((res) => {
        console.log("req");
        dispatch({ type: actions.GET_EXPERIENCES_SUCCESS, payload: "test" });
      })
      .catch((res) => {
        console.log(res.status);
        if (res.status === 405) {
          console.log("GET EXPERIENCE FLOW FAILED");
          dispatch({ type: actions.GET_EXPERIENCES_FAIL });
        } else {
          console.log("GET EXPERIENCE FLOW ENDED");
          dispatch({ type: actions.GET_EXPERIENCES_END });
        }
      });
  };
};
