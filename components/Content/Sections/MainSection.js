import styled, { keyframes } from "styled-components";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import AutocompleteField from "./MainSection/AutocompleteField";
import IconButton from "@material-ui/core/IconButton";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import SwapVertIcon from "@material-ui/icons/SwapVert";
import { jobCategory } from "../../../lib/categories";
import { educationCategory } from "../../../lib/categories";

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

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  margin-top: 5vh
}
`;

const ImageContainer = styled(Grid)`
  padding-right: 50px;
`;

const MainSection = () => {
  const [categories, setCategory] = React.useState(jobCategory);
  const resizeInputForm = useMediaQuery("(max-width:730px)");
  const changeSwapIcon = useMediaQuery("(max-width:960px)");

  //750

  return (
    <Wrapper component="div">
      <Grid container direction="row">
        <InputContainer item xs={12} sm={12} md={12} lg={9} component="div">
          <WelcomeMessage variant="h1">
            <FadeInAnimation>Know your destination</FadeInAnimation>
          </WelcomeMessage>
          {/* <div style={{marginLeft: "30vw"}}>test</div> */}

          <InputForm>
            <div>Choose a category: &nbsp;</div>
            <br />
            <Select
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              value={categories}
              variant="standard"
            >
              <MenuItem value={jobCategory}>Careers</MenuItem>
              <MenuItem value={"asd"}>Jobs</MenuItem>
              <MenuItem value={educationCategory}>Tertiary Courses</MenuItem>
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
            <AutocompleteField
              variant="filled"
              label={"from"}
              categories={categories}
            />
            &nbsp;
            <div>
              {changeSwapIcon ? (
                <IconButton>
                  <SwapVertIcon fontSize="small" />
                </IconButton>
              ) : (
                <IconButton>
                  <SwapHorizIcon fontSize="small" />
                </IconButton>
              )}
            </div>
            &nbsp;
            <AutocompleteField
              variant="filled"
              label={"to"}
              categories={categories}
            />
            &nbsp;
            <Button
              color="secondary"
              variant="contained"
              size="large"
              disableElevation
            >
              GO
            </Button>
          </InputForm>
        </InputContainer>
        <ImageContainer item xs={12} sm={12} md={12} lg={3}>
          <StyledImage src="/decision.png"></StyledImage>
        </ImageContainer>
      </Grid>
    </Wrapper>
  );
};

export default MainSection;
