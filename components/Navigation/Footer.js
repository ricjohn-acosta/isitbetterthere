import styled from "styled-components";
import {Grid, List, ListItem, Typography} from "@material-ui/core";
import Link from 'next/link'

const Wrapper = styled.div`
  background: rgb(0, 61, 77);
  background: radial-gradient(
    circle,
    rgba(0, 61, 77, 1) 50%,
    rgba(48, 86, 105, 1) 98%
  );
  min-height: 40vh;
`;

const Container = styled.div`
  padding: 8.5vh 15vw 5vh 15vw;
  color: #e0e0eb;
  ${(props) => props.theme.breakpoints.down("sm")} {
    padding: 5vh 0 0 0;
  }
`;

const RightContainer = styled.div`
  float: right;
  padding: 4px 16px 0 0;
`;

const SocialMediaIcon = styled.img`
  height: auto;
  width: auto;
  max-width: 45px;
  max-height: 45px;
  margin-right: 10px;
`;

const Divider = styled.hr`
  border: 0;
  height: 0.5px;
  background: #7575a3;
`;

const ListHeader = styled(Typography)`
  color: #9494b8;
`;

const StyledLinks = styled.a`
  color: grey;
`;

const Copyright = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;


const Footer = () => {
  return (
    <Wrapper>
      <Container>
        <Grid container direction="row">
          <Grid item xs={6} sm={6}>
            <List>
              <ListItem component={ListHeader} variant="h5">
                Community
              </ListItem>
              <ListItem>
                <Link href="/about" passHref>
                <StyledLinks>About</StyledLinks>
                </Link>
              </ListItem>
              <ListItem>
              <Link href="/contact" passHref>
                <StyledLinks>Contact</StyledLinks>
                </Link>
              </ListItem>
              {/* <ListItem>
                <StyledLinks href="ourteam">Meet the team</StyledLinks>
              </ListItem> */}
            </List>
          </Grid>
          <Grid item xs={6} sm={6}>
            <RightContainer>
              <SocialMediaIcon src="/facebook.png" />
              <SocialMediaIcon src="/linkedin.png" />
            </RightContainer>
          </Grid>
        </Grid>
        <Divider />
        <br />
        <Copyright>© IsItBetterThere 2020</Copyright>
      </Container>
    </Wrapper>
  );
};

export default Footer;
