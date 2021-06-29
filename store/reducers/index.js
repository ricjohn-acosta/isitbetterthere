import {combineReducers} from "redux";
import {userStore} from "./api/users";
import {experienceStore} from "./api/experiences";
import {newAccountSetupStore} from "./ui/newAccountSetup";
import {shareStoryStore} from "./ui/shareStory";

export default combineReducers({
  // API
  users: userStore,
  experiences: experienceStore,

  // UI
  newAccountSetup: newAccountSetupStore,
  shareStory: shareStoryStore
});
