import {
    RESET_FORM,
    SET_CATEGORY_FORM_DATA,
    SET_EDITOR_DATA,
    SET_EXTRA_INFORMATION,
    SET_STEP
} from "../../actions/ui/shareStory";

const initialState = {
    activeStepIndex: 0,
    categoryFormData: null,
    editorData: null,
    extraInformation: null
};

export const shareStoryStore = (state = initialState, {type, payload}) => {
    switch (type) {
        case RESET_FORM:
            return {
                activeStepIndex: 0,
                categoryFormData: null,
                editorData: null,
                extraInformation: null
            }
        case SET_STEP:
            return {
                ...state,
                activeStepIndex: payload
            }
        case SET_CATEGORY_FORM_DATA:
            return {
                ...state,
                categoryFormData: payload
            }
        case SET_EDITOR_DATA:
            return {
                ...state,
                editorData: payload
            }

        case SET_EXTRA_INFORMATION:
            return {
                ...state,
                extraInformation: payload
            }
        default:
            return state
    }
}
