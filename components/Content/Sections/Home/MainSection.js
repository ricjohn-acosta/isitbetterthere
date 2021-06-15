import styled, {keyframes} from "styled-components";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import {
    careersCategory,
    tertiaryEducationCategory,
    jobCategory,
    uniCategory,
    countryCategory,
    cultureCategory,
    lifeCategory,
    secondaryEducationCategory,
} from "../../../../lib/categories";
import Router from "next/router";
import {makeStyles} from "@material-ui/core/styles";
import CategoryForm from "./CategoryForm";
import Link from 'next/link'
import Button from "@material-ui/core/Button";


const useStyles = makeStyles((theme) => ({
    popper: {width: 400},

    [theme.breakpoints.down("sm")]: {
        popper: {width: 250},
    },
}));

const Wrapper = styled(Box)`
  background: rgb(144, 144, 209);
  background: linear-gradient(180deg,
  rgba(144, 144, 209, 1) 0%,
  rgba(255, 255, 255, 1) 0%,
  rgba(203, 246, 255, 1) 100%);
  min-height: 70vh;
  padding-top: 10vh;
  overflow: hidden;

  ${(props) => props.theme.breakpoints.down("sm")} {
    padding-top: 20vh;
  }
`;

const InputContainer = styled(Grid)`
  height: 100%;
  width: 100%;
`;

const InputForm = styled.form`
  ${(props) => props.theme.breakpoints.down("sm")} {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  ${(props) => props.theme.breakpoints.up("md")} {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 0%;
  }

  ${(props) => props.theme.breakpoints.up("lg")} {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 33.5%;
  }
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
  margin-bottom: 10vh;
  margin-left: 25vw;

  ${(props) => props.theme.breakpoints.down("md")} {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.2rem;
    margin-left: 1vw;
  }

  ${(props) => props.theme.breakpoints.between("1287", "1870")} {
    font-size: 4rem;
  }

  ${(props) => props.theme.breakpoints.between("sm", "1287")} {
    font-size: 2.2rem;
  }
`;

const SeeStories = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10vh;
  margin-left: 28vw;

  
  ${(props) => props.theme.breakpoints.down(1280)} {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 0;
  }

  ${(props) => props.theme.breakpoints.down(960)} {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 0;
  }
`;

const ImageContainer = styled(Grid)`
  padding-right: 50px;
`;

const MainSection = () => {
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
    const downMD = useMediaQuery("(max-width:959px)");

    const handleForm = (e) => {
        e.preventDefault();
        if (fromValue === null || toValue === null) {
            setEmptyFields(true);
            return console.log("ERROR");
        } else {
            Router.push({
                pathname: "/transition",
                query: {
                    category: currentCategory,
                    from: fromInputValue,
                    to: toInputValue,
                    page: 1,
                },
            });
            setEmptyFields(false);
            return console.log("NO ERROR");
        }
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
            <Grid container direction="row">
                <InputContainer item xs={12} sm={12} md={12} lg={9} component="div">
                    <WelcomeMessage variant="h1">
                        <FadeInAnimation>
                            <FadeIn>Know your destination</FadeIn>
                        </FadeInAnimation>
                    </WelcomeMessage>
                    <CategoryForm
                        categories={categories}
                        currentCategory={currentCategory}
                        handleCategories={handleCategories}
                        handleForm={handleForm}
                        setCategory={setCategory}
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
                    <br/>
                    <Link href={"/stories"} passHref>
                        <SeeStories fullWidth={false} variant={'text'}>OR see all stories</SeeStories>
                    </Link>
                </InputContainer>
                <ImageContainer item xs={12} sm={12} md={12} lg={3}>
                    <img
                        style={{width: "100%", height: "100%", marginTop: "5vh"}}
                        src="/decision.png"
                    />
                </ImageContainer>
                {console.log("TO VALUE, ", toValue, toInputValue)}
                {console.log("FROM VALUE, ", fromValue, fromInputValue)}
            </Grid>
        </Wrapper>
    );
};

export default MainSection;
