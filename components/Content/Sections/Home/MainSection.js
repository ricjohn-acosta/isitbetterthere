import styled, { keyframes } from "styled-components";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import SwapVertIcon from "@material-ui/icons/SwapVert";
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
import { options } from "../../../utils";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { useEffect } from "react";
import Router from "next/router";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  popper: { width: 400 },

  [theme.breakpoints.down("sm")]: {
    popper: { width: 250 },
  },
}));

const Wrapper = styled(Box)`
  background: rgb(144, 144, 209);
  background: linear-gradient(
    180deg,
    rgba(144, 144, 209, 1) 0%,
    rgba(255, 255, 255, 1) 0%,
    rgba(203, 246, 255, 1) 100%
  );
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
  const resizeInputForm = useMediaQuery("(max-width:730px)");
  const changeSwapIcon = useMediaQuery("(max-width:960px)");

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

  const fieldToString = (variable) => {
    return Object.keys(variable)[0];
  };

  const uniDirectionFrom = (option) => {
    console.log(option);
    if (fromInputValue === "YEAR 10" && fromInputValue !== "") {
      return option.level <= 10;
    }

    if (fromInputValue === "YEAR 11" && fromInputValue !== "") {
      return option.level < 11;
    }

    if (fromInputValue === "YEAR 12" && fromInputValue !== "") {
      return option.level < 12;
    }

    if (fromInputValue === "YEAR 13" && fromInputValue !== "") {
      return option.level < 13;
    }

    if (
      fromInputValue === "University" ||
      (fromInputValue === "Trades" && fromInputValue !== "")
    ) {
      return option.level < 14;
    }
  };

  const uniDirectionTo = (option) => {
    console.log(option);
    if (toInputValue === "YEAR 10" && toInputValue !== "") {
      return option.level > 10;
    }

    if (toInputValue === "YEAR 11" && toInputValue !== "") {
      return option.level > 11;
    }

    if (toInputValue === "YEAR 12" && toInputValue !== "") {
      return option.level > 12;
    }

    if (toInputValue === "YEAR 13" && toInputValue !== "") {
      return option.level > 13;
    }

    if (
      toInputValue === "University" ||
      (toInputValue === "Trades" && toInputValue !== "")
    ) {
      return option.level < 14;
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
          {console.log("is selected? ", isSelected)}
          <InputForm onSubmit={handleForm}>
            <div>Choose a category: &nbsp;</div>
            <br />
            <Select
              onChange={(e) => {
                // setCategory(e.target.value);
                handleCategories(e.target.value);
                setSelected(true);
                setToValue(null);
                setFromValue(null);
                setToInputValue("");
                setFromInputValue("");
              }}
              onOpen={(e) => {
                setSelected(false);
              }}
              value={currentCategory}
              variant="standard"
            >
              {/* <MenuItem value={secondaryEducationCategory}>
                Secondary Education
              </MenuItem>
              <MenuItem value={tertiaryEducationCategory}>
                Tertiary Education
              </MenuItem>
              <MenuItem value={uniCategory}>Universities</MenuItem>
              <MenuItem value={careersCategory}>Careers</MenuItem>
              <MenuItem value={jobCategory}>Jobs</MenuItem>
              <MenuItem value={countryCategory}>Countries</MenuItem>
              <MenuItem value={cultureCategory}>Cultures</MenuItem>
              <MenuItem value={lifeCategory}>Life</MenuItem> */}

              <MenuItem value={"secondaryEducation"}>
                Secondary Education
              </MenuItem>
              <MenuItem value={"tertiaryEducation"}>
                Tertiary Education
              </MenuItem>
              <MenuItem value={"universities"}>Universities</MenuItem>
              <MenuItem value={"careers"}>Careers</MenuItem>
              <MenuItem value={"jobs"}>Jobs</MenuItem>
              <MenuItem value={"countries"}>Countries</MenuItem>
              <MenuItem value={"cultures"}>Cultures</MenuItem>
              <MenuItem value={"life"}>Life</MenuItem>
            </Select>
            &nbsp;
            <div>
              <b>TRANSITION</b>
            </div>{" "}
            &nbsp;
            {/**
             * IF SWAPPING SHOW "FROM" FIELD AND IF NOT SHOW "TO" FIELD AND VICE-VERSA
             */}
            <Autocomplete
              classes={{
                paper: classes.popper,
              }}
              options={options(categories).sort(
                (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
              )}
              groupBy={(option) => option.firstLetter}
              getOptionLabel={(option) => option.category}
              getOptionSelected={(option, value) =>
                option.category === value.category
              }
              getOptionDisabled={(option) =>
                !isSwapping
                  ? option.category === toInputValue || uniDirectionTo(option)
                  : option.category === fromInputValue
              }
              value={isSwapping ? toValue : fromValue}
              onChange={(event, newValue) => {
                isSwapping ? setToValue(newValue) : setFromValue(newValue);
              }}
              inputValue={isSwapping ? toInputValue : fromInputValue}
              onInputChange={(event, newInputValue) => {
                isSwapping
                  ? setToInputValue(newInputValue)
                  : setFromInputValue(newInputValue);
              }}
              style={{ width: 200 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={isSwapping ? "to" : "from"}
                  variant="outlined"
                  error={isEmptyField}
                  helperText={
                    isEmptyField ? "Please don't leave these blank :)" : null
                  }
                />
              )}
            />
            &nbsp;
            <div>
              {changeSwapIcon ? (
                <IconButton
                  onClick={() => {
                    setFromValue(toValue);
                    setToValue(fromValue);
                    setFromInputValue(toInputValue);
                    setToInputValue(fromInputValue);
                    setSwapping(!isSwapping);
                  }}
                  disabled={currentCategory === "secondaryEducation"}
                >
                  <SwapVertIcon fontSize="small" />
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => {
                    setFromValue(toValue);
                    setToValue(fromValue);
                    setFromInputValue(toInputValue);
                    setToInputValue(fromInputValue);
                    setSwapping(!isSwapping);
                  }}
                  disabled={currentCategory === "secondaryEducation"}
                >
                  <SwapHorizIcon fontSize="small" />
                </IconButton>
              )}
            </div>
            &nbsp;
            <Autocomplete
              classes={{
                paper: classes.popper,
              }}
              options={options(categories).sort(
                (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
              )}
              groupBy={(option) => option.firstLetter}
              getOptionLabel={(option) => option.category}
              getOptionSelected={(option, value) =>
                option.category === value.category
              }
              getOptionDisabled={(option) =>
                !isSwapping
                  ? option.category === fromInputValue ||
                    uniDirectionFrom(option)
                  : option.category === toInputValue
              }
              value={!isSwapping ? toValue : fromValue}
              onChange={(event, newValue) => {
                !isSwapping ? setToValue(newValue) : setFromValue(newValue);
              }}
              inputValue={!isSwapping ? toInputValue : fromInputValue}
              onInputChange={(event, newInputValue) => {
                !isSwapping
                  ? setToInputValue(newInputValue)
                  : setFromInputValue(newInputValue);
              }}
              style={{ width: 200 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={!isSwapping ? "to" : "from"}
                  variant="outlined"
                  error={isEmptyField}
                  helperText={
                    isEmptyField ? "Please don't leave these blank :)" : null
                  }
                />
              )}
            />
            &nbsp;
            <Button
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
                  ? true
                  : false
              }
            >
              GO
            </Button>
          </InputForm>
        </InputContainer>
        <ImageContainer item xs={12} sm={12} md={12} lg={3}>
          <img
            style={{ width: "100%", height: "100%", marginTop: "5vh" }}
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
