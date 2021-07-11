import styled from "styled-components";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Experience from "./Experience";
import SearchTools from "./SearchTools";
import Button from "@material-ui/core/Button";
import SearchToolsMobile from "./SearchToolsMobile";
import draftToHtml from "draftjs-to-html";
import NoData from "./common/NoData";
import {useRouter} from "next/router";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import PaginationLink from "./PaginationLink";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import {connect, useDispatch, useSelector} from "react-redux";
import {useSession} from "next-auth/client";
import Link from "next/link";
import {reportExperience} from "../../../../store/actions/api/experiences";
import {useEffect} from "react";

const HtmlToReactParser = require("html-to-react").Parser;
const htmlToReactParser = new HtmlToReactParser();

const Wrapper = styled.div`
  min-height: 80vh;
  padding: 5% 5% 5% 5%;
  margin-top: 2.5%;
  background-color: #e6f2ff;

  ${(props) => props.theme.breakpoints.down("md")} {
  }
`;

const SectionHeader = styled.div`
  display: inline-flex;
`;

const SectionTitle = styled(Typography)`
  padding-top: 10px;
  font-weight: bold;
`;

const ExperienceIcon = styled.img`
  height: auto;
  width: auto;
  max-width: 50px;
  max-height: 50px;
  margin-right: 10px;
`;

const ExperienceContainer = styled(Paper)`
  margin: 0 0 0 4.5vw;
  padding: 5% 8.5% 8.5% 8.5%;
  min-height: 50vh;
  max-width: 50vw;

  ${(props) => props.theme.breakpoints.down("md")} {
    max-width: 100vw;
    padding: 5% 6.5% 8.5% 6.5%;
    margin: 0;
  }
`;

const SearchToolsContainer = styled.div`
  margin: 10.5vh 50px 0 50px;
  min-height: 25vh;
  max-width: 50vw;
  padding: 8.5%;
`;

const ShareExperienceBtnContainer = styled.div`
  margin: 5vh 4.5vw 1vh 4.5vw;

  ${(props) => props.theme.breakpoints.down("md")} {
    margin: 5vh 0 0 0;
  }
`;

const ShareExperienceBtn = styled(Button)`
  margin-bottom: 10px;
`;

const SearchToolsMobileContainer = styled(SearchToolsMobile)``;

const PaginationWrapper = styled(Pagination)`
  float: right;
  margin-right: 5vw;
  margin-top: 2.5vh;
`;

const PopperContent = styled(Paper)`
  padding: 2.5%;
  background-color: #f5f5f5;
  width: 10vw;
`;

