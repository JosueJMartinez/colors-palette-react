import React from "react";
import { withStyles } from "@material-ui/styles";

const styles = {
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
  },
};

function DraggableColorBox(props) {
  const { color, classes } = props;
  return (
    <div
      id={color.name}
      className={classes.root}
      style={{ backgroundColor: color.color }}
    >
      {color.name}
    </div>
  );
}

export default withStyles(styles)(DraggableColorBox);
