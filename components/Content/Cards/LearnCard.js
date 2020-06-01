import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Link from "@material-ui/core/Link";

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

export default function MediaCard({ image, title, description, label, link }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Link
        style={{ textDecoration: "none" }}
        component={CardActionArea}
        disableRipple
        href={link}
        target="_blank"
        rel="noopener"
      >
        <CardMedia className={classes.media} image={image} title={title} />
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
          style={{ textDecoration: "none" }}
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
          return <Chip className={classes.chip} label={label} />;
        })}
      </CardActions>
    </Card>
  );
}
