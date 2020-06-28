import { combineReducers } from "redux";
import userReducer from "./users";
import experienceReducer from "./experiences";

export default combineReducers({
  users: userReducer,
  experiences: experienceReducer,
});
