import React from "react";
import { makeStyles, Card, CardActionArea, CardContent, Typography,Box } from "@material-ui/core";
import { ReactComponent as StripHitam } from "../assets/svg/StripHitam.svg";
import { ReactComponent as Medium } from "../assets/svg/Medium.svg";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
const useStyles = makeStyles((theme) => {
  return {
  root: {
    padding: "2rem",
    filter: "drop-shadow(-11px 6px 13px rgba(255, 255, 255, 0.25))",
    [theme.breakpoints.down('xs')]: {
      width:"15rem",
      padding: "0.3rem",
    },
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
};
});

export default function ProjectCard({ content, title }) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery('(max-width:353px)');

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.card}>
        <Typography style={{ fontWeight: "bold", fontSize: "1.5rem" }}>{title}</Typography>
        <StripHitam style={{ width: "90%" }} />
        <CardContent>
          <Box>
          <Typography noWrap style={{ overflow: "hidden", textOverflow: "ellipsis", width: "25rem" }}>
            {content}
          </Typography>
          </Box>
        </CardContent>
        <Medium style={{ width: "2em", marginLeft: "auto" }} />
      </CardActionArea>
    </Card>
  );
}
