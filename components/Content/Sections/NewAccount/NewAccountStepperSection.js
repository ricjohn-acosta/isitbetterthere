import React from "react";
import styled from "styled-components";
import {Step, StepContent, StepLabel, Stepper, Typography} from "@material-ui/core";
import PersonalDetails from "./PersonalDetails";
import PrivacyDetails from "./PrivacyDetails";
import ExtraDetails from "./ExtraDetails";
import {useSelector} from "react-redux";
import NewAccountStepNavigator from "./NewAccountStepNavigator";
import {useForm} from "react-hook-form";

const Wrapper = styled.form`
  min-height: 60vh;
  margin: 5vh 15vw 10vh 15vw;
  overflow: auto;

  ${(props) => props.theme.breakpoints.down("sm")} {
    margin: 2vh 1vh 0 1vh;
  }
`;

const NewAccountStepperSection = () => {

    const {watch, control} = useForm({mode: "all"});

    const newAccountFormObserver = watch
    const newAccountFormControl = control

    const [description, setDescription] = React.useState("");
    const [occupation, setOccupation] = React.useState("");
    const [company, setCompany] = React.useState("");
    const [position, setPosition] = React.useState("");
    const [location, setLocation] = React.useState(null);
    const [inputLocation, setInputLocation] = React.useState("");
    const [siteSource, setSiteSource] = React.useState("");
    const [emptyFields, setEmptyFields] = React.useState(null);
    const activeStep = useSelector((state) => state.newAccountSetup.activeStepIndex)

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
                        formControl={newAccountFormControl}
                        formObserver={newAccountFormObserver}
                        source={"account-setup"}
                    />
                );
            case 2:
                return (
                    <ExtraDetails
                        emptyFields={emptyFields}
                        setSiteSource={setSiteSource}
                        siteSource={siteSource}
                    />
                );
            default:
                return "Unknown step";
        }
    };

    const steps = getSteps();

    return (
        <Wrapper>
            <Typography
                variant="h3"
                style={{marginBottom: "5vh", fontWeight: "bold"}}
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
                                    description={description}
                                    occupationState={occupation}
                                    company={company}
                                    position={position}
                                    location={location}
                                    emptyFields={emptyFields}
                                    inputLocation={inputLocation}
                                    setInputLocation={setInputLocation}
                                />
                            ) : (
                                getStepContent(index)
                            )}
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            <NewAccountStepNavigator source={'container'}/>
        </Wrapper>
    );
};

export default NewAccountStepperSection;
