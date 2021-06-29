import styled from "styled-components";
import { Typography } from "@material-ui/core";

const Wrapper = styled.div`
  padding-top: 5vh;
  padding-bottom: 7.5vh;
  // background-color: #CCFFFF;
  ${(props) => props.theme.breakpoints.down("sm")} {
    margin-left: 7.5vw;
    margin-right: 7.5vw
  }
`;
const AimContainer = styled(Typography)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  text-align: center;

  ${(props) => props.theme.breakpoints.down("md")} {

    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
  }

  ${(props) => props.theme.breakpoints.between("1287", "1870")} {
    font-size: 4rem;
  }

  ${(props) => props.theme.breakpoints.between("sm", "1287")} {
    font-size: 1.5rem;
  }
  
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
