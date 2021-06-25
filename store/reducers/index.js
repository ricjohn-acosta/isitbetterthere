import {combineReducers} from "redux";
import {userStore} from "./users";
import {experienceStore} from "./experiences";
import {shareStoryStore} from "./shareStory";

export default combineReducers({
  users: userStore,
  shareStory: shareStoryStore,
  experiences: experienceStore,
});