const ExperienceSection = ({
                               experiences,
                               totalExperiences,
                           }) => {
    const router = useRouter();
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.users.user)

    const isSM = useMediaQuery("(max-width:600px)");
    const isMD = useMediaQuery("(max-width:1199px)");
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [clickAway, setClickaway] = React.useState(false);
    const [currentId, setCurrentId] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();
    // const [reportView, setReportView] = React.useState(false);
    // const [violationType, setViolationType] = React.useState("");
    // const [hasReported, setHasReported] = React.useState(false);
    const [session, loading] = useSession();
    const [cachedExperiences, setCachedExperiences] = React.useState(null)

    useEffect(() => {
        if (!experiences || !userData) return
        const validExperiences = experiences.filter((experience) => {
            return userData.reported_stories.find(rs => rs.experience_id === experience._id && rs.reported_by === userData.uid) === undefined
        })

        setCachedExperiences(validExperiences)
    }, [experiences, userData])
    // const handleOptions = (event) => {
    //     let target = event.currentTarget;
    //     let targetValue = event.currentTarget.value
    //     // setAnchorEl(event.currentTarget);
    //     setAnchorEl(target)
    //     setOpen((prev) => placement !== targetValue || !prev);
    //     // setPlacement(event.currentTarget.value);
    //     setPlacement(targetValue)
    //     setClickaway(false);
    // };
    //
    // const handleClickaway = (e) => {
    //     if (
    //         e.srcElement.id === "icon-button" ||
    //         e.srcElement.parentElement.id === "icon-button-svg" ||
    //         e.srcElement.id === "icon-button-svg" ||
    //         e.srcElement.id === "icon-container"
    //     ) {
    //         setClickaway(false);
    //     } else {
    //         setOpen(false);
    //         setClickaway(true);
    //     }
    // };

    // const handleReportOpen = () => {
    //     if (session) {
    //         setReportView(true);
    //     } else {
    //         router.push("/signup", undefined, {});
    //     }
    // };
    //
    // const handleReportClose = () => {
    //     setReportView(false);
    // };

    // const handleReportSuccessClose = () => {
    //     setHasReported(false)
    // }

    // const handleViolationType = (e) => {
    //     setViolationType(e.target.value);
    // };

    const getStoryRating = (story) => {
        if (!session) return null

        if (story.users_helped.includes(session.id)) {
            return 'HELPED'
        } else if (story.users_notHelped.includes(session.id)) {
            return 'NOT_HELPED'
        }
    }

    const displayExperiences = () => {
        if (!cachedExperiences) return <NoData/>

        return (
            <>
                {cachedExperiences.length === 0 ? (
                    <>
                        <NoData/>
                    </>
                ) : (
                    cachedExperiences.map((e, i) => (
                        <React.Fragment key={i}>
                            <Experience
                                key={i}
                                experienceId={e._id}
                                userId={e.uid}
                                name={e.user[0].name}
                                profilePicture={e.user[0].profile_picture}
                                location={e.user[0].location}
                                email={e.user[0].email}
                                position={e.user[0].position}
                                company={e.user[0].company}
                                bio={e.user[0].bio}
                                fulfillment={e.fulfillment}
                                easeOfTransition={e.ease_of_transition}
                                regret={e.regret}
                                experience={convertToReact(e.story)}
                                helpfulCount={e.helpful}
                                date_posted={e.date_posted}
                                isRated={
                                    getStoryRating(e)
                                }
                                // handleOptions={handleOptions}
                                setCurrentId={setCurrentId}
                                hideName={e.hide_name}
                                hideEmail={e.hide_email}
                                hideCompany={e.hide_company}
                                hideOccupation={e.hide_occupation}
                                hideLocation={e.hide_location}
                                // reportView={reportView}
                                // handleReportClose={handleReportClose}
                                // violationType={violationType}
                                // handleViolationType={handleViolationType}
                                // handleReportSubmit={handleReportSubmit}
                                reportedExperiences={null} //todo
                                currentId={currentId}
                                uid={session && session.id}
                                cachedExperiences={cachedExperiences}
                                setCachedExperiences={setCachedExperiences}
                                // hasReported={hasReported}
                                // handleReportSuccessClose={handleReportSuccessClose}
                            />
                            <br/>
                        </React.Fragment>
                    ))
                )}
            </>
        );
    };

    const convertToReact = (story) => {
        return htmlToReactParser.parse(draftToHtml(JSON.parse(story)));
    };

    return (
        <Wrapper>
            <SectionHeader>
                <ExperienceIcon src="/experience.png"/>
                <SectionTitle variant="h4">People's experiences</SectionTitle>
            </SectionHeader>
            <Grid container direction="row">
                <Grid item xs={12} sm={12} md={isMD ? 12 : 8}>
                    <ShareExperienceBtnContainer>
                        <Link href='/share' passHref>
                            <ShareExperienceBtn
                                disableRipple
                                disableElevation
                                variant="contained"
                            >
                                Share your experience
                            </ShareExperienceBtn>
                        </Link>
                        {isMD ? <SearchToolsMobileContainer/> : null}
                    </ShareExperienceBtnContainer>
                    <ExperienceContainer>{displayExperiences()}</ExperienceContainer>
                    {cachedExperiences && cachedExperiences.length !== 0 ? (
                        <PaginationWrapper
                            page={parseInt(router.query.page)}
                            count={
                                router.query.filterBy === "none" ||
                                !router.query.hasOwnProperty("filterBy")
                                    ? Math.ceil(totalExperiences / 5)
                                    : Math.ceil(cachedExperiences.length / 5)
                            }
                            renderItem={(item) => (
                                <PaginationItem
                                    component={PaginationLink}
                                    query={router.query}
                                    item={item}
                                    {...item}
                                />
                            )}
                        />
                    ) : null}
                </Grid>
                {isMD ? null : (
                    <Grid item xs={12} sm={12} md={3}>
                        <SearchToolsContainer>
                            <Typography variant="h4">Search tools</Typography>
                            <SearchTools/>
                        </SearchToolsContainer>
                    </Grid>
                )}
            </Grid>
            {/*<Popper open={open && !clickAway ? true : false} anchorEl={anchorEl}>*/}
            {/*    <ClickAwayListener onClickAway={handleClickaway}>*/}
            {/*        <PopperContent>*/}
            {/*            <Button onClick={handleReportOpen} fullWidth>*/}
            {/*                Flag as inapproriate?*/}
            {/*            </Button>*/}
            {/*        </PopperContent>*/}
            {/*    </ClickAwayListener>*/}
            {/*</Popper>*/}
        </Wrapper>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        addReport: (report) => dispatch(addReport(report)),
    };
};

export default connect(null, mapDispatchToProps)(ExperienceSection);
