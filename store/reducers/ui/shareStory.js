import {SET_CATEGORY_FORM_DATA, SET_STEP} from "../../actions/ui/shareStory";

const initialState = {
    activeStepIndex: 0,
    categoryFormData: null,
};

export const shareStoryStore = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_STEP:
            return {
                ...state,
                activeStepIndex: payload
            }
        case SET_CATEGORY_FORM_DATA:
            return {
                ...state,
                personalDetailsData: payload
            }
        default:
            return state
    }
}
