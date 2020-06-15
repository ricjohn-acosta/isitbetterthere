import React from "react";
import { makeStyles, withStyles  } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import ChooseCategory from "./ChooseCategory";
import StepConnector from '@material-ui/core/StepConnector';

// OVERRIDING DEFAULT MATERIAL-UI STYLING
const StyledConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#00CCFF',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#00CCFF',
    },
  },
  line: {
    borderColor: '#eaeaf0',
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
    "Describe how it went",
    "Preview",
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <ChooseCategory />;
    case 1:
      return "What is an ad group anyways?";
    case 2:
      return "This is the bit I really care about!";
    default:
      return "Unknown step";
  }
}

const ShareStepperSection = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

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

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Wrapper>
      <div className={classes.root}>
        <Stepper alternativeLabel activeStep={activeStep} connector={<StyledConnector/>}>
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
              <Typography
                style={{ display: "flex", justifyContent: "center" }}
                className={classes.instructions}
              >
                All steps completed - you&apos;re finished
              </Typography>
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
              <Typography
                style={{ display: "flex", justifyContent: "center" }}
                className={classes.instructions}
              >
                {getStepContent(activeStep)}
              </Typography>
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
