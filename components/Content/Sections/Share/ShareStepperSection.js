import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import ChooseCategory from "./ChooseCategory";
import ShareStory from "./ShareStory";
import StepConnector from "@material-ui/core/StepConnector";
import {careersCategory} from "../../../../lib/categories";
import {EditorState} from "draft-js";
import {convertToRaw} from "draft-js";
import {grey} from "@material-ui/core/colors";
import {addExperience} from "../../../../store/actions/experiences";
import draftToHtml from "draftjs-to-html";
import ExtraInformation from "./ExtraInformation";
import Preview from "./Preview";
import ContributionWarningModal from "./ContributionWarningModal";
import {useRouter} from 'next/router'
import Router from 'next/router'
import {useDispatch} from 'react-redux'
import {useSession} from "next-auth/client";
import {useDialog} from "../../../../hooks/ui/useDialog";
import {AlertDialog} from "../../../UI/Notifications/AlertDialog";

// OVERRIDING DEFAULT MATERIAL-UI STYLING
const StyledConnector = withStyles({
    alternativeLabel: {
        top: 10,
        left: "calc(-50% + 16px)",
        right: "calc(50% + 16px)",
    },
    active: {
        "& $line": {
            borderColor: "#00CCFF",
        },
    },
    completed: {
        "& $line": {
            borderColor: "#00CCFF",
        },
    },
    line: {
        borderColor: "#eaeaf0",
        borderTopWidth: 3,
        borderRadius: 1,
    },
})(StepConnector);

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        backgroundColor: grey,
    },
    button: {
        marginRight: theme.spacing(1),
    },
}));

// COMPONENT LEVEL STYLING
const Wrapper = styled.div`
  min-height: 150vh;
  padding: 0 5% 0 5%;
  background-color: #f8f8f8;
  overflow: auto;
`;

function getSteps() {
    return [
        "What transition would you like to talk about?",
        "Share your story!",
        "Extra information",
    ];
}

const HtmlToReactParser = require("html-to-react").Parser;
const htmlToReactParser = new HtmlToReactParser();

