import styled from "styled-components";
import {Typography, Button, useMediaQuery} from "@material-ui/core";
import LearnCards from "../../Cards/LearnCards";

const Wrapper = styled.div`
  overflow: hidden;
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
  padding: 5% 5% 3.5% 5%;
  display: flex;
`;

const ResourcesButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ResourcesButton = styled(Button)`
  border-radius: 25px;
`;

const ResourcesButtonText = styled(Typography)`
  font-weight: 700;
  color: #565d56;
`;

const LearnSection = () => {
  const matches = useMediaQuery("(min-width:1300px)");
  return (
    <Wrapper id="/learn">
      <SectionHeader>
        <LearnIcon src="/learning.png" />
        <SectionTitle variant={matches ? "h4" : "h5"}>
          Learning Resources
        </SectionTitle>
      </SectionHeader>
      <LearnCardsContainer>
        <LearnCards />
      </LearnCardsContainer>
      {/* <ResourcesButtonContainer>
        <ResourcesButton
          color="primary"
          size="large"
          variant="contained"
          href="resources"
          disableRipple
        >
          <ResourcesButtonText variant="subtitle1">
            See more resources
          </ResourcesButtonText>
        </ResourcesButton>
      </ResourcesButtonContainer> */}
    </Wrapper>
  );
};

export default LearnSection;
