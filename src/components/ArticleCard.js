import React from "react";
import { makeStyles, Card, CardActionArea, CardContent, Typography } from "@material-ui/core";
import { ReactComponent as StripHitam } from "../assets/svg/StripHitam.svg";
import { ReactComponent as Medium } from "../assets/svg/Medium.svg";
const useStyles = makeStyles({
  root: {
    padding: "2rem",
    filter: "drop-shadow(-11px 6px 13px rgba(255, 255, 255, 0.25))",
  },
  content: {
    display: "flex",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function ProjectCard({ content, title }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.card}>
        <Typography style={{ fontWeight: "bold", fontSize: "1.5rem" }}>{title}</Typography>
        <StripHitam style={{ width: "90%" }} />
        <CardContent>
          <Typography noWrap style={{ overflow: "hidden", textOverflow: "ellipsis", width: "25rem" }}>
            {content}
          </Typography>
        </CardContent>
        <Medium style={{ width: "2em", marginLeft: "auto" }} />
      </CardActionArea>
    </Card>
  );
}
