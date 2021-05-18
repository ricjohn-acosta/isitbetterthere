import { combineReducers } from "redux";
import userReducer, {userStore} from "./users";
import experienceReducer, {experienceStore} from "./experiences";

export default combineReducers({
  users: userStore,
  experiences: experienceStore,
});
