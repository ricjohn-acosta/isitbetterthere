import React, { useEffect } from "react";
import styled from "styled-components";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import PersonalDetails from "./PersonalDetails";
import PrivacyDetails from "./PrivacyDetails";
import ConfirmDetails from "./ConfirmDetails";

const Wrapper = styled.div`
  min-height: 60vh;
  margin: 5vh 15vw 0 15vw;
`;

const StepperSection = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [stepContent, setStepContent] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [occupation, setOccupation] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [position, setPosition] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [hideName, setHideName] = React.useState(false);
  const [hideOccupation, setHideOccupation] = React.useState(false);
  const [hideCompany, setHideCompany] = React.useState(false);
  const [hideLocation, setHideLocation] = React.useState(false);
  const [emptyFields, setEmptyFields] = React.useState(null);

  const getSteps = () => {
    return [
      <Typography variant="h4">Tell us more about yourself</Typography>,
      <Typography variant="h4">Your privacy</Typography>,
      <Typography variant="h4">Extras</Typography>,
    ];
  };

  const getStepContent = (step) => {
    switch (step) {
      case 1:
        return (
          <PrivacyDetails
            setHideName={setHideName}
            setHideOccupation={setHideOccupation}
            setHideCompany={setHideCompany}
            setHideLocation={setHideLocation}
          />
        );
      case 2:
        return <ConfirmDetails />;
      default:
        return "Unknown step";
    }
  };

  const findEmptyFields = () => {
    let fields = [
      "description",
      "occupation",
      "company",
      "position",
      "location",
    ];
    let emptyFields = [];

    fields.forEach((element) => {
      if (element === fieldToString({ description }) && description === "") {
        emptyFields.push(element);
      }

      if (element === fieldToString({ occupation }) && occupation === "") {
        emptyFields.push(element);
      }

      if (element === fieldToString({ company }) && company === "") {
        emptyFields.push(element);
      }
      if (element === fieldToString({ position }) && position === "") {
        emptyFields.push(element);
      }
      if (element === fieldToString({ location }) && location === "") {
        emptyFields.push(element);
      }
    });

    return emptyFields;
  };

  const getEmptyFields = () => {
    return emptyFields;
  };

  const fieldToString = (field) => {
    return Object.keys(field)[0];
  };

  const handleNext = () => {
    if (
      (activeStep === 0 && description === "") ||
      occupation === "" ||
      company === "" ||
      position === "" ||
      location === ""
    ) {
      setEmptyFields(findEmptyFields());
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect(() => {
    setStepContent(
      <PersonalDetails
        setDescription={setDescription}
        setOccupationState={setOccupation}
        setCompany={setCompany}
        setPosition={setPosition}
        setLocation={setLocation}
        emptyFields={emptyFields}
      />
    );
  }, []);

  const steps = getSteps();

  return (
    <Wrapper>
      {console.log(emptyFields)}
      <Typography
        variant="h3"
        style={{ marginBottom: "5vh", fontWeight: "bold" }}
      >
        Set up your account
      </Typography>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              {index === 0 ? (
                <PersonalDetails
                  setDescription={setDescription}
                  setOccupationState={setOccupation}
                  setCompany={setCompany}
                  setPosition={setPosition}
                  setLocation={setLocation}
                  emptyFields={emptyFields}
                />
              ) : (
                getStepContent(index)
              )}
              <div>
                <div>
                  <Button disabled={activeStep === 0} onClick={handleBack}>
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset}>Reset</Button>
        </Paper>
      )}
    </Wrapper>
  );
};

export default StepperSection;
