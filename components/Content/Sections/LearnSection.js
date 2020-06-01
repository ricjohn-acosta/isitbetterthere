import styled from "styled-components";
import { Typography } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import LearnCards from "../Cards/LearnCards";

const Wrapper = styled.div`
  height: 100vh;
  padding: 5% 5% 5% 5%;
`;

const SectionHeader = styled.div`
  display: inline-flex;
`;

const SectionTitle = styled(Typography)`
  padding-top: 10px;
  font-weight: bold;
`;

const LearnIcon = styled.img`
  height: auto;
  width: auto;
  max-width: 50px;
  max-height: 50px;
  margin-right: 10px;
`;

const LearnCardsContainer = styled.div`
  padding: 5%;
`;

const LearnSection = () => {
  return (
    <Wrapper id="/learn">
      <SectionHeader>
        <LearnIcon src="/learning.png" />
        <SectionTitle variant="h4">Learning Resources</SectionTitle>
      </SectionHeader>
      <LearnCardsContainer>
        <LearnCards />
      </LearnCardsContainer>
    </Wrapper>
  );
};

export default LearnSection;
