import * as actions from "./types";
import request from "superagent";
import {axiosAddExperience} from "../../pages/api/experiences/createNew";
import {axiosRateHelpfulExperience} from "../../pages/api/experiences/rateHelpful";
import {axiosRateUnhelpfulExperience} from "../../pages/api/experiences/rateUnhelpful";
import {axiosReportExperience} from "../../pages/api/experiences/report";
import {getTransitionExperiencesCount} from "../../server/models/experiences";
import {axiosGetTransitionExperiencesCount} from "../../pages/api/experiences/getTotalExperienceCount";

export const addExperience = (formData) => {
    return async () => {
        return await axiosAddExperience(formData)
    }
}

export const reportExperience = (report) => {
    return async () => {
        return await axiosReportExperience(report)
    }
}

export const rateExperienceHelpful = (data) => {
    return async () => {
        return await axiosRateHelpfulExperience(data)
    }
}

export const rateExperienceUnhelpful = (data) => {
    return async () => {
        return await axiosRateUnhelpfulExperience(data)
    }
}

export const getTotalNumberOfExperiences = () => {
    return async () => {
        return await axiosGetTransitionExperiencesCount()
    }
}



export const UPDATE_TOTAL_NUM_OF_EXPERIENCES = 'UPDATE_TOTAL_NUM_OF_EXPERIENCES'
export const updateTotalNumOfExperiences = (num) => (dispatch) => {
    dispatch({
        type: UPDATE_TOTAL_NUM_OF_EXPERIENCES,
        payload: num
    })
}

export const editExperience = (experience) => {
    return (dispatch) => {
        dispatch({type: actions.ADD_EXPERIENCE_START});
        return request
            .put(
                process.env.NODE_ENV === "production"
                    ? process.env.prod + "/api/experiences"
                    : process.env.dev + "/api/experiences"
            )
            .send(experience)
            .then((res) => {
                dispatch({type: actions.ADD_EXPERIENCE_SUCCESS});
            })
            .catch((res) => {
                console.log(res.status);
                if (res.status === 405) {
                    console.log("EXPERIENCE EDIT FLOW FAILED");
                    dispatch({type: actions.ADD_EXPERIENCE_FAIL});
                } else {
                    console.log("EXPERIENCE EDIT FLOW ENDED");
                    dispatch({type: actions.ADD_EXPERIENCE_END});
                }
            });
    };
};

export const deleteExperience = (experience) => {
    return (dispatch) => {
        dispatch({type: actions.ADD_EXPERIENCE_START});
        return request
            .delete(
                process.env.NODE_ENV === "production"
                    ? process.env.prod + "/api/experiences"
                    : process.env.dev + "/api/experiences"
            )
            .send(experience)
            .then((res) => {
                dispatch({type: actions.ADD_EXPERIENCE_SUCCESS});
            })
            .catch((res) => {
                console.log(res.status);
                if (res.status === 405) {
                    console.log("EXPERIENCE DELETE FLOW FAILED");
                    dispatch({type: actions.ADD_EXPERIENCE_FAIL});
                } else {
                    console.log("EXPERIENCE DELETE FLOW ENDED");
                    dispatch({type: actions.ADD_EXPERIENCE_END});
                }
            });
    };
};

export const getExperiences = (from, to) => {
    return (dispatch) => {
        dispatch({type: actions.GET_EXPERIENCES_START});
        return request
            .get("/api/experiences")
            .query({from, to})
            .then((res) => {
                console.log("req");
                dispatch({type: actions.GET_EXPERIENCES_SUCCESS, payload: "test"});
            })
            .catch((res) => {
                console.log(res.status);
                if (res.status === 405) {
                    console.log("GET EXPERIENCE FLOW FAILED");
                    dispatch({type: actions.GET_EXPERIENCES_FAIL});
                } else {
                    console.log("GET EXPERIENCE FLOW ENDED");
                    dispatch({type: actions.GET_EXPERIENCES_END});
                }
            });
    };
};
