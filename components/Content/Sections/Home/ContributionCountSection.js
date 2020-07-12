import styled from "styled-components";
import { Typography } from "@material-ui/core";

const Wrapper = styled.div`
  padding: 1%;
  background-color: #33cccc;
  color: #F8F8F8;
`;

const StyledTypography = styled(Typography)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  ${(props) => props.theme.breakpoints.down("sm")} {
    font-size: 1rem;
  }
`;

const StyledLink = styled.a`
  color: white;
  text-decoration: none;
  font-weight: bold;
  &:hover {text-decoration: underline};
`;

const ContributionCountSection = ({ contributionCount }) => {
  return (
    <Wrapper>
      <StyledTypography variant="h4">
        <b>{contributionCount}</b>&nbsp;stories have been contributed so far!
        &nbsp;
        <StyledLink href="/share">Share your story!</StyledLink>
      </StyledTypography>
    </Wrapper>
  );
};

export default ContributionCountSection;
