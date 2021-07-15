import React from "react";
import {
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Chip,
    Link,
    Typography,
    Card,
    makeStyles
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 450,
        [theme.breakpoints.down("md")]: {
            maxWidth: "500vw"
        },


    },
    media: {
        height: 400,
    },
    chip: {
        backgroundColor: "#99ddff",
    },
}));

export default function MediaCard({image, title, description, label, link}) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <Link
                style={{textDecoration: "none"}}
                component={CardActionArea}
                disableRipple
                href={link}
                target="_blank"
                rel="noopener"
            >
                <CardMedia className={classes.media} image={image} title={title}/>
                <CardContent>
                    <Typography
                        color="secondary"
                        gutterBottom
                        variant="h5"
                        component="h2"
                    >
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {description}
                    </Typography>
                </CardContent>
            </Link>
            <CardActions>
                <Link
                    style={{textDecoration: "none"}}
                    component={Button}
                    href={link}
                    size="small"
                    color="primary"
                    target="_blank"
                    rel="noopener"
                >
                    Learn more
                </Link>
                {label.map((label) => {
                    return <Chip className={classes.chip} label={label} key={label}/>;
                })}
            </CardActions>
        </Card>
    );
}
