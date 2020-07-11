import styled, { keyframes } from "styled-components";
import { Typography } from "@material-ui/core";
import HelpfulStory from "./HelpfulStory";

const Wrapper = styled.div`
  padding: 5%;
`;

const HelpfulStoriesTab = ({ helpfulContributions }) => {
  return (
    <Wrapper>
      <Typography variant="h4">Stories you found helpful</Typography>
      <br />
      {helpfulContributions.map((e) => (
        <>
          <HelpfulStory
            name={e.name}
            story={e.story}
            from={e.from}
            to={e.to}
            helpfulCount={e.helpful}
            hideName={e.hide_name}
          />
          <br />
        </>
      ))}
      {console.log(helpfulContributions)}
    </Wrapper>
  );
};

export default HelpfulStoriesTab;