const ShareStepperSection = () => {
    const [session, loading] = useSession();
    // const [session, setSession] = useState(null)
    const [dialogOpen, setDialogOpen, toggleDialog] = useDialog();

    const userExperiences = session && session.userData.userExperiences

    console.log('userExperiences', userExperiences)

    const classes = useStyles();
    const dispatch = useDispatch()
    const router = useRouter()
    const [categories, setCategory] = React.useState(careersCategory);
    const [currentCategory, setCurrentCategory] = React.useState("careers");
    const [toValue, setToValue] = React.useState(null);
    const [toInputValue, setToInputValue] = React.useState("");
    const [fromValue, setFromValue] = React.useState(null);
    const [fromInputValue, setFromInputValue] = React.useState("");
    const [isSelected, setSelected] = React.useState(false);
    const [isSwapping, setSwapping] = React.useState(false);
    const [isEmptyField, setEmptyFields] = React.useState(false);
    const [extraInfoEmptyState, setExtraInfoEmptyState] = React.useState(false);
    const [shareEmptyState, setShareEmptyState] = React.useState(false);
    const [fulfillment, setFulfillment] = React.useState("");
    const [easeOfTransition, setEaseOfTransition] = React.useState("");
    const [regret, setRegret] = React.useState("");
    const [disableSubmit, setDisableSubmit] = React.useState(false);
    const [modalView, setModalView] = React.useState(false);
    const [activeStep, setActiveStep] = React.useState(0);
    const [editorState, setEditorState] = React.useState(
        EditorState.createEmpty()
    );

    const editorContent = convertToRaw(editorState.getCurrentContent());
    const story = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    const steps = getSteps();

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <ChooseCategory
                        categories={categories}
                        setCategory={setCategory}
                        currentCategory={currentCategory}
                        setCurrentCategory={setCurrentCategory}
                        setToValue={setToValue}
                        setToInputValue={setToInputValue}
                        setFromValue={setFromValue}
                        setFromInputValue={setFromInputValue}
                        setSelected={setSelected}
                        setSwapping={setSwapping}
                        toValue={toValue}
                        toInputValue={toInputValue}
                        fromValue={fromValue}
                        fromInputValue={fromInputValue}
                        isSwapping={isSwapping}
                        isEmptyField={isEmptyField}
                        setEmptyFields={setEmptyFields}
                    />
                );
            case 1:
                return (
                    <ShareStory
                        editorState={editorState}
                        setEditorState={setEditorState}
                        toValue={toInputValue}
                        fromValue={fromInputValue}
                        shareEmptyState={shareEmptyState}
                    />
                );
            case 2:
                return (
                    <ExtraInformation
                        editorState={editorState}
                        setFulfillment={setFulfillment}
                        fulfillment={fulfillment}
                        setEaseOfTransition={setEaseOfTransition}
                        easeOfTransition={easeOfTransition}
                        setRegret={setRegret}
                        regret={regret}
                        extraInfoEmptyState={extraInfoEmptyState}
                    />
                );
            default:
                return "Unknown step";
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisableSubmit(true);
        dispatch(addExperience({
            posted_by: session.id,
            category: currentCategory,
            from: fromInputValue,
            to: toInputValue,
            fulfillment,
            ease_of_transition: easeOfTransition,
            regret,
            story,
            helpful: 0,
            not_helpful: 0,
            date_posted: Math.floor(Date.now() / 1000),
        })).then(res => {
            console.log('test', res)
        })
        Router.push({
            pathname: "/transition",
            query: {
                category: currentCategory,
                from: fromInputValue,
                to: toInputValue,
            },
        });
    };

    const handleNext = () => {

        if (session && session.userData.userExperiences.find(experience => experience.from === fromInputValue && experience.to === toInputValue)) {
            toggleDialog()
            return
        }

        if (activeStep === 0) {
            if (checkIfEmpty(0)) {
                return;
            } else {
                userExperiences.find(
                    (e) => e.from === fromInputValue && e.to === toInputValue
                )
                    ? setModalView(true)
                    : setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
        }
        if (activeStep === 1) {
            if (checkIfEmpty(1)) {
                return;
            } else {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
        }
        if (activeStep === 2) {
            if (checkIfEmpty(2)) {
                return;
            } else {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
        }
    };

    console.log(activeStep);
    const checkIfEmpty = (step) => {
        switch (step) {
            case 0:
                if (!toValue || !fromValue) {
                    setEmptyFields(true);
                    return true;
                } else {
                    setEmptyFields(false);
                    return false;
                }
            case 1:
                if (
                    isWhiteSpaceOrEmpty(editorContent.blocks[0].text) &&
                    editorContent.blocks.length === 1
                ) {
                    setShareEmptyState(true);
                    return true;
                } else {
                    setShareEmptyState(false);
                    return false;
                }

            case 2:
                if (
                    isWhiteSpaceOrEmpty(fulfillment) ||
                    isWhiteSpaceOrEmpty(easeOfTransition) ||
                    isWhiteSpaceOrEmpty(regret)
                ) {
                    setExtraInfoEmptyState(true);
                    return true;
                } else {
                    setExtraInfoEmptyState(false);
                    return false;
                }
            default:
                break;
        }
    };

    const isWhiteSpaceOrEmpty = (input) => {
        return !/[^\s]/.test(input);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };


    return (
        <Wrapper>
            <div className={classes.root}>
                <Stepper
                    alternativeLabel
                    activeStep={activeStep}
                    connector={<StyledConnector/>}
                    style={{backgroundColor: "#F8F8F8"}}
                >
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};

                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                <div>
                    {activeStep === steps.length ? (
                        <div>
                            <div>
                                <Preview editorState={editorState}/>
                            </div>
                            <Button
                                disableElevation
                                disabled={disableSubmit}
                                color="primary"
                                variant="contained"
                                style={{float: "right"}}
                                onClick={handleSubmit}
                                className={classes.button}
                            >
                                Submit
                            </Button>
                            <Button
                                disableElevation
                                style={{float: "right"}}
                                onClick={handleReset}
                                className={classes.button}
                            >
                                Reset
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <div className={classes.instructions}>
                                {getStepContent(activeStep)}
                            </div>
                            <div>
                                <Button
                                    disableElevation
                                    style={{float: "right"}}
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    className={classes.button}
                                >
                                    {activeStep === steps.length - 1 ? "Confirm" : "Next"}
                                </Button>
                                <Button
                                    disableElevation
                                    style={{float: "right"}}
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    className={classes.button}
                                >
                                    Back
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <ContributionWarningModal
                modalView={modalView}
                setModalView={setModalView}
                from={fromInputValue}
                to={toInputValue}
            />
            <AlertDialog open={dialogOpen}
                         close={() => setDialogOpen(false)}
                         title={'Thanks for contributing!'}
                         body={<>
                             You have already shared your story about transitioning from <b>{fromInputValue}</b> to <b>{toInputValue}</b>! Would you like to add more to your story?
                         </>}
                         actions={[
                             {action: 'Edit your story', handler: () => setDialogOpen(false)},
                             {action: 'Close', handler: () => setDialogOpen(false)}]}/>
        </Wrapper>
    );
};

export default ShareStepperSection
