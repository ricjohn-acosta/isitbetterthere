import * as actions from "../types";
import request from "superagent";
import {axiosGetUserById} from "../../../pages/api/users/[id]";
import {axiosCreateNewUser} from "../../../pages/api/users/createNew";
import {axiosEditUser} from "../../../pages/api/users/edit";

export const addUser = (data) => {
    return async () => {
        return await axiosCreateNewUser(data)
    }
}

export const editUser = (data) => {
    return async () => {
        return await axiosEditUser(data)
    }
}

export const getUser = (id) => {
    return async () => {
        return await axiosGetUserById(id)
    }
}

export const STORE_USER_DATA = 'STORE_USER_DATA'
export const storeUserData = (userData) => (dispatch) => {
    dispatch({
        type: STORE_USER_DATA,
        payload: userData
    })
}

// export const addUser = (user) => {
//     return (dispatch) => {
//         dispatch({type: actions.ADD_USER_START});
//         return (
//             request
//                 .post(
//                     process..env.NODE_ENV === "production"
//                         ? process..env.prod + '/api/users'
//                         : process..env.dev + '/api/users'
//                 )
//                 .send(user)
//                 .then((res) => {
//                     dispatch({type: actions.ADD_USER_SUCCESS});
//                 })
//                 .catch((res) => {
//                     console.log(res.status);
//                     if (res.status === 405) {
//                         console.log("USER ADD FLOW FAILED");
//                         dispatch({type: actions.ADD_USER_FAIL});
//                     } else {
//                         console.log("USER ADD FLOW ENDED");
//                         dispatch({type: actions.ADD_USER_END});
//                     }
//                 })
//         );
//     };
// };

// export const editUser = (userData) => {
//     return (dispatch) => {
//         dispatch({type: actions.ADD_USER_START});
//         return (
//             request
//                 .put(
//                     process.env.NODE_ENV === "production"
//                         ? process.env.prod + "/api/users"
//                         : process.env.dev + "/api/users"
//                 )
//                 .send(userData)
//                 .then((res) => {
//                     dispatch({type: actions.ADD_USER_SUCCESS});
//                 })
//                 .catch((res) => {
//                     if (res.status === 405) {
//                         dispatch({type: actions.ADD_USER_FAIL});
//                     } else {
//                         dispatch({type: actions.ADD_USER_END});
//                     }
//                 })
//         );
//     };
// };

