import React from "react";
import styled from "styled-components";
import LowerNavbar from "../components/Navigation/LowerNavbar";
import {Button, Grid, Paper, Typography} from "@material-ui/core";
import ReactImageFallback from "react-image-fallback";
import {ArrowForward, BusinessRounded, Email, LocationOnRounded, Work} from "@material-ui/icons";
import moment from "moment";
import Router, {useRouter} from "next/router";
import Link from 'next/link'
import draftToHtml from "draftjs-to-html";

const HtmlToReactParser = require("html-to-react").Parser;
const htmlToReactParser = new HtmlToReactParser();

const Wrapper = styled.div`
  min-height: 110vh;
  margin: 5% 15% 0 15%;
`;

const StyledHr = styled.hr`
  border: 0;
  height: 1px;
  background: rgb(207, 203, 203);
  background: radial-gradient(circle,
  rgba(207, 203, 203, 1) 50%,
  rgba(255, 255, 255, 1) 100%);
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

const UserView = ({user, userExperiences}) => {
    const router = useRouter();

    const [currentStory, setCurrentStory] = React.useState("");

    const handleCurrentStory = (storyID) => {
        router.push({
            pathname: `/user/${Router.router.query.id}`,
            query: {story: storyID},
        });
    };

    const displayStories = () => {
        const stories = userExperiences.map((experience) => {
            return (
                <>
                    <Grid container direction="row">
                        <LeftContent item xs={12} sm={7}>
                            <Transition variant="h5">
                                {experience.from} <ArrowForward fontSize="small"/>{" "}
                                {experience.to}{" "}
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
                                <br/>
                                <ButtonContainer>
                                    &nbsp;
                                    <Button
                                        style={{color: "white"}}
                                        color="primary"
                                        variant="contained"
                                        size="small"
                                        disableElevation
                                        onClick={() => {
                                            handleCurrentStory(experience._id);
                                        }}
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
        });

        return stories;
    };

    const displayStory = (storyID) => {
        const story = userExperiences.filter((e) => e._id === storyID);

        return htmlToReactParser.parse(draftToHtml(JSON.parse(story[0].story)));
    };

    return (
        <>
            <LowerNavbar/>
            <Wrapper>
        <span>
          <Typography variant="h5">
            <b>{user.name}'s</b> profile
          </Typography>
            {router.query.story && (
                <Link href={`/user/${router.query.id}`} passHref>
                    <Button
                        style={{float: "right"}}
                        color="primary"
                        variant="contained"
                    >
                        View profile
                    </Button>
                </Link>
            )}
        </span>
                <br/>
                <StyledHr/>
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
                            <BioContainer style={{textAlign: "center"}} variant="subtitle1">
                                "{user.bio}"
                            </BioContainer>
                            <br/>
                            <StyledTypography variant="subtitle2">
                                <LocationOnRounded
                                    style={{color: "#1a8cff"}}
                                    fontSize="small"
                                />
                                {user.location}
                            </StyledTypography>
                            <br/>
                            <StyledTypography variant="subtitle2">
                                <Email style={{color: "#1a8cff"}} fontSize="small"/>
                                {user.email}
                            </StyledTypography>
                            <br/>
                            <StyledTypography variant="subtitle2">
                                <Work style={{color: "#1a8cff"}} fontSize="small"/>
                                {user.occupation}
                            </StyledTypography>
                            {user.company !== "" ? (
                                <>
                                    <br/>
                                    <StyledTypography variant="subtitle2">
                                        <BusinessRounded
                                            style={{color: "#1a8cff"}}
                                            fontSize="small"
                                        />
                                        {user.company}
                                    </StyledTypography>
                                </>
                            ) : null}
                        </ProfileDetails>
                    </LeftGrid>
                    <RightGrid item xs={12} sm={12} md={12} lg={9}>
                        {router.query.story
                            ? displayStory(router.query.story)
                            : displayStories()}
                    </RightGrid>
                </Grid>
            </Wrapper>
        </>
    );
};

export default UserView;
