import React from "react";
import { makeStyles, Drawer } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { ReactComponent as Project } from "../assets/svg/Projects.svg";
import { ReactComponent as Home } from "../assets/svg/Home.svg";
import { ReactComponent as Contact } from "../assets/svg/Contact.svg";

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: "#1a1a18",
      width: "100%",
      marginLeft: "6.25rem",
      padding: theme.spacing(3),
    },
    root: {
      display: "flex",
    },
    drawerSide: {
      width: "6.25rem",
      background: "#1a1a18",
    },
    navSide: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "2rem",
      gap: "3rem",
    },
    navItems: {
      cursor: "pointer",
    },
    toolbar: theme.mixins.toolbar,
  };
});

export default function Layout({ children }) {
  const classes = useStyles();
  const history = useHistory();

  const navItems = [
    {
      icon: <Home style={{ widht: "2em" }} />,
      path: "/",
    },
    {
      icon: <Project style={{ widht: "2em" }} />,
      path: "/project",
    },
    {
      icon: <Contact style={{ widht: "2em" }} />,
      path: "/contact",
    },
  ];
  return (
    <div className={classes.root}>
      {/* side bar */}
      <Drawer variant="permanent" classes={{ paper: classes.drawerSide }} anchor="left">
        {/* links section */}
        <div className={classes.navSide}>
          {navItems.map((item) => (
            <div button className={classes.navItems} onClick={() => history.push(item.path)}>
              {item.icon}
            </div>
          ))}
        </div>
      </Drawer>

      {/* main content */}
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
}
