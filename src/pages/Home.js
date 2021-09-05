import React, { useState } from "react";
import { makeStyles, Drawer, Typography, Box, Link } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useHistory } from "react-router-dom";
import ProfilePicture from "../assets/image/fotoyandy.png";
import { ReactComponent as Instagram } from "../assets/svg/Instagram.svg";
import { ReactComponent as Medium } from "../assets/svg/Medium.svg";
import { ReactComponent as Linkedin } from "../assets/svg/Linkedin.svg";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
    },
    title: {
      [theme.breakpoints.down("md")]: {
        marginTop: "5rem",
        height: "100vh",
      },
    },
    text: {
      cursor: "pointer",
    },
    aboutme: {
      maxW: "100vw",
      [theme.breakpoints.down("sm")]: {
        marginRight: "4rem",
        marginLeft: "2rem",
      },
    },
    sideDesc: {
      width: "25.5rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      background: "#ffffff",
      gap: "1rem",
      padding: "2rem",
      [theme.breakpoints.down("sm")]: {
        width: "100vw",
        marginBottom: "-2rem",
      },
    },
    exp: {
      display: "flex",
      justifyContent: "center",
      gap: "0.5rem",
      maxW: "100vw",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        alignItems: "center",
        marginRight: "3rem",
        gap: "0.03rem",
      },
    },
    expList: {
      fontSize: "0.5rem",
      textAlign: "center",
    },
    image: {
      borderRadius: "50%",
      width: "13rem",
      display: "flex",
      marginTop: "2rem",
    },
    medsos: {
      display: "flex",
      marginTop: "auto",
      marginLeft: "auto",
      alignItems: "center",
      gap: "1rem",
      [theme.breakpoints.down("sm")]: {
        marginRight: "3rem",
      },
    },
  };
});

export default function Home() {
  const [isHoverContent1, setIsHoverContent1] = useState(false);
  const [isHoverContent2, setIsHoverContent2] = useState(false);
  const [isHoverContent3, setIsHoverContent3] = useState(false);

  const history = useHistory();

  const theme = useTheme();
  const isBot = useMediaQuery(theme.breakpoints.down("sm"));

  {
    /*
  const homeTitle = [
    {
      text: "Hello,",
      textAfter: "Home",
      path: "/",
    },
    {
      text: "I Am",
      textAfter: "Project",
      path: "/project",
    },
    {
      text: "Yandy",
      textAfter: "Contact",
      path: "/contact",
    },
  ];
*/
  }

  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* main title */}
      <Box className={classes.title}>
        <Typography
          className={classes.text}
          variant="h1"
          onMouseEnter={() => setIsHoverContent1(true)}
          onMouseLeave={() => setIsHoverContent1(false)}
          style={isHoverContent1 ? { color: "red", marginLeft: "2rem" } : { color: "white" }}
          onClick={() => history.push("/")}
        >
          {isHoverContent1 ? "Home" : "Hello, "}
        </Typography>
        <Typography
          className={classes.text}
          variant="h1"
          onMouseEnter={() => setIsHoverContent2(true)}
          onMouseLeave={() => setIsHoverContent2(false)}
          style={isHoverContent2 ? { color: "red", marginLeft: "2rem" } : { color: "white" }}
          onClick={() => history.push("/project")}
        >
          {isHoverContent2 ? "Project" : "I Am"}
        </Typography>
        <Typography
          className={classes.text}
          variant="h1"
          onMouseEnter={() => setIsHoverContent3(true)}
          onMouseLeave={() => setIsHoverContent3(false)}
          style={isHoverContent3 ? { color: "red", marginLeft: "2rem" } : { color: "white" }}
          onClick={() => history.push("/contact")}
        >
          {isHoverContent3 ? "Contact" : "Yandy"}
        </Typography>
      </Box>

      {isBot ? (
        <Box className={classes.sideDesc}>
          <img src={ProfilePicture} className={classes.image} />
          <Box className={classes.aboutme}>
            <Typography variant="h4" style={{ fontSize: "1.7rem", fontWeight: "bold" }}>
              About Me
            </Typography>
            <Typography variant="body1" style={{ textAlign: "justify" }}>
              An undergraduate student that is interested in information technology and entrepreneurship. I have experience in UI/UX design and web frontend development. I love to collaborate with people to build something.
            </Typography>
          </Box>
          <div className={classes.exp}>
            <Typography variant="h6" style={{ fontSize: "1.15rem", fontWeight: "bold", cursor: "pointer" }}>
              Organizational
            </Typography>
            <Typography variant="h6" style={{ fontSize: "1.15rem", fontWeight: "bold" }}>
              •
            </Typography>
            <Typography variant="h6" style={{ fontSize: "1.15rem", fontWeight: "bold", cursor: "pointer" }}>
              Web Dev
            </Typography>
            <Typography variant="h6" style={{ fontSize: "1.15rem", fontWeight: "bold" }}>
              •
            </Typography>
            <Typography variant="h6" style={{ fontSize: "1.25rem", fontWeight: "bold", cursor: "pointer" }}>
              Voluntering
            </Typography>
          </div>
          <div className={classes.medsos}>
            <Link href="https://www.instagram.com/riandyhasan/" target="_blank">
              <Instagram style={{ cursor: "pointer", width: "1.5rem" }} />
            </Link>
            <Link href="https://tenggelamdalamkata.medium.com/" target="_blank">
              <Medium style={{ cursor: "pointer", width: "1.7rem" }} />
            </Link>
            <Link href="https://github.com/riandyhasan" target="_blank">
              <Linkedin style={{ cursor: "pointer", width: "1.5rem" }} />
            </Link>
          </div>
        </Box>
      ) : (
        <Drawer variant="permanent" classes={{ paper: classes.sideDesc }} anchor="right">
          <img src={ProfilePicture} className={classes.image} />
          <Box className={classes.aboutme}>
            <Typography variant="h4" style={{ fontSize: "1.7rem", fontWeight: "bold" }}>
              About Me
            </Typography>
            <Typography variant="body1" style={{ textAlign: "justify" }}>
              An undergraduate student that is interested in information technology and entrepreneurship. I have experience in UI/UX design and web frontend development. I love to collaborate with people to build something.
            </Typography>
          </Box>
          <div className={classes.exp}>
            <Typography variant="h6" style={{ fontSize: "1.15rem", fontWeight: "bold", cursor: "pointer" }}>
              Organizational
            </Typography>
            <Typography variant="h6" style={{ fontSize: "1.15rem", fontWeight: "bold" }}>
              •
            </Typography>
            <Typography variant="h6" style={{ fontSize: "1.15rem", fontWeight: "bold", cursor: "pointer" }}>
              Web Dev
            </Typography>
            <Typography variant="h6" style={{ fontSize: "1.15rem", fontWeight: "bold" }}>
              •
            </Typography>
            <Typography variant="h6" style={{ fontSize: "1.25rem", fontWeight: "bold", cursor: "pointer" }}>
              Voluntering
            </Typography>
          </div>
          <div className={classes.medsos}>
            <Link href="https://www.instagram.com/riandyhasan/" target="_blank">
              <Instagram style={{ cursor: "pointer", width: "1.5rem" }} />
            </Link>
            <Link href="https://tenggelamdalamkata.medium.com/" target="_blank">
              <Medium style={{ cursor: "pointer", width: "1.7rem" }} />
            </Link>
            <Link href="https://github.com/riandyhasan" target="_blank">
              <Linkedin style={{ cursor: "pointer", width: "1.5rem" }} />
            </Link>
          </div>
        </Drawer>
      )}
    </div>
  );
}
