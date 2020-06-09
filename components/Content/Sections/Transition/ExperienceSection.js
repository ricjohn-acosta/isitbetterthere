import styled from "styled-components";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Experience from "./Experience";
import SearchTools from "./SearchTools";
import Button from "@material-ui/core/Button";
import SearchToolsMobile from "./SearchToolsMobile";

const Wrapper = styled.div`
  min-height: 75vh;
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

const SearchtoolsContainer = styled(Paper)`
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
const ExperienceSection = () => {
  const isSM = useMediaQuery("(max-width:600px)");
  const isMD = useMediaQuery("(max-width:1199px)");

  return (
    <Wrapper>
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
            <Experience />
            <br />
            <Experience />
            <br />
            <Experience />
            <br />
          </ExperienceContainer>
        </Grid>
        {isMD ? null : (
          <Grid item xs={12} sm={12} md={3}>
            <SearchtoolsContainer>
              <Typography variant="h4">Search tools</Typography>
              <SearchTools />
            </SearchtoolsContainer>
          </Grid>
        )}
      </Grid>
    </Wrapper>
  );
};

export default ExperienceSection;
