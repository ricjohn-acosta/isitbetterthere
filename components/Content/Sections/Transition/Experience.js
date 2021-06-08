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
import {IconButton} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import {rateExperience} from "../../../../store/actions/ratings";
import {connect, useDispatch} from "react-redux";
import {useSession} from "next-auth/client";
import ReportForm from "./ReportForm";
import SuccessDialog from "./SuccessDialog";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import {rateExperienceHelpful, rateExperienceUnhelpful} from "../../../../store/actions/experiences";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

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
    // if (!props.ratetype || (props.ratetype === 1 || props.ratetype === true)) {
    if (!props.ratetype || (props.ratetype === 'HELPED')) {
      // Check if no button has been clicked yet, use db data if so.
      if (
              // (props.ratetype === 1 || props.ratetype === true) &&
              (props.ratetype === 'HELPED') &&
              props.buttonClicked === ""
      ) {
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
    // if (!props.ratetype || (props.ratetype === 0 || props.ratetype === false)) {
    if (!props.ratetype || (props.ratetype === 'NOT_HELPED')) {
      // Check if no button has been clicked yet, use db data if so.
      if (
              // (props.ratetype === 0 || props.ratetype === false) &&
              (props.ratetype === 'NOT_HELPED') &&
              props.buttonClicked === ""
      ) {
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

const PopperContent = styled(Paper)`
  padding: 2.5%;
  background-color: #f5f5f5;
  width: 10vw;
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
                        // handleOptions,
                        setCurrentId,
                        hideName,
                        hideEmail,
                        hideCompany,
                        hideOccupation,
                        hideLocation,
                        // reportView,
                        // handleReportClose,
                        violationType,
                        handleViolationType,
                        handleReportSubmit,
                        reportedExperiences,
                        currentId,
                        hasReported,
                        handleReportSuccessClose,
                    }) => {
    const dispatch = useDispatch()

    const [session, loading] = useSession();
    const [buttonClicked, setButtonClicked] = React.useState("");
    const [rated, setRated] = React.useState(false);

    const [reportView, setReportView] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [clickAway, setClickaway] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();


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

    const handleRateHelpfulExperience = (userID, experienceID) => {
        dispatch(rateExperienceHelpful({userID, experienceID})).then(res => {
            console.log('rateExperienceHelpful', res)
        })
        setRated(true)
    }

    const handleRateUnhelpfulExperience = (userID, experienceID) => {
        dispatch(rateExperienceUnhelpful({userID, experienceID}))
        setRated(true)
    }

    const handleHelpful = () => {
        if (isRated && buttonClicked === "") {
            if (isRated.is_helpful === 1 || isRated.is_helpful === true) {
                return true;
            }
        }

        if (buttonClicked === "Liked") {
            return true;
        }
    };

    const handleNotHelpful = () => {
        if (isRated && buttonClicked === "") {
            if (isRated.is_helpful === 0 || isRated.is_helpful === false) {
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
        return isRated
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
                <Chip label={e} color={checkColor(i)}/>
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

    const handleReportOpen = () => {
        if (session) {
            setReportView(true);
        } else {
            router.push("/signup", undefined, {});
        }
    };

    const handleReportClose = () => {
        setReportView(false);
    };

    const handleOptions = (event) => {
        let target = event.currentTarget;
        let targetValue = event.currentTarget.value
        // setAnchorEl(event.currentTarget);
        setAnchorEl(target)
        setOpen((prev) => placement !== targetValue || !prev);
        // setPlacement(event.currentTarget.value);
        setPlacement(targetValue)
        setClickaway(false);
    };

    const handleClickaway = (e) => {
        if (

            e.target.id === "icon-button" ||
            e.target.parentElement.id === "icon-button-svg" ||
            e.target.id === "icon-button-svg" ||
            e.target.id === "icon-container"
        ) {
            setClickaway(false);
        } else {
            setOpen(false);
            setClickaway(true);
        }
    };

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
                                <MoreVertIcon id="icon-button-svg"/>
                            </IconButton>
                        </IconContainer>
                    )}
                    <ProfileDetails>
                        <StyledAvatar
                            src={
                                hideName === 1 || hideName === true
                                    ? "/user.png"
                                    : profilePicture
                            }
                        />
                        <UserInfoContainer>
                            <UserInfo>
                                <PersonIcon style={{color: "#1a8cff"}} fontSize="small"/>
                                &nbsp;{hideName === 1 || hideName === true ? "Anon" : name}
                                &nbsp;
                                {hideLocation === 1 || hideLocation === true ? null : (
                                    <>
                                        <LocationOnRoundedIcon
                                            style={{color: "#1a8cff"}}
                                            fontSize="small"
                                        />
                                        &nbsp;
                                        {location}
                                    </>
                                )}
                            </UserInfo>
                            {hideEmail === 1 || hideEmail === true ? null : (
                                <UserInfo>
                                    <EmailIcon style={{color: "#1a8cff"}} fontSize="small"/>
                                    &nbsp;{email}
                                </UserInfo>
                            )}
                            {isWhiteSpaceOrEmpty(position) ||
                            (isWhiteSpaceOrEmpty(company) ||
                            hideCompany === 1 ||
                            (hideCompany === true && hideOccupation === 1) ||
                            hideOccupation === true ? null : (
                                <UserInfo>
                                    <WorkIcon style={{color: "#1a8cff"}} fontSize="small"/>
                                    &nbsp;{renderJobDetails(position, company)}
                                </UserInfo>
                            ))}

                            <UserInfo>
                                <ChatBubbleIcon style={{color: "#1a8cff"}} fontSize="small"/>
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
                    <StyledHr/>
                    <HelpfulCount component="span" variant="caption">
                        {rated
                            ? "Thanks for rating!"
                            : helpfulCount + (helpfulCount === 1 ? ' person' : ' people') + " found this helpful"}
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
                                    // handleRating(e);
                                    handleRateHelpfulExperience(session.id, experienceId)
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
                                    handleRateUnhelpfulExperience(session.id, experienceId)
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
            <SuccessDialog
                hasReported={hasReported}
                handleReportSuccessClose={handleReportSuccessClose}
            />
            <Popper open={!!(open && !clickAway)} anchorEl={anchorEl}>
                <ClickAwayListener onClickAway={handleClickaway}>
                    <PopperContent>
                        <Button onClick={handleReportOpen} fullWidth>
                            Flag as inapproriate?
                        </Button>
                    </PopperContent>
                </ClickAwayListener>
            </Popper>
        </Wrapper>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        rateExperience: (rating) => dispatch(rateExperience(rating)),
    };
};

export default connect(null, mapDispatchToProps)(Experience);
