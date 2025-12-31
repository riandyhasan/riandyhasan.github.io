import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "60%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Alerts({ show, setShow, status, desc }) {
  const classes = useStyles();

  return show ? (
    <div className={classes.root}>
      <Alert onClose={() => setShow(false)} severity={status}>
        {desc}
      </Alert>
    </div>
  ) : null;
}
