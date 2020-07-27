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
import ReportForm from "./ReportForm";
import SuccessDialog from "./SuccessDialog";
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
  color: black;
  background-color: ${(props) => {
    // Check if experience has been rated
    if (props.ratetype !== false) {
      // Check if no button has been clicked yet, use db data if so.
      if (props.ratetype === 1 && props.buttonClicked === "") {
        return "#CCFFCC";
      }

      // Handle color change when button is clicked
      if (props.buttonClicked === "Liked") {
        return "#CCFFCC";
      }
    }

    if (props.buttonClicked === "Liked") {
      return "#CCFFCC";
    }
  }};
`;

const UnhelpfulButton = styled(Button)`
  background-color: ${(props) => {
    // Check if experience has been rated
    if (props.ratetype !== false) {
      // Check if no button has been clicked yet, use db data if so.
      if (props.ratetype === 0 && props.buttonClicked === "") {
        return "#FF9999";
      }

      // Handle color change when button is clicked
      if (props.buttonClicked === "Disliked") {
        return "#FF9999";
      }
    }

    if (props.buttonClicked === "Disliked") {
      return "#FF9999";
    }
  }};
`;

const EditButton = styled(Button)`
  float: right;
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
  reportView,
  handleReportClose,
  violationType,
  handleViolationType,
  handleReportSubmit,
  reportedExperiences,
  currentId,
  hasReported,
  handleReportSuccessClose,
}) => {
  const [session, loading] = useSession();
  const [buttonClicked, setButtonClicked] = React.useState("");
  const [rated, setRated] = React.useState(false);

  const isWhiteSpaceOrEmpty = (input) => {
    return !/[^\s]/.test(input);
  };

  const handleButtonClicked = (e) => {
    if (e.currentTarget.value === "true") {
      setButtonClicked("Liked");
    } else {
      setButtonClicked("Disliked");
    }
  };

  const handleRating = (e) => {
    if (session) {
      rateExperience({
        user_id: session.id,
        experience_id: experienceId,
        is_helpful: e.currentTarget.value === "true" ? true : false,
        date_rated: Math.floor(Date.now() / 1000),
      });
      setRated(true);
    } else {
      Router.push("/signup", undefined, {});
    }
  };

  const handleHelpful = () => {
    if (isRated && buttonClicked === "") {
      if (isRated.is_helpful === 1) {
        return true;
      }
    }

    if (buttonClicked === "Liked") {
      return true;
    }
  };

  const handleNotHelpful = () => {
    if (isRated && buttonClicked === "") {
      if (isRated.is_helpful === 0) {
        return true;
      }
    }

    if (buttonClicked === "Disliked") {
      return true;
    }
  };

  const getSessionId = () => {
    return session ? session.id : false;
  };

  const getRateType = () => {
    return !isRated ? false : isRated.is_helpful;
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

    return chips.map((e, i) => (
      <React.Fragment key={i}>
        <Chip label={e} color={checkColor(i)} />
        &nbsp;
      </React.Fragment>
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

  console.log(getSessionId());
  return (
    <Wrapper id={"/" + experienceId} userId={userId} sessionId={getSessionId()}>
      <Grid container drection="column">
        <ProfileContainer item xs={12} sm={12} md={12}>
          {getSessionId() === userId ? null : (
            <IconContainer id="icon-container">
              <IconButton
                id="icon-button"
                value={experienceId}
                onClick={(e) => {
                  handleOptions(e);
                  setCurrentId(experienceId);
                }}
              >
                <MoreVertIcon id="icon-button-svg" />
              </IconButton>
            </IconContainer>
          )}
          <ProfileDetails>
            <StyledAvatar src={profilePicture} />
            <UserInfoContainer>
              <UserInfo>
                <PersonIcon style={{ color: "#1a8cff" }} fontSize="small" />
                &nbsp;{hideName === 1 || hideName === false ? "Anon" : name}&nbsp;
                {hideLocation === 1 || hideLocation === false ? null : (
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
              {hideEmail === 1 || hideEmail === false ? null : (
                <UserInfo>
                  <EmailIcon style={{ color: "#1a8cff" }} fontSize="small" />
                  &nbsp;{email}
                </UserInfo>
              )}
              {isWhiteSpaceOrEmpty(position) ||
                (isWhiteSpaceOrEmpty(company) ||
                (hideCompany === 1 || hideCompany === false && hideOccupation === 1 || hideOccupation === false) ? null : (
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
            Posted at {moment.unix(date_posted).format("DD MMM YYYY")}
          </Typography>
          <ChipsContainer>{renderChips()}</ChipsContainer>
        </ProfileContainer>
        <Content item xs={12} sm={12} md={12}>
          {experience}
          <StyledHr />
          <HelpfulCount component="span" variant="caption">
            {rated
              ? "Thanks for rating!"
              : helpfulCount + " people found this helpful"}
          </HelpfulCount>
          {getSessionId() === userId ? (
            <EditButton href="/account?tab=contributions" target="_blank">
              EDIT
            </EditButton>
          ) : (
            <ButtonGroup>
              <HelpfulButton
                ratetype={getRateType()}
                disabled={handleHelpful()}
                buttonClicked={buttonClicked}
                value="true"
                onClick={(e) => {
                  handleRating(e);
                  handleButtonClicked(e);
                }}
              >
                Helpful
              </HelpfulButton>
              <UnhelpfulButton
                ratetype={getRateType()}
                disabled={handleNotHelpful()}
                buttonClicked={buttonClicked}
                value="false"
                onClick={(e) => {
                  handleRating(e);
                  handleButtonClicked(e);
                }}
              >
                Not helpful
              </UnhelpfulButton>
            </ButtonGroup>
          )}
        </Content>
      </Grid>
      <ReportForm
        reportView={reportView}
        handleReportClose={handleReportClose}
        violationType={violationType}
        handleViolationType={handleViolationType}
        handleReportSubmit={handleReportSubmit}
        reportedExperiences={reportedExperiences}
        currentId={currentId}
        uid={session && session.id}
        eid={experienceId}
      />
      <SuccessDialog hasReported={hasReported} handleReportSuccessClose={handleReportSuccessClose}/>
    </Wrapper>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    rateExperience: (rating) => dispatch(rateExperience(rating)),
  };
};

export default connect(null, mapDispatchToProps)(Experience);
