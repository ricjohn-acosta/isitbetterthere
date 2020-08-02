import styled, { keyframes } from "styled-components";
import { Paper, Grid, Typography, Button } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import moment from "moment";

const Wrapper = styled(Paper)`
  margin: 2.5% 20% 2.5% 20%;
`;

const TopContent = styled(Grid)`
  padding: 2.5% 2.5% 2% 2.5%;
  margin: 0 0 2.5% 0;
  background-color: #f0f0f0;
`;

const HelpedPeopleCount = styled(Grid)`
  text-align: end;
  ${(props) => props.theme.breakpoints.down("sm")} {
    text-align: start;
  }
`;
const BottomContent = styled(Grid)`
  padding: 2.5% 2.5% 1.5% 2.5%;
`;

const TransitionContainer = styled(Grid)``;

const Transition = styled(Typography)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: large;

  ${(props) => props.theme.breakpoints.down("md")} {
    font-size: 2em;
  }

  ${(props) => props.theme.breakpoints.down("sm")} {
    font-size: 1em;
  }
`;

const ReadButton = styled(Button)`
  float: right;
`;
const HelpfulStory = ({
  name,
  story,
  helpfulCount,
  from,
  to,
  hideName,
  datePosted,
}) => {
  const [modalView, setModalView] = React.useState(false);

  const handleOpen = () => {
    setModalView(true);
  };

  return (
    <Wrapper variant="outlined">
      {story === null ? (
        <NoData source={"HelpfulStory"}>USER DELETED THEIR STORY :(</NoData>
      ) : (
        <>
          <Grid container direction="row">
            <TopContent item container xs={12} sm={12}>
              <Grid item xs={12} sm={12} md={6}>
                <Typography variant="subtitle1">
                  <b>{hideName === 1 || hideName === true ? "Anon" : name}'s</b>{" "}
                  story from <b>{from}</b> to <b>{to}</b>
                </Typography>
              </Grid>
              <HelpedPeopleCount item xs={12} sm={12} md={6}>
                <Typography variant="subtitle1">
                  <b>{helpfulCount !== 0 ? helpfulCount - 1 : helpfulCount}</b>{" "}
                  other {helpfulCount - 1 === 1 ? "person" : "people"} found
                  this helpful
                </Typography>
                <Typography variant="subtitle1">
                  {" "}
                  {moment.unix(datePosted).format("DD MMM YYYY")}
                </Typography>
              </HelpedPeopleCount>
            </TopContent>
            <TransitionContainer item xs={12} sm={12}>
              <Transition variant="h5">test</Transition>
            </TransitionContainer>
            <BottomContent item xs={12} sm={12}>
              <ReadButton
                style={{ color: "white" }}
                disableElevation
                onClick={handleOpen}
                color="primary"
                variant="contained"
              >
                VIEW
              </ReadButton>
            </BottomContent>
          </Grid>
        </>
      )}
    </Wrapper>
  );
};

export default HelpfulStory;
