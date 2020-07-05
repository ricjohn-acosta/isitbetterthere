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
import ExperienceSorter from "./ExperienceSorter";
import { useRouter } from "next/router";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import PaginationLink from "./PaginationLink";
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

const ExperienceSection = ({ experiences, totalExperiences }) => {
  const router = useRouter();
  const isSM = useMediaQuery("(max-width:600px)");
  const isMD = useMediaQuery("(max-width:1199px)");

  const testData = experiences;

  console.log("ASDASDASD", experiences)
  const displayExperiences = () => {
    return (
      <>
        {experiences.length === 0 ? (
          <>
            <NoData />
          </>
        ) : (
          experiences.map((e, i) => (
            <>
              <Experience
                key={i}
                experienceId={e.experience_id}
                name={e.name}
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
              />
            </>
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
      {/* {console.log(JSON.parse(testData[1].story))} */}
      {console.log(testData)}
      <SectionHeader>
        <ExperienceIcon src="/experience.png" />
        <SectionTitle variant="h4">People's experiences</SectionTitle>
      </SectionHeader>
      <Grid container direction="row">
        <Grid item xs={12} sm={12} md={isMD ? 12 : 8}>
          <ShareExperienceBtnContainer>
            <ShareExperienceBtn variant="contained">
              Share your experience
            </ShareExperienceBtn>
            {isMD ? <SearchToolsMobileContainer /> : null}
          </ShareExperienceBtnContainer>
          <ExperienceContainer>
            <ExperienceSorter
              sortBy={router.query.sortBy}
              // filterBy={router.query.filterBy}
            >
              {displayExperiences()}
              {/* {console.log("DISPLAY EXPERIENCES ", displayExperiences())} */}
            </ExperienceSorter>
          </ExperienceContainer>
          <PaginationWrapper
            page={parseInt(router.query.page)}
            count={
              router.query.filterBy === "none" || !router.query.hasOwnProperty("filterBy")
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
      {console.log(typeof router.query.page)}
    </Wrapper>
  );
};

export default ExperienceSection;
