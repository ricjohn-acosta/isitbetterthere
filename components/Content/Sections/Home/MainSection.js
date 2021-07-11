import styled, {keyframes} from "styled-components";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import {
    careersCategory,
    countryCategory,
    cultureCategory,
    jobCategory,
    lifeCategory,
    secondaryEducationCategory,
    tertiaryEducationCategory,
    uniCategory,
} from "../../../../lib/categories";
import Router from "next/router";
import {makeStyles} from "@material-ui/core/styles";
import CategoryForm from "./CategoryForm";
import Button from "@material-ui/core/Button";
import React from "react";
import {useForm} from "react-hook-form";


const useStyles = makeStyles((theme) => ({
    popper: {width: 400},

    [theme.breakpoints.down("sm")]: {
        popper: {width: 250},
    },
}));

const Wrapper = styled(Box)`
  padding: 8%;
  background: linear-gradient(rgb(144, 144, 209) 0%, rgb(255, 255, 255) 0%, rgb(203, 246, 255) 100%);
  height: 70vh;

  &:before {
    content: ' ';
    display: block;
    position: absolute;
    left: 50%;
    top: 25%;
    width: 50%;
    height: 50%;
    opacity: 0.6;
    background-image: url('/decision.png');
    background-repeat: no-repeat;
    background-position: center right;
    background-size: contain;
  }

  ${(props) => props.theme.breakpoints.down("md")} {
    height: 90vh;
  }

`;

const GridWrapper = styled(Grid)`

  ${(props) => props.theme.breakpoints.down("sm")} {
    padding-top: 20vh;
  }
`;

const InputContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const fadeInText = keyframes`
  from {
    margin-left: -5%;
  }

  to {
    margin-left: 0%;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;

    to {
      opacity: 1;
    }
`;

const FadeIn = styled.span`
  animation: ${fadeIn} 2s;
`;

const FadeInAnimation = styled.span`
  animation: ${fadeInText} 2s;
`;
const WelcomeMessage = styled(Typography)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;

  ${(props) => props.theme.breakpoints.down("md")} {

    align-items: center;
    font-size: 1.5rem;
    white-space: nowrap;
  }

  ${(props) => props.theme.breakpoints.between("1287", "1870")} {
    font-size: 4rem;
  }

  ${(props) => props.theme.breakpoints.between("sm", "1287")} {
    font-size: 1.5rem;
  }
`;

const SeeStories = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainSection = () => {
    const {watch, control, trigger, handleSubmit, formState: {errors}} = useForm({mode: "all"});
    const fieldStore = watch()

    const [categories, setCategory] = React.useState(careersCategory);
    const [currentCategory, setCurrentCategory] = React.useState("careers");
    const [toValue, setToValue] = React.useState(null);
    const [toInputValue, setToInputValue] = React.useState("");
    const [fromValue, setFromValue] = React.useState(null);
    const [fromInputValue, setFromInputValue] = React.useState("");
    const [isSwapping, setSwapping] = React.useState(false);

    const handleForm = () => {
        trigger().then(isValidated => {
            if (isValidated) {
                Router.push({
                    pathname: "/transition",
                    query: {
                        category: currentCategory,
                        from: fromInputValue,
                        to: toInputValue,
                        page: 1,
                    },
                });
            }
        })
    };

    const handleCategories = (value) => {
        switch (value) {
            case "secondaryEducation":
                setCategory(secondaryEducationCategory);
                setCurrentCategory(value);
                return;

            case "tertiaryEducation":
                setCategory(tertiaryEducationCategory);
                setCurrentCategory(value);
                return;

            case "universities":
                setCategory(uniCategory);
                setCurrentCategory(value);
                return;

            case "careers":
                setCategory(careersCategory);
                setCurrentCategory(value);
                return;

            case "jobs":
                setCategory(jobCategory);
                setCurrentCategory(value);
                return;

            case "countries":
                setCategory(countryCategory);
                setCurrentCategory(value);
                return;

            case "cultures":
                setCategory(cultureCategory);
                setCurrentCategory(value);
                return;

            case "life":
                setCategory(lifeCategory);
                setCurrentCategory(value);
                return;

            default:
                break;
        }
    };

    return (
        <Wrapper component="div">
            <InputContainer>
                <WelcomeMessage variant="h1">
                    <FadeInAnimation>
                        <FadeIn>Know your destination</FadeIn>
                    </FadeInAnimation>
                </WelcomeMessage>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <CategoryForm
                        control={control}
                        fieldStore={fieldStore}

                        categories={categories}
                        currentCategory={currentCategory}
                        handleCategories={handleCategories}
                        handleForm={handleForm}
                        setCategory={setCategory}
                        setToValue={setToValue}
                        setToInputValue={setToInputValue}
                        setFromValue={setFromValue}
                        setFromInputValue={setFromInputValue}
                        // setSelected={setSelected}
                        setSwapping={setSwapping}
                        toValue={toValue}
                        toInputValue={toInputValue}
                        fromValue={fromValue}
                        fromInputValue={fromInputValue}
                        isSwapping={isSwapping}
                    />
                    &nbsp;
                    <Button
                        onClick={handleForm}
                        type="submit"
                        color="secondary"
                        variant="contained"
                        size="large"
                        disableElevation
                        disabled={
                            toValue === fromValue &&
                            toValue !== "" &&
                            fromValue !== "" &&
                            toValue !== null &&
                            fromValue !== null
                        }
                    >
                        GO
                    </Button>
                </div>
                <br/>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <SeeStories onClick={() => {
                        Router.push('/stories')
                    }} fullWidth={false} variant={'text'}>OR see all stories</SeeStories>
                </div>
            </InputContainer>
        </Wrapper>
    );
};

export default MainSection;
