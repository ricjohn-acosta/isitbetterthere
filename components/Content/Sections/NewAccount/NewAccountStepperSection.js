import React, {useEffect} from "react";
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
import ExtraDetails from "./ExtraDetails";
import {addUser} from "../../../../store/actions/api/users";
import {connect, useDispatch, useSelector} from "react-redux";
import Link from "@material-ui/core/Link";
import {useSession} from "next-auth/client";
import {disableBeforeUnload} from "./utils/unsavedFormWarning";
import StepNavigator from "./StepNavigator";

const Wrapper = styled.form`
  min-height: 60vh;
  margin: 5vh 15vw 10vh 15vw;
  overflow: auto;

  ${(props) => props.theme.breakpoints.down("sm")} {
    margin: 2vh 1vh 0 1vh;
  }
`;

const NewAccountStepperSection = () => {
    const dispatch = useDispatch()
    const [session, loading] = useSession();

    // const [activeStep, setActiveStep] = React.useState(0);
    const [stepContent, setStepContent] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [occupation, setOccupation] = React.useState("");
    const [company, setCompany] = React.useState("");
    const [position, setPosition] = React.useState("");
    const [location, setLocation] = React.useState(null);
    const [inputLocation, setInputLocation] = React.useState("");
    const [hideName, setHideName] = React.useState(false);
    const [hideEmail, setHideEmail] = React.useState(true);
    const [hideOccupation, setHideOccupation] = React.useState(false);
    const [hideCompany, setHideCompany] = React.useState(false);
    const [hideLocation, setHideLocation] = React.useState(false);
    const [siteSource, setSiteSource] = React.useState("");
    const [emptyFields, setEmptyFields] = React.useState(null);
    const [disableSubmit, setDisableSubmit] = React.useState(false);
    const activeStep = useSelector((state) => state.newAccountSetup.activeStepIndex)

    const handleCreateUser = () => {
        console.log('submit')
        setDisableSubmit(true);
        dispatch(addUser({
            uid: session.id,
            profile_picture: session.picture,
            name: session.name,
            email: session.email,
            bio: description,
            occupation,
            position,
            company,
            location,
            hide_name: hideName,
            hide_email: hideEmail,
            hide_occupation: hideOccupation,
            hide_company: hideCompany,
            hide_location: hideLocation,
            comes_from: siteSource,
            date_joined: Math.floor(Date.now() / 1000),
            user_type: "user"
        })).then(res => console.log(res));
    };

    const getSteps = () => {
        return [
            <Typography variant="h4">Tell us more about yourself</Typography>,
            <Typography variant="h4">Your privacy</Typography>,
            <Typography variant="h4">Extras</Typography>,
        ];
    };

    console.log(activeStep)
    const getStepContent = (step) => {
        switch (step) {
            case 1:
                return (
                    <PrivacyDetails
                        setHideName={setHideName}
                        setHideEmail={setHideEmail}
                        setHideOccupation={setHideOccupation}
                        setHideCompany={setHideCompany}
                        setHideLocation={setHideLocation}
                        hideName={hideName}
                        hideEmail={hideEmail}
                        hideOccupation={hideOccupation}
                        hideCompany={hideCompany}
                        hideLocation={hideLocation}
                        emptyFields={emptyFields}
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

    const findEmptyFields = () => {
        let fields = [
            "description",
            "occupation",
            "company",
            "position",
            "location",
            "siteSource",
        ];
        let emptyFields = [];

        fields.forEach((element) => {
            if (element === fieldToString({occupation}) && occupation === "") {
                emptyFields.push(element);
            }

            if (element === fieldToString({location}) && location === null) {
                emptyFields.push(element);
            }
        });

        return emptyFields;
    };

    const fieldToString = (field) => {
        return Object.keys(field)[0];
    };

    const handleNext = () => {
        if (
            activeStep === 0 ||
            occupation === "" ||
            // company === "" ||
            // position === "" ||
            location === ""
        ) {
            if (location !== null) {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                setEmptyFields(findEmptyFields());
            } else {
                setEmptyFields(findEmptyFields());
            }
        } else if (activeStep === 2 && siteSource === "") {
            setEmptyFields(["siteSource"]);
        } else {
            // setCompany("");
            // setPosition("");
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setEmptyFields(findEmptyFields());
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
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
            <StepNavigator source={'container'}/>
            {/*{activeStep === steps.length && (*/}
            {/*    <Paper square elevation={0}>*/}
            {/*        <Typography>All steps completed - you&apos;re finished</Typography>*/}
            {/*        <Button onClick={handleReset}>Reset</Button>*/}
            {/*        <Button type={"submit"}>Submit</Button>*/}

            {/*        /!*<Link*!/*/}
            {/*        /!*    type={"submit"}*!/*/}
            {/*        /!*    component={Button}*!/*/}
            {/*        /!*    disabled={disableSubmit}*!/*/}
            {/*        /!*    href={*!/*/}
            {/*        /!*        process.env.NODE_ENV === "production"*!/*/}
            {/*        /!*            ? process.env.prod*!/*/}
            {/*        /!*            : process.env.dev*!/*/}
            {/*        /!*    }*!/*/}
            {/*        /!*    style={{textDecoration: "none"}}*!/*/}
            {/*        /!*>*!/*/}
            {/*        /!*    Create account*!/*/}
            {/*        /!*</Link>*!/*/}
            {/*    </Paper>*/}
            {/*)}*/}
        </Wrapper>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        addUser: (user) => dispatch(addUser(user)),
    };
};

export default connect(null, mapDispatchToProps)(NewAccountStepperSection);
