import styled from "styled-components";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Drawer from "./Drawer";
import Link from "@material-ui/core/Link";
import { signout} from "next-auth/client";

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
// Brand logo
const Brand = styled(Typography)`
  color: #484848;
  margin-right: 1.5vw;
  margin-top: 1.5vh;
  font-weight: bold;
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
  ${(props) => props.theme.breakpoints.down("md")} {
    margin-left: 10px;
    margin-right: 10px;
  }
`;

const LowerNavbar = ({ session }) => {
  return (
    <StyledLowerNavbar elevation={0} position="sticky" component="div">
      {console.log(session)}
      <Container>
        <Grid container direction="row">
          <Grid item container xs={6} sm={6} md={8}>
            <Brand variant="h4" component={Link} href="/" underline="none">
              IsItBetterThere
            </Brand>
            <Link
              component={MiscButtons}
              href="#/howitworks"
              style={{ textDecoration: "none" }}
              disableRipple
            >
              How it works
            </Link>
            <Link
              component={MiscButtons}
              href="#/learn"
              style={{ textDecoration: "none" }}
              disableRipple
            >
              Learn
            </Link>
            <Link
              component={MiscButtons}
              style={{ textDecoration: "none" }}
              disableRipple
            >
              Share your story
            </Link>
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
              <UserButtons href={"/signup"}>Sign up | Login</UserButtons>
            )}
            {/* {session ? null : <UserButtons disableRipple>Login</UserButtons>} */}
            <DrawerContainer>
              <Drawer />
            </DrawerContainer>
          </Grid>
        </Grid>
      </Container>
    </StyledLowerNavbar>
  );
};

export default LowerNavbar;
