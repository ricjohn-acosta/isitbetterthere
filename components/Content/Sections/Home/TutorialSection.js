import styled from "styled-components";
import {Typography, Grid, useMediaQuery} from "@material-ui/core";

const Wrapper = styled.div`
  background-color: #e6ffff;
  min-height: 200vh;
`;

const TutorialHeader = styled(Typography)`
  padding-top: 6.5vh;
  padding-bottom: 5vh;
  font-weight: bold;
  text-align: center;
  ${(props) => props.theme.breakpoints.down("sm")} {
    margin-left: 7.5vw;
    margin-right: 7.5vw;
  }
`;

const TutorialHeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
`;

const ImageContainer = styled(Grid)`
  padding-left: 15vw;
  padding-top: 15vh;
  ${(props) => props.theme.breakpoints.down("md")} {
    padding: 1vh 10% 10% 10%;
  }
`;

const TopText = styled(Typography)`
  padding: 35vh 20vw 0 50px;
`;

const Text = styled(Typography)`
  padding: 32.5vh 20vw 0 50px;
  ${(props) => props.theme.breakpoints.down("md")} {
    padding: 10vh 10% 5% 10%;
  }
`;

const MiddleImageContainer = styled(Grid)`
  padding-right: 8.5vw;
  padding-top: 12.5vh;
  ${(props) => props.theme.breakpoints.down("md")} {
    padding: 6.5vh 10% 10% 10%;
  }
`;

const MiddleTextContainer = styled(Typography)`
  padding: 15vh 0 0 15vw;
  ${(props) => props.theme.breakpoints.down("md")} {
    padding: 10vh 5vw 0 15vw;
  }
`;

const StyledLink = styled.a`
  color: black;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

const TutorialSection = () => {
  const matches = useMediaQuery("(min-width:1300px)");

  return (
    <>
      <Wrapper id="/howitworks">
        <br />
        <TutorialHeaderContainer elevation={1}>
          <TutorialHeader variant="h6">
            How we can help you prepare for your next transition in life
          </TutorialHeader>
        </TutorialHeaderContainer>
        <Grid container direction="column">
          {matches ? (
            <Grid container item>
              <ImageContainer item xs={12} sm={6}>
                <StyledImage src="/target.png" />
              </ImageContainer>
              <Grid item xs={12} sm={6}>
                <TopText variant="h4">
                  Start <StyledLink href="/#">here</StyledLink>. Choose a category that best suit your situation,
                  where you are planning to transition from and where you want
                  to be.
                </TopText>
              </Grid>
            </Grid>
          ) : (
            <Grid container item>
              <Grid item xs={12} sm={12}>
                <TopText variant="h5">
                  Start <StyledLink href="/#">here</StyledLink>. Choose a category that best suit your situation,
                  where you are planning to transition from and where you want
                  to be.
                </TopText>
              </Grid>
              <ImageContainer item xs={12} sm={12}>
                <StyledImage src="/target.png" />
              </ImageContainer>
            </Grid>
          )}

          <Grid container item>
            <Grid item xs={12} sm={matches ? 6 : 12}>
              <MiddleTextContainer variant={matches? "h4" : "h5"}>
                Build confidence. Gather information through personal experiences from other
                people who have done the transition that you are thinking of
                going through!
              </MiddleTextContainer>
            </Grid>
            <MiddleImageContainer item xs={12} sm={matches ? 6 : 12}>
              <StyledImage src="/analyse.png" />
            </MiddleImageContainer>
          </Grid>

          {matches ? (
            <Grid container item>
              <ImageContainer item xs={12} sm={6}>
                <StyledImage src="/achievement.png" />
              </ImageContainer>
              <Grid item xs={12} sm={6}>
                <Text variant="h4">
                  This step is all up to you! Make an informed decision based on
                  what you've learned from other people's experiences and take action!
                </Text>
              </Grid>
            </Grid>
          ) : (
            <Grid container item>
              <Grid item xs={12} sm={12}>
                <Text variant="h5">
                  This step is all up to you! Make an informed decision based on
                  what you've learned from other people's experiences and take action!
                </Text>
              </Grid>
              <ImageContainer item xs={12} sm={12}>
                <StyledImage src="/achievement.png" />
              </ImageContainer>
            </Grid>
          )}
        </Grid>
      </Wrapper>
    </>
  );
};

export default TutorialSection;
