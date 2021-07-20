export const SET_STEP = 'SET_STEP'
export const setStep = (step) => (dispatch) => {
    dispatch({
        type: SET_STEP,
        payload: step
    })
}

export const SET_PERSONAL_DETAILS_DATA = 'SET_PERSONAL_FIELDS_DATA'
export const setPersonalDetailsData = (formData) => (dispatch) => {
    dispatch({
        type: SET_PERSONAL_DETAILS_DATA,
        payload: formData
    })
}

export const SET_PRIVACY_DETAILS_DATA = 'SET_PRIVACY_DETAILS_DATA'
export const setPrivacyDetailsData = (formData) => (dispatch) => {
    dispatch({
        type: SET_PRIVACY_DETAILS_DATA,
        payload: formData
    })
}

export const SET_EXTRA_DETAILS_DATA = 'SET_EXTRA_DETAILS_DATA'
export const setExtraDetailsData = (formData) => (dispatch) => {
    dispatch({
        type: SET_EXTRA_DETAILS_DATA,
        payload: formData
    })
}
