import styled from "styled-components";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import LearnCard from "./LearnCard";
import Grid from "@material-ui/core/Grid";

// R1: https://www.youtube.com/watch?v=d7Jnmi2BkS8
// R2: https://www.indeed.com/career-advice/finding-a-job/job-hunting-tips
// R3: https://www.lifehack.org/703099/stop-worrying-about-your-future
const Wrapper = styled(Grid)`
  padding-left: 5vw;
`;


// only wrap if under md
const LearnCards = () => {
  const matches = useMediaQuery("(min-width:1280px)");

  return (
    <Wrapper container  wrap={matches ? "nowrap" : "wrap"}direction="row" spacing={3} alignContent="center">
      <Grid item>
        <LearnCard
          image="/resource1.png"
          title="Before You Decide: 3 Steps To Better Decision Making"
          description="A TEDx talk led by Matthew Confer that teaches how we can optimize our decision making by restructuring the steps you take before you decide."
          label={["Decision Making", "Video"]}
          link="https://www.youtube.com/watch?v=d7Jnmi2BkS8"
        />
      </Grid>
      <Grid item>
        <LearnCard
          image="/resource2.png"
          title="14 Job Hunting Tips to Get the Job You Want"
          description="Successful job hunting requires using certain techniques to make sure you stand out to potential employers. Use these tips to help you succeed in a competitive market and get the job you want."
          label={["Employment", "Article"]}
          link="https://www.indeed.com/career-advice/finding-a-job/job-hunting-tips"
        />
      </Grid>
      <Grid item>
        <LearnCard
          image="/resource3.png"
          title="How to Stop Worrying About the Future: 8 Practical Techniques"
          description="While we may never learn how to stop worrying about the future completely, there are ways to help us better manage that worry, so we can save ourselves some time."
          label={["Mental Health", "Article"]}
          link="https://www.lifehack.org/703099/stop-worrying-about-your-future"
        />
      </Grid>
    </Wrapper>
  );
};

export default LearnCards;
