import styled from "styled-components";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Experience from "./Experience";

const Wrapper = styled.div`
  min-height: 75vh;
  padding: 5% 5% 5% 5%;
  margin-top: 2.5%;
  background-color: #e6ffff;
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
  margin: 5vh 0 0 4.5vw;
  padding: 5% 8.5% 8.5% 8.5%;
  min-height: 50vh;
  max-width: 50vw;
`;

const ToolsContainer = styled(Paper)`
  margin: 5vh 50px 0 50px;
  min-height: 25vh;
  max-width: 50vw;
  padding: 8.5%;
`;

const ExperienceSection = () => {
  return (
    <Wrapper>
      <SectionHeader>
        <ExperienceIcon src="/experience.png" />
        <SectionTitle variant="h4">People's experiences</SectionTitle>
      </SectionHeader>
      <Grid container direction="row">
        <Grid item xs={12} sm={12} md={8}>
          <ExperienceContainer>
            <Experience />
            <Experience />
            <Experience />
          </ExperienceContainer>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <ToolsContainer>Search tools</ToolsContainer>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default ExperienceSection;
