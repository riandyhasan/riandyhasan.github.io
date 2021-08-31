import React, { useState } from "react";
import { makeStyles, Drawer } from "@material-ui/core"
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useHistory } from "react-router-dom";
import { ReactComponent as Project } from "../assets/svg/Projects.svg";
import { ReactComponent as Home } from "../assets/svg/Home.svg";
import { ReactComponent as Contact } from "../assets/svg/Contact.svg";

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: "#1a1a18",
      width: "100%",
      padding: theme.spacing(3),
      marginLeft:"6.25rem",
      [theme.breakpoints.down('sm')]: {
        marginLeft:"0rem",
      },
    },
  appBar: {
    width:"100vw",
    },
    root: {
      display: "flex",
    },
    drawerPaper: {
      width: "6.25rem",
      background: "#1a1a18",
    },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
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

export default function Layout({ children}) {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const classes = useStyles();
  const history = useHistory();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));



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

  const drawer = (
    <div className={classes.navSide}>
    {navItems.map((item) => (
      <div button className={classes.navItems} onClick={() => history.push(item.path)}>
        {item.icon}
      </div>
    ))}
  </div>
  )

  return (
    <div className={classes.root}>
      {isMobile?
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      :
      null}
      {/* side bar */}
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        {isMobile?
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
          :
          <Drawer
           classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          >
            {drawer}
          </Drawer>
}
      {/* main content */}
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
}
