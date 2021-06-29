export const SET_STEP = 'SET_STEP'
export const setStep = (step) => (dispatch) => {
    dispatch({
        type: SET_STEP,
        payload: step
    })
}

export const SET_CATEGORY_FORM_DATA = 'SET_CATEGORY_FORM_DATA'
export const setCategoryFormData = (formData) => (dispatch) => {
    dispatch({
        type: SET_CATEGORY_FORM_DATA,
        payload: formData
    })
}

