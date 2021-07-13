export const RESET_FORM = 'RESET_FORM'
export const resetForm = () => (dispatch) => {
    dispatch({
        type: RESET_FORM
    })
}

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

export const SET_EDITOR_DATA = 'SET_EDITOR_DATA'
export const setEditorData = (formData) => (dispatch) => {
    dispatch({
        type: SET_EDITOR_DATA,
        payload: formData
    })
}

export const SET_EXTRA_INFORMATION = 'SET_EXTRA_INFORMATION'
export const setExtraInformation = (formData) => (dispatch) => {
    dispatch({
        type: SET_EXTRA_INFORMATION,
        payload: formData
    })
}
