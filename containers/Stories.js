import styled from "styled-components";
import StoryCard from "../components/UI/StoryCard";
import LowerNavbar from "../components/Navigation/LowerNavbar";
import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
const HeaderText = styled(Typography)`
  padding: 2.5% 15% 0 15%;
`;

const Wrapper = styled(Box)`
  min-height: 100vh;
`;

const Stories = ({ allContributions }) => {

  return (
    <Wrapper>
      <LowerNavbar />
      <HeaderText variant="h3">Recent stories</HeaderText>
      {allContributions.map((e) => (
        <StoryCard
          name={e.author}
          story={e.story}
          uid={e.author_id}
          eid={e._id}
          from={e.from}
          to={e.to}
          helpfulCount={e.helpful}
          hideName={e.hide_name}
          datePosted={e.date_posted}
        />
      ))}
    </Wrapper>
  );
};

export default Stories;
