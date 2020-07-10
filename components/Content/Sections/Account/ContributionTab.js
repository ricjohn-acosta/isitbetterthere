import styled, { keyframes } from "styled-components";
import { Paper, Grid, Typography } from "@material-ui/core";
import Contribution from "./Contribution";

const Wrapper = styled.div`
  padding: 5%;
`;

const ContributionTab = ({ userContributions }) => {
  const [contributions, setContributions] = React.useState(userContributions)


  return (
    <Wrapper>
      <Typography variant="h4">Your stories</Typography>
      <br/>
      {userContributions.map((e) => (
        <>
          <Contribution
            experienceId={e.experience_id}
            category={e.category}
            from={e.from}
            to={e.to}
            story={e.story}
            datePosted={e.date_posted}
            helpfulRating={e.helpful}
          />
          <br />
        </>
      ))}
    </Wrapper>
  );
};

export default ContributionTab;
