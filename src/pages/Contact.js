import React, { useState } from "react";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { makeStyles, Link, FormControl, FormLabel, TextField, Container, Button, Typography, Drawer } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { ReactComponent as Strip } from "../assets/svg/Strip.svg";
import { ReactComponent as Email } from "../assets/svg/EmailRound.svg";
import { ReactComponent as Instagram } from "../assets/svg/InstagramRound.svg";
import { ReactComponent as Medium } from "../assets/svg/MediumRound.svg";
import { ReactComponent as Linkedin } from "../assets/svg/LinkedinRound.svg";
import { ReactComponent as Github } from "../assets/svg/GithubRound.svg";

const useStyles = makeStyles(() => {
  return {
    field: {
      marginTop: 20,
      marginBottom: 20,
      background: "white",
      display: "block",
    },
    form: {
      marginRight: "30.5rem",
    },
    formControl: {
      display: "flex",
    },
    formTitle: {
      color: "white",
      fontWeight: "bold",
      fontSize: "2rem",
    },
    title: {
      display: "flex",
      alignItems: "center",
      gap: "1.5rem",
      justifyContent: "flex-end",
      color: "white",
      marginRight: "30.5rem",
    },
    sideDesc: {
      width: "25.5rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "#ffffff",
      padding: "2rem",
    },
    medsos: {
      display: "flex",
      alignItems: "center",
      gap: "1.5rem",
    },
    medsosList: {
      display: "flex",
      flexDirection: "column",
      gap: "1.1rem",
    },
    email: {
      display: "flex",
      gap: "1.3rem",
      marginBottom: "2rem",
    },
  };
});

export default function Create() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Container size="sm">
      <div className={classes.title}>
        <Strip />
        <Typography variant="h1" align="center">
          Contact
        </Typography>
      </div>

      {/* Contact Form */}
      <form noValidate autoComplete="off" className={classes.form}>
        <FormControl className={classes.formControl}>
          <FormLabel className={classes.formTitle}>Name</FormLabel>
          <TextField className={classes.field} label="Name" variant="outlined" color="secondary" fullWidth />
        </FormControl>
        <FormControl className={classes.formControl}>
          <FormLabel className={classes.formTitle}>Subject</FormLabel>
          <TextField className={classes.field} label="Subject" variant="outlined" color="secondary" fullWidth required />
        </FormControl>
        <FormControl className={classes.formControl}>
          <FormLabel className={classes.formTitle}>Message</FormLabel>
          <TextField className={classes.field} label="Message" variant="outlined" color="secondary" multiline rows={4} fullWidth required />
        </FormControl>
        <Button type="submit" color="primary" variant="contained" endIcon={<KeyboardArrowRightIcon />}>
          Submit
        </Button>
      </form>

      <Drawer variant="permanent" classes={{ paper: classes.sideDesc }} anchor="right">
        <Link href="mailto:riandyhsn@gmail.com">
          <div className={classes.email}>
            <Email style={{ cursor: "pointer", width: "3.5rem" }} />
            <Typography variant="body1" style={{ fontSize: "1.7rem", fontWeight: "normal", cursor: "pointer", color: "black" }}>
              riandyhsn@gmail.com
            </Typography>
          </div>
        </Link>
        <div className={classes.medsosList}>
          <Typography variant="h4" style={{ fontSize: "1.7rem", fontWeight: "bold" }}>
            Follow Me
          </Typography>
          <div className={classes.medsos}>
            <Link href="https://www.instagram.com/riandyhasan/" target="_blank">
              <Instagram style={{ cursor: "pointer", width: "3.5rem" }} />
            </Link>
            <Link href="https://tenggelamdalamkata.medium.com/" target="_blank">
              <Medium style={{ cursor: "pointer", width: "3.5rem" }} />
            </Link>
            <Link href="https://www.linkedin.com/in/riandy-hasan-3836791b5/" target="_blank">
              <Linkedin style={{ cursor: "pointer", width: "3.5rem" }} />
            </Link>
            <Link href="https://github.com/riandyhasan" target="_blank">
              <Github style={{ cursor: "pointer", width: "3.5rem" }} />
            </Link>
          </div>
        </div>
      </Drawer>
    </Container>
  );
}
