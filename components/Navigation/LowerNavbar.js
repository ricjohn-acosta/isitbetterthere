import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Drawer from "./Drawer";
import { addUser } from "../../store/actions/users";
import { connect } from "react-redux";
import { useRouter, Router } from "next/router";
import BrandLogo from "./BrandLogo";
import { signout } from "next-auth/client";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { getProviders } from "next-auth/client";
import { useEffect } from "react";
import Link from "next/link";
import { Paper, Box } from "@material-ui/core";
import HeaderDivider from "../Content/Sections/Share/common/HeaderDivider";
import Avatar from "@material-ui/core/Avatar";
import Popper from "@material-ui/core/Popper";
import { makeStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const useStyles = makeStyles((theme) => ({
  label: { justifyContent: "normal" },
}));

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

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10vh 0 10vh 0;
`;

const ModalContent = styled(Paper)`
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  padding: 15vh 0 25vh 0;
  width: 25vw;
  height: 100%;
  overflow: auto;
  ${(props) => props.theme.breakpoints.down(1147)} {
    padding: 10% 0 10% 0;
    width: 60vw;
    height: 70vh;
  }
`;

const ProviderButtons = styled(Button)``;

const StyledAvatar = styled(Avatar)`
  height: 30px;
  width: 30px;
`;

const PopperPaper = styled(Paper)`
  width: 300px;
`;

const SigninIcon = styled.img`
  height: auto;
  width: auto;
  max-width: 30px;
  max-height: 30px;
  margin-right: 50px;
  margin-left: 20px;
`;

const LowerNavbar = ({ session }) => {
  const [signinClicked, setSigninClicked] = React.useState(false);
  const [providers, setProviders] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setOpen(!open);
  };
  // const open = Boolean(anchorEl);

  const handleClickAway = () => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setOpen(false);
  };

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
              Share your story
            </MiscButtons>
          </Grid>
          <Grid item xs={6} sm={6} md={4}>
            <UserButtons href={"/account?tab=settings"} disableRipple>
              {session ? (
                <>
                  <StyledAvatar src={session.user.image}><img src="user-32.png"/></StyledAvatar>
                  &nbsp;{session.user.name}
                </>
              ) : (
                "Account"
              )}
            </UserButtons>
            {session ? (
              <UserButtons
                disableRipple
                onClick={(e) => {
                  signout({
                    callbackUrl:
                      process.env.NODE_ENV === "production"
                        ? process.env.prod + "/"
                        : process.env.dev + "/",
                  });
                }}
              >
                Sign out
              </UserButtons>
            ) : (
              <UserButtons
                style={{ textDecoration: "none" }}
                disableRipple
                onClick={handleClick}
              >
                Sign up | Login
              </UserButtons>
            )}
            <DrawerContainer>
              <Drawer />
            </DrawerContainer>
          </Grid>
        </Grid>
      </Container>

      <Popper placement="bottom-start" open={open} anchorEl={anchorEl}>
        <ClickAwayListener onClickAway={handleClickAway}>
          <PopperPaper variant="outlined">
            {providers !== null &&
              Object.values(providers).map((provider) => (
                <p key={provider.name}>
                  <ProviderButtons
                    classes={{
                      label: classes.label,
                    }}
                    startIcon={
                      <SigninIcon src={`/${provider.name}-signin.png`} />
                    }
                    fullWidth
                    variant="text"
                    href={`/api/auth/signin/${provider.name.toLowerCase()}?callbackUrl=${
                      process.env.NODE_ENV === "production"
                        ? process.env.prod
                        : process.env.dev
                    }`}
                  >
                    Sign in with {provider.name}
                  </ProviderButtons>
                </p>
              ))}
          </PopperPaper>
        </ClickAwayListener>
      </Popper>
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
