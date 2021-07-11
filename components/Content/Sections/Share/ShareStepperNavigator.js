import React, {useEffect, useMemo, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import {ArrowBack, ArrowForward, Done} from "@material-ui/icons";
import Preview from "./Preview";
import Button from "@material-ui/core/Button";
import CategoryForm from "../Home/CategoryForm";
import {
    setCategoryFormData,
    setEditorData,
    setExtraInformation,
    setStep
} from "../../../../store/actions/ui/shareStory";
import {useDispatch, useSelector} from "react-redux";
import Router from "next/router";
import {
    setExtraDetailsData,
    setPersonalDetailsData,
    setPrivacyDetailsData
} from "../../../../store/actions/ui/newAccountSetup";

const getSteps = () => {
    return [
        "What transition would you like to talk about?",
        "Share your story!",
        "Extra information",
    ];
}


export const BackButton = () => {
    const dispatch = useDispatch()
    const activeStep = useSelector((state) => state.shareStory.activeStepIndex)

    const previousStepAction = () => {
        if (activeStep <= 0) return
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

export const NextButton = ({fieldData, validator, extraValidator}) => {
    const dispatch = useDispatch()
    const activeStep = useSelector((state) => state.shareStory.activeStepIndex)
    const categoryFormData = useSelector((state) => state.shareStory.categoryFormData)
    const editorData = useSelector((state) => state.shareStory.editorData)

    const nextStepAction = (activeStep) => {
        switch (activeStep) {
            // cateegory form data
            case 0:
                dispatch(setStep(activeStep + 1))
                dispatch(setCategoryFormData(fieldData))
                return
            // privacy details
            case 1:
                if (fieldData && fieldData.editor.getCurrentContent().getPlainText() === "") {
                    extraValidator("editor", {type: "manual", message: "Please write your story"})
                    return
                } else {
                    dispatch(setStep(activeStep + 1))
                    dispatch(setEditorData(fieldData))
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
                    dispatch(setExtraInformation(fieldData))
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

    return <Grid style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                 item xs={1}>
        {/*{activeStep === steps.length ? <Button onClick={handleSubmit} color={'primary'} size={'large'}*/}
        {/*                                       endIcon={<Done/>}>Submit</Button> :*/}
        {/*    <IconButton style={{borderRadius: '50%'}} onClick={handleNext}*/}
        {/*                color={"primary"}>*/}
        {/*        <ArrowForward fontSize={"large"}/>*/}
        {/*    </IconButton>}*/}
        <IconButton onClick={goNext} style={{borderRadius: '50%'}}
                    color={"primary"}>
            <ArrowForward fontSize={"large"}/>
        </IconButton>
    </Grid>
}
