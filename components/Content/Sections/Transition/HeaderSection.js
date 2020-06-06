import React from "react";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import CountUp from "react-countup";

const Wrapper = styled.div`
  min-height: 40vh;
  background: rgb(92,154,247);
  background: linear-gradient(180deg, rgba(92,154,247,1) 0%, rgba(50,156,156,1) 88%);
  
`;

const Container = styled(Grid)`
  padding: 5%;
`;

const FromText = styled(Grid)`
  text-align: center;
  color: white;
  padding-left: 15%;
`;

const MiddleIcon = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const ToText = styled(Grid)`
  text-align: center;
  color: white;
  padding-right: 15%;
`;

const OdometerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const HeaderSection = ({ from, to }) => {
  return (
    <Wrapper>
      <Container container direction="row">
        <FromText item xs={12} sm={12} md={5}>
          <Typography variant="h2">{from}</Typography>
        </FromText>
        <MiddleIcon item xs={12} sm={12} md={2}>
          <ArrowForwardIcon fontSize="large" />
        </MiddleIcon>
        <ToText item xs={12} sm={12} md={5}>
          {<Typography variant="h2">{to}</Typography>}
        </ToText>
      </Container>
      <OdometerContainer>
        <b><CountUp start={0} end={81} /></b>
        &nbsp;PEOPLE HAVE WENT THROUGH THIS TRANSITION
      </OdometerContainer>
    </Wrapper>
  );
};

export default HeaderSection;
