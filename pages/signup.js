import styled from "styled-components";
import { providers } from "next-auth/client";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  label: { justifyContent: "normal" },
}));

const Wrapper = styled.div`
  height: 100vh;
  background: rgb(0, 153, 204);
  background: linear-gradient(
    90deg,
    rgba(0, 153, 204, 1) 0%,
    rgba(187, 250, 255, 1) 100%
  );
  padding: 10% 0 0 0;
  ${(props) => props.theme.breakpoints.down("sm")} {
    padding: 10% 0 0 0;
  }
`;

const StyledPaper = styled(Paper)`
  margin-left: 40vw;
  margin-right: 40vw;
  padding: 10px;
  ${(props) => props.theme.breakpoints.down("sm")} {
    margin-left: 10px;
    margin-right: 10px;
  }
`;

const StyledHr = styled.hr`
  border: 0;
  height: 1px;
  background: rgb(207, 203, 203);
  background: radial-gradient(
    circle,
    rgba(207, 203, 203, 1) 50%,
    rgba(255, 255, 255, 1) 100%
  );
`;

const StyledTypography = styled(Typography)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProviderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const ProviderButtons = styled(Button)`
  padding-left: 30%;
  padding-right: 5%;
  ${(props) => props.theme.breakpoints.down(960)} {
    padding-left: 37.5%;
  }
  ${(props) => props.theme.breakpoints.down(600)} {
    padding-left: 25%;
  }
`;

const SigninIcon = styled.img`
  height: auto;
  width: auto;
  max-width: 30px;
  max-height: 30px;
`;

export default ({ providers }) => {
  const classes = useStyles();

  return (
    <Wrapper>
      <StyledPaper>
        <StyledTypography variant="h3">Sign in!</StyledTypography>
        <StyledHr />
        {Object.values(providers).map((provider) => (
          <ProviderContainer key={provider.name}>
            <ProviderButtons
              classes={{
                label: classes.label,
              }}
              fullWidth
              variant="outlined"
              disableElevation
              startIcon={
                <SigninIcon
                  src={`/${provider.name.toLowerCase()}-signin.png`}
                />
              }
              href={`/api/auth/signin/${provider.name.toLowerCase()}?callbackUrl=${
                process.env.NODE_ENV === "production"
                  ? process.env.prod
                  : process.env.dev
              }`}
            >
              Sign in with {provider.name}
            </ProviderButtons>
          </ProviderContainer>
        ))}
      </StyledPaper>
    </Wrapper>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      providers: await providers(context),
    },
  };
}
