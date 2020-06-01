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

const useStyles = makeStyles({
  root: {
    maxWidth: 450,
  },
  media: {
    height: 400,
  },
  chip: {
    backgroundColor: "#99ddff"
  }
});

export default function MediaCard({ image, title, description, label }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea disableRipple>
        <CardMedia  className={classes.media} image={image} title={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Learn More
        </Button>
        {label.map((label) => {
          return <Chip className={classes.chip} label={label} />;
        })}
      </CardActions>
    </Card>
  );
}
