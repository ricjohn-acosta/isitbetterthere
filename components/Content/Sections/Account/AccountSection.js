import React from "react";
import styled, { keyframes } from "styled-components";
import { Paper, Grid, Typography, Button } from "@material-ui/core";
import AccountTab from "./AccountTab";
import WorkIcon from "@material-ui/icons/Work";
import BusinessRoundedIcon from "@material-ui/icons/BusinessRounded";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import LocationOnRoundedIcon from "@material-ui/icons/LocationOnRounded";
import PrivacyDetails from "../NewAccount/PrivacyDetails";
import ContributionTab from "./ContributionTab";
import HelpfulStoriesTab from "./HelpfulStoriesTab";
import { editUser } from "../../../../store/actions/users";
import { connect } from "react-redux";

const Wrapper = styled.div`
  min-height: 110vh;
  background: linear-gradient(to top, white 75%, #f8f8f8 75%);
`;

const DashboardContainer = styled(Paper)`
  margin: 5% 15% 5% 15%;
  height: 50vh;
`;

const LeftGrid = styled(Grid)`
  padding: 0 50px 0 50px;
`;
const StyledImage = styled.img`
  height: auto;
  width: auto;
  max-width: 200px;
  max-height: 200px;
  border-radius: 50%;
  margin-top: 2.5vh;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-flow: column wrap;
  margin-top: 2.5vh;
`;

const StyledTypography = styled(Typography)`
  display: flex;
`;

const AccountSection = ({ session, user, editUser }) => {
  const [view, setView] = React.useState("settings");
  const [hideName, setHideName] = React.useState(false);
  const [hideEmail, setHideEmail] = React.useState(true);
  const [hideOccupation, setHideOccupation] = React.useState(false);
  const [hideCompany, setHideCompany] = React.useState(false);
  const [hideLocation, setHideLocation] = React.useState(false);

  const handleSubmit = () => {
    editUser({
      user_id: session.account.id,
      hide_name: hideName,
      hide_email: hideEmail,
      hide_occupation: hideOccupation,
      hide_company: hideCompany,
      hide_location: hideLocation,
    });
  };

  console.log(hideEmail)

  const renderView = () => {
    switch (view) {
      case "settings":
        return (
          <PrivacyDetails
            setHideName={setHideName}
            setHideEmail={setHideEmail}
            setHideOccupation={setHideOccupation}
            setHideCompany={setHideCompany}
            setHideLocation={setHideLocation}
            hideName={hideName}
            hideEmail={hideEmail}
            hideOccupation={hideOccupation}
            hideCompany={hideCompany}
            hideLocation={hideLocation}
          />
        );
        break;

      case "contributions":
        return <ContributionTab />;

      case "helpful-stories":
        return <HelpfulStoriesTab />;

      default:
        break;
    }
  };

  return (
    <Wrapper>
      <DashboardContainer elevation={0}>
        <Grid container direction={"row"}>
          <LeftGrid item xs={12} sm={3}>
            <ImageContainer>
              <StyledImage src={session.user.image}></StyledImage>
            </ImageContainer>
            <ProfileDetails>
              <StyledTypography
                style={{ display: "inline", textAlign: "center" }}
                variant="h5"
              >
                {session.user.name}
              </StyledTypography>
              <StyledTypography
                style={{ textAlign: "center" }}
                variant="subtitle1"
              >
                "{user.bio}"
              </StyledTypography>
              <br />
              <StyledTypography variant="subtitle2">
                <LocationOnRoundedIcon
                  style={{ color: "#1a8cff" }}
                  fontSize="small"
                />
                {user.location}
              </StyledTypography>
              <br />
              <StyledTypography variant="subtitle2">
                <EmailIcon style={{ color: "#1a8cff" }} fontSize="small" />
                {session.user.email}
              </StyledTypography>
              <br />
              <StyledTypography variant="subtitle2">
                <WorkIcon style={{ color: "#1a8cff" }} fontSize="small" />
                {user.occupation}
              </StyledTypography>
              {user.company !== "" ? (
                <>
                  <br />
                  <StyledTypography variant="subtitle2">
                    <BusinessRoundedIcon
                      style={{ color: "#1a8cff" }}
                      fontSize="small"
                    />
                    {user.company}
                  </StyledTypography>
                </>
              ) : null}
            </ProfileDetails>
          </LeftGrid>
          <Grid item xs={12} sm={9}>
            <AccountTab view={view} setView={setView} />
            <div>{renderView()}</div>
            {view === "settings" && (
              <Button style={{ float: "right" }} onClick={handleSubmit}>
                SUBMIT
              </Button>
            )}
          </Grid>
        </Grid>
      </DashboardContainer>
    </Wrapper>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    editUser: (userData) => dispatch(editUser(userData)),
  };
};

export default connect(null, mapDispatchToProps)(AccountSection);
