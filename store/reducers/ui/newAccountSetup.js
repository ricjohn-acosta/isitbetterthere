import {
    SET_EXTRA_DETAILS_DATA,
    SET_PERSONAL_DETAILS_DATA,
    SET_PRIVACY_DETAILS_DATA,
    SET_STEP
} from "../../actions/ui/newAccountSetup";

const initialState = {
    activeStepIndex: 0,
    personalDetailsData: null,
    privacyDetailsData: null,
    extraDetailsData: null,
};

export const newAccountSetupStore = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_STEP:
            return {
                ...state,
                activeStepIndex: payload
            }
        case SET_PERSONAL_DETAILS_DATA:
            return {
                ...state,
                personalDetailsData: payload
            }
        case SET_PRIVACY_DETAILS_DATA:
            return {
                ...state,
                privacyDetailsData: payload
            }
        case SET_EXTRA_DETAILS_DATA:
            return {
                ...state,
                extraDetailsData: payload
            }
        default:
            return state
    }
}
