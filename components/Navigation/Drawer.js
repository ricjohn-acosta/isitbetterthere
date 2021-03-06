import React from "react";
import clsx from "clsx";
import styled from "styled-components";
import {
    makeStyles,
    Drawer,
    Button,
    List,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
} from "@material-ui/core";
import {
    Mail,
    Menu,
    EmojiObjectsTwoTone,
    ImportContactsTwoTone,
    ShareTwoTone,
    VpnKeyTwoTone,
    PersonOutlineTwoTone,
    InfoTwoTone,
    GroupTwoTone
} from "@material-ui/icons";
import ReactImageFallback from "react-image-fallback";
import {signout, useSession} from "next-auth/client";
import {useRouter} from "next/router";

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: "auto",
    },
    paper: {
        background: "#FFFFFF",
    },
});

const DrawerIcon = styled(ReactImageFallback)`
  height: auto;
  width: auto;
  max-width: 30px;
  max-height: 30px;
`;

export default function TemporaryDrawer() {
    const classes = useStyles();
    const router = useRouter();
    const [session, loading] = useSession();

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const getIcon = (option) => {
        switch (option) {
            case "How it works":
                return <EmojiObjectsTwoTone/>;

            case "Learn":
                return <ImportContactsTwoTone/>;

            case "Share your story":
                return <ShareTwoTone/>;

            case "Signup / Login":
                return <VpnKeyTwoTone/>;

            case "Account":
                return <PersonOutlineTwoTone/>;

            case "About":
                return <InfoTwoTone/>;

            case "Contact":
                return <Mail/>;

            case "Meet the team":
                return <GroupTwoTone/>;

            default:
                break;
        }
    };

    const getHref = (option) => {
        switch (option) {
            case "How it works":
                return router.pathname === "/"
                    ? "#/howitworks"
                    : process.env.NODE_ENV === "production"
                        ? process.env.prod + "/#/howitworks"
                        : process.env.dev + "/#/howitworks";

            case "Learn":
                return router.pathname === "/"
                    ? "#/learn"
                    : process.env.NODE_ENV === "production"
                        ? process.env.prod + "/#/learn"
                        : process.env.dev + "/#/learn";

            case "Share your story":
                return "/share";

            case "Sign up / Login":
                return "/signup";

            case "Account":
                return "/account";

            case "About":
                return "/about";

            case "Contact":
                return "/contact";

            case "Meet the team":
                return "/our-team";

            default:
                break;
        }
    };

    const handleAuth = (text) => {
        if (!session) {
            router.push("/signup");
        }

        if (session && text === "Signup / Login") {
            signout({
                callback:
                    process.env.NODE_ENV === "production"
                        ? process.env.prod + "/"
                        : process.env.dev + "/",
            });
        }
    };

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({...state, [anchor]: open});
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === "top" || anchor === "bottom",
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {["How it works", "Learn", "Share your story"].map((text) => (
                    <ListItem
                        component={Button}
                        style={{color: "black"}}
                        href={getHref(text)}
                        key={text}
                    >
                        <ListItemIcon>{getIcon(text)}</ListItemIcon>
                        <ListItemText primary={text}/>
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <List>
                {["Signup / Login", "Account"].map((text, index) => (
                    <ListItem
                        component={Button}
                        style={{color: "black"}}
                        onClick={() => {
                            return handleAuth(text);
                        }}
                        href={getHref(text)}
                        key={text}
                    >
                        <ListItemIcon>
                            {session && text === "Account" ? (
                                <DrawerIcon
                                    src={session.picture}
                                    fallbackImage="/user.png"
                                    alt={session.name}
                                />
                            ) : (
                                getIcon(text)
                            )}
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                session && text === "Account"
                                    ? session.name
                                    : session && text === "Signup / Login"
                                    ? "Sign out"
                                    : text
                            }
                        />
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <List>
                {["About", "Contact"].map((text, index) => (
                    <ListItem
                        component={Button}
                        style={{color: "black"}}
                        href={getHref(text)}
                        key={text}
                    >
                        <ListItemIcon>{getIcon(text)}</ListItemIcon>
                        <ListItemText primary={text}/>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div>
            <React.Fragment key={"right"}>
                <IconButton onClick={toggleDrawer("right", true)}>
                    <Menu fontSize="large"/>
                </IconButton>
                <Drawer
                    classes={{paper: classes.paper}}
                    anchor={"right"}
                    open={state["right"]}
                    onClose={toggleDrawer("right", false)}
                >
                    {list("right")}
                </Drawer>
            </React.Fragment>
        </div>
    );
}
