import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Router from "next/router";
import WorkIcon from "@material-ui/icons/Work";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import LocationOnRoundedIcon from "@material-ui/icons/LocationOnRounded";
import { IconButton } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import { rateExperience } from "../../../../store/actions/ratings";
import { connect } from "react-redux";
import { useSession } from "next-auth/client";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";

const Wrapper = styled.div`
  min-height: 25vh;
  border: 0.5px solid;
  border-width: thin;
  border-color: #d6d6d6;
  background-color: ${(props) =>
    props.sessionId === props.userId ? "#F8F8F8" : "white"};
  padding: 2.5%;
`;

const ProfileContainer = styled(Grid)`
  margin-top: 5vh;
`;

const ProfileDetails = styled.div`
  display: flex;
`;

const UserInfoContainer = styled.div`
  margin-left: 2.5%;
  color: grey;
`;

const UserInfo = styled.div`
  display: flex;
`;

const ChipsContainer = styled.div`
  padding-top: 10px;
`;
const Content = styled(Grid)`
  margin-top: 2.5vh;
`;

const HelpfulButton = styled(Button)`
  background-color: ${(props) => {
    // Check if experience has been rated
    if (props.rateType) {
      // Check if button is helpful or not helpful
      return props.rateType.is_helpful === 1 ? "#CCFFCC" : "none";
    }
  }};
`;

const UnhelpfulButton = styled(Button)`
  background-color: ${(props) => {
    // Check if experience has been rated
    if (props.rateType) {
      // Check if button is helpful or not helpful
      return props.rateType.is_helpful === 0 ? "#FF6699" : "none";
    }
  }};
`;

const ButtonGroup = styled.div`
  float: right;
`;

const HelpfulCount = styled(Typography)`
  color: grey;
`;

const StyledHr = styled.hr`
  margin-top: 5vh;
  border: 0;
  height: 1px;
  background: #e0e0e0;
`;

const IconContainer = styled.div`
  float: right;
`;

const StyledAvatar = styled(Avatar)`
  margin-top: 5px;
`;

const Experience = ({
  experience,
  experienceId,
  userId,
  name,
  profilePicture,
  location,
  company,
  position,
  email,
  bio,
  fulfillment,
  easeOfTransition,
  regret,
  helpfulCount,
  date_posted,
  rateExperience,
  isRated,
  handleOptions,
  setCurrentId,
  hideName,
  hideEmail,
  hideCompany,
  hideOccupation,
  hideLocation,
}) => {
  const [session, loading] = useSession();
  const [rated, setRated] = React.useState(false);

  const isWhiteSpaceOrEmpty = (input) => {
    return !/[^\s]/.test(input);
  };

  const handleRating = (e) => {
    if (session) {
      rateExperience({
        user_id: session.account.id,
        experience_id: experienceId,
        is_helpful: e.currentTarget.value === "true" ? true : false,
        date_rated: Date.now()
      });
      setRated(true);
    } else {
      Router.push("/signup", undefined, {});
    }
  };

  const getSessionId = () => {
    return session ? session.account.id : false;
  };

  const renderJobDetails = (position, company) => {
    if (!isWhiteSpaceOrEmpty(position) && !isWhiteSpaceOrEmpty(company)) {
      if (hideOccupation === 1) {
        return company;
      } else if (hideCompany === 1) {
        return position;
      } else {
        return position + " at " + company;
      }
    }

    if (!isWhiteSpaceOrEmpty(position)) {
      return position;
    }

    if (!isWhiteSpaceOrEmpty(company)) {
      return company;
    }
  };

  const renderChips = () => {
    const chips = [fulfillment, easeOfTransition, regret];

    console.log(chips);
    return chips.map((e, i) => (
      <>
        <Chip label={e} color={checkColor(i)} />
        &nbsp;
      </>
    ));
  };

  const checkColor = (index) => {
    if (index === 0) {
      return "secondary";
    }

    if (index === 1) {
      return "primary";
    }

    if (index === 2) {
      return "default";
    }
  };

  return (
    <Wrapper id={"/" + experienceId} userId={userId} sessionId={getSessionId()}>
      {console.log(hideName)}
      <Grid container drection="column">
        <ProfileContainer item xs={12} sm={6} md={12}>
          <IconContainer id="icon-container">
            <IconButton
              id="icon-button"
              value={experienceId.toString()}
              onClick={(e) => {
                handleOptions(e);
                setCurrentId(experienceId.toString());
              }}
            >
              <MoreVertIcon id="icon-button-svg" />
            </IconButton>
          </IconContainer>
          <ProfileDetails>
            <StyledAvatar src={profilePicture} />
            <UserInfoContainer>
              <UserInfo>
                <PersonIcon style={{ color: "#1a8cff" }} fontSize="small" />
                &nbsp;{hideName === 1 ? "Anon" : name}&nbsp;
                {hideLocation === 1 ? null : (
                  <>
                    <LocationOnRoundedIcon
                      style={{ color: "#1a8cff" }}
                      fontSize="small"
                    />
                    &nbsp;
                    {location}
                  </>
                )}
              </UserInfo>
              {hideEmail === 1 ? null : (
                <UserInfo>
                  <EmailIcon style={{ color: "#1a8cff" }} fontSize="small" />
                  &nbsp;{email}
                </UserInfo>
              )}
              {isWhiteSpaceOrEmpty(position) ||
                (isWhiteSpaceOrEmpty(company) ||
                (hideCompany === 1 && hideOccupation === 1) ? null : (
                  <UserInfo>
                    <WorkIcon style={{ color: "#1a8cff" }} fontSize="small" />
                    &nbsp;{renderJobDetails(position, company)}
                  </UserInfo>
                ))}

              <UserInfo>
                <ChatBubbleIcon style={{ color: "#1a8cff" }} fontSize="small" />
                &nbsp;"{bio}"
              </UserInfo>
            </UserInfoContainer>
          </ProfileDetails>
          <Typography variant="caption">
            Posted at {moment(date_posted).format("DD MMM YYYY")}
          </Typography>
          <ChipsContainer>{renderChips()}</ChipsContainer>
        </ProfileContainer>
        <Content item xs={12} sm={6} md={12}>
          {experience}
          <StyledHr />
          <HelpfulCount component="span" variant="caption">
            {rated
              ? "Thanks for rating!"
              : helpfulCount + " people found this helpful"}
          </HelpfulCount>
          {console.log("israted", isRated)}
          <ButtonGroup>
            <HelpfulButton
              rateType={isRated}
              value="true"
              onClick={handleRating}
            >
              Helpful
            </HelpfulButton>
            <UnhelpfulButton
              rateType={isRated}
              value="false"
              onClick={handleRating}
            >
              Not helpful
            </UnhelpfulButton>
          </ButtonGroup>
        </Content>
      </Grid>
    </Wrapper>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    rateExperience: (rating) => dispatch(rateExperience(rating)),
  };
};

export default connect(null, mapDispatchToProps)(Experience);
