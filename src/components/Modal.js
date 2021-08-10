import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "889px",
    height: "557px",
    background: "#FFFFFF",
  },
}));

export default function Alerts({ show, setShow, title, content }) {
  const classes = useStyles();

  return show ? (
    <div>
      <Modal className={classes.modal}>{content}</Modal>
    </div>
  ) : null;
}
