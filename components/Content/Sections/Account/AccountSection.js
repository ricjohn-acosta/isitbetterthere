import React, {useEffect, useMemo} from "react";
import styled from "styled-components";
import {Button, Grid, Paper, Typography} from "@material-ui/core";
import AccountTab from "./AccountTab";
import PrivacyDetails from "../NewAccount/PrivacyDetails";
import ContributionTab from "./ContributionTab";
import HelpfulStoriesTab from "./HelpfulStoriesTab";
import ReactImageFallback from "react-image-fallback";
import {editUser} from "../../../../store/actions/api/users";
import {connect, useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {useSession} from "next-auth/client";

import {BusinessRounded, Email, LocationOnRounded, Work} from "@material-ui/icons";
import {useForm} from "react-hook-form";
import Snackbar from "../../../UI/Notifications/Snackbar";
import {usePopup} from "../../../../hooks/ui/usePopup";


const Wrapper = styled.div`
  min-height: 110vh;
  background: linear-gradient(to top, white 75%, #f8f8f8 75%);
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

const AccountSection = () => {
    const {watch, control} = useForm({mode: "all"});
    const accountSectionFormObserver = watch()
    const accountSectionFormControl = control

    const router = useRouter();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.users.user)
    const [snackbarOpen, setSnackbarOpen, toggleSnackbar] = usePopup();

    const [session, loading] = useSession();
    const [view, setView] = React.useState("settings");

    const handleSubmit = () => {
        dispatch(editUser({
            user_id: session.id,
            hide_name: accountSectionFormObserver.hideName,
            hide_email: accountSectionFormObserver.hideEmail,
            hide_occupation: accountSectionFormObserver.hideOccupation,
            hide_company: accountSectionFormObserver.hideCompany,
            hide_location: accountSectionFormObserver.hideLocation,
        }));
        toggleSnackbar()
    };

    const tabContent = useMemo(() => {
        switch (router.query.tab) {
            case "settings":
                return (
                    <PrivacyDetails
                        formControl={accountSectionFormControl}
                        formObserver={accountSectionFormObserver}
                        source={"account"}
                    />
                );

            case "contributions":
                return <ContributionTab userContributions={userData && userData.my_stories}/>;

            case "helpful-stories":
                return (
                    <HelpfulStoriesTab helpfulContributions={userData && userData.helpful_stories}/>
                );

            default:
                return (
                    <PrivacyDetails
                        source={"account"}
                    />
                );
        }
    }, [userData, router])

    return (
        <Wrapper>
            <DashboardContainer elevation={0}>
                <Grid container direction={"row"}>
                    <LeftGrid item xs={12} sm={12} md={12} lg={3}>
                        <ImageContainer>
                            <StyledImage
                                src={session && session.picture}
                                fallbackImage="/userData.png"
                                alt={session && session.name}
                            />
                        </ImageContainer>
                        <ProfileDetails>
                            <NameContainer variant="h5">{session && session.name}</NameContainer>
                            <BioContainer style={{textAlign: "center"}} variant="subtitle1">
                                "{userData && userData.bio}"
                            </BioContainer>
                            <br/>
                            <StyledTypography variant="subtitle2">
                                <LocationOnRounded
                                    style={{color: "#1a8cff"}}
                                    fontSize="small"
                                />
                                {userData && userData.location}
                            </StyledTypography>
                            <br/>
                            <StyledTypography variant="subtitle2">
                                <Email style={{color: "#1a8cff"}} fontSize="small"/>
                                {session && session.email}
                            </StyledTypography>
                            <br/>
                            <StyledTypography variant="subtitle2">
                                <Work style={{color: "#1a8cff"}} fontSize="small"/>
                                {userData && userData.occupation}
                            </StyledTypography>
                            {userData && userData.company !== "" ? (
                                <>
                                    <br/>
                                    <StyledTypography variant="subtitle2">
                                        <BusinessRounded
                                            style={{color: "#1a8cff"}}
                                            fontSize="small"
                                        />
                                        {userData && userData.company}
                                    </StyledTypography>
                                </>
                            ) : null}
                        </ProfileDetails>
                    </LeftGrid>
                    <Grid item xs={12} sm={12} md={12} lg={9}>
                        <AccountTab view={view} setView={setView}/>
                        {tabContent}
                        {!router.query.hasOwnProperty("tab") ||
                        router.query.tab === "settings" ? (
                            <Button
                                color="primary"
                                variant="contained"
                                style={{float: "right", color: "white"}}
                                disableElevation
                                onClick={handleSubmit}
                            >
                                update
                            </Button>
                        ) : null}
                    </Grid>
                </Grid>
            </DashboardContainer>
            <Snackbar message={'Settings updated'} open={snackbarOpen} close={() => setSnackbarOpen(false)}/>
        </Wrapper>
    );
};

export default AccountSection;
