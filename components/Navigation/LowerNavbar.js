import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Drawer from "./Drawer";
import { addUser } from "../../store/actions/users";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import BrandLogo from "./BrandLogo";
import { signin, signout, useSession } from "next-auth/client";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { getProviders } from "next-auth/client";
import { useEffect } from "react";
import Link from "next/link";

// Main wrapper
const StyledLowerNavbar = styled(AppBar)`
  background-color: white;
  color: black
  display: flex;
  ${(props) => props.theme.breakpoints.down("sm")} {
    background: rgb(91,184,209);
    background: linear-gradient(270deg, rgba(91,184,209,1) 0%, rgba(21,215,215,1) 100%);
    padding-left: 1vw
  }
`;

// Buttons on the right hand side of the navbar
const UserButtons = styled(Button)`
  color: #404040;
  position: relative;
  float: right;
  height: 100%;
  padding: 1.5vw;

  ${(props) => props.theme.breakpoints.down("sm")} {
    display: none;
  }
`;

// Contains the Drawer component
const DrawerContainer = styled.div`
  color: #404040;
  position: relative;
  float: right;
  height: 50%;
  ${(props) => props.theme.breakpoints.up("md")} {
    display: none;
  }
`;

// Buttons on the left hand side of the navbar (next to the brand logo)
const MiscButtons = styled(Button)`
  color: #404040;
  position: relative;
  height: 100%;
  padding: 1.5vw;

  ${(props) => props.theme.breakpoints.down("sm")} {
    display: none;
  }
`;

// Container for the grid
const Container = styled.div`
  position: relative;
  height: 100%;
  margin-left: 10vw;
  margin-right: 15vw;
  color: black;
  ${(props) => props.theme.breakpoints.down(1300)} {
    margin-left: 10px;
    margin-right: 10px;
  }
`;

const LowerNavbar = ({ session, addUser }) => {
  const [signinClicked, setSigninClicked] = React.useState(false);
  const [providers, setProviders] = React.useState(null);

  const router = useRouter();

  const handleRouter = () => {};

  useEffect(() => {
    getProviders().then((data) => {
      setProviders(data);
    });
  }, []);

  return (
    <StyledLowerNavbar elevation={0} position="sticky" component="div">
      {console.log(router)}
      <Container>
        <Grid container direction="row">
          <Grid item container xs={6} sm={6} md={8}>
            <BrandLogo>IsItBetterThere</BrandLogo>
            <MiscButtons
              href={
                router.pathname === "/"
                  ? "#/howitworks"
                  : process.env.NODE_ENV === "production"
                  ? process.env.prod + "/#/howitworks"
                  : process.env.dev + "/#/howitworks"
              }
              style={{ textDecoration: "none" }}
              disableRipple
            >
              How it works
            </MiscButtons>
            <MiscButtons
              href={
                router.pathname === "/"
                  ? "#/learn"
                  : process.env.NODE_ENV === "production"
                  ? process.env.prod + "/#/learn"
                  : process.env.dev + "/#/learn"
              }
              style={{ textDecoration: "none" }}
              disableRipple
            >
              Learn
            </MiscButtons>
            <MiscButtons
              // component={MiscButtons}
              href={"/share"}
              style={{ textDecoration: "none" }}
              disableRipple
            >
              Share your experience
            </MiscButtons>
          </Grid>
          <Grid item xs={6} sm={6} md={4}>
            <UserButtons disableRipple>Account</UserButtons>
            {session ? (
              <UserButtons
                onClick={(e) => {
                  signout();
                }}
              >
                Sign out
              </UserButtons>
            ) : (
              // Add custom signup page when next-auth is stable
              // <UserButtons href={"/signup"}>Sign up | Login</UserButtons>
              <Link href={`/?signin=${signinClicked}`} as={"/signup"} passHref>
                <UserButtons style={{ textDecoration: "none" }}>
                  Sign up | Login
                </UserButtons>
              </Link>
            )}
            <DrawerContainer>
              <Drawer />
            </DrawerContainer>
          </Grid>
        </Grid>
      </Container>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={!!router.query.signin}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={!!router.query.signin}>
          <div>
            {providers !== null &&
              Object.values(providers).map((provider) => (
                <p key={provider.name}>
                  <Button
                    href={`/api/auth/signin/${provider.name.toLowerCase()}?callbackUrl=${
                      process.env.NODE_ENV === "production"
                        ? process.env.prod
                        : process.env.dev
                    }`}
                  >
                    Sign in with {provider.name}
                  </Button>
                </p>
              ))}

            {/* <>{fetchProviders().then((data) => JSON.stringify(data))}</> */}
          </div>
        </Fade>
      </Modal>
      {console.log(providers)}
    </StyledLowerNavbar>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (user) => dispatch(addUser(user)),
  };
};

export default connect(null, mapDispatchToProps)(LowerNavbar);
