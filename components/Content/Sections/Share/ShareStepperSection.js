import React from "react";
import {useSelector} from "react-redux";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import styled from "styled-components";
import ChooseCategory from "./ChooseCategory";
import ShareStory from "./ShareStory";
import {careersCategory} from "../../../../lib/categories";
import {EditorState} from "draft-js";
import {grey} from "@material-ui/core/colors";
import ExtraInformation from "./ExtraInformation";
import Preview from "./Preview";
import ContributionWarningModal from "./ContributionWarningModal";
import {Stepper, Step, StepLabel, StepConnector} from "@material-ui/core"
import {useRouter} from "next/router";

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

const ShareStepperSection = () => {
    const activeStep = useSelector((state) => state.shareStory.activeStepIndex)
    const router = useRouter();
    const classes = useStyles();
    const [categories, setCategory] = React.useState(careersCategory);
    const [currentCategory, setCurrentCategory] = React.useState("careers");
    const [toValue, setToValue] = React.useState(null);
    const [toInputValue, setToInputValue] = React.useState("");
    const [fromValue, setFromValue] = React.useState(null);
    const [fromInputValue, setFromInputValue] = React.useState("");
    const [isSwapping, setSwapping] = React.useState(false);
    const [isEmptyField, setEmptyFields] = React.useState(false);
    const [fulfillment, setFulfillment] = React.useState("");
    const [easeOfTransition, setEaseOfTransition] = React.useState("");
    const [regret, setRegret] = React.useState("");
    const [modalView, setModalView] = React.useState(false);
    const [editorState, setEditorState] = React.useState(
        EditorState.createEmpty()
    );
    const userData = useSelector((state) => state.users.user)

    const steps = getSteps();

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <ChooseCategory
                        stories={userData && userData.my_stories}
                        categories={categories}
                        setCategory={setCategory}
                        currentCategory={currentCategory}
                        setCurrentCategory={setCurrentCategory}
                        setToValue={setToValue}
                        setToInputValue={setToInputValue}
                        setFromValue={setFromValue}
                        setFromInputValue={setFromInputValue}
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
                    />
                );
            case 3:
                return (
                    <Preview/>
                )
        }
    };

    console.log(router)
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
                {getStepContent(activeStep)}
            </div>
            <ContributionWarningModal
                modalView={modalView}
                setModalView={setModalView}
                from={fromInputValue}
                to={toInputValue}
            />
        </Wrapper>
    );
};

export default ShareStepperSection
