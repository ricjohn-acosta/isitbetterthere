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
import { careersCategory } from "../../../lib/categories";
import { educationCategory } from "../../../lib/categories";
import { jobCategory } from "../../../lib/categories";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { useEffect } from "react";

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

const InputForm = styled.div`
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
    margin-left: 30%;
  }
`;

const fadeInText = keyframes`
from {
    opacity: 0
  }

  to {
    opacity: 1;
  }
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
  const [categories, setCategory] = React.useState(careersCategory);
  const [toValue, setToValue] = React.useState(null);
  const [toInputValue, setToInputValue] = React.useState("");
  const [fromValue, setFromValue] = React.useState(null);
  const [fromInputValue, setFromInputValue] = React.useState("");
  const [isSelected, setSelected] = React.useState(false);
  const [isSwapping, setSwapping] = React.useState(false);
  const resizeInputForm = useMediaQuery("(max-width:730px)");
  const changeSwapIcon = useMediaQuery("(max-width:960px)");

  const options = categories.map((option) => {
    if (categories == careersCategory) {
      const firstLetter = option.category[0].toUpperCase();
      return {
        firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
        ...option,
      };
    }

    if (categories == educationCategory) {
      const firstLetter = option.field.toUpperCase();
      return {
        firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
        ...option,
      };
    }

    if (categories == jobCategory) {
      const firstLetter = option.field.toUpperCase();
      return {
        firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
        ...option,
      };
    }
  });

  return (
    <Wrapper component="div">
      <Grid container direction="row">
        <InputContainer item xs={12} sm={12} md={12} lg={9} component="div">
          <WelcomeMessage variant="h1">
            <FadeInAnimation>Know your destination</FadeInAnimation>
          </WelcomeMessage>
          {console.log("is selected? ", isSelected)}
          <InputForm>
            <div>Choose a category: &nbsp;</div>
            <br />
            <Select
              onChange={(e) => {
                setCategory(e.target.value);
                setSelected(true);
                setToValue(null);
                setFromValue(null);
                setToInputValue("");
                setFromInputValue("");
              }}
              onOpen={(e) => {
                setSelected(false);
              }}
              value={categories}
              variant="standard"
            >
              <MenuItem value={careersCategory}>Careers</MenuItem>
              <MenuItem value={jobCategory}>Jobs</MenuItem>
              <MenuItem value={educationCategory}>Tertiary Education</MenuItem>
              <MenuItem value={"uniCategory"}>Universities</MenuItem>
              <MenuItem value={"countryCategory"}>Countries</MenuItem>
              <MenuItem value={"cultureCategory"}>Cultures</MenuItem>
              <MenuItem value={"lifestyleCategory"}>Life Style</MenuItem>
            </Select>
            &nbsp;
            <div>
              <b>TRANSITION</b>
            </div>{" "}
            &nbsp;
            {/**
             * IF SWAPPING SHOW "FROM" FIELD AND IF NOT SHOW "TO" FIELD AND VICE-VERSA
             */}
            {/* {isSwapping ? (
              <Autocomplete
                options={options.sort(
                  (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
                )}
                groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => option.category}
                getOptionSelected={(option, value) =>
                  option.category === value.category
                }
                getOptionDisabled={(option) =>
                  option.category === fromInputValue
                }
                value={toValue}
                onChange={(event, newValue) => {
                  setToValue(newValue);
                }}
                inputValue={toInputValue}
                onInputChange={(event, newInputValue) => {
                  setToInputValue(newInputValue);
                }}
                style={{ width: 200 }}
                renderInput={(params) => (
                  <TextField {...params} label="to" variant="outlined" />
                )}
              />
            ) : (
              <Autocomplete
                options={options.sort(
                  (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
                )}
                groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => option.category}
                getOptionSelected={(option, value) =>
                  option.category === value.category
                }
                getOptionDisabled={(option) => option.category === toInputValue}
                value={fromValue}
                onChange={(event, newValue) => {
                  setFromValue(newValue);
                }}
                inputValue={fromInputValue}
                onInputChange={(event, newInputValue) => {
                  setFromInputValue(newInputValue);
                }}
                style={{ width: 200 }}
                renderInput={(params) => (
                  <TextField {...params} label="from" variant="outlined" />
                )}
              />
            )} */}
            <Autocomplete
              options={options.sort(
                (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
              )}
              groupBy={(option) => option.firstLetter}
              getOptionLabel={(option) => option.category}
              getOptionSelected={(option, value) =>
                option.category === value.category
              }
              getOptionDisabled={(option) =>
                !isSwapping
                  ? option.category === toInputValue
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
                >
                  <SwapHorizIcon fontSize="small" />
                </IconButton>
              )}
            </div>
            &nbsp;
            {/* {!isSwapping ? (
              <Autocomplete
                options={options.sort(
                  (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
                )}
                groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => option.category}
                getOptionSelected={(option, value) =>
                  option.category === value.category
                }
                getOptionDisabled={(option) =>
                  option.category === fromInputValue
                }
                value={toValue}
                onChange={(event, newValue) => {
                  setToValue(newValue);
                }}
                inputValue={toInputValue}
                onInputChange={(event, newInputValue) => {
                  setToInputValue(newInputValue);
                }}
                style={{ width: 200 }}
                renderInput={(params) => (
                  <TextField {...params} label="to" variant="outlined" />
                )}
              />
            ) : (
              <Autocomplete
                options={options.sort(
                  (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
                )}
                groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => option.category}
                getOptionSelected={(option, value) =>
                  option.category === value.category
                }
                getOptionDisabled={(option) => option.category === toInputValue}
                value={fromValue}
                onChange={(event, newValue) => {
                  setFromValue(newValue);
                }}
                inputValue={fromInputValue}
                onInputChange={(event, newInputValue) => {
                  setFromInputValue(newInputValue);
                }}
                style={{ width: 200 }}
                renderInput={(params) => (
                  <TextField {...params} label="from" variant="outlined" />
                )}
              />
            )} */}
            <Autocomplete
              options={options.sort(
                (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
              )}
              groupBy={(option) => option.firstLetter}
              getOptionLabel={(option) => option.category}
              getOptionSelected={(option, value) =>
                option.category === value.category
              }
              getOptionDisabled={(option) =>
                !isSwapping
                  ? option.category === fromInputValue
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
                />
              )}
            />
            &nbsp;
            <Button
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
