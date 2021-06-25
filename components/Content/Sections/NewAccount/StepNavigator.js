import React, {useEffect, useMemo} from 'react';
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import Typography from "@material-ui/core/Typography";
import {
    setExtraDetailsData,
    setPersonalDetailsData,
    setPrivacyDetailsData,
    setStep
} from "../../../../store/actions/shareStory";
import styled from "styled-components";
import {addUser} from "../../../../store/actions/users";
import {useSession} from "next-auth/client";
import Paper from "@material-ui/core/Paper";
import Router, {useRouter} from "next/router";

const Container = styled.div`
  margin-top: 50px;
`;

const getSteps = () => {
    return [
        <Typography variant="h4">Tell us more about yourself</Typography>,
        <Typography variant="h4">Your privacy</Typography>,
        <Typography variant="h4">Extras</Typography>,
    ];
};

const hideFromSource = [
    'container',
    'account'
]

const StepNavigator = ({needsValidation, validate, fieldData, source}) => {
    const dispatch = useDispatch()
    const router = useRouter();
    const activeStep = useSelector((state) => state.shareStory.activeStepIndex)
    const personalDetails = useSelector((state) => state.shareStory.personalDetailsData)
    const privacyDetails = useSelector((state) => state.shareStory.privacyDetailsData)
    const extraDetails = useSelector((state) => state.shareStory.extraDetailsData)
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
                console.log('set privacy details data', fieldData)
                dispatch(setStep(activeStep + 1))
                dispatch(setPrivacyDetailsData(fieldData))
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
                    // dispatch(setStep(activeStep + 1))
                    // dispatch(setPersonalDetailsData(fieldData))
                    nextStepAction(activeStep)
                }
            })
        } else {
            // dispatch(setStep(activeStep + 1))
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
            {console.log('SHOW CONFIRM BUTTONS')}
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

    console.log(router)
    if (router.route === '/account') return null

    return (
        <Container>
            {activeStep === finalStep ? showConfirmButtons() : showStepButtons()}
        </Container>
    );
};

export default StepNavigator;