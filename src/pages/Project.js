import React, { useState } from "react";
import { makeStyles, Typography, Container, Grid } from "@material-ui/core";
import { ReactComponent as Strip } from "../assets/svg/Strip.svg";
import ProjectCard from "../components/ProjectCard";
import image1 from "../assets/image/projects/1.png";
import image2 from "../assets/image/projects/2.png";
import image3 from "../assets/image/projects/3.png";
import image4 from "../assets/image/projects/4.png";

const useStyles = makeStyles(() => {
  return {
    root: {
      display: "flex",
      flexDirection: "column",
      color: "white",
    },
    title: {
      display: "flex",
      alignItems: "center",
      gap: "1.5rem",
      justifyContent: "center",
      marginBottom: "3rem",
    },
  };
});

export default function Project() {
  const classes = useStyles();
  const projectCard = [
    {
      name: "Skill Up",
      imageUrl: image1,
    },
    {
      name: "Glampy",
      imageUrl: image2,
    },
    {
      name: "Konsulin",
      imageUrl: image3,
    },
    {
      name: "Porto Web",
      imageUrl: image4,
    },
  ];
  const [isHoverContent, setIsHoverContent] = useState(false);

  return (
    <Container>
      <div className={classes.root}>
        <div className={classes.title}>
          <Typography variant="h1" align="center" style={{ cursor: "pointer" }} onMouseEnter={() => setIsHoverContent(true)} onMouseLeave={() => setIsHoverContent(false)}>
            {isHoverContent ? "Article" : "Project"}
          </Typography>
          <Strip style={{ cursor: "pointer" }} />
        </div>
        <Grid container spacing={10}>
          {projectCard.map((item) => (
            <Grid item xs={6}>
              <ProjectCard name={item.name} imageUrl={item.imageUrl} />
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
  );
}
