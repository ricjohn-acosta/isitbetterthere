import styled from "styled-components";
import Drawer from "./Drawer";
import {useRouter} from "next/router";
import BrandLogo from "./BrandLogo";
import {getProviders, signIn, signout, useSession} from "next-auth/client";
import React, {useEffect} from "react";
import Link from "next/link";
import {AppBar, Avatar, Button, ClickAwayListener, Grid, makeStyles, Modal, Paper, Popper} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    label: {justifyContent: "normal"},
}));

// Main wrapper
const StyledLowerNavbar = styled(AppBar)`
  background-color: white;
  color: black;
  display: flex;

  ${(props) => props.theme.breakpoints.down("sm")} {
    background: rgb(91, 184, 209);
    background: linear-gradient(270deg, rgba(91, 184, 209, 1) 0%, rgba(21, 215, 215, 1) 100%);
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

const LowerNavbar = () => {
    const [providers, setProviders] = React.useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [session, loading] = useSession()
    const router = useRouter();
    const classes = useStyles();

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
        setOpen(!open);
    };

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
            <Container>
                <Grid container direction="row">
                    <Grid item container xs={6} sm={6} md={8}>
                        <BrandLogo>IsItBetterThere</BrandLogo>
                        <Link href='/#/howitworks' passHref>
                            <MiscButtons
                                style={{textDecoration: "none"}}
                                disableRipple
                            >
                                How it works
                            </MiscButtons>
                        </Link>
                        <MiscButtons
                            href={
                                router.pathname === "/"
                                    ? "#/learn"
                                    : process.env.NODE_ENV === "production"
                                    ? process.env.prod + "/#/learn"
                                    : process.env.dev + "/#/learn"
                            }
                            style={{textDecoration: "none"}}
                            disableRipple
                        >
                            Learn
                        </MiscButtons>
                        <Link href='/share' passHref>
                            <MiscButtons
                                style={{textDecoration: "none"}}
                                disableRipple
                            >
                                Share your story
                            </MiscButtons>
                        </Link>
                    </Grid>
                    <Grid item xs={6} sm={6} md={4}>
                        <Link href={'/account?tab=settings'} passHref>
                            <UserButtons disableRipple>
                                {session ? (
                                    <>
                                        <StyledAvatar src={session.picture} imgProps={{referrerPolicy: 'no-referrer'}}/>
                                        &nbsp;{session.name}
                                    </>
                                ) : (
                                    "Account"
                                )}
                            </UserButtons>
                        </Link>
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
                                style={{textDecoration: "none"}}
                                disableRipple
                                onClick={handleClick}
                            >
                                Sign up | Login
                            </UserButtons>
                        )}
                        <DrawerContainer>
                            <Drawer/>
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
                                        <SigninIcon
                                            src={`/${provider.name.toLowerCase()}-signin.png`}
                                        />
                                    }
                                    fullWidth
                                    variant="text"
                                    onClick={() =>
                                        signIn(provider.name.toLowerCase(), {
                                            callbackUrl:
                                                process.env.NODE_ENV === "production"
                                                    ? process.env.prod
                                                    : process.env.dev,
                                        })
                                    }
                                >
                                    Sign in with {provider.name}
                                </ProviderButtons>
                            </p>
                        ))}
                    </PopperPaper>
                </ClickAwayListener>
            </Popper>
        </StyledLowerNavbar>
    );
};

export default LowerNavbar
