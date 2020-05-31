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

// Main wrapper
const LowerNavbar = styled(AppBar)`
  background-color: white;
  color: black
  display: flex;
  height: 8vh;

  ${(props) => props.theme.breakpoints.down("sm")} {
    background-color: #33CCCC;
  }
`;
// Brand logo
const Brand = styled(Typography)`
  color: black;
  margin-right: 1.5vw;
  margin-top: 1.5vh;
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
  height: 100%;

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
    margin-left: 0;
    margin-right: 0;
  }
`;

const StyledLowerNavbar = () => {
  return (
    <LowerNavbar elevation={0} position="sticky" component="div">
      <Container>
        <Grid container direction="row">
          <Grid item container xs={6} sm={6} md={8}>
            <Brand variant="h4" component="span">
              IsItBetterThere
            </Brand>
            <Link
              component={MiscButtons}
              href="#HowItWorks"
              style={{ textDecoration: "none" }}
              disableRipple
            >
              How it works
            </Link>
            <MiscButtons disableRipple>Learn </MiscButtons>
            <MiscButtons disableRipple>Contribute </MiscButtons>
          </Grid>
          <Grid item xs={6} sm={6} md={4}>
            <UserButtons disableRipple>Account</UserButtons>
            <UserButtons disableRipple>Signup</UserButtons>
            <UserButtons disableRipple>Login</UserButtons>
            <DrawerContainer>
              <Drawer />
            </DrawerContainer>
          </Grid>
        </Grid>
      </Container>
    </LowerNavbar>
  );
};

export default StyledLowerNavbar;
