import React from "react";
import { makeStyles, Card, CardActionArea, CardContent, CardMedia, Typography } from "@material-ui/core";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => {
  return {
  root: {
    width: "26.7rem",
    height: "16.5rem",
    padding: "2rem",
    filter: "drop-shadow(-11px 6px 13px rgba(255, 255, 255, 0.25))",
    [theme.breakpoints.down('sm')]: {
      width: "18.7rem",
      height:"13.5rem",
      padding: "0.5rem",
    },
    [theme.breakpoints.down('xs')]: {
      width: "12.7rem",
      height:"12.5rem",
      padding: "0.3rem",
    },
    
  },
  media: {
    width:"24.4rem",
    height: "11.5rem",
    [theme.breakpoints.down('sm')]: {
      width: "16.4rem",
      height:"8rem"
    },
    [theme.breakpoints.down('xs')]: {
      width: "10.4rem",
      height:"6rem",
      padding: "0.5rem",
    },
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
};
});

export default function ProjectCard({ imageUrl, name }) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery('(max-width:353px)');

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
