// import * as types from './types'

// // INITIALIZES CLOCK ON SERVER
// export const serverRenderClock = () => (dispatch) =>
//   dispatch({
//     type: types.TICK,
//     payload: { light: false, ts: Date.now() },
//   })

// // INITIALIZES CLOCK ON CLIENT
// export const startClock = () => (dispatch) =>
//   setInterval(() => {
//     dispatch({ type: types.TICK, payload: { light: true, ts: Date.now() } })
//   }, 1000)

// // INCREMENT COUNTER BY 1
// export const incrementCount = () => ({ type: types.INCREMENT })

// // DECREMENT COUNTER BY 1
// export const decrementCount = () => ({ type: types.DECREMENT })

// // RESET COUNTER
// export const resetCount = () => ({ type: types.RESET })

import * as actions from "./types";
import request from "superagent";

export const addUser = (user) => {
  return (dispatch) => {
    dispatch({ type: actions.ADD_USER_START });
    return request
      .post(process.env.ADD_USER || "http://localhost:3000/api/user")
      .send(user)
      .then((res) => {
        dispatch({ type: actions.ADD_USER_SUCCESS });
      })
      .catch((res) => {
        console.log(res.status)
        if (res.status === 405) {
          console.log("USER ADD FLOW FAILED")
          dispatch({ type: actions.ADD_USER_FAIL });
        } else {
          console.log("USER ADD FLOW ENDED")
          dispatch({ type: actions.ADD_USER_END });
        }
      });
  };
};


