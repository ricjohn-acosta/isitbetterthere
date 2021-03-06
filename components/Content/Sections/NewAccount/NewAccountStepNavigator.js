import React from 'react';
import {Button, Paper, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {
    setExtraDetailsData,
    setPersonalDetailsData,
    setPrivacyDetailsData,
    setStep
} from "../../../../store/actions/ui/newAccountSetup";
import styled from "styled-components";
import {addUser} from "../../../../store/actions/api/users";
import {useSession} from "next-auth/client";
import Router, {useRouter} from "next/router";

const Container = styled.div`
  margin-top: 50px;
`;

const defaultPrivacySettings = {
    hideName: false,
    hideEmail: false,
    hideOccupation: false,
    hideCompany: false,
    hideLocation: false,
}


const getSteps = () => {
    return [
        <Typography variant="h4">Tell us more about yourself</Typography>,
        <Typography variant="h4">Your privacy</Typography>,
        <Typography variant="h4">Extras</Typography>,
    ];
};

const isFieldDataEmpty = (fieldData) => {
    return !fieldData || Object.keys(fieldData).length === 0
}

const NewAccountStepNavigator = ({needsValidation, validate, fieldData, source}) => {
    const dispatch = useDispatch()
    const router = useRouter();
    const activeStep = useSelector((state) => state.newAccountSetup.activeStepIndex)
    const personalDetails = useSelector((state) => state.newAccountSetup.personalDetailsData)
    const privacyDetails = useSelector((state) => state.newAccountSetup.privacyDetailsData)
    const extraDetails = useSelector((state) => state.newAccountSetup.extraDetailsData)
    const [session, loading] = useSession();

    const initialStep = 0;
    const finalStep = 3;

    const nextStepAction = (activeStep) => {
        switch (activeStep) {
            // personal details
            case 0:
                dispatch(setStep(activeStep + 1))
                dispatch(setPersonalDetailsData(fieldData))
                return
            // privacy details
            case 1:
                dispatch(setStep(activeStep + 1))
                dispatch(setPrivacyDetailsData(isFieldDataEmpty(fieldData) ? defaultPrivacySettings : fieldData))
                return
            // extra details
            case 2:
                dispatch(setStep(activeStep + 1))
                dispatch(setExtraDetailsData(fieldData))
                return
        }
    }

    const goBack = () => {
        if (activeStep === initialStep) return;
        dispatch(setStep(activeStep - 1))
    }

    const goNext = () => {
        if (activeStep === finalStep) return;
        if (needsValidation) {
            validate().then(isValidated => {
                if (isValidated) {
                    nextStepAction(activeStep)
                }
            })
        } else {
            nextStepAction(activeStep)
        }
    }

    const showStepButtons = () => {
        return source !== 'container' && <div>
            <Button disabled={activeStep === 0} onClick={goBack}>
                Back
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    goNext()
                }}
            >
                {activeStep === getSteps().length ? "Finish" : "Next"}
            </Button>
        </div>
    }

    const showConfirmButtons = () => {
        return <Paper square elevation={0}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={() => {
                dispatch(setStep(0))
            }}>Back to start
            </Button>
            <Button onClick={() => {
                dispatch(addUser({
                    uid: session.id,
                    profile_picture: session.picture,
                    name: session.name,
                    email: session.email,
                    bio: personalDetails && personalDetails.description,
                    occupation: personalDetails && personalDetails.occupation,
                    position: personalDetails && personalDetails.position,
                    company: personalDetails && personalDetails.company,
                    location: personalDetails && personalDetails.country.name,
                    hide_name: privacyDetails && privacyDetails.hideName,
                    hide_email: privacyDetails && privacyDetails.hideEmail,
                    hide_occupation: privacyDetails && privacyDetails.hideOccupation,
                    hide_company: privacyDetails && privacyDetails.hideCompany,
                    hide_location: privacyDetails && privacyDetails.hideLocation,
                    comes_from: extraDetails && extraDetails.comesFrom,
                    date_joined: Math.floor(Date.now() / 1000),
                    user_type: "user"
                })).then(res => {
                    if (res.status === 200) {
                        Router.push('/')
                    }
                });
            }}>Submit</Button>
        </Paper>
    }

    if (router.route === '/account') return null

    return (
        <Container>
            {activeStep === finalStep ? showConfirmButtons() : showStepButtons()}
        </Container>
    );
};

export default NewAccountStepNavigator;