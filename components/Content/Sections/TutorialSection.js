import styled, { keyframes } from "styled-components";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Link from 'next/link'

const Wrapper = styled.div`
  background-color: #e6ffff;
  min-height: 200vh;
`;

const TutorialHeader = styled(Typography)`
  padding-top: 6.5vh;
  padding-bottom: 5vh;
  font-weight: bold;
  ${(props) => props.theme.breakpoints.down("sm")} {
    padding: 5%;
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
  padding-left: 20vw;
  padding-top: 20vh;
  ${(props) => props.theme.breakpoints.down("md")} {
    padding: 5vh 10% 10% 10%;
  }
`;

const Text = styled(Typography)`
  padding: 20vh 20vw 0 50px;
`;

const MiddleImageContainer = styled(Grid)`
  padding-right: 8.5vw;
  padding-top: 15vh;
  ${(props) => props.theme.breakpoints.down("md")} {
    padding: 5vh 10% 10% 10%;
  }
`;

const MiddleTextContainer = styled(Typography)`
  padding: 15vh 0 0 15vw;
`;

const TutorialSection = () => {
  const matches = useMediaQuery("(min-width:1300px)");

  return (
    <>
      <Wrapper id="/howitworks">
        {console.log(matches)}
        <br />
        <TutorialHeaderContainer elevation={1}>
          <TutorialHeader variant="h6">
            How we can help you prepare for your next big transition in life
          </TutorialHeader>
        </TutorialHeaderContainer>
        <Grid container direction="column">
          {matches ? (
            <Grid container item>
              <ImageContainer item xs={12} sm={6}>
                <StyledImage src="/target.png" />
              </ImageContainer>
              <Grid item xs={12} sm={6}>
                <Text variant="h4">
                  Start <Link href="/"><a>here</a></Link>. Choose a category that relates to your situation,
                  where you are planning to transition from and where you want
                  to be.
                </Text>
              </Grid>
            </Grid>
          ) : (
            <Grid container item>
              <Grid item xs={12} sm={12}>
                <Text variant="h5">
                  Start <Link href="/"><a>here</a></Link>. Choose a category that relates to your situation,
                  where you are planning to transition from and where you want
                  to be.
                </Text>
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
