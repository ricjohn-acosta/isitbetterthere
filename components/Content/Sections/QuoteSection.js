import styled from "styled-components";
import { Typography } from "@material-ui/core";

const Wrapper = styled.div`
  margin-top: 5vh;
  margin-bottom: 7.5vh;
  ${(props) => props.theme.breakpoints.down("sm")} {
    margin-left: 7.5vw;
  }
`;
const AimContainer = styled(Typography)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

const QuoteContainer = styled(Typography)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const QuoteSection = () => {
  return (
    <>
      <Wrapper>
        <AimContainer variant="h4">
          Let us help you make an informed decision.
        </AimContainer>
        <br/>
        <QuoteContainer variant="h5">
          “You can't make decisions based on fear and the possibility of what
          might happen.” ― Michelle Obama
        </QuoteContainer>
      </Wrapper>
    </>
  );
};

export default QuoteSection;
