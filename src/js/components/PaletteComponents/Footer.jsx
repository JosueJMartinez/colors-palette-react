import React from "react";
import { withStyles } from "@material-ui/styles";
import styles from "../../../styles/FooterStyles";

function Footer(props) {
  const { emoji, name, classes } = props;

  return (
    <footer className={classes.root}>
      <div>
        <span className={classes.emoji}>{emoji}</span> {name}
      </div>
    </footer>
  );
}

export default withStyles(styles)(Footer);
