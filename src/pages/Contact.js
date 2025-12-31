import React, { useState } from "react";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { makeStyles, Link, FormControl, FormLabel, TextField, Container, Button, Typography, Drawer, Box } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useHistory } from "react-router-dom";
import emailjs from "emailjs-com";
import Alert from "../components/Alert";
import { ReactComponent as Strip } from "../assets/svg/Strip.svg";
import { ReactComponent as Email } from "../assets/svg/EmailRound.svg";
import { ReactComponent as Instagram } from "../assets/svg/InstagramRound.svg";
import { ReactComponent as Medium } from "../assets/svg/MediumRound.svg";
import { ReactComponent as Linkedin } from "../assets/svg/LinkedinRound.svg";
import { ReactComponent as Github } from "../assets/svg/GithubRound.svg";

const useStyles = makeStyles((theme) => {
  return {
    field: {
      marginTop: 20,
      marginBottom: 20,
      background: "white",
      display: "block",
    },
    form: {
      marginRight: "30.5rem",
      [theme.breakpoints.down("md")]: {
        maxW: "100vw",
        marginRight: "5rem",
        marginLeft: "3rem",
      },
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
      [theme.breakpoints.down("md")]: {
        marginRight: "5rem",
      },
      [theme.breakpoints.down("xs")]: {
        marginRight: "3rem",
      },
    },
    sideDesc: {
      width: "25.5rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "#ffffff",
      padding: "2rem",
      [theme.breakpoints.down("md")]: {
        width: "100vw",
        marginBottom: "-2rem",
        marginTop: "4rem",
      },
      [theme.breakpoints.down("sm")]: {
        marginLeft: "-6rem",
      },
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

export default function Contact() {
  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm("service_lebel5x", "template_kpl4trf", e.target, "user_hoFpG3XhPIIfpZRHHO38o").then(
      (result) => {
        console.log(result.text);
        setAlertUpload(true);
        setAlertStatus("success");
        setAlertDesc("Succes! Your message has been send");
      },
      (error) => {
        console.log(error.text);
        setAlertUpload(true);
        setAlertStatus("error");
        setAlertDesc("Error! Please send another message");
      }
    );
  }

  const [alertUpload, setAlertUpload] = useState(false);
  const [alertDesc, setAlertDesc] = useState("");
  const [alertStatus, setAlertStatus] = useState("");

  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const isIlang = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Container size="sm">
      <Alert show={alertUpload} setShow={setAlertUpload} status={alertStatus} desc={alertDesc} />

      <div className={classes.title}>
        <Strip />
        <Typography variant="h1" align="center">
          Contact
        </Typography>
      </div>

      {/* Contact Form */}
      <form noValidate autoComplete="off" className={classes.form} onSubmit={sendEmail}>
        <FormControl className={classes.formControl}>
          <FormLabel className={classes.formTitle}>Name</FormLabel>
          <TextField className={classes.field} label="Name" variant="outlined" color="secondary" name="name" fullWidth />
        </FormControl>
        <FormControl className={classes.formControl}>
          <FormLabel className={classes.formTitle}>Subject</FormLabel>
          <TextField className={classes.field} label="Subject" variant="outlined" color="secondary" name="subject" fullWidth required />
        </FormControl>
        <FormControl className={classes.formControl}>
          <FormLabel className={classes.formTitle}>Message</FormLabel>
          <TextField className={classes.field} label="Message" variant="outlined" color="secondary" name="message" multiline rows={4} fullWidth required />
        </FormControl>
        <Button type="submit" color="primary" variant="contained" endIcon={<KeyboardArrowRightIcon />}>
          Submit
        </Button>
      </form>
      {isIlang ? (
        <Box className={classes.sideDesc}>
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
        </Box>
      ) : (
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
      )}
    </Container>
  );
}
