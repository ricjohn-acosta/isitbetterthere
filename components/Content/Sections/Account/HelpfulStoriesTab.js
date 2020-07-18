import styled, { keyframes } from "styled-components";
import { Typography } from "@material-ui/core";
import HelpfulStory from "./HelpfulStory";
import NoData from "./common/NoData"

const Wrapper = styled.div`
  padding: 5%;
`;

const HelpfulStoriesTab = ({ helpfulContributions }) => {
  return (
    <Wrapper>
      <Typography variant="h5">Stories you found helpful</Typography>
      <br />
      {helpfulContributions.length !== 0 ? helpfulContributions.filter(e => e.is_helpful === 1).map(e => (
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
      )) : <NoData>YOU HAVEN'T FOUND ANY HELPFUL STORIES YET...</NoData>}
      {console.log(helpfulContributions)}
    </Wrapper>
  );
};

export default HelpfulStoriesTab;
