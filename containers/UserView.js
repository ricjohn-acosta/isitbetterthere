import React, {useEffect} from 'react';
import styled from "styled-components";
import LowerNavbar from "../components/Navigation/LowerNavbar";
import { Paper, Grid, Typography, Button } from "@material-ui/core";
import ReactImageFallback from "react-image-fallback";
import LocationOnRoundedIcon from "@material-ui/icons/LocationOnRounded";
import EmailIcon from "@material-ui/icons/Email";
import WorkIcon from "@material-ui/icons/Work";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import moment from "moment";
import Router from "next/router";
import { useRouter } from 'next/router'


const Wrapper = styled.div`
  min-height: 110vh;
  margin: 5% 15% 0 15%;
`;

const StyledHr = styled.hr`
  border: 0;
  height: 1px;
  background: rgb(207, 203, 203);
  background: radial-gradient(
    circle,
    rgba(207, 203, 203, 1) 50%,
    rgba(255, 255, 255, 1) 100%
  );
`;

const DashboardContainer = styled(Paper)`
  margin: 5% 15% 5% 15%;
  overflow: hidden;
  ${(props) => props.theme.breakpoints.down(441)} {
    margin: 0;
  }
`;

const LeftGrid = styled(Grid)`
  padding: 0 50px 0 50px;
  ${(props) => props.theme.breakpoints.down(441)} {
    padding: 0 5px 0 5px;
  }
`;

const RightGrid = styled(Grid)`
  padding: 5%;
`;
const StyledImage = styled(ReactImageFallback)`
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

const NameContainer = styled(Typography)`
  display: inline;
  text-align: center;
`;
const BioContainer = styled(Typography)`
  text-align: center;
`;

const RightContent = styled(Grid)`
  text-align: right;
  background-color: #f0f0f0;
`;

const LeftContent = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

const Transition = styled(Typography)`
  font-size: large;

  ${(props) => props.theme.breakpoints.down("sm")} {
    font-size: 1em;
  }
`;

const ContributionDetails = styled.div`
  padding: 2.5%;
`;

const ButtonContainer = styled.div`
  display: flex;
  float: right;
  padding: 5px;
`;

const UserView = ({ user, userExperiences }) => {
  
  const router = useRouter()

  const [currentStory, setCurrentStory] = React.useState('')

  const handleCurrentStory = (event, storyID) => {
    event.preventDefault();
    router.push({pathname: `/user/${Router.router.query.id}`, query: {story:storyID}})
  };

  console.log(Router)

  return (
    <>
      <LowerNavbar />
      <Wrapper>
        <Typography variant="h5">
          Viewing <b>{user.name}'s</b> profile
        </Typography>
        <br />
        <StyledHr />
        <Grid container direction={"row"}>
          <LeftGrid item xs={12} sm={12} md={12} lg={3}>
            <ImageContainer>
              <StyledImage
                src={user.profile_picture}
                fallbackImage="/user.png"
                alt={user.name}
              />
            </ImageContainer>
            <ProfileDetails>
              <NameContainer variant="h5">{user.name}</NameContainer>
              <BioContainer style={{ textAlign: "center" }} variant="subtitle1">
                "{user.bio}"
              </BioContainer>
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
                {user.email}
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
          <RightGrid item xs={12} sm={12} md={12} lg={9}>
            {console.log(userExperiences)}
            {userExperiences.map((experience) => {
              return (
                <>
                  <Grid container direction="row">
                    <LeftContent item xs={12} sm={7}>
                      <Transition variant="h5">
                        {experience.from} <ArrowForwardIcon fontSize="small" /> {experience.to}{" "}
                      </Transition>
                    </LeftContent>
                    <RightContent item xs={12} sm={5}>
                      <ContributionDetails>
                        <Typography variant="body2">
                          {moment.unix(experience.date_posted).format("DD MMM YYYY")}
                        </Typography>
                        <Typography variant="body2">
                          <b>{experience.helpful}</b>{" "}
                          {experience.helpful === 1 ? "user" : "users"} found this
                          helpful
                        </Typography>
                        <br />
                        <ButtonContainer>
                          &nbsp;
                          <Button
                            style={{ color: "white" }}
                            color="primary"
                            variant="contained"
                            size="small"
                            disableElevation
                            onClick={() => {handleCurrentStory(event, experience.id)}}
                          >
                            VIEW STORY
                          </Button>
                        </ButtonContainer>
                      </ContributionDetails>
                    </RightContent>
                  </Grid>
                  <br/>
                </>
              );
            })}
          </RightGrid>
        </Grid>
      </Wrapper>
    </>
  );
};

export default UserView;
