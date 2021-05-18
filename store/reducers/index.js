import { combineReducers } from "redux";
import userReducer, {storeUserData} from "./users";
import experienceReducer from "./experiences";

export default combineReducers({
  users: storeUserData,
  experiences: experienceReducer,
});
