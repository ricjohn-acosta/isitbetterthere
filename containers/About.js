import styled from "styled-components";
import LowerNavbar from "../components/Navigation/LowerNavbar";
import { Typography } from "@material-ui/core";

const Wrapper = styled.div`
  min-height: 75vh;
  padding: 0 5% 0 5%;
`;
const Content = styled.div`
  margin: 2.5% 32.5% 5% 32.5%;
  ${(props) => props.theme.breakpoints.down("sm")} {
    margin: 5% 0;
  }
`;

const HeaderText = styled(Typography)``;
const DescriptionText = styled(Typography)`
  margin-bottom: 2.5vh;
`;

const About = ({ session }) => {
  return (
    <>
      <LowerNavbar session={session} />
      <Wrapper>
        <Content>
          <HeaderText variant="h2">Mission statement</HeaderText>
          <br />
          <DescriptionText>
            To inform individuals and incite confidence so that they could
            make an informed decision.
          </DescriptionText>
          <br />
          <HeaderText variant="h2">About</HeaderText>
          <br />
          <DescriptionText>
            Isitbetterthere is a website where people who are looking to
            transition to the next phase of their life can easily find
            information regarding the transition they are about to undertake.
            <br/>
            <br/>
            Our platform offers a variety of categories for every aspect of life
            like careers, universities, countries, etc. By learning from other’s
            experiences, we hope that each user is able to confidently come to
            an informed decision that will benefit their future.{" "}
          </DescriptionText>
          <br />
          <HeaderText variant="h2">Our story</HeaderText>
          <br />
          <DescriptionText>
            As a group of graduate students, we have been through several
            transitional stages in our lives that paved the pathway for our
            future. During these transitional stages, it has always been
            difficult to confidently make a decision due to the lack of
            knowledge and the fear of the unknown. The pressures of coming to a
            quick conclusion with the limited resources you are given, often
            lead a person to make superficial decisions, that an individual may
            regret making.
            <br />
            <br />
            It was during these times that we needed the most guidance and
            information to ensure that we make judgements that would benefit our
            selves. We built this website to help minimise errors in decision
            making through transitional periods of an individual’s life. By
            sharing personal stories and experiences, we can gather the
            essential information required to come to a decision that we are
            content with.
          </DescriptionText>
        </Content>
      </Wrapper>
    </>
  );
};

export default About;
