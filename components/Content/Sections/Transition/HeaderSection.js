import React from "react";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import CountUp from "react-countup";
import Link from "next/link";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

const Wrapper = styled.div`
  min-height: 45vh;
  background: rgb(92, 186, 247);
  background: linear-gradient(
    180deg,
    rgba(92, 186, 247, 1) 0%,
    rgba(0, 159, 185, 1) 88%
  );
`;

const Container = styled(Grid)`
  padding: 5%;

  ${(props) => props.theme.breakpoints.down("sm")} {
    margin-top: 6.5vh;
  }
`;

const FromText = styled(Grid)`
  text-align: center;
  color: white;
  padding-left: 15%;
  margin-bottom: 5vh;

  ${(props) => props.theme.breakpoints.down("1350")} {
    padding: 0;
  }
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

  ${(props) => props.theme.breakpoints.down("md")} {
    margin-top: 5vh;
  }

  ${(props) => props.theme.breakpoints.down("sm")} {
    padding-right: 0;
  }
`;

const OdometerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.5rem;
  ${(props) => props.theme.breakpoints.down("sm")} {
    font-size: 1rem;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2.5vh;
`;

const HeaderSection = ({ from, to, category, allExperiences }) => {
  const isSM = useMediaQuery("(max-width:600px)");
  const downMD = useMediaQuery("(max-width:959px)");

  return (
    <Wrapper>
      {console.log(allExperiences)}
      <Container container direction="row">
        <FromText item xs={12} sm={12} md={5}>
          <Typography
            variant={isSM ? "h4" : "h2"}
            style={{ fontWeight: "normal" }}
          >
            {from}
          </Typography>
        </FromText>
        <MiddleIcon item xs={12} sm={12} md={2}>
          {downMD ? (
            <ArrowDownwardIcon fontSize="large" />
          ) : (
            <ArrowForwardIcon fontSize="large" />
          )}
        </MiddleIcon>
        <ToText item xs={12} sm={12} md={5}>
          <Typography
            variant={isSM ? "h4" : "h2"}
            style={{ fontWeight: "normal" }}
          >
            {to}
          </Typography>
        </ToText>
      </Container>
      <OdometerContainer>
        <b>
          <CountUp start={0} end={allExperiences.length} />
        </b>
        &nbsp;people have went through this transition
      </OdometerContainer>
      {category === "secondaryEducation" ? null : (
        <LinkContainer>
          <Link
            href={{ pathname: "/transition", query: {category, from: to, to: from } }}
            passHref
          >
            <a style={{ color: "white" }}>See inverse?</a>
          </Link>
        </LinkContainer>
      )}
    </Wrapper>
  );
};

export default HeaderSection;
