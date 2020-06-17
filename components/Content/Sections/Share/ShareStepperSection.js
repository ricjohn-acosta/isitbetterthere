import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import ChooseCategory from "./ChooseCategory";
import ShareStory from "./ShareStory";
import StepConnector from "@material-ui/core/StepConnector";
import { careersCategory } from "../../../../lib/categories";

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
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

// COMPONENT LEVEL STYLING
const Wrapper = styled.div`
  margin: 5vh 10vw 50vh 10vw;
`;

function getSteps() {
  return [
    "What transition would you like to talk about?",
    "Explain how the transition went!",
    "Preview",
  ];
}

const ShareStepperSection = () => {
  const classes = useStyles();
  const [categories, setCategory] = React.useState(careersCategory);
  const [currentCategory, setCurrentCategory] = React.useState("careers");
  const [toValue, setToValue] = React.useState(null);
  const [toInputValue, setToInputValue] = React.useState("");
  const [fromValue, setFromValue] = React.useState(null);
  const [fromInputValue, setFromInputValue] = React.useState("");
  const [isSelected, setSelected] = React.useState(false);
  const [isSwapping, setSwapping] = React.useState(false);
  const [isEmptyField, setEmptyFields] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
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
          />
        );
      case 1:
        return <ShareStory/>;
      case 2:
        return "This is the bit I really care about!";
      default:
        return "Unknown step";
    }
  };
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Wrapper>
      {console.log("TO VALUE, ", toValue, toInputValue)}
      {console.log("FROM VALUE, ", fromValue, fromInputValue)}
      <div className={classes.root}>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<StyledConnector />}
        >
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
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
              <div
                style={{ display: "flex", justifyContent: "center" }}
                className={classes.instructions}
              >
                All steps completed - you&apos;re finished
              </div>
              <Button
                style={{ float: "right" }}
                onClick={handleReset}
                className={classes.button}
              >
                Reset
              </Button>
            </div>
          ) : (
            <div>
              <div
                style={{ display: "flex", justifyContent: "center" }}
                className={classes.instructions}
              >
                {getStepContent(activeStep)}
              </div>
              <div>
                <Button
                  style={{ float: "right" }}
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
                <Button
                  style={{ float: "right" }}
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
    </Wrapper>
  );
};

export default ShareStepperSection;
