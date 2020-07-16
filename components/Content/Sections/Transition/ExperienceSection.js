import styled from "styled-components";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Experience from "./Experience";
import SearchTools from "./SearchTools";
import Button from "@material-ui/core/Button";
import SearchToolsMobile from "./SearchToolsMobile";
import draftToHtml from "draftjs-to-html";
import NoData from "./common/NoData";
import { useRouter, Router } from "next/router";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import PaginationLink from "./PaginationLink";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ReportForm from "./ReportForm";
import { connect } from "react-redux";
import { addReport } from "../../../../store/actions/reports";
import { useSession } from "next-auth/client";

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
  ratedExperiences,
  reportedExperiences,
  addReport,
}) => {
  const router = useRouter();
  const isSM = useMediaQuery("(max-width:600px)");
  const isMD = useMediaQuery("(max-width:1199px)");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [clickAway, setClickaway] = React.useState(false);
  const [currentId, setCurrentId] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const [reportView, setReportView] = React.useState(false);
  const [violationType, setViolationType] = React.useState("");
  const [session, loading] = useSession();

  const handleOptions = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== event.currentTarget.value || !prev);
    setPlacement(event.currentTarget.value);
    setClickaway(false);
  };

  const handleClickaway = (e) => {
    console.log("HANDLE CLICKAWAY ", e);
    if (
      e.srcElement.id === "icon-button" ||
      e.srcElement.parentElement.id === "icon-button-svg" ||
      e.srcElement.id === "icon-button-svg" ||
      e.srcElement.id === "icon-container"
    ) {
      setClickaway(false);
    } else {
      console.log("NO");
      setOpen(false);
      setClickaway(true);
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

  const handleReportSubmit = () => {
    addReport({
      reported_by: session.account.id,
      experience_id: currentId,
      violation_type: violationType,
      date_reported: Date.now(),
    });
  };

  const handleViolationType = (e) => {
    setViolationType(e.target.value);
  };

  const displayExperiences = () => {
    return (
      <>
        {experiences.length === 0 ? (
          <>
            <NoData />
          </>
        ) : (
          experiences.map((e, i) => (
            <React.Fragment key={i}>
              <Experience
                key={i}
                experienceId={e.experience_id}
                userId={e.user_id}
                name={e.name}
                profilePicture={e.profile_picture}
                location={e.location}
                email={e.email}
                position={e.position}
                company={e.company}
                bio={e.bio}
                fulfillment={e.fulfillment}
                easeOfTransition={e.ease_of_transition}
                regret={e.regret}
                experience={convertToReact(e.story)}
                helpfulCount={e.helpful}
                date_posted={e.date_posted}
                isRated={
                  ratedExperiences &&
                  ratedExperiences.find(
                    ({ experience_id }) =>
                      experience_id === e.experience_id.toString()
                  )
                }
                handleOptions={handleOptions}
                setCurrentId={setCurrentId}
                hideName={e.hide_name}
                hideEmail={e.hide_email}
                hideCompany={e.hide_company}
                hideOccupation={e.hide_occupation}
                hideLocation={e.hide_location}
              />
              <br />
            </React.Fragment>
          ))
        )}
      </>
    );
  };

  const convertToReact = (story) => {
    console.log(story);
    const test = htmlToReactParser.parse(draftToHtml(JSON.parse(story)));
    return test;
  };

  return (
    <Wrapper>
      <SectionHeader>
        <ExperienceIcon src="/experience.png" />
        <SectionTitle variant="h4">People's experiences</SectionTitle>
      </SectionHeader>
      <Grid container direction="row">
        <Grid item xs={12} sm={12} md={isMD ? 12 : 8}>
          <ShareExperienceBtnContainer>
            <ShareExperienceBtn
              disableRipple
              disableElevation
              href={"/share"}
              variant="contained"
            >
              Share your experience
            </ShareExperienceBtn>
            {isMD ? <SearchToolsMobileContainer /> : null}
          </ShareExperienceBtnContainer>
          <ExperienceContainer>{displayExperiences()}</ExperienceContainer>
          {experiences.length !== 0 ? (
            <PaginationWrapper
              page={parseInt(router.query.page)}
              count={
                router.query.filterBy === "none" ||
                !router.query.hasOwnProperty("filterBy")
                  ? Math.ceil(totalExperiences / 5)
                  : Math.ceil(experiences.length / 5)
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
              <SearchTools />
            </SearchToolsContainer>
          </Grid>
        )}
      </Grid>
      <ReportForm
        reportView={reportView}
        handleReportClose={handleReportClose}
        violationType={violationType}
        handleViolationType={handleViolationType}
        handleReportSubmit={handleReportSubmit}
        reportedExperiences={reportedExperiences}
        currentId={currentId}
        uid={session && session.account.id}
      />
      {console.log("VIOLATION TYPE", violationType)}
      <Popper open={open && !clickAway ? true : false} anchorEl={anchorEl}>
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
    addReport: (report) => dispatch(addReport(report)),
  };
};

export default connect(null, mapDispatchToProps)(ExperienceSection);
