import styled from "styled-components";
import StoryCard from "../components/UI/StoryCard";
import LowerNavbar from "../components/Navigation/LowerNavbar";
import { Typography } from "@material-ui/core";
const HeaderText = styled(Typography)`
  padding: 2.5% 15% 0 15%;
`;


const Stories = ({ allContributions }) => {
    console.log(allContributions)
  return (
    <>
      <LowerNavbar />
      <HeaderText variant="h3">Recent stories</HeaderText>
      {allContributions.map((e) => (
        <StoryCard
          name={e.name}
          story={e.story}
          uid={e.uid}
          from={e.from}
          to={e.to}
          helpfulCount={e.helpful}
          hideName={e.hide_name}
          datePosted={e.date_posted}
        />
      ))}
    </>
  );
};

export default Stories;
