import React from "react";
import { withStyles } from "@material-ui/styles";

const styles = {
  root: {
    backgroundColor: "grey",
    height: "4%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: "0.7rem",
  },
  emoji: {
    fontSize: "0.9rem",
    marginRight: "1rem",
  },
};

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
