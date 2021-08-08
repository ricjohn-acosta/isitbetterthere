import React from 'react';
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import {ArrowBack, ArrowForward} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import {
    resetShareStoryForm,
    setCategoryFormData,
    setEditorData,
    setExtraInformation,
    setStep
} from "../../../../store/actions/ui/shareStory";
import {useDispatch, useSelector} from "react-redux";
import Router from "next/router";
import {addExperience} from "../../../../store/actions/api/experiences";
import {useSession} from "next-auth/client";
import {convertToRaw} from "draft-js";
import {usePopup} from "../../../../hooks/ui/usePopup";
import Snackbar from "../../../UI/Notifications/Snackbar";

const saveData = (fieldData, activeStep, dispatch) => {
    switch (activeStep) {
        case 0:
            dispatch(setCategoryFormData(fieldData));
            return
        case 1:
            dispatch(setEditorData(fieldData));
            return;
        case 2:
            dispatch(setExtraInformation(fieldData));
            return;
    }
}

export const BackButton = ({fieldData}) => {
    const dispatch = useDispatch()
    const activeStep = useSelector((state) => state.shareStory.activeStepIndex)

    const previousStepAction = () => {
        if (activeStep <= 0) return

        saveData(fieldData, activeStep, dispatch)
        dispatch(setStep(activeStep - 1))
    }

    return <Grid style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} item xs={1}>
        <IconButton style={{borderRadius: '50%'}}
                    disabled={activeStep === 0}
                    onClick={previousStepAction}
                    color={"primary"}>
            <ArrowBack fontSize={"large"}/>
        </IconButton>
    </Grid>
}

export const NextButton = ({fieldData, validator, extraValidator, toggleDialog}) => {
    const [session, loading] = useSession();
    const [snackbarOpen, setSnackbarOpen, toggleSnackbar] = usePopup();
    const dispatch = useDispatch()
    const activeStep = useSelector((state) => state.shareStory.activeStepIndex)
    const categoryFormData = useSelector((state) => state.shareStory.categoryFormData)
    const editorData = useSelector((state) => state.shareStory.editorData)
    const extraInformation = useSelector((state) => state.shareStory.extraInformation)
    const userData = useSelector((state) => state.users.user)
    const finalStep = 3;


    // TODO
    // create saveData function when navigating
    // gonext and goback should both invoke saveData
    // go next should have validations

    const nextStepAction = (activeStep) => {
        switch (activeStep) {
            // category form data
            case 0:
                let fromValue;
                let toValue;

                if (fieldData.direction === "from/to") {
                    fromValue = fieldData.firstInput.category;
                    toValue = fieldData.secondInput.category
                } else {
                    fromValue = fieldData.secondInput.category;
                    toValue = fieldData.firstInput.category
                }

                if (userData && userData.my_stories.find(experience => experience.from === fromValue && experience.to === toValue)) {
                    toggleDialog()
                    return
                }

                dispatch(setStep(activeStep + 1))
                saveData(fieldData, activeStep, dispatch)
                return
            // privacy details
            case 1:
                if (fieldData && fieldData.editor.getCurrentContent().getPlainText() === "") {
                    extraValidator("editor", {type: "manual", message: "Please write your story"})
                    return
                } else {
                    dispatch(setStep(activeStep + 1))
                    saveData(fieldData, activeStep, dispatch)
                    return
                }

            // extra details
            case 2:
                if (!fieldData) return

                const data = Object.keys(fieldData).map((key) => {
                    return {type: key, value: fieldData[key]}
                })

                data.forEach(({type, value}) => {
                    if (value === null) {
                        extraValidator(type, {type: "manual", message: "Please choose one of the following"})
                    }
                })

                if (fieldData && (fieldData.fulfillment && fieldData.regret && fieldData.difficulty)) {
                    dispatch(setStep(activeStep + 1))
                    saveData(fieldData, activeStep, dispatch)
                    return
                }

        }
    }

    const goNext = () => {
        validator().then(isValidated => {
            console.log(isValidated)
            if (isValidated) {
                nextStepAction(activeStep)
            }
        })
    }

    const nextButton = () => {
        return <IconButton onClick={goNext} style={{borderRadius: '50%'}}
                           color={"primary"}>
            <ArrowForward fontSize={"large"}/>
        </IconButton>
    }

    const handleSubmit = () => {
        if (!categoryFormData || !editorData || !extraInformation) return

        let fromValue;
        let toValue;

        if (categoryFormData.direction === "from/to") {
            fromValue = categoryFormData.firstInput.category;
            toValue = categoryFormData.secondInput.category
        } else {
            fromValue = categoryFormData.secondInput.category;
            toValue = categoryFormData.firstInput.category
        }

        console.log(editorData)
        dispatch(addExperience({
            author: session.user.name,
            author_id: session.id,
            category: categoryFormData.category,
            from: fromValue,
            to: toValue,
            fulfillment: extraInformation.fulfillment,
            ease_of_transition: extraInformation.difficulty,
            regret: extraInformation.regret,
            title: editorData.title,
            story: JSON.stringify(convertToRaw(editorData.editor.getCurrentContent())),
            helpful: 0,
            not_helpful: 0,
            date_posted: Math.floor(Date.now() / 1000),
        })).then(res => {
            if (res.status === 200) {
                // Router.push({
                //     pathname: "/transition",
                //     query: {
                //         category: categoryFormData.category,
                //         from: fromValue,
                //         to: toValue,
                //     },
                // });
                dispatch(resetShareStoryForm())
            }
        })

    }

    const submitButton = () => {
        return (
            <>
                <Button color={"primary"} variant={'contained'} onClick={handleSubmit}>Submit</Button>
            </>
        )
    }

    return <>
        <Grid style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                   item xs={1}>
        {activeStep === finalStep ? submitButton() : nextButton()}
        </Grid>
        <Snackbar message={'Story submitted!'} open={snackbarOpen} close={() => setSnackbarOpen(false)}/>
    </>
}
