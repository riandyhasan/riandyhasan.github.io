import React from "react";
import { makeStyles, Card, CardActionArea, CardContent, CardMedia, Typography } from "@material-ui/core";
const useStyles = makeStyles({
  root: {
    width: "26.7rem",
    height: "16.5rem",
    padding: "2rem",
    filter: "drop-shadow(-11px 6px 13px rgba(255, 255, 255, 0.25))",
  },
  media: {
    width:"24.4rem",
    height: "11.5rem",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function ProjectCard({ imageUrl, name }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.card}>
        <CardContent>
          <img className={classes.media} src={imageUrl} />
        </CardContent>
        <Typography style={{ fontWeight: "bold", fontSize: "1.5rem" }}>{name}</Typography>
      </CardActionArea>
    </Card>
  );
}
