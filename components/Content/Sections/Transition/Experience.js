import React, {useEffect} from "react";
import styled from "styled-components";
import {Avatar, Button, Chip, ClickAwayListener, Grid, IconButton, Paper, Popper, Typography} from "@material-ui/core";
import {useRouter} from "next/router";
import {ChatBubble, Email, LocationOnRounded, MoreVert, Person, Work} from "@material-ui/icons";
import moment from "moment";
import {rateExperience} from "../../../../store/actions/ratings";
import {connect, useDispatch} from "react-redux";
import {useSession} from "next-auth/client";
import ReportForm from "./ReportForm";
import {
    rateExperienceHelpful,
    rateExperienceUnhelpful,
    reportExperience
} from "../../../../store/actions/api/experiences";
import {useDialog} from "../../../../hooks/ui/useDialog";
import {AlertDialog} from "../../../UI/Notifications/AlertDialog";

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
    '&:hover {background: red}'
    // Check if experience has been rated
    if (!props.ratetype || (props.ratetype === 'HELPED')) {
      // Check if no button has been clicked yet, use db data if so.
      if (
              // (props.ratetype === 1 || props.ratetype === true) &&
              (props.ratetype === 'HELPED') &&
              props.buttonClicked
      ) {
        return "#CCFFCC";
      }

      // Handle color change when button is clicked
      if (props.buttonClicked) {
        return "#CCFFCC";
      }
    }

    if (props.buttonClicked) {
      return "#CCFFCC";
    }
  }};
`;

const UnhelpfulButton = styled(Button)`
  background-color: ${(props) => {
    // Check if experience has been rated
    if (!props.ratetype || (props.ratetype === 'NOT_HELPED')) {
      // Check if no button has been clicked yet, use db data if so.
      if (
              // (props.ratetype === 0 || props.ratetype === false) &&
              (props.ratetype === 'NOT_HELPED') &&
              props.buttonClicked
      ) {
        return "#FF9999";
      }

      // Handle color change when button is clicked
      if (props.buttonClicked) {
        return "#FF9999";
      }
    }

    if (props.buttonClicked) {
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
                        // violationType,
                        // handleViolationType,
                        // handleReportSubmit,
                        reportedExperiences,
                        currentId,
                        cachedExperiences,
                        setCachedExperiences
                        // hasReported,
                        // handleReportSuccessClose,
                    }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const [dialogOpen, setDialogOpen, toggleDialog] = useDialog();

    const [session, loading] = useSession();
    const [clickedHelpful, setHelpfulClick] = React.useState(null);
    const [clickedUnhelpful, setUnhelpfulClick] = React.useState(null);
    const [rated, setRated] = React.useState(false);

    const [reportView, setReportView] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [clickAway, setClickaway] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();
    const [hasReported, setHasReported] = React.useState(false);
    const [violationType, setViolationType] = React.useState("");

    useEffect(() => {
        setHelpfulClick(isRated === 'HELPED')
        setUnhelpfulClick(isRated === 'NOT_HELPED')
    }, [isRated])

    const isWhiteSpaceOrEmpty = (input) => {
        return !/[^\s]/.test(input);
    };

    const handleHelpfulClick = () => {
        setHelpfulClick(!clickedHelpful)
        setUnhelpfulClick(false)
    }

    const handleUnhelpfulClick = () => {
        setUnhelpfulClick(!clickedUnhelpful)
        setHelpfulClick(false)
    }

    const handleRateHelpfulExperience = (userID, experienceID) => {
        dispatch(rateExperienceHelpful({userID, experienceID})).then(res => {})
        setRated(true)
    }

    const handleRateUnhelpfulExperience = (userID, experienceID) => {
        dispatch(rateExperienceUnhelpful({userID, experienceID}))
        setRated(true)
    }

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

    const handleReportSubmit = () => {
        dispatch(reportExperience({
            reported_by: session.id,
            experience_id: currentId,
            violation_type: violationType,
            date_reported: Math.floor(Date.now() / 1000),
            content: experience[0].props.children,
        }))
        setCachedExperiences((prevCachedExperiences) => {
            const newCachedExperiences = prevCachedExperiences.filter(e => {
                return e._id !== experienceId
            })

            console.log(newCachedExperiences)
            return newCachedExperiences
        })
        setHasReported(true)
        toggleDialog()
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

    const handleViolationType = (e) => {
        setViolationType(e.target.value);
    };

    const handleReportSuccessClose = () => {
        setHasReported(false)
    }

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
                                <MoreVert id="icon-button-svg"/>
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
                                <Person style={{color: "#1a8cff"}} fontSize="small"/>
                                &nbsp;{hideName === 1 || hideName === true ? "Anon" : name}
                                &nbsp;
                                {hideLocation === 1 || hideLocation === true ? null : (
                                    <>
                                        <LocationOnRounded
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
                                    <Email style={{color: "#1a8cff"}} fontSize="small"/>
                                    &nbsp;{email}
                                </UserInfo>
                            )}
                            {isWhiteSpaceOrEmpty(position) ||
                            (isWhiteSpaceOrEmpty(company) ||
                            hideCompany === 1 ||
                            (hideCompany === true && hideOccupation === 1) ||
                            hideOccupation === true ? null : (
                                <UserInfo>
                                    <Work style={{color: "#1a8cff"}} fontSize="small"/>
                                    &nbsp;{renderJobDetails(position, company)}
                                </UserInfo>
                            ))}

                            <UserInfo>
                                <ChatBubble style={{color: "#1a8cff"}} fontSize="small"/>
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
                        {/*{rated*/}
                        {/*    ? "Thanks for rating!"*/}
                        {/*    : helpfulCount + (helpfulCount === 1 ? ' person' : ' people') + " found this helpful"}*/}
                        {helpfulCount + (helpfulCount === 1 ? ' person' : ' people') + " found this helpful"}
                    </HelpfulCount>
                    {getSessionId() === userId ? (
                        <EditButton href="/account?tab=contributions" target="_blank">
                            EDIT
                        </EditButton>
                    ) : (
                        <ButtonGroup>
                            <HelpfulButton
                                ratetype={getRateType()}
                                // disabled={handleHelpful()}
                                buttonClicked={clickedHelpful}
                                value="true"
                                onClick={(e) => {
                                    handleRateHelpfulExperience(session.id, experienceId)
                                    handleHelpfulClick()
                                }}
                            >
                                Helpful
                            </HelpfulButton>
                            <UnhelpfulButton
                                ratetype={getRateType()}
                                // disabled={handleNotHelpful()}
                                buttonClicked={clickedUnhelpful}
                                value="false"
                                onClick={(e) => {
                                    handleRateUnhelpfulExperience(session.id, experienceId)
                                    handleUnhelpfulClick()
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
            {/*<SuccessDialog*/}
            {/*    open={dialogOpen}*/}
            {/*    close={() => setDialogOpen(false)}*/}
            {/*    // hasReported={hasReported}*/}
            {/*    // handleReportSuccessClose={handleReportSuccessClose}*/}
            {/*/>*/}
            <AlertDialog open={dialogOpen}
                         close={() => setDialogOpen(false)}
                         title={'Your report has been sent.'}
                         body={<>
                             Thanks for submitting a report. We will take a look at your report as swiftly as we can and
                             take the appropriate action.
                         </>}
                         actions={[
                             {action: 'Close', handler: () => setDialogOpen(false)}]}/>
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
